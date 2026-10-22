// Resend API base URL. Overridable (RESEND_API_URL) so tests can point at a local mock.
export const resendBase = () =>
  String(import.meta.env?.RESEND_API_URL ?? (typeof process !== 'undefined' ? process.env.RESEND_API_URL : undefined) ?? 'https://api.resend.com').replace(/\/+$/, '');
