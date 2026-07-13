-- SAT module feedback collected before final exam submission
create table public.sat_exam_module_feedback (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  user_email              text,
  user_name               text,
  form_number             integer not null,
  local_attempt_id        text,
  rw_module_1_feedback    text not null,
  rw_module_2_feedback    text not null,
  math_module_1_feedback  text not null,
  math_module_2_feedback  text not null,
  rw_module_2_path        text,
  math_module_2_path      text,
  rw_module_1_char_count  integer,
  rw_module_2_char_count  integer,
  math_module_1_char_count integer,
  math_module_2_char_count integer,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  metadata                jsonb default '{}'::jsonb,
  constraint rw_module_1_min_length    check (char_length(trim(rw_module_1_feedback))   >= 50),
  constraint rw_module_2_min_length    check (char_length(trim(rw_module_2_feedback))   >= 50),
  constraint math_module_1_min_length  check (char_length(trim(math_module_1_feedback)) >= 50),
  constraint math_module_2_min_length  check (char_length(trim(math_module_2_feedback)) >= 50)
);

alter table public.sat_exam_module_feedback enable row level security;

create policy "Users can insert their own feedback"
  on public.sat_exam_module_feedback for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can select their own feedback"
  on public.sat_exam_module_feedback for select
  to authenticated
  using (auth.uid() = user_id);
