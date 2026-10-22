import type { APIRoute } from 'astro';
import { connect } from '../../../../lib/newsletter-db';
import { buildMessages, sendBatches } from '../../../../lib/newsletter';
import { getSettings } from '../../../../lib/content';

// Sends a saved draft to every confirmed subscriber. Guards against double sends and against the
// audience changing between the screen and the click.
export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const c = connect(request, cookies);
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!c.sb || !apiKey) return new Response('El envío no está configurado.', { status: 503 });

  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const back = (q: string) => redirect(`/admin/newsletter/${id}/?${q}`, 303);
  if (form.get('confirm') !== 'yes') return back('error=confirmar');

  const { data: draft } = await c.sb.from('newsletters').select('*').eq('id', id).eq('status', 'draft').maybeSingle();
  if (!draft) return back('error=estado');
  if (!draft.subject.trim() || !draft.body_html.trim()) return back('error=vacia');

  const { data: subs, error } = await c.sb.from('subscribers').select('email, token').eq('status', 'confirmed');
  if (error || !subs?.length) return back('error=sinsuscriptores');
  if (String(subs.length) !== String(form.get('expected'))) return back(`error=cambio&ahora=${subs.length}`);

  // Claim the draft first: if two people click at once, only one gets past this line.
  const { data: claimed } = await c.sb.from('newsletters').update({ status: 'sending' }).eq('id', id).eq('status', 'draft').select('id');
  if (!claimed?.length) return back('error=estado');

  const { email: contactEmail } = await getSettings();
  const messages = buildMessages(
    { subject: draft.subject, preheader: draft.preheader, bodyHtml: draft.body_html },
    subs.map((s) => ({ email: s.email, token: s.token })),
    { origin: url.origin, contactEmail, from: import.meta.env.CONTACT_FROM ?? 'UV4PEACE website <web@uv4peace.org>' },
  );
  const { sent, failed } = await sendBatches(apiKey, messages);

  if (sent === 0) {
    await c.sb.from('newsletters').update({ status: 'draft' }).eq('id', id);
    return back('error=envio');
  }
  await c.sb.from('newsletters').update({ status: 'sent', sent_at: new Date().toISOString(), recipients: sent, failed }).eq('id', id);
  return back(`enviada=${sent}&fallidos=${failed}`);
};
