import type { SATAIFeedback } from '@/app/api/sat-feedback/route'
import { rescoreAttempt } from './sat-score-conversion'

export interface PremadeAttempt {
  id: string
  examId: string
  examTitle: string
  completedAt: string
  rwScaled: number
  mathScaled: number
  totalScore: number
  rwM1Correct: number
  rwM2Correct: number
  rwTotal: number
  mathM1Correct: number
  mathM2Correct: number
  mathTotal: number
  rwM2Type: 'easy' | 'hard'
  mathM2Type: 'easy' | 'hard'
  answers: Record<string, string>
  bookmarks: string[]
  strikeouts?: Record<string, string[]>
  aiFeedback: SATAIFeedback | null
}

const STORAGE_KEY = 'mockmate_premade_attempts_v1'

function applyCurrentScoring(attempt: PremadeAttempt): PremadeAttempt {
  const rwRaw = attempt.rwM1Correct + attempt.rwM2Correct
  const mathRaw = attempt.mathM1Correct + attempt.mathM2Correct
  const { rwScaled, mathScaled, totalScore } = rescoreAttempt(
    rwRaw, attempt.rwM2Type === 'hard',
    mathRaw, attempt.mathM2Type === 'hard',
  )
  return { ...attempt, rwScaled, mathScaled, totalScore }
}

function readStorage(): PremadeAttempt[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const attempts = raw ? (JSON.parse(raw) as PremadeAttempt[]) : []
    return attempts.map(applyCurrentScoring)
  } catch {
    return []
  }
}

function writeStorage(attempts: PremadeAttempt[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
  } catch {
    // quota exceeded — silently ignore
  }
}

export function saveAttempt(attempt: PremadeAttempt): void {
  const all = readStorage().filter(a => a.id !== attempt.id)
  writeStorage([attempt, ...all])
}

export function updateAttempt(id: string, patch: Partial<PremadeAttempt>): void {
  const all = readStorage()
  const idx = all.findIndex(a => a.id === id)
  if (idx === -1) return
  all[idx] = { ...all[idx], ...patch }
  writeStorage(all)
}

export function loadAllAttempts(): PremadeAttempt[] {
  return readStorage()
}

export function loadAttempt(id: string): PremadeAttempt | null {
  return readStorage().find(a => a.id === id) ?? null
}
