'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface ClientEntitlements {
  satUpgradeUnlocked: boolean
  loading: boolean
}

// Client-side mirror of hasSatPremium() from lib/auth/server.ts.
// Admin bypass is intentionally omitted — the admin always uses server-gated
// routes that call getEntitlements(), never this hook.
export function evalSatPremiumMeta(meta: Record<string, unknown>): boolean {
  // 1. Legacy lifetime unlock
  if (meta.sat_upgrade_unlocked === true) return true

  // 2. One-time purchase (lifetime or three_month)
  const planType = meta.sat_purchase_plan_type as string | undefined
  const purchaseStatus = meta.sat_purchase_status as string | undefined
  if (purchaseStatus === 'active') {
    if (planType === 'lifetime') return true
    if (planType === 'three_month') {
      const expiresAt = meta.sat_purchase_expires_at as string | undefined
      if (expiresAt) {
        const expiry = new Date(expiresAt).getTime()
        if (!Number.isNaN(expiry) && expiry > Date.now()) return true
      }
    }
  }

  // 3. Monthly subscription
  const subStatus = meta.sat_subscription_status as string | undefined
  if (subStatus === 'active' || subStatus === 'past_due' || subStatus === 'trialing') return true

  return false
}

export function useEntitlements(): ClientEntitlements {
  const [satUpgradeUnlocked, setSatUpgradeUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setSatUpgradeUnlocked(user ? evalSatPremiumMeta(user.user_metadata ?? {}) : false)
      setLoading(false)
    })
  }, [])

  return { satUpgradeUnlocked, loading }
}
