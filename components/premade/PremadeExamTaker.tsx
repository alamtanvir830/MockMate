'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'
// Local types — match the shsat-form-2.ts (v2 sections[] structure)
interface SHSATChoice { id: 'A'|'B'|'C'|'D'; text: string }
interface SHSATQuestion {
  id: string; type: 'mcq'; question: string
  choices: [SHSATChoice, SHSATChoice, SHSATChoice, SHSATChoice]
  correct_answer: 'A'|'B'|'C'|'D'
}
interface SHSATPassage { id: string; title: string; author?: string; content: string; questions: SHSATQuestion[] }
interface SHSATSection { id: string; number: number; title: string; passages: SHSATPassage[] }
interface SHSATForm { id: string; title: string; description: string; timeLimitMinutes: number; sections: SHSATSection[] }

type AnswerKey = 'A' | 'B' | 'C' | 'D'

// ─── Flat question (derived from sections › passages › questions) ─────────────

interface FlatQuestion {
  globalIndex: number   // 0-based
  globalNumber: number  // 1-based display
  sectionId: string
  sectionNumber: number
  sectionTitle: string
  passageId: string
  localIndex: number    // 0-based within passage
  passageTitle: string
  passageContent: string
  passageAuthor?: string
  passageQStart: number // 1-based first question number of this passage
  passageQEnd: number   // 1-based last question number of this passage
  question: SHSATQuestion
}

function buildFlatQuestions(form: SHSATForm): FlatQuestion[] {
  const flat: FlatQuestion[] = []
  let globalIndex = 0

  for (const section of form.sections) {
    for (const passage of section.passages) {
      const passageQStart = globalIndex + 1
      const passageQEnd = passageQStart + passage.questions.length - 1
      for (let localIdx = 0; localIdx < passage.questions.length; localIdx++) {
        flat.push({
          globalIndex,
          globalNumber: globalIndex + 1,
          sectionId: section.id,
          sectionNumber: section.number,
          sectionTitle: section.title,
          passageId: passage.id,
          localIndex: localIdx,
          passageTitle: passage.title,
          passageContent: passage.content,
          passageAuthor: passage.author,
          passageQStart,
          passageQEnd,
          question: passage.questions[localIdx],
        })
        globalIndex++
      }
    }
  }

  return flat
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ─── Results screen ───────────────────────────────────────────────────────────

interface ResultsProps {
  form: SHSATForm
  flatQuestions: FlatQuestion[]
  answers: Record<string, AnswerKey>
  onRetake: () => void
}

function ResultsScreen({ form, flatQuestions, answers, onRetake }: ResultsProps) {
  const total = flatQuestions.length
  const correct = flatQuestions.filter(
    (fq) => answers[fq.question.id] === fq.question.correct_answer,
  ).length
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  // Group by section for breakdown
  const sectionBreakdown = form.sections.map((sec) => {
    const secFQs = flatQuestions.filter((fq) => fq.sectionId === sec.id)
    const secCorrect = secFQs.filter(
      (fq) => answers[fq.question.id] === fq.question.correct_answer,
    ).length
    return { title: sec.title, total: secFQs.length, correct: secCorrect }
  })

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

          {sectionBreakdown.length > 0 && (
            <div className="mt-6 flex justify-center gap-8">
              {sectionBreakdown.map((sec, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{sec.title}</p>
                  <p className="text-xl font-bold text-[#1a3a5c]">{sec.correct}/{sec.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Per-question review */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Question Review</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {flatQuestions.map((fq) => {
              const selected = answers[fq.question.id] as AnswerKey | undefined
              const isCorrect = selected === fq.question.correct_answer
              const skipped = !selected

              const correctChoice = fq.question.choices.find(
                (c) => c.id === fq.question.correct_answer,
              )
              const selectedChoice = selected
                ? fq.question.choices.find((c) => c.id === selected)
                : undefined

              return (
                <div key={fq.question.id} className="px-6 py-4">
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
                      <p className="text-xs text-slate-400 mb-1">Q{fq.globalNumber}</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{fq.question.question}</p>
                      <div className="mt-2 space-y-1 text-xs">
                        {!isCorrect && selectedChoice && (
                          <p className="text-red-600">
                            Your answer: {selectedChoice.id}. {selectedChoice.text}
                          </p>
                        )}
                        <p className="text-emerald-700 font-medium">
                          Correct: {correctChoice?.id}. {correctChoice?.text}
                        </p>
                        {skipped && <p className="text-slate-400 italic">Not answered</p>}
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

// ─── Main exam taker ──────────────────────────────────────────────────────────

interface Props {
  form: SHSATForm
}

export function PremadeExamTaker({ form }: Props) {
  const flatQuestions = useMemo(() => buildFlatQuestions(form), [form])
  const totalQ = flatQuestions.length

  const [phase, setPhase] = useState<'exam' | 'results'>('exam')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerKey>>({})
  const [secondsLeft, setSecondsLeft] = useState(form.timeLimitMinutes * 60)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  const passagePanelRef = useRef<HTMLDivElement>(null)
  const prevPassageId = useRef<string>('')

  const fq = flatQuestions[currentIndex]
  const answeredCount = Object.keys(answers).filter((k) => !!answers[k]).length

  // ── Timer ──────────────────────────────────────────────────────────────────
  const doSubmit = useCallback(() => {
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
  }, [phase, secondsLeft])

  // ── Reset passage panel scroll when switching passages ─────────────────────
  useEffect(() => {
    if (!fq) return
    if (fq.passageId !== prevPassageId.current) {
      prevPassageId.current = fq.passageId
      if (passagePanelRef.current) {
        passagePanelRef.current.scrollTop = 0
      }
    }
  }, [fq])

  const goTo = (i: number) => setCurrentIndex(Math.max(0, Math.min(totalQ - 1, i)))

  const handleRetake = () => {
    setPhase('exam')
    setCurrentIndex(0)
    setAnswers({})
    setSecondsLeft(form.timeLimitMinutes * 60)
    setTimedOut(false)
    prevPassageId.current = ''
  }

  // ── Results phase ──────────────────────────────────────────────────────────
  if (phase === 'results') {
    return (
      <div>
        {timedOut && (
          <div className="bg-amber-500 text-white text-center py-2 text-sm font-medium">
            Time&apos;s up — your exam has been submitted automatically.
          </div>
        )}
        <ResultsScreen
          form={form}
          flatQuestions={flatQuestions}
          answers={answers}
          onRetake={handleRetake}
        />
      </div>
    )
  }

  if (!fq) return null

  const isWarning = secondsLeft <= 300
  const passageParagraphs = fq.passageContent.split('\n\n').filter(Boolean)
  const currentChoices = fq.question.choices

  // ── Exam UI ────────────────────────────────────────────────────────────────
  // Uses position:fixed so it escapes the dashboard's padded max-w-5xl wrapper
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden">

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center h-11 px-3 bg-[#1b3a5c] text-white select-none">

        {/* Left: prev / next arrows */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            title="Previous question"
            className="flex items-center justify-center h-8 w-8 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === totalQ - 1}
            title="Next question"
            className="flex items-center justify-center h-8 w-8 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Center: breadcrumb */}
        <div className="flex-1 text-center">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/90">
            {form.title}
            <span className="mx-2 text-white/40">/</span>
            SECTION {fq.sectionNumber}
            <span className="mx-2 text-white/40">/</span>
            ITEM {fq.globalNumber} OF {totalQ}
          </span>
        </div>

        {/* Right: timer + user */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={cn(
              'text-xs font-mono font-bold tabular-nums px-2.5 py-1 rounded',
              isWarning ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white/90',
            )}
          >
            {formatTime(secondsLeft)}
          </span>
          <span className="text-xs text-white/50 pr-1">Guest</span>
        </div>
      </header>

      {/* ── SECOND BAR ───────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between h-9 px-4 bg-[#e8edf3] border-b border-slate-300">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
          SECTION {fq.sectionNumber} / {fq.globalNumber} OF {totalQ}
        </span>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="text-[11px] font-semibold uppercase tracking-wide bg-[#1b3a5c] text-white px-3 py-1 rounded hover:bg-[#142e4d] transition-colors"
        >
          Submit Exam
        </button>
      </div>

      {/* ── MAIN 2-COLUMN ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: Passage panel — scrollable, fixed while navigating within same passage */}
        <div
          ref={passagePanelRef}
          className="w-1/2 overflow-y-auto bg-[#f4f4ef] border-r border-slate-300 px-8 py-7"
        >
          <p className="text-[11px] font-medium text-slate-500 italic mb-5">
            Questions {fq.passageQStart}–{fq.passageQEnd} refer to the following passage.
          </p>

          <h2 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{fq.passageTitle}</h2>

          {fq.passageAuthor && (
            <p className="text-xs text-slate-500 mb-4">by {fq.passageAuthor}</p>
          )}

          <div className="space-y-4 mt-4">
            {passageParagraphs.map((para, i) => (
              <p key={i} className="text-[13px] text-slate-800 leading-[1.75]">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT: Question panel */}
        <div className="w-1/2 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto px-8 py-7">

            <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">
              Question {fq.globalNumber}
            </p>

            <p className="text-[14px] text-slate-900 leading-relaxed font-medium mb-7">
              {fq.question.question}
            </p>

            {/* Answer choices */}
            <div className="space-y-2.5">
              {currentChoices.map((choice) => {
                const isSelected = answers[fq.question.id] === choice.id
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => {
                        const next = { ...prev }
                        if (next[fq.question.id] === choice.id) {
                          delete next[fq.question.id]
                        } else {
                          next[fq.question.id] = choice.id
                        }
                        return next
                      })
                    }
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-[13px] transition-all cursor-pointer',
                      isSelected
                        ? 'border-[#1b3a5c] bg-[#eaf0f7]'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                    )}
                  >
                    {/* Radio circle */}
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors',
                        isSelected
                          ? 'border-[#1b3a5c] bg-[#1b3a5c] text-white'
                          : 'border-slate-400 text-slate-500',
                      )}
                    >
                      {choice.id}
                    </span>
                    <span
                      className={cn(
                        'leading-relaxed',
                        isSelected ? 'text-[#1b3a5c] font-medium' : 'text-slate-700',
                      )}
                    >
                      {choice.text}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom nav strip */}
          <div className="shrink-0 flex items-center justify-end gap-3 px-8 py-4 border-t border-slate-100">
            {currentIndex > 0 && (
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="flex items-center gap-1.5 rounded border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
            )}
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === totalQ - 1}
              className="flex items-center gap-1.5 rounded bg-[#1b3a5c] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#142e4d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Submit modal ──────────────────────────────────────────────────── */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Submit Exam?</h2>
            <p className="text-sm text-slate-600">
              You have answered{' '}
              <span className="font-semibold text-slate-800">{answeredCount}</span> of{' '}
              <span className="font-semibold text-slate-800">{totalQ}</span> questions.
              {answeredCount < totalQ && (
                <span className="text-amber-600">
                  {' '}{totalQ - answeredCount} question{totalQ - answeredCount !== 1 ? 's' : ''} will be left blank.
                </span>
              )}
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Go back
              </button>
              <button
                onClick={doSubmit}
                className="flex-1 rounded-lg bg-[#1b3a5c] py-2.5 text-sm font-medium text-white hover:bg-[#142e4d] transition-colors"
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
