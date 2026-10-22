// Single entry point for editable content. Pages and components ask for data here and never
// import src/data/* directly, so moving to Supabase only changes this file.
// Each getter is async on purpose: the Supabase version will await a query.
import { people } from '../data/people';
import type { Person } from '../data/people';
import { projects } from '../data/projects';
import type { Project, Edition } from '../data/projects';
import { press } from '../data/press';
import { partners } from '../data/partners';
import { testimonials } from '../data/testimonials';
import { stats } from '../data/stats';
import { site } from '../data/site';
import { createClient as createPublicClient, type SupabaseClient } from '@supabase/supabase-js';

export type { Person, PersonGroup } from '../data/people';
export type { Project, Edition, ProjectStatus } from '../data/projects';
import type { PressItem } from '../data/press';
import type { Partner } from '../data/partners';
import type { Testimonial } from '../data/testimonials';
import type { Stat } from '../data/stats';
export type { PressItem } from '../data/press';
export type { Partner } from '../data/partners';
export type { Testimonial } from '../data/testimonials';
export type { Stat } from '../data/stats';

// Reads come from Supabase when it is configured and fall back to the files in src/data/ otherwise
// (local development without a database, or if Supabase is unreachable). Public pages read with the
// public key, which only sees what row level security allows; the admin passes the editor's own client
// so drafts and hidden rows show up there too.
const configured = () => Boolean(import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
let anon: SupabaseClient | undefined;
const publicClient = () => (anon ??= createPublicClient(import.meta.env.PUBLIC_SUPABASE_URL!, import.meta.env.PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false, autoRefreshToken: false } }));

export type Db = Pick<SupabaseClient, 'from'>;

// A page asks for the same table from several components, so public reads are kept for a few seconds.
const memo = new Map<string, { at: number; data: Record<string, any>[] }>();

async function rows(table: string, db?: Db, order = 'sort_order'): Promise<Record<string, any>[] | null> {
  if (!configured() && !db) return null;
  const key = `${table}:${order}`;
  const hit = db ? undefined : memo.get(key);
  if (hit && Date.now() - hit.at < 15_000) return hit.data;
  try {
    // AbortSignal.timeout fired at once on Vercel's runtime, so the deadline is a plain race instead.
    const query = (db ?? publicClient()).from(table).select('*').order(order);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_, no) => { timer = setTimeout(() => no(new Error('timeout')), 5000); });
    const { data, error } = await Promise.race([query, deadline]).finally(() => clearTimeout(timer));
    if (error) { console.error(`content: could not read ${table}`, error.message); return null; }
    if (!db && data) memo.set(key, { at: Date.now(), data });
    return data;
  } catch (e) {
    console.error(`content: could not read ${table}`, e);
    return null;
  }
}

export const getPress = async (db?: Db): Promise<PressItem[]> => {
  const r = await rows('press_items', db, 'date');
  return r ? r.map((x) => ({ id: x.slug, date: x.date, dateLabel: x.date_label, kind: x.kind, title: x.title, by: x.source, url: x.url, featured: x.featured })) : press;
};
export const getPartners = async (db?: Db): Promise<Partner[]> => {
  const r = await rows('partners', db);
  return r ? r.map((x) => ({ id: x.slug, name: x.name, logo: x.logo, url: x.url, tier: x.tier, active: x.active, order: x.sort_order })) : partners;
};
export const getTestimonials = async (db?: Db): Promise<Testimonial[]> => {
  const r = await rows('testimonials', db);
  return r ? r.map((x) => ({ id: x.slug, text: x.text, who: x.who, caption: x.caption, photo: x.photo, project: x.project_slug ?? '', order: x.sort_order, published: x.published, home: x.home })) : testimonials;
};
export const getPeople = async (db?: Db): Promise<Person[]> => {
  const [r, pr] = await Promise.all([rows('people', db), rows('projects', db, 'slug')]);
  if (!r) return people;
  const slugOf = new Map((pr ?? []).map((x) => [x.id, x.slug]));
  return r.map((x) => ({ slug: x.slug, name: x.name, role: x.role, city: x.city, group: x.group, project: x.project_id ? slugOf.get(x.project_id) : undefined, edition: x.edition ?? undefined, photo: x.photo, bio: x.bio, website: x.website, order: x.sort_order, published: x.published }));
};

export const getProjects = async (db?: Db): Promise<Project[]> => {
  const [pr, ed, lu] = await Promise.all([rows('projects', db, 'sort_order'), rows('editions', db, 'year'), rows('edition_lineup', db)]);
  if (!pr || !ed || !lu) return projects;
  const lineupOf = new Map<string, { name: string; role: string }[]>();
  for (const l of lu) lineupOf.set(l.edition_id, [...(lineupOf.get(l.edition_id) ?? []), { name: l.name, role: l.role }]);
  return pr.map((x): Project => {
    const editions: Edition[] = ed.filter((e) => e.project_id === x.id).map((e) => ({ year: e.year, number: e.number, date: e.date_label, venue: e.venue, event: e.event, conductor: e.conductor, description: e.description, credits: e.credits ?? undefined, lineup: lineupOf.get(e.id) ?? [], watchUrl: e.watch_url, upcoming: e.upcoming || undefined }));
    return {
      slug: x.slug, title: x.title, titleAccent: x.title_accent ?? undefined, status: x.status, yearStart: x.year_start, dateLabel: x.date_label, city: x.city, summary: x.summary,
      featured: x.featured, cover: x.cover, coverHint: x.cover_hint ?? undefined, hero: x.hero ?? undefined, intro: x.intro ?? undefined, body: x.body ?? undefined, vision: x.vision ?? undefined,
      stats: x.stats ?? undefined, statsNote: x.stats_note ?? undefined, editions: editions.length ? editions : undefined, documentary: x.documentary ?? undefined, gallery: x.gallery ?? undefined, partner: x.partner_block ?? undefined, published: x.published,
    };
  });
};
export const getProject = async (slug: string, db?: Db) => (await getProjects(db)).find((p) => p.slug === slug);

export const getStats = async (db?: Db): Promise<Stat[]> => {
  const r = await rows('stats', db);
  return r ? r.map((x) => ({ id: x.slug, n: x.n, label: x.label, order: x.sort_order })) : stats;
};

export interface SiteSettings {
  /** Shown on the site and receives contact-form messages. */
  email: string;
  /** Donate button target. Empty until provided: the button then falls back to email. */
  paypalUrl: string;
  social: { label: string; href: string }[];
  /** Google Analytics 4 measurement ID. Empty means analytics is off and no cookie banner is shown. */
  analyticsId: string;
  partnerMailto: string;
  proposalMailto: string;
}

const gaId = (v?: string) => (/^G-[A-Z0-9]{4,14}$/.test(String(v ?? '').trim()) ? String(v).trim() : '');
const mailto = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

export const getSettings = async (db?: Db): Promise<SiteSettings> => {
  const r = await rows('site_settings', db, 'id');
  const x = r?.[0];
  const email = x?.contact_email || site.email;
  return {
    email,
    paypalUrl: x ? x.paypal_url : site.paypalUrl,
    social: x ? x.social : site.social,
    analyticsId: gaId(x ? x.analytics_id : site.analyticsId || import.meta.env.PUBLIC_GA_ID),
    partnerMailto: mailto(email, 'Partnership'),
    proposalMailto: mailto(email, 'Project proposal'),
  };
};
