import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const id = String((await request.formData()).get('id') ?? '');
  if (!id) return redirect('/admin/personas/', 303);
  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('people').delete().eq('slug', id).select('slug, name');
  if (error || !data?.length) { console.error('person delete failed', error?.message); return redirect(`/admin/personas/${id}/?error=quitar`, 303); }
  await supabase.from('content_changes').insert({ table_name: 'people', row_slug: id, summary: `Quitada persona «${data[0].name}»`, user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect('/admin/personas/?ok=quitado', 303);
};
