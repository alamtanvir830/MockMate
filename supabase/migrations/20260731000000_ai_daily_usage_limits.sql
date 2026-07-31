-- ──────────────────────────────────────────────────────────────────────────────
-- Migration: AI daily usage limits
--
-- Creates a per-user per-feature per-day usage counter table and an atomic
-- SECURITY DEFINER RPC that increments the counter and checks the limit.
--
-- Design:
--   • No RLS client policies — all access via SECURITY DEFINER RPC only.
--   • auth.uid() is read inside the function; callers cannot supply a user ID.
--   • Atomic upsert with ON CONFLICT prevents double-counting under concurrency.
--   • Timezone: America/New_York (handles EDT/EST via IANA DST database).
--   • Limits: mcat_feedback=25/day, other_ai_feedback=50/day.
-- ──────────────────────────────────────────────────────────────────────────────

-- ── 1. Table ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ai_daily_usage (
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature       text        NOT NULL CHECK (feature IN ('mcat_feedback', 'other_ai_feedback')),
  usage_date    date        NOT NULL,
  request_count integer     NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ai_daily_usage_pkey PRIMARY KEY (user_id, feature, usage_date)
);

COMMENT ON TABLE public.ai_daily_usage IS
  'Tracks per-user per-feature daily AI request counts. '
  'All access is through the consume_ai_daily_quota() SECURITY DEFINER RPC. '
  'No client-side reads or writes are permitted.';

COMMENT ON COLUMN public.ai_daily_usage.feature IS
  'Quota bucket: mcat_feedback (limit 25) or other_ai_feedback (limit 50).';

-- ── 2. Index ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS ai_daily_usage_lookup_idx
  ON public.ai_daily_usage (user_id, feature, usage_date);

-- ── 3. Row-Level Security — no client policies ────────────────────────────────
--
-- RLS is enabled so the table is protected by default.
-- No SELECT/INSERT/UPDATE/DELETE policies are created — all access goes
-- through the consume_ai_daily_quota() SECURITY DEFINER function below.

ALTER TABLE public.ai_daily_usage ENABLE ROW LEVEL SECURITY;

-- Belt-and-suspenders: revoke direct table access from browser roles.
REVOKE ALL ON public.ai_daily_usage FROM anon, authenticated;

-- ── 4. Atomic quota RPC ───────────────────────────────────────────────────────
--
-- Call: SELECT consume_ai_daily_quota('mcat_feedback');
--
-- Returns JSONB:
--   { allowed, limit_count, used_count, remaining_count, reset_at }
--
-- Security properties:
--   • SECURITY DEFINER — runs as the table owner, bypassing RLS.
--   • SET search_path = public — prevents search_path injection.
--   • auth.uid() — user identity is read from the server session token,
--     never from a caller-supplied argument.
--   • Atomic upsert — ON CONFLICT + CASE prevents double-counting even
--     under concurrent requests from the same user.

CREATE OR REPLACE FUNCTION public.consume_ai_daily_quota(p_feature text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id     uuid;
  v_today       date;
  v_limit       integer;
  v_used        integer;
  v_remaining   integer;
  v_reset_at    timestamptz;
  v_allowed     boolean;
BEGIN
  -- Require authenticated user — never accept a caller-supplied user ID.
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'unauthenticated';
  END IF;

  -- Validate feature key.
  IF p_feature NOT IN ('mcat_feedback', 'other_ai_feedback') THEN
    RAISE EXCEPTION 'invalid_feature';
  END IF;

  -- Determine daily limit.
  IF p_feature = 'mcat_feedback' THEN
    v_limit := 25;
  ELSE
    v_limit := 50;
  END IF;

  -- Today's date in America/New_York (handles EST/EDT automatically).
  v_today := (now() AT TIME ZONE 'America/New_York')::date;

  -- Next midnight Eastern — timezone() with a named IANA zone handles DST.
  v_reset_at := timezone('America/New_York', (v_today + 1)::timestamp);

  -- Atomic upsert: insert the first request of the day, or increment the
  -- counter — but only when still below the limit. This prevents
  -- double-counting under concurrent requests.
  INSERT INTO public.ai_daily_usage (user_id, feature, usage_date, request_count, updated_at)
  VALUES (v_user_id, p_feature, v_today, 1, now())
  ON CONFLICT (user_id, feature, usage_date) DO UPDATE
    SET request_count = CASE
          WHEN ai_daily_usage.request_count < v_limit
          THEN ai_daily_usage.request_count + 1
          ELSE ai_daily_usage.request_count
        END,
        updated_at = now()
  RETURNING request_count INTO v_used;

  v_allowed   := v_used <= v_limit;
  v_remaining := GREATEST(0, v_limit - v_used);

  RETURN jsonb_build_object(
    'allowed',         v_allowed,
    'limit_count',     v_limit,
    'used_count',      v_used,
    'remaining_count', v_remaining,
    'reset_at',        v_reset_at
  );
END;
$$;

-- ── 5. Grant execute to authenticated users only ──────────────────────────────

REVOKE EXECUTE ON FUNCTION public.consume_ai_daily_quota(text) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.consume_ai_daily_quota(text) TO authenticated;
