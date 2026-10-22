# Supabase

- `migrations/20261022000001_content_schema.sql`: tables, row level security and the `media` storage bucket.
- `seed.sql`: current site content. Generated, so regenerate with `node scripts/gen-seed.mjs` after editing `src/data/*.ts`. Safe to run twice.

## Apply to a new project

1. Run the migration, then `seed.sql` (SQL editor or `supabase db push`).
2. Create the editors' users in Authentication, then insert them:
   `insert into editors (user_id, email, role) values ('<auth user id>', 'name@example.org', 'owner');`
3. Everyone can read published content; only rows in `editors` can write.
