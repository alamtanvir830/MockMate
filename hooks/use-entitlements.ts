'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface ClientEntitlements {
  satUpgradeUnlocked: boolean
  loading: boolean
}

export function useEntitlements(): ClientEntitlements {
  const [satUpgradeUnlocked, setSatUpgradeUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setSatUpgradeUnlocked(user?.user_metadata?.sat_upgrade_unlocked === true)
      setLoading(false)
    })
  }, [])

  return { satUpgradeUnlocked, loading }
}
