-- sat_premium_trial_claims: one row per user, enforces one-trial-per-account.
-- User is inserted at reservation time (before Stripe checkout) so concurrent
-- requests both hit the unique constraint and only one succeeds.
--
-- Constraints audit:
--   unique (user_id)                         — one trial per user
--   unique stripe_checkout_session_id        — column-level unique
--   check (status in (...))                  — valid status values only
--   references auth.users(id) on delete cascade — FK with cascade delete
--   RLS enabled with restrictive deny-all policy
--   index on user_id                         — fast lookup
--   partial index on stripe_subscription_id  — fast lookup when not null
--
-- If this table does not exist when create-trial-checkout runs, Supabase will
-- return a PostgreSQL error code 42P01 (undefined_table). The endpoint catches
-- all errors in the outer try/catch and returns HTTP 500, so no silent grant
-- ever occurs. The webhook extension is wrapped in the existing error handler
-- which returns 200 to stop Stripe retries on non-transient errors.

create table if not exists sat_premium_trial_claims (
  id                         uuid primary key default gen_random_uuid(),
  user_id                    uuid not null references auth.users(id) on delete cascade,
  stripe_checkout_session_id text unique,
  stripe_subscription_id     text,
  status                     text not null default 'pending'
                               check (status in ('pending', 'trialing', 'converted', 'canceled')),
  claimed_at                 timestamptz not null default now(),
  trial_start                timestamptz,
  trial_end                  timestamptz,
  converted_at               timestamptz,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now(),
  constraint sat_premium_trial_claims_user_id_unique unique (user_id)
);

-- Only service-role can write; deny anon/authed reads for privacy.
-- The restrictive policy means even authenticated users cannot read their own row.
alter table sat_premium_trial_claims enable row level security;

create policy "service role only" on sat_premium_trial_claims
  as restrictive
  using (false);

create index on sat_premium_trial_claims (user_id);
create index on sat_premium_trial_claims (stripe_subscription_id) where stripe_subscription_id is not null;

-- ── Rollback SQL ─────────────────────────────────────────────────────────────
-- To undo this migration (apply in production ONLY after confirming no rows exist
-- or after backing up the table):
--
--   drop policy if exists "service role only" on sat_premium_trial_claims;
--   drop table if exists sat_premium_trial_claims;
