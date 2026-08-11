-- MCAT in-progress attempts table
-- Pattern mirrors sat_in_progress_attempts (20260722 migration)
-- Stores timer deadline (section_deadline_at) for wall-clock recovery on tab focus
--
-- DO NOT APPLY TO PRODUCTION without owner review.
-- Branch: feat/mcat-forms-1-5-qbank-700

CREATE TABLE IF NOT EXISTS public.mcat_in_progress_attempts (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  form_number           int         NOT NULL,
  local_attempt_id      text        NOT NULL,
  answers               jsonb       NOT NULL DEFAULT '{}',
  bookmarks             jsonb       NOT NULL DEFAULT '[]',
  current_section_idx   int,
  current_question_idx  int,
  section_deadline_at   timestamptz,          -- wall-clock deadline for the active section
  section_deadlines     jsonb       NOT NULL DEFAULT '{}',  -- sectionIdx → ISO-8601 deadline (set when section starts)
  content_version       text        NOT NULL DEFAULT 'v1',
  started_at            timestamptz NOT NULL DEFAULT now(),
  last_saved_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, form_number)
);

ALTER TABLE public.mcat_in_progress_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY mcat_in_progress_select ON public.mcat_in_progress_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY mcat_in_progress_insert ON public.mcat_in_progress_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY mcat_in_progress_update ON public.mcat_in_progress_attempts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY mcat_in_progress_delete ON public.mcat_in_progress_attempts
  FOR DELETE USING (auth.uid() = user_id);
