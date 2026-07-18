'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allMathSkills } from '@/lib/academy/math'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
  ALGEBRA_SKILL_SLUGS,
  ADVANCED_MATH_SKILL_SLUGS,
  PSDA_SKILL_SLUGS,
  GEO_TRIG_SKILL_SLUGS,
  type MathDomainSlug,
} from '@/lib/academy/math/skill-mapping'
import type { DrillQuestion } from '@/lib/academy/math/types'
import type { AnswerLabel } from '@/lib/academy/types'

// ── Types ──────────────────────────────────────────────────────────────────────

type Mode = 'quick' | 'standard' | 'full'
type DomainFilter = 'all' | MathDomainSlug
type Phase = 'setup' | 'quiz' | 'summary'

interface EnrichedQuestion extends DrillQuestion {
  skillTitle: string
  domain: MathDomainSlug
}

interface QuizAnswer {
  selected: AnswerLabel | null
  correct: boolean
  identifiedSkill: string | null
  skillCorrect: boolean | null
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let s = seed
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function buildPool(filter: DomainFilter): EnrichedQuestion[] {
  const pool: EnrichedQuestion[] = []
  for (const skill of allMathSkills) {
    if (filter !== 'all' && skill.domain !== filter) continue
    for (const q of skill.drillQuestions) {
      pool.push({ ...q, skillTitle: skill.title, domain: skill.domain })
    }
  }
  return pool
}

function selectQuestions(filter: DomainFilter, count: number, seed: number): EnrichedQuestion[] {
  const pool = buildPool(filter)
  const shuffled = shuffle(pool, seed)
  return shuffled.slice(0, count)
}

const MODE_COUNTS: Record<Mode, number> = { quick: 10, standard: 22, full: 44 }

const DOMAIN_ORDER: MathDomainSlug[] = [
  'algebra',
  'advanced-math',
  'problem-solving-data-analysis',
  'geometry-trigonometry',
]

// ── Domain filter options ──────────────────────────────────────────────────────

const DOMAIN_FILTERS: { value: DomainFilter; label: string }[] = [
  { value: 'all', label: 'All Domains' },
  { value: 'algebra', label: 'Algebra' },
  { value: 'advanced-math', label: 'Advanced Math' },
  { value: 'problem-solving-data-analysis', label: 'PSDA' },
  { value: 'geometry-trigonometry', label: 'Geometry' },
]

// ── Setup screen ───────────────────────────────────────────────────────────────

function SetupScreen({ onStart }: { onStart: (mode: Mode, filter: DomainFilter) => void }) {
  const [mode, setMode] = useState<Mode>('standard')
  const [filter, setFilter] = useState<DomainFilter>('all')

  const modes: { value: Mode; label: string; sub: string }[] = [
    { value: 'quick', label: 'Quick Mix', sub: '10 questions · ~8 min' },
    { value: 'standard', label: 'Standard Mix', sub: '22 questions · ~18 min' },
    { value: 'full', label: 'Full Mix', sub: '44 questions · ~35 min' },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mixed Math Practice</h1>
        <p className="mt-1 text-sm text-slate-500">
          Questions from all four domains mixed together without skill labels.
          After each answer you&apos;ll see the skill, domain, and explanation.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">Mode</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {modes.map(m => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  mode === m.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <p className={cn('text-sm font-semibold', mode === m.value ? 'text-indigo-700' : 'text-slate-800')}>
                  {m.label}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{m.sub}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">Domain filter</p>
          <div className="flex gap-2 flex-wrap">
            {DOMAIN_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'rounded-full border px-3 py-1 text-[12px] font-medium transition-colors',
                  filter === f.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-[12px] text-indigo-800">
          Skill labels are hidden during practice. You&apos;ll see the skill and domain only after answering.
        </div>

        <button
          onClick={() => onStart(mode, filter)}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition-colors"
        >
          Start {MODE_COUNTS[mode]}-Question Mix →
        </button>
      </div>
    </div>
  )
}

// ── Skill identification panel ─────────────────────────────────────────────────

interface SkillCheckProps {
  question: EnrichedQuestion
  onIdentify: (slug: string | null) => void
  onNext: () => void
}

const DOMAIN_SKILL_SLUGS: Record<MathDomainSlug, readonly string[]> = {
  'algebra': ALGEBRA_SKILL_SLUGS,
  'advanced-math': ADVANCED_MATH_SKILL_SLUGS,
  'problem-solving-data-analysis': PSDA_SKILL_SLUGS,
  'geometry-trigonometry': GEO_TRIG_SKILL_SLUGS,
}

function SkillCheckPanel({ question, onIdentify, onNext }: SkillCheckProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  function handleSelect(slug: string) {
    if (revealed) return
    setSelected(slug)
    onIdentify(slug)
    setRevealed(true)
  }

  const correct = selected === question.skillSlug

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <p className="text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
        Which skill was this question testing?
      </p>
      <div className="space-y-3">
        {DOMAIN_ORDER.map(domain => (
          <div key={domain}>
            <p className={cn('text-[10px] font-semibold uppercase tracking-wider mb-1.5 px-1', MATH_DOMAIN_BADGE_CLASS[domain].split(' ').find(c => c.startsWith('text-')))}>
              {MATH_DOMAIN_DISPLAY[domain]}
            </p>
            <div className="grid gap-1 sm:grid-cols-2">
              {DOMAIN_SKILL_SLUGS[domain].map(slug => {
                let cls = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                if (revealed) {
                  if (slug === question.skillSlug) cls = 'border-indigo-500 bg-indigo-50 text-indigo-800 font-semibold'
                  else if (slug === selected) cls = 'border-red-300 bg-red-50 text-red-700'
                  else cls = 'border-slate-100 bg-white text-slate-400'
                } else if (slug === selected) {
                  cls = 'border-indigo-400 bg-indigo-50 text-indigo-700'
                }
                return (
                  <button
                    key={slug}
                    onClick={() => handleSelect(slug)}
                    disabled={revealed}
                    className={cn('rounded-md border px-2 py-1.5 text-left text-[12px] transition-colors disabled:cursor-default', cls)}
                  >
                    {MATH_SKILL_DISPLAY_NAMES[slug as keyof typeof MATH_SKILL_DISPLAY_NAMES]}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {revealed && (
        <p className={cn('text-[12px] font-medium', correct ? 'text-indigo-700' : 'text-red-600')}>
          {correct
            ? 'Correct identification!'
            : `This tested ${MATH_SKILL_DISPLAY_NAMES[question.skillSlug as keyof typeof MATH_SKILL_DISPLAY_NAMES] ?? question.skillSlug}.`}
        </p>
      )}

      <button
        onClick={onNext}
        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 transition-colors"
      >
        Next Question →
      </button>
    </div>
  )
}

// ── Question card ──────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: EnrichedQuestion
  index: number
  total: number
  onAnswer: (answer: AnswerLabel) => void
}

function QuestionCard({ question, index, total, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)

  function handleSelect(label: AnswerLabel) {
    if (selected) return
    setSelected(label)
    setRevealed(true)
    onAnswer(label)
  }

  const isCorrect = selected === question.correctAnswer

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-500">Question {index + 1} of {total}</span>
        <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Mixed Math</span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        {question.stimulus && (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {question.stimulus}
          </div>
        )}

        <p className="text-sm font-medium text-slate-900">{question.question}</p>

        <div className="space-y-2">
          {question.choices.map(choice => {
            const isSelected = selected === choice.label
            const isRight = choice.label === question.correctAnswer
            let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
            if (revealed) {
              if (isRight) cls = 'border-indigo-500 bg-indigo-50 text-indigo-800'
              else if (isSelected) cls = 'border-red-400 bg-red-50 text-red-700'
              else cls = 'border-slate-200 bg-white text-slate-400'
            } else if (isSelected) {
              cls = 'border-indigo-400 bg-indigo-50 text-indigo-700'
            }
            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label as AnswerLabel)}
                disabled={!!selected}
                className={cn(
                  'w-full flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors disabled:cursor-default',
                  cls,
                )}
              >
                <span className="shrink-0 font-semibold">{choice.label}.</span>
                <span>{choice.text}</span>
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className={cn(
            'rounded-lg border p-3 text-sm',
            isCorrect ? 'border-indigo-200 bg-indigo-50 text-indigo-800' : 'border-red-200 bg-red-50 text-red-800',
          )}>
            <p className="font-semibold mb-1">{isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p className="text-[13px] leading-relaxed">{question.explanation}</p>
            {!isCorrect && selected && question.wrongAnswerExplanations?.[selected] && (
              <p className="mt-2 text-[12px] opacity-80">
                <span className="font-medium">Why {selected} is wrong: </span>
                {question.wrongAnswerExplanations[selected]}
              </p>
            )}
            <p className="mt-2 text-[11px] italic text-current opacity-70">{question.teachingPoint}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Summary screen ─────────────────────────────────────────────────────────────

interface SummaryProps {
  questions: EnrichedQuestion[]
  answers: QuizAnswer[]
  onRestart: () => void
}

function SummaryScreen({ questions, answers, onRestart }: SummaryProps) {
  const correct = answers.filter(a => a.correct).length
  const total = answers.length
  const pct = Math.round((correct / total) * 100)

  const skillCorrect = answers.filter(a => a.skillCorrect === true).length
  const skillAttempted = answers.filter(a => a.skillCorrect !== null).length

  // By domain
  const byDomain: Record<string, { label: string; correct: number; total: number }> = {}
  // By skill
  const bySkill: Record<string, { title: string; domain: MathDomainSlug; correct: number; total: number }> = {}

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    const a = answers[i]

    if (!byDomain[q.domain]) byDomain[q.domain] = { label: MATH_DOMAIN_DISPLAY[q.domain], correct: 0, total: 0 }
    byDomain[q.domain].total++
    if (a.correct) byDomain[q.domain].correct++

    if (!bySkill[q.skillSlug]) bySkill[q.skillSlug] = { title: q.skillTitle, domain: q.domain, correct: 0, total: 0 }
    bySkill[q.skillSlug].total++
    if (a.correct) bySkill[q.skillSlug].correct++
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Practice Complete</h2>
        <p className="mt-1 text-sm text-slate-500">
          {correct}/{total} correct · {pct}% accuracy
          {skillAttempted > 0 && ` · ${skillCorrect}/${skillAttempted} skill identifications correct`}
        </p>
      </div>

      <div className={cn(
        'rounded-xl border p-5 text-center',
        pct >= 85 ? 'border-indigo-300 bg-indigo-50' : pct >= 70 ? 'border-blue-200 bg-blue-50' : 'border-amber-200 bg-amber-50',
      )}>
        <p className={cn(
          'text-4xl font-bold',
          pct >= 85 ? 'text-indigo-700' : pct >= 70 ? 'text-blue-700' : 'text-amber-700',
        )}>{pct}%</p>
        <p className="text-sm text-slate-600 mt-1">{correct} of {total} correct</p>
      </div>

      {/* By domain */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="text-sm font-semibold text-slate-700">By Domain</p>
        <div className="space-y-2">
          {DOMAIN_ORDER.map(domain => {
            const d = byDomain[domain]
            if (!d) return null
            const p = Math.round((d.correct / d.total) * 100)
            return (
              <div key={domain} className="flex items-center gap-3">
                <span className={cn('text-[11px] font-semibold w-36 shrink-0 truncate', MATH_DOMAIN_BADGE_CLASS[domain].split(' ').find(c => c.startsWith('text-')))}>
                  {MATH_DOMAIN_DISPLAY[domain]}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', p >= 80 ? 'bg-indigo-500' : p >= 60 ? 'bg-blue-400' : 'bg-amber-400')}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 w-12 text-right">{d.correct}/{d.total}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* By skill */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="text-sm font-semibold text-slate-700">By Skill</p>
        <div className="space-y-2">
          {Object.entries(bySkill).map(([slug, data]) => {
            const p = Math.round((data.correct / data.total) * 100)
            return (
              <div key={slug} className="flex items-center gap-3">
                <Link href={`/sat-math-academy/lesson/${slug}`} className="text-[12px] text-indigo-600 hover:underline w-44 shrink-0 truncate">
                  {data.title}
                </Link>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', p >= 80 ? 'bg-indigo-500' : p >= 60 ? 'bg-blue-400' : 'bg-amber-400')}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 w-12 text-right">{data.correct}/{data.total}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition-colors"
        >
          Practice Again
        </button>
        <Link
          href="/sat-math-academy"
          className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold py-3 text-center hover:bg-slate-50 transition-colors text-sm"
        >
          Back to Academy
        </Link>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MixedMathPracticePage() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [questions, setQuestions] = useState<EnrichedQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [showSkillCheck, setShowSkillCheck] = useState(false)
  const [pendingAnswer, setPendingAnswer] = useState<AnswerLabel | null>(null)
  const [initialSeed] = useState<number>(() => Date.now())
  const seedRef = useRef(initialSeed)

  function handleStart(m: Mode, filter: DomainFilter) {
    const count = MODE_COUNTS[m]
    const qs = selectQuestions(filter, count, seedRef.current)
    setQuestions(qs)
    setCurrentIndex(0)
    setAnswers([])
    setShowSkillCheck(false)
    setPendingAnswer(null)
    setPhase('quiz')
  }

  function handleAnswer(answer: AnswerLabel) {
    setPendingAnswer(answer)
    setShowSkillCheck(true)
  }

  function handleSkillIdentified(identified: string | null) {
    const q = questions[currentIndex]
    const isCorrect = pendingAnswer === q.correctAnswer
    const skillCorrect = identified !== null ? identified === q.skillSlug : null

    setAnswers(prev => [...prev, {
      selected: pendingAnswer,
      correct: isCorrect,
      identifiedSkill: identified,
      skillCorrect,
    }])

    void fetch('/api/academy/math-attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: q.id,
        skillSlug: q.skillSlug,
        difficulty: q.difficulty,
        selectedAnswer: pendingAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        practiceMode: 'mixed_practice',
      }),
    }).catch(() => null)
  }

  function handleNext() {
    setShowSkillCheck(false)
    setPendingAnswer(null)
    if (currentIndex + 1 >= questions.length) {
      setPhase('summary')
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  if (phase === 'setup') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <SetupScreen onStart={handleStart} />
      </div>
    )
  }

  if (phase === 'summary') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <SummaryScreen
          questions={questions}
          answers={answers}
          onRestart={() => {
            seedRef.current = seedRef.current + 1
            setPhase('setup')
          }}
        />
      </div>
    )
  }

  const current = questions[currentIndex]

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl space-y-4">
      <QuestionCard
        key={current.id}
        question={current}
        index={currentIndex}
        total={questions.length}
        onAnswer={handleAnswer}
      />
      {showSkillCheck && (
        <SkillCheckPanel
          question={current}
          onIdentify={handleSkillIdentified}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
