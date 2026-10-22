// Single entry point for editable content. Pages and components ask for data here and never
// import src/data/* directly, so moving to Supabase only changes this file.
// Each getter is async on purpose: the Supabase version will await a query.
import { people } from '../data/people';
import { projects } from '../data/projects';
import { press } from '../data/press';
import { partners } from '../data/partners';
import { testimonials } from '../data/testimonials';
import { stats } from '../data/stats';

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
