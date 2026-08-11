// ─────────────────────────────────────────────────────────────────────────────
// Hotel E Santa Rosa — Platform Config
// Fill in your Supabase project details before deploying.
// Never commit real keys — use Vercel environment variables in production.
// ─────────────────────────────────────────────────────────────────────────────

export const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  ?? "";
export const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON ?? "";
export const FUNCTIONS_URL = import.meta.env.VITE_FUNCTIONS_URL
  ?? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
