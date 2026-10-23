import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Every page is rendered on request: the content comes from Supabase and the CDN keeps each page for a minute (see src/middleware.ts).
const building = process.argv.includes('build');

export default defineConfig({
  site: 'https://uv4peace.org',
  output: 'server',
  adapter: vercel(),
  // Behind Vercel the server cannot tell which address it is served from unless we say which ones are ours.
  // Without this Astro assumes "localhost": form posts are rejected as cross-site (403) and any link built
  // from the site address (confirm subscription, unsubscribe, password reset) would point to localhost.
  security: {
    allowedDomains: [
      { hostname: 'uv4peace.org', protocol: 'https' },
      { hostname: 'www.uv4peace.org', protocol: 'https' },
      { hostname: '**.vercel.app', protocol: 'https' }, // the project address and branch previews
    ],
  },
  // sanitize-html requires an ES-module-only dependency, which Vercel's Node runtime cannot load: bundle it in the
  // production build. (In `astro dev` Vite loads it from node_modules, where bundling it fails with "require is not defined".)
  vite: { plugins: [tailwindcss()], ssr: { noExternal: building ? [/^(sanitize-html|htmlparser2|domhandler|domutils|domelementtype|dom-serializer|entities|parse-srcset|launder|is-plain-object|escape-string-regexp)$/] : [] } },
  image: {
    // People photos not yet migrated to local assets point at the current uv4peace.org media library.
    domains: ['uv4peace.org'],
    // Photos uploaded from the panel live in Supabase storage.
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },
});
