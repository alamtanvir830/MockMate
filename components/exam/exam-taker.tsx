'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { submitExam } from '@/app/actions/attempts'

type SubmitAction = (input: {
  examId: string
  answers: Record<string, string>
}) => Promise<{ error: string } | void>

interface Question {
  id: string
  question_text: string
  question_type: 'multiple_choice' | 'short_answer' | 'essay'
  options: string[] | null
  correct_answer: string
  marks: number
  order: number
  difficulty?: 'easy' | 'medium' | 'hard' | null
}

interface Exam {
  id: string
  title: string
  subject: string
  time_limit_minutes?: number | null
  adaptive_mode?: boolean | null
  standardized_exam?: string | null
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** HH:MM:SS for board-style header; falls back to MM:SS if under 1 hour */
function formatTimeBoard(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

interface ExamTakerProps {
  exam: Exam
  questions: Question[]
  submitAction?: SubmitAction
}

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'] as const
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export function ExamTaker({ exam, questions, submitAction = submitExam }: ExamTakerProps) {
  const isAdaptive = !!(exam.adaptive_mode)
  const isUSMLE1 = exam.standardized_exam === 'usmle_step1'

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!isAdaptive) return 0
    const medIdx = questions.findIndex((q) => q.difficulty === 'medium')
    return medIdx >= 0 ? medIdx : 0
  })
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set())
  const [showReview, setShowReview] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')

  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    exam.time_limit_minutes ? exam.time_limit_minutes * 60 : null,
  )
  const autoSubmittedRef = useRef(false)

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
  const current = questions[currentIndex]
  const answeredCount = Object.keys(answers).length
  const unansweredCount = questions.length - answeredCount
  const allAnswered = answeredCount === questions.length

  function toggleMark(questionId: string) {
    setMarkedQuestions((prev) => {
      const next = new Set(prev)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  function getAdaptiveNextIndex(wasCorrect: boolean): number {
    const currentDiffIdx = DIFFICULTY_ORDER.indexOf(adaptiveDifficulty)
    const nextDiffIdx = wasCorrect
      ? Math.min(currentDiffIdx + 1, DIFFICULTY_ORDER.length - 1)
      : Math.max(currentDiffIdx - 1, 0)
    const nextDifficulty = DIFFICULTY_ORDER[nextDiffIdx]
    setAdaptiveDifficulty(nextDifficulty)

    const candidate = questions.findIndex(
      (q, i) => i !== currentIndex && !answers[q.id] && q.difficulty === nextDifficulty,
    )
    if (candidate >= 0) return candidate

    const fallback = questions.findIndex((q, i) => i !== currentIndex && !answers[q.id])
    return fallback >= 0 ? fallback : currentIndex
  }

  // Countdown tick
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return
    const id = setTimeout(
      () => setSecondsLeft((s) => (s !== null && s > 0 ? s - 1 : s)),
      1000,
    )
    return () => clearTimeout(id)
  }, [secondsLeft])

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (secondsLeft === 0 && !autoSubmittedRef.current) {
      autoSubmittedRef.current = true
      doSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft])

  function setAnswer(questionId: string, answer: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  function handleSubmitClick() {
    if (unansweredCount > 0) {
      setConfirming(true)
    } else {
      doSubmit()
    }
  }

  async function doSubmit() {
    setConfirming(false)
    setSubmitting(true)
    setError('')
    const result = await submitAction({ examId: exam.id, answers })
    if (result?.error) {
      setError(result.error)
      setSubmitting(false)
    }
    // on success, server action calls redirect()
  }

  // ─── USMLE Step 1 board-style layout ──────────────────────────────────────
  if (isUSMLE1) {
    const isMarked = markedQuestions.has(current.id)
    const isOnLastQuestion = currentIndex === questions.length - 1

    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-white"
        style={{ fontFamily: '"Helvetica Neue", Arial, "Liberation Sans", sans-serif' }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header
          className="shrink-0 text-white px-5 py-3 flex items-center justify-between gap-4"
          style={{ background: '#1b3d2e', borderBottom: '1px solid #2d5a43' }}
        >
          {/* Left: block info + mark */}
          <div className="flex flex-col gap-1 min-w-[160px]">
            <span className="text-xs font-medium tracking-wider" style={{ color: '#94a89f' }}>
              BLOCK 1 &nbsp;·&nbsp; ITEM {currentIndex + 1} OF {questions.length}
            </span>
            <button
              type="button"
              onClick={() => toggleMark(current.id)}
              className={cn(
                'flex items-center gap-1.5 w-fit text-xs font-semibold tracking-wide transition-colors',
                isMarked ? 'text-yellow-300' : 'hover:text-gray-200',
              )}
              style={{ color: isMarked ? undefined : '#94a89f' }}
            >
              <svg
                viewBox="0 0 20 20"
                fill={isMarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={isMarked ? 0 : 1.8}
                className="h-3.5 w-3.5 shrink-0"
              >
                <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14l-7-3-7 3V3z" />
              </svg>
              {isMarked ? 'Marked' : 'Mark'}
            </button>
          </div>

          {/* Center: dynamic exam title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none select-none hidden sm:block max-w-xs lg:max-w-lg px-2">
            <p className="text-sm font-semibold text-white tracking-wide truncate">
              MockMate — {exam.title}
            </p>
          </div>

          {/* Right: timer */}
          <div className="text-right shrink-0 min-w-[110px]">
            <p className="text-xs uppercase tracking-wider" style={{ color: '#94a89f' }}>
              Time Remaining
            </p>
            {secondsLeft !== null ? (
              <p
                className={cn(
                  'text-xl font-mono font-bold tabular-nums leading-tight',
                  secondsLeft === 0
                    ? 'text-red-400'
                    : secondsLeft < 300
                    ? 'text-red-300'
                    : secondsLeft < 600
                    ? 'text-amber-300'
                    : 'text-white',
                )}
              >
                {formatTimeBoard(secondsLeft)}
              </p>
            ) : (
              <p className="text-sm" style={{ color: '#94a89f' }}>Untimed</p>
            )}
          </div>
        </header>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-white">
          {showReview ? (
            /* ── Review panel ───────────────────────────────────────────── */
            <div className="max-w-4xl mx-auto px-8 sm:px-12 py-10">
              <h2 className="text-base font-bold text-gray-900 mb-1">Item Review</h2>
              <p className="text-sm text-gray-500 mb-6">
                Click any item number to navigate to it. Close this panel to continue answering.
              </p>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-7 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-5 w-5 rounded" style={{ background: '#2d7a52' }} />
                  Answered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-5 w-5 rounded" style={{ background: '#f3f4f6', border: '1px solid #d1d5db' }} />
                  Unanswered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-5 w-5 rounded" style={{ background: '#fef08a', border: '1px solid #ca8a04' }} />
                  Marked for review
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-5 w-5 rounded" style={{ background: '#34d399', border: '2px solid #059669' }} />
                  Current item
                </span>
              </div>

              {/* Summary counts */}
              <div className="flex flex-wrap gap-4 mb-7 text-sm">
                <span className="font-medium text-gray-700">
                  {answeredCount} <span className="font-normal text-gray-500">answered</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="font-medium text-gray-700">
                  {unansweredCount} <span className="font-normal text-gray-500">unanswered</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="font-medium text-gray-700">
                  {markedQuestions.size} <span className="font-normal text-gray-500">marked</span>
                </span>
              </div>

              {/* Item grid */}
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(3rem, 1fr))' }}>
                {questions.map((q, i) => {
                  const isCurrent = i === currentIndex
                  const isAnswered = !!answers[q.id]
                  const isFlagged = markedQuestions.has(q.id)

                  let bg = '#f3f4f6'
                  let border = '1px solid #d1d5db'
                  let textColor = '#374151'

                  if (isCurrent) {
                    bg = '#34d399'; border = '2px solid #059669'; textColor = '#064e3b'
                  } else if (isAnswered && isFlagged) {
                    bg = '#fef08a'; border = '1px solid #ca8a04'; textColor = '#713f12'
                  } else if (isAnswered) {
                    bg = '#2d7a52'; border = '1px solid #166534'; textColor = '#ffffff'
                  } else if (isFlagged) {
                    bg = 'rgba(254,240,138,0.3)'; border = '1px solid #ca8a04'; textColor = '#713f12'
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => { setCurrentIndex(i); setShowReview(false) }}
                      className="h-10 rounded text-xs font-semibold transition-opacity hover:opacity-80 flex flex-col items-center justify-center gap-0.5"
                      style={{ background: bg, border, color: textColor }}
                      title={`Item ${i + 1}${isFlagged ? ' — marked' : ''}${isAnswered ? ' — answered' : ' — unanswered'}`}
                    >
                      <span>{i + 1}</span>
                      {isFlagged && (
                        <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5 opacity-70">
                          <path d="M2 1.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8l-4-1.75L2 9.5V1.5z" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* ── Question view ──────────────────────────────────────────── */
            <div className="max-w-4xl mx-auto px-8 sm:px-12 py-10">
              {/* Question stem */}
              <div className="mb-9">
                <p className="text-base leading-[1.75] text-gray-900 whitespace-pre-wrap">
                  {current.question_text}
                </p>
              </div>

              {/* Answer choices */}
              {current.question_type === 'multiple_choice' && current.options && (
                <div>
                  {current.options.map((option, i) => {
                    const letter = LETTERS[i] ?? String.fromCharCode(65 + i)
                    const isSelected = answers[current.id] === option
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAnswer(current.id, option)}
                        className={cn(
                          'w-full flex items-start gap-4 px-4 py-3 text-left transition-colors',
                          isSelected
                            ? 'border-l-4 border-[#1b7a4a] bg-[#edf7f1]'
                            : 'border-l-4 border-transparent hover:bg-gray-50',
                        )}
                      >
                        {/* Radio ring */}
                        <span
                          className="mt-[3px] flex h-4 w-4 shrink-0 rounded-full border-2 items-center justify-center"
                          style={{ borderColor: isSelected ? '#1b7a4a' : '#9ca3af' }}
                        >
                          {isSelected && (
                            <span className="h-2 w-2 rounded-full" style={{ background: '#1b7a4a' }} />
                          )}
                        </span>
                        {/* Letter label */}
                        <span
                          className="shrink-0 text-sm font-bold w-5 leading-relaxed"
                          style={{ color: isSelected ? '#1b7a4a' : '#4b5563' }}
                        >
                          {letter}.
                        </span>
                        {/* Answer text */}
                        <span className="text-sm text-gray-900 leading-relaxed">{option}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {current.question_type === 'short_answer' && (
                <textarea
                  value={answers[current.id] ?? ''}
                  onChange={(e) => setAnswer(current.id, e.target.value)}
                  placeholder="Write your answer here..."
                  rows={8}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#1b7a4a' } as React.CSSProperties}
                />
              )}
            </div>
          )}
        </main>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer
          className="shrink-0 px-5 py-2 flex items-center gap-3"
          style={{ background: '#1b3d2e', borderTop: '1px solid #2d5a43' }}
        >
          {/* Back button */}
          <button
            type="button"
            onClick={() => { setCurrentIndex((i) => Math.max(i - 1, 0)); setShowReview(false) }}
            disabled={currentIndex === 0 && !showReview}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#d1fae5' }}
            onMouseOver={(e) => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)' }}
            onMouseOut={(e) => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>

          {/* Question navigator — fills remaining space */}
          <div
            className="flex items-center gap-1 flex-wrap overflow-hidden"
            style={{ flex: '1 1 0', maxHeight: '1.75rem' }}
          >
            {questions.map((q, i) => {
              const isCurrent = i === currentIndex
              const isAnswered = !!answers[q.id]
              const isFlagged = markedQuestions.has(q.id)
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => { setCurrentIndex(i); setShowReview(false) }}
                  title={`Item ${i + 1}${isFlagged ? ' — marked' : ''}`}
                  className={cn(
                    'h-6 min-w-[1.5rem] px-1 text-xs rounded font-medium transition-colors',
                    isCurrent
                      ? 'bg-emerald-400 text-emerald-950'
                      : isAnswered && isFlagged
                      ? 'bg-yellow-400 text-yellow-950'
                      : isAnswered
                      ? 'text-white'
                      : isFlagged
                      ? 'text-yellow-200'
                      : 'text-gray-300 hover:bg-white/20',
                  )}
                  style={
                    !isCurrent
                      ? isAnswered && isFlagged
                        ? {}
                        : isAnswered
                        ? { background: '#2d7a52' }
                        : isFlagged
                        ? { background: 'rgba(234,179,8,0.25)', outline: '1px solid rgba(234,179,8,0.5)' }
                        : { background: 'rgba(255,255,255,0.1)' }
                      : {}
                  }
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          {/* Right controls: Review + Next/End Block */}
          <div className="flex items-center gap-2 shrink-0">
            {error && <span className="text-xs text-red-300">{error}</span>}

            {/* Review toggle */}
            <button
              type="button"
              onClick={() => setShowReview((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors"
              style={{
                background: showReview ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.08)',
                color: showReview ? '#6ee7b7' : '#d1fae5',
                outline: showReview ? '1px solid rgba(52,211,153,0.4)' : 'none',
              }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {showReview ? 'Close' : 'Review'}
            </button>

            {/* Next / End Block */}
            {!showReview && (isOnLastQuestion || allAnswered) ? (
              <button
                type="button"
                onClick={handleSubmitClick}
                disabled={submitting}
                className="flex items-center gap-2 px-5 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-60"
                style={{ background: '#166534', color: '#fff' }}
                onMouseOver={(e) => !submitting && ((e.currentTarget as HTMLButtonElement).style.background = '#15803d')}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#166534')}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  'End Block'
                )}
              </button>
            ) : !showReview ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="flex items-center gap-2 px-5 py-1.5 rounded text-sm font-semibold transition-colors"
                style={{ background: '#166534', color: '#fff' }}
                onMouseOver={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#15803d')}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#166534')}
              >
                Next
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitClick}
                disabled={submitting}
                className="flex items-center gap-2 px-5 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-60"
                style={{ background: '#166534', color: '#fff' }}
                onMouseOver={(e) => !submitting && ((e.currentTarget as HTMLButtonElement).style.background = '#15803d')}
                onMouseOut={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#166534')}
              >
                {submitting ? 'Submitting…' : 'End Block'}
              </button>
            )}
          </div>
        </footer>

        {/* ── Confirmation modal ─────────────────────────────────────────── */}
        {confirming && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4">
              <h2 className="text-base font-bold text-gray-900 mb-2">End block?</h2>
              <p className="text-sm text-gray-600 mb-1">
                {unansweredCount} item{unansweredCount !== 1 ? 's are' : ' is'} unanswered.
              </p>
              <p className="text-sm text-gray-600 mb-5">
                Unanswered items score 0. You cannot return once the block is ended.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={doSubmit}
                  disabled={submitting}
                  className="flex-1 text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-60"
                  style={{ background: '#1b3d2e' }}
                >
                  {submitting ? 'Submitting…' : 'End block'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-semibold transition-colors"
                >
                  Continue reviewing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Time expired overlay ───────────────────────────────────────── */}
        {secondsLeft === 0 && !confirming && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4 text-center">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#fef2f2' }}
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1">Time Expired</h2>
              <p className="text-sm text-gray-500">
                Your block is being submitted automatically.
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── Standard MockMate layout ────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Exam header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{exam.title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {questions.length} questions · {totalMarks} mark{totalMarks !== 1 ? 's' : ''}
          </p>
        </div>
        {secondsLeft !== null && (
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-mono font-semibold tabular-nums',
              secondsLeft === 0
                ? 'border-red-300 bg-red-100 text-red-700'
                : secondsLeft < 300
                ? 'border-red-200 bg-red-50 text-red-700'
                : secondsLeft < 600
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-slate-50 text-slate-700',
            )}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            {secondsLeft === 0 ? "Time's up" : formatTime(secondsLeft)}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question navigation dots */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'h-8 w-8 rounded-lg text-xs font-medium transition-colors',
              i === currentIndex
                ? 'bg-emerald-600 text-white'
                : answers[q.id]
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question card */}
      <Card>
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white text-sm font-bold">
            {currentIndex + 1}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              {current.question_text}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {current.marks} mark{current.marks !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {current.question_type === 'multiple_choice' && current.options && (
          <div className="space-y-3">
            {current.options.map((option, i) => {
              const letters = ['A', 'B', 'C', 'D', 'E']
              const isSelected = answers[current.id] === option
              return (
                <button
                  key={i}
                  onClick={() => setAnswer(current.id, option)}
                  className={cn(
                    'w-full flex items-center gap-3 rounded-xl border p-4 text-left transition-colors',
                    isSelected
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {letters[i] ?? String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-slate-700">{option}</span>
                </button>
              )
            })}
          </div>
        )}

        {current.question_type === 'short_answer' && (
          <textarea
            value={answers[current.id] ?? ''}
            onChange={(e) => setAnswer(current.id, e.target.value)}
            placeholder="Write your answer here..."
            rows={8}
            className={cn(
              'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900',
              'placeholder:text-slate-400 resize-none',
              'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
              'hover:border-slate-300 transition-colors',
            )}
          />
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Previous
        </Button>

        {isAdaptive ? (
          allAnswered ? (
            <Button
              onClick={handleSubmitClick}
              loading={submitting}
              variant="primary"
            >
              Submit exam
            </Button>
          ) : (
            <Button
              onClick={() => {
                const wasCorrect = answers[current.id] === current.correct_answer
                setCurrentIndex(getAdaptiveNextIndex(wasCorrect))
              }}
              disabled={!answers[current.id]}
            >
              Next
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          )
        ) : currentIndex < questions.length - 1 ? (
          <Button onClick={() => setCurrentIndex((i) => i + 1)}>
            Next
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        ) : (
          <Button
            onClick={handleSubmitClick}
            loading={submitting}
            variant={answeredCount < questions.length ? 'outline' : 'primary'}
          >
            Submit exam
          </Button>
        )}
      </div>

      {/* Adaptive mode indicator */}
      {isAdaptive && (
        <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs text-indigo-700">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
          Adaptive mode — difficulty adjusts based on your answers
          {answers[current.id] && (
            <span className="ml-auto font-medium">
              Current level:{' '}
              <span className={
                adaptiveDifficulty === 'hard' ? 'text-red-600' :
                adaptiveDifficulty === 'easy' ? 'text-emerald-600' :
                'text-amber-600'
              }>
                {adaptiveDifficulty}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Unanswered warning */}
      {unansweredCount > 0 && (isAdaptive ? allAnswered : currentIndex === questions.length - 1) && !confirming && (
        <p className="text-center text-sm text-amber-600">
          {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} unanswered —
          unanswered questions receive 0 marks.
        </p>
      )}

      {/* Confirmation banner */}
      {confirming && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-900">
            {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} left unanswered
          </p>
          <p className="mt-1 text-sm text-amber-700">
            Unanswered questions score 0. Submit anyway, or go back to finish them.
          </p>
          <div className="mt-4 flex gap-3">
            <Button size="sm" onClick={doSubmit} loading={submitting}>
              Submit anyway
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
              Go back
            </Button>
          </div>
        </div>
      )}

      {/* Time expired banner */}
      {secondsLeft === 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm font-semibold text-red-900">Time's up!</p>
          <p className="mt-1 text-sm text-red-700">Your exam is being submitted automatically…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  )
}
