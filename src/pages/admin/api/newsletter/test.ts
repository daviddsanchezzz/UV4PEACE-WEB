import type { APIRoute } from 'astro';
import { buildMessages } from '../../../../lib/newsletter';
import { getSettings } from '../../../../lib/content';
import { resendBase } from '../../../../lib/resend';

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Sends one test copy to the person who is signed in, so they can check it in their own inbox.
export const POST: APIRoute = async ({ request, locals, url }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = locals.userEmail;
  if (!apiKey) return json({ ok: false, error: 'No hay clave de envío configurada (RESEND_API_KEY).' }, 503);
  if (!to) return json({ ok: false, error: 'No se ha podido saber a qué correo enviar la prueba.' }, 400);
  const form = await request.formData();
  const { email: contactEmail } = await getSettings();
  const [message] = buildMessages(
    { subject: `[PRUEBA] ${String(form.get('subject') ?? '').trim() || '(sin asunto)'}`, preheader: String(form.get('preheader') ?? ''), bodyHtml: String(form.get('body_html') ?? '') },
    [{ email: to, token: '00000000-0000-0000-0000-000000000000' }],
    { origin: url.origin, contactEmail, from: import.meta.env.CONTACT_FROM ?? 'UV4PEACE website <web@uv4peace.org>' },
  );
  const res = await fetch(`${resendBase()}/emails`, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify(message) });
  if (!res.ok) { console.error('Resend test error', res.status, await res.text().catch(() => '')); return json({ ok: false, error: 'El servicio de correo rechazó la prueba.' }, 502); }
  return json({ ok: true, to });
};
