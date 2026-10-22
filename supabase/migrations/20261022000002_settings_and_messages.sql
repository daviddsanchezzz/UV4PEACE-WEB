-- Site settings editable from the admin (Ajustes) and the contact form inbox.

-- One row only (id is always true).
create table site_settings (
  id             boolean primary key default true check (id),
  contact_email  text not null,                       -- shown on the site and receives contact-form emails
  paypal_url     text not null default '',            -- empty: Donate button falls back to email
  social         jsonb not null default '[]',         -- [{ label, href }]
  updated_at     timestamptz not null default now(),
  constraint contact_email_format check (contact_email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  constraint paypal_url_https check (paypal_url = '' or paypal_url ~ '^https://')
);
insert into site_settings (contact_email, social) values ('info@uv4peace.org', '[
  {"label": "Instagram", "href": ""},
  {"label": "LinkedIn", "href": ""},
  {"label": "YouTube", "href": ""}
]');
create trigger site_settings_touch before update on site_settings for each row execute function touch_updated_at();

alter table site_settings enable row level security;
create policy site_settings_read  on site_settings for select using (true);
create policy site_settings_write on site_settings for all to authenticated using (is_editor()) with check (is_editor());

-- Copy of every contact-form message. Anyone can add one (the form), only editors can read them.
create table contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 200),
  topic       text not null default 'General',
  message     text not null check (char_length(message) between 1 and 5000),
  created_at  timestamptz not null default now()
);
alter table contact_messages enable row level security;
create policy contact_insert on contact_messages for insert to anon, authenticated with check (true);
create policy contact_read   on contact_messages for select to authenticated using (is_editor());
create policy contact_delete on contact_messages for delete to authenticated using (is_editor());
