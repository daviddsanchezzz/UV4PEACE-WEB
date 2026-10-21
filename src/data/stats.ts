// Source of truth: WEB CLAUDE DESING/data/stats.json. Maps to the Phase 2 `stats` table.
export interface Stat {
  id: string;
  n: string;
  label: string;
  order: number;
}

export const statsNote = 'Global Women in Music, 2023–2026';

export const stats: Stat[] = [
  { id: 'women-composers-featured', n: '31', label: 'Women composers featured', order: 1 },
  { id: 'attendees', n: '2,400', label: 'Attendees', order: 2 },
  { id: 'musicians-on-stage', n: '200+', label: 'Musicians on stage', order: 3 },
  { id: 'countries-represented', n: '45', label: 'Countries represented', order: 4 },
  { id: 'media-publications', n: '50+', label: 'Media publications', order: 5 },
  { id: 'annual-editions', n: '4', label: 'Annual editions', order: 6 },
];
