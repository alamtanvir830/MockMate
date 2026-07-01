import { loadAllAttempts } from './attempt-store'

const SYNCED_IDS_KEY = 'mockmate_synced_sat_attempt_ids_v1'

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

export interface SyncResult {
  found: number
  newlyInserted: number
  alreadySynced: number
  errors: string[]
}

export async function syncLocalSatAttemptsToSupabase(): Promise<SyncResult> {
  const allAttempts = loadAllAttempts().filter(a =>
    ['sat-form-1', 'sat-form-2', 'sat-form-3'].includes(a.examId)
  )

  if (allAttempts.length === 0) {
    return { found: 0, newlyInserted: 0, alreadySynced: 0, errors: [] }
  }

  const syncedIds = getSyncedIds()
  const unsynced = allAttempts.filter(a => !syncedIds.has(a.id))

  if (unsynced.length === 0) {
    return { found: allAttempts.length, newlyInserted: 0, alreadySynced: allAttempts.length, errors: [] }
  }

  const res = await fetch('/api/premade/sync-attempts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attempts: unsynced }),
  })

  if (!res.ok) {
    return { found: allAttempts.length, newlyInserted: 0, alreadySynced: syncedIds.size, errors: [`HTTP ${res.status}`] }
  }

  const { inserted, skipped, errors } = await res.json() as {
    inserted: number
    skipped: number
    errors: string[]
  }

  // Mark all unsynced as done (even skipped ones — they're already in DB)
  markSynced(unsynced.map(a => a.id))

  return {
    found: allAttempts.length,
    newlyInserted: inserted,
    alreadySynced: allAttempts.length - unsynced.length + skipped,
    errors: errors ?? [],
  }
}
