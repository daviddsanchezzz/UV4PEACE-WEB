// Turns a YouTube or Vimeo address into the address of its embeddable player, or null if it is neither.
// YouTube uses youtube-nocookie.com so nothing is stored in the visitor's browser until they press play.
export function embedUrl(address: string): string | null {
  let u: URL;
  try { u = new URL(address.trim()); } catch { return null; }
  const host = u.hostname.replace(/^www\.|^m\./, '');
  let id = '';
  if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (u.pathname === '/watch') id = u.searchParams.get('v') ?? '';
    else { const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/); id = m?.[1] ?? ''; }
  }
  if (/^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const m = u.pathname.match(/(\d{6,})/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1`;
  }
  return null;
}

/** The 11-character id of a YouTube address, or null (Vimeo and anything else). */
export function youtubeId(address: string): string | null {
  const m = embedUrl(address)?.match(/youtube-nocookie\.com\/embed\/([\w-]{11})/);
  return m?.[1] ?? null;
}
