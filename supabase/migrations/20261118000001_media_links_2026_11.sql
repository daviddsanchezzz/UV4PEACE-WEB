-- New media links found by David (18 Nov 2026). Safe to re-run.
-- Skipped: Spotify episode of The Italy Now Podcast (already listed via Apple Podcasts, slug italy-now-podcast-2026).

insert into media_mentions (slug, kind, outlet, url, language, sort_order) values
  ('la-voce-2026-gwim-quinta-edizione', 'coverage', 'La Voce di New York — United Voices 4 Peace presenta la quinta edizione del Global Women in Music (2026)', 'https://lavocedinewyork.com/new-york/2026/11/12/united-voices-4-peace-presenta-la-quinta-edizione-del-global-women-in-music/', 'it', -10),
  ('pressenza-2023-pathways-to-peace', 'coverage', 'Pressenza — Pathways to Peace honours Exceptional Women of Peace nominees (2023)', 'https://www.pressenza.com/2023/09/pathways-to-peace-honors-extraordinary-women-for-their-dedication-to-peace/', 'en', 20),
  ('ejewishphilanthropy-2022', 'coverage', 'eJewishPhilanthropy — Death Metal Grandma NFT collection pays tribute to Holocaust survivor (2022)', 'https://ejewishphilanthropy.com/death-metal-grandma-nft-collection-pays-tribute-to-holocaust-survivor/', 'en', 21),
  ('academy-cultural-diplomacy-2019', 'coverage', 'Academy for Cultural Diplomacy — Video interview with Veronica Sabbag (2019)', 'https://www.youtube.com/watch?v=Haq-AHSjupg', 'en', 22),
  ('imdb-veronica-sabbag', 'coverage', 'IMDb — Veronica Sabbag, filmography', 'https://www.imdb.com/name/nm17365887/', 'en', 23)
on conflict (slug) do nothing;
