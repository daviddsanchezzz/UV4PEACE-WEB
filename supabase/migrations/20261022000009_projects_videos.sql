-- YouTube or Vimeo videos shown on a project page: [{ title, url }].
alter table projects add column videos jsonb not null default '[]';
