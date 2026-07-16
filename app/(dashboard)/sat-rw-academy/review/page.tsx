'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allSkills } from '@/lib/academy'
import type { DrillQuestion } from '@/lib/academy/types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReviewQueueItem {
  id: string
  questionId: string
  sourceType: string
  skillSlug: string
  reviewStage: number
}

interface ReviewQueueResponse {
  items: ReviewQueueItem[]
  totalDue: number
}

type Phase = 'loading' | 'quiz' | 'feedback' | 'complete' | 'empty'

// stage → next review interval in days
const STAGE_INTERVALS: Record<number, number> = {
  0: 1,
  1: 3,
  2: 7,
  3: 14,
}
function intervalForStage(stage: number): number {
  return STAGE_INTERVALS[stage] ?? 30
}

const DIFF_BADGE: Record<string, string> = {
  easy: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  medium: 'bg-amber-50 border-amber-200 text-amber-700',
  hard: 'bg-red-50 border-red-200 text-red-700',
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ReviewQueuePage() {
  const [items, setItems] = useState<ReviewQueueItem[]>([])
  const [phase, setPhase] = useState<Phase>('loading')
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [nextStage, setNextStage] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/academy/review-queue')
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json() as ReviewQueueResponse
        if (data.items.length === 0) {
          setPhase('empty')
        } else {
          setItems(data.items)
          setPhase('quiz')
        }
      } catch {
        setPhase('empty')
      }
    }
    void load()
  }, [])

  const currentItem = items[qIdx]
  const currentQuestion: DrillQuestion | undefined = currentItem
    ? allSkills.flatMap(s => s.drillQuestions).find(q => q.id === currentItem.questionId)
    : undefined

  function handleSubmit() {
    if (!selected || !currentQuestion || !currentItem) return
    const correct = selected === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setNextStage(currentItem.reviewStage + (correct ? 1 : 0))
    if (correct) setScore(s => s + 1)
    setPhase('feedback')

    // Fire-and-forget POST
    void fetch('/api/academy/review-queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queueItemId: currentItem.id, isCorrect: correct }),
    })
  }

  async function handleNext() {
    setSelected(null)
    setIsCorrect(null)
    setNextStage(null)
    const nextIdx = qIdx + 1
    if (nextIdx >= items.length) {
      setPhase('complete')
    } else {
      setQIdx(nextIdx)
      setPhase('quiz')
    }
  }

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <div className="space-y-6">
                <div className="space-y-3">
          <div className="h-7 w-48 rounded-lg bg-slate-100 animate-pulse" />
          <div className="h-4 w-72 rounded-lg bg-slate-100 animate-pulse" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="h-20 w-full rounded bg-slate-100 mt-4" />
        </div>
      </div>
    )
  }

  // ── Empty ───────────────────────────────────────────────────────────────────
  if (phase === 'empty') {
    return (
      <div className="space-y-6">
                <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Queue</h1>
          <p className="mt-1 text-sm text-slate-500">Questions you&apos;ve missed, spaced for retention</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7 text-emerald-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">No reviews due right now</h2>
          <p className="text-sm text-slate-500 mb-6">
            Come back tomorrow or practice a skill drill to add items to your review queue.
          </p>
          <Link
            href="/sat-rw-academy/reading"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Practice a Skill Drill
          </Link>
        </div>
      </div>
    )
  }

  // ── Complete ────────────────────────────────────────────────────────────────
  if (phase === 'complete') {
    const pct = items.length > 0 ? Math.round((score / items.length) * 100) : 0
    return (
      <div className="space-y-6">
                <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Queue</h1>
          <p className="mt-1 text-sm text-slate-500">Session complete</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className={cn(
            'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold',
            pct >= 80 ? 'bg-emerald-50 text-emerald-600' : pct >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600',
          )}>
            {pct}%
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {score} / {items.length} correct
          </h2>
          <p className="text-sm text-slate-500 mb-6">Great work! Your next reviews are scheduled.</p>
          <Link
            href="/sat-rw-academy"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Back to Overview
          </Link>
        </div>
      </div>
    )
  }

  // ── Quiz / Feedback ─────────────────────────────────────────────────────────
  const progress = Math.round(((qIdx + (phase === 'feedback' ? 1 : 0)) / items.length) * 100)

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Review Queue</h1>
        <p className="mt-1 text-sm text-slate-500">Questions you&apos;ve missed, spaced for retention</p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
          {qIdx + (phase === 'feedback' ? 1 : 0)} of {items.length}
        </span>
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

        {/* Unknown source placeholder */}
        {!currentQuestion ? (
          <div className="p-6 text-center text-sm text-slate-500">
            <p>This question is from another source and cannot be displayed here yet.</p>
            <button
              onClick={() => void handleNext()}
              className="mt-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-4 py-2 transition-colors"
            >
              Skip
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                {currentItem?.skillSlug.replace(/-/g, ' ')}
              </span>
              <span className="text-slate-300">·</span>
              <span className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
                DIFF_BADGE[currentQuestion.difficulty] ?? DIFF_BADGE.medium,
              )}>
                {currentQuestion.difficulty}
              </span>
              <span className="ml-auto text-xs text-slate-400">
                Stage {currentItem?.reviewStage ?? 0}
              </span>
            </div>

            {/* Stimulus */}
            {currentQuestion.stimulus && (
              <div className="px-5 pt-4 pb-3 bg-slate-50 border-b border-slate-100">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {currentQuestion.stimulus}
                </p>
              </div>
            )}

            {/* Question */}
            <div className="px-5 py-4">
              <p className="text-sm font-medium text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Choices */}
            <div className="px-5 pb-5 space-y-2">
              {currentQuestion.choices.map((choice: { label: string; text: string }) => {
                const isSelected = phase === 'quiz' ? selected === choice.label : selected === choice.label
                const isCorrectChoice = choice.label === currentQuestion.correctAnswer
                const showFeedback = phase === 'feedback'

                return (
                  <button
                    key={choice.label}
                    disabled={phase === 'feedback'}
                    onClick={() => setSelected(choice.label)}
                    className={cn(
                      'w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all text-sm',
                      showFeedback
                        ? isCorrectChoice
                          ? 'border-emerald-500 bg-emerald-50 text-slate-900'
                          : isSelected
                          ? 'border-red-400 bg-red-50 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-400'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-slate-900'
                        : 'border-slate-200 bg-white hover:border-emerald-400/60 hover:bg-emerald-50/40 text-slate-700',
                    )}
                  >
                    <span className={cn(
                      'h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                      showFeedback
                        ? isCorrectChoice
                          ? 'bg-emerald-500 text-white'
                          : isSelected
                          ? 'bg-red-400 text-white'
                          : 'bg-slate-100 text-slate-400'
                        : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500',
                    )}>
                      {showFeedback && isCorrectChoice
                        ? '✓'
                        : showFeedback && isSelected && !isCorrectChoice
                        ? '✗'
                        : choice.label}
                    </span>
                    <span className="flex-1 leading-relaxed">{choice.text}</span>
                  </button>
                )
              })}
            </div>

            {/* Submit */}
            {phase === 'quiz' && (
              <div className="px-5 pb-5">
                <button
                  onClick={handleSubmit}
                  disabled={!selected || submitting}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Feedback */}
            {phase === 'feedback' && (
              <div className="border-t border-slate-100">
                {/* Result banner */}
                <div className={cn('px-5 py-3 flex items-center gap-3', isCorrect ? 'bg-emerald-50' : 'bg-red-50')}>
                  <div className={cn(
                    'h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0',
                    isCorrect ? 'bg-emerald-500' : 'bg-red-400',
                  )}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div>
                    <p className={cn('text-sm font-semibold', isCorrect ? 'text-emerald-800' : 'text-red-800')}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-red-600">
                        Correct answer: <strong>{currentQuestion.correctAnswer}</strong>
                      </p>
                    )}
                  </div>
                  {nextStage !== null && (
                    <div className="ml-auto text-right">
                      <p className="text-xs font-medium text-slate-600">
                        Stage {nextStage} → next review in {intervalForStage(nextStage)} day{intervalForStage(nextStage) === 1 ? '' : 's'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Explanation */}
                <div className="px-5 py-4">
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5">
                      Explanation
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>

                {/* Next button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => void handleNext()}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 transition-colors"
                  >
                    {qIdx + 1 >= items.length ? 'See Results' : 'Next Question →'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
