// Reads the { src, alt, pos } JSON the photo picker puts in a form. null means "no photo".
// Only https addresses or the names of files bundled with the site are accepted.
export interface PhotoValue { src: string; alt: string; pos: string }

export function parsePhoto(raw: unknown): PhotoValue | null | 'invalid' {
  const s = String(raw ?? '').trim();
  if (!s) return null;
  try {
    const v = JSON.parse(s);
    const src = String(v.src ?? '');
    const pos = String(v.pos ?? '50% 50%');
    const web = import.meta.env.DEV ? /^https?:\/\/\S+$/ : /^https:\/\/\S+$/; // plain http only while developing locally
    if (!web.test(src) && !/^[\w.\-]+\.(jpe?g|png|webp)$/i.test(src)) return 'invalid';
    if (!/^\d{1,3}% \d{1,3}%$/.test(pos)) return 'invalid';
    return { src, alt: String(v.alt ?? '').slice(0, 300), pos };
  } catch {
    return 'invalid';
  }
}
