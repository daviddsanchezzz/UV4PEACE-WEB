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

## Newsletter

- Migration `20261022000003_newsletter.sql` adds `subscribers` and `newsletters`. Visitors can only use the `subscribe`, `confirm_subscription` and `unsubscribe` functions, so nobody can list the emails. Only editors can read or edit the tables.
- Sign-up is double opt-in: the visitor gets an email with a confirmation link and is only mailed after clicking it. Every email has an unsubscribe link and the one-click `List-Unsubscribe` header.
- Sending goes through Resend (same `RESEND_API_KEY` and `CONTACT_FROM` as the contact form), 100 emails per call. The send button claims the draft first, so a double click cannot send twice, and it refuses if the audience size changed since the screen was loaded.
- Vercel limits how long a function can run. A list of a few thousand people sends in well under a minute; beyond roughly 5,000 the send should move to a background job.
- Not done yet: images inside the newsletter, open/click statistics, CSV import of an existing list, scheduled sending.

## Google Analytics and cookies

- Migration `20261022000004_analytics_id.sql` adds `site_settings.analytics_id`. It is edited in the panel (Ajustes) and accepts only `G-XXXXXXXXXX` or empty.
- Until it is set (here, or with `PUBLIC_GA_ID` in Vercel) the site loads nothing from Google, sets no cookies and shows no banner.
- Once set, visitors get a cookie banner with Accept all and Reject all with equal weight. Google Analytics is only requested after they accept, with advertising and Google Signals off. The choice is a first-party cookie (`uv4p_consent`) kept for 6 months. "Cookie settings" in the footer and on the Cookies page reopens it, and turning Analytics off deletes the `_ga*` cookies.
- To do when the ID exists: add the cookie names (`_ga`, `_ga_<ID>`, `uv4p_consent`) to the Cookies Policy table, and in GA4 turn off data sharing, Google signals and set data retention to 2 months.
