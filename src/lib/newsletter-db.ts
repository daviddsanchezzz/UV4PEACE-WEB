// Newsletter data for the admin. With Supabase configured it reads the real tables; without it
// (local prototype) it returns clearly fake sample data so the screens can be browsed.
import type { AstroCookies } from 'astro';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient, supabaseConfigured } from './supabase';

export type SubscriberStatus = 'pending' | 'confirmed' | 'unsubscribed';
export interface Subscriber { id: string; email: string; status: SubscriberStatus; source: string; created_at: string; confirmed_at: string | null }
export type NewsletterStatus = 'draft' | 'sending' | 'sent';
export interface Newsletter { id: string; subject: string; preheader: string; body_html: string; status: NewsletterStatus; recipients: number; failed: number; created_at: string; sent_at: string | null }

export const statusLabel: Record<SubscriberStatus, string> = { pending: 'Sin confirmar', confirmed: 'Confirmado', unsubscribed: 'De baja' };
export const newsletterLabel: Record<NewsletterStatus, string> = { draft: 'Borrador', sending: 'Enviando', sent: 'Enviada' };

const day = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const sampleSubs: Subscriber[] = [
  ['ana.perez@example.org', 'confirmed', 40], ['luis.gomez@example.org', 'confirmed', 33], ['marie.dubois@example.org', 'confirmed', 21],
  ['john.smith@example.org', 'confirmed', 18], ['sofia.rossi@example.org', 'confirmed', 9], ['carlos.ruiz@example.org', 'pending', 2],
  ['emma.jones@example.org', 'pending', 1], ['pedro.lopez@example.org', 'unsubscribed', 60],
].map(([email, status, d], i) => ({ id: `sample-${i}`, email: email as string, status: status as SubscriberStatus, source: i === 1 ? 'manual' : 'website', created_at: day(d as number), confirmed_at: status === 'pending' ? null : day((d as number) - 1) }));
const sampleNews: Newsletter[] = [
  { id: 'sample-n1', subject: 'Global Women in Music 2027: save the date', preheader: 'La próxima edición ya tiene fecha', body_html: '<h2>Save the date</h2><p>We are happy to announce <strong>Global Women in Music 2027</strong>.</p><ul><li>New York, March 2027</li><li>Open call for composers</li></ul><p>Read more on <a href="https://uv4peace.org/projects/global-women-in-music/">our website</a>.</p>', status: 'draft', recipients: 0, failed: 0, created_at: day(2), sent_at: null },
  { id: 'sample-n2', subject: 'Thank you for a wonderful 2026 edition', preheader: 'Nearly 700 guests joined us', body_html: '<p>Thank you to everyone who joined us at Symphony Space.</p>', status: 'sent', recipients: 5, failed: 0, created_at: day(40), sent_at: day(39) },
];

export interface AdminNewsletter {
  sample: boolean;
  sb: SupabaseClient | null;
}
export const connect = (request: Request, cookies: AstroCookies): AdminNewsletter =>
  supabaseConfigured() ? { sample: false, sb: createClient(request, cookies) } : { sample: true, sb: null };

export async function listSubscribers(c: AdminNewsletter): Promise<Subscriber[]> {
  if (!c.sb) return sampleSubs;
  const { data, error } = await c.sb.from('subscribers').select('id,email,status,source,created_at,confirmed_at').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as Subscriber[];
}

export async function listNewsletters(c: AdminNewsletter): Promise<Newsletter[]> {
  if (!c.sb) return sampleNews;
  const { data, error } = await c.sb.from('newsletters').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as Newsletter[];
}

export async function getNewsletter(c: AdminNewsletter, id: string): Promise<Newsletter | null> {
  if (!c.sb) return sampleNews.find((n) => n.id === id) ?? null;
  const { data } = await c.sb.from('newsletters').select('*').eq('id', id).maybeSingle();
  return (data as Newsletter) ?? null;
}

export const countByStatus = (subs: Subscriber[]) => ({
  confirmed: subs.filter((s) => s.status === 'confirmed').length,
  pending: subs.filter((s) => s.status === 'pending').length,
  unsubscribed: subs.filter((s) => s.status === 'unsubscribed').length,
});
