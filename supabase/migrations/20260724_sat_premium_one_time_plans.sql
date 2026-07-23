-- SAT Premium one-time purchases (3-Month Access and Lifetime Access).
--
-- The existing sat_premium_subscriptions table models the recurring monthly
-- subscription lifecycle and is not suitable for one-time payments, so one-time
-- purchases get their own table. The Stripe webhook handler (service role) is
-- the only trusted writer; RLS lets users read only their own rows.

create table if not exists sat_premium_purchases (
  id                          uuid        primary key default gen_random_uuid(),
  user_id                     uuid        not null references auth.users(id) on delete cascade,
  plan_type                   text        not null check (plan_type in ('three_month', 'lifetime')),
  status                      text        not null default 'active'
                                            check (status in ('active', 'expired', 'refunded')),
  stripe_customer_id          text,
  stripe_checkout_session_id  text        unique,
  stripe_payment_intent_id    text,
  access_started_at           timestamptz not null default now(),
  access_expires_at           timestamptz,   -- NULL means no expiration (lifetime)
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

alter table sat_premium_purchases enable row level security;

-- Users can read their own purchase rows (e.g. for the billing page).
drop policy if exists "Users can read own purchases" on sat_premium_purchases;
create policy "Users can read own purchases"
  on sat_premium_purchases
  for select
  using (auth.uid() = user_id);

-- Service role writes only. With RLS enabled and no permissive INSERT/UPDATE/
-- DELETE policy for the authenticated role, client writes are denied. The
-- service role bypasses RLS entirely; this policy is documentation of intent.
drop policy if exists "Service role can manage purchases" on sat_premium_purchases;
create policy "Service role can manage purchases"
  on sat_premium_purchases
  using (auth.role() = 'service_role');

-- Fast webhook lookups by payment intent (refunds) and customer.
create index if not exists sat_premium_purchases_payment_intent_idx
  on sat_premium_purchases (stripe_payment_intent_id);

create index if not exists sat_premium_purchases_customer_idx
  on sat_premium_purchases (stripe_customer_id);

create index if not exists sat_premium_purchases_user_idx
  on sat_premium_purchases (user_id);

comment on table sat_premium_purchases is
  'One-time SAT Premium purchases (three_month, lifetime) synced from Stripe '
  'webhooks. The webhook handler (service role) is the sole writer. Users may '
  'read only their own rows. access_expires_at is NULL for lifetime.';
