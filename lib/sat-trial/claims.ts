import { createAdminClient } from '@/lib/supabase/admin'

interface TrialClaimUpdate {
  status?: 'pending' | 'trialing' | 'converted' | 'canceled'
  stripeSubscriptionId?: string
  trialStart?: Date
  trialEnd?: Date
  convertedAt?: Date
}

export async function updateTrialClaimBySession(
  stripeCheckoutSessionId: string,
  update: TrialClaimUpdate
): Promise<void> {
  const admin = createAdminClient()
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (update.status !== undefined) row.status = update.status
  if (update.stripeSubscriptionId !== undefined) row.stripe_subscription_id = update.stripeSubscriptionId
  if (update.trialStart !== undefined) row.trial_start = update.trialStart.toISOString()
  if (update.trialEnd !== undefined) row.trial_end = update.trialEnd.toISOString()
  if (update.convertedAt !== undefined) row.converted_at = update.convertedAt.toISOString()

  const { error } = await admin
    .from('sat_premium_trial_claims')
    .update(row)
    .eq('stripe_checkout_session_id', stripeCheckoutSessionId)

  if (error) {
    console.error('[trial-claims] updateTrialClaimBySession error', stripeCheckoutSessionId, error)
  }
}

export async function updateTrialClaimBySubscription(
  stripeSubscriptionId: string,
  update: TrialClaimUpdate
): Promise<void> {
  const admin = createAdminClient()
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (update.status !== undefined) row.status = update.status
  if (update.convertedAt !== undefined) row.converted_at = update.convertedAt.toISOString()

  const { error } = await admin
    .from('sat_premium_trial_claims')
    .update(row)
    .eq('stripe_subscription_id', stripeSubscriptionId)

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows matched — subscription wasn't a trial, that's fine
    console.error('[trial-claims] updateTrialClaimBySubscription error', stripeSubscriptionId, error)
  }
}
