-- Run in Supabase SQL editor.
-- Tables backing /admin overlays for fragrance edits.
--
-- Strategy: the public site reads the static catalog from src/data/fragrances.ts.
-- The admin panel can override / add / soft-delete entries via this table.
-- (To publish admin changes to the public site, regenerate fragrances.ts.)

create table if not exists public.fragrance_edits (
  id            bigserial primary key,
  base_id       integer,                -- references the static catalog id; null = brand-new entry
  deleted       boolean not null default false,
  data          jsonb,                  -- full Fragrance object (when not deleted)
  updated_at    timestamptz not null default now()
);

create index if not exists fragrance_edits_base_id_idx on public.fragrance_edits(base_id);

-- ── Sample requests already exists; only ensure the status column ───────────
alter table public.sample_requests
  add column if not exists status text not null default 'pending';
-- valid values: 'pending' | 'handled' | 'rejected'
