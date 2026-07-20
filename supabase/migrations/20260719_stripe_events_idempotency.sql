-- Stripe webhook idempotency: record each processed Stripe event ID.
-- The unique constraint prevents a replayed event from regranting access
-- after a manual premium revocation.

create table if not exists processed_stripe_events (
  id            uuid         primary key default gen_random_uuid(),
  stripe_event_id text        not null,
  event_type    text         not null,
  processed_at  timestamptz  not null default now(),

  constraint processed_stripe_events_event_id_unique unique (stripe_event_id)
);

-- Only the service role (server-side webhook handler) should write here.
-- No user should be able to insert, update, or delete rows.
alter table processed_stripe_events enable row level security;

create policy "service_role_only" on processed_stripe_events
  as restrictive
  using (false);   -- blocks all non-service-role access

comment on table processed_stripe_events is
  'Records every Stripe event ID processed by the webhook handler. Used to prevent replayed events from granting duplicate or already-revoked entitlements.';
