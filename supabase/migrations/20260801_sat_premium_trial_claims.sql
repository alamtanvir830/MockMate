-- sat_premium_trial_claims: one row per user, enforces one-trial-per-account.
-- User is inserted at reservation time (before Stripe checkout) so concurrent
-- requests both hit the unique constraint and only one succeeds.

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
alter table sat_premium_trial_claims enable row level security;

create policy "service role only" on sat_premium_trial_claims
  as restrictive
  using (false);

create index on sat_premium_trial_claims (user_id);
create index on sat_premium_trial_claims (stripe_subscription_id) where stripe_subscription_id is not null;
