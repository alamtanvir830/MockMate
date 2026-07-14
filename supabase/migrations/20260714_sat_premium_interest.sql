-- Add SAT Premium interest fields to feedback table
ALTER TABLE public.sat_exam_module_feedback
ADD COLUMN IF NOT EXISTS interested_in_sat_premium boolean,
ADD COLUMN IF NOT EXISTS sat_premium_interest_answer text;
