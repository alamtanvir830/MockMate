CREATE TABLE IF NOT EXISTS public.sat_in_progress_attempts (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  form_number          int         NOT NULL,
  local_attempt_id     text        NOT NULL,
  answers              jsonb       NOT NULL DEFAULT '{}',
  bookmarks            jsonb       NOT NULL DEFAULT '[]',
  strikeouts           jsonb       NOT NULL DEFAULT '{}',
  rw_m2_type           text        NOT NULL DEFAULT 'easy',
  math_m2_type         text        NOT NULL DEFAULT 'easy',
  current_phase_tag    text,
  current_section      text,
  current_module       text,
  current_question_idx int,
  module_deadline_at   timestamptz,
  started_at           timestamptz NOT NULL DEFAULT now(),
  last_saved_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, form_number)
);

ALTER TABLE public.sat_in_progress_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY sat_in_progress_select ON public.sat_in_progress_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY sat_in_progress_insert ON public.sat_in_progress_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY sat_in_progress_update ON public.sat_in_progress_attempts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY sat_in_progress_delete ON public.sat_in_progress_attempts
  FOR DELETE USING (auth.uid() = user_id);
