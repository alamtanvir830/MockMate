create table if not exists public.reading_speed_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text,
  user_name text,
  source_word_count integer not null,
  completed_word_count integer not null,
  completion_percentage numeric(5,2) not null,
  starting_wpm integer not null,
  ending_wpm integer not null,
  highest_wpm integer not null,
  chunk_size integer not null,
  duration_seconds integer not null,
  pause_count integer not null default 0,
  completed boolean not null default false,
  qualifies_for_daily_practice boolean not null default false,
  client_local_date date,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index on public.reading_speed_sessions(user_id, created_at desc);
create index on public.reading_speed_sessions(user_id, client_local_date) where qualifies_for_daily_practice = true;

alter table public.reading_speed_sessions enable row level security;

create policy "users can insert own reading sessions"
  on public.reading_speed_sessions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users can read own reading sessions"
  on public.reading_speed_sessions for select
  to authenticated
  using (auth.uid() = user_id);
