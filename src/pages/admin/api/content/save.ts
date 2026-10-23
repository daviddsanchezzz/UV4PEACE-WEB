// Saves one row of a simple admin section (press, partners, testimonials, stats).
// Who may write is decided by the database (row level security: editors only), not by this file.
import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';
import { tables, slugify } from '../../../../admin/tables';

const back = (path: string, params: Record<string, string>) => `${path}?${new URLSearchParams(params)}`;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const section = String(form.get('section') ?? '');
  const id = String(form.get('id') ?? '');
  const spec = tables[section];
  if (!spec) return redirect('/admin/inicio/', 303);

  const here = `/admin/${section}/${id || 'nuevo'}/`;
  const row: Record<string, unknown> = {};
  for (const [key, col] of Object.entries(spec.cols)) {
    row[col] = spec.bool.includes(key) ? form.get(key) !== null : String(form.get(key) ?? '').trim().slice(0, 2000);
  }
  if (section === 'archivo') {
    // One link per line: «Text | https://address». The address may be left out while the article is not online yet.
    const links = String(form.get('links') ?? '').split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 10).map((l) => {
      const [label, ...rest] = l.split('|');
      return { label: label.trim().slice(0, 100), url: rest.join('|').trim() };
    });
    if (links.some((l) => !l.label || (l.url && !/^https?:\/\/\S+$/i.test(l.url)))) return redirect(back(here, { error: 'enlace' }), 303);
    row.links = links;
  }
  if (section === 'medios' && (!['ar', 'fr', 'it', 'en', 'es'].includes(String(row.language)) || !['spoke_about_us', 'coverage'].includes(String(row.kind)))) return redirect(back(here, { error: 'faltan' }), 303);
  if (spec.required.some((k) => !String(form.get(k) ?? '').trim())) return redirect(back(here, { error: 'faltan' }), 303);
  if (row.url && !/^https?:\/\/\S+$/i.test(String(row.url))) return redirect(back(here, { error: 'enlace' }), 303);
  if (section === 'prensa' && !/^\d{4}-(0[1-9]|1[0-2])$/.test(String(row.date))) return redirect(back(here, { error: 'fecha' }), 303);

  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  let slug = id;

  if (id) {
    const { data, error } = await supabase.from(spec.table).update(row).eq('slug', id).select('slug');
    if (error || !data?.length) { console.error('content save failed', spec.table, error?.message); return redirect(back(here, { error: 'guardar' }), 303); }
  } else {
    const base = slugify(String(form.get(spec.slugFrom) || form.get(spec.required[0]) || ''));
    const { data: taken } = await supabase.from(spec.table).select('slug').like('slug', `${base}%`);
    const used = new Set((taken ?? []).map((r) => r.slug));
    slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    const extra: Record<string, number | string> = { slug };
    if (spec.ordered) {
      const { data: last } = await supabase.from(spec.table).select('sort_order').order('sort_order', { ascending: false }).limit(1);
      extra.sort_order = (last?.[0]?.sort_order ?? 0) + 1;
    }
    const { error } = await supabase.from(spec.table).insert({ ...row, ...extra } as never);
    if (error) { console.error('content insert failed', spec.table, error.message); return redirect(back(here, { error: 'guardar' }), 303); }
  }

  await supabase.from('content_changes').insert({ table_name: spec.table, row_slug: slug, summary: `${id ? 'Editado' : 'Añadido'}: ${spec.label} «${String(form.get(spec.slugFrom) || slug).slice(0, 80)}»`, user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect(back(`/admin/${section}/`, { ok: id ? 'guardado' : 'creado' }), 303);
};
