// Sitemap of the public pages.
import type { APIRoute } from 'astro';

// Only the pages linked from the menu and footer. Add your Voice and the single project pages are not linked for now.
const fixed = ['', 'about-us/', 'projects/', 'media-and-recognition/', 'contact/', 'donate/', 'terms/', 'privacy/', 'cookies/'];

export const GET: APIRoute = async () => {
  const origin = 'https://uv4peace.org';
  const urls = fixed.map((u) => `<url><loc>${origin}/${u}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, s-maxage=3600' },
  });
};
