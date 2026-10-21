// Source of truth: WEB CLAUDE DESING/data/projects.json (real project history, not invented).
// Shape mirrors the Phase 2 `projects` + `editions` tables (see data/SCHEMA.md).
import type { ImageRef, PersonRef } from './types';

export type ProjectStatus = 'ongoing' | 'past';

export interface Edition {
  year: string;
  number: number;
  date: string;
  /** Empty when the venue is not yet confirmed; UI must skip rendering rather than show a placeholder. */
  venue: string;
  event: string;
  conductor: string;
  description: string;
  credits?: string;
  lineup: PersonRef[];
  watchUrl: string;
  upcoming?: boolean;
}

export interface Documentary {
  title: string;
  text: string;
  trailerUrl: string;
  poster: ImageRef;
  festivals: { date: string; name: string; result: string }[];
}

export interface ProjectPartnerBlock {
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
  benefits: string[];
  photo: ImageRef;
}

export interface Project {
  slug: string;
  title: string;
  titleAccent?: string;
  status: ProjectStatus;
  yearStart: string; // YYYY-MM
  dateLabel: string;
  city: string;
  summary: string;
  featured?: boolean;
  cover: ImageRef | null;
  /** Editorial note for the admin panel only — never render on the public site. */
  coverHint?: string;
  hero?: ImageRef;
  intro?: string;
  body?: string;
  vision?: string;
  stats?: { n: string; label: string }[];
  statsNote?: string;
  editions?: Edition[];
  documentary?: Documentary;
  gallery?: (ImageRef & { span?: 'wide' | 'tall' | 'big' })[];
  partner?: ProjectPartnerBlock;
}

const gwim: Project = {
  slug: 'global-women-in-music',
  title: 'Global Women in Music',
  titleAccent: 'in Music',
  status: 'ongoing',
  yearStart: '2023-03',
  dateLabel: '2023 – today',
  city: 'New York',
  summary: 'Celebrating women composers, conductors and the power of music to connect cultures.',
  featured: true,
  cover: {
    src: '04-tarjeta-gwim_IMG_5340.jpg',
    alt: 'Composer Tanyaradzwa Tawengwa performing with the orchestra',
    pos: '50% 50%',
  },
  hero: {
    src: '12-ficha-gwim-hero_IMG_5429.jpg',
    alt: 'Global Women in Music 2026 composers and performers on stage at Symphony Space',
    pos: '50% 70%',
  },
  intro: "Since 2023, United Voices 4 Peace has partnered with the United Nations Symphony Orchestra to bring Global Women in Music to New York in celebration of International Women's Day.",
  body: 'Across the 2023, 2024, 2025 and 2026 editions, the initiative has spotlighted women conductors and composers from around the world, using live orchestral music to advance visibility, representation, peace and cultural dialogue.',
  vision: 'GWIM is a unique platform for peace and empowerment, where women composers and conductors from around the globe can showcase their talent annually, on the global decision-makers stage.',
  stats: [
    { n: '31', label: 'Women composers' },
    { n: '2,400', label: 'Attendees' },
    { n: '200+', label: 'Musicians on stage' },
    { n: '45', label: 'Countries' },
    { n: '50+', label: 'Media publications' },
    { n: '4', label: 'Annual editions' },
  ],
  statsNote: 'Global Women in Music, 2023–2026',
  editions: [
    {
      year: '2023', number: 1, date: '8 Mar 2023',
      venue: 'BMCC Tribeca Performing Arts Center', event: 'CSW67', conductor: 'Anoa Green',
      description: 'The first concert by the United Nations Orchestra performing a full programme by women composers, from Argentina, Iran, Ukraine and China to Louise Farrenc and Florence Price.',
      lineup: [], watchUrl: 'https://www.youtube.com/live/VxVGjaWucDU',
    },
    {
      year: '2024', number: 2, date: '12 Mar 2024',
      venue: 'NYU Skirball Performing Arts Center', event: 'CSW68', conductor: 'Amy Andersson',
      description: 'A full programme by eight women composers from around the world, under the baton of multi-award winning conductor Amy Andersson. The documentary was filmed during this edition.',
      lineup: [], watchUrl: 'https://youtu.be/CUAHyFOuWhM',
    },
    {
      year: '2025', number: 3, date: '13 Mar 2025',
      venue: '', event: 'CSW69', conductor: 'Josefa & Esperanza de Velasco',
      description: "Celebrating International Women's Day, the 30th anniversary of the Beijing Declaration and the 400th anniversary of New York City, under the baton of Mexican twin sisters Josefa and Esperanza de Velasco.",
      lineup: [], watchUrl: '',
    },
    {
      year: '2026', number: 4, date: '13 Mar 2026',
      venue: 'Symphony Space', event: 'Official side event of UN CSW70', conductor: 'Vesna Šouc',
      description: 'Led by Serbian conductor Vesna Šouc, the evening featured eight women composers from eight countries. Nearly 700 guests attended.',
      credits: 'Presented by Verónica Sabbag · Guest performer Reemaz Aloqbi',
      lineup: [
        { name: 'Vesna Šouc', role: 'Guest conductor' },
        { name: 'Ana Krstajic', role: 'Composer' },
        { name: 'Tanyaradzwa Tawengwa', role: 'Composer' },
        { name: 'Ghiya Rushidat', role: 'Composer' },
        { name: 'Valerie Naranjo', role: 'Composer' },
        { name: 'Morena Galán', role: 'Composer' },
        { name: 'Ethel Smythe', role: 'Composer' },
        { name: 'Aida Saco', role: 'Composer' },
        { name: 'Niloufar Nourbakhsh', role: 'Composer' },
      ],
      watchUrl: '',
    },
    {
      year: '2027', number: 5, date: 'Coming soon',
      venue: '', event: '', conductor: '', description: '',
      lineup: [], watchUrl: '', upcoming: true,
    },
  ],
  documentary: {
    title: 'Composers Rewriting the Score',
    text: 'Produced during the 2024 edition, the film captures the artists and advocacy behind Global Women in Music. After a March 2025 premiere at Roosevelt House, it continued on the festival circuit.',
    trailerUrl: 'https://bit.ly/4bm7IO7',
    poster: { src: '19-galeria-escenario_IMG_5325.jpg', alt: 'Wide view of the orchestra on the Symphony Space stage', pos: '50% 60%' },
    festivals: [
      { date: 'Aug 2025', name: 'NY Tri-State International Film Festival', result: 'Award winner' },
      { date: 'Oct 2025', name: 'LA Femme International Film Festival', result: 'Official selection' },
      { date: 'Mar 2026', name: 'Palm Beach Shorts', result: 'Semifinalist' },
      { date: 'Apr 2026', name: 'Washington Film Awards', result: 'Semifinalist' },
      { date: 'May 2026', name: 'Palermo International Film Festival', result: 'Semifinalist' },
    ],
  },
  gallery: [
    { src: '13-galeria-ensayo_IMG_5266.jpg', alt: 'Flutist reading the score during the concert', pos: '50% 40%', span: 'big' },
    { src: '14-galeria-violin_IMG_5269.jpg', alt: 'Violist playing with the orchestra', pos: '55% 40%' },
    { src: '15-galeria-solista_IMG_5418.jpg', alt: 'Soloist bowing at the front of the stage', pos: '50% 30%', span: 'tall' },
    { src: '16-galeria-soprano_IMG_5357.jpg', alt: 'Soprano receiving applause from the orchestra', pos: '50% 35%' },
    { src: '17-galeria-arpa_IMG_5268.jpg', alt: 'Harpist and violinists in the string section', pos: '60% 40%', span: 'wide' },
    { src: '18-galeria-chelos_IMG_5274.jpg', alt: 'Cellists and double bassists performing', pos: '50% 40%', span: 'wide' },
    { src: '19-galeria-escenario_IMG_5325.jpg', alt: 'The full orchestra on the Symphony Space stage', pos: '50% 60%' },
  ],
  partner: {
    eyebrow: 'Partner with us for 2027',
    title: 'Every day is',
    titleAccent: "Women's Day.",
    text: 'Join us for GWIM 2027: your contribution is an investment in leadership and lasting global impact.',
    benefits: [
      'Logo on all event materials: programme, posters, invitations and websites',
      'Logo on the in-venue posters',
      'Mention in press and promotion',
      'Public thanks at the concert and in the programme',
      '4 VIP seats',
      'VIP treatment with a hospitality desk and a private reception the night before',
    ],
    photo: { src: '20-partner-backdrop-logos_IMG_5495.jpg', alt: 'Guests at the photocall in front of the GWIM 2026 backdrop with partner logos', pos: '40% 30%' },
  },
};

// Past projects: real history from data/projects.json. No cover photo has been sourced yet for
// these (cover: null) — coverHint is an editorial note for the admin panel, never shown publicly.
const past: Project[] = [
  { slug: 'create-summit-2022', title: 'Create!Summit 2022', status: 'past', yearStart: '2022-10', dateLabel: 'Oct 2022', city: 'Online', summary: 'A co-hosted virtual summit on the arts, mental health and new technology: 18 speakers, 800 guests.', cover: null, coverHint: 'Screenshot or speakers of the virtual summit' },
  { slug: 'afghan-women-human-rights', title: 'Afghan Women, Human Rights & the Transformative Power of the Arts', status: 'past', yearStart: '2022-09', dateLabel: 'Sep 2022', city: 'Prime Produce, New York', summary: 'A screening of "Samira’s Camera" and a panel for International Peace Day, with MALA.', cover: null, coverHint: 'Panel or screening at Prime Produce' },
  { slug: 'future-of-creative-industry', title: 'Future of Creative Industry', status: 'past', yearStart: '2021-09', dateLabel: 'Sep 2021', city: 'UNGA76 side event', summary: 'A side event on a sustainable recovery for the creative industry after the health crisis.', cover: null, coverHint: 'Event visual or speakers' },
  { slug: 'death-metal-grandma', title: 'Death Metal Grandma', status: 'past', yearStart: '2020-12', dateLabel: 'Dec 2020', city: 'Barcelona, streamed', summary: 'Documentary and live concert echoing Holocaust survivor Inge Ginsberg’s call for social justice.', cover: null, coverHint: 'Concert or documentary still' },
  { slug: 'hiroshima-75', title: '75th Hiroshima Memorial', status: 'past', yearStart: '2020-08', dateLabel: 'Aug 2020', city: 'Global broadcast', summary: 'Peace + Art + Music broadcast with the city of Hiroshima and our Peace Ambassadors.', cover: null, coverHint: 'Performance from the broadcast' },
  { slug: 'fight-for-the-future', title: 'Fight for the Future', status: 'past', yearStart: '2020-05', dateLabel: 'May 2020', city: 'Online', summary: 'A global hackathon with UNITE 2030, advocating for artists hit by the Covid-19 crisis.', cover: null, coverHint: 'Hackathon visual' },
  { slug: 'arts-in-times-of-coronavirus', title: 'Arts in Times of Coronavirus', status: 'past', yearStart: '2020-04', dateLabel: '2020', city: 'Online', summary: 'Online initiatives bringing hope and support to artists and vulnerable communities.', cover: null, coverHint: 'Online performance still' },
  { slug: 'women-arts-climate-emergency', title: 'Women & Arts in Times of Climate Emergency', status: 'past', yearStart: '2020-03', dateLabel: 'Mar 2020', city: 'New York', summary: 'An International Women’s Day celebration with Women in Music, ahead of CSW64.', cover: null, coverHint: 'Artists or panel on stage' },
  { slug: 'dance-or-die', title: 'Dance or Die: from Syria to New York', status: 'past', yearStart: '2019-11', dateLabel: 'Nov 2019', city: 'New York', summary: 'With the NYC Mayor’s Office, we supported dancer Ahmad Joudeh’s journey to the United States.', cover: null, coverHint: 'Ahmad Joudeh performing "Sacrifice"' },
  { slug: 'liberty-meets-beauty', title: 'Liberty Meets Beauty', status: 'past', yearStart: '2019-04', dateLabel: 'Apr 2019', city: 'New York', summary: 'The VNY Media Award 2019, celebrating free press, women in media and women in music.', cover: null, coverHint: 'Award ceremony' },
  { slug: 'world-congress-against-death-penalty', title: '7th World Congress Against the Death Penalty', status: 'past', yearStart: '2019-02', dateLabel: 'Feb 2019', city: 'Brussels', summary: 'An exhibition by Chadian artist Georges Miankiri Bens Gamthety in the Civil Society Village.', cover: null, coverHint: 'Artist with his paintings at the stand' },
  { slug: 'women-professionals-in-the-music-industry', title: 'Women Professionals in the Music Industry', status: 'past', yearStart: '2019-01', dateLabel: 'Jan 2019', city: 'UN Headquarters, New York', summary: 'A UN workshop on gender equality, pluralism and diversity in the music industry.', cover: null, coverHint: 'Women professionals at work: studio, panel or backstage' },
  { slug: 'diversity-makes-music', title: 'Diversity Makes Music', status: 'past', yearStart: '2018-11', dateLabel: 'Nov 2018', city: 'Flagey, Brussels', summary: 'A gala with the International Yehudi Menuhin Foundation blending classical and world music.', cover: null, coverHint: 'Musicians of different backgrounds performing together' },
  { slug: 'gwim-4-human-rights', title: 'Global Women in Music 4 Human Rights', status: 'past', yearStart: '2018-11', dateLabel: 'Nov 2018', city: 'Teatro Argentina, Rome', summary: 'Ten winning scores by women for the 70th anniversary of the Universal Declaration of Human Rights.', cover: null, coverHint: 'Concert linked to a human-rights event' },
  { slug: 'together-in-solidarity', title: 'Together in Solidarity', status: 'past', yearStart: '2018-06', dateLabel: 'Jun 2018', city: 'European Parliament, Brussels', summary: 'World Refugee Day with Syrian dancer Ahmad Joudeh, in front of the European Parliament.', cover: null, coverHint: 'Community concert, audience and artists close up' },
  { slug: 'flamenco-festival-brussels', title: 'Flamenco Festival in Brussels', status: 'past', yearStart: '2018-03', dateLabel: 'Mar 2018', city: 'Palais des Beaux-Arts, Brussels', summary: 'A meet-the-artist encounter with Dorantes and Taksim Trio on flamenco and intercultural dialogue.', cover: null, coverHint: 'Dorantes and Taksim Trio on stage' },
  { slug: 'dialogue-of-souls', title: 'A Dialogue of Souls around the Mediterranean Sea', status: 'past', yearStart: '2017-12', dateLabel: 'Dec 2017', city: 'Brussels', summary: 'Musicians from Israel, Syria, Turkey, Greece and Spain, guided by Jordi Savall.', cover: null, coverHint: 'Musicians from Mediterranean countries in performance' },
  { slug: 'dance-for-peace', title: 'Dance for Peace', status: 'past', yearStart: '2017-09', dateLabel: 'Sep 2017', city: 'Cañada Real, Madrid', summary: 'International Peace Day and the launch of UV4Peace, with dancer Ahmad Joudeh.', cover: null, coverHint: 'Dancers on stage, documentary light' },
  { slug: 'artistic-workshops', title: 'Artistic Workshops', status: 'past', yearStart: '2017-01', dateLabel: 'Ongoing programme', city: 'Refugee camps', summary: 'Artists from music, visual arts, body expression and circus run workshops in refugee camps.', cover: null, coverHint: 'Workshop participants with instruments' },
  { slug: 'mars', title: 'Music and Resilience Support (MARS)', status: 'past', yearStart: '2015-01', dateLabel: '2015 – 2017', city: 'Online', summary: 'An online resource centre for psycho-social music practice in under-resourced communities.', cover: null, coverHint: 'Music session with refugee or displaced communities' },
];

export const projects: Project[] = [gwim, ...past];

export const statusLabel: Record<ProjectStatus, string> = { ongoing: 'Ongoing', past: 'Past' };
