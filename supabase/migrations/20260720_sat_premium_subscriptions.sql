-- SAT Premium subscription lifecycle table.
-- Stores one row per Stripe subscription (not per user — a user could
-- theoretically cancel and resubscribe, creating multiple rows).
-- The webhook handler is the only trusted writer; RLS blocks all client
-- inserts, updates, and deletes.

create table if not exists sat_premium_subscriptions (
  id                      uuid        primary key default gen_random_uuid(),
  user_id                 uuid        not null references auth.users(id) on delete cascade,
  stripe_customer_id      text        not null,
  stripe_subscription_id  text        not null,
  stripe_price_id         text,
  stripe_product_id       text,
  status                  text        not null,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean     not null default false,
  canceled_at             timestamptz,
  ended_at                timestamptz,
  latest_invoice_id       text,
  latest_invoice_paid_at  timestamptz,
  access_model            text        not null default 'monthly_subscription',
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  constraint sat_premium_subscriptions_subscription_id_unique
    unique (stripe_subscription_id)
);

-- Users can read their own subscription rows (e.g. for the billing page).
-- No client-side writes: with RLS enabled and no permissive INSERT/UPDATE/DELETE
-- policy, those operations are denied for all non-service-role callers.
alter table sat_premium_subscriptions enable row level security;

create policy "users_read_own_subscription"
  on sat_premium_subscriptions
  for select
  using (auth.uid() = user_id);

-- Index for fast webhook lookup by customer or subscription ID
create index if not exists sat_premium_subscriptions_customer_idx
  on sat_premium_subscriptions (stripe_customer_id);

comment on table sat_premium_subscriptions is
  'Stores SAT Premium monthly subscription state synced from Stripe webhooks. '
  'The webhook handler (service role) is the sole writer. '
  'Users may read only their own row.';
