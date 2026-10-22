// Sitemap built from the live project list, so a project added in the panel is listed without a deploy.
import type { APIRoute } from 'astro';
import { getProjects } from '../lib/content';

const fixed = ['', 'projects/', 'people/', 'press/', 'get-involved/', 'donate/', 'newsletter/', 'terms/', 'privacy/', 'cookies/'];

export const GET: APIRoute = async () => {
  const origin = 'https://uv4peace.org';
  const projects = await getProjects();
  const urls = [...fixed, ...projects.map((p) => `projects/${p.slug}/`)].map((u) => `<url><loc>${origin}/${u}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, s-maxage=3600' },
  });
};
