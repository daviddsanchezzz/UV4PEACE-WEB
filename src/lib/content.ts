// Single entry point for editable content. Pages and components ask for data here and never
// import src/data/* directly, so moving to Supabase only changes this file.
// Each getter is async on purpose: the Supabase version will await a query.
import { people } from '../data/people';
import { projects } from '../data/projects';
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

export const getPeople = async () => people;
export const getProjects = async () => projects;
export const getProject = async (slug: string) => projects.find((p) => p.slug === slug);
// Reads come from Supabase when it is configured and fall back to the files in src/data/ otherwise
// (local development without a database, or if Supabase is unreachable). Public pages read with the
// public key, which only sees what row level security allows; the admin passes the editor's own client
// so drafts and hidden rows show up there too.
const configured = () => Boolean(import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
let anon: SupabaseClient | undefined;
const publicClient = () => (anon ??= createPublicClient(import.meta.env.PUBLIC_SUPABASE_URL!, import.meta.env.PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false, autoRefreshToken: false } }));

export type Db = Pick<SupabaseClient, 'from'>;

async function rows(table: string, db?: Db, order = 'sort_order'): Promise<Record<string, any>[] | null> {
  if (!configured() && !db) return null;
  try {
    const { data, error } = await (db ?? publicClient()).from(table).select('*').order(order).abortSignal(AbortSignal.timeout(5000));
    if (error) { console.error(`content: could not read ${table}`, error.message); return null; }
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

export const getSettings = async (): Promise<SiteSettings> => ({
  email: site.email,
  paypalUrl: site.paypalUrl,
  social: site.social,
  analyticsId: gaId(site.analyticsId || import.meta.env.PUBLIC_GA_ID),
  partnerMailto: mailto(site.email, 'Partnership'),
  proposalMailto: mailto(site.email, 'Project proposal'),
});
