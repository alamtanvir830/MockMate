-- Adaptive v2 SAT R&W diagnostic: record which Module 2 branch a student took and
-- their Module 1 score. Forward-only; safe to run on an existing table.

ALTER TABLE public.sat_rw_diagnostic_attempts
  ADD COLUMN IF NOT EXISTS m2_branch   text CHECK (m2_branch IN ('easy', 'hard')),
  ADD COLUMN IF NOT EXISTS m1_correct  integer,
  ADD COLUMN IF NOT EXISTS m1_total    integer;
