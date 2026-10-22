import type { APIRoute } from 'astro';
import { connect, listSubscribers } from '../../../../lib/newsletter-db';

const cell = (v: string) => (/^[=+\-@\t\r]/.test(v) ? `'${v}` : v).replace(/"/g, '""'); // stop spreadsheet formula injection

export const GET: APIRoute = async ({ request, cookies }) => {
  const rows = await listSubscribers(connect(request, cookies));
  const csv = ['email,estado,origen,alta,confirmado', ...rows.map((s) => [s.email, s.status, s.source, s.created_at, s.confirmed_at ?? ''].map((v) => `"${cell(String(v))}"`).join(','))].join('\n');
  return new Response('﻿' + csv + '\n', { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="suscriptores.csv"', 'Cache-Control': 'no-store' } });
};
