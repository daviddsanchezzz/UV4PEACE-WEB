-- "Read more" style links of a project (article, press page, video...): [{ label, url }].
alter table projects add column links jsonb not null default '[]';
