import type { PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { rwModule1Questions } from '@/lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '@/lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '@/lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions } from '@/lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions } from '@/lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions } from '@/lib/premade-exams/sat/math-module-2-hard'
import { f2RwModule1Questions } from '@/lib/premade-exams/sat/form-2-rw-module-1'
import { f2RwModule2EasyQuestions } from '@/lib/premade-exams/sat/form-2-rw-module-2-easy'
import { f2RwModule2HardQuestions } from '@/lib/premade-exams/sat/form-2-rw-module-2-hard'
import { f2MathModule1Questions } from '@/lib/premade-exams/sat/form-2-math-module-1'
import { f2MathModule2EasyQuestions } from '@/lib/premade-exams/sat/form-2-math-module-2-easy'
import { f2MathModule2HardQuestions } from '@/lib/premade-exams/sat/form-2-math-module-2-hard'
import { f3RwModule1Questions } from '@/lib/premade-exams/sat/form-3-rw-module-1'
import { f3RwModule2EasyQuestions } from '@/lib/premade-exams/sat/form-3-rw-module-2-easy'
import { f3RwModule2HardQuestions } from '@/lib/premade-exams/sat/form-3-rw-module-2-hard'
import { f3MathModule1Questions } from '@/lib/premade-exams/sat/form-3-math-module-1'
import { f3MathModule2EasyQuestions } from '@/lib/premade-exams/sat/form-3-math-module-2-easy'
import { f3MathModule2HardQuestions } from '@/lib/premade-exams/sat/form-3-math-module-2-hard'
import { rwQuestions } from '@/lib/question-bank/sat/rw-questions'
import { mathQuestions } from '@/lib/question-bank/sat/math-questions'
import { getSeenIds } from '@/lib/question-bank/sat/question-selector'
import type { SATQuestion } from '@/lib/premade-exams/sat/types'
import type { QBDifficulty, QBDomain, QBSection, QBQuestion } from '@/lib/question-bank/types'

// All question bank questions
const allQBQuestions: QBQuestion[] = [...rwQuestions, ...mathQuestions]

const RW_DOMAIN_SET = new Set([
  'Craft and Structure',
  'Information and Ideas',
  'Expression of Ideas',
  'Standard English Conventions',
])

// Target question counts for each of the 4 sets (weakest domain gets most)
const TARGET_COUNTS = [15, 13, 11, 10] as const
const MIN_COUNT = 10

// ── localStorage persistence for stable sets ─────────────────────────────────

const PSETS_KEY = 'mockmate_personalized_sets_v1'

interface StoredSets {
  [setKey: string]: string[] // setKey → question IDs
}

function savePersonalizedSet(setKey: string, questionIds: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(PSETS_KEY)
    const all: StoredSets = raw ? JSON.parse(raw) : {}
    all[setKey] = questionIds
    // Trim to keep only the latest 40 stored sets (10 attempts × 4 sets)
    const entries = Object.entries(all)
    if (entries.length > 40) {
      const trimmed = Object.fromEntries(entries.slice(-40))
      localStorage.setItem(PSETS_KEY, JSON.stringify(trimmed))
    } else {
      localStorage.setItem(PSETS_KEY, JSON.stringify(all))
    }
  } catch { /* quota exceeded */ }
}

export function loadPersonalizedSet(setKey: string): string[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(PSETS_KEY)
    if (!raw) return null
    const all: StoredSets = JSON.parse(raw)
    return all[setKey] ?? null
  } catch { return null }
}

// ── Exam accuracy helpers ─────────────────────────────────────────────────────

function isCorrect(q: SATQuestion, answer: string): boolean {
  if (!answer) return false
  if (q.section === 'reading-writing') return answer === q.correctAnswer
  const mq = q as { type: string; correctAnswer: string; acceptableAnswers?: string[] }
  if (mq.type === 'grid_in') {
    return (mq.acceptableAnswers ?? [mq.correctAnswer]).some(
      a => a.replace(/\s/g, '').toLowerCase() === answer.replace(/\s/g, '').toLowerCase()
    )
  }
  return answer === mq.correctAnswer
}

// ── Question selection ────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Select questions for one personalized set with progressive fallback.
 * Guarantees at least MIN_COUNT questions by relaxing filters tier by tier.
 *
 * Priority order within each tier:
 *   1. Not in QB practice history AND not used in an earlier set this call
 *   2. In QB practice history but not used in an earlier set this call
 *   3. Already used in an earlier set (allowed as last resort)
 */
function selectForSet(
  section: QBSection,
  targetDomain: QBDomain,
  difficulties: QBDifficulty[],
  target: number,
  usedInEarlierSets: Set<string>,
): QBQuestion[] {
  const seenIds = getSeenIds() // questions the user has practiced in QB before
  const sectionPool = allQBQuestions.filter(q => q.section === section)

  function ranked(pool: QBQuestion[]): QBQuestion[] {
    const fresh = pool.filter(q => !seenIds.has(q.id) && !usedInEarlierSets.has(q.id))
    const seenButNew = pool.filter(q => seenIds.has(q.id) && !usedInEarlierSets.has(q.id))
    const reused = pool.filter(q => usedInEarlierSets.has(q.id))
    return [...shuffle(fresh), ...shuffle(seenButNew), ...shuffle(reused)]
  }

  function domainFirst(pool: QBQuestion[]): QBQuestion[] {
    return [
      ...pool.filter(q => q.domain === targetDomain),
      ...pool.filter(q => q.domain !== targetDomain),
    ]
  }

  // Tier 1: target domain + requested difficulties
  const t1 = ranked(
    sectionPool.filter(q => q.domain === targetDomain && difficulties.includes(q.difficulty))
  )
  if (t1.length >= MIN_COUNT) return t1.slice(0, target)

  // Tier 2: target domain, any difficulty
  const t2 = ranked(sectionPool.filter(q => q.domain === targetDomain))
  if (t2.length >= MIN_COUNT) return t2.slice(0, target)

  // Tier 3: entire section, requested difficulties (domain-first ordering)
  const t3 = domainFirst(ranked(sectionPool.filter(q => difficulties.includes(q.difficulty))))
  if (t3.length >= MIN_COUNT) return t3.slice(0, target)

  // Tier 4: entire section, any difficulty (domain-first ordering)
  const t4 = domainFirst(ranked(sectionPool))
  const result = t4.slice(0, Math.max(target, MIN_COUNT))

  if (result.length < MIN_COUNT) {
    console.warn(
      `[MockMate] PersonalizedSets: set for domain "${targetDomain}" has only ${result.length} questions (minimum ${MIN_COUNT}). Question bank may be too small for this section.`
    )
  }

  return result
}

function pickDifficulties(accuracy: number): QBDifficulty[] {
  if (accuracy < 0.50) return ['easy', 'medium']
  if (accuracy < 0.70) return ['medium']
  if (accuracy < 0.85) return ['medium', 'hard']
  return ['hard']
}

// ── Public interface ──────────────────────────────────────────────────────────

export interface PersonalizedSetCard {
  key: string
  section: QBSection
  domain: QBDomain
  sectionLabel: string
  weakestSkill: string
  accuracyPct: number
  count: number // actual question count in the pre-selected set
  difficulties: QBDifficulty[]
  focusDescription: string
  practiceUrl: string
  selectedQuestionIds: string[]
}

export function buildPersonalizedSets(attempt: PremadeAttempt): PersonalizedSetCard[] {
  // ── 1. Resolve which exam questions the student saw ──────────────────────
  let rwM1: SATQuestion[]
  let rwM2: SATQuestion[]
  let mathM1: SATQuestion[]
  let mathM2: SATQuestion[]

  if (attempt.examId === 'sat-form-2') {
    rwM1 = f2RwModule1Questions
    rwM2 = attempt.rwM2Type === 'easy' ? f2RwModule2EasyQuestions : f2RwModule2HardQuestions
    mathM1 = f2MathModule1Questions
    mathM2 = attempt.mathM2Type === 'easy' ? f2MathModule2EasyQuestions : f2MathModule2HardQuestions
  } else if (attempt.examId === 'sat-form-3') {
    rwM1 = f3RwModule1Questions
    rwM2 = attempt.rwM2Type === 'easy' ? f3RwModule2EasyQuestions : f3RwModule2HardQuestions
    mathM1 = f3MathModule1Questions
    mathM2 = attempt.mathM2Type === 'easy' ? f3MathModule2EasyQuestions : f3MathModule2HardQuestions
  } else {
    rwM1 = rwModule1Questions
    rwM2 = attempt.rwM2Type === 'easy' ? rwModule2EasyQuestions : rwModule2HardQuestions
    mathM1 = mathModule1Questions
    mathM2 = attempt.mathM2Type === 'easy' ? mathModule2EasyQuestions : mathModule2HardQuestions
  }

  // ── 2. Calculate per-domain accuracy from the exam ───────────────────────
  const allSeen: SATQuestion[] = [...rwM1, ...rwM2, ...mathM1, ...mathM2]

  type DomainStat = {
    correct: number
    total: number
    section: QBSection
    skillMisses: Map<string, number>
  }
  const domainStats = new Map<string, DomainStat>()

  for (const q of allSeen) {
    const d = q.domain as string
    const section: QBSection = RW_DOMAIN_SET.has(d) ? 'reading-writing' : 'math'
    if (!domainStats.has(d)) {
      domainStats.set(d, { correct: 0, total: 0, section, skillMisses: new Map() })
    }
    const stat = domainStats.get(d)!
    stat.total++
    const answer = attempt.answers[q.id] ?? ''
    if (isCorrect(q, answer)) {
      stat.correct++
    } else {
      const skill = (q as { skill: string }).skill
      stat.skillMisses.set(skill, (stat.skillMisses.get(skill) ?? 0) + 1)
    }
  }

  const sorted = [...domainStats.entries()]
    .map(([domain, stat]) => ({
      domain: domain as QBDomain,
      section: stat.section,
      accuracy: stat.total > 0 ? stat.correct / stat.total : 0,
      weakestSkill: [...stat.skillMisses.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? domain,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 4)

  // ── 3. Select questions for each set ─────────────────────────────────────
  const usedIds = new Set<string>() // grows as we build each set

  const cards: PersonalizedSetCard[] = sorted.map((entry, i) => {
    const setKey = `${attempt.id}-set-${i}`
    const difficulties = pickDifficulties(entry.accuracy)
    const target = TARGET_COUNTS[i] ?? MIN_COUNT
    const accuracyPct = Math.round(entry.accuracy * 100)

    // Check for stored set (stability on refresh)
    const storedIds = loadPersonalizedSet(setKey)
    let selectedIds: string[]

    if (storedIds && storedIds.length >= MIN_COUNT) {
      // Use the stable stored selection
      selectedIds = storedIds
      // Register in usedIds so later sets (if being rebuilt) still deduplicate
      storedIds.forEach(id => usedIds.add(id))
    } else {
      // First visit or stale cache — compute fresh selection
      const selected = selectForSet(entry.section, entry.domain, difficulties, target, usedIds)
      selectedIds = selected.map(q => q.id)
      selected.forEach(q => usedIds.add(q.id))
      savePersonalizedSet(setKey, selectedIds)
    }

    const actualCount = selectedIds.length

    const focusDescription =
      accuracyPct < 50
        ? `You scored ${accuracyPct}% on this domain. Build up the fundamentals with easier questions first.`
        : accuracyPct < 70
        ? `You scored ${accuracyPct}% — a solid base. Sharpen your ${entry.weakestSkill} skills with focused practice.`
        : accuracyPct < 85
        ? `You scored ${accuracyPct}%. Push further with harder questions targeting ${entry.weakestSkill}.`
        : `You scored ${accuracyPct}%. Challenge yourself to maintain your edge on ${entry.weakestSkill}.`

    const params = new URLSearchParams({
      section: entry.section,
      domains: entry.domain,
      difficulties: difficulties.join(','),
      count: String(actualCount),
      mode: 'personalized',
      sourceAttemptId: attempt.id,
      storedSetId: setKey,
    })

    return {
      key: setKey,
      section: entry.section,
      domain: entry.domain,
      sectionLabel: entry.section === 'reading-writing' ? 'Reading & Writing' : 'Math',
      weakestSkill: entry.weakestSkill,
      accuracyPct,
      count: actualCount,
      difficulties,
      focusDescription,
      practiceUrl: `/question-bank/sat/practice?${params.toString()}`,
      selectedQuestionIds: selectedIds,
    }
  })

  return cards
}
