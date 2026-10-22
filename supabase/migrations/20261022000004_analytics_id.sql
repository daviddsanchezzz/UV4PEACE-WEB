-- Google Analytics 4 measurement ID, editable in the panel (Ajustes). Empty: no analytics, no cookie banner.
alter table site_settings
  add column analytics_id text not null default '',
  add constraint analytics_id_format check (analytics_id = '' or analytics_id ~ '^G-[A-Z0-9]{4,14}$');
