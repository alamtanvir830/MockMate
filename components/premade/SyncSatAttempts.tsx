'use client'

import { useEffect } from 'react'
import { syncLocalSatAttemptsToSupabase } from '@/lib/premade-exams/sat/sync-to-supabase'

export function SyncSatAttempts() {
  useEffect(() => {
    // Fire-and-forget background sync on mount — errors are silent
    syncLocalSatAttemptsToSupabase().catch(() => {})
  }, [])

  return null
}
