import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  if (!email || !password) return redirect('/admin/?error=datos', 303);
  const { error } = await createClient(request, cookies).auth.signInWithPassword({ email, password });
  if (error) return redirect('/admin/?error=credenciales', 303);
  return redirect('/admin/inicio/', 303);
};
