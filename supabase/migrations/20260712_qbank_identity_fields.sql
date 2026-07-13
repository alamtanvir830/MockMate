-- Add user identity fields to question_bank_practice_sets
alter table public.question_bank_practice_sets
  add column if not exists user_name  text,
  add column if not exists user_email text;

-- Index for admin lookups by email
create index if not exists idx_qb_practice_sets_user_email
  on public.question_bank_practice_sets (user_email);

-- Admin view: identity columns first for easy reading in Supabase Table Editor
create or replace view public.question_bank_practice_sets_admin_view as
select
  user_name,
  user_email,
  id,
  user_id,
  test,
  section,
  mode,
  correct_count,
  incorrect_count,
  count,
  total_time_sec,
  completed_at,
  created_at,
  domains,
  skills,
  difficulties,
  question_ids
from public.question_bank_practice_sets;
