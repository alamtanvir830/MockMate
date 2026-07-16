-- Remove academy video system tables and policies (safe IF EXISTS — works
-- whether or not 20260716_academy_videos.sql was ever applied).

-- Drop video progress first (has FK to sat_rw_lesson_videos)
drop table if exists public.sat_rw_video_progress cascade;

-- Drop lesson video metadata
drop table if exists public.sat_rw_lesson_videos cascade;
