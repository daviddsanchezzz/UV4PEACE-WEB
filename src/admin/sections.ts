// Admin config for the simple content sections (press, partners, testimonials, stats).
// Each one is a list plus a flat form, rendered by pages/admin/[section]/.
import { getPress, getPartners, getTestimonials, getStats } from '../lib/content';

export type FieldType = 'text' | 'textarea' | 'select' | 'toggle';
export interface Field { key: string; label: string; type: FieldType; hint?: string; options?: { v: string; l: string }[]; placeholder?: string }
export interface Row { id: string; title: string; sub: string; pills: { t: string; tone?: 'ok' | 'warn' }[]; values: Record<string, string | boolean> }
export interface Section { slug: string; label: string; singular: string; intro: string; fields: Field[]; rows: Row[]; reorder: boolean }

const kind = [{ v: 'award', l: 'Premio' }, { v: 'honour', l: 'Reconocimiento' }, { v: 'selection', l: 'Selección oficial' }, { v: 'nomination', l: 'Nominación' }, { v: 'seal', l: 'Sello' }];
const tier = [{ v: 'main', l: 'Socio principal' }, { v: 'partner', l: 'Socio' }, { v: 'supporter', l: 'Apoyo' }];
const kindLabel = Object.fromEntries(kind.map((k) => [k.v, k.l]));
const tierLabel = Object.fromEntries(tier.map((k) => [k.v, k.l]));

export async function getSections(): Promise<Record<string, Section>> {
  const [press, partners, testimonials, stats] = await Promise.all([getPress(), getPartners(), getTestimonials(), getStats()]);
  return {
  prensa: {
    slug: 'prensa', label: 'Prensa y premios', singular: 'reconocimiento', reorder: false,
    intro: 'Premios, reconocimientos y selecciones que aparecen en la home y en la página Press.',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'by', label: 'Quién lo otorga o dónde', type: 'text' },
      { key: 'kind', label: 'Tipo', type: 'select', options: kind },
      { key: 'dateLabel', label: 'Fecha (como se lee en la web)', type: 'text', placeholder: 'Ago 2025' },
      { key: 'url', label: 'Enlace', type: 'text', placeholder: 'https://', hint: 'Opcional.' },
      { key: 'featured', label: 'Mostrar en la home', type: 'toggle' },
    ],
    rows: press.map((p) => ({ id: p.id, title: p.title, sub: `${p.dateLabel} · ${p.by}`, pills: [{ t: kindLabel[p.kind] }, ...(p.featured ? [{ t: 'En la home', tone: 'ok' as const }] : [])], values: { title: p.title, by: p.by, kind: p.kind, dateLabel: p.dateLabel, url: p.url, featured: p.featured } })),
  },
  socios: {
    slug: 'socios', label: 'Socios', singular: 'socio', reorder: true,
    intro: 'Organizaciones que colaboran. Sin logo autorizado, la web muestra solo el nombre.',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text' },
      { key: 'tier', label: 'Categoría', type: 'select', options: tier },
      { key: 'url', label: 'Sitio web', type: 'text', placeholder: 'https://' },
      { key: 'active', label: 'Mostrar en la web', type: 'toggle' },
    ],
    rows: partners.map((p) => ({ id: p.id, title: p.name, sub: tierLabel[p.tier], pills: [...(p.logo ? [] : [{ t: 'Sin logo', tone: 'warn' as const }]), ...(p.active ? [] : [{ t: 'Oculto' }])], values: { name: p.name, tier: p.tier, url: p.url, active: p.active } })),
  },
  testimonios: {
    slug: 'testimonios', label: 'Testimonios', singular: 'testimonio', reorder: true,
    intro: 'Citas de artistas y público. Las marcadas para la home salen en «Voices from the stage».',
    fields: [
      { key: 'text', label: 'Cita', type: 'textarea' },
      { key: 'who', label: 'Quién habla', type: 'text' },
      { key: 'caption', label: 'Pie', type: 'text', placeholder: 'Ej. Compositora, GWIM 2025' },
      { key: 'published', label: 'Publicado', type: 'toggle' },
      { key: 'home', label: 'Mostrar en la home', type: 'toggle' },
    ],
    rows: testimonials.map((t) => ({ id: t.id, title: t.who || t.id, sub: t.text.length > 90 ? t.text.slice(0, 90) + '…' : t.text, pills: [...(t.home ? [{ t: 'En la home', tone: 'ok' as const }] : []), ...(t.published ? [] : [{ t: 'Borrador', tone: 'warn' as const }])], values: { text: t.text, who: t.who, caption: t.caption, published: t.published, home: t.home } })),
  },
  cifras: {
    slug: 'cifras', label: 'Cifras', singular: 'cifra', reorder: true,
    intro: 'Los números de impacto de la home. Escribe el valor tal como debe verse, por ejemplo «2,400» o «200+».',
    fields: [
      { key: 'n', label: 'Valor', type: 'text', placeholder: '2,400' },
      { key: 'label', label: 'Etiqueta', type: 'text', placeholder: 'Asistentes' },
    ],
    rows: stats.map((s) => ({ id: s.id, title: `${s.n} · ${s.label}`, sub: 'Home, bloque «Impact in numbers»', pills: [], values: { n: s.n, label: s.label } })),
  },
  };
}
