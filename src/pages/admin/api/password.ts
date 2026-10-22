import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = String(form.get('password') ?? '');
  const again = String(form.get('again') ?? '');
  if (password.length < 10) return redirect('/admin/nueva-contrasena/?error=corta', 303);
  if (password !== again) return redirect('/admin/nueva-contrasena/?error=distinta', 303);
  const { error } = await createClient(request, cookies).auth.updateUser({ password });
  if (error) return redirect('/admin/nueva-contrasena/?error=fallo', 303);
  return redirect('/admin/inicio/', 303);
};
