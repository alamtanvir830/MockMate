'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { StimulusRenderer } from '@/components/exam/StimulusRenderer'
import { SATGraph } from '@/components/exam/SATGraph'
import { rwQuestions } from '@/lib/question-bank/sat/rw-questions'
import { mathQuestions } from '@/lib/question-bank/sat/math-questions'
import type { QBQuestion, QBDomain, QBDifficulty, QBSection } from '@/lib/question-bank/types'
import {
  selectQuestions,
  getSeenIds,
  markSeen,
  saveQBResult,
  loadAllQBResults,
  buildPersonalizedConfig,
} from '@/lib/question-bank/sat/question-selector'
import { loadPersonalizedSet } from '@/lib/question-bank/sat/personalized-sets'
import type { QBPracticeSetConfig, QBPracticeSetResult } from '@/lib/question-bank/types'

const allQuestions = [...rwQuestions, ...mathQuestions]

type PracticePhase = 'loading' | 'question' | 'feedback' | 'finished'

export function SATQBPracticeClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [questions, setQuestions] = useState<QBQuestion[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [phase, setPhase] = useState<PracticePhase>('loading')
  const [gridInput, setGridInput] = useState('')
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({})
  const startTimeRef = useRef<number>(Date.now())
  const setIdRef = useRef(`qb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`)

  useEffect(() => {
    const mode = searchParams.get('mode') ?? 'browse'
    const sectionParam = searchParams.get('section') as QBSection | null
    const domainsParam = searchParams.get('domains')
    const skillsParam = searchParams.get('skills')
    const diffsParam = searchParams.get('difficulties')
    const countParam = parseInt(searchParams.get('count') ?? '10')
    const storedSetId = searchParams.get('storedSetId')

    if (storedSetId) {
      const storedIds = loadPersonalizedSet(storedSetId)
      if (storedIds && storedIds.length > 0) {
        const ordered = storedIds
          .map(id => allQuestions.find(q => q.id === id))
          .filter((q): q is QBQuestion => q != null)
        if (ordered.length > 0) {
          setQuestions(ordered)
          setPhase('question')
          startTimeRef.current = Date.now()
          return
        }
      }
    }

    let config: QBPracticeSetConfig

    if (mode === 'personalized' && domainsParam) {
      config = {
        section: sectionParam ?? undefined,
        domains: domainsParam.split(',') as QBDomain[],
        difficulties: diffsParam ? diffsParam.split(',') as QBDifficulty[] : undefined,
        count: Math.min(Math.max(countParam, 3), 50),
        mode: 'personalized',
        sourceAttemptId: searchParams.get('sourceAttemptId') ?? undefined,
      }
    } else if (mode === 'personalized') {
      try {
        const stored = localStorage.getItem('mockmate_qb_personalized_config')
        if (stored) {
          config = JSON.parse(stored)
          config.mode = 'personalized'
        } else {
          config = {
            difficulties: ['medium', 'hard'],
            count: Math.min(countParam, 20),
            mode: 'personalized',
          }
        }
      } catch {
        config = { count: 20, mode: 'personalized' }
      }
    } else {
      config = {
        section: sectionParam ?? undefined,
        domains: domainsParam ? domainsParam.split(',') as QBDomain[] : undefined,
        skills: skillsParam ? skillsParam.split(',') : undefined,
        difficulties: diffsParam ? diffsParam.split(',') as QBDifficulty[] : undefined,
        count: Math.min(Math.max(countParam, 3), 50),
        mode: 'browse',
      }
    }

    const seenIds = getSeenIds()
    const sel = selectQuestions(allQuestions, config, seenIds)

    if (sel.length === 0) {
      const fallback = selectQuestions(allQuestions, { count: config.count, mode: 'browse' }, new Set())
      setQuestions(fallback)
    } else {
      setQuestions(sel)
    }

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
    if (!currentQ) return
    const ans = currentQ.questionType === 'grid_in' ? gridInput.trim() : selected
    if (!ans) return
    recordTime(currentQ.id)
    setAnswers(prev => ({ ...prev, [currentQ.id]: ans }))
    setPhase('feedback')
  }

  function handleNext() {
    setSelected(null)
    setGridInput('')
    if (isLast) {
      finishSet()
    } else {
      setQIdx(i => i + 1)
      setPhase('question')
      startTimeRef.current = Date.now()
    }
  }

  function finishSet() {
    markSeen(questions.map(q => q.id))
    const domainsParam = searchParams.get('domains')
    const result: QBPracticeSetResult = {
      id: setIdRef.current,
      config: {
        section: searchParams.get('section') as QBSection | undefined,
        domains: domainsParam ? domainsParam.split(',') as QBDomain[] : undefined,
        count: questions.length,
        mode: (searchParams.get('mode') ?? 'browse') as 'browse' | 'personalized',
        sourceAttemptId: searchParams.get('sourceAttemptId') ?? undefined,
        storedSetId: searchParams.get('storedSetId') ?? undefined,
      },
      questionIds: questions.map(q => q.id),
      answers,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString(),
    }
    saveQBResult(result)
    router.push(`/question-bank/sat/results?setId=${setIdRef.current}`)
  }

  // ── Loading ──────────────────────────────────────────────────────────────────

  if (phase === 'loading' || !currentQ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-[#1b3a5c]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Building your practice set…
        </div>
      </div>
    )
  }

  const userAns = answers[currentQ.id]
  const isCorrect = currentQ.questionType === 'grid_in'
    ? (currentQ.acceptableAnswers ?? [currentQ.correctAnswer]).some(a =>
        a.replace(/\s/g, '').toLowerCase() === userAns?.replace(/\s/g, '').toLowerCase()
      )
    : userAns === currentQ.correctAnswer

  const diffBadge = currentQ.difficulty === 'easy'
    ? 'text-emerald-200 border-emerald-600/60 bg-emerald-800/30'
    : currentQ.difficulty === 'medium'
    ? 'text-amber-200 border-amber-500/60 bg-amber-700/25'
    : 'text-red-200 border-red-500/60 bg-red-700/25'

  const progress = ((qIdx + (phase === 'feedback' ? 1 : 0)) / questions.length) * 100

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50">

      {/* ══ STICKY HEADER ═══════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-20 bg-[#1b3a5c] px-5 h-14 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/question-bank/sat"
            className="text-blue-300 hover:text-white transition-colors shrink-0"
            title="Exit to SAT Question Bank"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-300 leading-none mb-0.5">
              MockMate SAT Question Bank
            </div>
            <div className="text-[14px] font-bold text-white leading-none">
              Question {qIdx + 1} of {questions.length}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={cn('text-[10px] font-bold px-2.5 py-1 rounded border capitalize tracking-wide', diffBadge)}>
            {currentQ.difficulty}
          </span>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-28 bg-[#0f2340] rounded-full h-1.5">
              <div
                className="bg-blue-300 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-blue-300 font-medium whitespace-nowrap">
              {Math.round(progress)}%
            </span>
          </div>

          {phase === 'question' && (
            <button
              onClick={finishSet}
              className="text-[11px] text-blue-300 hover:text-white transition-colors font-medium border border-blue-600/50 hover:border-blue-400/70 px-2.5 py-1 rounded"
            >
              Finish early
            </button>
          )}
        </div>
      </div>

      {/* ══ CONTENT ═════════════════════════════════════════════════════════════ */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Question card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Meta */}
            <div className="px-5 pt-4 pb-2 border-b border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                {currentQ.domain}
              </span>
              <span className="text-slate-200">·</span>
              <span className="text-[11px] text-slate-400">{currentQ.skill}</span>
            </div>

            {/* Stimulus */}
            {currentQ.stimulus && (
              <div className="px-5 pt-4 pb-3 bg-slate-50 border-b border-slate-100">
                <div className="text-[13px] text-slate-700 leading-relaxed">
                  <StimulusRenderer text={currentQ.stimulus} underlineTargets={currentQ.underlineTargets} />
                </div>
              </div>
            )}

            {/* Graph */}
            {currentQ.graphData && (
              <div className="px-5 pt-4 pb-3 bg-slate-50 border-b border-slate-100">
                <SATGraph data={currentQ.graphData} className="" />
              </div>
            )}

            {/* Question */}
            <div className="px-5 py-4">
              <p className="text-[14px] font-medium text-slate-900 leading-relaxed">{currentQ.question}</p>
            </div>

            {/* Choices or grid-in */}
            <div className="px-5 pb-5 space-y-2">
              {currentQ.questionType === 'multiple_choice' && currentQ.choices ? (
                currentQ.choices.map(choice => {
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
                          ? 'border-[#1b3a5c] bg-blue-50 text-slate-900'
                          : 'border-slate-200 bg-white hover:border-[#1b3a5c]/40 hover:bg-blue-50/40 text-slate-700'
                      )}
                    >
                      <span className={cn(
                        'h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5',
                        showFeedback
                          ? isCorrectChoice ? 'bg-green-500 text-white' : isSelected ? 'bg-red-400 text-white' : 'bg-slate-100 text-slate-400'
                          : isSelected ? 'bg-[#1b3a5c] text-white' : 'bg-slate-100 text-slate-500'
                      )}>
                        {showFeedback && isCorrectChoice ? '✓' : showFeedback && isSelected && !isCorrectChoice ? '✗' : choice.label}
                      </span>
                      <span className="flex-1 leading-relaxed">{choice.text}</span>
                    </button>
                  )
                })
              ) : (
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-500">Your Answer</label>
                  <input
                    type="text"
                    value={gridInput}
                    onChange={e => setGridInput(e.target.value)}
                    disabled={phase === 'feedback'}
                    placeholder="Enter your answer"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1b3a5c]/30 disabled:bg-slate-50"
                  />
                  {phase === 'feedback' && (
                    <div className={cn('flex items-center gap-2 text-[12px] font-medium px-3 py-2 rounded-lg',
                      isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    )}>
                      {isCorrect ? '✓ Correct!' : `✗ Incorrect. Correct answer: ${currentQ.correctAnswer}`}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit / Feedback */}
            {phase === 'question' ? (
              <div className="px-5 pb-5">
                <button
                  onClick={handleAnswer}
                  disabled={currentQ.questionType === 'multiple_choice' ? !selected : !gridInput.trim()}
                  className="w-full bg-[#1b3a5c] hover:bg-[#152d48] disabled:opacity-40 text-white font-semibold text-[13px] py-3 rounded-xl transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="border-t border-slate-100">
                {/* Correct/incorrect banner */}
                <div className={cn('px-5 py-3 flex items-center gap-2',
                  isCorrect ? 'bg-green-50' : 'bg-red-50'
                )}>
                  <div className={cn('h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0',
                    isCorrect ? 'bg-green-500' : 'bg-red-400'
                  )}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div>
                    <p className={cn('text-[13px] font-semibold', isCorrect ? 'text-green-800' : 'text-red-800')}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    {!isCorrect && currentQ.questionType === 'multiple_choice' && (
                      <p className="text-[12px] text-red-600">
                        Correct answer: <strong>{currentQ.correctAnswer}</strong>
                      </p>
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

                  {currentQ.wrongAnswerExplanations && currentQ.choices && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Why the other choices are wrong</p>
                      {currentQ.choices.filter(c => c.label !== currentQ.correctAnswer).map(c => (
                        <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-3">
                          <p className="text-[11px] font-semibold text-red-600 mb-1">Choice {c.label}</p>
                          <p className="text-[12px] text-slate-600 leading-relaxed">
                            {currentQ.wrongAnswerExplanations?.[c.label] ?? 'This choice does not best answer the question.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-[11px] font-bold text-[#1b3a5c] uppercase tracking-widest mb-1.5">Teaching Point</p>
                    <p className="text-[13px] text-[#1b3a5c]/80 leading-relaxed">{currentQ.teachingPoint}</p>
                  </div>

                  {currentQ.relatedSkills.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-slate-400">Related skills:</span>
                      {currentQ.relatedSkills.map(s => (
                        <span key={s} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={handleNext}
                    className="w-full bg-[#1b3a5c] hover:bg-[#152d48] text-white font-semibold text-[13px] py-3 rounded-xl transition-colors"
                  >
                    {isLast ? 'View Results →' : 'Next Question →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
