// Saves the site settings row (contact email, PayPal link, analytics ID, social links).
import type { APIRoute } from 'astro';
import { createClient } from '../../../lib/supabase';
import { parsePhoto } from '../../../admin/photo';

const back = (error: string) => `/admin/ajustes/?error=${error}`;
const networks = ['Instagram', 'LinkedIn', 'YouTube'];

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const text = (k: string) => String(form.get(k) ?? '').trim().slice(0, 300);
  const email = text('email');
  const paypal = text('paypal');
  const ga = text('ga').toUpperCase();
  const social = networks.map((label) => ({ label, href: text(`social_${label}`) }));

  const featuredIn = String(form.get('featured_in') ?? '').split('\n').map((l) => l.trim().slice(0, 60)).filter(Boolean).slice(0, 12);
  const photo = parsePhoto(form.get('f_photo'));
  const founder = { name: text('f_name'), role: text('f_role'), quote: String(form.get('f_quote') ?? '').trim().slice(0, 600), bio: String(form.get('f_bio') ?? '').trim().slice(0, 3000), photo };

  if (!founder.name || !founder.role) return redirect(back('fundadora'), 303);
  if (photo === 'invalid' || !photo) return redirect(back('foto'), 303);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect(back('correo'), 303);
  if (paypal && !/^https:\/\/\S+$/i.test(paypal)) return redirect(back('paypal'), 303);
  if (ga && !/^G-[A-Z0-9]{4,14}$/.test(ga)) return redirect(back('ga'), 303);
  if (social.some((x) => x.href && !/^https?:\/\/\S+$/i.test(x.href))) return redirect(back('redes'), 303);

  const supabase = createClient(request, cookies);
  const { data: auth } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('site_settings').update({ contact_email: email, paypal_url: paypal, analytics_id: ga, social, featured_in: featuredIn, founder }).eq('id', true).select('id');
  if (error || !data?.length) { console.error('settings save failed', error?.message); return redirect(back('guardar'), 303); }
  await supabase.from('content_changes').insert({ table_name: 'site_settings', summary: 'Editados los ajustes de la web', user_id: auth.user?.id ?? null, published_at: new Date().toISOString() });
  return redirect('/admin/ajustes/?ok=1', 303);
};
