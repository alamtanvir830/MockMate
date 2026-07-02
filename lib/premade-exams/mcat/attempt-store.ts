import type { MCATAttempt } from './types'

const STORAGE_KEY = 'mockmate_mcat_attempts_v1'

function readStorage(): MCATAttempt[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as MCATAttempt[]) : []
  } catch {
    return []
  }
}

function writeStorage(attempts: MCATAttempt[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
  } catch {
    // quota exceeded — silently ignore
  }
}

export function saveMCATAttempt(attempt: MCATAttempt): void {
  const all = readStorage().filter(a => a.id !== attempt.id)
  writeStorage([attempt, ...all])
}

export function updateMCATAttempt(id: string, patch: Partial<MCATAttempt>): void {
  const all = readStorage()
  const idx = all.findIndex(a => a.id === id)
  if (idx === -1) return
  all[idx] = { ...all[idx], ...patch }
  writeStorage(all)
}

export function loadAllMCATAttempts(): MCATAttempt[] {
  return readStorage()
}

export function loadMCATAttempt(id: string): MCATAttempt | null {
  return readStorage().find(a => a.id === id) ?? null
}
