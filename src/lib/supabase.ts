/**
 * Server-side Supabase client — used only in API routes.
 * Never import this in 'use client' components.
 *
 * Before using, run this SQL in your Supabase SQL editor:
 * ─────────────────────────────────────────────────────────────
 * CREATE TABLE user_collection (
 *   id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id     TEXT NOT NULL,
 *   fragrance_id INTEGER NOT NULL,
 *   fragrance_name TEXT NOT NULL,
 *   brand       TEXT NOT NULL,
 *   created_at  TIMESTAMPTZ DEFAULT NOW(),
 *   UNIQUE(user_id, fragrance_id)
 * );
 *
 * CREATE TABLE diary_entries (
 *   id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id      TEXT NOT NULL,
 *   fragrance_id INTEGER,
 *   fragrance_name TEXT NOT NULL,
 *   brand        TEXT NOT NULL,
 *   occasion     TEXT NOT NULL,
 *   longevity    INTEGER NOT NULL,
 *   projection   INTEGER NOT NULL,
 *   review       TEXT,
 *   date         DATE NOT NULL,
 *   created_at   TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * CREATE TABLE sample_requests (
 *   id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email          TEXT NOT NULL,
 *   name           TEXT,
 *   fragrance_name TEXT NOT NULL,
 *   brand          TEXT,
 *   created_at     TIMESTAMPTZ DEFAULT NOW()
 * );
 * CREATE INDEX sample_requests_email_idx ON sample_requests(email);
 *
 * -- Row Level Security (recommended for production)
 * ALTER TABLE user_collection ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE diary_entries   ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE sample_requests ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "own collection" ON user_collection
 *   FOR ALL USING (true) WITH CHECK (true);
 * CREATE POLICY "own diary" ON diary_entries
 *   FOR ALL USING (true) WITH CHECK (true);
 * CREATE POLICY "insert samples" ON sample_requests
 *   FOR INSERT WITH CHECK (true);
 * ─────────────────────────────────────────────────────────────
 * (Security is enforced at the API route level via Clerk auth.)
 */

import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');
  return createClient(url, key);
}
