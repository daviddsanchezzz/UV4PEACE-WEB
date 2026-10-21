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

// Media coverage, pulled from the live uv4peace.org Media Room (real outlets and links, not
// invented) — maps to Phase 2 `press_items` with kind: 'mention'.
export type Language = 'ar' | 'fr' | 'it' | 'en' | 'es';
export const languageLabel: Record<Language, string> = { ar: 'Arabic', fr: 'French', it: 'Italian', en: 'English', es: 'Spanish' };

export interface MediaMention {
  id: string;
  outlet: string;
  url: string;
  language: Language;
}

export const spokeAboutUs: MediaMention = {
  id: 'variety-gwim',
  outlet: 'Variety — Global Women in Music',
  url: 'https://variety.com/2024/film/global/her-club-cannes-female-collective-1236002126/',
  language: 'en',
};

export const mediaCoverage: MediaMention[] = [
  { id: 'ahram', outlet: 'Ahram', url: 'https://gate.ahram.org.eg/News/4170720.aspx', language: 'ar' },
  { id: 'zahratalkhaleej', outlet: 'Zahratalkhaleej', url: 'https://www.zahratalkhaleej.ae/article/4359365/%D9%85%D9%86-%D8%A7%D9%84%D9%81%D9%86%D8%A7%D9%86%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D9%8A-%D8%B4%D8%A7%D8%B1%D9%83%D8%AA-%D9%81%D9%8A-%D8%A7%D8%AD%D8%AA%D9%81%D8%A7%D9%84%D9%8A%D8%A9-%D9%8A%D9%88%D9%85-%D8%A7%D9%84%D9%85%D8%B1%D8%A3%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%A3%D9%85', language: 'ar' },
  { id: 'sbisiali', outlet: 'Sbisiali', url: 'https://www.instagram.com/reel/Cpu4WALgG2U/?utm_source=ig_web_copy_link', language: 'ar' },
  { id: 'sayidaty', outlet: 'Sayidaty', url: 'https://www.sayidaty.net/node/1564671/%D9%85%D8%B4%D8%A7%D9%87%D9%8A%D8%B1/%D9%85%D8%B4%D8%A7%D9%87%D9%8A%D8%B1-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8/%D9%85%D9%88%D8%B3%D9%8A%D9%82%D9%89-%D8%B3%D8%B9%D8%A7%D8%AF-%D8%A8%D8%B4%D9%86%D8%A7%D9%82-%D8%AA%D9%8F%D8%B9%D8%B2%D9%81-%D9%81%D9%8A-%D8%A7%D8%AD%D8%AA%D9%81%D8%A7%D9%84%D9%8A%D8%A9-%D9%8A%D9%88%D9%85-%D8%A7%D9%84%D9%85%D8%B1%D8%A3%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A-%C2%A0-%C2%A0', language: 'ar' },
  { id: 'elite-today-syria', outlet: 'Elite Today Syria', url: 'https://www.instagram.com/reel/Cps5chxvP9s/?igshid=YmMyMTA2M2Y%3D', language: 'ar' },

  { id: 'french-morning', outlet: 'French Morning', url: 'https://frenchmorning.com/lorchestre-de-lonu-rend-hommage-a-la-compositrice-louise-farrenc-a-new-york/', language: 'fr' },

  { id: 'radio-norba', outlet: 'Radio Norba', url: 'https://radionorba.it/giornata-della-donna-l8-marzo-un-concerto-speciale-a-new-york/', language: 'it' },

  { id: 'forbes', outlet: 'Forbes', url: 'https://www.forbes.com/sites/ninasophiamiralles/2024/07/31/how-female-film-club-is-empowering-women-to-stay-in-the-film-industry/', language: 'en' },
  { id: 'loisaida-center', outlet: 'The LOISAIDA Center', url: 'https://loisaida.org/event/global-women-in-music-by-unsrc-symphony-orchestra/', language: 'en' },
  { id: 'do-nyc', outlet: 'do NYC', url: 'https://donyc.com/events/2023/3/8/global-women-in-music-tickets', language: 'en' },
  { id: 'good-news-planet', outlet: 'Good News Planet', url: 'https://goodnewsplanet.com/celebrating-international-womens-day-2023-global-women-in-music-concert-good-news-speaks-to-veronica-sabbag/', language: 'en' },
  { id: 'am-ny', outlet: 'am NY', url: 'https://events.amny.com/event/celebrating-international-womens-day-2023-global-women-in-music/', language: 'en' },
  { id: 'syncsummit', outlet: 'SyncSummit', url: 'https://twitter.com/SyncSummit/status/1633017489067057152', language: 'en' },
  { id: 'latin-american-post', outlet: 'Latin American Post', url: 'https://latinamericanpost.com/43688-8m-women-in-music-continue-to-fight-for-equality/amp', language: 'en' },
  { id: 'wqxr', outlet: 'WQXR radio', url: '', language: 'en' },

  { id: 'un-media', outlet: 'UN Media', url: 'https://news.un.org/es/interview/2023/03/1519077', language: 'es' },
  { id: 'la-vanguardia', outlet: 'La Vanguardia', url: 'https://www.lavanguardia.com/vida/20230309/8811724/orquesta-sinfonica-onu-celebra-concierto-excepcional-compositoras.amp.html', language: 'es' },
  { id: 'msn', outlet: 'MSN', url: 'https://www.msn.com/es-es/noticias/internacional/la-orquesta-sinf%C3%B3nica-de-la-onu-celebra-un-concierto-excepcional-de-compositoras/ar-AA18oHv1', language: 'es' },
  { id: 'impacto-latino', outlet: 'Impacto Latino', url: 'https://impactolatino.com/orquesta-sinfonica-de-la-onu-celebra-concierto-excepcional-de-compositoras/', language: 'es' },
  { id: 'san-diego-union-tribune', outlet: 'The San Diego Union-Tribune', url: 'https://www.sandiegouniontribune.com/2023/03/09/la-orquesta-sinfnica-de-la-onu-celebra-un-concierto-excepcional-de-compositoras/', language: 'es' },
  { id: 'latina-tu-musica', outlet: 'Latina Tu Música', url: 'https://latinatumusica.com/la-orquesta-sinfonica-de-la-onu-celebra-un-concierto-excepcional-de-compositoras/?amp=1', language: 'es' },
  { id: 'telam', outlet: 'Télam', url: 'https://www.telam.com.ar/notas/202303/621822-compositora-caruso-pianista-onu-concierto.html', language: 'es' },
  { id: 'los-andes', outlet: 'Los Andes', url: 'https://www.losandes.com.ar/por-las-redes/lucia-caruso-sueno-con-hacer-la-musica-para-la-fiesta-de-la-vendimia/', language: 'es' },
  { id: 'sitio-andino', outlet: 'Sitio Andino', url: 'https://www.sitioandino.com.ar/cultura/lucia-caruso-la-mendocina-que-mostrara-su-arte-la-onu-n5647767', language: 'es' },
];

export interface PressArchiveItem {
  id: string;
  title: string;
  date: string;
  links: { label: string; url: string }[];
}

export const pressArchive: PressArchiveItem[] = [
  { id: 'rtbf-2018', title: 'Diversity Makes Music', date: 'Nov 2018', links: [{ label: 'Radio RTBF', url: '' }] },
  { id: 'together-in-solidarity-clipping', title: 'Together in Solidarity', date: '', links: [{ label: 'Press clipping', url: 'https://uv4peace.org/wp-content/uploads/2018/06/PRESS-CLIPPING-final.pdf' }] },
  { id: 'la-voce-di-new-york-2018', title: 'La Voce di New York', date: 'Mar 2018', links: [
    { label: 'English version', url: 'https://www.lavocedinewyork.com/en/arts/2018/03/16/international-womens-day-in-music-the-right-of-all-women-to-express-themselves/' },
    { label: 'Italian version', url: 'https://www.lavocedinewyork.com/arts/musica/2018/03/07/giornata-internazionale-della-donna-con-la-musica-al-ritmo-dei-diritti/' },
  ] },
  { id: 'substances-2017', title: 'Substances', date: 'Oct 2017', links: [
    { label: 'Online', url: 'http://www.sub-stances.com/all-articles/united-voices-4-peace-creating-a-culture-of-peace-josephine-bush' },
    { label: 'Offline (PDF)', url: 'https://uv4peace.org/wp-content/uploads/2018/03/Veronica-Sabbag.pdf' },
  ] },
];
