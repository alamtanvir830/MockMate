'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import type {
  SATForm,
  SATModule,
  SATQuestion,
  MathMCQuestion,
  MathGridInQuestion,
} from '@/lib/premade-exams/sat/types'
import {
  convertRWScore,
  convertMathScore,
  roundSATScore,
} from '@/lib/premade-exams/sat/sat-score-conversion'

// ─── Phase state machine ───────────────────────────────────────────────────────
type SATPhase =
  | { tag: 'welcome' }
  | { tag: 'rw_directions' }
  | { tag: 'question'; section: 'rw' | 'math'; slot: 'm1' | 'm2'; qIdx: number }
  | { tag: 'rw_break' }
  | { tag: 'section_break' }
  | { tag: 'math_directions' }
  | { tag: 'math_break' }
  | { tag: 'end' }
  | { tag: 'results' }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function normalizeGridIn(raw: string): string {
  return raw.trim().replace(/\s+/g, '')
}

function isGridInCorrect(q: MathGridInQuestion, raw: string): boolean {
  const norm = normalizeGridIn(raw)
  if (!norm) return false
  return q.acceptableAnswers.some(a => normalizeGridIn(a) === norm)
}

function isAnswered(q: SATQuestion, answers: Record<string, string>): boolean {
  return !!answers[q.id]?.trim()
}

function isCorrect(q: SATQuestion, answers: Record<string, string>): boolean {
  if (!answers[q.id]) return false
  if (q.section === 'reading-writing') return answers[q.id] === q.correctAnswer
  const mq = q as MathMCQuestion | MathGridInQuestion
  if (mq.type === 'multiple_choice') return answers[q.id] === (mq as MathMCQuestion).correctAnswer
  return isGridInCorrect(mq as MathGridInQuestion, answers[q.id])
}

function countCorrect(module: SATModule, answers: Record<string, string>): number {
  return module.questions.filter(q => isCorrect(q, answers)).length
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({
  onBack, onNext, canGoBack, centerLabel, timerEl, onReview, showReview,
  isBookmarked, onBookmark,
}: {
  onBack: () => void; onNext: () => void; canGoBack: boolean
  centerLabel: React.ReactNode; timerEl?: React.ReactNode
  onReview?: () => void; showReview?: boolean
  isBookmarked?: boolean; onBookmark?: () => void
}) {
  return (
    <header className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-3 text-white select-none gap-2">
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          onClick={onBack} disabled={!canGoBack} title="Previous"
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={onNext} title="Next"
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-white/10 transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="flex-1 text-center min-w-0 px-2 text-[12px] font-medium text-white/90 truncate">
        {centerLabel}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {timerEl}
        {showReview && onReview && (
          <button onClick={onReview} className="text-[11px] font-semibold px-2.5 py-1 rounded border border-white/30 hover:bg-white/10 transition-colors">
            Review
          </button>
        )}
        {onBookmark && (
          <button
            onClick={onBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            className={cn('flex h-7 w-7 items-center justify-center rounded transition-colors', isBookmarked ? 'text-amber-400' : 'text-white/50 hover:text-white/80')}
          >
            <svg fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

// ─── Timer display ─────────────────────────────────────────────────────────────
function TimerDisplay({ secs }: { secs: number }) {
  const urgent = secs <= 300
  return (
    <span className={cn('font-mono text-[12px] font-semibold px-2 py-0.5 rounded', urgent ? 'text-red-300' : 'text-white/80')}>
      {formatTime(secs)}
    </span>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function SATExamTaker({ form }: { form: SATForm }) {
  const [phase, setPhase] = useState<SATPhase>({ tag: 'welcome' })
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [rwM2Type, setRwM2Type] = useState<'easy' | 'hard'>('easy')
  const [mathM2Type, setMathM2Type] = useState<'easy' | 'hard'>('easy')
  const [secsLeft, setSecsLeft] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const rwSection = form.sections[0]
  const mathSection = form.sections[1]

  const getM2Module = useCallback((section: 'rw' | 'math', type: 'easy' | 'hard'): SATModule => {
    const sec = section === 'rw' ? rwSection : mathSection
    return type === 'hard' ? sec.modules[2] : sec.modules[1]
  }, [rwSection, mathSection])

  const getActiveModule = useCallback((section: 'rw' | 'math', slot: 'm1' | 'm2'): SATModule => {
    if (slot === 'm1') {
      return section === 'rw' ? rwSection.modules[0] : mathSection.modules[0]
    }
    return getM2Module(section, section === 'rw' ? rwM2Type : mathM2Type)
  }, [rwSection, mathSection, rwM2Type, mathM2Type, getM2Module])

  // ── Timer ──────────────────────────────────────────────────────────────────
  const startTimer = useCallback((minutes: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setSecsLeft(minutes * 60)
    setTimerRunning(true)
  }, [])

  useEffect(() => {
    if (!timerRunning) return
    timerRef.current = setInterval(() => {
      setSecsLeft(s => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          setTimerRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timerRunning])

  // Auto-advance when timer expires
  useEffect(() => {
    if (timerRunning || secsLeft > 0) return
    if (phase.tag !== 'question') return
    if (phase.slot === 'm1') {
      if (phase.section === 'rw') handleRWM1Complete()
      else handleMathM1Complete()
    } else {
      if (phase.section === 'rw') setPhase({ tag: 'section_break' })
      else setPhase({ tag: 'end' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerRunning, secsLeft])

  // ── Routing decisions ──────────────────────────────────────────────────────
  const handleRWM1Complete = useCallback(() => {
    const m1 = rwSection.modules[0]
    const correct = countCorrect(m1, answers)
    const type = correct >= form.rwRoutingThreshold ? 'hard' : 'easy'
    setRwM2Type(type)
    setTimerRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase({ tag: 'rw_break' })
  }, [rwSection, answers, form.rwRoutingThreshold])

  const handleMathM1Complete = useCallback(() => {
    const m1 = mathSection.modules[0]
    const correct = countCorrect(m1, answers)
    const type = correct >= form.mathRoutingThreshold ? 'hard' : 'easy'
    setMathM2Type(type)
    setTimerRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase({ tag: 'math_break' })
  }, [mathSection, answers, form.mathRoutingThreshold])

  // ── Answer handling ────────────────────────────────────────────────────────
  const setAnswer = useCallback((qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }, [])

  const toggleBookmark = useCallback((qId: string) => {
    setBookmarks(prev => {
      const n = new Set(prev)
      n.has(qId) ? n.delete(qId) : n.add(qId)
      return n
    })
  }, [])

  // ── Navigation within a module ─────────────────────────────────────────────
  const handleBack = useCallback(() => {
    if (phase.tag !== 'question') return
    if (phase.qIdx > 0) {
      setPhase({ ...phase, qIdx: phase.qIdx - 1 })
    }
  }, [phase])

  const handleNext = useCallback(() => {
    if (phase.tag !== 'question') return
    const mod = getActiveModule(phase.section, phase.slot)
    if (phase.qIdx < mod.questionCount - 1) {
      setPhase({ ...phase, qIdx: phase.qIdx + 1 })
    } else {
      // Last question in module
      if (phase.slot === 'm1') {
        if (phase.section === 'rw') handleRWM1Complete()
        else handleMathM1Complete()
      } else {
        if (phase.section === 'rw') {
          setTimerRunning(false)
          if (timerRef.current) clearInterval(timerRef.current)
          setPhase({ tag: 'section_break' })
        } else {
          setTimerRunning(false)
          if (timerRef.current) clearInterval(timerRef.current)
          setPhase({ tag: 'end' })
        }
      }
    }
  }, [phase, getActiveModule, handleRWM1Complete, handleMathM1Complete])

  // ── Score computation ──────────────────────────────────────────────────────
  const rwM1Correct = countCorrect(rwSection.modules[0], answers)
  const rwM2Correct = countCorrect(getM2Module('rw', rwM2Type), answers)
  const rwRaw = rwM1Correct + rwM2Correct

  const mathM1Correct = countCorrect(mathSection.modules[0], answers)
  const mathM2Correct = countCorrect(getM2Module('math', mathM2Type), answers)
  const mathRaw = mathM1Correct + mathM2Correct

  const rwScaled = roundSATScore(convertRWScore(rwRaw, rwM2Type === 'hard'))
  const mathScaled = roundSATScore(convertMathScore(mathRaw, mathM2Type === 'hard'))
  const totalScore = rwScaled + mathScaled

  // ── Retake ─────────────────────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    setPhase({ tag: 'welcome' })
    setAnswers({})
    setBookmarks(new Set())
    setRwM2Type('easy')
    setMathM2Type('easy')
    setSecsLeft(0)
    setTimerRunning(false)
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  // ── Welcome ────────────────────────────────────────────────────────────────
  if (phase.tag === 'welcome') {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold tracking-wide">MockMate</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="bg-[#1b3a5c] px-8 py-6">
              <h1 className="text-[18px] font-bold text-white leading-tight">{form.title}</h1>
              <p className="text-[12px] text-white/60 mt-1">{form.description}</p>
            </div>
            <div className="px-8 py-6 flex gap-8">
              <div className="flex-1 space-y-4">
                <h2 className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest">Exam Details</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Format', value: 'Adaptive (MST)' },
                    { label: 'Total Questions', value: '98 questions' },
                    { label: 'Sections', value: 'Reading & Writing • Math' },
                    { label: 'Total Time', value: '2 hr 14 min' },
                    { label: 'Score Range', value: '400–1600' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[11px] text-slate-400">{label}</p>
                      <p className="text-[13px] font-semibold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-2">{form.disclaimer}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-5 pl-8 border-l border-slate-100">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <button
                  onClick={() => setPhase({ tag: 'rw_directions' })}
                  className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[14px] font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── RW Directions ──────────────────────────────────────────────────────────
  if (phase.tag === 'rw_directions') {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">Reading and Writing</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-[18px] font-bold text-slate-900 mb-4">Reading and Writing</h2>
            <div className="text-[13px] text-slate-700 space-y-3 leading-relaxed mb-6">
              <p>This section contains <strong>two modules</strong> of 27 questions each. You will have <strong>32 minutes</strong> per module.</p>
              <p>Questions draw on short passages from Literature, History/Social Studies, and Science. Each passage is followed by a single question.</p>
              <p><strong>You may not return to a previous module</strong> once you advance. Within a module, you may move freely between questions.</p>
              <p>Question types include: Words in Context, Text Structure and Purpose, Central Ideas and Details, Command of Evidence, Inferences, Cross-Text Connections, Rhetorical Synthesis, Transitions, Boundaries, and Form, Structure, and Sense.</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-[12px] text-blue-800 mb-6">
              <p className="font-semibold mb-1">Scoring note</p>
              <p>Your performance on Module 1 determines which Module 2 you receive. Both paths count toward your score. Scores range from 200–800.</p>
            </div>
            <button
              onClick={() => {
                startTimer(rwSection.modules[0].timeMinutes)
                setPhase({ tag: 'question', section: 'rw', slot: 'm1', qIdx: 0 })
              }}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Begin Module 1
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── RW Break (between M1 and M2) ───────────────────────────────────────────
  if (phase.tag === 'rw_break') {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">Reading and Writing</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-slate-900 mb-2">Module 1 Complete</h2>
            <p className="text-[13px] text-slate-500 mb-6">Module 2 will now begin. You have 32 minutes.</p>
            <button
              onClick={() => {
                const m2 = getM2Module('rw', rwM2Type)
                startTimer(m2.timeMinutes)
                setPhase({ tag: 'question', section: 'rw', slot: 'm2', qIdx: 0 })
              }}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Begin Module 2
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Section Break (between RW and Math) ────────────────────────────────────
  if (phase.tag === 'section_break') {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">Break</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
            <h2 className="text-[18px] font-bold text-slate-900 mb-2">Reading and Writing Complete</h2>
            <p className="text-[13px] text-slate-500 mb-6">Take a short break. The Math section comes next.</p>
            <button
              onClick={() => setPhase({ tag: 'math_directions' })}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Continue to Math
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Math Directions ────────────────────────────────────────────────────────
  if (phase.tag === 'math_directions') {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">Math</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-[18px] font-bold text-slate-900 mb-4">Math</h2>
            <div className="text-[13px] text-slate-700 space-y-3 leading-relaxed mb-6">
              <p>This section contains <strong>two modules</strong> of 22 questions each. You will have <strong>35 minutes</strong> per module.</p>
              <p>Question types: multiple choice (4 options) and <strong>grid-in</strong> (enter your own answer). Grid-in answers can be integers, decimals, or fractions.</p>
              <p><strong>Calculator permitted</strong> for all Math questions.</p>
              <p>Domains covered: Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry.</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-[12px] text-amber-800 mb-6">
              <p className="font-semibold mb-1">Grid-in tips</p>
              <p>Enter fractions as "3/4", decimals as ".75" or "0.75", and negative answers with a minus sign. You cannot enter mixed numbers — convert to improper fractions.</p>
            </div>
            <button
              onClick={() => {
                startTimer(mathSection.modules[0].timeMinutes)
                setPhase({ tag: 'question', section: 'math', slot: 'm1', qIdx: 0 })
              }}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Begin Module 1
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Math Break (between M1 and M2) ─────────────────────────────────────────
  if (phase.tag === 'math_break') {
    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">Math</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-slate-900 mb-2">Module 1 Complete</h2>
            <p className="text-[13px] text-slate-500 mb-6">Module 2 will now begin. You have 35 minutes.</p>
            <button
              onClick={() => {
                const m2 = getM2Module('math', mathM2Type)
                startTimer(m2.timeMinutes)
                setPhase({ tag: 'question', section: 'math', slot: 'm2', qIdx: 0 })
              }}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Begin Module 2
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Question view ──────────────────────────────────────────────────────────
  if (phase.tag === 'question') {
    const mod = getActiveModule(phase.section, phase.slot)
    const q = mod.questions[phase.qIdx]
    const qNum = phase.qIdx + 1
    const qTotal = mod.questionCount
    const bookmarked = bookmarks.has(q.id)
    const currentAnswer = answers[q.id] ?? ''

    const isMC = q.section === 'reading-writing' || (q as MathMCQuestion | MathGridInQuestion).type === 'multiple_choice'
    const choices = isMC
      ? (q.section === 'reading-writing' ? q.choices : (q as MathMCQuestion).choices)
      : null
    const gridInQ = !isMC ? (q as MathGridInQuestion) : null

    const sectionLabel = phase.section === 'rw' ? 'Reading and Writing' : 'Math'
    const moduleLabel = `Module ${phase.slot === 'm1' ? '1' : '2'}`
    const centerLabel = `${sectionLabel} — ${moduleLabel} | Question ${qNum} of ${qTotal}`

    const isLastInModule = phase.qIdx === qTotal - 1
    const submitLabel = isLastInModule
      ? (phase.slot === 'm1' ? 'Submit Module 1' : phase.section === 'rw' ? 'Submit RW Section' : 'Submit Math Section')
      : undefined

    const stimulus = q.section === 'reading-writing' ? q.stimulus : (q as { stimulus?: string }).stimulus

    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <NavBar
          canGoBack={phase.qIdx > 0}
          onBack={handleBack}
          onNext={handleNext}
          centerLabel={centerLabel}
          timerEl={<TimerDisplay secs={secsLeft} />}
          showReview={true}
          onReview={() => setPhase({ tag: 'end' })}
          isBookmarked={bookmarked}
          onBookmark={() => toggleBookmark(q.id)}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">

            {/* Stimulus / passage */}
            {stimulus && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4 text-[13px] text-slate-800 leading-[1.85] whitespace-pre-line">
                {stimulus}
              </div>
            )}

            {/* Question card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              {/* Domain chip */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  {q.domain} · {q.section === 'reading-writing' ? q.skill : (q as { skill: string }).skill}
                </span>
                {bookmarked && (
                  <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest">Bookmarked</span>
                )}
              </div>

              <p className="text-[14px] text-slate-900 font-medium leading-snug mb-5">{q.question}</p>

              {/* Multiple choice */}
              {choices && (
                <div className="space-y-2">
                  {choices.map(choice => {
                    const selected = currentAnswer === choice.label
                    return (
                      <button
                        key={choice.label}
                        onClick={() => setAnswer(q.id, choice.label)}
                        className={cn(
                          'w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-[13px] transition-all',
                          selected
                            ? 'border-[#1d4ed8] bg-blue-50 text-[#1d4ed8]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                        )}
                      >
                        <span className={cn('shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold mt-0.5',
                          selected ? 'border-[#1d4ed8] bg-[#1d4ed8] text-white' : 'border-slate-300 text-slate-500'
                        )}>
                          {choice.label}
                        </span>
                        <span className="leading-snug">{choice.text}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Grid-in */}
              {gridInQ && (
                <div className="mt-2">
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Enter your answer
                  </label>
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={e => setAnswer(q.id, e.target.value)}
                    placeholder="e.g. 4, 3/4, .75"
                    className="w-48 border-2 border-slate-200 rounded-lg px-4 py-2 text-[14px] font-mono text-slate-900 focus:border-[#1d4ed8] focus:outline-none transition-colors"
                  />
                  {gridInQ.scoringNotes && (
                    <p className="mt-2 text-[11px] text-slate-400">{gridInQ.scoringNotes}</p>
                  )}
                </div>
              )}
            </div>

            {/* Submit module button on last question */}
            {submitLabel && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  {submitLabel} →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── End / Review ───────────────────────────────────────────────────────────
  if (phase.tag === 'end') {
    const m2Module = getM2Module('math', mathM2Type)
    const rwM1Qs = rwSection.modules[0].questions
    const rwM2Qs = getM2Module('rw', rwM2Type).questions
    const mathM1Qs = mathSection.modules[0].questions
    const mathM2Qs = m2Module.questions

    const groups = [
      { label: 'Reading and Writing — Module 1', questions: rwM1Qs },
      { label: 'Reading and Writing — Module 2', questions: rwM2Qs },
      { label: 'Math — Module 1', questions: mathM1Qs },
      { label: 'Math — Module 2', questions: mathM2Qs },
    ]

    return (
      <div className="min-h-screen bg-[#eef0f4] flex flex-col">
        <div className="shrink-0 h-11 bg-[#1b3a5c] flex items-center px-4">
          <span className="text-white text-[13px] font-semibold">Review Answers</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[18px] font-bold text-slate-900 mb-1">Review Your Answers</h2>
            <p className="text-[13px] text-slate-500 mb-6">Check your responses before submitting. Click any question number to return to it.</p>

            {groups.map((group, gi) => {
              let sectionTag: 'rw' | 'math' = gi < 2 ? 'rw' : 'math'
              let slot: 'm1' | 'm2' = gi % 2 === 0 ? 'm1' : 'm2'
              return (
                <div key={gi} className="mb-6">
                  <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">{group.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.questions.map((q, qi) => {
                      const answered = isAnswered(q, answers)
                      const bm = bookmarks.has(q.id)
                      return (
                        <button
                          key={q.id}
                          onClick={() => setPhase({ tag: 'question', section: sectionTag, slot, qIdx: qi })}
                          className={cn(
                            'h-8 w-8 rounded text-[12px] font-semibold border transition-all relative',
                            answered ? 'bg-[#1d4ed8] border-[#1d4ed8] text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400',
                            bm && 'ring-2 ring-amber-400 ring-offset-1',
                          )}
                        >
                          {qi + 1}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            <div className="flex items-center gap-4 text-[12px] text-slate-500 mb-6">
              <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-[#1d4ed8]" /> Answered</div>
              <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-white border border-slate-200" /> Unanswered</div>
              <div className="flex items-center gap-1.5"><span className="h-4 w-4 rounded ring-2 ring-amber-400" /> Bookmarked</div>
            </div>

            <button
              onClick={() => setPhase({ tag: 'results' })}
              className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors"
            >
              Submit and See Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase.tag === 'results') {
    const m2RWModule = getM2Module('rw', rwM2Type)
    const m2MathModule = getM2Module('math', mathM2Type)

    const allModules = [
      { label: 'Reading and Writing — Module 1', mod: rwSection.modules[0] },
      { label: `Reading and Writing — Module 2 (${rwM2Type})`, mod: m2RWModule },
      { label: 'Math — Module 1', mod: mathSection.modules[0] },
      { label: `Math — Module 2 (${mathM2Type})`, mod: m2MathModule },
    ]

    const rwTotal = rwSection.modules[0].questionCount + m2RWModule.questionCount
    const mathTotal = mathSection.modules[0].questionCount + m2MathModule.questionCount

    return (
      <div className="min-h-screen bg-[#eef0f4]">
        <div className="h-11 bg-[#1b3a5c] flex items-center px-4 gap-4">
          <span className="text-white text-[13px] font-semibold">Results</span>
          <button onClick={handleRetake} className="ml-auto text-[11px] font-semibold text-white/70 hover:text-white transition-colors">
            Retake Test
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {/* Score summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Estimated Score</h2>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-[11px] text-slate-400 mb-1">Reading &amp; Writing</p>
                <p className="text-[36px] font-bold text-slate-900">{rwScaled}</p>
                <p className="text-[11px] text-slate-400">{rwM1Correct + rwM2Correct}/{rwTotal} correct</p>
              </div>
              <div className="text-[28px] text-slate-200 font-light">+</div>
              <div className="text-center">
                <p className="text-[11px] text-slate-400 mb-1">Math</p>
                <p className="text-[36px] font-bold text-slate-900">{mathScaled}</p>
                <p className="text-[11px] text-slate-400">{mathM1Correct + mathM2Correct}/{mathTotal} correct</p>
              </div>
              <div className="text-[28px] text-slate-200 font-light">=</div>
              <div className="text-center bg-[#1b3a5c] text-white rounded-xl px-6 py-4">
                <p className="text-[11px] text-white/60 mb-1">Total Score</p>
                <p className="text-[42px] font-bold leading-none">{totalScore}</p>
                <p className="text-[11px] text-white/60">/ 1600</p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-400">* Scores are estimated. Adaptive routing: RW used {rwM2Type} Module 2; Math used {mathM2Type} Module 2.</p>
          </div>

          {/* Answer key by module */}
          {allModules.map(({ label, mod }) => (
            <div key={mod.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                <h3 className="text-[12px] font-semibold text-slate-600">{label}</h3>
                <p className="text-[11px] text-slate-400">
                  {countCorrect(mod, answers)}/{mod.questionCount} correct
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {mod.questions.map((q, qi) => {
                  const answered = isAnswered(q, answers)
                  const correct = isCorrect(q, answers)
                  const userAns = answers[q.id] ?? '—'
                  const correctAns = q.section === 'reading-writing'
                    ? q.correctAnswer
                    : (q as MathMCQuestion).type === 'multiple_choice'
                      ? (q as MathMCQuestion).correctAnswer
                      : (q as MathGridInQuestion).correctAnswer

                  return (
                    <details key={q.id} className="group">
                      <summary className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-slate-50 list-none transition-colors">
                        <span className={cn('shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                          !answered ? 'bg-slate-100 text-slate-400' :
                          correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        )}>
                          {!answered ? '?' : correct ? '✓' : '✗'}
                        </span>
                        <span className="text-[12px] font-medium text-slate-700 shrink-0 w-6">{qi + 1}.</span>
                        <span className="flex-1 text-[12px] text-slate-600 truncate">{q.question}</span>
                        <span className="shrink-0 text-[11px] text-slate-400">
                          {answered ? (correct ? '' : `Your: ${userAns} · Correct: ${correctAns}`) : 'Skipped'}
                        </span>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          className="h-3.5 w-3.5 text-slate-300 shrink-0 group-open:rotate-180 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-4 pt-1 text-[12px] text-slate-600 leading-relaxed space-y-2 bg-slate-50 border-t border-slate-100">
                        <p><span className="font-semibold text-slate-700">Correct answer:</span> {correctAns}</p>
                        {q.section === 'reading-writing' && (
                          <p><span className="font-semibold text-slate-700">Explanation:</span> {q.explanation}</p>
                        )}
                        {q.section === 'math' && (
                          <p><span className="font-semibold text-slate-700">Explanation:</span> {(q as { explanation: string }).explanation}</p>
                        )}
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleRetake}
            className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg text-[14px] transition-colors"
          >
            Retake Test
          </button>
        </div>
      </div>
    )
  }

  return null
}
