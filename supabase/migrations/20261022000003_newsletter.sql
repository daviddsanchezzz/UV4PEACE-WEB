-- Newsletter: subscribers (double opt-in) and campaigns.

create type subscriber_status  as enum ('pending', 'confirmed', 'unsubscribed');
create type newsletter_status  as enum ('draft', 'sending', 'sent');

create table subscribers (
  id               uuid primary key default gen_random_uuid(),
  email            text not null check (char_length(email) between 3 and 200 and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  status           subscriber_status not null default 'pending',
  token            uuid not null default gen_random_uuid(),   -- used in confirm and unsubscribe links
  source           text not null default 'website',
  created_at       timestamptz not null default now(),
  confirmed_at     timestamptz,
  unsubscribed_at  timestamptz
);
create unique index subscribers_email_key on subscribers (lower(email));
create unique index subscribers_token_key on subscribers (token);

create table newsletters (
  id           uuid primary key default gen_random_uuid(),
  subject      text not null default '',
  preheader    text not null default '',
  body_html    text not null default '',
  status       newsletter_status not null default 'draft',
  recipients   int not null default 0,
  failed       int not null default 0,
  created_by   uuid references auth.users (id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  sent_at      timestamptz
);
create trigger newsletters_touch before update on newsletters for each row execute function touch_updated_at();

alter table subscribers enable row level security;
alter table newsletters enable row level security;
create policy subscribers_editors on subscribers for all to authenticated using (is_editor()) with check (is_editor());
create policy newsletters_editors on newsletters for all to authenticated using (is_editor()) with check (is_editor());
-- No policy for anon: visitors can only go through the functions below, so nobody can list the emails.

-- Sign-up. Returns the token to put in the confirmation email, or null when nothing should be sent
-- (already confirmed). The caller answers the visitor the same way in every case.
create function subscribe(p_email text, p_token uuid) returns uuid
language plpgsql security definer set search_path = public as $$
declare r subscribers;
begin
  select * into r from subscribers where lower(email) = lower(trim(p_email));
  if not found then
    insert into subscribers (email, token) values (trim(p_email), p_token);
    return p_token;
  elsif r.status = 'confirmed' then
    return null;
  elsif r.status = 'pending' then
    return r.token;
  else
    update subscribers set status = 'pending', token = p_token, unsubscribed_at = null where id = r.id;
    return p_token;
  end if;
end $$;

create function confirm_subscription(p_token uuid) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update subscribers set status = 'confirmed', confirmed_at = coalesce(confirmed_at, now())
  where token = p_token and status in ('pending', 'confirmed');
  return found;
end $$;

create function unsubscribe(p_token uuid) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update subscribers set status = 'unsubscribed', unsubscribed_at = now()
  where token = p_token and status <> 'unsubscribed';
  return found;
end $$;

revoke all on function subscribe(text, uuid), confirm_subscription(uuid), unsubscribe(uuid) from public;
grant execute on function subscribe(text, uuid), confirm_subscription(uuid), unsubscribe(uuid) to anon, authenticated;
