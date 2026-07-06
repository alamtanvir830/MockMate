import type {
  SHSATForm,
  SHSATSubsectionType,
  SHSATQuestion,
  SHSATPoemLine,
} from './shsat-form-1'
import { QUESTION_META, PASSAGE_META, type Difficulty } from './shsat-metadata'

export type { Difficulty }

// ─── Pool types ───────────────────────────────────────────────────────────────

export interface PoolQuestion {
  questionId: string
  subIdx: number
  subType: SHSATSubsectionType
  passageId?: string
  passageTitle?: string
  passageContent?: string
  passageAuthor?: string
  passageContentType?: 'prose' | 'poem' | 'numbered_sentences'
  passageLines?: SHSATPoemLine[]
  question: SHSATQuestion
  difficulty: Difficulty
}

interface RCPassageGroup {
  passageId: string
  passageTitle: string
  difficulty: Difficulty
  questions: PoolQuestion[]
}

export interface AdaptivePool {
  rcPassageGroups: RCPassageGroup[]
  revEditAQuestions: PoolQuestion[]
  revEditBQuestions: PoolQuestion[]
  mathQuestions: PoolQuestion[]
}

// ─── Adaptive state ───────────────────────────────────────────────────────────

type AdaptiveSection = 'rc' | 'revdit_a' | 'revdit_b' | 'math'

export interface AdaptiveState {
  currentSection: AdaptiveSection
  seenPassageIds: Set<string>
  seenQuestionIds: Set<string>
  recentResults: boolean[]
  currentDifficulty: Difficulty
}

// ─── Build pool from form ─────────────────────────────────────────────────────

export function buildPool(form: SHSATForm): AdaptivePool {
  const rcPassageGroups: RCPassageGroup[] = []
  const revEditAQuestions: PoolQuestion[] = []
  const revEditBQuestions: PoolQuestion[] = []
  const mathQuestions: PoolQuestion[] = []

  form.subsections.forEach((sub, subIdx) => {
    if (sub.type === 'reading_comprehension' && sub.passages) {
      for (const passage of sub.passages) {
        const pDiff = PASSAGE_META[passage.id]?.difficulty ?? 'medium'
        const pqs: PoolQuestion[] = passage.questions.map(q => ({
          questionId: q.id,
          subIdx,
          subType: sub.type as SHSATSubsectionType,
          passageId: passage.id,
          passageTitle: passage.title,
          passageContent: passage.content,
          passageAuthor: passage.author,
          passageContentType: passage.contentType,
          passageLines: passage.lines,
          question: q,
          difficulty: QUESTION_META[q.id]?.difficulty ?? pDiff,
        }))
        rcPassageGroups.push({
          passageId: passage.id,
          passageTitle: passage.title,
          difficulty: pDiff,
          questions: pqs,
        })
      }
    } else if (sub.type === 'revising_editing_a' && sub.passages) {
      const passage = sub.passages[0]
      if (passage) {
        for (const q of passage.questions) {
          revEditAQuestions.push({
            questionId: q.id,
            subIdx,
            subType: sub.type as SHSATSubsectionType,
            passageId: passage.id,
            passageTitle: passage.title,
            passageContent: passage.content,
            passageAuthor: passage.author,
            passageContentType: passage.contentType,
            passageLines: passage.lines,
            question: q,
            difficulty: QUESTION_META[q.id]?.difficulty ?? 'medium',
          })
        }
      }
    } else if (sub.type === 'revising_editing_b' && sub.questions) {
      for (const q of sub.questions) {
        revEditBQuestions.push({
          questionId: q.id,
          subIdx,
          subType: sub.type as SHSATSubsectionType,
          question: q,
          difficulty: QUESTION_META[q.id]?.difficulty ?? 'medium',
        })
      }
    } else if (sub.type === 'mathematics' && sub.questions) {
      for (const q of sub.questions) {
        mathQuestions.push({
          questionId: q.id,
          subIdx,
          subType: sub.type as SHSATSubsectionType,
          question: q,
          difficulty: QUESTION_META[q.id]?.difficulty ?? 'medium',
        })
      }
    }
  })

  return { rcPassageGroups, revEditAQuestions, revEditBQuestions, mathQuestions }
}

// ─── Initial state ────────────────────────────────────────────────────────────

export function createAdaptiveState(): AdaptiveState {
  return {
    currentSection: 'rc',
    seenPassageIds: new Set(),
    seenQuestionIds: new Set(),
    recentResults: [],
    currentDifficulty: 'medium',
  }
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const DIFF_LEVELS: Difficulty[] = ['easy', 'medium', 'hard']

function clampDiff(d: Difficulty, dir: 'up' | 'down' | 'stay'): Difficulty {
  const idx = DIFF_LEVELS.indexOf(d)
  if (dir === 'up')   return DIFF_LEVELS[Math.min(idx + 1, 2)]
  if (dir === 'down') return DIFF_LEVELS[Math.max(idx - 1, 0)]
  return d
}

function pickByDifficulty<T extends { difficulty: Difficulty }>(
  candidates: T[],
  target: Difficulty,
): T {
  const targetIdx = DIFF_LEVELS.indexOf(target)
  return [...candidates].sort((a, b) => {
    const aIdx = DIFF_LEVELS.indexOf(a.difficulty)
    const bIdx = DIFF_LEVELS.indexOf(b.difficulty)
    const aDelta = Math.abs(aIdx - targetIdx)
    const bDelta = Math.abs(bIdx - targetIdx)
    if (aDelta !== bDelta) return aDelta - bDelta
    return bIdx - aIdx  // prefer harder on tie
  })[0]
}

// ─── Adaptive pick ────────────────────────────────────────────────────────────

/**
 * Pick the next batch of questions to show.
 *
 * Returns:
 *  - An RC passage's full question list (batch > 1) — all shown before next pick
 *  - A single RevEdit A/B or Math question (batch = 1)
 *  - Empty array when the current section is exhausted
 *
 * Pass wasCorrect=null on the very first call (no prior answer).
 */
export function pickNext(
  state: AdaptiveState,
  pool: AdaptivePool,
  wasCorrect: boolean | null,
): { nextBatch: PoolQuestion[]; nextState: AdaptiveState } {
  // Update rolling window and difficulty target
  let s = { ...state }

  if (wasCorrect !== null) {
    const recent = [...state.recentResults, wasCorrect].slice(-3)
    const correct = recent.filter(Boolean).length
    const wrong   = recent.length - correct
    const dir: 'up' | 'down' | 'stay' =
      correct >= 2 ? 'up' : wrong >= 2 ? 'down' : 'stay'
    s = { ...s, recentResults: recent, currentDifficulty: clampDiff(s.currentDifficulty, dir) }
  }

  const diff = s.currentDifficulty

  // RC: pick next unseen passage as a unit
  if (s.currentSection === 'rc') {
    const unseen = pool.rcPassageGroups.filter(p => !s.seenPassageIds.has(p.passageId))
    if (unseen.length > 0) {
      const chosen = pickByDifficulty(unseen, diff)
      const nextState: AdaptiveState = {
        ...s,
        seenPassageIds: new Set([...s.seenPassageIds, chosen.passageId]),
        seenQuestionIds: new Set([...s.seenQuestionIds, ...chosen.questions.map(q => q.questionId)]),
      }
      return { nextBatch: chosen.questions, nextState }
    }
    s = { ...s, currentSection: 'revdit_a' }
  }

  // RevEdit A: pick individual questions adaptively
  if (s.currentSection === 'revdit_a') {
    const unseen = pool.revEditAQuestions.filter(q => !s.seenQuestionIds.has(q.questionId))
    if (unseen.length > 0) {
      const chosen = pickByDifficulty(unseen, diff)
      return {
        nextBatch: [chosen],
        nextState: { ...s, seenQuestionIds: new Set([...s.seenQuestionIds, chosen.questionId]) },
      }
    }
    s = { ...s, currentSection: 'revdit_b' }
  }

  // RevEdit B: pick individual questions adaptively
  if (s.currentSection === 'revdit_b') {
    const unseen = pool.revEditBQuestions.filter(q => !s.seenQuestionIds.has(q.questionId))
    if (unseen.length > 0) {
      const chosen = pickByDifficulty(unseen, diff)
      return {
        nextBatch: [chosen],
        nextState: { ...s, seenQuestionIds: new Set([...s.seenQuestionIds, chosen.questionId]) },
      }
    }
    s = { ...s, currentSection: 'math' }
  }

  // Math: pick individual questions adaptively
  if (s.currentSection === 'math') {
    const unseen = pool.mathQuestions.filter(q => !s.seenQuestionIds.has(q.questionId))
    if (unseen.length > 0) {
      const chosen = pickByDifficulty(unseen, diff)
      return {
        nextBatch: [chosen],
        nextState: { ...s, seenQuestionIds: new Set([...s.seenQuestionIds, chosen.questionId]) },
      }
    }
  }

  return { nextBatch: [], nextState: s }
}

// ─── Domain accuracy for results ─────────────────────────────────────────────

export interface DomainAccuracy {
  label: string
  correct: number
  total: number
}

export function computeDomainAccuracy(
  shownQIds: string[],
  correctQIds: Set<string>,
): DomainAccuracy[] {
  const buckets: Record<string, { label: string; correct: number; total: number }> = {
    reading_comprehension: { label: 'Reading Comprehension', correct: 0, total: 0 },
    revising_editing:     { label: 'Revising & Editing',     correct: 0, total: 0 },
    math:                 { label: 'Mathematics',             correct: 0, total: 0 },
  }

  for (const qId of shownQIds) {
    const meta = QUESTION_META[qId]
    if (!meta) continue
    const key = meta.section === 'math'
      ? 'math'
      : meta.domain === 'reading_comprehension'
        ? 'reading_comprehension'
        : 'revising_editing'
    buckets[key].total++
    if (correctQIds.has(qId)) buckets[key].correct++
  }

  return Object.values(buckets).filter(b => b.total > 0)
}

// ─── Difficulty accuracy for results ─────────────────────────────────────────

export interface DifficultyAccuracy {
  label: string
  difficulty: Difficulty
  correct: number
  total: number
}

export function computeDifficultyAccuracy(
  shownQIds: string[],
  correctQIds: Set<string>,
): DifficultyAccuracy[] {
  const buckets: Record<Difficulty, DifficultyAccuracy> = {
    easy:   { label: 'Easy',   difficulty: 'easy',   correct: 0, total: 0 },
    medium: { label: 'Medium', difficulty: 'medium', correct: 0, total: 0 },
    hard:   { label: 'Hard',   difficulty: 'hard',   correct: 0, total: 0 },
  }

  for (const qId of shownQIds) {
    const meta = QUESTION_META[qId]
    if (!meta) continue
    buckets[meta.difficulty].total++
    if (correctQIds.has(qId)) buckets[meta.difficulty].correct++
  }

  return Object.values(buckets).filter(b => b.total > 0)
}
