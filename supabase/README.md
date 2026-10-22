# Supabase

- `migrations/20261022000001_content_schema.sql`: tables, row level security and the `media` storage bucket.
- `seed.sql`: current site content. Generated, so regenerate with `node scripts/gen-seed.mjs` after editing `src/data/*.ts`. Safe to run twice.

## Apply to a new project

1. Run the migration, then `seed.sql` (SQL editor or `supabase db push`).
2. Create the editors' users in Authentication, then insert them:
   `insert into editors (user_id, email, role) values ('<auth user id>', 'name@example.org', 'owner');`
3. Everyone can read published content; only rows in `editors` can write.

## Login

- Authentication → Providers: enable Email. Turn **off** "Allow new users to sign up" so only invited accounts exist.
- Authentication → URL Configuration: set Site URL to the production domain and add `https://<domain>/admin/auth/callback` (and the Vercel preview domain while testing) to Redirect URLs.
- Create the two users in Authentication → Users, then add each to `editors` with role `owner`.
- Vercel env vars (Production and Preview): `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).
- Until those two variables exist, `/admin` answers 503 in production, so deploying early is safe.
