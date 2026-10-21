// Source of truth: WEB CLAUDE DESING/data/partners.json. Maps to the Phase 2 `partners` table.
// Logo files are not yet authorised for publication, so every entry shows as text only
// (the design's own fallback for this case) until Veronica uploads and approves a logo.
export interface Partner {
  id: string;
  name: string;
  logo: string | null;
  url: string;
  tier: 'main' | 'partner' | 'supporter';
  active: boolean;
  order: number;
}

export const partners: Partner[] = [
  { id: 'un-women', name: 'UN Women', logo: null, url: '', tier: 'partner', active: true, order: 1 },
  { id: 'ngo-csw-new-york', name: 'NGO CSW New York', logo: null, url: '', tier: 'partner', active: true, order: 2 },
  { id: 'coalition-for-the-un-we-need', name: 'Coalition for the UN We Need', logo: null, url: '', tier: 'partner', active: true, order: 3 },
  { id: 'beijing-30', name: 'Beijing+30', logo: null, url: '', tier: 'partner', active: true, order: 4 },
  { id: 'symphony-space', name: 'Symphony Space', logo: null, url: '', tier: 'partner', active: true, order: 5 },
  { id: 'nyu-skirball', name: 'NYU Skirball', logo: null, url: '', tier: 'partner', active: true, order: 6 },
  { id: 'peace-boat-us', name: 'Peace Boat US', logo: null, url: '', tier: 'partner', active: true, order: 7 },
  { id: 'vital-voices-global-partnership', name: 'Vital Voices Global Partnership', logo: null, url: '', tier: 'partner', active: true, order: 8 },
  { id: 'consulate-general-of-mexico-in-new-york', name: 'Consulate General of Mexico in New York', logo: null, url: '', tier: 'partner', active: true, order: 9 },
  { id: 'mexican-cultural-institute-new-york', name: 'Mexican Cultural Institute New York', logo: null, url: '', tier: 'partner', active: true, order: 10 },
  { id: 'consulate-general-of-spain-in-new-york', name: 'Consulate General of Spain in New York', logo: null, url: '', tier: 'partner', active: true, order: 11 },
  { id: 'spain-arts-culture', name: 'Spain arts & culture', logo: null, url: '', tier: 'partner', active: true, order: 12 },
  { id: 'consulate-general-of-serbia-in-new-york', name: 'Consulate General of Serbia in New York', logo: null, url: '', tier: 'partner', active: true, order: 13 },
  { id: 'air-serbia', name: 'Air Serbia', logo: null, url: '', tier: 'partner', active: true, order: 14 },
  { id: 'delta', name: 'Delta', logo: null, url: '', tier: 'partner', active: true, order: 15 },
  { id: 'aeromexico', name: 'Aeroméxico', logo: null, url: '', tier: 'partner', active: true, order: 16 },
  { id: 'nh-collection-new-york-madison-avenue', name: 'NH Collection New York Madison Avenue', logo: null, url: '', tier: 'partner', active: true, order: 17 },
  { id: 'next-jump', name: 'Next Jump', logo: null, url: '', tier: 'partner', active: true, order: 18 },
  { id: 'womanpalooza', name: 'Womanpalooza', logo: null, url: '', tier: 'partner', active: true, order: 19 },
  { id: 'verdavainne-couture', name: 'Verdavainne Couture', logo: null, url: '', tier: 'partner', active: true, order: 20 },
];
