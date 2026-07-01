import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export interface EntitlementData {
  satUpgradeUnlocked: boolean
  satUpgradeUnlockedAt?: string
  stripeCustomerId?: string
  stripeCheckoutSessionId?: string
  stripePaymentIntentId?: string
}

export async function getEntitlements(): Promise<EntitlementData> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { satUpgradeUnlocked: false }
    const meta = user.user_metadata ?? {}
    return {
      satUpgradeUnlocked: meta.sat_upgrade_unlocked === true,
      satUpgradeUnlockedAt: meta.sat_upgrade_unlocked_at,
      stripeCustomerId: meta.stripe_customer_id,
      stripeCheckoutSessionId: meta.stripe_checkout_session_id,
      stripePaymentIntentId: meta.stripe_payment_intent_id,
    }
  } catch {
    return { satUpgradeUnlocked: false }
  }
}

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

export async function getUserIdByEmail(email: string): Promise<string | null> {
  const admin = createAdminClient()
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const match = users.find(u => u.email === email)
  return match?.id ?? null
}
