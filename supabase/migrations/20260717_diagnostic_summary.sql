-- Diagnostic summary table for SAT R&W Academy
-- Each row represents one completed diagnostic attempt.
-- Individual question responses are in sat_rw_academy_attempts (source_type = 'academy_diagnostic').

create table if not exists public.sat_rw_diagnostic_attempts (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  user_email              text,
  user_name               text,
  -- client_token is set by the completing request for idempotency
  client_token            text unique,
  status                  text not null default 'completed'
                            check (status in ('completed')),
  diagnostic_version      integer not null default 1,
  total_questions         integer not null,
  answered_questions      integer not null default 0
                            check (answered_questions >= 0),
  correct_count           integer not null default 0
                            check (correct_count >= 0),
  incorrect_count         integer not null default 0
                            check (incorrect_count >= 0),
  omitted_count           integer not null default 0
                            check (omitted_count >= 0),
  accuracy_percentage     numeric(5,2) not null default 0
                            check (accuracy_percentage >= 0 and accuracy_percentage <= 100),
  -- jsonb: { [domain_slug]: { correct: number, total: number, pct: number, title: string } }
  domain_results          jsonb not null default '{}',
  -- jsonb: { [skill_slug]: { correct: number, total: number, pct: number, title: string, section: string } }
  skill_results           jsonb not null default '{}',
  strongest_skill_slugs   text[] not null default '{}',
  weakest_skill_slugs     text[] not null default '{}',
  recommended_skill_slug  text,
  recommended_lesson_slug text,
  completed_at            timestamptz not null default now(),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- Indexes for fast latest-diagnostic lookup
create index if not exists sat_rw_diagnostic_attempts_user_completed_idx
  on public.sat_rw_diagnostic_attempts(user_id, completed_at desc);

create index if not exists sat_rw_diagnostic_attempts_user_status_idx
  on public.sat_rw_diagnostic_attempts(user_id, status);

-- Row Level Security
alter table public.sat_rw_diagnostic_attempts enable row level security;

create policy "users insert own diagnostic attempts"
  on public.sat_rw_diagnostic_attempts for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users read own diagnostic attempts"
  on public.sat_rw_diagnostic_attempts for select
  to authenticated
  using (auth.uid() = user_id);
