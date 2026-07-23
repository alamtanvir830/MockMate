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
  /** One-time purchase fields (three_month / lifetime) */
  satPurchasePlanType?: 'three_month' | 'lifetime'
  satPurchaseStatus?: string
  satPurchaseExpiresAt?: string
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
      satPurchasePlanType: meta.sat_purchase_plan_type as 'three_month' | 'lifetime' | undefined,
      satPurchaseStatus: meta.sat_purchase_status as string | undefined,
      satPurchaseExpiresAt: meta.sat_purchase_expires_at as string | undefined,
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

// ── One-time purchase fulfillment (three_month / lifetime) ───────────────────

export interface OneTimePurchaseData {
  planType: 'three_month' | 'lifetime'
  stripeCustomerId?: string
  stripeCheckoutSessionId: string
  stripePaymentIntentId?: string
  accessStartedAt: Date
  /** null for lifetime (no expiration). */
  accessExpiresAt: Date | null
}

/**
 * Records a verified one-time SAT Premium purchase.
 *
 * 1. Inserts an audit row into sat_premium_purchases. The stripe_checkout_session_id
 *    unique constraint makes this idempotent: a replayed webhook inserts nothing new.
 *    Returns false when the row already existed (so the caller can skip the
 *    metadata write and avoid clobbering a later/refunded state).
 * 2. On a genuinely new insert, syncs quick-access flags to user_metadata so the
 *    synchronous hasSatPremium() gate stays fast everywhere.
 */
export async function recordOneTimePurchase(
  userId: string,
  data: OneTimePurchaseData
): Promise<boolean> {
  const admin = createAdminClient()

  // Insert audit row. Duplicate session id → unique violation (23505) → already processed.
  const { error: insertErr } = await admin
    .from('sat_premium_purchases')
    .insert({
      user_id: userId,
      plan_type: data.planType,
      status: 'active',
      stripe_customer_id: data.stripeCustomerId ?? null,
      stripe_checkout_session_id: data.stripeCheckoutSessionId,
      stripe_payment_intent_id: data.stripePaymentIntentId ?? null,
      access_started_at: data.accessStartedAt.toISOString(),
      access_expires_at: data.accessExpiresAt?.toISOString() ?? null,
    })

  if (insertErr) {
    if (insertErr.code === '23505') {
      // Idempotent replay — the purchase was already recorded.
      return false
    }
    throw new Error(`recordOneTimePurchase insert failed: ${insertErr.message}`)
  }

  // Sync quick-access flags for the synchronous gate.
  await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      sat_purchase_plan_type: data.planType,
      sat_purchase_status: 'active',
      sat_purchase_expires_at: data.accessExpiresAt?.toISOString() ?? null,
      sat_purchase_started_at: data.accessStartedAt.toISOString(),
      stripe_customer_id: data.stripeCustomerId ?? undefined,
    },
  })

  return true
}

/** Looks up user_id from sat_premium_purchases by Stripe payment intent (refunds). */
export async function getUserIdByPaymentIntentId(
  stripePaymentIntentId: string
): Promise<{ userId: string; planType: string } | null> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('sat_premium_purchases')
    .select('user_id, plan_type')
    .eq('stripe_payment_intent_id', stripePaymentIntentId)
    .maybeSingle()
  if (!data) return null
  return { userId: data.user_id as string, planType: data.plan_type as string }
}

/**
 * Marks a one-time purchase refunded and revokes the fast-access metadata flag.
 * Only clears metadata when the refunded row is the user's currently-active
 * one-time purchase, so a refund of an old purchase can't strip access granted
 * by a newer one.
 */
export async function refundOneTimePurchase(
  stripePaymentIntentId: string
): Promise<void> {
  const admin = createAdminClient()

  const { data: row } = await admin
    .from('sat_premium_purchases')
    .select('user_id')
    .eq('stripe_payment_intent_id', stripePaymentIntentId)
    .maybeSingle()

  await admin
    .from('sat_premium_purchases')
    .update({ status: 'refunded', updated_at: new Date().toISOString() })
    .eq('stripe_payment_intent_id', stripePaymentIntentId)

  if (!row?.user_id) return
  const userId = row.user_id as string

  const { data: freshData } = await admin.auth.admin.getUserById(userId)
  const meta = (freshData?.user?.user_metadata ?? {}) as Record<string, unknown>

  // Only revoke if this refunded purchase is the one currently granting access.
  if (meta.sat_purchase_status === 'active') {
    await admin.auth.admin.updateUserById(userId, {
      user_metadata: {
        sat_purchase_status: 'refunded',
      },
    })
  }
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
