// Saves one person (team, board, ambassador or artist) with their photo.
import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';
import { slugify } from '../../../../admin/tables';
import { parsePhoto } from '../../../../admin/photo';

const groups = ['team', 'board', 'ambassador', 'artist'];
const back = (path: string, error: string) => `${path}?error=${error}`;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const here = `/admin/personas/${id || 'nueva'}/`;
  const text = (k: string, max = 2000) => String(form.get(k) ?? '').trim().slice(0, max);

  const name = text('name', 200);
  const group = text('group');
  const website = text('website', 300);
  if (!name || !groups.includes(group)) return redirect(back(here, 'faltan'), 303);
  if (website && !/^https?:\/\/\S+$/i.test(website)) return redirect(back(here, 'enlace'), 303);
  const photo = parsePhoto(form.get('photo'));
  if (photo === 'invalid') return redirect(back(here, 'foto'), 303);

  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();

  let project_id: string | null = null;
  let edition: string | null = null;
  if (group === 'artist') {
    const [pslug, year] = text('project').split('|');
    if (pslug) {
      const { data: p } = await supabase.from('projects').select('id').eq('slug', pslug).maybeSingle();
      project_id = p?.id ?? null;
      edition = project_id && year ? year : null;
    }
  }
  const row = { name, role: text('role', 300), city: text('city', 120), group, project_id, edition, photo, bio: text('bio', 4000), website, published: form.get('published') !== null };

  let slug = id;
  if (id) {
    const { data, error } = await supabase.from('people').update(row).eq('slug', id).select('slug');
    if (error || !data?.length) { console.error('person save failed', error?.message); return redirect(back(here, 'guardar'), 303); }
  } else {
    const base = slugify(name);
    const { data: taken } = await supabase.from('people').select('slug').like('slug', `${base}%`);
    const used = new Set((taken ?? []).map((r) => r.slug));
    slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    const scope = group === 'team' || group === 'board' ? ['team', 'board'] : [group]; // team and board share one list on the site
    const { data: last } = await supabase.from('people').select('sort_order').in('group', scope).order('sort_order', { ascending: false }).limit(1);
    const { error } = await supabase.from('people').insert({ ...row, slug, sort_order: (last?.[0]?.sort_order ?? 0) + 1 } as never);
    if (error) { console.error('person insert failed', error.message); return redirect(back(here, 'guardar'), 303); }
  }
  await supabase.from('content_changes').insert({ table_name: 'people', row_slug: slug, summary: `${id ? 'Editada' : 'Añadida'} persona «${name}»`, user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect(`/admin/personas/?ok=${id ? 'guardado' : 'creado'}`, 303);
};
