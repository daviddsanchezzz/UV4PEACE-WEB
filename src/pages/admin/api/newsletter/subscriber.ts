import type { APIRoute } from 'astro';
import { connect } from '../../../../lib/newsletter-db';

// Add (action=add) or remove (action=delete) a subscriber by hand.
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const c = connect(request, cookies);
  if (!c.sb) return new Response('Supabase no está configurado.', { status: 503 });
  const form = await request.formData();
  const to = (q: string) => redirect(`/admin/newsletter/suscriptores/?${q}`, 303);

  if (form.get('action') === 'delete') {
    const { error } = await c.sb.from('subscribers').delete().eq('id', String(form.get('id') ?? ''));
    return to(error ? 'error=borrar' : 'borrado=1');
  }
  const email = String(form.get('email') ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return to('error=correo');
  // Added by hand: only for people who already agreed to receive emails. They start confirmed.
  const { error } = await c.sb.from('subscribers').insert({ email, status: 'confirmed', source: 'manual', confirmed_at: new Date().toISOString() });
  return to(error ? (error.code === '23505' ? 'error=existe' : 'error=anadir') : 'anadido=1');
};
