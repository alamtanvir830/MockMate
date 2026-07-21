'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allSkills } from '@/lib/academy'
import {
  buildDiagnosticQuestions,
  buildDiagnosticM1Questions,
  buildDiagnosticM2EasyQuestions,
  buildDiagnosticM2HardQuestions,
} from '@/lib/academy/diagnostic-questions'
import type { DrillQuestion, AnswerLabel } from '@/lib/academy/types'
import { SKILL_DISPLAY_NAMES } from '@/lib/academy/skill-mapping'

// Use the two-module adaptive diagnostic (v2) for all new attempts.
const USE_V2 = true
const DIAGNOSTIC_VERSION = 2

const STORAGE_KEY = 'sat_rw_diagnostic_progress'

type Phase =
  | 'intro'
  | 'quiz'         // v1 single-module flow
  | 'm1_quiz'      // v2 Module 1
  | 'routing'      // v2 scoring spinner
  | 'module_break' // v2 routing announcement
  | 'm2_quiz'      // v2 Module 2
  | 'submitting'
  | 'results'
  | 'error'

interface SavedProgress {
  clientToken: string
  diagnosticVersion: number
  phase: Phase
  // v1
  answers: Record<string, string>   // questionId → selectedAnswer
  questionIndex: number
  // v2
  m1Answers?: Record<string, string>
  m2Answers?: Record<string, string>
  m1QuestionIndex?: number
  m2QuestionIndex?: number
  m2Branch?: 'easy' | 'hard' | null
  savedAt: number
}

function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as SavedProgress
    // Discard if older than 48 h
    if (Date.now() - p.savedAt > 48 * 60 * 60 * 1000) { localStorage.removeItem(STORAGE_KEY); return null }
    return p
  } catch { return null }
}

function saveProgressV1(token: string, answers: Record<string, string>, questionIndex: number) {
  try {
    const p: SavedProgress = {
      clientToken: token,
      diagnosticVersion: 1,
      phase: 'quiz',
      answers,
      questionIndex,
      savedAt: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch { /* ignore */ }
}

function saveProgressV2(p: Omit<SavedProgress, 'savedAt' | 'diagnosticVersion' | 'answers' | 'questionIndex'>) {
  try {
    const full: SavedProgress = {
      ...p,
      diagnosticVersion: 2,
      answers: {},
      questionIndex: 0,
      savedAt: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
  } catch { /* ignore */ }
}

function clearProgress() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DiagnosticResult {
  id: string
  correct_count: number
  incorrect_count: number
  omitted_count: number
  total_questions: number
  answered_questions: number
  accuracy_percentage: number
  skill_results: Record<string, { correct: number; total: number; pct: number; section: string; title: string }>
  domain_results: Record<string, { correct: number; total: number; pct: number; title: string }>
  strongest_skill_slugs: string[]
  weakest_skill_slugs: string[]
  recommended_skill_slug: string | null
  completed_at: string
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function IntroScreen({ hasSaved, onStart, onResume }: { hasSaved: boolean; onStart: () => void; onResume: () => void }) {
  const stats = USE_V2
    ? [
        { label: '36 questions', sub: 'two adaptive modules' },
        { label: '11 skills', sub: '7 reading + 4 writing' },
        { label: '~30 minutes', sub: 'untimed, go at your pace' },
      ]
    : [
        { label: '26 questions', sub: '2–3 per skill' },
        { label: '11 skills', sub: '7 reading + 4 writing' },
        { label: '~20 minutes', sub: 'untimed, go at your pace' },
      ]
  const bullets = USE_V2
    ? [
        'Module 1 measures every R&W skill; Module 2 adapts to your performance.',
        'Your results show which skills to prioritize first.',
        'This is an Academy diagnostic — not an official SAT score.',
      ]
    : [
        'Each question covers a different SAT R&W skill.',
        'Your results show which skills to prioritize first.',
        'This is an Academy diagnostic — not an official SAT score.',
      ]
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">R&amp;W Diagnostic</h1>
        <p className="mt-1 text-sm text-slate-500">Find your starting point across all 11 R&amp;W skills.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map(({ label, sub }) => (
            <div key={label} className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
              <p className="text-base font-bold text-slate-900">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-2 text-sm text-slate-600">
          {bullets.map(t => (
            <li key={t} className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              {t}
            </li>
          ))}
        </ul>
        <div className="flex gap-3 flex-col sm:flex-row">
          {hasSaved && (
            <button
              onClick={onResume}
              className="flex-1 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-3 transition-colors"
            >
              Resume Saved Progress →
            </button>
          )}
          <button
            onClick={onStart}
            className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors"
          >
            {hasSaved ? 'Start Fresh' : 'Start Diagnostic →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

function QuizScreen({
  questions,
  initialAnswers,
  initialIndex,
  moduleLabel,
  completeLabel,
  onProgressChange,
  onComplete,
}: {
  questions: DrillQuestion[]
  initialAnswers: Record<string, string>
  initialIndex: number
  moduleLabel: string
  completeLabel: string
  // Called after each answer is revealed so the parent can persist progress.
  onProgressChange: (answers: Record<string, string>, questionIndex: number) => void
  onComplete: (answers: Record<string, string>) => void
}) {
  const [qIdx, setQIdx] = useState(initialIndex)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)

  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1
  const progress = Math.round(((qIdx + (revealed ? 1 : 0)) / questions.length) * 100)

  const skillTitle = useMemo(
    () => allSkills.find(s => s.slug === q.skillSlug)?.title ?? q.skillSlug,
    [q.skillSlug],
  )

  const handleReveal = useCallback(() => {
    if (!selected) return
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)
    setRevealed(true)
    onProgressChange(newAnswers, qIdx)
  }, [selected, q, answers, qIdx, onProgressChange])

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
          <h1 className="text-lg font-bold text-slate-900">{moduleLabel}</h1>
          <p className="text-xs text-slate-400 mt-0.5">Question {qIdx + 1} of {questions.length}</p>
        </div>
        <span className="text-sm font-semibold text-slate-500">{progress}%</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2">
        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">
          {skillTitle}
        </span>
        <span className={cn(
          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
          q.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
          q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700',
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
            const isSelected = selected === choice.label
            const isCorrect = choice.label === q.correctAnswer
            let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
            if (revealed) {
              if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
              else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
              else cls = 'border-slate-100 bg-white opacity-40 cursor-default'
            } else if (isSelected) {
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
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 transition-colors"
          >
            Submit
          </button>
        ) : (
          <div className="space-y-3">
            <div className={cn(
              'rounded-lg border p-3 text-sm',
              selected === q.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50',
            )}>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-1',
                selected === q.correctAnswer ? 'text-emerald-700' : 'text-red-600',
              )}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — correct: ${q.correctAnswer}`}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 transition-colors"
            >
              {isLast ? completeLabel : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Routing spinner ─────────────────────────────────────────────────────────────

function RoutingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="h-10 w-10 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
      <p className="text-sm text-slate-500">Analyzing your performance…</p>
    </div>
  )
}

// ── Module break ─────────────────────────────────────────────────────────────────

function ModuleBreakScreen({ branch, onContinue }: { branch: 'easy' | 'hard'; onContinue: () => void }) {
  const isHard = branch === 'hard'
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xl font-bold">
          ✓
        </div>
        <h1 className="text-xl font-bold text-slate-900">Module 1 Complete</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {isHard
            ? "Strong work — you're being routed to the advanced module, which features tougher, more complex questions."
            : "Nice effort — you're being routed to the foundation module, which builds from core R&W skills."}
        </p>
        <p className="text-xs text-slate-400">
          Module 2 has 16 questions. Your full results appear after you finish.
        </p>
        <button
          onClick={onContinue}
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors"
        >
          Continue to Module 2 →
        </button>
      </div>
    </div>
  )
}

// ── Submitting ─────────────────────────────────────────────────────────────────

function SubmittingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="h-10 w-10 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
      <p className="text-sm text-slate-500">Grading your diagnostic…</p>
    </div>
  )
}

// ── Results ───────────────────────────────────────────────────────────────────

function ResultsScreen({ result, onRetake }: { result: DiagnosticResult; onRetake: () => void }) {
  const overallPct = Math.round(result.accuracy_percentage)

  const weakSkills = result.weakest_skill_slugs
    .filter(s => result.skill_results[s]?.total > 0)
    .slice(0, 5)

  const strongSkills = result.strongest_skill_slugs
    .filter(s => result.skill_results[s] && result.skill_results[s].pct >= 67)
    .slice(0, 3)

  const dateStr = new Date(result.completed_at).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  const domains = Object.entries(result.domain_results).sort((a, b) => a[1].pct - b[1].pct)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">R&amp;W Diagnostic Complete</h1>
        <p className="mt-1 text-sm text-slate-500">Completed {dateStr}</p>
      </div>

      {/* Score summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 flex items-center gap-6">
        <div className="text-center shrink-0">
          <p className={cn('text-5xl font-bold', overallPct >= 80 ? 'text-emerald-600' : overallPct >= 60 ? 'text-amber-500' : 'text-red-500')}>
            {overallPct}%
          </p>
          <p className="text-xs text-slate-400 mt-1">{result.correct_count} / {result.total_questions} correct</p>
        </div>
        <div className="flex-1">
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className={cn('h-3 rounded-full transition-all', overallPct >= 80 ? 'bg-emerald-500' : overallPct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {overallPct >= 80 ? 'Strong start — focus on mastering your priority skills.' :
             overallPct >= 60 ? 'Good foundation — keep building with the skills below.' :
             'Great starting point — the Academy will help you improve systematically.'}
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
            {domains.map(([slug, d]) => (
              <div key={slug} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-slate-700 leading-tight">{d.title}</p>
                  <span className={cn('text-sm font-bold', d.pct >= 80 ? 'text-emerald-600' : d.pct >= 60 ? 'text-amber-500' : 'text-red-500')}>
                    {d.pct}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className={cn('h-1.5 rounded-full', d.pct >= 80 ? 'bg-emerald-400' : d.pct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{d.correct} of {d.total} correct</p>
              </div>
            ))}
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
                    <p className="text-xs text-slate-500 mt-0.5 capitalize">
                      {r.section} · {r.correct}/{r.total} correct ({r.pct}%)
                      {r.total <= 3 && <span className="ml-1 text-slate-400">· Based on {r.total} diagnostic question{r.total !== 1 ? 's' : ''}</span>}
                    </p>
                  </div>
                  <Link
                    href={`/sat-rw-academy/lesson/${slug}`}
                    className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 transition-colors whitespace-nowrap"
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
                    r.pct === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-700',
                  )}>
                    {r.pct}%
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{r.title}</p>
                    <p className="text-xs text-slate-400 capitalize">{r.section} · {r.correct}/{r.total} correct</p>
                  </div>
                  <Link href={`/sat-rw-academy/lesson/${slug}`} className="text-xs text-emerald-600 hover:underline shrink-0">
                    Drill →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recommended next step */}
      {result.recommended_skill_slug && (
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Recommended Next Step</p>
          <p className="text-sm font-bold text-emerald-900 mb-1">
            Start with: {SKILL_DISPLAY_NAMES[result.recommended_skill_slug] ?? result.recommended_skill_slug}
          </p>
          <p className="text-xs text-emerald-700 leading-relaxed mb-3">
            Your diagnostic identified this as your highest-priority skill. Begin with the lesson, then complete the targeted drill.
          </p>
          <Link
            href={`/sat-rw-academy/lesson/${result.recommended_skill_slug}`}
            className="inline-flex rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Start {SKILL_DISPLAY_NAMES[result.recommended_skill_slug] ?? result.recommended_skill_slug} Lesson →
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/sat-rw-academy"
          className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Back to Academy Home
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

// ── Error ──────────────────────────────────────────────────────────────────────

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
        className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
      >
        Retry Submission
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DiagnosticPage() {
  // v1 questions (single module)
  const v1Questions = useMemo(() => buildDiagnosticQuestions(), [])
  // v2 questions
  const m1Questions = useMemo(() => buildDiagnosticM1Questions(), [])
  const m2EasyQuestions = useMemo(() => buildDiagnosticM2EasyQuestions(), [])
  const m2HardQuestions = useMemo(() => buildDiagnosticM2HardQuestions(), [])

  const [phase, setPhase] = useState<Phase>('intro')
  const [clientToken, setClientToken] = useState<string>('')
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(null)
  // Which submission to re-run when the user retries after an error.
  const [retryKind, setRetryKind] = useState<'v1' | 'm2'>('v1')

  // v1 state
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [startIndex, setStartIndex] = useState(0)

  // v2 state
  const [m2Branch, setM2Branch] = useState<'easy' | 'hard' | null>(null)
  const [m1Answers, setM1Answers] = useState<Record<string, string>>({})
  const [m2Answers, setM2Answers] = useState<Record<string, string>>({})
  const [m1QuestionIndex, setM1QuestionIndex] = useState(0)
  const [m2QuestionIndex, setM2QuestionIndex] = useState(0)

  // On mount, check for saved in-progress diagnostic
  useEffect(() => {
    setSavedProgress(loadProgress())
  }, [])

  const m2Questions = m2Branch === 'hard' ? m2HardQuestions : m2EasyQuestions

  function startFresh() {
    const token = crypto.randomUUID()
    clearProgress()
    setClientToken(token)
    if (USE_V2) {
      setM1Answers({})
      setM2Answers({})
      setM1QuestionIndex(0)
      setM2QuestionIndex(0)
      setM2Branch(null)
      setPhase('m1_quiz')
    } else {
      setAnswers({})
      setStartIndex(0)
      setPhase('quiz')
    }
  }

  function resumeSaved() {
    if (!savedProgress) return
    setClientToken(savedProgress.clientToken)
    if (savedProgress.diagnosticVersion === 2) {
      setM1Answers(savedProgress.m1Answers ?? {})
      setM2Answers(savedProgress.m2Answers ?? {})
      setM1QuestionIndex(savedProgress.m1QuestionIndex ?? 0)
      setM2QuestionIndex(savedProgress.m2QuestionIndex ?? 0)
      setM2Branch(savedProgress.m2Branch ?? null)
      // Resume into a safe phase. Quizzing phases resume in place; anything past
      // routing resumes at the module break so the branch is re-shown first.
      if (savedProgress.phase === 'm2_quiz' && savedProgress.m2Branch) {
        setPhase('m2_quiz')
      } else if (savedProgress.phase === 'module_break' && savedProgress.m2Branch) {
        setPhase('module_break')
      } else {
        setPhase('m1_quiz')
      }
    } else {
      setAnswers(savedProgress.answers)
      setStartIndex(savedProgress.questionIndex)
      setPhase('quiz')
    }
  }

  // ── v1 submit ────────────────────────────────────────────────────────────────
  async function submitAnswersV1(finalAnswers: Record<string, string>) {
    setAnswers(finalAnswers)
    setRetryKind('v1')
    setPhase('submitting')

    const responses = Object.entries(finalAnswers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }))

    try {
      const res = await fetch('/api/academy/diagnostic/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses, clientToken }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }

      const data = await res.json() as DiagnosticResult
      clearProgress()
      setResult(data)
      setPhase('results')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error — please try again.'
      setErrorMessage(msg)
      setPhase('error')
    }
  }

  // ── v2: Module 1 complete → route ──────────────────────────────────────────────
  async function completeM1(finalM1Answers: Record<string, string>) {
    setM1Answers(finalM1Answers)
    setPhase('routing')

    const m1Responses = Object.entries(finalM1Answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }))

    try {
      const res = await fetch('/api/academy/diagnostic/route-m1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ m1Responses }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as { branch: 'easy' | 'hard' }
      setM2Branch(data.branch)
      saveProgressV2({
        clientToken,
        phase: 'module_break',
        m1Answers: finalM1Answers,
        m2Answers: {},
        m1QuestionIndex,
        m2QuestionIndex: 0,
        m2Branch: data.branch,
      })
      setPhase('module_break')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error — please try again.'
      setErrorMessage(msg)
      setRetryKind('v1') // routing failure is not retriable via /complete; send back to M1
      setPhase('error')
    }
  }

  // ── v2: Module 2 complete → submit everything ──────────────────────────────────
  async function completeM2(finalM2Answers: Record<string, string>) {
    setM2Answers(finalM2Answers)
    setRetryKind('m2')
    setPhase('submitting')

    const responses = [
      ...Object.entries(m1Answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })),
      ...Object.entries(finalM2Answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })),
    ]

    try {
      const res = await fetch('/api/academy/diagnostic/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses, clientToken, diagnosticVersion: DIAGNOSTIC_VERSION, m2Branch }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as DiagnosticResult
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
    if (retryKind === 'm2') {
      void completeM2(m2Answers)
    } else {
      void submitAnswersV1(answers)
    }
  }

  function handleRetake() {
    setResult(null)
    setPhase('intro')
    setSavedProgress(null)
  }

  if (phase === 'intro') {
    return (
      <IntroScreen
        hasSaved={!!savedProgress}
        onStart={startFresh}
        onResume={resumeSaved}
      />
    )
  }

  // v1 single-module quiz
  if (phase === 'quiz') {
    return (
      <QuizScreen
        questions={v1Questions}
        initialAnswers={answers}
        initialIndex={startIndex}
        moduleLabel="R&W Diagnostic"
        completeLabel="See results →"
        onProgressChange={(a, i) => saveProgressV1(clientToken, a, i)}
        onComplete={submitAnswersV1}
      />
    )
  }

  // v2 Module 1
  if (phase === 'm1_quiz') {
    return (
      <QuizScreen
        questions={m1Questions}
        initialAnswers={m1Answers}
        initialIndex={m1QuestionIndex}
        moduleLabel="R&W Diagnostic · Module 1"
        completeLabel="Finish Module 1 →"
        onProgressChange={(a, i) => {
          setM1QuestionIndex(i)
          saveProgressV2({
            clientToken,
            phase: 'm1_quiz',
            m1Answers: a,
            m2Answers,
            m1QuestionIndex: i,
            m2QuestionIndex,
            m2Branch,
          })
        }}
        onComplete={completeM1}
      />
    )
  }

  if (phase === 'routing') return <RoutingScreen />

  if (phase === 'module_break' && m2Branch) {
    return (
      <ModuleBreakScreen
        branch={m2Branch}
        onContinue={() => {
          saveProgressV2({
            clientToken,
            phase: 'm2_quiz',
            m1Answers,
            m2Answers,
            m1QuestionIndex,
            m2QuestionIndex,
            m2Branch,
          })
          setPhase('m2_quiz')
        }}
      />
    )
  }

  // v2 Module 2
  if (phase === 'm2_quiz' && m2Branch) {
    return (
      <QuizScreen
        key={m2Branch}
        questions={m2Questions}
        initialAnswers={m2Answers}
        initialIndex={m2QuestionIndex}
        moduleLabel={`R&W Diagnostic · Module 2 (${m2Branch === 'hard' ? 'Advanced' : 'Foundation'})`}
        completeLabel="See results →"
        onProgressChange={(a, i) => {
          setM2QuestionIndex(i)
          saveProgressV2({
            clientToken,
            phase: 'm2_quiz',
            m1Answers,
            m2Answers: a,
            m1QuestionIndex,
            m2QuestionIndex: i,
            m2Branch,
          })
        }}
        onComplete={completeM2}
      />
    )
  }

  if (phase === 'submitting') return <SubmittingScreen />

  if (phase === 'error') {
    return <ErrorScreen onRetry={handleRetry} message={errorMessage} />
  }

  if (phase === 'results' && result) {
    return <ResultsScreen result={result} onRetake={handleRetake} />
  }

  return null
}
