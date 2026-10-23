-- Line-up members can point to a person in the People list (edition_lineup.person_id), so the name, photo and
-- role are kept in one place. Replaces save_project from migration 05 and links the existing line-ups by name.
-- Saves a whole project (its fields, editions and line-ups) in one transaction, for the admin panel.
-- Runs as the caller, so row level security still applies: only editors can write.
-- Keys missing from the JSON leave the stored value alone; a key set to null clears it.
create or replace function save_project(p_slug text, p jsonb) returns text
language plpgsql set search_path = public as $$
declare
  pid uuid; eid uuid; e jsonb; years text[];
begin
  if not is_editor() then raise exception 'not allowed'; end if;

  if coalesce(p_slug, '') = '' then
    p_slug := p->>'slug';
    insert into projects (slug, title, sort_order)
    values (p_slug, p->>'title', coalesce((select max(sort_order) from projects), 0) + 1)
    returning id into pid;
  else
    select id into pid from projects where slug = p_slug;
    if pid is null then raise exception 'project not found'; end if;
  end if;

  update projects set
    title        = coalesce(p->>'title', title),
    title_accent = case when p ? 'title_accent' then nullif(p->>'title_accent', '') else title_accent end,
    status       = coalesce((p->>'status')::project_status, status),
    year_start   = coalesce(p->>'year_start', year_start),
    date_label   = coalesce(p->>'date_label', date_label),
    city         = coalesce(p->>'city', city),
    summary      = coalesce(p->>'summary', summary),
    featured     = coalesce((p->>'featured')::boolean, featured),
    published    = coalesce((p->>'published')::boolean, published),
    intro        = case when p ? 'intro' then nullif(p->>'intro', '') else intro end,
    body         = case when p ? 'body' then nullif(p->>'body', '') else body end,
    vision       = case when p ? 'vision' then nullif(p->>'vision', '') else vision end,
    cover        = case when p ? 'cover' then nullif(p->'cover', 'null'::jsonb) else cover end,
    hero         = case when p ? 'hero' then nullif(p->'hero', 'null'::jsonb) else hero end,
    gallery      = case when p ? 'gallery' then nullif(nullif(p->'gallery', 'null'::jsonb), '[]'::jsonb) else gallery end,
    documentary  = case when p ? 'documentary' then nullif(p->'documentary', 'null'::jsonb) else documentary end,
    stats        = case when p ? 'stats' then nullif(nullif(p->'stats', 'null'::jsonb), '[]'::jsonb) else stats end,
    stats_note   = case when p ? 'stats_note' then nullif(p->>'stats_note', '') else stats_note end
  where id = pid;

  -- only one project is the featured one on the home page
  if (select featured from projects where id = pid) then
    update projects set featured = false where featured and id <> pid;
  end if;

  if p ? 'editions' then
    select coalesce(array_agg(x->>'year'), '{}') into years from jsonb_array_elements(p->'editions') x;
    delete from editions where project_id = pid and year <> all (years);
    for e in select * from jsonb_array_elements(p->'editions') loop
      insert into editions (project_id, year, number, date_label, venue, event, conductor, description, credits, watch_url, upcoming)
      values (pid, e->>'year', 0, coalesce(e->>'date_label', ''), coalesce(e->>'venue', ''), coalesce(e->>'event', ''), coalesce(e->>'conductor', ''),
              coalesce(e->>'description', ''), nullif(e->>'credits', ''), coalesce(e->>'watch_url', ''), coalesce((e->>'upcoming')::boolean, false))
      on conflict (project_id, year) do update set
        date_label = excluded.date_label, venue = excluded.venue, event = excluded.event, conductor = excluded.conductor,
        description = excluded.description, credits = coalesce(excluded.credits, editions.credits), watch_url = excluded.watch_url, upcoming = excluded.upcoming
      returning id into eid;
      delete from edition_lineup where edition_id = eid;
      insert into edition_lineup (edition_id, person_id, name, role, sort_order)
      select eid, pe.id, coalesce(pe.name, t.mem->>'name'), coalesce(t.mem->>'role', ''), t.ord::int
      from jsonb_array_elements(coalesce(e->'lineup', '[]'::jsonb)) with ordinality as t(mem, ord)
      left join people pe on pe.slug = nullif(t.mem->>'person', '')
      where coalesce(pe.name, t.mem->>'name', '') <> '';
    end loop;
    update editions set number = n.rn
    from (select id, row_number() over (order by year) as rn from editions where project_id = pid) n
    where editions.id = n.id;
  end if;

  return p_slug;
end $$;

-- Only editors are allowed to run it (the function checks again).
revoke all on function save_project(text, jsonb) from public, anon;
grant execute on function save_project(text, jsonb) to authenticated;

-- Link line-ups that were typed by hand to the person with the same name.
update edition_lineup l set person_id = p.id
from people p
where l.person_id is null and lower(btrim(l.name)) = lower(btrim(p.name));
