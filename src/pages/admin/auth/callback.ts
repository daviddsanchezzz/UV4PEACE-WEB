import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

// Landing point of the emailed recovery link: trades the one-time code for a session.
export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/admin/inicio/';
  const safeNext = next.startsWith('/admin/') && !next.startsWith('//') ? next : '/admin/inicio/';
  if (!code) return redirect('/admin/?error=enlace', 303);
  const { error } = await createClient(request, cookies).auth.exchangeCodeForSession(code);
  if (error) return redirect('/admin/?error=enlace', 303);
  return redirect(safeNext, 303);
};
