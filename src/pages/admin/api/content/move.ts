// Moves one row up or down in the order it has on the website.
import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';

// Rows are only compared inside their own list on the site: team and board are one list, other people groups are separate.
const lists: Record<string, { table: string; list?: string; back: string }> = {
  proyectos: { table: 'projects', back: '/admin/proyectos/' },
  personas: { table: 'people', list: 'group', back: '/admin/personas/' },
  socios: { table: 'partners', back: '/admin/socios/' },
  testimonios: { table: 'testimonials', back: '/admin/testimonios/' },
  cifras: { table: 'stats', back: '/admin/cifras/' },
};
const sameList = (a: string, b: string) => a === b || (['team', 'board'].includes(a) && ['team', 'board'].includes(b));

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const section = String(form.get('section') ?? '');
  const id = String(form.get('id') ?? '');
  const dir = form.get('dir') === 'up' ? -1 : 1;
  const spec = lists[section];
  if (!spec) return redirect('/admin/inicio/', 303);

  const supabase = createClient(request, cookies);
  const cols = spec.list ? `slug, sort_order, "${spec.list}"` : 'slug, sort_order';
  const { data, error } = await supabase.from(spec.table).select(cols).order('sort_order').order('slug');
  const all = (data ?? []) as unknown as Record<string, any>[];
  const me = all.find((r) => r.slug === id);
  if (error || !me) return redirect(`${spec.back}?error=orden`, 303);

  const mine = all.filter((r) => !spec.list || sameList(String(r[spec.list]), String(me[spec.list])));
  const i = mine.findIndex((r) => r.slug === id);
  const j = i + dir;
  if (j >= 0 && j < mine.length) {
    [mine[i], mine[j]] = [mine[j], mine[i]];
    for (let k = 0; k < mine.length; k++) {
      if (mine[k].sort_order === k + 1) continue;
      const { error: e } = await supabase.from(spec.table).update({ sort_order: k + 1 }).eq('slug', mine[k].slug);
      if (e) { console.error('reorder failed', e.message); return redirect(`${spec.back}?error=orden`, 303); }
    }
  }
  return redirect(`${spec.back}?ok=orden#${id}`, 303);
};
