import type { APIRoute } from 'astro';
import { connect } from '../../../../lib/newsletter-db';
import { sanitizeForStorage } from '../../../../lib/newsletter';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const c = connect(request, cookies);
  if (!c.sb) return new Response('Supabase no está configurado.', { status: 503 });
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const row = {
    subject: String(form.get('subject') ?? '').trim().slice(0, 200),
    preheader: String(form.get('preheader') ?? '').trim().slice(0, 200),
    body_html: sanitizeForStorage(String(form.get('body_html') ?? '')),
  };
  if (id && id !== 'nueva') {
    const { error } = await c.sb.from('newsletters').update(row).eq('id', id).eq('status', 'draft');
    return redirect(`/admin/newsletter/${id}/?${error ? 'error=guardar' : 'saved=1'}`, 303);
  }
  const { data: user } = await c.sb.auth.getUser();
  const { data, error } = await c.sb.from('newsletters').insert({ ...row, created_by: user.user?.id }).select('id').single();
  return redirect(error || !data ? '/admin/newsletter/nueva/?error=guardar' : `/admin/newsletter/${data.id}/?saved=1`, 303);
};
