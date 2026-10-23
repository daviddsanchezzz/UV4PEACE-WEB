// Saves a whole project (fields, photos, editions with line-ups, documentary) through the save_project database function,
// which writes everything in one transaction.
import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';
import { slugify } from '../../../../admin/tables';
import { parsePhoto } from '../../../../admin/photo';

type Obj = Record<string, unknown>;
const str = (v: unknown, max = 2000) => String(v ?? '').trim().slice(0, max);
const url = (v: unknown) => str(v, 400);
const okUrl = (v: string) => !v || /^https?:\/\/\S+$/i.test(v);

class Invalid extends Error {}

function photo(v: unknown) {
  if (v == null || v === '') return null;
  const parsed = parsePhoto(JSON.stringify(v));
  if (parsed === 'invalid') throw new Invalid('foto');
  return parsed;
}

function clean(raw: Obj) {
  const title = str(raw.title, 200);
  const yearStart = str(raw.year_start, 7);
  if (!title) throw new Invalid('faltan');
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(yearStart)) throw new Invalid('mes');
  if (!['ongoing', 'past'].includes(str(raw.status))) throw new Invalid('faltan');

  const editions = (Array.isArray(raw.editions) ? raw.editions : []).map((x: Obj) => {
    const year = str(x.year, 4);
    const watch = url(x.watch_url);
    if (!/^\d{4}$/.test(year)) throw new Invalid('anio');
    if (!okUrl(watch)) throw new Invalid('enlace');
    const lineup = (Array.isArray(x.lineup) ? x.lineup : []).slice(0, 200).map((m: Obj) => ({ person: str(m.person, 80), name: str(m.name, 200), role: str(m.role, 200) })).filter((m) => m.name || m.person);
    return { year, date_label: str(x.date_label, 100), venue: str(x.venue, 200), event: str(x.event, 200), conductor: str(x.conductor, 200), description: str(x.description, 4000), watch_url: watch, upcoming: Boolean(x.upcoming), lineup };
  });
  if (new Set(editions.map((e) => e.year)).size !== editions.length) throw new Invalid('anio');

  const gallery = (Array.isArray(raw.gallery) ? raw.gallery : []).slice(0, 60).map((g: Obj) => {
    const ph = photo(g);
    if (!ph) throw new Invalid('foto');
    return ph;
  });

  let documentary: Obj | null = null;
  const d = raw.documentary as Obj | null | undefined;
  if (d && (str(d.title) || str(d.text) || str(d.trailerUrl))) {
    const trailer = url(d.trailerUrl);
    if (!okUrl(trailer)) throw new Invalid('enlace');
    documentary = {
      title: str(d.title, 200), text: str(d.text, 4000), trailerUrl: trailer, poster: photo(d.poster),
      festivals: (Array.isArray(d.festivals) ? d.festivals : []).slice(0, 100).map((f: Obj) => ({ date: str(f.date, 60), name: str(f.name, 200), result: str(f.result, 200) })).filter((f) => f.name),
    };
  }

  let partner_block: Obj | null = null;
  const pb = raw.partner as Obj | null | undefined;
  if (pb && (str(pb.title) || str(pb.text))) {
    const ph = photo(pb.photo);
    if (!ph) throw new Invalid('pbfoto');
    partner_block = {
      eyebrow: str(pb.eyebrow, 120), title: str(pb.title, 200), titleAccent: str(pb.titleAccent, 200), text: str(pb.text, 2000), photo: ph,
      benefits: (Array.isArray(pb.benefits) ? pb.benefits : []).slice(0, 20).map((b) => str(b, 300)).filter(Boolean),
    };
  }
  const stats = (Array.isArray(raw.stats) ? raw.stats : []).slice(0, 12).map((x: Obj) => ({ n: str(x.n, 40), label: str(x.label, 120) })).filter((x) => x.n && x.label);

  return {
    stats, stats_note: str(raw.stats_note, 200), partner_block,
    title, title_accent: str(raw.title_accent, 200), status: str(raw.status), year_start: yearStart, date_label: str(raw.date_label, 100), city: str(raw.city, 120), summary: str(raw.summary, 600),
    featured: Boolean(raw.featured), published: Boolean(raw.published), intro: str(raw.intro, 4000), body: str(raw.body, 8000), vision: str(raw.vision, 4000),
    cover: photo(raw.cover), hero: photo(raw.hero), gallery, documentary, editions,
  };
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = str(form.get('slug'), 80);
  const here = `/admin/proyectos/${slug || 'nuevo'}/`;
  const err = (e: string) => redirect(`${here}?error=${e}`, 303);

  let payload;
  try {
    payload = clean(JSON.parse(String(form.get('payload') ?? '{}')));
  } catch (e) {
    return err(e instanceof Invalid ? e.message : 'faltan');
  }

  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  let target = slug;
  if (!slug) {
    const base = slugify(payload.title);
    const { data: taken } = await supabase.from('projects').select('slug').like('slug', `${base}%`);
    const used = new Set((taken ?? []).map((r) => r.slug));
    target = base;
    for (let n = 2; used.has(target); n++) target = `${base}-${n}`;
  }
  // The partner block is written with a plain update; save_project handles everything else in one transaction.
  const { partner_block, ...forFunction } = payload;
  const { error } = await supabase.rpc('save_project', { p_slug: slug, p: { ...forFunction, slug: target } });
  if (error) { console.error('project save failed', error.message); return err(error.message.includes('save_project') ? 'funcion' : 'guardar'); }

  const { error: pbError } = await supabase.from('projects').update({ partner_block }).eq('slug', target);
  if (pbError) { console.error('project partner block failed', pbError.message); return err('guardar'); }
  await supabase.from('content_changes').insert({ table_name: 'projects', row_slug: target, summary: `${slug ? 'Editado' : 'Añadido'} proyecto «${payload.title}»`, user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect(`/admin/proyectos/?ok=${slug ? 'guardado' : 'creado'}`, 303);
};
