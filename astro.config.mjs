import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Public pages are prerendered (static); /admin and form endpoints (added in later phases)
// opt out of prerendering to run on the server. See src/pages/**/* `export const prerender`.
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
  // sanitize-html requires an ES-module-only dependency, which Vercel's Node runtime cannot load: bundle it instead.
  vite: { plugins: [tailwindcss()], ssr: { noExternal: [/^(sanitize-html|htmlparser2|domhandler|domutils|domelementtype|dom-serializer|entities|parse-srcset|launder|is-plain-object|escape-string-regexp)$/] } },
  image: {
    // People photos not yet migrated to local assets point at the current uv4peace.org media library.
    domains: ['uv4peace.org'],
  },
});
