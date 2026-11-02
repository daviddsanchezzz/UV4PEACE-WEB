// Current projects exactly as on the old uv4peace.org/projects/ page (full texts, in the same order).
// The Home page keeps its own shorter versions in classic.ts.
import type { ClassicProject } from './classic';
import { currentProjects } from './classic';
const WP = 'https://uv4peace.org/wp-content/uploads';
const byId = (id: string) => currentProjects.find((p) => p.id === id)!;

export const projectsPageCurrent: ClassicProject[] = [
  byId('gwim-2026'),
  byId('gwim-2025'),
  byId('gwim-documentary'),
  {
    id: 'gwim-2024', title: 'Global Woman in Music ‘2024', video: `${WP}/2024/04/ab0091bc-8fb8-4035-b26d-8e93b664195c.mp4`,
    paragraphs: [
      'On the occasion of the sixty-eighth session of the United Nations Commission on the **Status of Women (CSW68)** and in celebration of **International Women’s Day, 2024**, United Voices 4 Peace and the United Nations Symphony Orchestra (UNSRC) presented the second edition of “Global Women in Music.”',
      'This one-of-its-kind **concert featured a full program of music** from eight **female composers** from around the world .',
      'Scheduled on March 12, 2024, at the **NYU Skirball Performing Arts Center in NY**, this second annual cultural event was held under the baton of multi-award winning conductor **Amy Andersson.**',
      'Considering that still, only **5 % of concert music scheduled around the world is from women composers**, we mitigated once more this astounding fact by creating a unique platform to showcase the works of eight talented women composers from different countries and backgrounds.',
      'We amplified, once more, the voices of underrepresented artists, promoting diversity and inclusion as means to justice and peace, highlighting the importance of arts in building bridges for peace .',
      '**Watch the concert here** : [https://youtu.be/CUAHyFOuWhM](https://youtu.be/CUAHyFOuWhM)',
    ],
  },
  {
    id: 'gwim-2023', title: 'Global Women in Music ‘2023', photo: 'gwim-2023',
    paragraphs: [
      '“United Voices 4 Peace and the United Nations Symphony Orchestra (UNSRC) have partnered to bring to life the “**Global Women in Music**” initiative.',
      'On the occasion of the **International Women’s Day, 2023** and in the margins to the Conference of the Status of Women (CSW 67), the “Global Women in Music” is the first, **one of a kind concert by the United Nations Orchestra** – exceptionally conducted by Maestra Anoa Green – **performing a full program featuring pieces of female composers** to advance gender equality. The concert will feature 8 pieces from contemporary composers from around the world (Argentina, Iran, Ukraine, China, to name a few), one from Louise Farrenc (France) and Florence Price (USA) to honor their legacy.',
      'Only five percent of the concert music scheduled around the world is from women composers, an astounding statistic. Our unique program aims to bring female composers and conductors to the forefront and spotlight their music and talent to raise awareness, motivate engagement, activism and inspire change towards a more inclusive music industry and social environment.',
      '**DATE, TIME & LOCATION**\nWednesday March 8, 2023\n7.30h PM\nBMCC – Tribeca Performing Arts Center\n199 Chambers Street, New York, NY 10007',
      'Learn more on : [https://www.youtube.com/live/VxVGjaWucDU?feature=shared](https://www.youtube.com/live/VxVGjaWucDU?feature=shared)',
    ],
  },
  {
    id: 'create-summit', title: 'Create!Summit – 2022', video: `${WP}/2022/11/UPD-Veronica_1920x1080.mp4`,
    paragraphs: [
      '**UV4PEACE** is proud to have co-hosted the pilot virtual Create!Summit – 2022, held online on October 22nd on an initiative of Artists&Angels.',
      'The impactful results in numbers: **18 speakers | 8 timezones | 800 guests | 7 hours of quality content | 3 panels | 2 workshops | 1 keynote | 1111 Hz of great vibes | 1 Arts Manifesto | 1 ArtTech Council**',
      'We discussed important topics such as the healing power of arts, boosting mental health through the art, how arts, artists and art forms drive creative thinking, human innovation and influence social change, as well as the amalgamation of arts and the New Age tech: metaverse, NFTs, DeFi and other.Stay tuned for the upcoming Arts Manifesto of the New Age, the formation of the ArtTech Council and all the wisdom of the amazing Create!Summit hero speakers: scholars, scientists, business executives, film and opera directors, actors, creatives and innovators working on the intersection of arts and technology.',
      '**[Read more](https://www.createsummit.art/)**',
    ],
  },
  {
    id: 'afghan-women', title: '“Afghan Women, Human Rights & the transformative power of the Arts”',
    images: [`${WP}/2022/10/ae247007-611f-46e0-b439-c09d7543340f.jpg`, `${WP}/2022/10/aa6cafc0-85a0-4533-8d1b-ce3bd5ad00de.jpg`],
    paragraphs: [
      'As the world leaders gathered again in person in NY on the occasion of the United Nations General Assembly, **United Voices 4 Peace** partnered with the **Muslim American Leadership Alliance** (MALA) and the 49% for a special screening of the short animated film “Samira’s Camera” on September 22nd at Prime Produce, to mark the **International Peace Day 2022**.',
      'The screening, introduced by Paula Kweskin, “Samira’s Camera” film director, was followed by a panel discussion moderated by our founder and Director, Veronica Sabbag, on “Afghan Women, Human Rights & the transformative power of the Arts”.',
      'It featured Linda Kaplan Thaler, American Author and composer considered to be “Most Influential Women in Advertising ” and Zahra Sahebzada, Afghan American influencer.',
      'Joanna Sherman, co-founder of the Bond Street Theater, contributed to the event with a performance showcasing the theater’s experience in setting programs for women and girls in Afghanistan for over 15 years.',
      '**UV4PEACE** will continue amplifying the voices of women affected by conflict as a way to express solidarity. No action is too small to make a difference ?\nAbout the movie:',
      'Samira’s Camera is a four minute animated film about Samira*, a filmmaker, young mother, and wife who was uprooted from her home following threats by the Taliban. Samira spends her days trawling the streets of Kabul, capturing stories most are too frightened to tell. At night, she, her husband, and one-year-old son shelter in a safe house.',
      'Samira is based on the true story of our friend and colleague, a filmmaker whose films we have been proud to show at our film festivals and gatherings. After the Taliban came to power, Samira reached out to us for help. We committed to helping her family, but just as critically, we promised to tell her story.',
      'Help us share Samira’s story – and the story of Afghan women – with the world.',
      'A quote from the Director:',
      '*“I feel very strongly we each have a role to play in telling the stories of women who are persecuted for using their voices and do not enjoy the extraordinary freedom many of us have. International pressure works, and we each can amplify the voices of women in Afghanistan to demand their basic rights. The international community is failing the women and girls of Afghanistan, but we can make demands on their behalf. In fact, we have a responsibility to do so”.*',
      '– Paula Kweskin, Director',
    ],
  },
  {
    id: 'future-creative-industry', title: 'Future of Creative Industry',
    images: [`${WP}/2021/09/Future-of-Creative-Industry.jpeg`],
    paragraphs: [
      'Ahead of the 76th United Nations General Assembly kicking off this September 14th, we are thrilled to announce our active participation to advance a more sustainable future for all.',
      'As the world leaders from every field are convened on this occasion, we are presented with a crucial opportunity to spotlight solutions and encourage actions towards a better world.',
      'On September 22, we will be part of a side event reflecting on “the future of creative industry” in partnership with untapped storytellers and other remarkable artivists.',
      'This forward looking event will consider ways to build back better a sustainable recovery of the creative industry in the aftermath of the health crisis also as part of the celebrations of this international year of creative economy.',
      'Add your voice & RSVP : [https://virt.com/event/future-of-creative-industry--12/](https://virt.com/event/future-of-creative-industry--12/)',
    ],
  },
  {
    id: 'death-metal-grandma', title: 'DEATH METAL GRANDMA – An unconventional call for social justice',
    images: [`${WP}/2021/02/Death-Metal-Grandma.jpg`, `${WP}/2021/02/Death-Metal-Grandma-2.jpg`],
    paragraphs: [
      'UV4PEACE was thrilled to launch its first virtual event and digital program.',
      'The program consists on a **series of documentary screenings and concerts.** It aims at addressing the current systemic social inequalities, with a special focus on gender, age and religion-based discrimination.',
      'It also adresses the topic of the Holocaust and the fight against antisemitism echoing the voice of a funny, endearing and engaging protagonist, **Inge Ginsberg**.',
      'Inge, a 98 Holocaust survivor, found an unlikely avenue to raise her voice through heavy metal music – against all odds – in a way that allows engagement of new generations.',
      '**The first documentary screening and live concert of this series was streamed from Barcelona on Thursday, December 17th in partnership with Manhattan Camerata, Amics UNESCO Bcn, Mozaika BCN & LICRA**. It counted with precious contributions from Leah Galant (DMG Director) María de los Ángeles Reynaud (singer) Roxan Jurkevich (percusionist), Jean-Batiste Texier Gibert (cellist) & Sergio Gassmann (video producer).',
      'This first event featured the “**Death Metal Grandma**” documentary – a unique and inspiring portrait of a 98-year-old Holocaust survivor that refuses to be silenced- followed by a live concert performed by her versatil band, inspired by Mediterranean rythms. Watch here: [https://youtu.be/oorUKwkHEbc](https://youtu.be/oorUKwkHEbc)',
      'Coinciding with Hanukkah, the Festival of Lights, it brought an impactful message of peace, hope, union and inclusiveness, creating a fertile ground for social change. Read [https://www.themetalcircus.com/reportajes/death-metal-grandma-inge-ginsberg/](https://www.themetalcircus.com/reportajes/death-metal-grandma-inge-ginsberg/)',
      'The event was preceded by a pre-screening session at Amics de la Unesco also in Barcelona : [https://youtu.be/pMON-7fkvK8](https://youtu.be/pMON-7fkvK8)',
      '**[HELP US](/donate/)** to further develop our program in other locations by donating thought our website.',
    ],
  },
  {
    id: 'hiroshima-75', title: '75th Hiroshima Memorial, Peace +Art + Music Global Broadcast',
    images: [`${WP}/2020/10/Screenshot_20200730-092209_Gallery-3.jpg`, `${WP}/2020/10/20200802_164505.jpg`],
    paragraphs: [
      'We are honored to have add our voice to this worldwide 75th Hiroshima Memorial in partnership with the city of Hiroshima, in Japan.',
      'On 6th of August, we were part of a global broadcast commemoration and an occasion to celebrate solidarity Peace +Art + Music. We united with other global agents of peace who like us, are fighting to live up the ideals of peace, equality and justice.',
      'UV4PEACE is proud to have been represented on this occasion by its Peace Ambassadors : dancer Hussein Smko and its Project TAG, multitalented artist and social entrepreneur Yuko Kudo, Broadway performer  Minami Yusui & Saxophonist Tim Ries, who took the audience to an emotional journey from Iraq, to Japan and New York through their performances.',
      'This inspiring contribution calling for hope and reconciliation was aired, along with live and recorded performances and discussions, via global livestream on 6 August on [http://midheaven.network](http://midheaven.network). See our UV4PEACE contribution [here](https://drive.google.com/file/d/1YrbcGZ0G9aq3a95BeOBih1X5VAw6ZUzH/view?usp=sharing).',
    ],
  },
  {
    id: 'fight-for-the-future', title: 'Fight for the Future',
    images: [`${WP}/2020/05/IMG-20200515-WA0000.jpg`],
    paragraphs: [
      'We are excited to announce our partnership with UNITE 2030 and other strategic partners, such as Microsoft, the International Olympic Committee, Global changemakers, the United Nations Association and many others, for the “Fight For the Future” event from 15-18th May.',
      'In line with his mission, UNITE 2030 will coordinate this global “hackathon” empowering next generation solutions to the problems that we are facing globally in the midst of the Covid-19 crisis.',
      'This is a massive global effort involving communities, organizers, mentors, and expertise from all over the world — all with the common goal of creating solutions for a post-crisis world.',
      'In this context, UV4PEACE will advocate for cultural diplomacy based solutions and raise awareness on the need to support the cultural sector and artists globally, so hardly hit by the crisis. Young people everywhere are taking action to change the world, it’s time to join them, so don’t hesitate to convey your messages !',
    ],
  },
  {
    id: 'arts-coronavirus', title: 'Arts in Times of Coronavirus', video: `${WP}/2020/04/VID-20200331-WA0004.mp4`,
    paragraphs: [
      'The Coronavirus (COVID-19) global crisis is an unprecedented world-wide health and human emergency with yet-to-be-seen impacts on communities across the globe.\nAs our human community is confronted with this immense challenge, **UV4Peace** recognizes how it risks to exacerbate and worsen existing social inequalities, threatening peace at all levels.',
      '**UV4Peace** is more than ever committed to act to forge ahead, with empathy and solidarity, our vision of a just and peaceful world, addressing rising concerns expressed by the most vulnerable members of our community and preventing the possible effects of this crisis.',
    ],
  },
  byId('together-in-solidarity'),
];
