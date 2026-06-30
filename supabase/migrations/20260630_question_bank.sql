-- Question Bank: practice sets and per-question responses
-- Run this in the Supabase SQL editor.

-- ─── question_bank_practice_sets ─────────────────────────────────────────────
-- One row per completed practice set session.

create table if not exists public.question_bank_practice_sets (
  id            text        primary key,           -- client-generated UUID (matches localStorage id)
  user_id       uuid        not null references auth.users(id) on delete cascade,

  -- Practice set configuration (what was requested)
  test          text        not null default 'SAT', -- future-proofing for SHSAT / MCAT
  section       text,                               -- 'reading-writing' | 'math' | null (both)
  mode          text        not null default 'browse', -- 'browse' | 'personalized'
  question_ids  text[]      not null,              -- ordered list of question IDs shown
  count         int         not null,
  domains       text[],
  skills        text[],
  difficulties  text[],

  -- Aggregate results (denormalised for fast dashboard queries)
  correct_count   int     not null default 0,
  incorrect_count int     not null default 0,
  total_time_sec  int     not null default 0,      -- sum of per-question times

  completed_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

alter table public.question_bank_practice_sets enable row level security;

-- Users can only read/write their own rows
create policy "qb_practice_sets_select" on public.question_bank_practice_sets
  for select using (auth.uid() = user_id);

create policy "qb_practice_sets_insert" on public.question_bank_practice_sets
  for insert with check (auth.uid() = user_id);

create policy "qb_practice_sets_delete" on public.question_bank_practice_sets
  for delete using (auth.uid() = user_id);

-- Index for "load all results for this user, newest first"
create index if not exists qb_practice_sets_user_completed
  on public.question_bank_practice_sets (user_id, completed_at desc);


-- ─── question_bank_responses ──────────────────────────────────────────────────
-- One row per question answered within a practice set.

create table if not exists public.question_bank_responses (
  id              bigint      generated always as identity primary key,
  practice_set_id text        not null references public.question_bank_practice_sets(id) on delete cascade,
  user_id         uuid        not null references auth.users(id) on delete cascade,

  question_id     text        not null,   -- e.g. 'rw-cs-wic-001'
  test            text        not null default 'SAT',
  section         text,                   -- 'reading-writing' | 'math'
  domain          text,
  skill           text,
  difficulty      text,                   -- 'easy' | 'medium' | 'hard'

  user_answer     text,                   -- null if skipped
  correct_answer  text        not null,
  is_correct      boolean     not null,
  time_spent_sec  int         not null default 0,

  answered_at     timestamptz not null default now()
);

alter table public.question_bank_responses enable row level security;

create policy "qb_responses_select" on public.question_bank_responses
  for select using (auth.uid() = user_id);

create policy "qb_responses_insert" on public.question_bank_responses
  for insert with check (auth.uid() = user_id);

create policy "qb_responses_delete" on public.question_bank_responses
  for delete using (auth.uid() = user_id);

-- Index for per-user skill accuracy rollups
create index if not exists qb_responses_user_skill
  on public.question_bank_responses (user_id, domain, skill);

-- Index for joining to a specific practice set
create index if not exists qb_responses_practice_set
  on public.question_bank_responses (practice_set_id);
