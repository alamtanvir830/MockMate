import type { Difficulty } from './types'

export type MasteryStatus = 'not_started' | 'learning' | 'developing' | 'proficient' | 'mastered'

export interface SkillMastery {
  skillSlug: string
  attemptCount: number
  masteryScore: number  // 0-100
  status: MasteryStatus
  lastAttemptAt: string | null
}

export interface AttemptRecord {
  difficulty: Difficulty
  is_correct: boolean
}

export function computeMastery(attempts: AttemptRecord[]): { score: number; status: MasteryStatus } {
  if (attempts.length === 0) return { score: 0, status: 'not_started' }

  const WEIGHTS: Record<Difficulty, number> = { easy: 1.0, medium: 1.25, hard: 1.5 }

  // Use last 30 attempts
  const recent = attempts.slice(-30)
  let weightedCorrect = 0
  let weightedTotal = 0

  for (const a of recent) {
    const w = WEIGHTS[a.difficulty] ?? 1.0
    weightedTotal += w
    if (a.is_correct) weightedCorrect += w
  }

  const score = weightedTotal > 0 ? Math.round((weightedCorrect / weightedTotal) * 100) : 0
  const count = attempts.length

  let status: MasteryStatus
  if (count === 0) status = 'not_started'
  else if (count < 5) status = 'learning'
  else if (score < 70) status = 'developing'
  else if (score < 85 || count < 15) status = 'proficient'
  else status = 'mastered'

  return { score, status }
}

export const MASTERY_COLORS: Record<MasteryStatus, string> = {
  not_started: 'text-slate-400',
  learning: 'text-amber-500',
  developing: 'text-orange-500',
  proficient: 'text-blue-600',
  mastered: 'text-emerald-600',
}

export const MASTERY_BG: Record<MasteryStatus, string> = {
  not_started: 'bg-slate-100',
  learning: 'bg-amber-50',
  developing: 'bg-orange-50',
  proficient: 'bg-blue-50',
  mastered: 'bg-emerald-50',
}

export const MASTERY_LABELS: Record<MasteryStatus, string> = {
  not_started: 'Not Started',
  learning: 'Learning',
  developing: 'Developing',
  proficient: 'Proficient',
  mastered: 'Mastered',
}
