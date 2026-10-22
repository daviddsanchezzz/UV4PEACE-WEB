// How each simple admin section is stored: which table, which form field goes to which column, and what is required.
// Form keys are the ones in sections.ts; columns are the ones in supabase/migrations.
export interface TableSpec {
  table: string;
  slugFrom: string;
  cols: Record<string, string>;
  bool: string[];
  required: string[];
  ordered: boolean;
  label: string;
}

export const tables: Record<string, TableSpec> = {
  prensa: { table: 'press_items', slugFrom: 'title', label: 'reconocimiento', ordered: false, bool: ['featured'], required: ['title', 'kind', 'date'], cols: { title: 'title', by: 'source', kind: 'kind', dateLabel: 'date_label', date: 'date', url: 'url', featured: 'featured' } },
  socios: { table: 'partners', slugFrom: 'name', label: 'socio', ordered: true, bool: ['active'], required: ['name'], cols: { name: 'name', tier: 'tier', url: 'url', active: 'active' } },
  testimonios: { table: 'testimonials', slugFrom: 'who', label: 'testimonio', ordered: true, bool: ['published', 'home'], required: ['text'], cols: { text: 'text', who: 'who', caption: 'caption', published: 'published', home: 'home' } },
  cifras: { table: 'stats', slugFrom: 'label', label: 'cifra', ordered: true, bool: [], required: ['n', 'label'], cols: { n: 'n', label: 'label' } },
};

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'nuevo';
