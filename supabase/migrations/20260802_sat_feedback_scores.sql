-- Add student's SAT scaled scores to the module feedback table
ALTER TABLE public.sat_exam_module_feedback
  ADD COLUMN IF NOT EXISTS rw_scaled_score   integer,
  ADD COLUMN IF NOT EXISTS math_scaled_score  integer,
  ADD COLUMN IF NOT EXISTS total_score        integer
    GENERATED ALWAYS AS (rw_scaled_score + math_scaled_score) STORED;
