'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allMCATQBQuestions } from '@/lib/question-bank/mcat/index'
import {
  selectMCATQuestions,
  getMCATSeenIds,
  markMCATSeen,
  saveMCATQBResult,
} from '@/lib/question-bank/mcat/question-selector'
import type { MCATQBQuestion, MCATQBSection, MCATQBDifficulty, MCATQBSkill } from '@/lib/question-bank/mcat/types'

type Phase = 'loading' | 'question' | 'feedback' | 'finished'

export default function MCATQBPracticePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [questions, setQuestions] = useState<MCATQBQuestion[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({})
  const startTimeRef = useRef<number>(Date.now())
  const setIdRef = useRef(`mcat-qb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`)

  useEffect(() => {
    const sectionParam = searchParams.get('section') as MCATQBSection | null
    const disciplinesParam = searchParams.get('disciplines')
    const diffsParam = searchParams.get('difficulties')
    const skillsParam = searchParams.get('skills')
    const countParam = parseInt(searchParams.get('count') ?? '10')

    const config = {
      section: sectionParam ?? undefined,
      disciplines: disciplinesParam ? disciplinesParam.split(',') : undefined,
      difficulties: diffsParam ? diffsParam.split(',') as MCATQBDifficulty[] : undefined,
      skills: skillsParam ? skillsParam.split(',') as MCATQBSkill[] : undefined,
      count: Math.min(Math.max(countParam, 3), 50),
    }

    const seenIds = getMCATSeenIds()
    let selected = selectMCATQuestions(allMCATQBQuestions, config, seenIds)
    if (selected.length === 0) {
      selected = selectMCATQuestions(allMCATQBQuestions, { count: config.count }, new Set())
    }

    setQuestions(selected)
    setPhase('question')
    startTimeRef.current = Date.now()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentQ = questions[qIdx]
  const isLast = qIdx === questions.length - 1

  function recordTime(id: string) {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
    setTimeSpent(prev => ({ ...prev, [id]: elapsed }))
    startTimeRef.current = Date.now()
  }

  function handleAnswer() {
    if (!currentQ || !selected) return
    recordTime(currentQ.id)
    setAnswers(prev => ({ ...prev, [currentQ.id]: selected }))
    setPhase('feedback')
  }

  function handleNext() {
    setSelected(null)
    if (isLast) {
      finishSet()
    } else {
      setQIdx(i => i + 1)
      setPhase('question')
      startTimeRef.current = Date.now()
    }
  }

  function finishSet() {
    markMCATSeen(questions.map(q => q.id))
    const result = {
      id: setIdRef.current,
      questionIds: questions.map(q => q.id),
      answers,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString(),
      config: {
        section: searchParams.get('section') as MCATQBSection | undefined,
        difficulties: searchParams.get('difficulties')?.split(',') as MCATQBDifficulty[] | undefined,
        skills: searchParams.get('skills')?.split(',') as MCATQBSkill[] | undefined,
        count: questions.length,
      },
    }
    saveMCATQBResult(result)
    router.push(`/question-bank/mcat/results?setId=${setIdRef.current}`)
  }

  if (phase === 'loading' || !currentQ) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Building your practice set…
        </div>
      </div>
    )
  }

  const userAns = answers[currentQ.id]
  const isCorrect = userAns === currentQ.correctAnswer

  const diffColor = currentQ.difficulty === 'easy'
    ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
    : currentQ.difficulty === 'medium'
    ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-red-600 bg-red-50 border-red-200'

  const sectionLabel: Record<string, string> = {
    'chem-phys': 'Chem/Phys',
    'cars': 'CARS',
    'bio-biochem': 'Bio/Biochem',
    'psych-soc': 'Psych/Soc',
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-4">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/question-bank/mcat" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">MCAT Question Bank</p>
            <p className="text-[13px] font-semibold text-slate-700">Question {qIdx + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border capitalize', diffColor)}>
            {currentQ.difficulty}
          </span>
          {phase === 'question' && (
            <button onClick={finishSet} className="text-[12px] text-slate-400 hover:text-slate-600 transition-colors">
              Finish early
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div
          className="bg-teal-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((qIdx + (phase === 'feedback' ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Meta */}
        <div className="px-5 pt-4 pb-2 border-b border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
            {sectionLabel[currentQ.section] ?? currentQ.section}
          </span>
          <span className="text-slate-200">·</span>
          <span className="text-[11px] text-slate-400">{currentQ.discipline}</span>
          <span className="text-slate-200">·</span>
          <span className="text-[11px] text-slate-400">{currentQ.scientificSkill}</span>
        </div>

        {/* Passage */}
        {currentQ.passageText && (
          <div className="px-5 pt-4 pb-3 bg-slate-50 border-b border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Passage</p>
            <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{currentQ.passageText}</p>
          </div>
        )}

        {/* Table */}
        {currentQ.tableData && (
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 overflow-x-auto">
            {currentQ.tableData.caption && (
              <p className="text-[11px] text-slate-500 italic mb-2">{currentQ.tableData.caption}</p>
            )}
            <table className="min-w-full text-[11px]">
              <thead>
                <tr className="border-b border-slate-200">
                  {currentQ.tableData.headers.map((h, i) => (
                    <th key={i} className="px-3 py-1.5 text-left font-semibold text-slate-600 bg-slate-100 first:rounded-tl last:rounded-tr">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentQ.tableData.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-1.5 text-slate-700 border-b border-slate-100">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Question */}
        <div className="px-5 py-4">
          <p className="text-[14px] font-medium text-slate-900 leading-relaxed">{currentQ.question}</p>
        </div>

        {/* Choices */}
        <div className="px-5 pb-5 space-y-2">
          {currentQ.choices.map(choice => {
            const isSelected = phase === 'question' ? selected === choice.label : userAns === choice.label
            const isCorrectChoice = choice.label === currentQ.correctAnswer
            const showFeedback = phase === 'feedback'

            return (
              <button
                key={choice.label}
                disabled={phase === 'feedback'}
                onClick={() => setSelected(choice.label)}
                className={cn(
                  'w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all text-[13px]',
                  showFeedback
                    ? isCorrectChoice
                      ? 'border-green-500 bg-green-50 text-slate-900'
                      : isSelected
                      ? 'border-red-400 bg-red-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-500'
                    : isSelected
                    ? 'border-teal-500 bg-teal-50 text-slate-900'
                    : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 text-slate-700'
                )}
              >
                <span className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5',
                  showFeedback
                    ? isCorrectChoice ? 'bg-green-500 text-white' : isSelected ? 'bg-red-400 text-white' : 'bg-slate-100 text-slate-400'
                    : isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                )}>
                  {showFeedback && isCorrectChoice ? '✓' : showFeedback && isSelected && !isCorrectChoice ? '✗' : choice.label}
                </span>
                <span className="flex-1 leading-relaxed">{choice.text}</span>
              </button>
            )
          })}
        </div>

        {/* Submit */}
        {phase === 'question' ? (
          <div className="px-5 pb-5">
            <button
              onClick={handleAnswer}
              disabled={!selected}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold text-[13px] py-3 rounded-xl transition-colors"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="border-t border-slate-100">
            {/* Result banner */}
            <div className={cn('px-5 py-3 flex items-center gap-2', isCorrect ? 'bg-green-50' : 'bg-red-50')}>
              <div className={cn(
                'h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0',
                isCorrect ? 'bg-green-500' : 'bg-red-400'
              )}>
                {isCorrect ? '✓' : '✗'}
              </div>
              <div>
                <p className={cn('text-[13px] font-semibold', isCorrect ? 'text-green-800' : 'text-red-800')}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <p className="text-[12px] text-red-600">Correct answer: <strong>{currentQ.correctAnswer}</strong></p>
                )}
              </div>
            </div>

            {/* Explanation */}
            <div className="px-5 py-4 space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-[11px] font-bold text-green-700 uppercase tracking-widest mb-1.5">
                  Correct Answer: {currentQ.correctAnswer}
                </p>
                <p className="text-[13px] text-slate-700 leading-relaxed">{currentQ.explanation}</p>
              </div>

              {/* Wrong answer explanations */}
              {currentQ.wrongAnswerExplanations && (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Why the other choices are wrong</p>
                  {currentQ.choices.filter(c => c.label !== currentQ.correctAnswer).map(c => (
                    <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-3">
                      <p className="text-[11px] font-semibold text-red-600 mb-1">Choice {c.label}</p>
                      <p className="text-[12px] text-slate-600 leading-relaxed">
                        {currentQ.wrongAnswerExplanations[c.label] ?? 'This choice does not best answer the question.'}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Teaching point */}
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                <p className="text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-1.5">Teaching Point</p>
                <p className="text-[13px] text-teal-800 leading-relaxed">{currentQ.teachingPoint}</p>
              </div>

              {/* Related topics */}
              {currentQ.relatedTopics.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-slate-400">Related topics:</span>
                  {currentQ.relatedTopics.map(t => (
                    <span key={t} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Next */}
            <div className="px-5 pb-5">
              <button
                onClick={handleNext}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[13px] py-3 rounded-xl transition-colors"
              >
                {isLast ? 'View Results' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
