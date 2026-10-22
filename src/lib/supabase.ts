// Supabase client for the admin panel. The session lives in cookies, so the server can check
// who is calling on every request. Only the public (publishable) key is used here.
import { createServerClient, parseCookieHeader, type CookieOptions } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

export const supabaseConfigured = () =>
  Boolean(import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY);

export function createClient(request: Request, cookies: AstroCookies) {
  return createServerClient(import.meta.env.PUBLIC_SUPABASE_URL!, import.meta.env.PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => parseCookieHeader(request.headers.get('Cookie') ?? '').map((c) => ({ name: c.name, value: c.value ?? '' })),
      setAll: (list: { name: string; value: string; options: CookieOptions }[]) => list.forEach(({ name, value, options }) => cookies.set(name, value, options)),
    },
  });
}
