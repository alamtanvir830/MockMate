'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createStudyRoundSession } from '@/app/actions/study-rounds'
import type { MissedQuestionInput } from '@/lib/ai/generate-study-round-questions'

interface Props {
  examId: string
  incorrectQuestions: Array<{
    question_text: string
    options: string[]
    correct_answer: string
    selected_answer: string | null
    explanation_correct: string | null
    explanation_incorrect: Record<string, string> | null
  }>
  subject: string
  examTitle: string
  language?: string
  questionCount: number
  standardizedExam?: string
}

export function StartStudyRoundButton({
  examId,
  incorrectQuestions,
  subject,
  examTitle,
  language,
  questionCount,
  standardizedExam,
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (incorrectQuestions.length === 0) return null

  async function handleStart() {
    setLoading(true)
    setError(null)

    const missed: MissedQuestionInput[] = incorrectQuestions.map((q) => ({
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      user_answer: q.selected_answer,
      explanation_correct: q.explanation_correct,
      explanation_incorrect: q.explanation_incorrect,
    }))

    const result = await createStudyRoundSession({
      examId,
      missedQuestions: missed,
      subject,
      examTitle,
      language,
      questionCount,
      standardizedExam,
    })

    if ('error' in result) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push(`/study-round/${result.sessionId}`)
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Start Study Round</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Take focused test rounds, review missed concepts, study a mind map, then retest until mastery. 2-hour session · {incorrectQuestions.length} missed concept{incorrectQuestions.length !== 1 ? 's' : ''}
            </p>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={loading}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Preparing…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Start Study Round
            </>
          )}
        </button>
      </div>
    </div>
  )
}
