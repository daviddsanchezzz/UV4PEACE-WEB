// Newsletter sign-up, step 1 of 2: stores a pending subscriber and emails a confirmation link.
// The visitor gets the same answer whether or not the address was already known.
import type { APIRoute } from 'astro';
import { createClient, supabaseConfigured } from '../../lib/supabase';
import { resendBase } from '../../lib/resend';
import { renderEmail } from '../../lib/newsletter';
import { getSettings } from '../../lib/content';

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export const POST: APIRoute = async ({ request, cookies, url }) => {
  const form = await request.formData();
  if (String(form.get('website') ?? '').trim()) return json({ ok: true }); // honeypot

  const email = String(form.get('email') ?? '').trim().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || form.get('consent') === null) return json({ ok: false, error: 'invalid' }, 400);

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!supabaseConfigured() || !apiKey) return json({ ok: false, error: 'not_configured' }, 503);

  const { data: token, error } = await createClient(request, cookies).rpc('subscribe', { p_email: email, p_token: crypto.randomUUID() });
  if (error) { console.error('subscribe failed', error.message); return json({ ok: false, error: 'failed' }, 500); }
  if (!token) return json({ ok: true }); // already confirmed: nothing to send

  const { email: contactEmail } = await getSettings();
  const confirmUrl = `${url.origin}/api/confirm?token=${token}`;
  const body = `<p style="margin:0 0 16px;font:400 17px/1.6 'Jost','Helvetica Neue',Arial,sans-serif;color:#14365A;">Thank you for your interest in United Voices 4 Peace.</p>
<p style="margin:0 0 24px;font:400 17px/1.6 'Jost','Helvetica Neue',Arial,sans-serif;color:#14365A;">Please confirm your email address to start receiving our news:</p>
<p style="margin:0 0 24px;"><a href="${confirmUrl}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#E5A236;color:#14365A;font:500 15px 'Jost','Helvetica Neue',Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;">Confirm subscription</a></p>
<p style="margin:0 0 16px;font:400 14px/1.6 'Jost','Helvetica Neue',Arial,sans-serif;color:#4A6580;">If you did not ask for this, you can ignore this email and nothing will happen.</p>`;
  const res = await fetch(`${resendBase()}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: import.meta.env.CONTACT_FROM ?? 'UV4PEACE website <web@uv4peace.org>',
      to: [email],
      reply_to: contactEmail,
      subject: 'Confirm your subscription to United Voices 4 Peace',
      html: renderEmail({ subject: 'Confirm your subscription', preheader: 'One click to confirm your email address.', bodyHtml: body, unsubscribeUrl: `${url.origin}/api/unsubscribe?token=${token}`, origin: url.origin, contactEmail }),
      text: `Please confirm your subscription to United Voices 4 Peace:\n${confirmUrl}\n\nIf you did not ask for this, ignore this email.\n`,
    }),
  });
  if (!res.ok) { console.error('Resend error', res.status, await res.text().catch(() => '')); return json({ ok: false, error: 'send_failed' }, 502); }
  return json({ ok: true });
};
