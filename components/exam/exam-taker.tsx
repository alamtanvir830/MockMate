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
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface ExamTakerProps {
  exam: Exam
  questions: Question[]
  submitAction?: SubmitAction
}

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'] as const

export function ExamTaker({ exam, questions, submitAction = submitExam }: ExamTakerProps) {
  const isAdaptive = !!(exam.adaptive_mode)

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!isAdaptive) return 0
    // Start at first medium question, fall back to first question
    const medIdx = questions.findIndex((q) => q.difficulty === 'medium')
    return medIdx >= 0 ? medIdx : 0
  })
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [answers, setAnswers] = useState<Record<string, string>>({})
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

  function getAdaptiveNextIndex(wasCorrect: boolean): number {
    const currentDiffIdx = DIFFICULTY_ORDER.indexOf(adaptiveDifficulty)
    const nextDiffIdx = wasCorrect
      ? Math.min(currentDiffIdx + 1, DIFFICULTY_ORDER.length - 1)
      : Math.max(currentDiffIdx - 1, 0)
    const nextDifficulty = DIFFICULTY_ORDER[nextDiffIdx]
    setAdaptiveDifficulty(nextDifficulty)

    // Find first unanswered question at target difficulty
    const candidate = questions.findIndex(
      (q, i) => i !== currentIndex && !answers[q.id] && q.difficulty === nextDifficulty,
    )
    if (candidate >= 0) return candidate

    // Fall back: any unanswered question
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
    // on success, server action calls redirect() — no further action needed
  }

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
