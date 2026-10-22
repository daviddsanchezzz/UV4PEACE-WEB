// Newsletter helpers: clean the editor's HTML, wrap it in an email-safe template, and send in batches.
// Pure functions where possible so they can be tested without Supabase or Resend.
import sanitizeHtml from 'sanitize-html';
import { site } from '../data/site';
import { resendBase } from './resend';

const NAVY = '#14365A';
const SKY = '#1F6AA5';
const INK_MUTED = '#4A6580';
const LINE = '#D9E6F2';
const font = "'Jost','Helvetica Neue',Arial,sans-serif";

// Email clients drop <style> blocks, so every element gets its own inline style.
const inline = (tag: string, css: string) => (_: string, attribs: Record<string, string>) => ({
  tagName: tag,
  attribs: { ...attribs, style: css },
});

export function sanitizeBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'h2', 'h3', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'a', 'br', 'hr'],
    allowedAttributes: { a: ['href', 'style'], '*': ['style'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    // Keep only our own inline styles: drop whatever came in with the pasted content.
    allowedStyles: {},
    transformTags: {
      p: inline('p', `margin:0 0 16px;font:400 17px/1.6 ${font};color:${NAVY};`),
      h2: inline('h2', `margin:28px 0 12px;font:500 24px/1.25 ${font};color:${NAVY};`),
      h3: inline('h3', `margin:24px 0 10px;font:600 19px/1.3 ${font};color:${NAVY};`),
      ul: inline('ul', `margin:0 0 16px;padding-left:24px;font:400 17px/1.6 ${font};color:${NAVY};`),
      ol: inline('ol', `margin:0 0 16px;padding-left:24px;font:400 17px/1.6 ${font};color:${NAVY};`),
      li: inline('li', 'margin:0 0 6px;'),
      blockquote: inline('blockquote', `margin:0 0 16px;padding:4px 0 4px 16px;border-left:3px solid #E5A236;color:${INK_MUTED};`),
      hr: inline('hr', `border:0;border-top:1px solid ${LINE};margin:24px 0;`),
      a: (_, attribs) => ({ tagName: 'a', attribs: { href: attribs.href ?? '', style: `color:${SKY};text-decoration:underline;` } }),
    },
    exclusiveFilter: (f) => f.tag === 'a' && !f.attribs.href,
  }).trim();
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface EmailParts { subject: string; preheader: string; bodyHtml: string; unsubscribeUrl: string; origin: string; contactEmail: string }

export function renderEmail(p: EmailParts): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(p.subject)}</title></head>
<body style="margin:0;padding:0;background:#F2F8FD;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escape(p.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F8FD;"><tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;">
    <tr><td style="padding:28px 32px 8px;"><img src="${p.origin}/logos/uv4peace-horizontal-color.png" alt="United Voices 4 Peace" width="200" style="display:block;border:0;height:auto;max-width:200px;"></td></tr>
    <tr><td style="padding:16px 32px 8px;">${p.bodyHtml}</td></tr>
    <tr><td style="padding:24px 32px 32px;border-top:1px solid ${LINE};font:400 13px/1.6 ${font};color:${INK_MUTED};">
      ${site.legalEntities.map(escape).join('<br>')}<br>
      Questions? Write to <a href="mailto:${escape(p.contactEmail)}" style="color:${SKY};">${escape(p.contactEmail)}</a>.<br>
      You receive this email because you subscribed on uv4peace.org. <a href="${escape(p.unsubscribeUrl)}" style="color:${SKY};">Unsubscribe</a>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

export function toText(bodyHtml: string, unsubscribeUrl: string): string {
  const text = sanitizeHtml(bodyHtml.replace(/<\/(p|h2|h3|li|blockquote)>/g, '\n\n').replace(/<br\s*\/?>/g, '\n').replace(/<hr[^>]*>/g, '\n---\n'), { allowedTags: [], allowedAttributes: {} });
  return `${text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\n{3,}/g, '\n\n').trim()}\n\n--\nUnsubscribe: ${unsubscribeUrl}\n`;
}

export interface Recipient { email: string; token: string }
export interface Campaign { subject: string; preheader: string; bodyHtml: string }

export const unsubscribeUrl = (origin: string, token: string) => `${origin}/api/unsubscribe?token=${token}`;

export function buildMessages(c: Campaign, recipients: Recipient[], opts: { origin: string; contactEmail: string; from: string }) {
  const body = sanitizeBody(c.bodyHtml);
  return recipients.map((r) => {
    const url = unsubscribeUrl(opts.origin, r.token);
    return {
      from: opts.from,
      to: [r.email],
      reply_to: opts.contactEmail,
      subject: c.subject,
      html: renderEmail({ ...c, bodyHtml: body, unsubscribeUrl: url, origin: opts.origin, contactEmail: opts.contactEmail }),
      text: toText(body, url),
      headers: { 'List-Unsubscribe': `<${url}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
    };
  });
}

/** Resend accepts up to 100 emails per batch call and ~2 calls per second. */
export async function sendBatches(apiKey: string, messages: object[], opts: { base?: string; pauseMs?: number } = {}) {
  const base = opts.base ?? resendBase();
  let sent = 0;
  let failed = 0;
  for (let i = 0; i < messages.length; i += 100) {
    const chunk = messages.slice(i, i + 100);
    try {
      const res = await fetch(`${base}/emails/batch`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk),
      });
      if (res.ok) sent += chunk.length;
      else { failed += chunk.length; console.error('Resend batch error', res.status, await res.text().catch(() => '')); }
    } catch (e) {
      failed += chunk.length;
      console.error('Resend batch failed', e);
    }
    if (i + 100 < messages.length) await new Promise((r) => setTimeout(r, opts.pauseMs ?? 600));
  }
  return { sent, failed };
}
