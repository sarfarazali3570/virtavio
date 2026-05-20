import { createBrowserClient } from '@supabase/ssr';

// ── Singleton pattern ──────────────────────────────────────────────────────
// Module-level variable: initialised once when the module is first imported,
// shared across every component that calls createClient().  This ensures only
// ONE auth listener and ONE lock owner can exist in the browser at any time.
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export const createClient = () => {
  // On the server, always return a fresh client (no persistent state needed).
  if (typeof window === 'undefined') {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // In the browser, return (or create) the single shared instance.
  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }
    );
  }

  return browserClient;
};
