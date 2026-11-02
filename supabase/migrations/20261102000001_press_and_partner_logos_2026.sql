-- Latest press and partner logos sent by Veronica (Nov 2026). Adds Serbian as a coverage language.
-- Negative sort_order puts them first in their language group. Safe to re-run.

alter table media_mentions drop constraint if exists media_mentions_language_check;
alter table media_mentions add constraint media_mentions_language_check check (language in ('ar', 'fr', 'it', 'en', 'es', 'sr'));

insert into media_mentions (slug, kind, outlet, url, language, sort_order) values
  ('la-voce-2026-en', 'coverage', 'La Voce di New York — Music as an Antidote to War (2026)', 'https://lavocedinewyork.com/en/un/2026/10/01/music-as-an-antidote-to-war-veronica-sabbag-and-united-voices-4-peace/', 'en', -8),
  ('italy-now-podcast-2026', 'coverage', 'The Italy Now Podcast — Music, peace & diplomacy (2026)', 'https://podcasts.apple.com/gb/podcast/music-peace-diplomacy-putting-female-composers-back/id1883405492?i=1000768244127', 'en', -7),
  ('la-voce-2026-it', 'coverage', 'La Voce di New York — La musica come antidoto alla guerra (2026)', 'https://lavocedinewyork.com/onu/2026/10/01/la-musica-come-antidoto-alla-guerra-veronica-sabbag-e-la-united-voices-4-peace/', 'it', -6),
  ('el-correo-gallego-2026', 'coverage', 'El Correo Gallego — Aida Saco y la Orquesta Sinfónica de la ONU (2026)', 'https://www.elcorreogallego.es/barbanza-muros-noia/2026/03/11/orquesta-sinfonica-onu-interpretara-obra-127835213.html', 'es', -5),
  ('perfil-2026', 'coverage', 'Perfil — Morena Galán (2026)', 'https://noticias.perfil.com/noticias/personajes/morena-galan-estoy-cumpliendo-un-sueno-ahora-pero-siempre-hay-mas.phtml', 'es', -4),
  ('un-news-2025', 'coverage', 'Noticias ONU — Entrevista (2025)', 'https://news.un.org/es/interview/2025/03/1537056', 'es', -3),
  ('politika-2026', 'coverage', 'Politika — Interview with conductor Vesna Šoucs (2026)', 'https://www.politika.rs/scc/clanak/735527/velika-je-cast-dirigovati-u-njujorku', 'sr', -2)
on conflict (slug) do nothing;

-- Partner logos sent by Veronica (files in public/logos/partners/), plus the UN Symphony Orchestra.
update partners set logo = '/logos/partners/next-jump.png' where slug = 'next-jump' and logo is null;
update partners set logo = '/logos/partners/nh-collection-new-york-madison-avenue.png' where slug = 'nh-collection-new-york-madison-avenue' and logo is null;
update partners set logo = '/logos/partners/vital-voices-global-partnership.png' where slug = 'vital-voices-global-partnership' and logo is null;
insert into partners (slug, name, logo, url, tier, active, sort_order)
values ('un-symphony-orchestra', 'UN Symphony Orchestra', '/logos/partners/un-symphony-orchestra.png', '', 'partner', true, 0)
on conflict (slug) do nothing;
update partners set logo = '/logos/partners/consulate-general-of-spain-in-new-york.png' where slug = 'consulate-general-of-spain-in-new-york' and logo is null;
update partners set logo = '/logos/partners/spain-arts-culture.png' where slug = 'spain-arts-culture' and logo is null;
