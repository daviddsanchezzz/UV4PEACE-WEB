-- "Featured in" outlet names (home) and the founder's block (home and People), editable from Ajustes.
-- founder stays null until it is saved once; the site then falls back to the text shipped with it.
alter table site_settings
  add column featured_in jsonb not null default '["Variety", "Forbes", "La Vanguardia", "French Morning"]',
  add column founder jsonb;
