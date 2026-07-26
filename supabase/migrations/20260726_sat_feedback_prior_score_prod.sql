-- Ensure previous_sat_score_and_prep column exists on sat_exam_module_feedback.
-- This column was added in 20260725_sat_feedback_prior_score.sql but may not have
-- been applied to all environments. IF NOT EXISTS makes this a safe no-op replay.
ALTER TABLE public.sat_exam_module_feedback
  ADD COLUMN IF NOT EXISTS previous_sat_score_and_prep text;

-- Reload the PostgREST schema cache so the column is immediately visible
-- without requiring a service restart.
NOTIFY pgrst, 'reload schema';
