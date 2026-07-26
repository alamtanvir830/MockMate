ALTER TABLE public.sat_exam_module_feedback
  ADD COLUMN IF NOT EXISTS previous_sat_score_and_prep text;
