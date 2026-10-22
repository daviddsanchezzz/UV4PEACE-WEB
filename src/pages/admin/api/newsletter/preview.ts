import type { APIRoute } from 'astro';
import { renderEmail, sanitizeBody } from '../../../../lib/newsletter';
import { getSettings } from '../../../../lib/content';

// Returns the email exactly as subscribers will see it. Nothing is stored or sent.
export const POST: APIRoute = async ({ request, url }) => {
  const form = await request.formData();
  const { email } = await getSettings();
  const html = renderEmail({
    subject: String(form.get('subject') ?? ''),
    preheader: String(form.get('preheader') ?? ''),
    bodyHtml: sanitizeBody(String(form.get('body_html') ?? '')),
    unsubscribeUrl: '#',
    origin: url.origin,
    contactEmail: email,
  });
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
};
