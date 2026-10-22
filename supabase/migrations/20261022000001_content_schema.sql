-- UV4PEACE content schema. Field names mirror src/data/*.ts so the migration is like-for-like.
-- Apply with the Supabase CLI or the SQL editor, then run supabase/seed.sql.


create type person_group   as enum ('team', 'board', 'ambassador', 'artist');
create type project_status as enum ('ongoing', 'past');
create type press_kind     as enum ('award', 'honour', 'selection', 'nomination', 'seal');
create type partner_tier   as enum ('main', 'partner', 'supporter');
create type mention_kind   as enum ('spoke_about_us', 'coverage');

-- Editors: people allowed to change content. Add a row after creating their auth user.
create table editors (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  role       text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);

create function is_editor() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from editors where user_id = auth.uid());
$$;

-- Same idea for owners. Policies on `editors` must not query `editors` themselves (that recurses forever),
-- so both checks run as the function owner and skip row level security.
create function is_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from editors where user_id = auth.uid() and role = 'owner');
$$;

create function touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;

-- Projects and people ---------------------------------------------------------------------
create table projects (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  title_accent   text,
  status         project_status not null default 'past',
  year_start     text not null default '',            -- YYYY-MM, used for ordering
  date_label     text not null default '',
  city           text not null default '',
  summary        text not null default '',
  featured       boolean not null default false,
  cover          jsonb,                               -- { src, alt, pos }
  cover_hint     text,                                -- editorial note, never rendered publicly
  hero           jsonb,
  intro          text,
  body           text,
  vision         text,
  stats          jsonb,                               -- [{ n, label }]
  stats_note     text,
  gallery        jsonb,                               -- [{ src, alt, pos, span }]
  documentary    jsonb,                               -- { title, text, trailerUrl, poster, festivals[] }
  partner_block  jsonb,                               -- { eyebrow, title, titleAccent, text, benefits[], photo }
  published      boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table editions (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references projects (id) on delete cascade,
  year        text not null,
  number      int  not null,
  date_label  text not null default '',
  venue       text not null default '',               -- empty means "not confirmed": never rendered
  event       text not null default '',
  conductor   text not null default '',
  description text not null default '',
  credits     text,
  watch_url   text not null default '',
  upcoming    boolean not null default false,
  updated_at  timestamptz not null default now(),
  unique (project_id, year)
);

create table people (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  role        text not null default '',
  city        text not null default '',
  "group"     person_group not null,
  project_id  uuid references projects (id) on delete set null,   -- artists: project they performed in
  edition     text,                                                -- ...and the edition year
  photo       jsonb,                                               -- { src, alt, pos }
  bio         text not null default '',
  website     text not null default '',
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table edition_lineup (
  id          uuid primary key default gen_random_uuid(),
  edition_id  uuid not null references editions (id) on delete cascade,
  person_id   uuid references people (id) on delete set null,     -- optional link to People
  name        text not null,
  role        text not null default '',
  sort_order  int not null default 0
);

-- Other content ---------------------------------------------------------------------------
create table press_items (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  date        text not null,                          -- YYYY-MM, used for ordering
  date_label  text not null default '',
  kind        press_kind not null,
  title       text not null,
  source      text not null default '',               -- who gave it or where (was `by`)
  url         text not null default '',
  featured    boolean not null default false,
  updated_at  timestamptz not null default now()
);

create table media_mentions (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  kind        mention_kind not null default 'coverage',
  outlet      text not null,
  url         text not null default '',
  language    text not null default 'en' check (language in ('ar', 'fr', 'it', 'en', 'es')),
  sort_order  int not null default 0
);

create table press_archive (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  date_label  text not null default '',
  links       jsonb not null default '[]',            -- [{ label, url }]
  sort_order  int not null default 0
);

create table partners (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  logo        text,                                   -- storage path; null shows the name as text
  url         text not null default '',
  tier        partner_tier not null default 'partner',
  active      boolean not null default true,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table testimonials (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  text          text not null,
  who           text not null default '',
  caption       text not null default '',
  photo         jsonb,
  project_slug  text references projects (slug) on update cascade on delete set null,
  published     boolean not null default true,
  home          boolean not null default false,
  sort_order    int not null default 0,
  updated_at    timestamptz not null default now()
);

create table stats (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  n           text not null,
  label       text not null,
  sort_order  int not null default 0
);

-- Editing log: feeds "Últimos cambios" and the "Publicar" screen (rows with published_at null).
create table content_changes (
  id            uuid primary key default gen_random_uuid(),
  table_name    text not null,
  row_slug      text,
  summary       text not null,
  user_id       uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  published_at  timestamptz
);

-- updated_at triggers
do $$
declare t text;
begin
  foreach t in array array['projects','editions','people','press_items','partners','testimonials'] loop
    execute format('create trigger %I before update on %I for each row execute function touch_updated_at()', t || '_touch', t);
  end loop;
end $$;

create index on editions (project_id, year);
create index on people ("group", sort_order);
create index on edition_lineup (edition_id, sort_order);
create index on content_changes (published_at, created_at desc);

-- Row level security -----------------------------------------------------------------------
-- Everyone reads what is published; only editors write. content_changes and editors are editors-only.
do $$
declare t text;
begin
  foreach t in array array['projects','editions','people','edition_lineup','press_items','media_mentions','press_archive','partners','testimonials','stats'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy %I on %I for select using (true)', t || '_read', t);
    execute format('create policy %I on %I for all to authenticated using (is_editor()) with check (is_editor())', t || '_write', t);
  end loop;
end $$;

-- Hide unpublished rows from the public (editors still see them via the write policy above).
drop policy projects_read     on projects;     create policy projects_read     on projects     for select using (published or is_editor());
drop policy people_read       on people;       create policy people_read       on people       for select using (published or is_editor());
drop policy testimonials_read on testimonials; create policy testimonials_read on testimonials for select using (published or is_editor());
drop policy partners_read     on partners;     create policy partners_read     on partners     for select using (active or is_editor());

alter table editors          enable row level security;
alter table content_changes  enable row level security;
create policy editors_self       on editors         for select to authenticated using (user_id = auth.uid() or is_editor());
create policy editors_owner_write on editors        for all    to authenticated using (is_owner()) with check (is_owner());
create policy changes_editors    on content_changes for all    to authenticated using (is_editor()) with check (is_editor());

-- Storage: public bucket for photos and logos; only editors upload ------------------------------
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy media_read   on storage.objects for select using (bucket_id = 'media');
create policy media_insert on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_editor());
create policy media_update on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_editor());
create policy media_delete on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_editor());
