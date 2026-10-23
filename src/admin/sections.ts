// Admin config for the simple content sections (press, partners, testimonials, stats).
// Each one is a list plus a flat form, rendered by pages/admin/[section]/.
import { getPress, getPartners, getTestimonials, getStats, getMedia, getPressArchive, type Db } from '../lib/content';

export type FieldType = 'text' | 'textarea' | 'select' | 'toggle';
export interface Field { key: string; label: string; type: FieldType; hint?: string; options?: { v: string; l: string }[]; placeholder?: string }
export interface Row { id: string; title: string; sub: string; pills: { t: string; tone?: 'ok' | 'warn' }[]; values: Record<string, string | boolean> }
export interface Section { slug: string; label: string; singular: string; intro: string; fields: Field[]; rows: Row[]; reorder: boolean }

const kind = [{ v: 'award', l: 'Premio' }, { v: 'honour', l: 'Reconocimiento' }, { v: 'selection', l: 'Selección oficial' }, { v: 'nomination', l: 'Nominación' }, { v: 'seal', l: 'Sello' }];
const tier = [{ v: 'main', l: 'Socio principal' }, { v: 'partner', l: 'Socio' }, { v: 'supporter', l: 'Apoyo' }];
const kindLabel = Object.fromEntries(kind.map((k) => [k.v, k.l]));
const languages = [{ v: 'en', l: 'Inglés' }, { v: 'es', l: 'Español' }, { v: 'fr', l: 'Francés' }, { v: 'it', l: 'Italiano' }, { v: 'ar', l: 'Árabe' }];
const langLabel = Object.fromEntries(languages.map((k) => [k.v, k.l]));
const tierLabel = Object.fromEntries(tier.map((k) => [k.v, k.l]));

export async function getSections(db?: Db): Promise<Record<string, Section>> {
  const [press, partners, testimonials, stats, media, archive] = await Promise.all([getPress(db), getPartners(db), getTestimonials(db), getStats(db), getMedia(db), getPressArchive(db)]);
  return {
  prensa: {
    slug: 'prensa', label: 'Prensa y premios', singular: 'reconocimiento', reorder: false,
    intro: 'Premios, reconocimientos y selecciones que aparecen en la home y en la página Press.',
    fields: [
      { key: 'title', label: 'Título', type: 'text' },
      { key: 'by', label: 'Quién lo otorga o dónde', type: 'text' },
      { key: 'kind', label: 'Tipo', type: 'select', options: kind },
      { key: 'dateLabel', label: 'Fecha (como se lee en la web)', type: 'text', placeholder: 'Aug 2025' },
      { key: 'date', label: 'Mes y año, para ordenar', type: 'text', placeholder: '2025-08', hint: 'Formato AAAA-MM. Lo más reciente sale primero.' },
      { key: 'url', label: 'Enlace', type: 'text', placeholder: 'https://', hint: 'Opcional.' },
      { key: 'featured', label: 'Mostrar en la home', type: 'toggle' },
    ],
    rows: press.map((p) => ({ id: p.id, title: p.title, sub: `${p.dateLabel} · ${p.by}`, pills: [{ t: kindLabel[p.kind] }, ...(p.featured ? [{ t: 'En la home', tone: 'ok' as const }] : [])], values: { title: p.title, by: p.by, kind: p.kind, dateLabel: p.dateLabel, date: p.date, url: p.url, featured: p.featured } })),
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
  medios: {
    slug: 'medios', label: 'Medios', singular: 'medio', reorder: true,
    intro: 'Medios que han hablado de UV4PEACE. Salen en la página Press, agrupados por idioma. Solo el marcado como «Destacado» sale arriba como «Spoke about us».',
    fields: [
      { key: 'outlet', label: 'Nombre del medio', type: 'text', placeholder: 'Forbes' },
      { key: 'url', label: 'Enlace al artículo', type: 'text', placeholder: 'https://', hint: 'Si aún no lo tienes, déjalo vacío: la web mostrará «link coming soon».' },
      { key: 'language', label: 'Idioma', type: 'select', options: languages },
      { key: 'kind', label: 'Dónde sale', type: 'select', options: [{ v: 'coverage', l: 'En la lista de medios' }, { v: 'spoke_about_us', l: 'Destacado arriba («Spoke about us»)' }] },
    ],
    rows: media.all.map((m) => ({ id: m.id, title: m.outlet, sub: m.url || 'Sin enlace todavía', pills: [{ t: langLabel[m.language] ?? m.language }, ...(m.kind === 'spoke_about_us' ? [{ t: 'Destacado', tone: 'ok' as const }] : []), ...(m.url ? [] : [{ t: 'Sin enlace', tone: 'warn' as const }])], values: { outlet: m.outlet, url: m.url, language: m.language, kind: m.kind } })),
  },
  archivo: {
    slug: 'archivo', label: 'Archivo de prensa', singular: 'artículo antiguo', reorder: true,
    intro: 'Cobertura antigua que sale en «Earlier coverage» de la página Press.',
    fields: [
      { key: 'title', label: 'Título', type: 'text', placeholder: 'La Voce di New York' },
      { key: 'dateLabel', label: 'Fecha (como se lee en la web)', type: 'text', placeholder: 'Mar 2018', hint: 'Opcional.' },
      { key: 'links', label: 'Enlaces', type: 'textarea', hint: 'Uno por línea, con el formato «Texto | https://enlace». Por ejemplo: English version | https://…' },
    ],
    rows: archive.map((a) => ({ id: a.id, title: a.title, sub: a.date || 'Sin fecha', pills: [{ t: `${a.links.length} ${a.links.length === 1 ? 'enlace' : 'enlaces'}` }], values: { title: a.title, dateLabel: a.date, links: a.links.map((l) => `${l.label} | ${l.url}`).join('\n') } })),
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
