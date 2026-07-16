-- Academy curriculum v2: add attempt metadata, content reports table

-- ── New columns on sat_rw_academy_attempts ────────────────────────────────────
-- practice_mode: diagnostic | guided_practice | targeted_drill |
--   cumulative_review | recognition_check | question_type_recognition |
--   mixed_practice | capstone | mastery_check | vocabulary | transition_trainer
alter table public.sat_rw_academy_attempts
  add column if not exists practice_mode text,
  add column if not exists domain_slug text,
  add column if not exists question_type_identified text,
  add column if not exists question_type_correct boolean,
  add column if not exists hint_count integer not null default 0,
  add column if not exists confidence integer,
  add column if not exists timed boolean not null default false,
  add column if not exists error_category text,
  add column if not exists content_version integer not null default 1;

-- Add domain index for cross-skill analytics
create index if not exists sat_rw_academy_attempts_domain_idx
  on public.sat_rw_academy_attempts(user_id, domain_slug);

create index if not exists sat_rw_academy_attempts_mode_idx
  on public.sat_rw_academy_attempts(user_id, practice_mode);

-- ── Content issue reports ─────────────────────────────────────────────────────
create table if not exists public.sat_rw_content_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text,
  content_type text not null,   -- 'drill_question' | 'guided_example' | 'lesson' | 'vocabulary' | 'capstone'
  content_id text not null,
  content_version integer not null default 1,
  route text,
  issue_category text not null, -- 'wrong_answer' | 'unclear_wording' | 'explanation_problem' | 'typo' | 'broken_display' | 'formatting' | 'other'
  description text not null,
  status text not null default 'open', -- 'open' | 'reviewing' | 'confirmed' | 'corrected' | 'rejected' | 'archived'
  admin_notes text,
  resolution_summary text,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sat_rw_content_reports_user_idx
  on public.sat_rw_content_reports(user_id, created_at desc);

create index if not exists sat_rw_content_reports_status_idx
  on public.sat_rw_content_reports(status, created_at desc);

alter table public.sat_rw_content_reports enable row level security;

-- Users can insert and read their own reports
create policy "users insert own content reports"
  on public.sat_rw_content_reports for insert
  to authenticated with check (auth.uid() = user_id);

create policy "users read own content reports"
  on public.sat_rw_content_reports for select
  to authenticated using (auth.uid() = user_id);

-- Admin reads all reports (enforced server-side via service role)
-- No update/delete for regular users — only service role can change status

-- ── Vocabulary progress table ─────────────────────────────────────────────────
-- Add if not already created from a prior session
create table if not exists public.sat_rw_vocabulary_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id text not null,
  status text not null default 'new',  -- 'new' | 'learning' | 'known'
  correct_count integer not null default 0,
  attempt_count integer not null default 0,
  last_seen_at timestamptz,
  next_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sat_rw_vocab_progress_unique unique (user_id, word_id)
);

create index if not exists sat_rw_vocabulary_progress_user_idx
  on public.sat_rw_vocabulary_progress(user_id, next_review_at);

alter table public.sat_rw_vocabulary_progress enable row level security;

create policy "users manage own vocabulary progress"
  on public.sat_rw_vocabulary_progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Academy capstone attempts ─────────────────────────────────────────────────
-- Reuses sat_rw_academy_attempts with source_type = 'capstone' and
-- source_id = 'capstone-1' | 'capstone-2' | 'capstone-3' | 'mastery-check'
-- No separate table needed; practice_mode column distinguishes capstone from drill.
