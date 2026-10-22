// Landing point of the links in Supabase emails (invitation, password recovery): trades the one-time
// token for a session cookie, then sends the person to choose a password. The token never stays in the URL.
// Requires the email templates in Supabase to link here (see supabase/README.md).
import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

const types = new Set(['invite', 'recovery', 'magiclink', 'signup', 'email']);

export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const token_hash = url.searchParams.get('token_hash') ?? '';
  const type = url.searchParams.get('type') ?? '';
  if (!token_hash || !types.has(type)) return redirect('/admin/?error=enlace', 303);
  const { error } = await createClient(request, cookies).auth.verifyOtp({ token_hash, type: type as 'invite' });
  if (error) return redirect('/admin/?error=enlace', 303);
  return redirect(type === 'invite' || type === 'recovery' ? '/admin/nueva-contrasena/' : '/admin/inicio/', 303);
};
