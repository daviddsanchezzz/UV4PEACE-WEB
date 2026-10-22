// Uploads a photo (people, projects) to the public `media` bucket and returns its https address.
// The type is checked from the file's own bytes, not from the name the browser claims.
import type { APIRoute } from 'astro';
import { createClient, supabaseConfigured } from '../../../../lib/supabase';

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const types: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MAX = 8 * 1024 * 1024;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!supabaseConfigured()) return json({ ok: false, error: 'Las fotos se activarán al conectar la base de datos.' }, 503);
  const file = (await request.formData()).get('file');
  if (!(file instanceof File)) return json({ ok: false, error: 'No se ha recibido ninguna foto.' }, 400);
  if (file.size > MAX) return json({ ok: false, error: 'La foto pesa más de 8 MB. Reduce su tamaño y vuelve a probar.' }, 413);

  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const is = (...b: number[]) => b.every((v, i) => head[i] === v);
  const type = is(0xff, 0xd8, 0xff) ? 'image/jpeg' : is(0x89, 0x50, 0x4e, 0x47) ? 'image/png'
    : is(0x52, 0x49, 0x46, 0x46) && head[8] === 0x57 && head[9] === 0x45 && head[10] === 0x42 && head[11] === 0x50 ? 'image/webp' : '';
  if (!type) return json({ ok: false, error: 'Solo se admiten fotos JPG, PNG o WebP.' }, 415);

  const supabase = createClient(request, cookies);
  const path = `fotos/${crypto.randomUUID()}.${types[type]}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { contentType: type, cacheControl: '31536000', upsert: false });
  if (error) { console.error('photo upload failed', error.message); return json({ ok: false, error: 'No se ha podido subir la foto.' }, 502); }
  return json({ ok: true, url: supabase.storage.from('media').getPublicUrl(path).data.publicUrl });
};
