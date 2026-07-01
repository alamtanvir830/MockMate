import type { SATForm, SATModule, SATQuestion, MathMCQuestion, MathGridInQuestion } from './types'
import { satForm1 } from './form-1'
import { satForm2 } from './form-2'
import { satForm3 } from './form-3'

export function getSkill(q: SATQuestion): string {
  return (q as { skill: string }).skill
}

export function getCorrectAnswer(q: SATQuestion): string {
  if (q.section === 'reading-writing') return q.correctAnswer
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return (mq as MathMCQuestion).correctAnswer
  return (mq as MathGridInQuestion).correctAnswer
}

function normalizeGridIn(raw: string): string {
  return raw.trim().replace(/\s+/g, '')
}

export function isAnswerCorrect(q: SATQuestion, answer: string | undefined): boolean {
  if (!answer?.trim()) return false
  if (q.section === 'reading-writing') return answer === q.correctAnswer
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return answer === (mq as MathMCQuestion).correctAnswer
  const gi = mq as MathGridInQuestion
  const norm = normalizeGridIn(answer)
  return gi.acceptableAnswers.some(a => normalizeGridIn(a) === norm)
}

const FORMS: Record<string, SATForm> = {
  'sat-form-1': satForm1,
  'sat-form-2': satForm2,
  'sat-form-3': satForm3,
}

export interface ResolvedModules {
  rwM1: SATModule
  rwM2: SATModule
  mathM1: SATModule
  mathM2: SATModule
}

export function resolveModules(
  examId: string,
  rwM2Type: 'easy' | 'hard',
  mathM2Type: 'easy' | 'hard',
): ResolvedModules | null {
  const form = FORMS[examId]
  if (!form) return null
  const rwSection = form.sections[0]
  const mathSection = form.sections[1]
  return {
    rwM1:   rwSection.modules[0],
    rwM2:   rwM2Type === 'easy' ? rwSection.modules[1] : rwSection.modules[2],
    mathM1: mathSection.modules[0],
    mathM2: mathM2Type === 'easy' ? mathSection.modules[1] : mathSection.modules[2],
  }
}

export function formNumberFromId(examId: string): number | null {
  const m = examId.match(/sat-form-(\d+)/)
  return m ? parseInt(m[1], 10) : null
}
