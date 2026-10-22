// Contact form endpoint. Emails the message to the address set in the admin (Ajustes) and, when
// Supabase is configured, keeps a copy in contact_messages so nothing is lost if the email fails.
// Needs RESEND_API_KEY (and a verified sender in CONTACT_FROM); without it the form reports an error
// instead of pretending the message was sent.
import type { APIRoute } from 'astro';
import { getSettings } from '../../lib/content';
import { createClient, supabaseConfigured } from '../../lib/supabase';
import { resendBase } from '../../lib/resend';

const topics = ['General', 'Partnership', 'Press', 'Artists', 'Project proposal'];
const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);

export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (clean(form.get('website'), 200)) return json({ ok: true });

  const name = clean(form.get('name'), 120);
  const email = clean(form.get('email'), 200);
  const message = clean(form.get('message'), 5000);
  const topic = topics.includes(clean(form.get('topic'), 40)) ? clean(form.get('topic'), 40) : 'General';
  const consent = form.get('consent') !== null;
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) return json({ ok: false, error: 'invalid' }, 400);

  if (supabaseConfigured()) {
    try {
      await createClient(request, cookies).from('contact_messages').insert({ name, email, topic, message });
    } catch (e) {
      console.error('contact_messages insert failed', e);
    }
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, error: 'not_configured' }, 503);

  const { email: to } = await getSettings();
  const res = await fetch(`${resendBase()}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: import.meta.env.CONTACT_FROM ?? 'UV4PEACE website <web@uv4peace.org>',
      to: [to],
      reply_to: email,
      subject: `[Website · ${topic}] ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n`,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  return json({ ok: true });
};
