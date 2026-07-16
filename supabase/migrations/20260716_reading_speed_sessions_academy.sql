-- Enhance reading_speed_sessions with Academy Passage mode columns

alter table public.reading_speed_sessions
  add column if not exists mode text not null default 'free',
  add column if not exists academy_passage_id text,
  add column if not exists comprehension_correct integer,
  add column if not exists comprehension_total integer,
  add column if not exists comprehension_accuracy numeric(5,2),
  add column if not exists effective_wpm integer,
  add column if not exists self_reported_comprehension integer;

-- Index for looking up academy passage sessions
create index if not exists reading_speed_sessions_passage_idx
  on public.reading_speed_sessions(user_id, academy_passage_id)
  where academy_passage_id is not null;
