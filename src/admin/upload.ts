// Browser side of photo uploads, shared by the single photo picker and the gallery.
// A photo that is already a reasonable size is uploaded untouched. A bigger one (phone and camera photos are often
// 4000 px and 5 MB or more) is shrunk to 2560 px on the long side and saved as high quality JPEG: the site never shows more.
const MAX_SIDE = 2560;
const KEEP_BELOW = 3 * 1024 * 1024;

async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number }> {
  const bmp = await createImageBitmap(file);
  const long = Math.max(bmp.width, bmp.height);
  if (long <= MAX_SIDE && file.size <= KEEP_BELOW) return { blob: file, w: bmp.width, h: bmp.height };
  const k = Math.min(1, MAX_SIDE / long);
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, 0, 0, c.width, c.height);
  const blob = await new Promise<Blob>((ok, no) => c.toBlob((b) => (b ? ok(b) : no(new Error('toBlob'))), 'image/jpeg', 0.92));
  return { blob, w: c.width, h: c.height };
}

export async function uploadPhoto(file: File): Promise<{ url: string; w: number; h: number }> {
  const { blob, w, h } = await prepare(file);
  const fd = new FormData();
  fd.append('file', blob, file.name);
  const res = await fetch('/admin/api/media/upload', { method: 'POST', body: fd });
  const out = await res.json().catch(() => ({}));
  if (!res.ok || !out.url) throw new Error(out.error || 'No se ha podido subir la foto.');
  return { url: out.url, w, h };
}
