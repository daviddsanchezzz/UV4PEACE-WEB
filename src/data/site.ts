// Organisation-wide copy and settings. Maps to Phase 2's `profiles`-adjacent config and
// to env vars (PAYPAL link, newsletter provider) once Supabase is wired up.
// Empty strings are confirmed-pending fields (never rendered as literal placeholder text).

export const site = {
  name: 'United Voices 4 Peace',
  email: 'info@uv4peace.org',
  partnerMailto: 'mailto:info@uv4peace.org?subject=Partnership',
  proposalMailto: 'mailto:info@uv4peace.org?subject=Project%20proposal',
  /** Set via PUBLIC_PAYPAL_URL in Phase 4. Empty until Veronica provides the link. */
  paypalUrl: '',
  /** Google Analytics 4 measurement ID (G-XXXXXXXXXX). Empty: no analytics and no cookie banner. */
  analyticsId: '',
  /** Set via the newsletter provider's env var in Phase 4. */
  newsletterAction: '',
  trailerUrl: 'https://bit.ly/4bm7IO7',
  heroVideo: null as null | { src: string },
  social: [
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'YouTube', href: '' },
  ],
  legalEntities: [
    'United Voices 4 Peace Incorporated, 501(c)(3) nonprofit, EIN 84-3212629',
    'United Voices 4 Peace ASBL, Belgium, 0683.725.482',
  ],
  unLine: 'Associated with the United Nations Department of Global Communications (DGC)',
  seal: 'Platinum Seal of Transparency · Candid',
};

export const nav = [
  { key: 'mission', label: 'Mission', href: '/#mission' },
  { key: 'projects', label: 'Projects', href: '/projects' },
  { key: 'people', label: 'People', href: '/people' },
  { key: 'get-involved', label: 'Get Involved', href: '/get-involved' },
  { key: 'press', label: 'Press', href: '/press' },
];

export const legalPages = [
  { slug: 'terms', label: 'Terms' },
  { slug: 'privacy', label: 'Privacy' },
  { slug: 'cookies', label: 'Cookies' },
];

export const sdgs = [
  { n: 5, label: 'Gender equality' },
  { n: 10, label: 'Reduced inequalities' },
  { n: 16, label: 'Peace & justice' },
  { n: 17, label: 'Partnerships' },
];

/** Founder bio for the Home and People pages. */
export const founder = {
  name: 'Verónica Sabbag',
  role: 'Founder, United Voices 4 Peace',
  quote: 'By uniting our voices, we spread respect for diversity, mutual understanding and dialogue through the universal language of music and the arts.',
  bio: '',
  photo: {
    src: '07-founder-candidata_IMG_5336.jpg',
    alt: 'Verónica Sabbag presenting Global Women in Music 2026 on stage',
    pos: '52% 30%',
  },
};
