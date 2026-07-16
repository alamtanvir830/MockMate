-- Lesson progress
create table if not exists public.sat_rw_academy_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text,
  user_name text,
  skill_slug text not null,
  lesson_slug text not null,
  status text not null default 'not_started',
  completed_at timestamptz,
  last_opened_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sat_rw_lesson_progress_unique unique (user_id, lesson_slug)
);

create index on public.sat_rw_academy_lesson_progress(user_id, skill_slug);

alter table public.sat_rw_academy_lesson_progress enable row level security;

create policy "users can manage own lesson progress"
  on public.sat_rw_academy_lesson_progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Attempts
create table if not exists public.sat_rw_academy_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text,
  user_name text,
  source_type text not null,
  source_id text not null,
  question_id text not null,
  skill_slug text not null,
  subskill_slug text,
  difficulty text not null,
  selected_answer text,
  correct_answer text not null,
  is_correct boolean not null,
  marked_difficult boolean not null default false,
  response_time_seconds integer,
  created_at timestamptz not null default now()
);

create index on public.sat_rw_academy_attempts(user_id, skill_slug);
create index on public.sat_rw_academy_attempts(user_id, created_at desc);

alter table public.sat_rw_academy_attempts enable row level security;

create policy "users can insert own attempts"
  on public.sat_rw_academy_attempts for insert
  to authenticated with check (auth.uid() = user_id);

create policy "users can read own attempts"
  on public.sat_rw_academy_attempts for select
  to authenticated using (auth.uid() = user_id);

-- Review queue
create table if not exists public.sat_rw_review_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  source_type text not null,
  skill_slug text not null,
  review_stage integer not null default 0,
  next_review_at timestamptz not null default now(),
  last_result_correct boolean,
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sat_rw_review_queue_unique unique (user_id, question_id, source_type)
);

create index on public.sat_rw_review_queue(user_id, next_review_at)
  where next_review_at <= now() + interval '1 day';

alter table public.sat_rw_review_queue enable row level security;

create policy "users can manage own review queue"
  on public.sat_rw_review_queue
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
