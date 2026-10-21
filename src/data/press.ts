// Source of truth: WEB CLAUDE DESING/data/recognition.json. Maps to the Phase 2 `press_items` table.
export type RecognitionKind = 'award' | 'honour' | 'selection' | 'nomination' | 'seal';

export interface PressItem {
  id: string;
  date: string; // YYYY-MM
  dateLabel: string;
  kind: RecognitionKind;
  title: string;
  by: string;
  url: string;
  featured: boolean;
}

export const press: PressItem[] = [
  { id: 'tri-state-2025', date: '2025-08', dateLabel: 'Aug 2025', kind: 'award', title: 'Award winner, Female Empowerment', by: 'NY Tri-State International Film Festival', url: '', featured: true },
  { id: 'global-recognition-2025', date: '2025-11', dateLabel: 'Nov 2025', kind: 'honour', title: 'Global Recognition Award', by: 'To founder Verónica Sabbag', url: '', featured: true },
  { id: 'nyc-mayor', date: '2024-01', dateLabel: 'NYC', kind: 'honour', title: '“For uniting all communities in NY”', by: 'Certificate from the New York Mayor’s Office', url: '', featured: true },
  { id: 'doc-semifinals-2026', date: '2026-05', dateLabel: '2026', kind: 'selection', title: 'Documentary “Composers Rewriting the Score”: semifinalist', by: 'Palm Beach Shorts, Washington Film Awards and Palermo International Film Festival', url: '', featured: false },
  { id: 'la-femme-2025', date: '2025-10', dateLabel: 'Oct 2025', kind: 'selection', title: 'Official selection and LA premiere', by: 'LA Femme International Film Festival', url: '', featured: false },
  { id: 'bizzy-2025', date: '2025-04', dateLabel: 'Apr 2025', kind: 'nomination', title: 'Nominated for the Bizzy Award (Warner Music), Agent of Change', by: 'Music Business Association', url: '', featured: false },
  { id: 'candid-seal', date: '2024-01', dateLabel: 'Candid', kind: 'seal', title: 'Platinum Seal of Transparency', by: 'Candid', url: '', featured: false },
];

export const featuredIn = ['Variety', 'Forbes', 'La Vanguardia', 'French Morning'];
