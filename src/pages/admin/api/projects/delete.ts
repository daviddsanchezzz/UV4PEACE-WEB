import type { APIRoute } from 'astro';
import { createClient } from '../../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const id = String((await request.formData()).get('slug') ?? '');
  if (!id) return redirect('/admin/proyectos/', 303);
  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('projects').delete().eq('slug', id).select('slug, title');
  if (error || !data?.length) { console.error('project delete failed', error?.message); return redirect(`/admin/proyectos/${id}/?error=quitar`, 303); }
  await supabase.from('content_changes').insert({ table_name: 'projects', row_slug: id, summary: `Quitado proyecto «${data[0].title}»`, user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect('/admin/proyectos/?ok=quitado', 303);
};
