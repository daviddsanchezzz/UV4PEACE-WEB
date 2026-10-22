// GET only shows a confirmation page, so mail scanners that open links cannot unsubscribe anyone.
// POST does the work: from that page's button, or as an RFC 8058 one-click request from the mail client.
import type { APIRoute } from 'astro';
import { createClient, supabaseConfigured } from '../../lib/supabase';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET: APIRoute = ({ redirect, url }) => {
  const token = url.searchParams.get('token') ?? '';
  return redirect(uuid.test(token) ? `/newsletter/?status=leave&token=${token}` : '/newsletter/?status=invalid', 303);
};

export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  let token = url.searchParams.get('token') ?? '';
  if (!token) token = String((await request.formData().catch(() => null))?.get('token') ?? '');
  if (!uuid.test(token) || !supabaseConfigured()) return redirect('/newsletter/?status=invalid', 303);
  await createClient(request, cookies).rpc('unsubscribe', { p_token: token });
  return redirect('/newsletter/?status=unsubscribed', 303);
};
