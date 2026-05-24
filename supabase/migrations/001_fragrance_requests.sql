-- ─────────────────────────────────────────────────────────────────
-- fragrance_requests
-- Users submit fragrance names they couldn't find in the catalog.
-- Admins review and add approved fragrances to the main data file.
-- ─────────────────────────────────────────────────────────────────

create table if not exists fragrance_requests (
  id          uuid        primary key default gen_random_uuid(),
  user_id     text,                              -- Clerk user ID (null = anonymous)
  query_text  text        not null,
  created_at  timestamptz not null default now(),
  status      text        not null default 'pending'
              check (status in ('pending', 'reviewed', 'added', 'rejected'))
);

-- Fast lookup per user
create index if not exists fragrance_requests_user_id_idx
  on fragrance_requests (user_id);

-- Admin review queue: pending first, newest first within each status
create index if not exists fragrance_requests_status_created_idx
  on fragrance_requests (status, created_at desc);

-- ── Row-Level Security ─────────────────────────────────────────────
alter table fragrance_requests enable row level security;

-- Anyone can INSERT (anonymous + authenticated)
create policy "Anyone can request a fragrance"
  on fragrance_requests for insert
  with check (true);

-- Users can read their own requests (matched by Clerk user_id passed in JWT sub)
-- Admins read everything via service-role key (bypasses RLS)
create policy "Users read own requests"
  on fragrance_requests for select
  using (user_id = auth.uid()::text or user_id is null);

comment on table fragrance_requests is
  'Fragrance names requested by users that are not yet in the catalog. '
  'Reviewed manually by SCENTORY team and promoted to added/rejected.';
