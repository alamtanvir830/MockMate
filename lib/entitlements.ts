import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdminUser, isLegacyLifetimeUser, hasSatPremium } from '@/lib/auth/server'

export interface EntitlementData {
  /** True when the user has any active SAT Premium access (legacy OR subscription). */
  satUpgradeUnlocked: boolean
  /** True only for original one-time lifetime purchasers. */
  isLegacyLifetime: boolean
  satUpgradeUnlockedAt?: string
  stripeCustomerId?: string
  /** Legacy payment fields (null for subscription users) */
  stripeCheckoutSessionId?: string
  stripePaymentIntentId?: string
  /** Subscription fields (null for legacy lifetime users) */
  satSubscriptionStatus?: string
  satSubscriptionId?: string
  satSubscriptionPeriodEnd?: string
  satCancelAtPeriodEnd?: boolean
}

export async function getEntitlements(): Promise<EntitlementData> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { satUpgradeUnlocked: false, isLegacyLifetime: false }

    // For the billing page and form gates, read fresh metadata from the admin API
    // to bypass JWT cache staleness after webhook-triggered updates.
    const admin = createAdminClient()
    const { data: freshData } = await admin.auth.admin.getUserById(user.id)
    const meta = (freshData?.user?.user_metadata ?? user.user_metadata ?? {}) as Record<string, unknown>

    const freshUser = { email: user.email, user_metadata: meta }

    return {
      satUpgradeUnlocked: hasSatPremium(freshUser),
      isLegacyLifetime: isLegacyLifetimeUser(freshUser),
      satUpgradeUnlockedAt: meta.sat_upgrade_unlocked_at as string | undefined,
      stripeCustomerId: meta.stripe_customer_id as string | undefined,
      stripeCheckoutSessionId: meta.stripe_checkout_session_id as string | undefined,
      stripePaymentIntentId: meta.stripe_payment_intent_id as string | undefined,
      satSubscriptionStatus: meta.sat_subscription_status as string | undefined,
      satSubscriptionId: meta.sat_subscription_id as string | undefined,
      satSubscriptionPeriodEnd: meta.sat_subscription_period_end as string | undefined,
      satCancelAtPeriodEnd: meta.sat_cancel_at_period_end === true,
    }
  } catch {
    return { satUpgradeUnlocked: false, isLegacyLifetime: false }
  }
}

// ── Legacy one-time payment fulfillment (keep for webhook backward-compat) ──

export async function unlockSATUpgrade(
  userId: string,
  data: {
    stripeCustomerId?: string
    stripeCheckoutSessionId?: string
    stripePaymentIntentId?: string
  }
): Promise<void> {
  const admin = createAdminClient()
  await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      sat_upgrade_unlocked: true,
      sat_upgrade_unlocked_at: new Date().toISOString(),
      stripe_customer_id: data.stripeCustomerId,
      stripe_checkout_session_id: data.stripeCheckoutSessionId,
      stripe_payment_intent_id: data.stripePaymentIntentId,
    },
  })
}

// ── Monthly subscription fulfillment ────────────────────────────────────────

export interface SubscriptionSyncData {
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId?: string
  stripeProductId?: string
  status: string
  currentPeriodStart?: Date
  currentPeriodEnd?: Date
  cancelAtPeriodEnd: boolean
  canceledAt?: Date | null
  endedAt?: Date | null
  latestInvoiceId?: string
  latestInvoicePaidAt?: Date | null
}

/** Upserts a subscription row and syncs user_metadata for fast auth checks. */
export async function syncSubscription(
  userId: string,
  data: SubscriptionSyncData
): Promise<void> {
  const admin = createAdminClient()

  // 1. Upsert the subscription record
  await admin
    .from('sat_premium_subscriptions')
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: data.stripeCustomerId,
        stripe_subscription_id: data.stripeSubscriptionId,
        stripe_price_id: data.stripePriceId ?? null,
        stripe_product_id: data.stripeProductId ?? null,
        status: data.status,
        current_period_start: data.currentPeriodStart?.toISOString() ?? null,
        current_period_end: data.currentPeriodEnd?.toISOString() ?? null,
        cancel_at_period_end: data.cancelAtPeriodEnd,
        canceled_at: data.canceledAt?.toISOString() ?? null,
        ended_at: data.endedAt?.toISOString() ?? null,
        latest_invoice_id: data.latestInvoiceId ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'stripe_subscription_id' }
    )

  // 2. Sync quick-access flags to user_metadata so hasSatPremium() stays fast
  await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      sat_subscription_status: data.status,
      sat_subscription_id: data.stripeSubscriptionId,
      sat_subscription_period_end: data.currentPeriodEnd?.toISOString() ?? null,
      sat_cancel_at_period_end: data.cancelAtPeriodEnd,
      stripe_customer_id: data.stripeCustomerId,
    },
  })
}

/** Updates the latest invoice paid timestamp for a subscription. */
export async function recordInvoicePaid(
  stripeSubscriptionId: string,
  paidAt: Date
): Promise<void> {
  const admin = createAdminClient()
  await admin
    .from('sat_premium_subscriptions')
    .update({
      latest_invoice_paid_at: paidAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', stripeSubscriptionId)
}

/** Looks up user_id from sat_premium_subscriptions by subscription ID. */
export async function getUserIdBySubscriptionId(
  stripeSubscriptionId: string
): Promise<string | null> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('sat_premium_subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .maybeSingle()
  return data?.user_id ?? null
}

/** Looks up user_id from sat_premium_subscriptions by Stripe customer ID. */
export async function getUserIdByStripeCustomerId(
  stripeCustomerId: string
): Promise<string | null> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('sat_premium_subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return data?.user_id ?? null
}

// ── Shared admin utilities ───────────────────────────────────────────────────

export async function getUserIdByEmail(email: string): Promise<string | null> {
  const admin = createAdminClient()
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const match = users.find(u => u.email === email)
  return match?.id ?? null
}

export async function grantSATPremiumManual(
  userId: string,
  source: 'manual_grant' | 'founder_grant' = 'manual_grant'
): Promise<void> {
  const admin = createAdminClient()
  await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      sat_upgrade_unlocked: true,
      sat_upgrade_unlocked_at: new Date().toISOString(),
      sat_upgrade_source: source,
    },
  })
}

export async function revokeSATPremium(
  userId: string,
  reason = 'manual_access_revocation'
): Promise<void> {
  const admin = createAdminClient()
  await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      sat_upgrade_unlocked: false,
      sat_upgrade_revoked_at: new Date().toISOString(),
      sat_upgrade_revoked_reason: reason,
      // Also clear subscription flags so the JWT-based check reflects revocation
      sat_subscription_status: null,
    },
  })
}

// ── Unused but kept to avoid breaking any imports ────────────────────────────

/** @deprecated Replaced by isAdminUser from lib/auth/server */
export function isMockMateAdmin(
  user: { email?: string | null } | null | undefined
): boolean {
  return isAdminUser(user)
}
