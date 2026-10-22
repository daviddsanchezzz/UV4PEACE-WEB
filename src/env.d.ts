/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_API_URL?: string;
  readonly CONTACT_FROM?: string;
}

declare namespace App {
  interface Locals {
    /** Set by the admin middleware for signed-in editors. */
    userEmail?: string;
  }
}
