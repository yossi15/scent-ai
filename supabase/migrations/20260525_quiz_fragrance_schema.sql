-- ============================================================
-- SCENTORY — Quiz, Fragrance & Consent Schema
-- Migration: 20260525
-- ============================================================

-- Enable UUID extension (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- cookie_consent
-- One row per device/session. Upserted on each consent change.
-- ============================================================
CREATE TABLE IF NOT EXISTS cookie_consent (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    TEXT        NOT NULL,
  essential     BOOLEAN     NOT NULL DEFAULT true,
  analytics     BOOLEAN     NOT NULL DEFAULT false,
  marketing     BOOLEAN     NOT NULL DEFAULT false,
  ip_hash       TEXT,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cookie_consent_session_idx ON cookie_consent (session_id);

ALTER TABLE cookie_consent ENABLE ROW LEVEL SECURITY;

-- Service-role can write; anon can insert their own row
CREATE POLICY "cookie_consent_insert" ON cookie_consent
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "cookie_consent_update_own" ON cookie_consent
  FOR UPDATE TO anon, authenticated
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- ============================================================
-- email_subscribers
-- Collected via quiz email gate. Respects marketing consent.
-- ============================================================
CREATE TABLE IF NOT EXISTS email_subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT        NOT NULL,
  marketing_ok    BOOLEAN     NOT NULL DEFAULT false,
  source          TEXT        NOT NULL DEFAULT 'quiz',
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  CONSTRAINT email_subscribers_email_unique UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS email_subscribers_email_idx ON email_subscribers (email);

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "email_subscribers_insert" ON email_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only service role can read/update subscriber records
CREATE POLICY "email_subscribers_service_read" ON email_subscribers
  FOR SELECT TO service_role
  USING (true);

CREATE POLICY "email_subscribers_service_update" ON email_subscribers
  FOR UPDATE TO service_role
  USING (true);

-- ============================================================
-- quiz_responses
-- Raw answers from a single quiz session.
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      TEXT        NOT NULL,
  email           TEXT,
  answers         JSONB       NOT NULL DEFAULT '{}',
  taste_vector    JSONB,
  sig_notes       TEXT[],
  known_names     TEXT[],
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_responses_session_idx   ON quiz_responses (session_id);
CREATE INDEX IF NOT EXISTS quiz_responses_email_idx     ON quiz_responses (email);
CREATE INDEX IF NOT EXISTS quiz_responses_created_idx   ON quiz_responses (created_at DESC);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_responses_insert" ON quiz_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "quiz_responses_service_read" ON quiz_responses
  FOR SELECT TO service_role
  USING (true);

-- ============================================================
-- quiz_results
-- AI-generated recommendations returned by /api/quiz.
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_results (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_response_id UUID        REFERENCES quiz_responses(id) ON DELETE SET NULL,
  session_id       TEXT        NOT NULL,
  recommendations  JSONB       NOT NULL DEFAULT '[]',
  model            TEXT,
  prompt_tokens    INT,
  completion_tokens INT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_results_session_idx    ON quiz_results (session_id);
CREATE INDEX IF NOT EXISTS quiz_results_response_idx   ON quiz_results (quiz_response_id);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_results_insert" ON quiz_results
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "quiz_results_service_read" ON quiz_results
  FOR SELECT TO service_role
  USING (true);

-- ============================================================
-- perfumers
-- Master list of perfumers / nose references.
-- ============================================================
CREATE TABLE IF NOT EXISTS perfumers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  bio         TEXT,
  nationality TEXT,
  houses      TEXT[],
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT perfumers_name_unique UNIQUE (name)
);

ALTER TABLE perfumers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "perfumers_public_read" ON perfumers
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "perfumers_service_write" ON perfumers
  FOR ALL TO service_role
  USING (true);

-- ============================================================
-- ALTER TABLE fragrances
-- Add rich-content columns for the /fragrance/[slug] page.
-- All columns are nullable — existing rows are unaffected.
-- ============================================================

-- Slug (URL-safe kebab-case English name)
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Brand / editorial story paragraph
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS story TEXT;

-- Perfumer reference
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS perfumer_id UUID REFERENCES perfumers(id) ON DELETE SET NULL;

-- Notes pyramid (arrays of note names)
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS notes_top    TEXT[] DEFAULT '{}';
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS notes_heart  TEXT[] DEFAULT '{}';
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS notes_base   TEXT[] DEFAULT '{}';

-- Performance ratings (0–10)
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS sillage    SMALLINT CHECK (sillage    BETWEEN 0 AND 10);
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS longevity  SMALLINT CHECK (longevity  BETWEEN 0 AND 10);
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS projection SMALLINT CHECK (projection BETWEEN 0 AND 10);

-- Usage context arrays
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS occasions TEXT[] DEFAULT '{}';
ALTER TABLE fragrances
  ADD COLUMN IF NOT EXISTS seasons   TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS fragrances_slug_idx       ON fragrances (slug);
CREATE INDEX IF NOT EXISTS fragrances_perfumer_idx   ON fragrances (perfumer_id);

-- ============================================================
-- fragrance_prices
-- Retailer price rows for the price comparison table.
-- ============================================================
CREATE TABLE IF NOT EXISTS fragrance_prices (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fragrance_id   INT         NOT NULL REFERENCES fragrances(id) ON DELETE CASCADE,
  retailer_name  TEXT        NOT NULL,
  retailer_url   TEXT        NOT NULL,
  price_ils      NUMERIC(8,2),
  size_ml        SMALLINT,
  in_stock       BOOLEAN     NOT NULL DEFAULT true,
  is_affiliate   BOOLEAN     NOT NULL DEFAULT false,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fragrance_prices_unique UNIQUE (fragrance_id, retailer_name, size_ml)
);

CREATE INDEX IF NOT EXISTS fragrance_prices_frag_idx ON fragrance_prices (fragrance_id);

ALTER TABLE fragrance_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "fragrance_prices_public_read" ON fragrance_prices
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "fragrance_prices_service_write" ON fragrance_prices
  FOR ALL TO service_role
  USING (true);

-- ============================================================
-- fragrance_reviews
-- Community reviews (future feature, schema ready now).
-- ============================================================
CREATE TABLE IF NOT EXISTS fragrance_reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fragrance_id  INT         NOT NULL REFERENCES fragrances(id) ON DELETE CASCADE,
  user_id       UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  rating        SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body          TEXT,
  longevity     SMALLINT    CHECK (longevity  BETWEEN 0 AND 10),
  sillage       SMALLINT    CHECK (sillage    BETWEEN 0 AND 10),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS fragrance_reviews_frag_idx ON fragrance_reviews (fragrance_id);
CREATE INDEX IF NOT EXISTS fragrance_reviews_user_idx ON fragrance_reviews (user_id);

ALTER TABLE fragrance_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "fragrance_reviews_public_read" ON fragrance_reviews
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "fragrance_reviews_auth_insert" ON fragrance_reviews
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "fragrance_reviews_auth_update" ON fragrance_reviews
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "fragrance_reviews_auth_delete" ON fragrance_reviews
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- Helper: auto-update updated_at on modified rows
-- ============================================================
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER cookie_consent_updated_at
  BEFORE UPDATE ON cookie_consent
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER fragrance_prices_updated_at
  BEFORE UPDATE ON fragrance_prices
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER fragrance_reviews_updated_at
  BEFORE UPDATE ON fragrance_reviews
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
