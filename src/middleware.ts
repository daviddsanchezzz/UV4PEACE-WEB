// Guards /admin. Public pages are untouched.
// - Supabase not configured: closed in production (503), open in `astro dev` so the prototype can be browsed.
// - Configured: only a signed-in user listed in `editors` gets in; everyone else goes to the login page.
import { defineMiddleware } from 'astro:middleware';
import { createClient, supabaseConfigured } from './lib/supabase';

// Reachable without a session: the login screen and the endpoints that create or recover one.
const open = new Set(['/admin', '/admin/olvide', '/admin/auth/callback', '/admin/api/login', '/admin/api/reset', '/admin/api/logout']);

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/admin' && !path.startsWith('/admin/')) return next();

  if (!supabaseConfigured()) {
    if (import.meta.env.DEV) return next();
    return new Response('El panel aún no está configurado.', { status: 503, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
  }

  let res: Response;
  if (open.has(path)) {
    res = await next();
  } else {
    const supabase = createClient(ctx.request, ctx.cookies);
    const { data } = await supabase.auth.getUser();
    if (!data.user) return ctx.redirect('/admin/', 303);
    const { data: editor } = await supabase.from('editors').select('user_id').eq('user_id', data.user.id).maybeSingle();
    if (!editor) {
      await supabase.auth.signOut();
      return ctx.redirect('/admin/?error=permiso', 303);
    }
    ctx.locals.userEmail = data.user.email ?? undefined;
    res = await next();
  }
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex');
  return res;
});
