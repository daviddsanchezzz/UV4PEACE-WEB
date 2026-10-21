// Source of truth: WEB CLAUDE DESING/data/people.json. Maps to the Phase 2 `people` table.
import type { ImageRef } from './types';

export type PersonGroup = 'team' | 'board' | 'ambassador' | 'artist';

export interface Person {
  slug: string;
  name: string;
  role: string;
  city: string;
  group: PersonGroup;
  /** Project slug + edition year this artist performed in, if applicable. */
  project?: string;
  edition?: string;
  photo: ImageRef | null;
  bio: string;
  website: string;
  order: number;
}

export const people: Person[] = [
  { slug: 'tim-ries', name: 'Tim Ries', role: 'Saxophonist, composer, arranger, producer & educator', city: 'New York', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2020/03/TimRies_credit_IreneMeritxell.jpg', alt: 'Portrait of Tim Ries', pos: '50% 25%' }, bio: 'Has toured and recorded with The Rolling Stones since 1999, and with Stevie Wonder, Paul Simon and many jazz greats. He teaches at The New School and Rutgers University.', website: '', order: 1 },
  { slug: 'obie-benz', name: 'Obie Benz', role: 'Filmmaker & philanthropist', city: 'New York', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2020/03/obie-benz-01.jpg', alt: 'Portrait of Obie Benz', pos: '50% 25%' }, bio: 'Founded the Vanguard Foundation and the Film Fund for social-justice causes. His documentary Americas in Transition was nominated for an Academy Award, and he has made short films for Amnesty International.', website: '', order: 2 },
  { slug: 'priscilla-lee', name: 'Priscilla Lee', role: 'Product development', city: 'New York', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2020/03/Pricilla-scaled.jpg', alt: 'Portrait of Priscilla Lee', pos: '50% 25%' }, bio: 'Born in São Paulo and based in Brooklyn, she brings a lifelong curiosity about the world’s diversity. She holds degrees from UC Davis and NYU.', website: '', order: 3 },
  { slug: 'dena-oconnor', name: 'Dena O’Connor', role: 'International Strategies Director, Maya Foundation', city: 'New York', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2020/03/Dena.jpg', alt: 'Portrait of Dena O’Connor', pos: '50% 25%' }, bio: 'Has worked in seven countries, the last 13 years in Turkey, supporting refugee children and families through education, mental health and the arts.', website: '', order: 4 },
  { slug: 'carlos-navarro', name: 'Carlos Navarro', role: 'Painter & writer', city: 'New York', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2020/03/IMG-20200329-WA00022.jpg', alt: 'Portrait of Carlos Navarro', pos: '50% 30%' }, bio: 'After more than 20 years with the European Union and the United Nations, he turned to egg-tempera painting and to building a cultural hub in Newburgh, in the Hudson Valley.', website: '', order: 5 },
  { slug: 'eric-melloul', name: 'Eric Melloul', role: 'Investment, Verlinvest', city: 'Brussels', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2017/01/IMG_34111.jpg', alt: 'Portrait of Eric Melloul', pos: '50% 25%' }, bio: 'Manages beverage and consumer investments at Verlinvest, after roles at Citibank, McKinsey & Co. and AB InBev. He holds an MBA/MPA from Harvard.', website: '', order: 6 },
  { slug: 'silvia-cambra', name: 'Silvia Cambra', role: 'Marketing & education', city: 'Brussels', group: 'board', photo: { src: 'https://uv4peace.org/wp-content/uploads/2017/11/20171124_213927-150x150.png', alt: 'Portrait of Silvia Cambra', pos: '50% 30%' }, bio: 'Comes from a family of musicians from many traditions. She has 20 years in marketing and communication, and now develops educational programmes in Barcelona.', website: '', order: 7 },

  { slug: 'vesna-souc', name: 'Vesna Šouc', role: 'Guest conductor', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 1 },
  { slug: 'ana-krstajic', name: 'Ana Krstajic', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 2 },
  { slug: 'tanyaradzwa-tawengwa', name: 'Tanyaradzwa Tawengwa', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 3 },
  { slug: 'ghiya-rushidat', name: 'Ghiya Rushidat', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 4 },
  { slug: 'valerie-naranjo', name: 'Valerie Naranjo', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 5 },
  { slug: 'morena-galan', name: 'Morena Galán', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 6 },
  { slug: 'ethel-smythe', name: 'Ethel Smythe', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 7 },
  { slug: 'aida-saco', name: 'Aida Saco', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 8 },
  { slug: 'niloufar-nourbakhsh', name: 'Niloufar Nourbakhsh', role: 'Composer', city: '', group: 'artist', project: 'global-women-in-music', edition: '2026', photo: null, bio: '', website: '', order: 9 },
];

/** Cities with partner organisations, for the People / network section. */
export const network = {
  note: 'Partner organisations across',
  cities: ['New York', 'Washington', 'Amsterdam', 'Baku', 'Berlin', 'Brussels', 'Paris', 'Barcelona', 'Madrid', 'Oslo', 'Rome', 'Amman', 'Beirut', 'Istanbul', 'Tel Aviv', 'Ramallah', 'Moscow', 'Nairobi'],
};
