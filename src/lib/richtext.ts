// Formatted text written in the panel (project texts). Stored as HTML, cleaned when saved and again before it is shown.
// Older entries are plain text with blank lines between paragraphs: they are turned into paragraphs on the fly.
import sanitizeHtml from 'sanitize-html';

const looksLikeHtml = (s: string) => /<\/?(p|br|ul|ol|li|h2|h3|strong|em|u|a|blockquote)[\s>/]/i.test(s);
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function toRichHtml(text: string | null | undefined): string {
  const s = (text ?? '').trim();
  if (!s) return '';
  if (looksLikeHtml(s)) return s;
  return s.split(/\n\s*\n/).map((para) => `<p>${escape(para.trim()).replace(/\n/g, '<br>')}</p>`).join('');
}

export function cleanRich(html: string): string {
  return sanitizeHtml(toRichHtml(html), {
    allowedTags: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'blockquote', 'a'],
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: { a: (tag, attribs) => ({ tagName: 'a', attribs: { href: attribs.href ?? '', target: '_blank', rel: 'noopener noreferrer' } }) },
  }).replace(/<p>\s*<\/p>/g, '').trim();
}
