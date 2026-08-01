-- sat_premium_trial_claims
-- ─────────────────────────────────────────────────────────────────────────────
-- One row per (user_id, offer_version). The UNIQUE (user_id, offer_version)
-- constraint is the authoritative guard against double-claiming — it is
-- enforced at the DB layer so no application-level race condition can produce
-- two trials for the same user under the same offer version. Status transitions
-- are irreversible: once a row reaches 'converted' or 'canceled' its status
-- cannot be reset to 'pending'.
--
-- The row is inserted (status='pending') BEFORE the Stripe Checkout Session is
-- created, so concurrent requests for the same user hit the unique constraint
-- and only one succeeds. After the session is created, stripe_checkout_session_id
-- is written back to the row.
--
-- If this table does not exist when create-trial-checkout runs, Supabase returns
-- PostgreSQL error code 42P01 (undefined_table). The endpoint catches this and
-- returns HTTP 500, so no silent grant ever occurs. The webhook update helpers
-- are non-critical (access is granted via syncSubscription writing
-- sat_subscription_status: 'trialing'), so 42P01 there logs a warning only.
--
-- Constraints audit:
--   unique (user_id, offer_version)            — one trial per user per version
--   unique stripe_checkout_session_id WHERE NOT NULL — no duplicate sessions
--   unique stripe_subscription_id   WHERE NOT NULL — no duplicate subscriptions
--   check (status in (...))                    — valid status values only
--   references auth.users(id) on delete cascade — FK with cascade delete
--   RLS enabled with restrictive deny-all policy
--   index on user_id                           — fast eligibility lookup
--   index on stripe_checkout_session_id WHERE NOT NULL — fast webhook lookup
--   index on stripe_subscription_id WHERE NOT NULL — fast webhook lookup
--   index on status                            — fast analytics queries

create table if not exists sat_premium_trial_claims (
  id                         uuid        primary key default gen_random_uuid(),
  user_id                    uuid        not null references auth.users(id) on delete cascade,
  offer_version              text        not null default 'v1',
  stripe_checkout_session_id text,
  stripe_subscription_id     text,
  acquisition_source         text        not null default 'post_exam_7_day_trial',
  status                     text        not null default 'pending'
                               check (status in ('pending', 'trialing', 'converted', 'canceled', 'expired')),
  claimed_at                 timestamptz not null default now(),
  trial_started_at           timestamptz,
  trial_ends_at              timestamptz,
  consumed_at                timestamptz,
  canceled_at                timestamptz,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now(),

  -- One trial per user per offer version (authoritative double-claim guard).
  constraint sat_premium_trial_claims_user_offer_unique unique (user_id, offer_version),

  -- Stripe session and subscription IDs are globally unique.
  constraint sat_premium_trial_claims_session_unique
    unique (stripe_checkout_session_id),

  constraint sat_premium_trial_claims_subscription_unique
    unique (stripe_subscription_id)
);

-- Only service-role can write; deny anon/authed reads for privacy.
-- The restrictive policy means even authenticated users cannot read their own row.
alter table sat_premium_trial_claims enable row level security;

create policy "service role only" on sat_premium_trial_claims
  as restrictive
  using (false);

-- Indexes for common lookup patterns.
create index on sat_premium_trial_claims (user_id);
create index on sat_premium_trial_claims (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;
create index on sat_premium_trial_claims (stripe_subscription_id)
  where stripe_subscription_id is not null;
create index on sat_premium_trial_claims (status);

-- ── Rollback SQL ─────────────────────────────────────────────────────────────
-- To undo this migration (apply in production ONLY after confirming no rows
-- exist, or after backing up the table):
--
--   DROP POLICY IF EXISTS "service role only" ON sat_premium_trial_claims;
--   DROP TABLE IF EXISTS sat_premium_trial_claims;
