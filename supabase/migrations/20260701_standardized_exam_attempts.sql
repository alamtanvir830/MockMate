-- ─────────────────────────────────────────────────────────────────────────────
-- standardized_exam_attempts
-- One row per completed SAT practice form attempt (Form 1, 2, 3).
-- local_attempt_id mirrors the localStorage UUID so the client can UPDATE
-- the row later when AI feedback arrives.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.standardized_exam_attempts (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  local_attempt_id        text        NOT NULL UNIQUE,
  user_id                 uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_type               text        NOT NULL,          -- 'SAT'
  form_number             int         NOT NULL,          -- 1 | 2 | 3
  exam_title              text        NOT NULL,
  attempt_number          int         NOT NULL,          -- per user per form
  total_score             int,
  rw_score                int,
  math_score              int,
  rw_correct              int,
  rw_total                int,
  math_correct            int,
  math_total              int,
  rw_m2_type              text,                          -- 'easy' | 'hard'
  math_m2_type            text,                          -- 'easy' | 'hard'
  module_breakdown        jsonb,
  weak_skills             jsonb,
  submitted_answers       jsonb,
  practice_path_sets      jsonb,
  ai_feedback             jsonb,
  completed_at            timestamptz NOT NULL,
  created_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.standardized_exam_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_attempts"
  ON public.standardized_exam_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own_attempts"
  ON public.standardized_exam_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_attempts"
  ON public.standardized_exam_attempts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_sea_user_form
  ON public.standardized_exam_attempts (user_id, exam_type, form_number);


-- ─────────────────────────────────────────────────────────────────────────────
-- standardized_exam_responses
-- One row per question per attempt.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.standardized_exam_responses (
  id                              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  standardized_exam_attempt_id    uuid        NOT NULL REFERENCES public.standardized_exam_attempts(id) ON DELETE CASCADE,
  local_attempt_id                text        NOT NULL,
  user_id                         uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_type                       text        NOT NULL,
  form_number                     int         NOT NULL,
  module_id                       text        NOT NULL,
  module_name                     text,
  question_id                     text        NOT NULL,
  question_number                 int,
  domain                          text,
  skill                           text,
  difficulty                      text,
  selected_answer                 text,
  correct_answer                  text,
  is_correct                      boolean     NOT NULL,
  created_at                      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.standardized_exam_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_responses"
  ON public.standardized_exam_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own_responses"
  ON public.standardized_exam_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ser_attempt
  ON public.standardized_exam_responses (standardized_exam_attempt_id);

CREATE INDEX IF NOT EXISTS idx_ser_user
  ON public.standardized_exam_responses (user_id);
