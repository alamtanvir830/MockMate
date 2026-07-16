'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { allSkills } from '@/lib/academy'
import { SKILL_DISPLAY_NAMES } from '@/lib/academy/skill-mapping'
import { getDomainForSkill, DOMAINS } from '@/lib/academy/types'
import { ReportIssueButton } from '@/components/academy/ReportIssueButton'
import type { DrillQuestion, AnswerLabel } from '@/lib/academy/types'

// ── Types ──────────────────────────────────────────────────────────────────────

type Mode = 'quick' | 'standard' | 'full'
type Filter = 'all' | 'writing' | 'reading'
type Phase = 'setup' | 'quiz' | 'review' | 'summary'

interface EnrichedQuestion extends DrillQuestion {
  skillTitle: string
  skillSection: 'reading' | 'writing'
}

interface QuizAnswer {
  questionIndex: number
  selected: AnswerLabel | null
  correct: boolean
  identifiedType: string | null
  typeCorrect: boolean | null
}

// ── Build question pool ────────────────────────────────────────────────────────

function buildPool(filter: Filter): EnrichedQuestion[] {
  const pool: EnrichedQuestion[] = []
  for (const skill of allSkills) {
    if (filter === 'writing' && skill.section !== 'writing') continue
    if (filter === 'reading' && skill.section !== 'reading') continue
    for (const q of skill.drillQuestions) {
      pool.push({ ...q, skillTitle: skill.title, skillSection: skill.section })
    }
  }
  return pool
}

// Deterministic Fisher-Yates shuffle using a seed derived from Date.now()
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

function selectQuestions(filter: Filter, count: number, seed: number): EnrichedQuestion[] {
  const pool = buildPool(filter)
  const shuffled = shuffle(pool, seed)
  return shuffled.slice(0, count)
}

const MODE_COUNTS: Record<Mode, number> = { quick: 10, standard: 27, full: 54 }

// ── Setup screen ───────────────────────────────────────────────────────────────

function SetupScreen({ onStart }: { onStart: (mode: Mode, filter: Filter) => void }) {
  const [mode, setMode] = useState<Mode>('standard')
  const [filter, setFilter] = useState<Filter>('all')

  const modes: { value: Mode; label: string; sub: string }[] = [
    { value: 'quick', label: 'Quick Mix', sub: '10 questions · ~8 min' },
    { value: 'standard', label: 'Standard Mix', sub: '27 questions · ~20 min' },
    { value: 'full', label: 'Full R&W Practice', sub: '54 questions · ~40 min' },
  ]

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All Skills' },
    { value: 'writing', label: 'Writing Only' },
    { value: 'reading', label: 'Reading Only' },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mixed R&W Practice</h1>
        <p className="mt-1 text-sm text-slate-500">
          Questions from all four domains, mixed together without skill labels.
          After each question you{'’'}ll see the skill, domain, and explanation.
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
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <p className={cn('text-sm font-semibold', mode === m.value ? 'text-emerald-700' : 'text-slate-800')}>
                  {m.label}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{m.sub}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">Filter</p>
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'rounded-full border px-3 py-1 text-[12px] font-medium transition-colors',
                  filter === f.value
                    ? 'border-sky-500 bg-sky-50 text-sky-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[12px] text-amber-800">
          Skill labels are hidden during practice. You{'’'}ll see the skill name only after answering.
        </div>

        <button
          onClick={() => onStart(mode, filter)}
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors"
        >
          Start {MODE_COUNTS[mode]}-Question Mix →
        </button>
      </div>
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
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">Question {index + 1} of {total}</span>
        <div className="h-1.5 flex-1 mx-4 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${((index) / total) * 100}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Mixed Practice</span>
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
              if (isRight) cls = 'border-emerald-500 bg-emerald-50 text-emerald-800'
              else if (isSelected && !isRight) cls = 'border-red-400 bg-red-50 text-red-700'
              else cls = 'border-slate-200 bg-white text-slate-400'
            } else if (isSelected) {
              cls = 'border-sky-400 bg-sky-50 text-sky-800'
            }

            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label)}
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
            isCorrect
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800',
          )}>
            <p className="font-semibold mb-1">{isCorrect ? 'Correct' : 'Incorrect'}</p>
            <p className="text-[13px] leading-relaxed">{question.explanation}</p>
            {!isCorrect && selected && question.wrongAnswerExplanations[selected] && (
              <p className="mt-2 text-[12px] opacity-80">
                <span className="font-medium">Why {selected} is wrong: </span>
                {question.wrongAnswerExplanations[selected]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Post-question type identification ─────────────────────────────────────────

interface TypeCheckProps {
  question: EnrichedQuestion
  onIdentify: (identified: string | null) => void
  onNext: () => void
}

function TypeCheckPanel({ question, onIdentify, onNext }: TypeCheckProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const skills = allSkills.map(s => s.slug)
  const skillOptions = allSkills.map(s => s.slug)

  function handleSelect(slug: string) {
    if (revealed) return
    setSelected(slug)
    onIdentify(slug)
    setRevealed(true)
  }

  const correct = selected === question.skillSlug

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 mt-3">
      <p className="text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
        Which skill was this question testing?
      </p>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {allSkills.map(s => {
          let cls = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
          if (revealed) {
            if (s.slug === question.skillSlug) cls = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold'
            else if (s.slug === selected) cls = 'border-red-300 bg-red-50 text-red-700'
            else cls = 'border-slate-200 bg-white text-slate-400'
          } else if (s.slug === selected) {
            cls = 'border-sky-400 bg-sky-50 text-sky-700'
          }
          return (
            <button
              key={s.slug}
              onClick={() => handleSelect(s.slug)}
              disabled={revealed}
              className={cn('rounded-md border px-2 py-1.5 text-left text-[12px] transition-colors disabled:cursor-default', cls)}
            >
              {s.title}
            </button>
          )
        })}
      </div>
      {revealed && (
        <p className={cn('text-[12px] font-medium', correct ? 'text-emerald-700' : 'text-red-600')}>
          {correct ? 'Correct identification!' : `This tested ${SKILL_DISPLAY_NAMES[question.skillSlug] ?? question.skillSlug}.`}
        </p>
      )}
      <button
        onClick={onNext}
        className="w-full rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 transition-colors mt-1"
      >
        Next Question →
      </button>
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

  const typeCorrect = answers.filter(a => a.typeCorrect === true).length
  const typeAttempted = answers.filter(a => a.typeCorrect !== null).length

  const bySkill: Record<string, { title: string; correct: number; total: number }> = {}
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    const a = answers[i]
    if (!bySkill[q.skillSlug]) bySkill[q.skillSlug] = { title: q.skillTitle, correct: 0, total: 0 }
    bySkill[q.skillSlug].total++
    if (a.correct) bySkill[q.skillSlug].correct++
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Practice Complete</h2>
        <p className="mt-1 text-sm text-slate-500">
          {correct}/{total} correct · {pct}% accuracy
          {typeAttempted > 0 && ` · ${typeCorrect}/${typeAttempted} skill identifications correct`}
        </p>
      </div>

      <div className={cn(
        'rounded-xl border p-5 text-center',
        pct >= 85 ? 'border-emerald-300 bg-emerald-50' : pct >= 70 ? 'border-blue-200 bg-blue-50' : 'border-amber-200 bg-amber-50',
      )}>
        <p className={cn(
          'text-4xl font-bold',
          pct >= 85 ? 'text-emerald-700' : pct >= 70 ? 'text-blue-700' : 'text-amber-700',
        )}>{pct}%</p>
        <p className="text-sm text-slate-600 mt-1">{correct} of {total} correct</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="text-sm font-semibold text-slate-700">By Skill</p>
        <div className="space-y-2">
          {Object.entries(bySkill).map(([slug, data]) => {
            const p = Math.round((data.correct / data.total) * 100)
            return (
              <div key={slug} className="flex items-center gap-3">
                <span className="text-[12px] text-slate-600 w-44 shrink-0">{data.title}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', p >= 80 ? 'bg-emerald-500' : p >= 60 ? 'bg-sky-500' : 'bg-amber-500')}
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
          className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors"
        >
          Practice Again
        </button>
        <a
          href="/sat-rw-academy/review"
          className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold py-3 text-center hover:bg-slate-50 transition-colors text-sm"
        >
          Review Queue
        </a>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MixedPracticePage() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [mode, setMode] = useState<Mode>('standard')
  const [questions, setQuestions] = useState<EnrichedQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [showTypeCheck, setShowTypeCheck] = useState(false)
  const [pendingAnswer, setPendingAnswer] = useState<AnswerLabel | null>(null)
  const seedRef = useRef(Date.now())

  function handleStart(m: Mode, filter: Filter) {
    const count = MODE_COUNTS[m]
    const qs = selectQuestions(filter, count, seedRef.current)
    setMode(m)
    setQuestions(qs)
    setCurrentIndex(0)
    setAnswers([])
    setShowTypeCheck(false)
    setPendingAnswer(null)
    setPhase('quiz')

    // Save attempts async (fire and forget)
    for (const q of qs) {
      void saveAttemptPlaceholder(q)
    }
  }

  async function saveAttemptPlaceholder(_q: EnrichedQuestion) {
    // Attempts are saved after answering, not before
  }

  function handleAnswer(answer: AnswerLabel) {
    setPendingAnswer(answer)
    setShowTypeCheck(true)
  }

  function handleTypeIdentified(identified: string | null) {
    const q = questions[currentIndex]
    const correct = pendingAnswer === q.correctAnswer
    const typeCorrect = identified !== null ? identified === q.skillSlug : null

    const newAnswer: QuizAnswer = {
      questionIndex: currentIndex,
      selected: pendingAnswer,
      correct,
      identifiedType: identified,
      typeCorrect,
    }
    setAnswers(prev => [...prev, newAnswer])

    // Save attempt to backend
    void fetch('/api/academy/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: q.id,
        skillSlug: q.skillSlug,
        subskillSlug: q.subskill,
        difficulty: q.difficulty,
        selectedAnswer: pendingAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: correct,
        sourceType: 'mixed_practice',
        sourceId: `mixed-${mode}-${seedRef.current}`,
        practiceMode: 'mixed_practice',
        domainSlug: getDomainForSkill(q.skillSlug),
        questionTypeIdentified: identified,
        questionTypeCorrect: typeCorrect,
      }),
    }).catch(() => null)
  }

  function handleNext() {
    setShowTypeCheck(false)
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
            seedRef.current = Date.now()
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
      {showTypeCheck && (
        <TypeCheckPanel
          question={current}
          onIdentify={handleTypeIdentified}
          onNext={handleNext}
        />
      )}
      <div className="flex justify-between items-center pt-1">
        <ReportIssueButton
          contentType="drill_question"
          contentId={current.id}
          contentVersion={current.contentVersion ?? 1}
        />
      </div>
    </div>
  )
}
