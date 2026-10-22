// Removes one row of a simple admin section from the website.
import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';
import { tables } from '../../../../admin/tables';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const section = String(form.get('section') ?? '');
  const id = String(form.get('id') ?? '');
  const spec = tables[section];
  if (!spec || !id) return redirect('/admin/inicio/', 303);

  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  const { data, error } = await supabase.from(spec.table).delete().eq('slug', id).select('slug');
  if (error || !data?.length) { console.error('content delete failed', spec.table, error?.message); return redirect(`/admin/${section}/${id}/?error=quitar`, 303); }

  await supabase.from('content_changes').insert({ table_name: spec.table, row_slug: id, summary: `Quitado: ${spec.label} «${id}»`, user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect(`/admin/${section}/?ok=quitado`, 303);
};
