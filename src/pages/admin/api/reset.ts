import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

// Always answers the same way, so the form never reveals which emails have an account.
export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const email = String((await request.formData()).get('email') ?? '').trim();
  if (email) {
    await createClient(request, cookies).auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/admin/auth/callback?next=/admin/nueva-contrasena/`,
    });
  }
  return redirect('/admin/olvide/?enviado=1', 303);
};
