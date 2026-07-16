'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { VideoCheckQuestion } from '@/lib/academy/videos/types'

type AnswerLabel = 'A' | 'B' | 'C' | 'D'

interface VideoCheckQuestionsProps {
  questions: VideoCheckQuestion[]
  videoKey: string
}

function QuestionCard({
  q,
  index,
  total,
  onAnswered,
}: {
  q: VideoCheckQuestion
  index: number
  total: number
  onAnswered: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleReveal = useCallback(async () => {
    if (!selected) return
    const correct = selected === q.correctAnswer
    setRevealed(true)
    onAnswered(correct)

    if (saved) return
    setSaved(true)
    try {
      await fetch('/api/academy/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          subskillSlug: q.subskillSlug,
          difficulty: q.difficulty,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          isCorrect: correct,
          sourceType: 'video_check',
          sourceId: q.videoKey,
        }),
      })
    } catch {
      // non-blocking
    }
  }, [selected, q, saved, onAnswered])

  const isCorrect = selected === q.correctAnswer

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Question {index + 1} of {total}
        </span>
        <span className={cn(
          'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium',
          q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
          q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700',
        )}>
          {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
        </span>
      </div>

      {q.stimulus && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-700 leading-relaxed">{q.stimulus}</p>
        </div>
      )}

      <p className="text-sm font-medium text-slate-900">{q.question}</p>

      <div className="space-y-2">
        {q.choices.map((choice) => {
          const isSelected = selected === choice.label
          const isCorrectChoice = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrectChoice) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
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
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-0.5">
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
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Submit answer
        </button>
      ) : (
        <div className={cn('rounded-lg border p-4 space-y-2', isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50')}>
          <p className={cn('text-xs font-bold uppercase tracking-wider', isCorrect ? 'text-emerald-600' : 'text-red-600')}>
            {isCorrect ? 'Correct' : `Incorrect — correct answer: ${q.correctAnswer}`}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
          {selected && !isCorrect && q.wrongAnswerExplanations[selected as AnswerLabel] && (
            <p className="text-xs text-slate-500 border-t border-current/10 pt-2">
              <span className="font-bold">Why ({selected}) is wrong:</span>{' '}
              {q.wrongAnswerExplanations[selected as AnswerLabel]}
            </p>
          )}
          <p className="text-xs text-slate-400 italic border-t border-current/10 pt-2">
            {q.teachingPoint}
          </p>
        </div>
      )}
    </div>
  )
}

export function VideoCheckQuestions({ questions, videoKey: _videoKey }: VideoCheckQuestionsProps) {
  const [answers, setAnswers] = useState<boolean[]>([])

  function handleAnswered(correct: boolean) {
    setAnswers(prev => [...prev, correct])
  }

  const allDone = answers.length === questions.length

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-900">Check Your Understanding</h3>
        {allDone && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
            {answers.filter(Boolean).length}/{questions.length} correct
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500">
        Answer these questions to test your understanding of the video. Your responses are recorded for review scheduling.
      </p>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            q={q}
            index={i}
            total={questions.length}
            onAnswered={handleAnswered}
          />
        ))}
      </div>
    </div>
  )
}
