'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { SHSATForm, SHSATQuestion } from '@/lib/premade-exams/shsat-form-1'

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

interface ResultsProps {
  form: SHSATForm
  answers: Record<string, string>
  onRetake: () => void
}

function ResultsScreen({ form, answers, onRetake }: ResultsProps) {
  const total = form.questions.length
  const correct = form.questions.filter((q) => answers[q.id] === q.correct_answer).length
  const pct = Math.round((correct / total) * 100)

  const elaQs = form.questions.filter((q) => q.section === 'ela')
  const mathQs = form.questions.filter((q) => q.section === 'math')
  const elaCorrect = elaQs.filter((q) => answers[q.id] === q.correct_answer).length
  const mathCorrect = mathQs.filter((q) => answers[q.id] === q.correct_answer).length

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Score card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">{form.title}</p>
          <div className="mt-3 flex items-end justify-center gap-2">
            <span className="text-6xl font-bold text-slate-900">{correct}</span>
            <span className="text-2xl text-slate-400 mb-2">/{total}</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-slate-700">{pct}% correct</p>

          <div className="mt-6 flex justify-center gap-6">
            <div className="text-center">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">ELA</p>
              <p className="text-xl font-bold text-indigo-600">{elaCorrect}/{elaQs.length}</p>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Math</p>
              <p className="text-xl font-bold text-indigo-600">{mathCorrect}/{mathQs.length}</p>
            </div>
          </div>
        </div>

        {/* Per-question review */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Question Review</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {form.questions.map((q, i) => {
              const selected = answers[q.id]
              const isCorrect = selected === q.correct_answer
              const skipped = !selected
              return (
                <div key={q.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                        skipped
                          ? 'bg-slate-100 text-slate-400'
                          : isCorrect
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-600',
                      )}
                    >
                      {skipped ? '–' : isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-400">Q{i + 1}</span>
                        <span
                          className={cn(
                            'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium',
                            q.section === 'ela'
                              ? 'bg-violet-100 text-violet-700'
                              : 'bg-blue-100 text-blue-700',
                          )}
                        >
                          {q.section.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 whitespace-pre-line line-clamp-2">{q.question_text}</p>
                      <div className="mt-2 space-y-1 text-xs">
                        {!isCorrect && selected && (
                          <p className="text-red-600">Your answer: {selected}</p>
                        )}
                        {!isCorrect && (
                          <p className="text-emerald-700 font-medium">Correct: {q.correct_answer}</p>
                        )}
                        {isCorrect && (
                          <p className="text-emerald-700 font-medium">Correct: {q.correct_answer}</p>
                        )}
                        {skipped && (
                          <p className="text-slate-400 italic">Not answered</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={onRetake}
          className="w-full rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Retake Exam
        </button>
      </div>
    </div>
  )
}

// ─── Main taker ───────────────────────────────────────────────────────────────

interface Props {
  form: SHSATForm
}

export function PremadeExamTaker({ form }: Props) {
  const [phase, setPhase] = useState<'exam' | 'results'>('exam')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [marked, setMarked] = useState<Set<string>>(new Set())
  const [secondsLeft, setSecondsLeft] = useState(form.timeLimitMinutes * 60)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  const q = form.questions[currentIndex]
  const totalQ = form.questions.length
  const answeredCount = Object.keys(answers).length

  // Timer
  const handleSubmit = useCallback(() => {
    setShowSubmitModal(false)
    setPhase('results')
  }, [])

  useEffect(() => {
    if (phase !== 'exam') return
    if (secondsLeft <= 0) {
      setTimedOut(true)
      setPhase('results')
      return
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [phase, secondsLeft, handleSubmit])

  const handleRetake = () => {
    setPhase('exam')
    setCurrentIndex(0)
    setAnswers({})
    setMarked(new Set())
    setSecondsLeft(form.timeLimitMinutes * 60)
    setTimedOut(false)
  }

  if (phase === 'results') {
    return (
      <div>
        {timedOut && (
          <div className="bg-amber-500 text-white text-center py-2 text-sm font-medium">
            Time&apos;s up — your exam has been submitted automatically.
          </div>
        )}
        <ResultsScreen form={form} answers={answers} onRetake={handleRetake} />
      </div>
    )
  }

  const isWarning = secondsLeft <= 300 // last 5 minutes

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm font-bold text-slate-800 truncate">{form.title}</span>
            <span className="hidden sm:inline text-xs text-slate-400">|</span>
            <span className="hidden sm:inline text-xs text-slate-500">
              Q{currentIndex + 1} of {totalQ}
            </span>
          </div>

          {/* Timer */}
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-mono font-semibold',
              isWarning
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-slate-100 text-slate-700',
            )}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(secondsLeft)}
          </div>

          {/* Submit */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="shrink-0 rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Question panel */}
        <main className="flex-1 overflow-y-auto py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-2xl space-y-6">

            {/* Section badge + mark button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                    q.section === 'ela'
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-blue-100 text-blue-700',
                  )}
                >
                  {q.section === 'ela' ? 'ELA' : 'Math'}
                </span>
                <span className="text-xs text-slate-400">Question {currentIndex + 1} of {totalQ}</span>
              </div>
              <button
                onClick={() =>
                  setMarked((prev) => {
                    const next = new Set(prev)
                    if (next.has(q.id)) next.delete(q.id)
                    else next.add(q.id)
                    return next
                  })
                }
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                  marked.has(q.id)
                    ? 'border-amber-300 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700',
                )}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                </svg>
                {marked.has(q.id) ? 'Marked' : 'Mark for review'}
              </button>
            </div>

            {/* Question text */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">{q.question_text}</p>
            </div>

            {/* Answer choices */}
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const letter = OPTION_LETTERS[i]
                const isSelected = answers[q.id] === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) =>
                        prev[q.id] === opt ? { ...prev, [q.id]: '' } : { ...prev, [q.id]: opt },
                      )
                    }
                    className={cn(
                      'flex w-full items-start gap-4 rounded-xl border px-5 py-4 text-left text-sm transition-all',
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-slate-300 text-slate-500',
                      )}
                    >
                      {letter}
                    </span>
                    <span className={cn('mt-0.5 leading-relaxed', isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700')}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Previous
              </button>
              <button
                onClick={() => setCurrentIndex((i) => Math.min(totalQ - 1, i + 1))}
                disabled={currentIndex === totalQ - 1}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        {/* ── Right panel: question navigator ── */}
        <aside className="hidden lg:flex w-52 shrink-0 flex-col border-l border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
            Navigator
          </p>
          <p className="text-xs text-slate-500 mb-3">
            {answeredCount}/{totalQ} answered
          </p>
          <div className="grid grid-cols-5 gap-1.5 flex-1">
            {form.questions.map((question, i) => {
              const isAnswered = !!answers[question.id]
              const isMarkedQ = marked.has(question.id)
              const isCurrent = i === currentIndex
              return (
                <button
                  key={question.id}
                  onClick={() => setCurrentIndex(i)}
                  title={`Question ${i + 1}${isMarkedQ ? ' (marked)' : ''}`}
                  className={cn(
                    'relative flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors',
                    isCurrent
                      ? 'bg-indigo-600 text-white'
                      : isAnswered
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                  )}
                >
                  {i + 1}
                  {isMarkedQ && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
            {[
              { color: 'bg-indigo-600', label: 'Current' },
              { color: 'bg-indigo-100', label: 'Answered' },
              { color: 'bg-slate-100', label: 'Not answered' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={cn('h-3 w-3 rounded-sm', color)} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="relative h-3 w-3 rounded-sm bg-indigo-100">
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span className="text-xs text-slate-500">Marked</span>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Submit confirmation modal ── */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Submit exam?</h2>
            <p className="text-sm text-slate-600">
              You have answered <span className="font-semibold text-slate-800">{answeredCount}</span> of{' '}
              <span className="font-semibold text-slate-800">{totalQ}</span> questions.
              {answeredCount < totalQ && (
                <span className="text-amber-600"> {totalQ - answeredCount} question{totalQ - answeredCount !== 1 ? 's' : ''} will be left blank.</span>
              )}
            </p>
            {marked.size > 0 && (
              <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                You have {marked.size} question{marked.size !== 1 ? 's' : ''} marked for review.
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Go back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
