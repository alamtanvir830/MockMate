-- ── Lesson video metadata ─────────────────────────────────────────────────────

create table if not exists public.sat_rw_lesson_videos (
  id                          uuid primary key default gen_random_uuid(),
  video_key                   text not null unique,
  lesson_slug                 text not null,
  skill_slug                  text not null,
  subskill_slug               text,
  title                       text not null,
  description                 text,
  storage_path                text,
  captions_storage_path       text,
  thumbnail_storage_path      text,
  transcript                  text not null default '',
  duration_seconds            integer,
  script_version              integer not null default 1,
  video_version               integer not null default 1,
  production_status           text not null default 'script_draft',
  narration_provider          text,
  narration_voice_id          text,
  original_content_confirmed  boolean not null default false,
  accuracy_reviewed           boolean not null default false,
  published_at                timestamptz,
  archived_at                 timestamptz,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  constraint sat_rw_lesson_videos_status_check check (
    production_status in (
      'script_draft', 'script_reviewed', 'narration_ready',
      'rendered', 'accuracy_review', 'published', 'archived'
    )
  )
);

create index on public.sat_rw_lesson_videos(lesson_slug);
create index on public.sat_rw_lesson_videos(skill_slug, production_status);

alter table public.sat_rw_lesson_videos enable row level security;

-- Students may only read published, confirmed, reviewed videos
create policy "students read published videos"
  on public.sat_rw_lesson_videos for select
  to authenticated
  using (
    production_status = 'published'
    and original_content_confirmed = true
    and accuracy_reviewed = true
    and storage_path is not null
    and archived_at is null
  );

-- Admin full access (server-side routes enforce the email check;
-- RLS uses a separate admin policy via service role)
-- Normal updates are done via service role in admin API routes only.


-- ── Video progress ─────────────────────────────────────────────────────────────

create table if not exists public.sat_rw_video_progress (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  user_email              text,
  user_name               text,
  video_id                uuid not null references public.sat_rw_lesson_videos(id) on delete cascade,
  last_position_seconds   numeric not null default 0,
  highest_position_seconds numeric not null default 0,
  percent_watched         numeric not null default 0,
  playback_rate           numeric not null default 1,
  completed               boolean not null default false,
  completed_at            timestamptz,
  last_watched_at         timestamptz not null default now(),
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  constraint sat_rw_video_progress_unique unique (user_id, video_id),
  constraint sat_rw_video_progress_percent_check check (percent_watched between 0 and 100)
);

create index on public.sat_rw_video_progress(user_id, video_id);
create index on public.sat_rw_video_progress(video_id);

alter table public.sat_rw_video_progress enable row level security;

create policy "users manage own video progress"
  on public.sat_rw_video_progress for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
