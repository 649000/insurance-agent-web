import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

/**
 * Creates an authenticated Supabase client using the Firebase Auth ID Token.
 * This ensures PostgreSQL Row Level Security (RLS) can extract the user's
 * Firebase UID via `auth.firebase_uid()`.
 */
export const getSupabaseClient = (firebaseToken?: string): SupabaseClient => {
  const headers: Record<string, string> = {};

  if (firebaseToken) {
    headers.Authorization = `Bearer ${firebaseToken}`;
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers,
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
