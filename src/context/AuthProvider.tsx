'use client';

/**
 * AuthProvider — single global auth listener for the entire app.
 *
 * Key design decisions:
 *  • onAuthStateChange is mounted ONCE here, never in leaf components.
 *  • We do NOT call getUser() / getSession() inside this effect; the listener
 *    fires immediately with INITIAL_SESSION so there is no duplicate lock.
 *  • Subscription is cleaned up on unmount, preventing orphaned locks.
 *  • This component is 'use client' so it is never re-created by the server.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

// ── Types ─────────────────────────────────────────────────────────────────
interface Profile {
  id: string;
  full_name?: string | null;
  role?: string | null;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

// ── Provider ──────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  // Start as true — we don't know the auth state yet.
  const [loading, setLoading] = useState(true);

  // Stable reference to the Supabase singleton.
  const supabase = createClient();

  const fetchProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (!error && data) setProfile(data as Profile);
      } catch {
        // Non-fatal — profile fetch errors should not break auth flow.
      }
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  useEffect(() => {
    // ── Single auth listener ───────────────────────────────────────────
    // onAuthStateChange fires synchronously with INITIAL_SESSION on mount,
    // so we never need a separate getSession() / getUser() call here.
    // This eliminates the double-lock contention.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Profile fetch is async — do it outside the synchronous listener
        // body to avoid any internal Supabase locking issues.
        fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }

      // Mark loading complete after the first event resolves.
      setLoading(false);
    });

    // ── Cleanup ───────────────────────────────────────────────────────
    // Unsubscribing releases the lock and prevents orphaned listeners on
    // component unmount (e.g. React Strict Mode double-mount).
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array — mount once, clean up on unmount.

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
