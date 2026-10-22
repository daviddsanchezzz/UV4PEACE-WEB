import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  await createClient(request, cookies).auth.signOut();
  return redirect('/admin/', 303);
};
