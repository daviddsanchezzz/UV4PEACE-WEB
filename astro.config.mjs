import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Public pages are prerendered (static); /admin and form endpoints (added in later phases)
// opt out of prerendering to run on the server. See src/pages/**/* `export const prerender`.
export default defineConfig({
  site: 'https://uv4peace.org',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  image: {
    // People photos not yet migrated to local assets point at the current uv4peace.org media library.
    domains: ['uv4peace.org'],
  },
});
