import type { PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { rwModule1Questions } from '@/lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '@/lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '@/lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions } from '@/lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions } from '@/lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions } from '@/lib/premade-exams/sat/math-module-2-hard'
import type { SATQuestion } from '@/lib/premade-exams/sat/types'
import type { QBDifficulty, QBDomain, QBSection } from '@/lib/question-bank/types'

const RW_DOMAIN_SET = new Set([
  'Craft and Structure',
  'Information and Ideas',
  'Expression of Ideas',
  'Standard English Conventions',
])

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

function pickDifficulties(accuracy: number): QBDifficulty[] {
  if (accuracy < 0.50) return ['easy', 'medium']
  if (accuracy < 0.70) return ['medium']
  if (accuracy < 0.85) return ['medium', 'hard']
  return ['hard']
}

function pickCount(accuracy: number): number {
  if (accuracy < 0.50) return 15
  if (accuracy < 0.70) return 12
  if (accuracy < 0.85) return 10
  return 8
}

export interface PersonalizedSetCard {
  key: string
  section: QBSection
  domain: QBDomain
  sectionLabel: string
  weakestSkill: string
  accuracyPct: number
  count: number
  difficulties: QBDifficulty[]
  focusDescription: string
  practiceUrl: string
}

export function buildPersonalizedSets(attempt: PremadeAttempt): PersonalizedSetCard[] {
  const rwM2 = attempt.rwM2Type === 'easy' ? rwModule2EasyQuestions : rwModule2HardQuestions
  const mathM2 = attempt.mathM2Type === 'easy' ? mathModule2EasyQuestions : mathModule2HardQuestions

  const allSeen: SATQuestion[] = [
    ...rwModule1Questions,
    ...rwM2,
    ...mathModule1Questions,
    ...mathM2,
  ]

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

  return sorted.slice(0, 4).map((entry, i) => {
    const difficulties = pickDifficulties(entry.accuracy)
    const count = pickCount(entry.accuracy)
    const accuracyPct = Math.round(entry.accuracy * 100)

    const params = new URLSearchParams({
      section: entry.section,
      domains: entry.domain,
      difficulties: difficulties.join(','),
      count: String(count),
      mode: 'personalized',
      sourceAttemptId: attempt.id,
    })

    const focusDescription =
      accuracyPct < 50
        ? `You scored ${accuracyPct}% on this domain. Build up the fundamentals with easier questions first.`
        : accuracyPct < 70
        ? `You scored ${accuracyPct}% — a solid base. Sharpen your ${entry.weakestSkill} skills with focused practice.`
        : accuracyPct < 85
        ? `You scored ${accuracyPct}%. Push further with harder questions targeting ${entry.weakestSkill}.`
        : `You scored ${accuracyPct}%. Challenge yourself to maintain your edge on ${entry.weakestSkill}.`

    return {
      key: `${attempt.id}-set-${i}`,
      section: entry.section,
      domain: entry.domain,
      sectionLabel: entry.section === 'reading-writing' ? 'Reading & Writing' : 'Math',
      weakestSkill: entry.weakestSkill,
      accuracyPct,
      count,
      difficulties,
      focusDescription,
      practiceUrl: `/question-bank/sat/practice?${params.toString()}`,
    }
  })
}
