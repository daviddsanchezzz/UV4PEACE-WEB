// One-time tool: moves photos that live in the website's code (and the board portraits still on the old site)
// into the public `media` storage, and points the database at the new addresses. Runs with the signed-in
// editor's own session, in three steps called by the Ajustes page: plan, upload (one photo per call), apply.
import type { APIRoute } from 'astro';
import type { ImageMetadata } from 'astro';
import { createClient } from '../../../lib/supabase';
import { imageSize } from '../../../lib/imagesize';
import { founder as founderDefault } from '../../../data/site';

const local = import.meta.glob<{ default: ImageMetadata }>('../../../assets/fotos/*.{jpg,jpeg,png}', { eager: true });
const byName = new Map(Object.entries(local).map(([k, v]) => [k.split('/').pop()!, v.default]));
const OLD_SITE = /^https:\/\/uv4peace\.org\/wp-content\//;

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const needsMove = (src: unknown): src is string => typeof src === 'string' && (byName.has(src) || OLD_SITE.test(src));
type Ref = { src?: string; [k: string]: unknown } | null | undefined;

export const POST: APIRoute = async ({ request, cookies, url }) => {
  const supabase = createClient(request, cookies);
  const body = await request.json().catch(() => ({}));
  const publicBase = `${import.meta.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/`;

  // Every photo reference stored in the database, with a way to rewrite it.
  const [projects, testimonials, people, settings] = await Promise.all([
    supabase.from('projects').select('slug, cover, hero, gallery, documentary, partner_block'),
    supabase.from('testimonials').select('slug, photo'),
    supabase.from('people').select('slug, photo'),
    supabase.from('site_settings').select('id, founder').eq('id', true).maybeSingle(),
  ]);
  if (projects.error || testimonials.error || people.error || settings.error) return json({ ok: false, error: 'No se ha podido leer la base de datos.' }, 500);

  const refsOf = (): string[] => {
    const out: string[] = [];
    const add = (r: Ref) => { if (r && needsMove(r.src)) out.push(r.src); };
    for (const p of projects.data ?? []) { add(p.cover); add(p.hero); (p.gallery ?? []).forEach(add); add(p.documentary?.poster); add(p.partner_block?.photo); }
    testimonials.data?.forEach((t) => add(t.photo));
    people.data?.forEach((x) => add(x.photo));
    if (settings.data?.founder) add(settings.data.founder.photo); else if (needsMove(founderDefault.photo.src)) out.push(founderDefault.photo.src);
    return [...new Set(out)];
  };

  if (body.action === 'plan') return json({ ok: true, files: refsOf() });

  if (body.action === 'upload') {
    const src = String(body.src ?? '');
    if (!needsMove(src)) return json({ ok: false, error: 'Foto no válida.' }, 400);
    const meta = byName.get(src);
    const res = await fetch(meta ? new URL(meta.src, url.origin) : src);
    if (!res.ok) return json({ ok: false, error: `No se ha podido leer ${src} (${res.status}).` }, 502);
    const bytes = new Uint8Array(await res.arrayBuffer());
    const size = imageSize(bytes) ?? (meta ? { w: meta.width, h: meta.height, type: 'jpg' as const } : null);
    if (!size || !size.w || !size.h) return json({ ok: false, error: `No se reconoce el formato de ${src}.` }, 415);
    const fileName = meta ? src : `retrato-${src.split('/').pop()!.replace(/[^\w.-]+/g, '-').toLowerCase()}`;
    const path = `fotos/${fileName}`;
    const type = size.type === 'png' ? 'image/png' : size.type === 'webp' ? 'image/webp' : 'image/jpeg';
    const { error } = await supabase.storage.from('media').upload(path, bytes, { contentType: type, cacheControl: '31536000', upsert: true });
    if (error) return json({ ok: false, error: error.message }, 502);
    return json({ ok: true, url: supabase.storage.from('media').getPublicUrl(path).data.publicUrl, w: size.w, h: size.h });
  }

  if (body.action === 'apply') {
    const map = (body.map ?? {}) as Record<string, { url: string; w: number; h: number }>;
    for (const v of Object.values(map)) if (!String(v.url).startsWith(publicBase)) return json({ ok: false, error: 'Dirección no válida.' }, 400);
    const swap = <T extends Ref>(r: T): T => {
      const m = r?.src ? map[r.src] : undefined;
      return (m ? { ...r, src: m.url, w: m.w, h: m.h } : r) as T;
    };
    let changed = 0;
    const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
    for (const p of projects.data ?? []) {
      const next = { cover: swap(p.cover), hero: swap(p.hero), gallery: p.gallery ? p.gallery.map(swap) : p.gallery,
        documentary: p.documentary ? { ...p.documentary, poster: swap(p.documentary.poster) } : p.documentary,
        partner_block: p.partner_block ? { ...p.partner_block, photo: swap(p.partner_block.photo) } : p.partner_block };
      if (same(next, { cover: p.cover, hero: p.hero, gallery: p.gallery, documentary: p.documentary, partner_block: p.partner_block })) continue;
      const { error } = await supabase.from('projects').update(next).eq('slug', p.slug);
      if (error) return json({ ok: false, error: error.message }, 502);
      changed++;
    }
    for (const [table, rows] of [['testimonials', testimonials.data], ['people', people.data]] as const) {
      for (const r of rows ?? []) {
        const next = swap(r.photo);
        if (same(next, r.photo)) continue;
        const { error } = await supabase.from(table).update({ photo: next }).eq('slug', r.slug);
        if (error) return json({ ok: false, error: error.message }, 502);
        changed++;
      }
    }
    const f = settings.data?.founder ?? { ...founderDefault };
    const nextFounder = { ...f, photo: swap(f.photo) };
    if (!same(nextFounder, settings.data?.founder)) {
      const { error } = await supabase.from('site_settings').update({ founder: nextFounder }).eq('id', true);
      if (error) return json({ ok: false, error: error.message }, 502);
      changed++;
    }
    return json({ ok: true, changed });
  }
  return json({ ok: false, error: 'Acción desconocida.' }, 400);
};
