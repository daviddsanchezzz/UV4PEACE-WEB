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

export type { Person, PersonGroup } from '../data/people';
export type { Project, Edition, ProjectStatus } from '../data/projects';
export type { PressItem } from '../data/press';
export type { Partner } from '../data/partners';
export type { Testimonial } from '../data/testimonials';
export type { Stat } from '../data/stats';

export const getPeople = async () => people;
export const getProjects = async () => projects;
export const getProject = async (slug: string) => projects.find((p) => p.slug === slug);
export const getPress = async () => press;
export const getPartners = async () => partners;
export const getTestimonials = async () => testimonials;
export const getStats = async () => stats;

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
