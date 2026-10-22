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
- Create the two users in Authentication → Users (veronicasabbag@hotmail.com and davidsr1919@gmail.com), then run `editors.sql`, which adds both to `editors` as `owner`.
- Vercel env vars (Production and Preview): `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).
- Until those two variables exist, `/admin` answers 503 in production, so deploying early is safe.

## Contact form email

- `/api/contact` emails the address stored in `site_settings.contact_email` (editable in the panel, Ajustes) and keeps a copy in `contact_messages`.
- It uses [Resend](https://resend.com): create an account, verify the sending domain (uv4peace.org), and set `RESEND_API_KEY` and `CONTACT_FROM` in Vercel (server-side, not `PUBLIC_`).
- Without `RESEND_API_KEY` the form shows an error with the contact address instead of claiming success.
- Not done yet: rate limiting beyond the honeypot, and Turnstile if spam appears.
