'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'
import type {
  SHSATForm,
  SHSATSubsection,
  SHSATSubsectionType,
  SHSATQuestion,
} from '@/lib/premade-exams/shsat-form-1'

type AnswerKey = 'A' | 'B' | 'C' | 'D'

// ─── Phase state machine ───────────────────────────────────────────────────────
type Phase =
  | { tag: 'transition'; subIdx: number }
  | { tag: 'question';   globalIdx: number }
  | { tag: 'end' }
  | { tag: 'results' }

// ─── Flat question ─────────────────────────────────────────────────────────────
interface FlatQuestion {
  globalIndex: number
  globalNumber: number
  subIdx: number
  subType: SHSATSubsectionType
  // Passage layout extras (RC only)
  passageId?: string
  passageTitle?: string
  passageContent?: string
  passageAuthor?: string
  passageQStart?: number
  passageQEnd?: number
  question: SHSATQuestion
}

function buildFlatQuestions(form: SHSATForm): FlatQuestion[] {
  const flat: FlatQuestion[] = []
  let g = 0
  form.subsections.forEach((sub, subIdx) => {
    if (sub.passages) {
      for (const passage of sub.passages) {
        const pStart = g + 1
        const pEnd   = pStart + passage.questions.length - 1
        for (const q of passage.questions) {
          flat.push({
            globalIndex: g, globalNumber: g + 1,
            subIdx, subType: sub.type,
            passageId: passage.id, passageTitle: passage.title,
            passageContent: passage.content, passageAuthor: passage.author,
            passageQStart: pStart, passageQEnd: pEnd,
            question: q,
          })
          g++
        }
      }
    } else if (sub.questions) {
      for (const q of sub.questions) {
        flat.push({ globalIndex: g, globalNumber: g + 1, subIdx, subType: sub.type, question: q })
        g++
      }
    }
  })
  return flat
}

function formatTime(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

// ─── Transition screen ─────────────────────────────────────────────────────────
function TransitionScreen({
  sub, onBegin, timerEl,
}: {
  sub: SHSATSubsection
  onBegin: () => void
  timerEl: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#d6dce4] flex flex-col overflow-auto">
      {/* minimal top strip with timer */}
      <div className="shrink-0 h-10 bg-[#1b3a5c] flex items-center justify-end px-5 gap-3">
        {timerEl}
        <span className="text-xs text-white/50">Guest</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
            {sub.sectionLabel}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">
            {sub.title}
          </h1>

          {/* Math: important notes bullets first */}
          {sub.directionBullets && sub.directionBullets.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-3">
                Important Notes
              </p>
              <ol className="space-y-1.5">
                {sub.directionBullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span className="shrink-0 font-semibold text-slate-500">{i + 1}.</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-2">
              Directions
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">{sub.directions}</p>
          </div>

          <button
            onClick={onBegin}
            className="mt-8 rounded-lg bg-[#1b3a5c] text-white text-sm font-semibold px-8 py-3 hover:bg-[#142e4d] transition-colors"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── End / Review screen ───────────────────────────────────────────────────────
function EndScreen({
  sectionNumber, flatQuestions, answers, bookmarked,
  onGoTo, onSubmit, timerEl,
}: {
  sectionNumber: number
  flatQuestions: FlatQuestion[]
  answers: Record<string, AnswerKey>
  bookmarked: Set<string>
  onGoTo: (i: number) => void
  onSubmit: () => void
  timerEl: React.ReactNode
}) {
  const total      = flatQuestions.length
  const answered   = flatQuestions.filter(fq => !!answers[fq.question.id]).length
  const unanswered = total - answered

  return (
    <div className="fixed inset-0 z-50 bg-[#d6dce4] flex flex-col overflow-hidden">
      {/* top strip */}
      <div className="shrink-0 h-10 bg-[#1b3a5c] flex items-center justify-between px-5">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
          End of Section {sectionNumber}
        </span>
        <div className="flex items-center gap-3">
          {timerEl}
          <span className="text-xs text-white/50">Guest</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            End of Section {sectionNumber}
          </h1>
          <p className="text-sm text-slate-600 mb-1">
            Use the list below to go back and review your answers. When you are done, use the{' '}
            <span className="font-semibold">Submit Final Answers</span> button below.
          </p>
          {unanswered > 0 && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3 inline-block">
              {unanswered} question{unanswered !== 1 ? 's' : ''} not yet answered
              <span className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-orange-500 border border-orange-400" />
            </p>
          )}

          {/* Question grid */}
          <div className="mt-6 grid grid-cols-10 gap-1.5">
            {flatQuestions.map((fq) => {
              const isAnswered  = !!answers[fq.question.id]
              const isBookmarked = bookmarked.has(fq.question.id)
              return (
                <button
                  key={fq.question.id}
                  onClick={() => onGoTo(fq.globalIndex)}
                  title={`Question ${fq.globalNumber}${!isAnswered ? ' — not answered' : ''}${isBookmarked ? ' — bookmarked' : ''}`}
                  className={cn(
                    'relative flex h-8 w-full items-center justify-center rounded text-xs font-semibold border transition-colors',
                    isAnswered
                      ? 'bg-[#e8edf3] border-[#b0bfcf] text-[#1b3a5c]'
                      : 'bg-white border-orange-400 text-slate-700',
                  )}
                >
                  {fq.globalNumber}
                  {!isAnswered && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-orange-500" />
                  )}
                  {isBookmarked && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded bg-[#e8edf3] border border-[#b0bfcf]" />
              Answered
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative inline-block h-3 w-3 rounded border border-orange-400 bg-white">
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              Not answered
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative inline-block h-3 w-3 rounded bg-[#e8edf3] border border-[#b0bfcf]">
                <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              Bookmarked
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="mt-8 rounded-lg bg-[#1b3a5c] text-white text-sm font-semibold px-8 py-3 hover:bg-[#142e4d] transition-colors"
          >
            Submit Final Answers
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Results screen ────────────────────────────────────────────────────────────
function ResultsScreen({
  form, flatQuestions, answers, timedOut, onRetake,
}: {
  form: SHSATForm
  flatQuestions: FlatQuestion[]
  answers: Record<string, AnswerKey>
  timedOut: boolean
  onRetake: () => void
}) {
  const total   = flatQuestions.length
  const correct = flatQuestions.filter(fq => answers[fq.question.id] === fq.question.correct_answer).length
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      {timedOut && (
        <div className="fixed top-0 inset-x-0 bg-amber-500 text-white text-center py-2 text-sm font-medium z-10">
          Time&apos;s up — your exam was submitted automatically.
        </div>
      )}
      <div className={cn('mx-auto max-w-3xl space-y-6', timedOut && 'pt-8')}>
        {/* Score */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">{form.title}</p>
          <div className="mt-3 flex items-end justify-center gap-2">
            <span className="text-6xl font-bold text-slate-900">{correct}</span>
            <span className="text-2xl text-slate-400 mb-2">/{total}</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-slate-700">{pct}% correct</p>
        </div>

        {/* Per-question review */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Question Review</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {flatQuestions.map((fq) => {
              const sel  = answers[fq.question.id] as AnswerKey | undefined
              const ok   = sel === fq.question.correct_answer
              const skip = !sel
              const correctChoice  = fq.question.choices.find(c => c.id === fq.question.correct_answer)
              const selectedChoice = sel ? fq.question.choices.find(c => c.id === sel) : undefined
              return (
                <div key={fq.question.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      skip ? 'bg-slate-100 text-slate-400' : ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600',
                    )}>
                      {skip ? '–' : ok ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-1">Q{fq.globalNumber}</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{fq.question.question}</p>
                      <div className="mt-1.5 space-y-0.5 text-xs">
                        {!ok && selectedChoice && (
                          <p className="text-red-600">Your answer: {selectedChoice.id}. {selectedChoice.text}</p>
                        )}
                        <p className="text-emerald-700 font-medium">
                          Correct: {correctChoice?.id}. {correctChoice?.text}
                        </p>
                        {skip && <p className="text-slate-400 italic">Not answered</p>}
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

// ─── Main component ────────────────────────────────────────────────────────────

interface Props { form: SHSATForm }

export function SHSATExamTaker({ form }: Props) {
  const flatQuestions  = useMemo(() => buildFlatQuestions(form), [form])
  const totalQ         = flatQuestions.length

  // Index of the first question in each subsection
  const subsectionStarts = useMemo(() => {
    const starts: number[] = []
    flatQuestions.forEach((fq) => {
      if (starts[fq.subIdx] === undefined) starts[fq.subIdx] = fq.globalIndex
    })
    return starts
  }, [flatQuestions])

  const [phase, setPhase]         = useState<Phase>({ tag: 'transition', subIdx: 0 })
  const [answers, setAnswers]     = useState<Record<string, AnswerKey>>({})
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())
  const [secondsLeft, setSecondsLeft] = useState(form.timeLimitMinutes * 60)
  const [timedOut, setTimedOut]   = useState(false)

  const passagePanelRef = useRef<HTMLDivElement>(null)
  const prevPassageId   = useRef<string>('')

  // ── Timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase.tag === 'results') return
    if (secondsLeft <= 0) { setTimedOut(true); setPhase({ tag: 'results' }); return }
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [phase.tag, secondsLeft])

  // ── Scroll passage panel to top on passage change ─────────────────────────
  useEffect(() => {
    if (phase.tag !== 'question') return
    const fq = flatQuestions[phase.globalIdx]
    if (!fq?.passageId) return
    if (fq.passageId !== prevPassageId.current) {
      prevPassageId.current = fq.passageId
      if (passagePanelRef.current) passagePanelRef.current.scrollTop = 0
    }
  }, [phase, flatQuestions])

  // ── Navigation ───────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (phase.tag === 'transition') {
      setPhase({ tag: 'question', globalIdx: subsectionStarts[phase.subIdx] })
      return
    }
    if (phase.tag === 'question') {
      const next = phase.globalIdx + 1
      if (next >= totalQ) { setPhase({ tag: 'end' }); return }
      const curSub  = flatQuestions[phase.globalIdx].subIdx
      const nextSub = flatQuestions[next].subIdx
      if (nextSub > curSub) {
        setPhase({ tag: 'transition', subIdx: nextSub })
      } else {
        setPhase({ tag: 'question', globalIdx: next })
      }
    }
  }, [phase, flatQuestions, totalQ, subsectionStarts])

  const handleBack = useCallback(() => {
    if (phase.tag === 'question' && phase.globalIdx > 0) {
      setPhase({ tag: 'question', globalIdx: phase.globalIdx - 1 })
    } else if (phase.tag === 'end') {
      setPhase({ tag: 'question', globalIdx: totalQ - 1 })
    }
  }, [phase, totalQ])

  const handleGoTo = useCallback((i: number) => {
    setPhase({ tag: 'question', globalIdx: i })
  }, [])

  const handleRetake = useCallback(() => {
    setPhase({ tag: 'transition', subIdx: 0 })
    setAnswers({})
    setBookmarked(new Set())
    setSecondsLeft(form.timeLimitMinutes * 60)
    setTimedOut(false)
    prevPassageId.current = ''
  }, [form.timeLimitMinutes])

  const isWarning = secondsLeft <= 300

  const timerEl = (
    <span className={cn(
      'text-xs font-mono font-bold tabular-nums px-2 py-0.5 rounded',
      isWarning ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white/90',
    )}>
      {formatTime(secondsLeft)}
    </span>
  )

  // ── Results ──────────────────────────────────────────────────────────────────
  if (phase.tag === 'results') {
    return (
      <ResultsScreen
        form={form}
        flatQuestions={flatQuestions}
        answers={answers}
        timedOut={timedOut}
        onRetake={handleRetake}
      />
    )
  }

  // ── Transition screen ────────────────────────────────────────────────────────
  if (phase.tag === 'transition') {
    return (
      <TransitionScreen
        sub={form.subsections[phase.subIdx]}
        onBegin={handleNext}
        timerEl={timerEl}
      />
    )
  }

  // ── End / Review screen ──────────────────────────────────────────────────────
  if (phase.tag === 'end') {
    return (
      <EndScreen
        sectionNumber={form.sectionNumber}
        flatQuestions={flatQuestions}
        answers={answers}
        bookmarked={bookmarked}
        onGoTo={handleGoTo}
        onSubmit={() => setPhase({ tag: 'results' })}
        timerEl={timerEl}
      />
    )
  }

  // ── Question screen ──────────────────────────────────────────────────────────
  const fq      = flatQuestions[phase.globalIdx]
  const subType = fq.subType
  const currentQ = fq.question

  const isPassageLayout  = subType === 'reading_comprehension'
  const isMathLayout     = subType === 'mathematics'

  const currentAnswer = answers[currentQ.id] as AnswerKey | undefined
  const isBookmarked  = bookmarked.has(currentQ.id)
  const answeredCount = Object.keys(answers).filter(k => !!answers[k]).length

  function toggleAnswer(choice: AnswerKey) {
    setAnswers(prev => {
      const next = { ...prev }
      if (next[currentQ.id] === choice) delete next[currentQ.id]
      else next[currentQ.id] = choice
      return next
    })
  }

  function toggleBookmark() {
    setBookmarked(prev => {
      const next = new Set(prev)
      if (next.has(currentQ.id)) next.delete(currentQ.id)
      else next.add(currentQ.id)
      return next
    })
  }

  // Shared answer choices (used in both layouts)
  const choicesEl = (
    <div className="space-y-2.5">
      {currentQ.choices.map((choice) => {
        const sel = currentAnswer === choice.id
        return (
          <button
            key={choice.id}
            type="button"
            onClick={() => toggleAnswer(choice.id)}
            className={cn(
              'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-[13px] transition-all cursor-pointer',
              sel
                ? 'border-[#1b3a5c] bg-[#eaf0f7]'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
            )}
          >
            <span className={cn(
              'flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors',
              sel ? 'border-[#1b3a5c] bg-[#1b3a5c] text-white' : 'border-slate-400 text-slate-500',
            )}>
              {choice.id}
            </span>
            <span className={cn('leading-relaxed', sel ? 'text-[#1b3a5c] font-medium' : 'text-slate-700')}>
              {choice.text}
            </span>
          </button>
        )
      })}
    </div>
  )

  // Bottom nav (shared across layouts)
  const bottomNav = (
    <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-white">
      <button
        onClick={handleBack}
        disabled={phase.globalIdx === 0}
        className="flex items-center gap-1.5 rounded border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>
      <button
        onClick={handleNext}
        className="flex items-center gap-1.5 rounded bg-[#1b3a5c] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#142e4d] transition-colors"
      >
        Next
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden">

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center h-11 px-3 bg-[#1b3a5c] text-white select-none gap-2">

        {/* Back / Forward arrows */}
        <div className="flex items-center gap-0.5">
          <button onClick={handleBack} disabled={phase.globalIdx === 0} title="Previous question"
            className="flex items-center justify-center h-8 w-8 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={handleNext} title="Next question"
            className="flex items-center justify-center h-8 w-8 rounded hover:bg-white/10 transition-colors">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex-1 text-center">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90">
            {form.title}
            <span className="mx-2 text-white/30">/</span>
            SECTION {form.sectionNumber}
            <span className="mx-2 text-white/30">/</span>
            ITEM {fq.globalNumber} OF {totalQ}
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {timerEl}

          {/* Review button */}
          <button
            onClick={() => setPhase({ tag: 'end' })}
            className="text-[11px] font-semibold px-2.5 py-1 rounded border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Review
          </button>

          {/* Bookmark toggle */}
          <button
            onClick={toggleBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
            className={cn(
              'flex items-center justify-center h-7 w-7 rounded transition-colors',
              isBookmarked ? 'text-amber-400' : 'text-white/50 hover:text-white/80',
            )}
          >
            <svg fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>

          <span className="text-xs text-white/50 pr-1">Guest</span>
        </div>
      </header>

      {/* ── SECOND BAR ──────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center h-9 px-4 bg-[#e8edf3] border-b border-slate-300">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
          SECTION {form.sectionNumber} / {fq.globalNumber} OF {totalQ}
        </span>
        <span className="ml-3 text-[11px] text-slate-400">
          {answeredCount} answered
        </span>
      </div>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      {isPassageLayout ? (
        /* Two-column: passage left, question right */
        <div className="flex-1 flex overflow-hidden">
          <div ref={passagePanelRef}
            className="w-1/2 overflow-y-auto bg-[#f4f4ef] border-r border-slate-300 px-8 py-7">
            <p className="text-[11px] font-medium text-slate-500 italic mb-5">
              Questions {fq.passageQStart}–{fq.passageQEnd} refer to the following passage.
            </p>
            <h2 className="text-sm font-bold text-slate-900 mb-3">{fq.passageTitle}</h2>
            {fq.passageAuthor && (
              <p className="text-xs text-slate-500 mb-4">by {fq.passageAuthor}</p>
            )}
            <div className="space-y-4">
              {(fq.passageContent ?? '').split('\n\n').filter(Boolean).map((p, i) => (
                <p key={i} className="text-[13px] text-slate-800 leading-[1.75]">{p}</p>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex flex-col overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto px-8 py-7">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">
                Question {fq.globalNumber}
              </p>
              <p className="text-[14px] text-slate-900 leading-relaxed font-medium mb-7">
                {currentQ.question}
              </p>
              {choicesEl}
            </div>
            {bottomNav}
          </div>
        </div>
      ) : (
        /* Centered: editing or math */
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className={cn(
            'flex-1 overflow-y-auto px-8 py-8',
            isMathLayout ? 'bg-white' : 'bg-white',
          )}>
            <div className="mx-auto max-w-2xl">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">
                Question {fq.globalNumber}
                {isMathLayout && (
                  <span className="ml-2 text-[10px] normal-case font-medium text-blue-600 tracking-normal">
                    Mathematics
                  </span>
                )}
                {!isMathLayout && (
                  <span className="ml-2 text-[10px] normal-case font-medium text-violet-600 tracking-normal">
                    Revising / Editing
                  </span>
                )}
              </p>
              <p className="text-[14px] text-slate-900 leading-relaxed font-medium mb-7">
                {currentQ.question}
              </p>
              {choicesEl}
            </div>
          </div>
          {bottomNav}
        </div>
      )}
    </div>
  )
}
