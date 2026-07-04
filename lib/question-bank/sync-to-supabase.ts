import { loadAllQBResults } from './sat/question-selector'
import { loadAllMCATQBResults } from './mcat/question-selector'
import type { QBPracticeSetResult } from './types'
import type { MCATQBPracticeSetResult } from './mcat/types'

const SYNCED_IDS_KEY = 'mockmate_qb_synced_ids_v1'

function getSyncedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SYNCED_IDS_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function markSynced(ids: string[]): void {
  try {
    const current = getSyncedIds()
    for (const id of ids) current.add(id)
    localStorage.setItem(SYNCED_IDS_KEY, JSON.stringify([...current]))
  } catch {
    // quota — ignore
  }
}

export interface QBSyncResult {
  found: number
  newlyInserted: number
  alreadySynced: number
  errors: string[]
}

export async function syncLocalQBHistoryToSupabase(): Promise<QBSyncResult> {
  const satResults = loadAllQBResults()
  const mcatResults = loadAllMCATQBResults()
  const total = satResults.length + mcatResults.length

  if (total === 0) {
    return { found: 0, newlyInserted: 0, alreadySynced: 0, errors: [] }
  }

  const syncedIds = getSyncedIds()
  const unsyncedSat = satResults.filter(r => !syncedIds.has(r.id))
  const unsyncedMcat = mcatResults.filter(r => !syncedIds.has(r.id))

  if (unsyncedSat.length === 0 && unsyncedMcat.length === 0) {
    return { found: total, newlyInserted: 0, alreadySynced: total, errors: [] }
  }

  const res = await fetch('/api/qb/sync-history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      satResults: unsyncedSat,
      mcatResults: unsyncedMcat,
    }),
  })

  if (!res.ok) {
    return {
      found: total,
      newlyInserted: 0,
      alreadySynced: syncedIds.size,
      errors: [`HTTP ${res.status}`],
    }
  }

  const { inserted, skipped, errors } = await res.json() as {
    inserted: number
    skipped: number
    errors: string[]
  }

  const unsyncedIds = [
    ...unsyncedSat.map(r => r.id),
    ...unsyncedMcat.map(r => r.id),
  ]
  markSynced(unsyncedIds)

  if (process.env.NODE_ENV === 'development') {
    console.log('[QB sync]', {
      satFound: satResults.length,
      mcatFound: mcatResults.length,
      unsyncedSat: unsyncedSat.length,
      unsyncedMcat: unsyncedMcat.length,
      inserted,
      skipped,
      errors,
    })
  }

  return {
    found: total,
    newlyInserted: inserted,
    alreadySynced: total - unsyncedIds.length + skipped,
    errors: errors ?? [],
  }
}

export function hasUnsyncedQBHistory(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const syncedIds = getSyncedIds()
    const satResults: QBPracticeSetResult[] = JSON.parse(
      localStorage.getItem('mockmate_qb_results_v1') ?? '[]'
    )
    const mcatResults: MCATQBPracticeSetResult[] = JSON.parse(
      localStorage.getItem('mockmate_mcat_qb_results_v1') ?? '[]'
    )
    return (
      satResults.some(r => !syncedIds.has(r.id)) ||
      mcatResults.some(r => !syncedIds.has(r.id))
    )
  } catch {
    return false
  }
}
