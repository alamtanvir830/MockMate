'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  MATH_DIAGNOSTIC_QUESTIONS,
  MATH_DIAGNOSTIC_TOTAL_QUESTIONS,
  type MathDiagnosticQuestion,
} from '@/lib/academy/math/diagnostic-questions'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
} from '@/lib/academy/math/skill-mapping'

// ── Progress persistence ───────────────────────────────────────────────────────

const STORAGE_KEY = 'sat_math_diagnostic_progress'

interface SavedProgress {
  clientToken: string
  answers: Record<string, string>
  questionIndex: number
  savedAt: number
}

function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as SavedProgress
    if (Date.now() - p.savedAt > 48 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return p
  } catch { return null }
}

function saveProgress(token: string, answers: Record<string, string>, questionIndex: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ clientToken: token, answers, questionIndex, savedAt: Date.now() }))
  } catch { /* ignore */ }
}

function clearProgress() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface MathDiagnosticResult {
  id: string
  correct_count: number
  incorrect_count: number
  omitted_count: number
  total_questions: number
  answered_questions: number
  accuracy_percentage: number
  skill_results: Record<string, { correct: number; total: number; pct: number; title: string; domain: string }>
  domain_results: Record<string, { correct: number; total: number; pct: number; title: string }>
  strongest_skill_slugs: string[]
  weakest_skill_slugs: string[]
  recommended_skill_slug: string | null
  completed_at: string
}

type Phase = 'intro' | 'quiz' | 'submitting' | 'results' | 'error'

// ── Intro screen ───────────────────────────────────────────────────────────────

function IntroScreen({ hasSaved, onStart, onResume }: { hasSaved: boolean; onStart: () => void; onResume: () => void }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Math Diagnostic</h1>
        <p className="mt-1 text-sm text-slate-500">Find your starting point across all 21 SAT Math skills.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: '42 questions', sub: '2 per skill' },
            { label: '21 skills', sub: '4 math domains' },
            { label: '~30 minutes', sub: 'untimed, go at your pace' },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
              <p className="text-base font-bold text-slate-900">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <ul className="space-y-2 text-sm text-slate-600">
          {[
            'Each question covers a different SAT Math skill.',
            'Your results show which domains and skills to prioritize first.',
            'This is an Academy diagnostic — not an official SAT score.',
          ].map(t => (
            <li key={t} className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold mt-0.5">✓</span>
              {t}
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-xs text-indigo-700">
          <span className="font-semibold">Tip:</span> You can use the Desmos calculator during the diagnostic — just as you would on the real SAT. Open it in a separate tab if needed.
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          {hasSaved && (
            <button
              onClick={onResume}
              className="flex-1 rounded-xl border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-3 transition-colors"
            >
              Resume Saved Progress →
            </button>
          )}
          <button
            onClick={onStart}
            className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition-colors"
          >
            {hasSaved ? 'Start Fresh' : 'Start Diagnostic →'}
          </button>
        </div>
      </div>

      <Link href="/sat-math-academy" className="inline-flex items-center text-sm text-indigo-600 hover:underline">
        ← Back to Math Academy
      </Link>
    </div>
  )
}

// ── Domain badge ───────────────────────────────────────────────────────────────

function DomainBadge({ skillSlug }: { skillSlug: string }) {
  const domainMap: Record<string, string> = {
    'linear-equations': 'algebra', 'linear-equations-two-variables': 'algebra',
    'linear-functions': 'algebra', 'systems-of-equations': 'algebra', 'linear-inequalities': 'algebra',
    'equivalent-expressions': 'advanced-math', 'quadratic-equations': 'advanced-math',
    'exponential-functions': 'advanced-math', 'polynomial-expressions': 'advanced-math',
    'radical-rational-equations': 'advanced-math', 'nonlinear-equations-systems': 'advanced-math',
    'ratios-rates-units': 'problem-solving-data-analysis', 'percentages': 'problem-solving-data-analysis',
    'one-variable-data': 'problem-solving-data-analysis', 'two-variable-data': 'problem-solving-data-analysis',
    'probability': 'problem-solving-data-analysis', 'statistical-claims': 'problem-solving-data-analysis',
    'area-volume': 'geometry-trigonometry', 'lines-angles-triangles': 'geometry-trigonometry',
    'right-triangles-trig': 'geometry-trigonometry', 'circles': 'geometry-trigonometry',
  }
  const domain = (domainMap[skillSlug] ?? 'algebra') as keyof typeof MATH_DOMAIN_BADGE_CLASS
  const badgeCls = MATH_DOMAIN_BADGE_CLASS[domain]
  const label = MATH_DOMAIN_DISPLAY[domain]
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium', badgeCls)}>
      {label}
    </span>
  )
}

// ── Quiz screen ────────────────────────────────────────────────────────────────

function QuizScreen({
  questions, initialAnswers, initialIndex, clientToken, onComplete,
}: {
  questions: MathDiagnosticQuestion[]
  initialAnswers: Record<string, string>
  initialIndex: number
  clientToken: string
  onComplete: (answers: Record<string, string>) => void
}) {
  const [qIdx, setQIdx] = useState(initialIndex)
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)

  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1
  const progress = Math.round(((qIdx + (revealed ? 1 : 0)) / questions.length) * 100)
  const skillTitle = MATH_SKILL_DISPLAY_NAMES[q.skillSlug] ?? q.skillSlug

  const handleReveal = useCallback(() => {
    if (!selected) return
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)
    setRevealed(true)
    saveProgress(clientToken, newAnswers, qIdx)
  }, [selected, q, answers, clientToken, qIdx])

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete(answers)
    } else {
      setQIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
    }
  }, [isLast, answers, onComplete])

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Math Diagnostic</h1>
          <p className="text-xs text-slate-400 mt-0.5">Question {qIdx + 1} of {questions.length}</p>
        </div>
        <span className="text-sm font-semibold text-slate-500">{progress}%</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2">
        <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {skillTitle}
        </span>
        <DomainBadge skillSlug={q.skillSlug} />
        <span className={cn(
          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
          q.difficulty === 'easy' ? 'bg-green-50 text-green-700 border border-green-200' :
          q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
          'bg-red-50 text-red-700 border border-red-200',
        )}>
          {q.difficulty}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        {q.stimulus && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{q.stimulus}</p>
          </div>
        )}
        <p className="text-sm font-medium text-slate-900">{q.question}</p>

        <div className="space-y-2">
          {q.choices.map(choice => {
            const isChoiceSelected = selected === choice.label
            const isCorrect = choice.label === q.correctAnswer
            let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
            if (revealed) {
              if (isCorrect) cls = 'border-indigo-500 bg-indigo-50 cursor-default'
              else if (isChoiceSelected) cls = 'border-red-400 bg-red-50 cursor-default'
              else cls = 'border-slate-100 bg-white opacity-40 cursor-default'
            } else if (isChoiceSelected) {
              cls = 'border-indigo-400 bg-indigo-50 cursor-pointer'
            }
            return (
              <button
                key={choice.label}
                disabled={revealed}
                onClick={() => !revealed && setSelected(choice.label)}
                className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">
                  {choice.label}
                </span>
                <span className="text-sm text-slate-700">{choice.text}</span>
              </button>
            )
          })}
        </div>

        {!revealed ? (
          <button
            disabled={!selected}
            onClick={handleReveal}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 transition-colors"
          >
            Submit
          </button>
        ) : (
          <div className="space-y-3">
            <div className={cn(
              'rounded-lg border p-3 text-sm',
              selected === q.correctAnswer ? 'border-indigo-300 bg-indigo-50' : 'border-red-300 bg-red-50',
            )}>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-1',
                selected === q.correctAnswer ? 'text-indigo-700' : 'text-red-600',
              )}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — correct answer: ${q.correctAnswer}`}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 transition-colors"
            >
              {isLast ? 'See results →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Submitting screen ──────────────────────────────────────────────────────────

function SubmittingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="h-10 w-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      <p className="text-sm text-slate-500">Grading your diagnostic…</p>
    </div>
  )
}

// ── Results screen ─────────────────────────────────────────────────────────────

function ResultsScreen({ result, onRetake }: { result: MathDiagnosticResult; onRetake: () => void }) {
  const overallPct = Math.round(result.accuracy_percentage)
  const weakSkills = result.weakest_skill_slugs.filter(s => result.skill_results[s]?.total > 0).slice(0, 5)
  const strongSkills = result.strongest_skill_slugs.filter(s => result.skill_results[s]?.pct >= 67).slice(0, 3)
  const dateStr = new Date(result.completed_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const domains = Object.entries(result.domain_results).sort((a, b) => a[1].pct - b[1].pct)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Math Diagnostic Complete</h1>
        <p className="mt-1 text-sm text-slate-500">Completed {dateStr}</p>
      </div>

      {/* Score summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 flex items-center gap-6">
        <div className="text-center shrink-0">
          <p className={cn('text-5xl font-bold', overallPct >= 80 ? 'text-indigo-600' : overallPct >= 60 ? 'text-amber-500' : 'text-red-500')}>
            {overallPct}%
          </p>
          <p className="text-xs text-slate-400 mt-1">{result.correct_count} / {result.total_questions} correct</p>
        </div>
        <div className="flex-1">
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className={cn('h-3 rounded-full transition-all', overallPct >= 80 ? 'bg-indigo-500' : overallPct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {overallPct >= 80 ? 'Strong foundation — focus on mastering your priority skills.' :
             overallPct >= 60 ? 'Good start — continue building with the skills below.' :
             'Great starting point — the Math Academy will help you improve systematically.'}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-400 bg-slate-50 rounded-lg border border-slate-200 px-3 py-2">
        This diagnostic measures your current Academy skill performance. It is not an official SAT score.
      </p>

      {/* Domain breakdown */}
      {domains.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Domain Breakdown</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {domains.map(([slug, d]) => {
              const badgeCls = MATH_DOMAIN_BADGE_CLASS[slug as keyof typeof MATH_DOMAIN_BADGE_CLASS]
              return (
                <div key={slug} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn('text-xs font-semibold rounded-full border px-2 py-0.5', badgeCls)}>
                      {d.title}
                    </span>
                    <span className={cn('text-sm font-bold', d.pct >= 80 ? 'text-indigo-600' : d.pct >= 60 ? 'text-amber-500' : 'text-red-500')}>
                      {d.pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={cn('h-1.5 rounded-full', d.pct >= 80 ? 'bg-indigo-400' : d.pct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{d.correct} of {d.total} correct</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Skills to focus on */}
      {weakSkills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Skills to Focus On</h2>
          <div className="space-y-2">
            {weakSkills.map((slug, i) => {
              const r = result.skill_results[slug]
              if (!r) return null
              return (
                <div key={slug} className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {r.correct}/{r.total} correct ({r.pct}%)
                    </p>
                  </div>
                  <Link
                    href={`/sat-math-academy/lesson/${slug}`}
                    className="shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap"
                  >
                    Open Lesson →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Strongest skills */}
      {strongSkills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Strongest Skills</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {strongSkills.map(slug => {
              const r = result.skill_results[slug]
              if (!r) return null
              return (
                <div key={slug} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3">
                  <span className={cn('w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    r.pct === 100 ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-50 text-blue-700',
                  )}>
                    {r.pct}%
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{r.title}</p>
                    <p className="text-xs text-slate-400">{r.correct}/{r.total} correct</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recommended next step */}
      {result.recommended_skill_slug && (
        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">Recommended Next Step</p>
          <p className="text-sm font-bold text-indigo-900 mb-1">
            Start with: {MATH_SKILL_DISPLAY_NAMES[result.recommended_skill_slug as keyof typeof MATH_SKILL_DISPLAY_NAMES] ?? result.recommended_skill_slug}
          </p>
          <p className="text-xs text-indigo-700 leading-relaxed mb-3">
            Your diagnostic identified this as your highest-priority skill. Begin with the lesson to build a strong foundation.
          </p>
          <Link
            href={`/sat-math-academy/lesson/${result.recommended_skill_slug}`}
            className="inline-flex rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Start {MATH_SKILL_DISPLAY_NAMES[result.recommended_skill_slug as keyof typeof MATH_SKILL_DISPLAY_NAMES] ?? result.recommended_skill_slug} Lesson →
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/sat-math-academy"
          className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Back to Math Academy
        </Link>
        <button
          onClick={onRetake}
          className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Retake diagnostic
        </button>
      </div>
    </div>
  )
}

// ── Error screen ───────────────────────────────────────────────────────────────

function ErrorScreen({ onRetry, message }: { onRetry: () => void; message: string }) {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="text-sm font-bold text-red-800 mb-1">Could not save your diagnostic result</h2>
        <p className="text-xs text-red-700 leading-relaxed">{message}</p>
        <p className="text-xs text-slate-500 mt-2">Your answers are preserved. You can retry safely.</p>
      </div>
      <button
        onClick={onRetry}
        className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
      >
        Retry Submission
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MathDiagnosticPage() {
  const questions = useMemo(() => MATH_DIAGNOSTIC_QUESTIONS, [])

  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [clientToken, setClientToken] = useState('')
  const [startIndex, setStartIndex] = useState(0)
  const [result, setResult] = useState<MathDiagnosticResult | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(null)

  useEffect(() => {
    setSavedProgress(loadProgress())
  }, [])

  function startFresh() {
    const token = crypto.randomUUID()
    clearProgress()
    setClientToken(token)
    setAnswers({})
    setStartIndex(0)
    setPhase('quiz')
  }

  function resumeSaved() {
    if (!savedProgress) return
    setClientToken(savedProgress.clientToken)
    setAnswers(savedProgress.answers)
    setStartIndex(savedProgress.questionIndex)
    setPhase('quiz')
  }

  async function submitAnswers(finalAnswers: Record<string, string>) {
    setAnswers(finalAnswers)
    setPhase('submitting')

    const responses = Object.entries(finalAnswers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }))

    try {
      const res = await fetch('/api/academy/math-diagnostic/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses, clientToken }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }

      const data = await res.json() as MathDiagnosticResult
      clearProgress()
      setResult(data)
      setPhase('results')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error — please try again.'
      setErrorMessage(msg)
      setPhase('error')
    }
  }

  function handleRetry() {
    setPhase('submitting')
    void submitAnswers(answers)
  }

  function handleRetake() {
    setResult(null)
    setPhase('intro')
    setSavedProgress(null)
  }

  if (phase === 'intro') {
    return <IntroScreen hasSaved={!!savedProgress} onStart={startFresh} onResume={resumeSaved} />
  }
  if (phase === 'quiz') {
    return (
      <QuizScreen
        questions={questions}
        initialAnswers={answers}
        initialIndex={startIndex}
        clientToken={clientToken}
        onComplete={submitAnswers}
      />
    )
  }
  if (phase === 'submitting') return <SubmittingScreen />
  if (phase === 'error') return <ErrorScreen onRetry={handleRetry} message={errorMessage} />
  if (phase === 'results' && result) return <ResultsScreen result={result} onRetake={handleRetake} />
  return null
}
