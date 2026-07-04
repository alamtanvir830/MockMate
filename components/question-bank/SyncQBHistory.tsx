'use client'

import { useEffect } from 'react'
import { syncLocalQBHistoryToSupabase } from '@/lib/question-bank/sync-to-supabase'

export function SyncQBHistory() {
  useEffect(() => {
    // Fire-and-forget background sync on mount — errors are silent
    syncLocalQBHistoryToSupabase().catch(() => {})
  }, [])

  return null
}
