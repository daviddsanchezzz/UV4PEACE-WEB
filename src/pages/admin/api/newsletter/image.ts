import type { APIRoute } from 'astro';
import { connect } from '../../../../lib/newsletter-db';

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const types: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
const MAX = 3 * 1024 * 1024;

// Uploads a picture for a newsletter to the public `media` bucket and returns its https address.
// The type is checked from the file's own bytes, not from the name the browser claims.
export const POST: APIRoute = async ({ request, cookies }) => {
  const c = connect(request, cookies);
  if (!c.sb) return json({ ok: false, error: 'Las imágenes se activarán al conectar la base de datos.' }, 503);

  const file = (await request.formData()).get('file');
  if (!(file instanceof File)) return json({ ok: false, error: 'No se ha recibido ninguna imagen.' }, 400);
  if (file.size > MAX) return json({ ok: false, error: 'La imagen pesa más de 3 MB. Redúcela y vuelve a probar.' }, 413);

  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const is = (...b: number[]) => b.every((v, i) => head[i] === v);
  const type = is(0xff, 0xd8, 0xff) ? 'image/jpeg' : is(0x89, 0x50, 0x4e, 0x47) ? 'image/png' : is(0x47, 0x49, 0x46, 0x38) ? 'image/gif'
    : is(0x52, 0x49, 0x46, 0x46) && head[8] === 0x57 && head[9] === 0x45 && head[10] === 0x42 && head[11] === 0x50 ? 'image/webp' : '';
  if (!type) return json({ ok: false, error: 'Solo se admiten imágenes JPG, PNG, WebP o GIF.' }, 415);

  const path = `newsletter/${crypto.randomUUID()}.${types[type]}`;
  const { error } = await c.sb.storage.from('media').upload(path, file, { contentType: type, cacheControl: '31536000', upsert: false });
  if (error) { console.error('image upload failed', error.message); return json({ ok: false, error: 'No se ha podido subir la imagen.' }, 502); }
  return json({ ok: true, url: c.sb.storage.from('media').getPublicUrl(path).data.publicUrl });
};
