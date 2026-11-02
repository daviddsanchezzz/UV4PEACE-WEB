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
      'We discussed important topics such as the healing power of arts, boosting mental health through the art, how arts, artists and art forms drive creative thinking, human innovation and influence social change, as well as the amalgamation of arts and the New Age tech: metaverse, NFTs, DeFi and other.Stay tuned for the upcoming Arts Manifesto of the New Age, the formation of the ArtTech Council and all the wisdom of the amazing Create!Summit hero speakers: scholars, scientists, business executives, film and opera directors, actors, creatives and innovators working on the intersection of arts and technology.',
      '**[Read more](https://www.createsummit.art/)**',
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
      'As advocated by our previous initiatives, arts and culture – through the artists and arts and organizations bringing them to communities- have a vital role to play in responding to these disasters and their possible consequences. More than ever, UV4Peace is adhering new avenues to acclimate to the new environment and the unavoidable cultural shift, by finding ways to facilitate collaborative engagement, mostly online, and in future live encounters.',
      'In this context, we will be promoting initiatives helping to adapt to this shared new environment, as we are all in this together. We will make use of our global platform to bring hope and happiness to individuals but to also send a socially conscious messages to assist everyone, in particular the most vulnerable ones, such as ethnic minorities, women, children and refugees, get through these challenging times, contributing to strengthening social cohesion during our global community’s recovery.',
      'Further updates will be posted on our social media. See review by the UN Global Communications Department [here](https://mailchi.mp/un/civilsocietycovid-19)',
      'We wish everyone to stay healthy and safe during this trying times!',
    ],
  },
  {
    id: 'women-arts-climate', title: 'Women & Arts in times of Climate Emergency', video: `${WP}/2020/05/VID-20200506-WA0000.mp4`,
    paragraphs: [
      'On International Women’s Day 2020, and ahead of the 64th session of the UN Commission on the Status of Women (CSW), UV4Peace in partnership with Women in Music, marked this day with a global celebration uniting efforts for humanitarian and environmental justice in front of the current climate emergency.',
      'On this occasion, the crucial role of the arts to respond to global emergencies was debated as well as the instrumental role played by artists to raise awareness and build societal resilience to overcome adversity.',
      'Following the panel discussion, this celebration shed light on the impactful stories of those affected by environmental degradation and disasters, amplifying the diverse voices of artists from Australia (Jennifer Reed), Puerto Rico (Girasoles Creative Studio & Edwin Garcia “Coqui”), Italy (Nicola Lo Calzo & Valentina Volpe Andreazza) and Japan (Yuko Kudo & Taiko Masala) through their different forms of artistic expression.',
      'See [more HERE](https://uv4peace.org/wp-content/uploads/2020/03/20200310_154212-1.jpg)',
    ],
  },
  {
    id: 'dance-or-die', title: 'Dance or Die : from Syria to New York',
    images: [`${WP}/2019/12/20191126_090718.jpg`, `${WP}/2019/12/IMG_20191126_030049_215.jpg`],
    paragraphs: [
      'United Voices 4 Peace and the NY City Mayor’s Office, successfully supported Ahmad’s Joudeh journey to the United States.',
      'On 25 November at Primeproduce, in New York City, Joudeh performed his choreography “Sacrifice” followed by a Q&A session.',
      'Hours later, the documentary ‘Dance or Die’ about his remarkable life, won an international Emmy at the ceremony held in the context of the 47th International Emmy Awards. Watch the Trailer here: [http://bit.ly/2WOPnDf](http://bit.ly/2WOPnDf)',
      'Ahmad, UV4P Peace Ambassador, has used the art of dance to raise awareness on the humanitarian crisis in Syria.',
      '[read more HERE](https://uv4peace.org/wp-content/uploads/2019/11/AJPRESSRELEASE3_compressed.pdf)',
    ],
  },
  {
    id: 'liberty-meets-beauty', title: 'Liberty meets Beauty, La Voce di NY',
    images: [`${WP}/2019/05/fb-k8442414_1199056476938315_5690378105768640512_n.jpg`],
    paragraphs: [
      'On the Anniversary of Italy’s Liberation from Nazi occupation, UV4Peace supported and took part to the second edition of the ceremony ‘LIBERTY MEETS BEAUTY’- VNY MEDIA AWARD 2019.',
      'This year the event is in honour of the work of Gaia Pianigiani, reporter for the New York Times.\nThe event,  was opened with an adress by Bill de Blasio, Mayor of NYC, and feature pianist Rosa Antonelli performing Piazzolla’s famous “libertango” to celebrate free press, women in media & women in music.',
    ],
  },
  {
    id: 'death-penalty-congress', title: '7th World Congress Against Death Penalty',
    images: [`${WP}/2019/05/DSC_0656.jpg`, `${WP}/2019/05/DSC_0616.jpg`],
    paragraphs: [
      'At the invitation of the Association “Together Against Death Penalty/Ensemble Contre la Peine de Mort” (#ECPM), organizer of the 7th World Congress of abolitionists -with a special focus on Africa- #UnitedVoices4Peace was part of the “Civil Society Village” during the event.',
      'UV4Peace had an exhibition stand during the Congress’ duration featuring multitalented artist Georges Miankiri Bens Gamthety, born in N’Djamena, Chad.',
      'Through his paintings and sketches, witnessing his great sensitivity to social issues, George advocated for human rights, the right to life and dignity for all: « My objective through my art is above all to share a shadow  state of mind that will each time be enlighted by a positive and reassuring message » .',
      'The Congress, was organised with the support of 12 diplomatic services (Argentina, Australia, Belgium, Benin, France, Mexico, Monaco, Mongolia, Norway, Rwanda, Spain and Switzerland), sponsored by the EU and UN major institutions and gathered more than 3.000 participants from 115 different countries.',
    ],
  },
  {
    id: 'women-professionals-music', title: 'Women Professionals in the Music Industry',
    images: [`${WP}/2019/01/50245440_10156952173523210_5725972496910385152_n.jpg`],
    paragraphs: [
      'January 16th, at the invitation of the [United Nations Women’s International Forum](https://www.facebook.com/womensinternationalforum/), UV4Peace co-chaired and hold a workshop at the UN Headquarters in New York on “Women Professionals in the Music Industry” sponsored by the Permanent Mission of Peru to the United Nations. The discussion focused on the music industry’s challenges and possible changes regarding gender equality, pluralism and diversity.',
      'The panel was composed by three women working tirelessly to promote gender equality, pluralism and diversity in music:',
      '• Neeta Ragoowansi, former President of the “Women In Music” association,\n• Veronica Sabbag, Founder and CEO of our “United Voices 4 Peace” organisation\n• Jane Meryll, Founder of the StageFright SolutionsTM, Grammy nominee pianist & composer, winner of the “Global Women in Music 4 Women Rights” award.',
      'You can watch the event HERE\n[http://webtv.un.org/watch/women-professionals-in-the-music-industry-mission-of-peru/5990228972001](http://webtv.un.org/watch/women-professionals-in-the-music-industry-mission-of-peru/5990228972001)',
    ],
  },
  {
    id: 'diversity-makes-music', title: 'Diversity makes Music',
    images: [`${WP}/2018/11/IMG-20181122-WA0008.jpg`, `${WP}/2018/11/IMG-20181122-WA0014.jpg`],
    paragraphs: [
      'Another joint event with the [International Yehudi Menuhin Foundation.](http://www.menuhin-foundation.com/)',
      'UV4Peace supported the organisation of their Annual Gala that took place at the Flagey Theatre in Brussels on Wednesday, November 21st.',
      'A musical route featuring Syrian dancer Ahmad Joudeh, percussionist Burhan Oçal and his Istanbul ensemble (Turkey),multi-istrumentalist Dimitri Psonis (Greece), violinist Gilles Apap (France), and the Brussels Chamber Orchestra,directed by the Spanish Mario Villuendas.',
      'UV4Peace facilitated this journey, blending classical and world music, to be a reality fostering an inspiring cross-cultural exchange. See more on [HERE](https://www.flagey.be/en/activity/4964-diversity-makes-music?fbclid=IwAR3n6DfZmZtoQLFt2ZQ6L6AWERYSEdeClSpBJZ7Ti9lQ1OMYTjDg329T04Y).',
    ],
  },
  {
    id: 'gwim-4-human-rights', title: 'Global Women in Music 4 Human Rights',
    images: [`${WP}/2018/11/received_269959953721213.jpeg`],
    paragraphs: [
      '• UV4Peace partnered with [Fondazione Adkins Chiti: Donne in Musica](http://www.donneinmusica.org/) for the commemoration of the 70th Anniversary of the Universal Declaration of Human Rights. The project “Global Women in Music 4 Human Rights” is part of the world-wide campaign commemorating this 70th anniversary.A Gala concert featuring the 10 winning works of a global call for scores, took place in Rome on November 5th at Teatro Argentina under the auspices of the UN High Commissioner for Human Rights\n• #GWIM4HumanRights.',
      'Here the [Program](https://uv4peace.org/wp-content/uploads/2018/10/Program.pdf)',
    ],
  },
  {
    id: 'together-in-solidarity', title: 'Together in Solidarity',
    images: [`${WP}/2018/10/36454493_990629927780972_1717369989297602560_n.jpg`],
    paragraphs: [
      'Syrian Ahmad Joudeh dancing in Brussels.',
      'On the occasion of the World Refugee Day, June 20th, UV4Peace, in collaboration with the European Parliament, organized the event ‘Together in Solidarity’.',
      'Charmed by the Syrian dancer and choreographer Ahmad Joudeh’s performance on the Esplanade Simone Veil, in front of the European Parliament, hundreds of people participated, including decisions makers and media. Watch the video, [LINK](https://m.facebook.com/story.php?story_fbid=1151891604953415&id=284077591734825).',
      'From the ruins of Palmyra to the streets of Paris, Amsterdam and Madrid, Ahmad Joudeh expresses his remarkable art to spread hope and resilience for all those who had flee war and persecution.',
      'The initiative aimed to showcasing the successful integration of refugees throughout the European Union.',
      'Sponsored by the UNESCO Brussels Liaison Office, “Together in Solidarity” was also part of the celebrations of the European Year of Cultural Heritage and granted with the EYCH Label #EuropeForCulture.',
      '– [Read More](https://uv4peace.org/wp-content/uploads/2018/06/PR-TSolidarityweb-final.pdf) about Together in Solidarity\n– [Read More](https://uv4peace.org/wp-content/uploads/2018/06/PRESS-CLIPPING-final.pdf) about Press Clipping',
    ],
  },
  {
    id: 'flamenco-festival', title: 'Annual flamenco festival in Brussels',
    images: [`${WP}/2022/10/17a4ee1b-2f88-4f7e-8bbd-015cd978f56b.jpg`],
    paragraphs: [
      'As part of the celebrations of the European Year for Cultural Heritage, UV4Peace organized a “meet the artist” encounter on the eve of the 1st of March 2018 with the Gipsies of the Mediterranean at the prestigious Palais des Beaux Arts in Brussels.',
      'Under the auspices of the Spanish Embassy to the Kingdom of Belgium and in the context of its annual flamenco festival, Dorantes and Taksim Trio – acting as our Peace Ambassadors- debated the value of flamenco, World Cultural Heritage, and as an instrument for intercultural dialogue and social inclusion.',
    ],
  },
];
