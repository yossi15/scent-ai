/**
 * Server-side Supabase client used by API routes only.
 *
 * Production setup:
 * - Set NEXT_PUBLIC_SUPABASE_URL.
 * - Set SUPABASE_SERVICE_ROLE_KEY in server-only environment variables.
 * - Do not expose broad RLS policies for user-owned tables.
 *
 * The API routes enforce Clerk auth and pass the Clerk user id into queries.
 * The service role key is intentionally server-only so browser clients cannot
 * read or mutate user_collection, diary_entries, subscriptions, or requests.
 */

import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing Supabase server env vars');
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
