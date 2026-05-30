-- Quiz schema migration
-- Run once against your Supabase project

CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NULL,
  email TEXT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_response_id UUID REFERENCES quiz_responses(id),
  profile_summary TEXT,
  dna_bars JSONB,
  recommendations JSONB,
  ai_model TEXT DEFAULT 'claude-sonnet-4',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Full-text search index on fragrances (if table exists)
CREATE INDEX IF NOT EXISTS idx_fragrances_search ON fragrances
  USING gin(to_tsvector('simple', name || ' ' || brand))
  WHERE name IS NOT NULL AND brand IS NOT NULL;
