import { createAdminClient } from '@/lib/supabase/admin'

interface TrialClaimUpdate {
  status?: 'pending' | 'trialing' | 'converted' | 'canceled' | 'expired'
  stripeSubscriptionId?: string
  trialStartedAt?: Date
  trialEndsAt?: Date
  consumedAt?: Date
  canceledAt?: Date
}

function buildRow(update: TrialClaimUpdate): Record<string, unknown> {
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (update.status !== undefined) row.status = update.status
  if (update.stripeSubscriptionId !== undefined) row.stripe_subscription_id = update.stripeSubscriptionId
  if (update.trialStartedAt !== undefined) row.trial_started_at = update.trialStartedAt.toISOString()
  if (update.trialEndsAt !== undefined) row.trial_ends_at = update.trialEndsAt.toISOString()
  if (update.consumedAt !== undefined) row.consumed_at = update.consumedAt.toISOString()
  if (update.canceledAt !== undefined) row.canceled_at = update.canceledAt.toISOString()
  return row
}

export async function updateTrialClaimBySession(
  stripeCheckoutSessionId: string,
  update: TrialClaimUpdate
): Promise<void> {
  const admin = createAdminClient()
  const row = buildRow(update)

  const { error } = await admin
    .from('sat_premium_trial_claims')
    .update(row)
    .eq('stripe_checkout_session_id', stripeCheckoutSessionId)

  if (error) {
    if (error.code === '42P01') {
      console.warn('[trial-claims] sat_premium_trial_claims table not yet migrated — skipping claim update')
      return
    }
    console.error('[trial-claims] updateTrialClaimBySession error', stripeCheckoutSessionId, error)
  }
}

export async function updateTrialClaimBySubscription(
  stripeSubscriptionId: string,
  update: TrialClaimUpdate
): Promise<void> {
  const admin = createAdminClient()
  const row = buildRow(update)

  const { error } = await admin
    .from('sat_premium_trial_claims')
    .update(row)
    .eq('stripe_subscription_id', stripeSubscriptionId)

  if (error) {
    if (error.code === '42P01') {
      console.warn('[trial-claims] sat_premium_trial_claims table not yet migrated — skipping claim update')
      return
    }
    if (error.code !== 'PGRST116') {
      // PGRST116 = no rows matched — subscription wasn't a trial, that's fine
      console.error('[trial-claims] updateTrialClaimBySubscription error', stripeSubscriptionId, error)
    }
  }
}
