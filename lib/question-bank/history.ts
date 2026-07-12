// Unified QB history utility (client-side only via loadAllQBHistory)

import { loadAllQBResults, deleteQBResult } from './sat/question-selector'
import { loadAllMCATQBResults, deleteMCATQBResult } from './mcat/question-selector'
import { rwQuestions } from './sat/rw-questions'
import { mathQuestions } from './sat/math-questions'
import { allMCATQBQuestions } from './mcat/index'
import type { QBPracticeSetResult, QBQuestion } from './types'
import type { MCATQBPracticeSetResult, MCATQBSection } from './mcat/types'

export type QBHistoryTest = 'SAT' | 'MCAT'

export interface QBHistoryEntry {
  id: string
  test: QBHistoryTest
  title: string
  subtitle: string
  mode: string
  totalQuestions: number
  correctCount: number
  accuracy: number
  completedAt: string
  reviewUrl: string
}

const ALL_SAT = [...rwQuestions, ...mathQuestions]

const SAT_SECTION_LABELS: Record<string, string> = {
  'reading-writing': 'R&W',
  'math': 'Math',
}

const MCAT_SECTION_LABELS: Record<MCATQBSection, string> = {
  'chem-phys': 'Chem/Phys',
  'cars': 'CARS',
  'bio-biochem': 'Bio/Biochem',
  'psych-soc': 'Psych/Soc',
}

function satTitle(config: QBPracticeSetResult['config']): string {
  if (config.skills?.length === 1) return config.skills[0]
  if (config.skills?.length) return `${config.skills[0]} +${config.skills.length - 1} more`
  if (config.domains?.length === 1) return config.domains[0]
  if (config.domains?.length) return `${config.domains[0]} +${config.domains.length - 1} more`
  if (config.section) return `SAT ${SAT_SECTION_LABELS[config.section] ?? config.section}`
  return 'SAT Practice Set'
}

function satSubtitle(config: QBPracticeSetResult['config']): string {
  const parts: string[] = []
  if (config.section) parts.push(SAT_SECTION_LABELS[config.section] ?? config.section)
  if (config.difficulties?.length) {
    parts.push(config.difficulties.map(d => d[0].toUpperCase() + d.slice(1)).join('/'))
  }
  return parts.join(' · ') || 'All sections'
}

function mcatTitle(config: MCATQBPracticeSetResult['config']): string {
  if (config.section) return `MCAT ${MCAT_SECTION_LABELS[config.section as MCATQBSection]}`
  return 'MCAT Practice Set'
}

function mcatSubtitle(config: MCATQBPracticeSetResult['config']): string {
  const parts: string[] = []
  if (config.section) parts.push(MCAT_SECTION_LABELS[config.section as MCATQBSection])
  if (config.difficulties?.length) {
    parts.push(config.difficulties.map(d => d[0].toUpperCase() + d.slice(1)).join('/'))
  }
  return parts.join(' · ') || 'All sections'
}

function isSatCorrect(q: QBQuestion, ans: string): boolean {
  if (q.questionType === 'grid_in') {
    return (q.acceptableAnswers ?? [q.correctAnswer]).some(
      a => a.replace(/\s/g, '').toLowerCase() === (ans ?? '').replace(/\s/g, '').toLowerCase()
    )
  }
  return ans === q.correctAnswer
}

function computeSatCorrect(result: QBPracticeSetResult): number {
  return result.questionIds.reduce((sum, id) => {
    const q = ALL_SAT.find(x => x.id === id)
    if (!q) return sum
    return sum + (isSatCorrect(q, result.answers[id]) ? 1 : 0)
  }, 0)
}

function computeMcatCorrect(result: MCATQBPracticeSetResult): number {
  return result.questionIds.reduce((sum, id) => {
    const q = allMCATQBQuestions.find(x => x.id === id)
    if (!q) return sum
    return sum + (result.answers[id] === q.correctAnswer ? 1 : 0)
  }, 0)
}

export function loadAllQBHistory(): QBHistoryEntry[] {
  if (typeof window === 'undefined') return []

  const satResults = loadAllQBResults()
  const mcatResults = loadAllMCATQBResults()

  const satEntries: QBHistoryEntry[] = satResults.map(r => {
    const correctCount = computeSatCorrect(r)
    const total = r.questionIds.length
    return {
      id: r.id,
      test: 'SAT',
      title: satTitle(r.config),
      subtitle: satSubtitle(r.config),
      mode: r.config.mode === 'personalized' ? 'Personalized' : 'Browse',
      totalQuestions: total,
      correctCount,
      accuracy: total > 0 ? Math.round((correctCount / total) * 100) : 0,
      completedAt: r.completedAt,
      reviewUrl: `/question-bank/history/${r.id}`,
    }
  })

  const mcatEntries: QBHistoryEntry[] = mcatResults.map(r => {
    const correctCount = computeMcatCorrect(r)
    const total = r.questionIds.length
    return {
      id: r.id,
      test: 'MCAT',
      title: mcatTitle(r.config),
      subtitle: mcatSubtitle(r.config),
      mode: 'Browse',
      totalQuestions: total,
      correctCount,
      accuracy: total > 0 ? Math.round((correctCount / total) * 100) : 0,
      completedAt: r.completedAt,
      reviewUrl: `/question-bank/history/${r.id}`,
    }
  })

  return [...satEntries, ...mcatEntries].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )
}

export function loadQBResultById(
  id: string,
): { type: 'SAT'; result: QBPracticeSetResult } | { type: 'MCAT'; result: MCATQBPracticeSetResult } | null {
  if (typeof window === 'undefined') return null
  // MCAT IDs start with 'mcat-qb-', SAT IDs start with 'qb-'
  if (id.startsWith('mcat-qb-')) {
    const result = loadAllMCATQBResults().find(r => r.id === id)
    return result ? { type: 'MCAT', result } : null
  }
  const result = loadAllQBResults().find(r => r.id === id)
  return result ? { type: 'SAT', result } : null
}
