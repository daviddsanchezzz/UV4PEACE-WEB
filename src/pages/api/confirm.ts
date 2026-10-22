import type { APIRoute } from 'astro';
import { createClient, supabaseConfigured } from '../../lib/supabase';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET: APIRoute = async ({ request, cookies, redirect, url }) => {
  const token = url.searchParams.get('token') ?? '';
  if (!uuid.test(token) || !supabaseConfigured()) return redirect('/newsletter/?status=invalid', 303);
  const { data } = await createClient(request, cookies).rpc('confirm_subscription', { p_token: token });
  return redirect(data ? '/newsletter/?status=confirmed' : '/newsletter/?status=invalid', 303);
};
