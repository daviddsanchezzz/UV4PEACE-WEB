// Saves the site settings row (contact email, PayPal link, analytics ID, social links).
import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';

const back = (error: string) => `/admin/ajustes/?error=${error}`;
const networks = ['Instagram', 'LinkedIn', 'YouTube'];

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const text = (k: string) => String(form.get(k) ?? '').trim().slice(0, 300);
  const email = text('email');
  const paypal = text('paypal');
  const ga = text('ga').toUpperCase();
  const social = networks.map((label) => ({ label, href: text(`social_${label}`) }));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect(back('correo'), 303);
  if (paypal && !/^https:\/\/\S+$/i.test(paypal)) return redirect(back('paypal'), 303);
  if (ga && !/^G-[A-Z0-9]{4,14}$/.test(ga)) return redirect(back('ga'), 303);
  if (social.some((x) => x.href && !/^https?:\/\/\S+$/i.test(x.href))) return redirect(back('redes'), 303);

  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('site_settings').update({ contact_email: email, paypal_url: paypal, analytics_id: ga, social }).eq('id', true).select('id');
  if (error || !data?.length) { console.error('settings save failed', error?.message); return redirect(back('guardar'), 303); }
  await supabase.from('content_changes').insert({ table_name: 'site_settings', summary: 'Editados los ajustes de la web', user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect('/admin/ajustes/?ok=1', 303);
};
