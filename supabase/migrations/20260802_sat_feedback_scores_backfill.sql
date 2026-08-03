-- Backfill SAT scaled scores on existing module feedback rows.
-- total_score is a generated column and updates automatically.
UPDATE public.sat_exam_module_feedback
SET
  rw_scaled_score   = a.rw_score,
  math_scaled_score = a.math_score
FROM public.standardized_exam_attempts AS a
WHERE sat_exam_module_feedback.local_attempt_id = a.local_attempt_id
  AND sat_exam_module_feedback.user_id          = a.user_id
  AND (rw_scaled_score IS NULL OR math_scaled_score IS NULL);
