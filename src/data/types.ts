// Shared shapes. Field names mirror the Supabase tables planned for Phase 2
// (see WEB CLAUDE DESING/data/SCHEMA.md) so the Phase 2 migration is a like-for-like swap.

export interface ImageRef {
  /** Filename in src/assets/fotos/ (local, optimised via astro:assets) or a full https:// URL (remote). */
  src: string;
  alt: string;
  /** CSS object-position, e.g. "50% 50%". */
  pos?: string;
  /** Pixel size of an uploaded photo; lets the site serve it in several optimised sizes. */
  w?: number;
  h?: number;
}

export interface PersonRef {
  name: string;
  role: string;
  /** Slug of the matching entry in People, when the line-up member has one (photo and name come from there). */
  person?: string;
}
