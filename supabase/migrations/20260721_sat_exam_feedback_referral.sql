-- Add friend-referral columns to sat_exam_module_feedback
-- referred_by_friend: whether the user was referred by a friend
-- referrer_full_name: the friend's name (required when referred_by_friend is true)
-- referrer_email: the friend's email address (optional)

ALTER TABLE public.sat_exam_module_feedback
  ADD COLUMN IF NOT EXISTS referred_by_friend  boolean,
  ADD COLUMN IF NOT EXISTS referrer_full_name  text,
  ADD COLUMN IF NOT EXISTS referrer_email      text;
