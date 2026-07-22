'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type {
  MCATForm,
  MCATSection,
  MCATQuestion,
  MCATPassage,
  MCATChoiceLabel,
  MCATAttempt,
  MCATAIFeedback,
} from '@/lib/premade-exams/mcat/types'
import { saveMCATAttempt, updateMCATAttempt } from '@/lib/premade-exams/mcat/attempt-store'
import { computeMCATScores, MCAT_SCORE_DISCLAIMER, getApproximatePercentile } from '@/lib/premade-exams/mcat/mcat-score-conversion'
import { ExamSaveStatus, type SaveStatus } from '@/components/premade/ExamSaveStatus'

// ─── Phase machine ─────────────────────────────────────────────────────────────
type MCATPhase =
  | { tag: 'welcome' }
  | { tag: 'section_intro'; sIdx: number }
  | { tag: 'question'; sIdx: number; qIdx: number }
  | { tag: 'section_review'; sIdx: number }
  | { tag: 'break'; afterSIdx: number }
  | { tag: 'results' }

// ─── Flat question ─────────────────────────────────────────────────────────────
interface FlatQ {
  q: MCATQuestion
  passage: MCATPassage | null
  sIdx: number
  qIdxInSection: number
  globalIdx: number
}

function buildFlat(form: MCATForm): FlatQ[][] {
  return form.sections.map((sec, sIdx) => {
    const flat: FlatQ[] = []
    let qi = 0
    for (const p of sec.passages) {
      for (const q of p.questions) {
        flat.push({ q, passage: p, sIdx, qIdxInSection: qi++, globalIdx: -1 })
      }
    }
    for (const q of sec.discreteQuestions) {
      flat.push({ q, passage: null, sIdx, qIdxInSection: qi++, globalIdx: -1 })
    }
    return flat
  })
}

function formatTime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function uid(): string {
  return `mcat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

// ── Kept for ResultsScreen ────────────────────────────────────────────────────
const SECTION_COLORS = ['indigo', 'emerald', 'violet', 'amber'] as const
type SectionColor = typeof SECTION_COLORS[number]

const colorMap: Record<SectionColor, { bg: string; text: string; border: string; light: string }> = {
  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-700', border: 'border-indigo-300', light: 'bg-indigo-50' },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-300', light: 'bg-emerald-50' },
  violet: { bg: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-300', light: 'bg-violet-50' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-300', light: 'bg-amber-50' },
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

// ─── MCATExamTaker ─────────────────────────────────────────────────────────────
interface Props {
  form: MCATForm
  initialAttempt?: MCATAttempt | null
}

export function MCATExamTaker({ form, initialAttempt }: Props) {
  const flatSections = buildFlat(form)
  const isReview = !!initialAttempt

  const [phase, setPhase] = useState<MCATPhase>(
    isReview ? { tag: 'results' } : { tag: 'welcome' }
  )
  const [answers, setAnswers] = useState<Record<string, string>>(initialAttempt?.answers ?? {})
  const [bookmarks, setBookmarks] = useState<Set<string>>(
    new Set(initialAttempt?.bookmarks ?? [])
  )
  const [sectionTimers, setSectionTimers] = useState<number[]>(
    form.sections.map(s => s.timeMinutes * 60)
  )
  const [breakSecsLeft, setBreakSecsLeft] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const attempt = initialAttempt ?? null
  const [liveAttempt, setLiveAttempt] = useState<MCATAttempt | null>(null)
  const [aiFeedback, setAIFeedback] = useState<MCATAIFeedback | null>(initialAttempt?.aiFeedback ?? null)
  const [aiFeedbackLoading, setAIFeedbackLoading] = useState(false)
  const [attemptId] = useState(() => uid())

  // ── Timer ────────────────────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    setTimerActive(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (!timerActive) return
    timerRef.current = setInterval(() => {
      if (phase.tag === 'question' || phase.tag === 'section_review') {
        const sIdx = (phase as { sIdx: number }).sIdx
        setSectionTimers(prev => {
          const next = [...prev]
          if (next[sIdx] > 0) {
            next[sIdx]--
          } else {
            stopTimer()
            goToNextAfterSection(sIdx)
          }
          return next
        })
      } else if (phase.tag === 'break') {
        setBreakSecsLeft(prev => {
          if (prev <= 1) {
            stopTimer()
            startNextSection((phase as { afterSIdx: number }).afterSIdx + 1)
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timerActive, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function startTimer() { setTimerActive(true) }

  // Save in-progress state to localStorage after every answer or bookmark change.
  // This is a localStorage save (not server-side), so it resolves synchronously.
  // A brief 300ms delay creates a visible "Saving… → Saved" UX without being misleading.
  useEffect(() => {
    if (isReview) return
    if (!Object.keys(answers).length && !bookmarks.size) return
    setSaveStatus('saving')
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          `mcat_progress_${attemptId}`,
          JSON.stringify({ answers: { ...answers }, bookmarks: [...bookmarks], savedAt: Date.now() }),
        )
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [answers, bookmarks, attemptId, isReview])

  function goToNextAfterSection(sIdx: number) {
    const sec = form.sections[sIdx]
    if (sec.breakAfterMinutes) {
      setBreakSecsLeft(sec.breakAfterMinutes * 60)
      setPhase({ tag: 'break', afterSIdx: sIdx })
      startTimer()
    } else {
      startNextSection(sIdx + 1)
    }
  }

  function startNextSection(sIdx: number) {
    if (sIdx >= form.sections.length) {
      finishExam()
    } else {
      setPhase({ tag: 'section_intro', sIdx })
    }
  }

  // ── Navigation ───────────────────────────────────────────────────────────────
  function goToQuestion(sIdx: number, qIdx: number) {
    setPhase({ tag: 'question', sIdx, qIdx })
    if (!timerActive) startTimer()
  }

  function handleAnswer(qId: string, choice: MCATChoiceLabel) {
    setAnswers(prev => ({ ...prev, [qId]: choice }))
  }

  function toggleBookmark(qId: string) {
    setBookmarks(prev => {
      const next = new Set(prev)
      if (next.has(qId)) next.delete(qId)
      else next.add(qId)
      return next
    })
  }

  function submitSection(sIdx: number) {
    stopTimer()
    if (sIdx + 1 >= form.sections.length) {
      finishExam()
    } else {
      goToNextAfterSection(sIdx)
    }
  }

  // ── Finish exam ──────────────────────────────────────────────────────────────
  function finishExam() {
    stopTimer()
    const sectionCorrect = flatSections.map(flat =>
      flat.filter(({ q }) => answers[q.id] === q.correctAnswer).length
    )
    const sectionTotal = flatSections.map(flat => flat.length)

    const scores = computeMCATScores(
      sectionCorrect[0], sectionTotal[0],
      sectionCorrect[1], sectionTotal[1],
      sectionCorrect[2], sectionTotal[2],
      sectionCorrect[3], sectionTotal[3],
    )

    const newAttempt: MCATAttempt = {
      id: attemptId,
      examId: form.id,
      examTitle: form.title,
      completedAt: new Date().toISOString(),
      ...scores,
      chemPhysCorrect: sectionCorrect[0],
      chemPhysTotal: sectionTotal[0],
      carsCorrect: sectionCorrect[1],
      carsTotal: sectionTotal[1],
      bioBiochemCorrect: sectionCorrect[2],
      bioBiochemTotal: sectionTotal[2],
      psychSocCorrect: sectionCorrect[3],
      psychSocTotal: sectionTotal[3],
      answers,
      bookmarks: [...bookmarks],
      aiFeedback: null,
    }

    saveMCATAttempt(newAttempt)
    setLiveAttempt(newAttempt)
    setPhase({ tag: 'results' })
    fetchAIFeedback(newAttempt)
  }

  async function fetchAIFeedback(a: MCATAttempt) {
    setAIFeedbackLoading(true)
    try {
      const res = await fetch('/api/mcat-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildFeedbackPayload(a)),
      })
      if (res.ok) {
        const fb = (await res.json()) as MCATAIFeedback
        setAIFeedback(fb)
        updateMCATAttempt(a.id, { aiFeedback: fb })
      }
    } finally {
      setAIFeedbackLoading(false)
    }
  }

  function buildFeedbackPayload(a: MCATAttempt) {
    const missed = flatSections.flatMap(flat =>
      flat
        .filter(({ q }) => a.answers[q.id] !== q.correctAnswer)
        .map(({ q }) => ({
          section: form.sections[q.sectionId === 'chem-phys' ? 0 : q.sectionId === 'cars' ? 1 : q.sectionId === 'bio-biochem' ? 2 : 3].abbreviation,
          questionType: q.questionType,
          discipline: q.discipline,
          contentCategory: q.contentCategory,
          scientificSkill: q.scientificSkill,
          difficulty: q.difficulty,
          question: q.question.slice(0, 120),
          userAnswer: a.answers[q.id] ?? 'skipped',
          correctAnswer: q.correctAnswer,
        }))
    ).slice(0, 30)

    const disciplineBreakdown: Record<string, { correct: number; total: number }> = {}
    flatSections.forEach(flat => {
      flat.forEach(({ q }) => {
        if (!disciplineBreakdown[q.discipline]) disciplineBreakdown[q.discipline] = { correct: 0, total: 0 }
        disciplineBreakdown[q.discipline].total++
        if (a.answers[q.id] === q.correctAnswer) disciplineBreakdown[q.discipline].correct++
      })
    })

    return {
      chemPhysScore: a.chemPhysScore, chemPhysCorrect: a.chemPhysCorrect, chemPhysTotal: a.chemPhysTotal,
      carsScore: a.carsScore, carsCorrect: a.carsCorrect, carsTotal: a.carsTotal,
      bioBiochemScore: a.bioBiochemScore, bioBiochemCorrect: a.bioBiochemCorrect, bioBiochemTotal: a.bioBiochemTotal,
      psychSocScore: a.psychSocScore, psychSocCorrect: a.psychSocCorrect, psychSocTotal: a.psychSocTotal,
      totalScore: a.totalScore,
      disciplineBreakdown,
      missedQuestions: missed,
    }
  }

  const displayAttempt = liveAttempt ?? attempt

  // ─── Render phases ──────────────────────────────────────────────────────────

  if (phase.tag === 'welcome') {
    return (
      <WelcomeScreen
        form={form}
        flatSections={flatSections}
        onStart={() => setPhase({ tag: 'section_intro', sIdx: 0 })}
      />
    )
  }

  // ── Section intro ────────────────────────────────────────────────────────────
  if (phase.tag === 'section_intro') {
    const { sIdx } = phase
    const sec = form.sections[sIdx]
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-emerald-700 px-5 h-14 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 leading-none mb-0.5">
              MockMate MCAT Practice Exam
            </div>
            <div className="text-[14px] font-bold text-white leading-none">{form.title}</div>
          </div>
          <div className="text-[11px] text-emerald-200">
            Section {sIdx + 1} of {form.sections.length}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-emerald-50 mb-5">
              <span className="text-2xl font-bold text-emerald-700">{sIdx + 1}</span>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Section {sIdx + 1} of {form.sections.length}
            </p>
            <h1 className="text-xl font-bold text-slate-900 mb-2">{sec.title}</h1>
            <p className="text-sm text-slate-500 mb-6">
              {sec.seededCount} questions · {sec.timeMinutes} minutes
              {sec.seededCount < sec.questionCount && (
                <span className="ml-1 text-amber-600">(Phase 1: full exam has {sec.questionCount})</span>
              )}
            </p>
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 mb-6 text-left space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Section Rules</p>
              <p className="text-sm text-slate-600">• Answer all questions within the time limit.</p>
              <p className="text-sm text-slate-600">• You can move freely between questions within this section.</p>
              <p className="text-sm text-slate-600">• Once you submit this section, you cannot return to it.</p>
              {sec.breakAfterMinutes && (
                <p className="text-sm text-slate-600">• A {sec.breakAfterMinutes}-minute break follows this section.</p>
              )}
            </div>
            <button
              onClick={() => goToQuestion(sIdx, 0)}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
            >
              Begin Section {sIdx + 1}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Question phase ───────────────────────────────────────────────────────────
  if (phase.tag === 'question') {
    const { sIdx, qIdx } = phase
    const flat = flatSections[sIdx]
    const item = flat[qIdx]
    if (!item) return null
    const { q, passage } = item
    const sec = form.sections[sIdx]
    const secsLeft = sectionTimers[sIdx]
    const isLastQ = qIdx === flat.length - 1
    const isFlagged = bookmarks.has(q.id)
    const hasPassage = passage !== null

    return (
      <div className="h-screen w-full flex flex-col bg-white overflow-hidden">

        {/* ══ STICKY HEADER ═══════════════════════════════════════════════════ */}
        <div className="shrink-0">

          {/* Main green bar */}
          <div className="bg-emerald-700 px-5 h-14 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 leading-none mb-0.5">
                MockMate MCAT Practice Exam Form 1
              </div>
              <div className="text-[14px] font-bold text-white leading-none">
                {sec.title} — Question {qIdx + 1} of {flat.length}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isReview && <ExamSaveStatus status={saveStatus} />}
              <div className={cn(
                'text-sm font-mono font-semibold px-3 py-1 rounded',
                secsLeft < 300 ? 'bg-red-800/50 text-red-200' : 'bg-emerald-800/50 text-emerald-100'
              )}>
                {formatTime(secsLeft)}
              </div>
              <button
                onClick={() => { stopTimer(); setPhase({ tag: 'section_review', sIdx }) }}
                className="text-[11px] font-semibold text-emerald-200 hover:text-white border border-emerald-500 hover:border-emerald-300 px-3 py-1.5 rounded transition-colors"
              >
                Review Section
              </button>
            </div>
          </div>

          {/* Sub-bar: section | discipline | skill */}
          <div className="bg-emerald-800 px-5 py-2 flex items-center gap-2 text-[11px]">
            <span className="font-bold text-white">{sec.abbreviation}</span>
            <span className="text-emerald-500 select-none">|</span>
            <span className="text-emerald-200">{q.discipline}</span>
            <span className="text-emerald-500 select-none">|</span>
            <span className="text-emerald-300">{q.scientificSkill}</span>
            {isFlagged && (
              <>
                <span className="text-emerald-500 select-none">|</span>
                <span className="text-amber-300 font-semibold">⚑ Flagged for Review</span>
              </>
            )}
          </div>

          {/* Toolbar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 h-9 flex items-center gap-0.5">
            {/* Highlight — placeholder */}
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

            {/* Strikeout — placeholder */}
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
              onClick={() => toggleBookmark(q.id)}
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
          </div>
        </div>
        {/* ══ END STICKY HEADER ═══════════════════════════════════════════════ */}


        {/* ══ CONTENT AREA ════════════════════════════════════════════════════ */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left pane: passage */}
          {hasPassage && (
            <div className="w-[46%] shrink-0 border-r border-slate-200 bg-[#FAFAF8] overflow-y-auto overflow-x-hidden min-w-0">
              <div className="px-7 py-6">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 pb-3 border-b border-slate-200">
                  Passage
                </div>
                <div className="text-[13.5px] leading-[1.95] text-slate-800 whitespace-pre-wrap">
                  {passage!.passageText}
                </div>
                {passage!.figures?.map((fig, i) => (
                  <div key={i} className="mt-6 border border-slate-200 rounded overflow-hidden">
                    {fig.type === 'table' && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-[12px]">
                          {fig.title && (
                            <caption className="py-2 px-3 text-[11px] font-semibold text-slate-500 bg-slate-50 text-left caption-top">
                              {fig.title}
                            </caption>
                          )}
                          <thead className="bg-slate-100 border-b border-slate-200">
                            <tr>
                              {(fig as { headers: string[] }).headers.map((h, hi) => (
                                <th key={hi} className="px-3 py-2 text-left font-semibold text-slate-700 whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(fig as { rows: string[][] }).rows.map((row, ri) => (
                              <tr key={ri} className={ri % 2 ? 'bg-slate-50' : 'bg-white'}>
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-3 py-2 text-slate-600">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {fig.type === 'figure' && (
                      <div className="p-4 bg-slate-50">
                        {fig.title && (
                          <p className="text-[11px] font-semibold text-slate-600 mb-2">{fig.title}</p>
                        )}
                        <p className="text-[12px] text-slate-500 italic">
                          {(fig as { description: string }).description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right pane: question + choices */}
          <div className={cn('bg-white overflow-y-auto min-w-0', hasPassage ? 'flex-1' : 'w-full')}>
            <div className={cn('py-7', hasPassage ? 'px-7' : 'px-8 max-w-3xl mx-auto')}>

              {/* Question label */}
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 pb-3 border-b border-slate-200">
                Question {qIdx + 1}
              </div>

              {/* Question stem */}
              <p className="text-[14px] font-medium text-slate-900 leading-relaxed mb-6">
                {q.question}
              </p>

              {/* Answer choices */}
              <div className="border border-slate-300 rounded overflow-hidden divide-y divide-slate-200">
                {q.choices.map(choice => {
                  const isSelected = answers[q.id] === choice.label
                  return (
                    <button
                      key={choice.label}
                      onClick={() => handleAnswer(q.id, choice.label as MCATChoiceLabel)}
                      className={cn(
                        'w-full flex items-stretch text-left transition-colors group',
                        isSelected ? 'bg-emerald-50' : 'bg-white hover:bg-slate-50'
                      )}
                    >
                      <span className={cn(
                        'w-11 flex items-center justify-center text-[12px] font-bold shrink-0 border-r py-3.5',
                        isSelected
                          ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                          : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300'
                      )}>
                        {choice.label}
                      </span>
                      <span className={cn(
                        'flex-1 px-5 py-3.5 text-[13px] leading-relaxed',
                        isSelected ? 'text-slate-900' : 'text-slate-700'
                      )}>
                        {choice.text}
                      </span>
                    </button>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
        {/* ══ END CONTENT AREA ════════════════════════════════════════════════ */}


        {/* ══ STICKY FOOTER ═══════════════════════════════════════════════════ */}
        <div className="shrink-0 bg-white border-t border-slate-300 px-4 py-2.5 flex items-center gap-3">

          {/* Previous */}
          <button
            onClick={() => qIdx > 0 && setPhase({ tag: 'question', sIdx, qIdx: qIdx - 1 })}
            disabled={qIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-slate-600 hover:text-slate-800 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <IconChevronLeft className="h-3.5 w-3.5" />
            Previous
          </button>

          {/* Question palette — scrollable */}
          <div className="flex-1 overflow-x-auto flex items-center gap-1 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {flat.map((item, i) => {
              const answered = !!answers[item.q.id]
              const flagged = bookmarks.has(item.q.id)
              const current = i === qIdx
              return (
                <button
                  key={i}
                  onClick={() => setPhase({ tag: 'question', sIdx, qIdx: i })}
                  className={cn(
                    'shrink-0 h-6 w-6 rounded text-[10px] font-semibold transition-colors',
                    current
                      ? 'bg-emerald-600 text-white'
                      : flagged
                      ? 'bg-amber-100 text-amber-600 border border-amber-300'
                      : answered
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  )}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          {/* Next / Review Section */}
          {isLastQ ? (
            <button
              onClick={() => { stopTimer(); setPhase({ tag: 'section_review', sIdx }) }}
              className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors shrink-0"
            >
              Review Section
              <IconChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setPhase({ tag: 'question', sIdx, qIdx: qIdx + 1 })}
              className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors shrink-0"
            >
              Next
              <IconChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {/* ══ END STICKY FOOTER ═══════════════════════════════════════════════ */}

      </div>
    )
  }

  // ── Section review ───────────────────────────────────────────────────────────
  if (phase.tag === 'section_review') {
    const { sIdx } = phase
    const flat = flatSections[sIdx]
    const sec = form.sections[sIdx]
    const answered = flat.filter(({ q }) => !!answers[q.id]).length
    const unanswered = flat.length - answered

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-emerald-700 px-5 h-14 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 leading-none mb-0.5">
              MockMate MCAT Practice Exam Form 1
            </div>
            <div className="text-[14px] font-bold text-white leading-none">
              Review — {sec.title}
            </div>
          </div>
          <div className="text-[11px] text-emerald-200">
            {answered} / {flat.length} answered
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Section Review</h2>
            <p className="text-sm text-slate-500 mb-6">{sec.title}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-slate-900">{answered}</p>
                <p className="text-xs text-slate-500">Answered</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">{unanswered}</p>
                <p className="text-xs text-slate-500">Unanswered</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-6">
              {flat.map((item, i) => {
                const isAnswered = !!answers[item.q.id]
                const flagged = bookmarks.has(item.q.id)
                return (
                  <button
                    key={i}
                    onClick={() => goToQuestion(sIdx, i)}
                    className={cn(
                      'h-7 w-7 rounded text-xs font-semibold transition-colors',
                      flagged
                        ? 'bg-amber-100 text-amber-600 border border-amber-300'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-red-100 text-red-500 border border-red-200'
                    )}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mb-6">
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-emerald-100 border border-emerald-200 inline-block" /> Answered</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-100 border border-red-200 inline-block" /> Unanswered</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-amber-100 border border-amber-300 inline-block" /> Flagged</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => goToQuestion(sIdx, 0)}
                className="flex-1 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Return to Section
              </button>
              <button
                onClick={() => submitSection(sIdx)}
                className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                Submit Section {sIdx + 1}
              </button>
            </div>
            {unanswered > 0 && (
              <p className="text-xs text-amber-600 text-center mt-3">
                {unanswered} question{unanswered > 1 ? 's' : ''} unanswered — you can still go back.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Break screen ─────────────────────────────────────────────────────────────
  if (phase.tag === 'break') {
    const { afterSIdx } = phase
    const sec = form.sections[afterSIdx]
    const nextSec = form.sections[afterSIdx + 1]
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-emerald-700 px-5 h-14 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 leading-none mb-0.5">
              MockMate MCAT Practice Exam Form 1
            </div>
            <div className="text-[14px] font-bold text-white leading-none">Optional Break</div>
          </div>
          <div className="font-mono font-bold text-white text-xl">{formatTime(breakSecsLeft)}</div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6 text-emerald-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Optional Break</h2>
            <p className="text-sm text-slate-500 mb-4">
              Section {afterSIdx + 1} complete. You have a {sec.breakAfterMinutes}-minute break.
            </p>
            <p className="text-3xl font-mono font-bold text-emerald-700 mb-6">{formatTime(breakSecsLeft)}</p>
            <p className="text-sm text-slate-500 mb-6">
              Next: <strong>{nextSec?.title}</strong>
            </p>
            <button
              onClick={() => { stopTimer(); startNextSection(afterSIdx + 1) }}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
            >
              Skip Break & Start Next Section
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase.tag === 'results' && displayAttempt) {
    return (
      <ResultsScreen
        form={form}
        flatSections={flatSections}
        attempt={displayAttempt}
        aiFeedback={aiFeedback}
        aiFeedbackLoading={aiFeedbackLoading}
      />
    )
  }

  return null
}

// ─── Welcome Screen ────────────────────────────────────────────────────────────
function WelcomeScreen({ form, flatSections, onStart }: {
  form: MCATForm
  flatSections: FlatQ[][]
  onStart: () => void
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-emerald-700 px-5 h-14 flex items-center shrink-0">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 leading-none mb-0.5">
            MockMate MCAT Practice Exam
          </div>
          <div className="text-[14px] font-bold text-white leading-none">{form.title}</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-emerald-700">M</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">MockMate MCAT Practice</p>
                <h1 className="text-xl font-bold text-slate-900">{form.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {form.sections.map((sec, i) => {
                const seeded = flatSections[i].length
                return (
                  <div key={sec.id} className="rounded-xl p-3 text-center bg-emerald-50 border border-emerald-100">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">{sec.abbreviation}</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">{seeded}q</p>
                    <p className="text-[10px] text-slate-500">{sec.timeMinutes} min</p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-2 mb-6">
              {form.sections.map((sec, i) => (
                <div key={sec.id} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">{i + 1}. {sec.title}</span>
                  <span className="text-slate-400">{sec.timeMinutes} min</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mb-6">{form.disclaimer}</p>

            <button
              onClick={onStart}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
            >
              Begin Exam
            </button>
          </div>
          <Link href="/premade/mcat" className="text-sm text-slate-400 hover:text-slate-600 block text-center">
            ← Back to MCAT Practice
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({ form, flatSections, attempt, aiFeedback, aiFeedbackLoading }: {
  form: MCATForm
  flatSections: FlatQ[][]
  attempt: MCATAttempt
  aiFeedback: MCATAIFeedback | null
  aiFeedbackLoading: boolean
}) {
  const [expandedQ, setExpandedQ] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState(0)

  const sectionScores = [
    { label: 'Chem/Phys', score: attempt.chemPhysScore, correct: attempt.chemPhysCorrect, total: attempt.chemPhysTotal },
    { label: 'CARS', score: attempt.carsScore, correct: attempt.carsCorrect, total: attempt.carsTotal },
    { label: 'Bio/Biochem', score: attempt.bioBiochemScore, correct: attempt.bioBiochemCorrect, total: attempt.bioBiochemTotal },
    { label: 'Psych/Soc', score: attempt.psychSocScore, correct: attempt.psychSocCorrect, total: attempt.psychSocTotal },
  ]

  const percentile = getApproximatePercentile(attempt.totalScore)

  const disciplineMap: Record<string, { correct: number; total: number }> = {}
  flatSections.forEach(flat => {
    flat.forEach(({ q }) => {
      if (!disciplineMap[q.discipline]) disciplineMap[q.discipline] = { correct: 0, total: 0 }
      disciplineMap[q.discipline].total++
      if (attempt.answers[q.id] === q.correctAnswer) disciplineMap[q.discipline].correct++
    })
  })

  const skillMap: Record<string, { correct: number; total: number }> = {}
  flatSections.forEach(flat => {
    flat.forEach(({ q }) => {
      const sk = q.scientificSkill
      if (!skillMap[sk]) skillMap[sk] = { correct: 0, total: 0 }
      skillMap[sk].total++
      if (attempt.answers[q.id] === q.correctAnswer) skillMap[sk].correct++
    })
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/premade/mcat" className="hover:text-indigo-600">Pre-made Exams / MCAT</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Results</span>
        </div>

        {/* Score header */}
        <div className="bg-[#1b3a5c] rounded-2xl p-6 text-white mb-6">
          <p className="text-sm text-white/60 font-medium mb-2">MCAT Practice Exam Form 1</p>
          <div className="flex items-end gap-6 flex-wrap">
            <div>
              <p className="text-5xl font-bold">{attempt.totalScore}</p>
              <p className="text-sm text-white/60 mt-1">MockMate Estimated MCAT Score</p>
            </div>
            <div className="flex gap-4">
              {sectionScores.map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold">{s.score}</p>
                  <p className="text-[11px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-white/50">Approx. percentile: ~{percentile} · {MCAT_SCORE_DISCLAIMER}</p>
          </div>
        </div>

        {/* Section raw scores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {sectionScores.map((s, i) => {
            const color = colorMap[SECTION_COLORS[i]]
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
            return (
              <div key={s.label} className={cn('rounded-xl border p-4', color.light, color.border)}>
                <p className={cn('text-[10px] font-bold uppercase tracking-widest', color.text)}>{s.label}</p>
                <p className="text-xl font-bold text-slate-900 mt-1">{s.correct}/{s.total}</p>
                <p className="text-xs text-slate-500">{pct}% correct</p>
              </div>
            )
          })}
        </div>

        {/* Discipline breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Accuracy by Discipline</h3>
          <div className="space-y-2.5">
            {Object.entries(disciplineMap).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([disc, stat]) => {
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0
              return (
                <div key={disc}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{disc}</span>
                    <span>{stat.correct}/{stat.total} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', pct >= 75 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scientific skill breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Accuracy by Scientific Reasoning Skill</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(skillMap).sort().map(([skill, stat]) => {
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0
              return (
                <div key={skill} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-600 mb-1">{skill}</p>
                  <p className="text-sm font-bold text-slate-900">{stat.correct}/{stat.total}</p>
                  <div className="h-1 bg-slate-200 rounded-full mt-1.5">
                    <div className={cn('h-full rounded-full', pct >= 75 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400')} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">AI Performance Feedback</h3>
          {aiFeedbackLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-400 py-4">
              <svg className="animate-spin h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating personalized MCAT feedback…
            </div>
          )}
          {aiFeedback && (
            <div className="space-y-4 text-sm text-slate-700">
              <FeedbackBlock label="What You Did Well" content={aiFeedback.whatWentWell} color="emerald" />
              <FeedbackBlock label="Strongest Section" content={aiFeedback.strongestSection} color="indigo" />
              <FeedbackBlock label="Weakest Section" content={aiFeedback.weakestSection} color="amber" />
              <FeedbackBlock label="Disciplines to Review" content={aiFeedback.weakestDisciplines.join('; ')} color="amber" />
              <FeedbackBlock label="Science Reasoning Skills to Review" content={aiFeedback.scienceReasoningToReview.join('; ')} color="violet" />
              <FeedbackBlock label="CARS Strategy" content={aiFeedback.carsStrategy} color="violet" />
              <FeedbackBlock label="Content Areas to Review" content={aiFeedback.contentAreasToReview.join('\n')} color="red" />
              <FeedbackBlock label="Recommended Next Steps" content={aiFeedback.recommendedNextSteps} color="indigo" />
            </div>
          )}
          {!aiFeedbackLoading && !aiFeedback && (
            <p className="text-sm text-slate-400">AI feedback not available for this attempt.</p>
          )}
        </div>

        {/* MCAT Question Bank link */}
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-widest mb-2">MCAT Question Bank</p>
          <p className="text-sm text-slate-700 mb-3">Practice targeted MCAT questions based on the sections, content categories, and scientific reasoning skills you missed most.</p>
          <a
            href="/question-bank/mcat"
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[13px] px-4 py-2 rounded-lg transition-colors"
          >
            Start MCAT Practice
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Section tabs for answer key */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 flex overflow-x-auto">
            {form.sections.map((sec, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={cn('px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors',
                  activeSection === i
                    ? cn('border-b-2 -mb-px', colorMap[SECTION_COLORS[i]].text, 'border-current')
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                {sec.abbreviation}
              </button>
            ))}
          </div>
          <div className="divide-y divide-slate-100">
            {flatSections[activeSection].map(({ q, passage }, i) => {
              const userAns = attempt.answers[q.id]
              const correct = userAns === q.correctAnswer
              const isExpanded = expandedQ === q.id
              return (
                <div key={q.id} className="px-5 py-3">
                  <button
                    className="w-full text-left flex items-start gap-3"
                    onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                  >
                    <span className={cn('shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5',
                      correct ? 'bg-emerald-500' : userAns ? 'bg-red-400' : 'bg-slate-300'
                    )}>
                      {correct ? '✓' : userAns ? '✗' : '—'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs text-slate-400">Q{i + 1}</span>
                        <span className="text-slate-200">·</span>
                        <span className="text-xs text-slate-400">{q.discipline}</span>
                        <span className="text-slate-200">·</span>
                        <span className="text-xs text-slate-400">{q.difficulty}</span>
                        {passage && <span className="text-xs text-indigo-400">passage</span>}
                      </div>
                      <p className="text-sm text-slate-700 line-clamp-2">{q.question}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2 text-xs">
                      <span className={cn('font-bold', correct ? 'text-emerald-600' : 'text-red-500')}>{userAns || '—'}</span>
                      {!correct && <span className="text-slate-400">→ <span className="text-emerald-600 font-bold">{q.correctAnswer}</span></span>}
                      <span className="text-slate-300">›</span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 ml-8 space-y-3">
                      <p className="text-sm font-medium text-slate-800">{q.question}</p>
                      <div className="space-y-1.5">
                        {q.choices.map(c => (
                          <div key={c.label} className={cn('flex gap-2 text-sm px-3 py-1.5 rounded-lg',
                            c.label === q.correctAnswer ? 'bg-emerald-50 text-emerald-800' :
                            c.label === userAns ? 'bg-red-50 text-red-700' : 'text-slate-600'
                          )}>
                            <span className="font-bold shrink-0">{c.label}.</span>
                            <span>{c.text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                        <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide mb-1">Explanation</p>
                        <p className="text-sm text-slate-700">{q.explanation}</p>
                      </div>
                      {Object.entries(q.wrongAnswerExplanations).map(([label, expl]) => (
                        <div key={label} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Why not {label}?</p>
                          <p className="text-sm text-slate-600">{expl}</p>
                        </div>
                      ))}
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                        <p className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wide mb-1">Teaching Point</p>
                        <p className="text-sm text-slate-700">{q.teachingPoint}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/premade/mcat" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            ← Back to MCAT Practice
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeedbackBlock({ label, content, color }: { label: string; content: string; color: string }) {
  const colorCls: Record<string, string> = {
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    indigo: 'text-indigo-700 bg-indigo-50 border-indigo-100',
    amber: 'text-amber-700 bg-amber-50 border-amber-100',
    violet: 'text-violet-700 bg-violet-50 border-violet-100',
    red: 'text-red-700 bg-red-50 border-red-100',
  }
  return (
    <div className={cn('rounded-lg border p-3', colorCls[color] ?? colorCls.indigo)}>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 opacity-70">{label}</p>
      <p className="text-sm whitespace-pre-line">{content}</p>
    </div>
  )
}

export default MCATExamTaker
