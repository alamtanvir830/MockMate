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

const SECTION_LABEL: Record<string, string> = {
  'chem-phys': 'Chem/Phys',
  'cars': 'CARS',
  'bio-biochem': 'Bio/Biochem',
  'psych-soc': 'Psych/Soc',
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  )
}
function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}
function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}
function IconCheck({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}
function IconX({ className }: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// ── Table renderer ────────────────────────────────────────────────────────────

function QuestionTable({ data }: { data: NonNullable<MCATQBQuestion['tableData']> }) {
  return (
    <div className="overflow-x-auto">
      {data.caption && (
        <p className="text-[11px] text-slate-500 italic mb-2">{data.caption}</p>
      )}
      <table className="min-w-full text-[12px] border border-slate-300">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-300">
            {data.headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-slate-700 border-r last:border-r-0 border-slate-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className={cn('border-b border-slate-100', ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/60')}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-slate-700 border-r last:border-r-0 border-slate-100">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function MCATQBPracticePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [questions, setQuestions] = useState<MCATQBQuestion[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const startTimeRef = useRef<number>(Date.now())
  const setIdRef = useRef(`mcat-qb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`)

  useEffect(() => {
    const modeParam = searchParams.get('mode')
    const countParam = parseInt(searchParams.get('count') ?? '10')

    if (modeParam === 'custom') {
      try {
        const raw = sessionStorage.getItem('mockmate_mcat_custom_session')
        if (raw) {
          const questionIds: string[] = JSON.parse(raw)
          const idSet = new Set(questionIds)
          const orderMap = new Map(questionIds.map((id, i) => [id, i]))
          const qs = allMCATQBQuestions
            .filter(q => idSet.has(q.id))
            .sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0))
          if (qs.length > 0) {
            setQuestions(qs)
            setPhase('question')
            startTimeRef.current = Date.now()
            return
          }
        }
      } catch { /* fall through to normal selection */ }
    }

    const sectionParam = searchParams.get('section') as MCATQBSection | null
    const disciplinesParam = searchParams.get('disciplines')
    const diffsParam = searchParams.get('difficulties')
    const skillsParam = searchParams.get('skills')

    const config = {
      section: sectionParam ?? undefined,
      disciplines: disciplinesParam ? disciplinesParam.split(',') : undefined,
      difficulties: diffsParam ? diffsParam.split(',') as MCATQBDifficulty[] : undefined,
      skills: skillsParam ? skillsParam.split(',') as MCATQBSkill[] : undefined,
      count: Math.min(Math.max(countParam, 3), 50),
    }

    const seenIds = getMCATSeenIds()
    let sel = selectMCATQuestions(allMCATQBQuestions, config, seenIds)
    if (sel.length === 0) {
      sel = selectMCATQuestions(allMCATQBQuestions, { count: config.count }, new Set())
    }

    setQuestions(sel)
    setPhase('question')
    startTimeRef.current = Date.now()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentQ = questions[qIdx]
  const isLast = qIdx === questions.length - 1
  const hasLeftPane = !!(currentQ?.passageText || currentQ?.tableData)

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
      const nextIdx = qIdx + 1
      setQIdx(nextIdx)
      // If going to an already-answered question (navigated back), show feedback
      setPhase(answers[questions[nextIdx]?.id] ? 'feedback' : 'question')
      startTimeRef.current = Date.now()
    }
  }

  function handlePrevious() {
    if (qIdx === 0) return
    setSelected(null)
    setQIdx(i => i - 1)
    setPhase('feedback') // previous questions are always already answered
    startTimeRef.current = Date.now()
  }

  function toggleFlag(id: string) {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
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

  // ── Loading ──────────────────────────────────────────────────────────────────

  if (phase === 'loading' || !currentQ) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24">
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
  const isFlagged = flagged.has(currentQ.id)

  // ── Render ───────────────────────────────────────────────────────────────────
  // Break out of the dashboard container's padding to fill the content area edge-to-edge.
  // Sticky header/footer pins to the main scroll container viewport.

  return (
    <div className="-mt-8 -mb-8 -mx-4 sm:-mx-6 lg:-mx-8 flex flex-col bg-white">

      {/* ══ STICKY HEADER ═══════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-20">

        {/* Main green header bar */}
        <div className="bg-emerald-700 px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/question-bank/mcat"
              className="text-emerald-300 hover:text-white transition-colors shrink-0"
              title="Exit to MCAT Question Bank"
            >
              <IconArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 leading-none mb-0.5">
                MockMate MCAT Question Bank
              </div>
              <div className="text-[14px] font-bold text-white leading-none">
                Question {qIdx + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Difficulty badge */}
            <span className={cn(
              'text-[10px] font-bold px-2.5 py-1 rounded border capitalize tracking-wide',
              currentQ.difficulty === 'easy'
                ? 'text-emerald-100 border-emerald-500 bg-emerald-600/40'
                : currentQ.difficulty === 'medium'
                ? 'text-amber-200 border-amber-500/70 bg-amber-600/25'
                : 'text-red-200 border-red-500/70 bg-red-600/25'
            )}>
              {currentQ.difficulty}
            </span>

            {/* Progress bar — inline in header */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 bg-emerald-900/50 rounded-full h-1.5">
                <div
                  className="bg-emerald-300 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((qIdx + (phase === 'feedback' ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-emerald-300 font-medium whitespace-nowrap">
                {Math.round(((qIdx + (phase === 'feedback' ? 1 : 0)) / questions.length) * 100)}%
              </span>
            </div>

            {phase === 'question' && (
              <button
                onClick={finishSet}
                className="text-[11px] font-semibold text-emerald-200 hover:text-white border border-emerald-500 hover:border-emerald-300 px-3 py-1.5 rounded transition-colors"
              >
                End Session
              </button>
            )}
          </div>
        </div>

        {/* Section info sub-bar */}
        <div className="bg-emerald-800 px-5 py-2 flex items-center gap-2 text-[11px]">
          <span className="font-bold text-white">{SECTION_LABEL[currentQ.section] ?? currentQ.section}</span>
          <span className="text-emerald-500 select-none">|</span>
          <span className="text-emerald-200">{currentQ.discipline}</span>
          <span className="text-emerald-500 select-none">|</span>
          <span className="text-emerald-300">{currentQ.scientificSkill}</span>
          {isFlagged && (
            <>
              <span className="text-emerald-500 select-none">|</span>
              <span className="text-amber-300 font-semibold">⚑ Flagged for Review</span>
            </>
          )}
        </div>

        {/* Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 h-9 flex items-center gap-0.5">
          {/* Highlight — visual placeholder */}
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-400 rounded hover:bg-slate-200/70 transition-colors"
            title="Text highlighting — coming soon"
            tabIndex={-1}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
            Highlight
          </button>

          {/* Strikeout — visual placeholder */}
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-400 rounded hover:bg-slate-200/70 transition-colors"
            title="Strikeout — coming soon"
            tabIndex={-1}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5 opacity-70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M9 6l3 3-3 3M15 6l-3 3 3 3" />
            </svg>
            Strikeout
          </button>

          <div className="w-px h-4 bg-slate-300 mx-1" />

          {/* Flag — functional */}
          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded transition-colors',
              isFlagged
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            )}
          >
            <svg
              fill={isFlagged ? 'currentColor' : 'none'}
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
            {isFlagged ? 'Flagged' : 'Flag for Review'}
          </button>

          {/* Question progress dots — right side */}
          <div className="ml-auto flex items-center gap-1.5 pr-1">
            {questions.map((q, i) => (
              <div
                key={i}
                title={`Q${i + 1}${answers[q.id] ? ' (answered)' : ''}`}
                className={cn(
                  'rounded-full transition-all shrink-0',
                  i === qIdx
                    ? 'h-2.5 w-2.5 bg-emerald-600 ring-2 ring-emerald-200'
                    : answers[q.id]
                    ? 'h-2 w-2 bg-emerald-500'
                    : 'h-2 w-2 bg-slate-200'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      {/* ══ END STICKY HEADER ═══════════════════════════════════════════════════ */}


      {/* ══ MAIN CONTENT AREA ═══════════════════════════════════════════════════ */}
      <div className="flex flex-1 min-h-[65vh]">

        {/* ── Left pane: passage / stimulus ────────────────────────────────── */}
        {hasLeftPane && (
          <div className="w-[46%] border-r border-slate-200 bg-[#FAFAF8] shrink-0">
            <div className="px-7 py-6">
              {currentQ.passageText && (
                <>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 pb-3 border-b border-slate-200">
                    Passage
                  </div>
                  <div className="text-[13.5px] leading-[1.95] text-slate-800 whitespace-pre-wrap">
                    {currentQ.passageText}
                  </div>
                </>
              )}
              {currentQ.tableData && (
                <div className={currentQ.passageText ? 'mt-6' : ''}>
                  {!currentQ.passageText && (
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 pb-3 border-b border-slate-200">
                      Data / Figure
                    </div>
                  )}
                  <QuestionTable data={currentQ.tableData} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Right pane: question + choices + feedback ─────────────────────── */}
        <div className={cn('bg-white', hasLeftPane ? 'flex-1 min-w-0' : 'w-full')}>
          <div className={cn('py-7', hasLeftPane ? 'px-7' : 'px-8 max-w-3xl')}>

            {/* Question label */}
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 pb-3 border-b border-slate-200">
              Question {qIdx + 1}
            </div>

            {/* Question stem */}
            <p className="text-[14px] font-medium text-slate-900 leading-relaxed mb-6">
              {currentQ.question}
            </p>

            {/* ── Answer choices ── */}
            <div className="border border-slate-300 rounded overflow-hidden divide-y divide-slate-200">
              {currentQ.choices.map(choice => {
                const isChosen = phase === 'question'
                  ? selected === choice.label
                  : userAns === choice.label
                const isCorrectChoice = choice.label === currentQ.correctAnswer
                const showFeedback = phase === 'feedback'

                return (
                  <button
                    key={choice.label}
                    disabled={phase === 'feedback'}
                    onClick={() => phase === 'question' && setSelected(choice.label)}
                    className={cn(
                      'w-full flex items-stretch text-left transition-colors disabled:cursor-default group',
                      showFeedback
                        ? isCorrectChoice
                          ? 'bg-green-50'
                          : isChosen
                          ? 'bg-red-50'
                          : 'bg-white'
                        : isChosen
                        ? 'bg-emerald-50'
                        : 'bg-white hover:bg-slate-50'
                    )}
                  >
                    {/* Letter label column */}
                    <span className={cn(
                      'w-11 flex items-center justify-center text-[12px] font-bold shrink-0 border-r py-3.5',
                      showFeedback
                        ? isCorrectChoice
                          ? 'border-green-200 bg-green-100 text-green-700'
                          : isChosen
                          ? 'border-red-200 bg-red-100 text-red-600'
                          : 'border-slate-200 bg-slate-50 text-slate-400'
                        : isChosen
                        ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                        : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300'
                    )}>
                      {choice.label}
                    </span>

                    {/* Choice text */}
                    <span className={cn(
                      'flex-1 px-5 py-3.5 text-[13px] leading-relaxed',
                      showFeedback
                        ? isCorrectChoice ? 'text-slate-800' : isChosen ? 'text-slate-700' : 'text-slate-500'
                        : isChosen ? 'text-slate-900' : 'text-slate-700'
                    )}>
                      {choice.text}
                    </span>

                    {/* Result icon */}
                    {showFeedback && isCorrectChoice && (
                      <span className="pr-4 flex items-center text-green-600 shrink-0">
                        <IconCheck className="h-4 w-4" />
                      </span>
                    )}
                    {showFeedback && isChosen && !isCorrectChoice && (
                      <span className="pr-4 flex items-center text-red-500 shrink-0">
                        <IconX className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* ── Feedback panel ── */}
            {phase === 'feedback' && (
              <div className="mt-6 space-y-4">

                {/* Result banner */}
                <div className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded border text-[13px] font-semibold',
                  isCorrect
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                )}>
                  <div className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center text-white shrink-0',
                    isCorrect ? 'bg-green-500' : 'bg-red-400'
                  )}>
                    {isCorrect
                      ? <IconCheck className="h-3.5 w-3.5" />
                      : <IconX className="h-3.5 w-3.5" />
                    }
                  </div>
                  {isCorrect
                    ? 'Correct!'
                    : <span>Incorrect — Correct answer: <strong>{currentQ.correctAnswer}</strong></span>
                  }
                </div>

                {/* Explanation */}
                <div className="border border-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Explanation — Answer {currentQ.correctAnswer}
                    </span>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[13px] text-slate-700 leading-relaxed">{currentQ.explanation}</p>
                  </div>
                </div>

                {/* Wrong answer explanations */}
                {currentQ.wrongAnswerExplanations && (
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Why Other Choices Are Incorrect
                      </span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {currentQ.choices.filter(c => c.label !== currentQ.correctAnswer).map(c => (
                        <div key={c.label} className="px-4 py-3 flex items-start gap-3">
                          <span className="text-[11px] font-bold text-red-500 shrink-0 mt-0.5">
                            {c.label}
                          </span>
                          <p className="text-[12px] text-slate-600 leading-relaxed">
                            {currentQ.wrongAnswerExplanations![c.label] ?? 'This choice does not best answer the question.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Teaching point */}
                <div className="border border-emerald-200 rounded overflow-hidden">
                  <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                      Teaching Point
                    </span>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[13px] text-slate-700 leading-relaxed">{currentQ.teachingPoint}</p>
                  </div>
                </div>

                {/* Related topics */}
                {currentQ.relatedTopics.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-1 pb-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Related Topics:
                    </span>
                    {currentQ.relatedTopics.map(t => (
                      <span
                        key={t}
                        className="text-[11px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ══ END MAIN CONTENT ════════════════════════════════════════════════════ */}


      {/* ══ STICKY FOOTER NAVIGATION ════════════════════════════════════════════ */}
      <div className="sticky bottom-0 z-20 bg-white border-t border-slate-300 px-5 py-3 flex items-center justify-between gap-4">

        {/* Previous */}
        <button
          onClick={handlePrevious}
          disabled={qIdx === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-slate-600 hover:text-slate-800 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <IconChevronLeft className="h-3.5 w-3.5" />
          Previous
        </button>

        {/* Center: question counter */}
        <span className="text-[12px] text-slate-400 font-medium tabular-nums">
          {qIdx + 1} / {questions.length}
        </span>

        {/* Submit / Next */}
        {phase === 'question' ? (
          <button
            onClick={handleAnswer}
            disabled={!selected}
            className="flex items-center gap-2 px-5 py-2 text-[12px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 text-[12px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
          >
            {isLast ? 'View Results' : <>Next Question <IconChevronRight className="h-3.5 w-3.5" /></>}
          </button>
        )}
      </div>
      {/* ══ END STICKY FOOTER ═══════════════════════════════════════════════════ */}

    </div>
  )
}
