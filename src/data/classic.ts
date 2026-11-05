// "Classic" proposal: the texts of the original uv4peace.org, kept word for word,
// shown with the Fiel design. Images and videos still live on uv4peace.org.
const WP = 'https://uv4peace.org/wp-content/uploads';

export const classicNav = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About Us', href: '/about-us/' },
  { key: 'projects', label: 'Projects', href: '/projects/' },
  { key: 'voice', label: 'Add your Voice', href: '/add-your-voice/' },
  { key: 'press', label: 'Media & Recognition', href: '/media-and-recognition/' },
  { key: 'contact', label: 'Contact', href: '/contact/' },
];

export const bannerImage = `${WP}/2017/01/cropped-benefits-of-business-collaboration.jpg`;

/** Paragraphs may contain **bold** and [label](url) links. */
export const homeIntro = {
  heading: 'United Voices 4 Peace is a global cultural diplomacy initiative fostering a universal culture of peace through music and the arts',
  paragraphs: [
    'Our non-partisan platform uses the Arts to address and transform today’s global challenges.',
    '**UV4PEACE** creates bridges between the diplomatic and cultural worlds, assisting public, and private entities to develop innovative forms of creative diplomacy.',
    '**UV4PEACE** aims to unite different communities through the universal language of the Arts, creating inclusive spaces for the diverse voices of the world to meet, even in situations of conflict.',
    'To carry our mission, we support underrepresented artists to promote peacebuilding and social justice through a model of empowerment & responsibility.',
    '**UV4PEACE** pledges to advance the efforts to achieve the United Nations 17 Sustainable Development Goals, with a special focus on Goals 5 (Gender Equality), 10 (Reduced inequalities), 16 (Peace & Justice) and 17 (Partnerships), helping to accelerate progress towards the 2030 agenda.',
  ],
  // Shown as a small seal under the heading.
  unLine: 'Our organization is proud to be formally associated to the United Nations Department of Global Communications.',
  // The four focus goals named in the paragraph above, shown with the official UN icons (public/sdg).
  sdgs: [
    { n: 5, label: 'Gender Equality', color: '#FF3A21' },
    { n: 10, label: 'Reduced Inequalities', color: '#DD1367' },
    { n: 16, label: 'Peace, Justice and Strong Institutions', color: '#00689D' },
    { n: 17, label: 'Partnerships for the Goals', color: '#19486A' },
  ],
};

export interface ClassicProject {
  id: string;
  title: string;
  paragraphs: string[];
  video?: string;
  /** YouTube video id, shown as an embedded player. */
  youtube?: string;
  /** false keeps YouTube links as plain links instead of embedded players. */
  embed?: boolean;
  image?: string;
  images?: string[];
  photo?: 'gwim-2026' | 'gwim-2025' | 'gwim-2024' | 'gwim-2023' | 'doc';
  /** Figures shown as a small grid, inserted after paragraph number `after` (from 0). */
  stats?: { title: string; after: number; items: { value: string; label: string }[] };
}

export const currentProjects: ClassicProject[] = [
  {
    id: 'gwim-series', title: 'Global Women in Music Concert Series', photo: 'gwim-2026', embed: false,
    paragraphs: [
      'Since 2023, United Voices 4 Peace has partnered with the United Nations Symphony Orchestra to bring Global Women in Music to New York in celebration of International Women’s Day. Across the 2023, 2024, 2025 and 2026 editions, the initiative has spotlighted women conductors and composers from around the world, using live orchestral music to advance visibility, representation, peace and cultural dialogue as an official side event to the UN Commission on the Status of Women, the largest International Conference on women\'s rights. We are excited to announce that preparations of the 5th Edition of our groundbreaking concert, to be held in March 2027, are well on track.',
      '**Watch recordings:** [2023](https://www.youtube.com/live/VxVGjaWucDU) · [2024](https://youtu.be/CUAHyFOuWhM) · [2025](https://youtu.be/LBymfA0uHsE) · [2026](https://www.youtube.com/live/kMsEQOIbGoQ)',
    ],
  },
  {
    id: 'gwim-2026', title: 'Global Women in Music 2026', photo: 'gwim-2026',
    paragraphs: [
      'In celebration of International Women’s Day 2026 and on the 250th Anniversary of the USA, UV4P in partnership with the United Nations Symphony Orchestra presents our “Global Women in Music” concert featuring works by female composers from around the world, to advance gender equality.',
      'The fourth edition was held as an official side event to the UN Commission on the Status of Women on March 13th at Symphony Space in New York. Watch here : [https://www.youtube.com/live/kMsEQOIbGoQ](https://www.youtube.com/live/kMsEQOIbGoQ)',
    ],
  },
  {
    id: 'gwim-2025', title: 'Global Women in Music 2025', photo: 'gwim-2025',
    paragraphs: [
      'The Global Women in Music concert was held on March 13th on the occasion of the 69th United Nations Conference on the Status of Women. The third edition of this groundbreaking initiative, organized by United Voices for Peace in partnership with the UN Symphony Orchestra, celebrated International Women’s Day, the 30th anniversary of the Beijing Declaration and Platform of Action, the 400th anniversary of New York City, and the power of women in music and in their communities, under the baton of Maestras Josefa and Esperanza de Velasco.',
      'Watch recording : [https://youtu.be/LBymfA0uHsE](https://youtu.be/LBymfA0uHsE)',
    ],
  },
  {
    id: 'gwim-documentary', title: 'Global Women in Music: Composers Rewriting the Score – Documentary film', photo: 'doc',
    paragraphs: [
      'A documentary taking the story beyond the stage produced during the 2024 edition, the film captures the artists and advocacy behind Global Women in Music. After a March 2025 premiere at Roosevelt House, it continued on the festival circuit where it has received numerous International recognitions.',
      '**WATCH THE TRAILER** · [bit.ly/4bm7IO7](http://bit.ly/4bm7IO7)',
    ],
  },
  {
    id: 'gwim-2023-24', title: 'Global Women in Music – 2023/24', photo: 'gwim-2023', video: `${WP}/2024/04/global-women-in-music.mp4`,
    paragraphs: [
      'On the occasion of International Women’s Day 2023 and in the context of the **CSW67, UV4PEACE** in partnership with the **United Nations Symphony Orchestra**, launched this groundbreaking initiative.',
      'This concert by the UN Orchestra, featured only music by women composers from around the world, exceptionally conducted by a female composer, creating a unique platform to advance women’s representation in the music industry.',
      'An equally successful second edition was held on March 12, 2024 at the Skirball NYU Performing Arts Center consolidating the initiative.',
      '**In order to raise awareness on this initiative, a related documentary was produced following the 2024 concert. WATCH THE TRAILER HERE** [https://bit.ly/3YwgV0i](https://bit.ly/3YwgV0i)',
    ],
    stats: {
      title: 'Our success in numbers', after: 2,
      items: [
        { value: '1200', label: 'attendees' },
        { value: '90 × 2', label: 'musicians' },
        { value: '18', label: 'women composers' },
        { value: '5', label: 'continents represented' },
        { value: '26', label: 'media publications in 6 languages' },
        { value: '1000s', label: 'of views on social networks' },
      ],
    },
  },
  {
    id: 'create-summit', title: 'Create!Summit – 2022', video: `${WP}/2022/11/UPD-Veronica_1920x1080.mp4`,
    paragraphs: [
      '**UV4PEACE** is proud to have co-hosted the pilot virtual Create!Summit – 2022, held on October 22nd on an initiative of Artists&Angels.',
      'We discussed important topics such as the healing power of arts, enhancing mental health through arts, how arts, artists and art forms drive creative thinking, human innovation and influence social change, as well as the amalgamation of arts and the New Age tech: metaverse, NFTs, DeFi and other.',
    ],
    stats: {
      title: 'The impactful results in numbers', after: 0,
      items: [
        { value: '18', label: 'speakers' },
        { value: '8', label: 'timezones' },
        { value: '800', label: 'guests' },
        { value: '7', label: 'hours of quality content' },
        { value: '3', label: 'panels' },
        { value: '2', label: 'workshops' },
        { value: '1', label: 'keynote' },
        { value: '1111 Hz', label: 'of great vibes' },
        { value: '1', label: 'Arts Manifesto' },
        { value: '1', label: 'ArtTech Council' },
      ],
    },
  },
  {
    id: 'afghan-women', title: 'Afghan Women, Human Rights & the Transformative Power of the Arts', youtube: 'YUK6YVID2mY',
    paragraphs: [
      'As the world leaders gathered again in person in NY on the occasion of the United Nations General Assembly, **UV4PEACE** partnered with the **Muslim American Leadership Alliance** (MALA) and the 49% for a special screening of the short animated film “Samira’s Camera” on September 22nd at Prime Produce, to mark the International Peace Day 2022.',
    ],
  },
  {
    id: 'death-metal-grandma', title: 'Death Metal Grandma – An Unconventional Call for Social Justice', image: `${WP}/2022/11/Screenshot-2022-11-14-at-20.25.28.png`,
    paragraphs: [
      '**UV4PEACE** was thrilled to launch its first virtual event and digital program. The program consists on a **series of documentary screenings and concerts.** It aims at addressing the current systemic social inequalities, with a special focus on gender, age and religion-based discrimination.',
    ],
  },
  {
    id: 'together-in-solidarity', title: 'Together in Solidarity', video: `${WP}/2022/11/2F42EC35-356B-4D71-8CAD-CCC604D6D7D7.mp4`,
    paragraphs: [
      'On the occasion of the World Refugee Day, June 20th, **UV4PEACE**, in collaboration with the European Parliament, organized the event ‘Together in Solidarity’. Charmed by the Syrian dancer and choreographer Ahmad Joudeh’s performance on the Esplanade Simone Veil, in front of the European Parliament, hundreds of people participated, including decisions makers and media.',
    ],
  },
];

export const previousProjects: ClassicProject[] = [
  {
    id: 'dance-for-peace', title: 'Dance for Peace',
    images: ['/projects/previous/dance-for-peace.png'],
    paragraphs: ['Celebrated the International Peace Day in the context of the international cinema festival in Cañada Real Madrid. The act took place on the 17th of September 2017 marking the launch of the UV4Peace initiative, with the participation of Syrian Palestinian dancer Ahmad Joudeh.'],
  },
  {
    id: 'dialogue-of-souls', title: 'A dialogue of Souls around the Mediterranean Sea',
    images: ['/projects/previous/dialogue-of-souls-1.png', '/projects/previous/dialogue-of-souls-2.png'],
    paragraphs: [
      'A unique musical production bringing together musicians from diverse cultures guided by Grand Maestro Jordi Savall, UNESCO Peace Ambassador. On the occasion of the Yehudi Menuhin Foundation Annual Gala Dinner on December 4th 2017 in Brussels. We celebrated the values of sharing, respect for diversity, co-creation and intercultural dialogue. Musicians from Israel, Syria, Turkey, Greece and Spain performed a musical dialogue which included songs of Christian, Sephardic, Ottoman and Arab-Andalusian origins.',
      'Prompted by the large flows of migrants and refugees throughout Europe and the Mediterranean, this theme aimed at raising awareness of the cultural richness of the countries bordering the Mare Nostrum. The concert demonstrated how music can serve an even more prominent role in cultural diplomacy.',
    ],
  },
  {
    id: 'artistic-workshops', title: 'Artistic Workshops',
    images: ['/projects/previous/artistic-workshops.png'],
    paragraphs: ['A unique team of artists from different disciplines (Music, Visual Arts, Body Expression, Circus Arts) join forces to offer artistic workshops in refugee camps and a liaison platform for artists interested to contribute. After years of experience, the organisation has developed a successful model for interactive sessions aiming to stimulate participants by making artistic expression available to everyone. The project includes i) establishment of direct contacts between creators of different countries; ii) logistic support for the exchange of artistic creation; and iii) collaboration with artistic teams to achieve common projects. [Contact us](/contact/) to know more.'],
  },
  {
    id: 'mars', title: 'Music And Resilience Support (MARS)',
    images: ['/projects/previous/mars.png'],
    paragraphs: ['Welcome to MARS – an online resource centre promoting learning, research and exchange in the field of psycho-social music practice within under-resourced, deprived and marginalised communities. The MARS community is happy to offer a wide range of resources developed during the project’s pilot phase (2015-17), including a digital notice board linking potential employers to qualified and experienced PS musicians and music therapists.'],
  },
];

export const foreword = {
  paragraphs: [
    'A global citizen with a passion for music, a multicultural background and life-long international experience, for whom culture has no borders. Having served for the European Union in different postings for more than 20 years, including in the EU Mission to the United Nations in New York, and having dealt with some of the most challenging world conflicts with global impact, I have witnessed the limitations of traditional diplomacy. Today’s major challenges can only be addressed through the mobilization and cooperation across diverse stakeholders toward shared goals. I am convinced that by uniting our voices by this citizen-led cultural peace initiative, we will make a significant contribution to spreading the culture of respect for diversity, mutual understanding, acceptance and dialogue through the universal language of music and the arts, making our world a better place for all of us.',
    'Looking forward to hearing YOUR VOICES.',
  ],
};

export interface BoardMember { name: string; role: string; photo: string; paragraphs: string[] }

export const board: BoardMember[] = [
  {
    name: 'Veronica Sabbag', role: 'Founder', photo: `${WP}/2020/03/Veronica-scaled.jpeg`,
    paragraphs: [
      'Veronica Sabbag is a global citizen committed to multicultural and international best practices. She holds a Degree in Law from the University of La Sorbonne, a Masters Degree in European Studies from l’Université Libre de Bruxelles (ULB) and a Certificate on Cultural Diplomacy from the Institute for Cultural Diplomacy ICD). She served for the European Union in different positions for over 20 years, forging her experience in conflict management, defence and security. In this context, she has dealt with some of the most challenging global conflicts. Understanding the need to resolve today’s major challenges beyond traditional diplomatic tools, she decided to found the NGO “United Voices 4 Peace” fostering a Universal Culture of Peace through Music and the Arts. With this citizen-led cultural peace initiative promoting diverse forms of inter-cultural exchanges, Veronica has facilitated the realisation of collaborative artistic projects advocating for tolerance, acceptance and dialogue.',
    ],
  },
  {
    name: 'Tim Ries', role: 'Board Member -NY', photo: `${WP}/2020/03/TimRies_credit_IreneMeritxell.jpg`,
    paragraphs: [
      'Saxophonist, composer, arranger, producer, and educator Tim Ries received degrees from both The University of North Texas (BM) and The University of Michigan (MM). He has had a unique and varied career, which began in 1983 with the great Maynard Ferguson. Tim moved to New York City in 1985 and since that time his performing and recording credits include a who’s who of jazz, rock, pop and world music icons: The Rolling Stones from 1999 to the present, Stevie Wonder, Paul Simon, Donald Fagen, Michael Jackson, Blood, Sweat and Tears, Rod Stewart, Lyle Lovett, and jazz greats Red Garland, Donald Byrd, Hank Jones, Jack DeJohnette, Phil Woods, Tom Harrell, Chico Hamilton, Michael Brecker, Joe Henderson, Tony Bennett, Louie Bellson, Dave Liebman, Al Foster, John Patitucci, Danilo Perez, Bela Szakcsi Lakatos and Maria Schneider. Tim was a member of the Prism Saxophone Quartet from 1993-2003. He has released 9 CDs as a leader. His last two discs, Tim Ries Quintet and Tim Ries Quintet Vol II, are live performances at Smalls Jazz Club. In 2005 and 2008 respectively, he released The Rolling Stones Project (Concord) and Stones World (Sunnyside), both are his versions of Stones classics arranged in jazz and world music genres. Both CDs have drawn rave reviews across the globe. Some of the guest artists featured on these discs include: all four Rolling Stones, Norah Jones, Sheryl Crow, Milton Nascimento, Sara Baras, Bill Frisell, John Scofield, Jack DeJohnette, Lisa Fischer, Bernard Fowler, Larry Goldings, Franck Amsallem, Eddie Palmieri, Brian Blade and Ana Moura. His latest collaborations are performing with the great flamenco dancer Sara Baras and with The East Gipsy Band from Budapest. Tim has taught saxophone and composition at The New School, Rutgers University, The City University of New York and The University of Toronto.',
      'Tim Ries plays Francois Louis mouthpieces, reeds and ligatures and The Virtuoso tenor and alto saxophones by RS Berkely',
    ],
  },
  {
    name: 'Obie Benz', role: 'Board Member -NY', photo: `${WP}/2020/03/obie-benz-01.jpg`,
    paragraphs: [
      'Obie Benz created a number of charitable organizations to support social justice causes. In 1971 he started the Vanguard Foundation, which made grants to San Francisco activist groups and helped found the Film Fund to support documentary filmmakers. In 1975 he organized Pacific Alliance, which produced benefit rock concerts for anti-nuclear power and American Indian treaty rights organizations with the help of Jackson Browne, Bonnie Raitt, and Graham Nash. In the 80’s he began making documentaries. Americas in Transition challenged US foreign policy in Latin America and was nominated for an Academy Award in 1981, as well as winning numerous prizes. He made two anti-weapons music videos which John Denver used as a backdrop in concert performances. In the late 80’s he produced and directed Heavy Petting, a comedy about teen sexuality which played theatrically in 75 cities and sold every major foreign market. In the 1995 he produced and directed In My Generation, a history about rock and roll in the 60’s, which became the best selling part of the Warner Bros / Time Life series. In the 90’s Amnesty International hired Benz to make many short films about people and organizations supporting human rights issues. He also produced a DVD for V-Day, an organization created by Eve Ensler, the writer of the Vagina Monologues, to oppose violence against women.',
      'Mr Benz has been featured in articles and books about progressive philanthropy, as he was a key organizer in the 70’s of groups encouraging people with inherited money to make charitable contributions. He was an editor and contributor to the book Robin Hood Was Right, which suggested ways people could support community organizing and other activist projects. He is currently writing a memoir.',
    ],
  },
  {
    name: 'Priscilla Lee', role: 'Board Member -NY', photo: `${WP}/2020/03/Pricilla-scaled.jpg`,
    paragraphs: [
      'Priscilla Lee is a product development professional, with experience from concept to consumer in the infant industry. Priscilla was born in Sao Paulo, Brazil and from her family upbringing, has always been fascinated with how diverse the world is, and how to improve it for future generations. Priscilla now calls Brooklyn, NY home, but takes every opportunity to travel with her family abroad to expose her children to different cultures. Priscilla has a Bachelor of Arts degree in French from the University of California at Davis, and a Master of Science in Hotel and Tourism Management from New York University.',
    ],
  },
  {
    name: 'Dena O’Connor', role: 'Board Member -NY', photo: `${WP}/2020/03/Dena.jpg`,
    paragraphs: [
      'Dena O’Connor, International Strategies Director for Turkey’s Maya Foundation, brings to her work a passion for children’s rights and extensive international experience. She has lived and worked in seven countries; the last 13 years in Turkey. Dena witnessed first-hand the devastating effects of the loss of human rights in her research and work with the Family Members of the Disappeared in Chile, which was the beginning of her pathway to focusing on vulnerable populations as a result of conflict. In her native USA, she provided services for newly immigrated children in the Massachusetts State System.',
      'In Istanbul, she has written curriculum, provided project-based learning, project event management and educational consulting for a variety of private clients. This work brought her in contact with some of Turkey’s most influential families. She spent two years working with refugee children from all over the world in informal education settings. She did market research for investment in the Mercosur Countries (Southern Common Market) for the New Hampshire Division of Economic Development of International Commerce and connected state businesses and cultural entities with potential international partners while also working as an official translator. She received an MA in International Relations from the University of Nottingham in England and a BA in International Relations and Latin American Studies from Wheaton College (Massachusetts, USA).',
      'When Syrian refugees began arriving in Turkey she focused on supporting children, youth, and families fleeing war. She is honored to be part of Maya Foundation’s dynamic team and to contribute her international educational experience and project management skills to its mission of helping traumatized populations through mental health and psychosocial services, including the Trauma Informed Schools Program in Turkish public schools as well as services to promote social cohesion between host and refugee communities. Dena works on development for the organization managing relations with individual donors, partnerships with non-Turkish organizations and organizing events and finding opportunities for new collaborations. An avid art lover who has helped children learn and grow through the arts for many years, she is particularly excited that creative art therapeutic interventions are key to Maya’s work and manages artist collaboration and cultural outreach for the organization. This focus led to exhibitions of the children’s art throughout Europe, including in London and Brussels.  Drawing from her political science studies, she also implemented an international advocacy program for Maya’s work built around conferences or panels in the United States and Turkey as well as in Brussels at the European Parliament.',
    ],
  },
  {
    name: 'Carlos Navarro', role: 'Board Member -NY', photo: `${WP}/2020/03/IMG-20200329-WA00022.jpg`,
    paragraphs: [
      'Carlos Navarro has worked for more than 20 years for international organizations and notably, the European Union and the United Nations, as a legal contract and procurement senior officer.',
      'In 2014, he took the courageous step to dedicate his life to egg tempera painting, writing and promoting art and culture as means to build bridges and universal growth.',
      'He has actively contributed to convert Newburgh, in the Hudson Valley, into a cultural and artistic hub. He is presently embarked in a new venture : opening an art gallery, the AGC gallery, in Newburgh to further facilitate artistic exchanges and build peace through art.',
    ],
  },
  {
    name: 'Eric Melloul', role: 'Board Member –Brussels', photo: `${WP}/2017/01/IMG_34111.jpg`,
    paragraphs: [
      'Eric Melloul is a world traveller that manages investments in beverages and consumer products of the Verlinvest group, and serves as board member or observer of several portfolio companies. Eric worked for Citibank corporate finance in NY and London and spent over 5 years as an Associate Partner with McKinsey & Co leading the consumer practice and advising leading food and beverages in Europe, US and the Middle East. In 2004, he joined Inbev as VP strategy overseeing M&A and global brands before assuming responsibility for marketing and commercial operations in China in 2005. Eric holds a MBA/MPA from Harvard University and BSC from the London School of Economics.',
    ],
  },
  {
    name: 'Silvia Cambra', role: 'Board Member -Brussels', photo: `${WP}/2017/11/20171124_213927-150x150.png`,
    paragraphs: [
      'Silvia Cambra comes from a family of musicians from multicultural music traditions. Through music, she had the opportunity to discover the world and its different people. She has acquired a first hand understanding of the power of music as a bridge between different cultures. Silvia has worked for over 20 years in Marketing and Communication for a number of multinational companies. Currently, she is involved in the development of innovative educative programmes and mainly based in Barcelona. Silvia holds a DAA, Award of Achievement in Digital analytics, from the University of British Columbia and teaches in various international universities.',
    ],
  },
];

export const partnerNetwork = 'We count on the precious collaboration of a network of **Partner Organizations** in New York, Washington, Amsterdam, Bakou, Berlin, Brussels, Paris, Barcelona, Madrid, Oslo, Rome, Amman, Beirut, Istanbul, Tel Aviv, Ramallah, Moscow and Nairobi.';
export const partnerNetworkClosing = 'We count on the precious collaboration of a network of Partner Organizations all over the world!';

export const addYourVoice = {
  heading: 'Artists have a crucial societal role, one of conciliating and building bridges between different people, regardless of their origins and beliefs.',
  intro: 'They are a source of positive values and can be active change makers using art as a catalyst for peaceful coexistence among different communities. Artists can therefore be a force for community development and social transformation. We can all play our role in echoing their voices by supporting artistic efforts to overcome all forms of discrimination, inter-cultural and inter-religious conflicts. This process requires collaborative action and distinct responsibilities. Choose yours and add your voice to the movement.',
  lead: '**Be a change maker**, here are the different ways you can support us.',
  roles: [
    { title: 'Project initiator', text: 'You have the will to act or a fascinating idea to share. Tell us about your dream project and what you will need to bring it to life.' },
    { title: 'Implementer', text: 'Do you have the means and the skills to develop your idea and turn it into a project? Share them with us and we will help you find partners, get expertise and take it to the next level.' },
    { title: 'Donor', text: 'Do you want to contribute in kind or financially to our cause? We thank you and we want to hear from you!' },
    { title: 'Supporter', text: 'Follow our news, tell your friends and contacts about our projects, get in touch with us and tell us what you think. A little encouragement goes long way!' },
  ],
};

export const successNumbers = [
  { value: '5', label: 'Editions of Global Women in Music (2023-2027)' },
  { value: '31', label: 'Women composers featured from around the world' },
  { value: '200+', label: 'Musicians on stage' },
  { value: '30+', label: 'Countries represented' },
  { value: '2,000+', label: 'Live audience members' },
  { value: '2 | 3 | 3', label: 'Winner Awards | Finalist Awards | Official Selections – for our Documentary' },
];

// Home: one block for the whole concert series (2023-2026) instead of one per edition. The per-edition
// blocks stay on /projects.
const notOnHome = new Set(['gwim-2026', 'gwim-2025', 'gwim-2023-24']);
export const homeProjects = currentProjects.filter((p) => !notOnHome.has(p.id));
