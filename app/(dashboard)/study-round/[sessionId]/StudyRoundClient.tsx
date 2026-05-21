'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { MindMapData } from '@/lib/ai/generate-mind-map'
import { MindMapSVG, downloadPNG } from '@/components/mind-map/MindMapRenderer'
import {
  submitStudyRoundAttempt,
  createNextStudyRound,
  saveStudyRoundMindMap,
  endStudyRoundSession,
} from '@/app/actions/study-rounds'
import { RichText } from '@/components/ui/rich-text'
import type {
  StudyRoundQuestion,
  StudyRoundResponse,
  StudyRoundAttemptSummary,
} from '@/app/actions/study-rounds'
import type { MissedQuestionInput } from '@/lib/ai/generate-study-round-questions'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'test' | 'review' | 'mindmap' | 'studying' | 'generating' | 'complete'
type EndReason = 'mastered' | 'timed_out' | 'manual'

interface RoundSummary {
  roundNumber: number
  scorePercent: number
  correctCount: number
  incorrectCount: number
  wrongQuestions: StudyRoundQuestion[]
}

interface SessionInfo {
  id: string
  started_at: string
  status: string
  total_duration_minutes: number
  question_count: number
  subject: string
  exam_title: string
  language?: string
  original_exam_id?: string
  standardized_exam?: string
}

interface Props {
  session: SessionInfo
  attempts: StudyRoundAttemptSummary[]
  latestAttempt: StudyRoundAttemptSummary
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LETTERS = ['A', 'B', 'C', 'D', 'E']

function fmtTime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function scoreColor(pct: number): string {
  if (pct >= 90) return 'text-emerald-600'
  if (pct >= 70) return 'text-amber-600'
  return 'text-red-600'
}

function scoreBg(pct: number): string {
  if (pct >= 90) return 'bg-emerald-50 border-emerald-200'
  if (pct >= 70) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

// Determine initial phase based on session status + latest attempt state
function getInitialPhase(session: SessionInfo, latest: StudyRoundAttemptSummary): Phase {
  if (session.status !== 'active') return 'complete'
  if (!latest.completed_at) return 'test'
  // Completed attempt but session still active = resumed mid-review
  return 'review'
}

// ─── Main component ───────────────────────────────────────────────────────────

export function StudyRoundClient({ session, attempts, latestAttempt }: Props) {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Derive initial state
  const initPhase = getInitialPhase(session, latestAttempt)
  const initResponses = (latestAttempt.responses_json ?? []) as StudyRoundResponse[]
  const initHistory: RoundSummary[] = attempts
    .filter((a) => a.completed_at)
    .map((a) => ({
      roundNumber: a.round_number,
      scorePercent: a.score_percent ?? 0,
      correctCount: a.correct_count ?? 0,
      incorrectCount: a.incorrect_count ?? 0,
      wrongQuestions: (a.questions_json ?? []).filter((q) => {
        const r = (a.responses_json ?? []).find((r) => r.question_id === q.id)
        return r ? !r.is_correct : true
      }),
    }))

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase]             = useState<Phase>(initPhase)
  const [questions, setQuestions]     = useState<StudyRoundQuestion[]>(latestAttempt.questions_json)
  const [attemptId, setAttemptId]     = useState<string>(latestAttempt.id)
  const [roundNumber, setRoundNumber] = useState<number>(latestAttempt.round_number)
  const [answers, setAnswers]         = useState<Record<string, string>>({})
  const [responses, setResponses]     = useState<StudyRoundResponse[]>(initResponses)
  const [scorePercent, setScorePercent] = useState<number>(latestAttempt.score_percent ?? 0)
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(latestAttempt.mind_map_json)
  const [mindMapState, setMindMapState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    latestAttempt.mind_map_json ? 'ready' : 'idle',
  )
  const [studySecsLeft, setStudySecsLeft] = useState(20 * 60)
  const [submitting, setSubmitting]   = useState(false)
  const [generating, setGenerating]   = useState(false)
  const [genError, setGenError]       = useState<string | null>(null)
  const [endReason, setEndReason]     = useState<EndReason>('manual')
  const [roundHistory, setRoundHistory] = useState<RoundSummary[]>(initHistory)
  const [dlBusy, setDlBusy]           = useState(false)

  // All question texts seen so far (to avoid repeats in next round)
  const [prevQTexts, setPrevQTexts] = useState<string[]>(
    attempts.flatMap((a) => (a.questions_json ?? []).map((q) => q.question_text)),
  )

  // Session seconds left (computed from started_at)
  const [sessionSecsLeft, setSessionSecsLeft] = useState<number>(() => {
    const elapsed = (Date.now() - new Date(session.started_at).getTime()) / 1000
    return Math.max(0, session.total_duration_minutes * 60 - Math.floor(elapsed))
  })

  // Ref so timer callbacks can read current phase without stale closure
  const phaseRef = useRef<Phase>(initPhase)
  useEffect(() => { phaseRef.current = phase }, [phase])

  // ── Session timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (session.status !== 'active') return
    const timer = setInterval(() => {
      setSessionSecsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [session.status])

  // When session timer hits 0, end session
  useEffect(() => {
    if (sessionSecsLeft <= 0 && phaseRef.current !== 'complete') {
      handleEnd('timed_out')
    }
  }, [sessionSecsLeft]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Study timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'studying') return
    const timer = setInterval(() => {
      setStudySecsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase])

  // Auto-advance when study timer ends
  useEffect(() => {
    if (phase === 'studying' && studySecsLeft <= 0) {
      handleReadyForNextRound()
    }
  }, [studySecsLeft, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived data ──────────────────────────────────────────────────────────
  const wrongQuestionsThisRound: StudyRoundQuestion[] = questions.filter((q) => {
    const r = responses.find((r) => r.question_id === q.id)
    return r ? !r.is_correct : true
  })

  const correctCount = responses.filter((r) => r.is_correct).length
  const unanswered   = questions.filter((q) => !answers[q.id]).length

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function handleSubmitRound() {
    setSubmitting(true)
    const result = await submitStudyRoundAttempt({
      attemptId,
      sessionId: session.id,
      answers,
    })
    setSubmitting(false)

    if ('error' in result) {
      alert(result.error)
      return
    }

    setResponses(result.responses)
    setScorePercent(result.scorePercent)

    const newSummary: RoundSummary = {
      roundNumber,
      scorePercent: result.scorePercent,
      correctCount: result.correctCount,
      incorrectCount: result.incorrectCount,
      wrongQuestions: questions.filter((q) => {
        const r = result.responses.find((r) => r.question_id === q.id)
        return r ? !r.is_correct : true
      }),
    }
    setRoundHistory((prev) => [...prev, newSummary])

    // Check mastery immediately
    if (result.scorePercent >= 90) {
      await endStudyRoundSession({ sessionId: session.id, status: 'mastered' })
      setEndReason('mastered')
      setPhase('complete')
      return
    }

    setMindMapData(null)
    setMindMapState('idle')
    setPhase('review')
  }

  async function handleGenerateMindMap() {
    if (wrongQuestionsThisRound.length === 0) {
      setMindMapState('ready')
      return
    }
    setMindMapState('loading')
    try {
      const res = await fetch('/api/mind-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: wrongQuestionsThisRound.map((q) => ({
            question_text: q.question_text,
            correct_answer: q.correct_answer,
            explanation_correct: q.explanation_correct || null,
          })),
          subject: session.subject,
          examTitle: session.exam_title,
          attemptId,
          language: session.language,
        }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      setMindMapData(data.mindMap)
      setMindMapState('ready')
      saveStudyRoundMindMap({ attemptId, mindMapData: data.mindMap }).catch(() => {})
    } catch {
      setMindMapState('error')
    }
  }

  function handleStartStudying() {
    setStudySecsLeft(20 * 60)
    setPhase('studying')
  }

  async function handleReadyForNextRound() {
    if (sessionSecsLeft <= 0) {
      handleEnd('timed_out')
      return
    }
    if (wrongQuestionsThisRound.length === 0) {
      handleEnd('mastered')
      return
    }

    setGenerating(true)
    setGenError(null)
    setPhase('generating')

    const missed: MissedQuestionInput[] = wrongQuestionsThisRound.map((q) => {
      const r = responses.find((r) => r.question_id === q.id)
      return {
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        user_answer: r?.selected_answer ?? null,
        explanation_correct: q.explanation_correct || null,
        explanation_incorrect: q.explanation_incorrect ?? null,
      }
    })

    const allPrev = [...prevQTexts, ...questions.map((q) => q.question_text)]
    setPrevQTexts(allPrev)

    const result = await createNextStudyRound({
      sessionId: session.id,
      missedQuestions: missed,
      previousQuestionTexts: allPrev,
      roundNumber: roundNumber + 1,
    })

    setGenerating(false)

    if ('error' in result) {
      setGenError(result.error)
      setPhase('studying')
      return
    }

    setAttemptId(result.attemptId)
    setQuestions(result.questions)
    setRoundNumber((n) => n + 1)
    setAnswers({})
    setResponses([])
    setScorePercent(0)
    setMindMapData(null)
    setMindMapState('idle')
    setStudySecsLeft(20 * 60)
    setPhase('test')
  }

  async function handleEnd(reason: EndReason) {
    setEndReason(reason)
    if (session.status === 'active') {
      await endStudyRoundSession({ sessionId: session.id, status: reason })
    }
    setPhase('complete')
  }

  // ── Top bar ───────────────────────────────────────────────────────────────

  const PHASE_LABELS: Record<Phase, string> = {
    test: 'Test',
    review: 'Review',
    mindmap: 'Mind Map',
    studying: 'Studying',
    generating: 'Generating…',
    complete: 'Complete',
  }

  const PHASE_COLORS: Record<Phase, string> = {
    test: 'bg-indigo-100 text-indigo-700',
    review: 'bg-slate-100 text-slate-700',
    mindmap: 'bg-violet-100 text-violet-700',
    studying: 'bg-teal-100 text-teal-700',
    generating: 'bg-amber-100 text-amber-700',
    complete: 'bg-emerald-100 text-emerald-700',
  }

  const timerColor = sessionSecsLeft < 300 ? 'text-red-600' : sessionSecsLeft < 900 ? 'text-amber-600' : 'text-slate-700'

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 justify-between bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Study Round</p>
            <p className="text-xs text-slate-400">{session.exam_title} · {session.subject}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${PHASE_COLORS[phase]}`}>
            {PHASE_LABELS[phase]}
          </span>
          {phase !== 'complete' && (
            <span className="text-xs font-semibold text-slate-500">Round {roundNumber}</span>
          )}
          {phase !== 'complete' && (
            <div className={`flex items-center gap-1.5 text-sm font-mono font-semibold ${timerColor}`}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {fmtTime(sessionSecsLeft)}
            </div>
          )}
          {phase !== 'complete' && (
            <button
              onClick={() => handleEnd('manual')}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              End session
            </button>
          )}
        </div>
      </div>

      {/* ── TEST PHASE ──────────────────────────────────────────────────── */}
      {phase === 'test' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Round {roundNumber} — {questions.length} Questions
            </h2>
            {unanswered > 0 && (
              <span className="text-xs text-slate-400">{unanswered} unanswered</span>
            )}
          </div>

          <div className="space-y-4">
            {questions.map((q, qi) => (
              <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-900 leading-relaxed mb-4">
                  <span className="text-slate-400 mr-2">{qi + 1}.</span>
                  {q.question_text}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const letter = LETTERS[oi]
                    const selected = answers[q.id] === opt
                    return (
                      <button
                        key={oi}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className={`w-full text-left flex items-start gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                          selected
                            ? 'border-indigo-400 bg-indigo-50 text-indigo-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span className={`shrink-0 w-5 h-5 rounded-full border text-xs flex items-center justify-center font-semibold mt-0.5 ${
                          selected ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300 text-slate-400'
                        }`}>
                          {letter}
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-slate-400">
              {Object.keys(answers).length} of {questions.length} answered
            </p>
            <button
              onClick={handleSubmitRound}
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {submitting ? 'Submitting…' : 'Submit Round'}
            </button>
          </div>
        </div>
      )}

      {/* ── REVIEW PHASE ────────────────────────────────────────────────── */}
      {phase === 'review' && (
        <div className="space-y-4">
          {/* Score card */}
          <div className={`rounded-2xl border p-5 ${scoreBg(scorePercent)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Round {roundNumber} Score</p>
                <p className={`text-4xl font-bold ${scoreColor(scorePercent)}`}>{scorePercent}%</p>
                <p className="text-sm text-slate-500 mt-1">
                  {correctCount} correct · {questions.length - correctCount} incorrect
                </p>
              </div>
              <div className="text-right">
                {scorePercent >= 90 ? (
                  <div className="text-emerald-600">
                    <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    <p className="text-xs font-semibold mt-1">Mastered!</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    {100 - scorePercent}% to master
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Per-question breakdown */}
          <div className="space-y-3">
            {questions.map((q, qi) => {
              const r = responses.find((r) => r.question_id === q.id)
              const isCorrect = r?.is_correct ?? false
              const selectedAnswer = r?.selected_answer ?? null
              const selectedIdx = selectedAnswer ? q.options.indexOf(selectedAnswer) : -1
              const selectedLetter = selectedIdx >= 0 ? LETTERS[selectedIdx] : null
              const whyWrong = selectedLetter && q.explanation_incorrect[selectedLetter]
                ? q.explanation_incorrect[selectedLetter]
                : null

              return (
                <div key={q.id} className={`rounded-xl border p-4 ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5 ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 leading-relaxed">
                        {qi + 1}. {q.question_text}
                      </p>
                      <div className="mt-2 space-y-1">
                        {!isCorrect && (
                          <p className="text-xs text-slate-500">
                            Your answer:{' '}
                            <span className="font-medium text-red-700">{selectedAnswer ?? 'No answer'}</span>
                          </p>
                        )}
                        {!isCorrect && (
                          <p className="text-xs text-slate-500">
                            Correct:{' '}
                            <span className="font-medium text-emerald-700">{q.correct_answer}</span>
                          </p>
                        )}
                      </div>
                      {(q.explanation_correct || whyWrong) && (
                        <div className={`mt-3 pt-3 border-t space-y-2 ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
                          {q.explanation_correct && (
                            <div>
                              <p className="text-xs font-semibold text-emerald-700 mb-1">Why this is correct</p>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                <RichText text={q.explanation_correct} />
                              </p>
                            </div>
                          )}
                          {whyWrong && (
                            <div>
                              <p className="text-xs font-semibold text-red-600 mb-1">Why your answer was wrong</p>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                <RichText text={whyWrong} />
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-end pt-2">
            {wrongQuestionsThisRound.length === 0 ? (
              <button
                onClick={() => handleEnd('mastered')}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Complete — Perfect Round!
              </button>
            ) : (
              <button
                onClick={() => setPhase('mindmap')}
                className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                View Mind Map →
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── MIND MAP PHASE ──────────────────────────────────────────────── */}
      {phase === 'mindmap' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Mind Map — Missed Concepts</h2>
            <span className="text-xs text-slate-400">{wrongQuestionsThisRound.length} missed topic{wrongQuestionsThisRound.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            {mindMapState === 'idle' && (
              <button
                onClick={handleGenerateMindMap}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                Generate Mind Map
              </button>
            )}
            {mindMapState === 'loading' && (
              <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
                <svg className="h-5 w-5 animate-spin text-violet-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analysing your missed concepts…
              </div>
            )}
            {mindMapState === 'error' && (
              <div className="space-y-3">
                <p className="text-sm text-red-600">Mind map generation failed. Please try again.</p>
                <button onClick={handleGenerateMindMap} className="text-sm text-violet-600 hover:underline">
                  Try again
                </button>
              </div>
            )}
            {mindMapState === 'ready' && mindMapData && (
              <div className="space-y-3">
                <div className="overflow-x-auto overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 max-h-[560px]">
                  <MindMapSVG data={mindMapData} svgRef={svgRef} />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      if (!svgRef.current || !mindMapData) return
                      setDlBusy(true)
                      try { await downloadPNG(svgRef.current, mindMapData.title || session.exam_title) }
                      catch { /* ignore */ }
                      finally { setDlBusy(false) }
                    }}
                    disabled={dlBusy}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v1.25A1.25 1.25 0 004.25 19h11.5A1.25 1.25 0 0017 17.75V16.5M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5" />
                    </svg>
                    {dlBusy ? 'Downloading…' : 'Download PNG'}
                  </button>
                  <button onClick={handleGenerateMindMap} className="text-xs text-slate-400 hover:text-slate-600">
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-1">
            <button onClick={() => setPhase('review')} className="text-sm text-slate-400 hover:text-slate-600">
              ← Back to review
            </button>
            <button
              onClick={handleStartStudying}
              disabled={mindMapState !== 'ready'}
              className="rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-40 transition-colors"
            >
              Start 20-min Study Timer →
            </button>
          </div>
        </div>
      )}

      {/* ── STUDYING PHASE ──────────────────────────────────────────────── */}
      {phase === 'studying' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Study Timer</p>
            <p className={`text-5xl font-mono font-bold ${studySecsLeft < 60 ? 'text-red-600' : 'text-teal-600'}`}>
              {fmtTime(studySecsLeft)}
            </p>
            <p className="text-sm text-slate-500 mt-2">Study the mind map below. You can proceed early when ready.</p>
          </div>

          {/* Mind map during studying */}
          {mindMapData && (
            <div className="overflow-x-auto overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 max-h-[480px]">
              <MindMapSVG data={mindMapData} svgRef={svgRef} />
            </div>
          )}

          <div className="flex justify-between items-center">
            {genError && (
              <p className="text-sm text-red-600">{genError}</p>
            )}
            <div className="ml-auto">
              <button
                onClick={handleReadyForNextRound}
                className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                I&apos;m ready for next round →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── GENERATING PHASE ────────────────────────────────────────────── */}
      {phase === 'generating' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm text-center space-y-4">
          <svg className="h-10 w-10 animate-spin text-indigo-500 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <div>
            <p className="text-base font-semibold text-slate-900">Generating Round {roundNumber + 1}…</p>
            <p className="text-sm text-slate-500 mt-1">Creating new questions focused on your missed concepts.</p>
          </div>
        </div>
      )}

      {/* ── COMPLETE PHASE ──────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <CompleteView
          session={session}
          roundHistory={roundHistory}
          endReason={endReason}
          sessionSecsLeft={sessionSecsLeft}
          lastMindMap={mindMapData}
          svgRef={svgRef}
          dlBusy={dlBusy}
          setDlBusy={setDlBusy}
        />
      )}
    </div>
  )
}

// ─── Complete phase sub-component ────────────────────────────────────────────

function CompleteView({
  session,
  roundHistory,
  endReason,
  sessionSecsLeft,
  lastMindMap,
  svgRef,
  dlBusy,
  setDlBusy,
}: {
  session: SessionInfo
  roundHistory: RoundSummary[]
  endReason: EndReason
  sessionSecsLeft: number
  lastMindMap: MindMapData | null
  svgRef: React.RefObject<SVGSVGElement | null>
  dlBusy: boolean
  setDlBusy: (v: boolean) => void
}) {
  const router = useRouter()
  const totalSecs = session.total_duration_minutes * 60
  const usedSecs  = totalSecs - sessionSecsLeft
  const bestScore = roundHistory.length > 0 ? Math.max(...roundHistory.map((r) => r.scorePercent)) : 0
  const lastScore = roundHistory.length > 0 ? roundHistory[roundHistory.length - 1].scorePercent : 0

  const firstWrong = roundHistory[0]?.wrongQuestions ?? []
  const lastWrong  = roundHistory[roundHistory.length - 1]?.wrongQuestions ?? []

  const stillWeakTopics = lastWrong.map((q) => q.question_text.slice(0, 80) + (q.question_text.length > 80 ? '…' : ''))

  const improvedCount = firstWrong.length > 0
    ? Math.max(0, firstWrong.length - lastWrong.length)
    : 0

  const endMessages: Record<EndReason, { title: string; sub: string }> = {
    mastered: { title: 'Mastery Achieved! 🎉', sub: 'You scored 90%+ — excellent work.' },
    timed_out: { title: 'Time\'s Up!', sub: 'Your 2-hour session has ended.' },
    manual: { title: 'Session Ended', sub: 'You ended the study round.' },
  }

  const msg = endMessages[endReason]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl border p-6 ${endReason === 'mastered' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
        <h1 className={`text-2xl font-bold ${endReason === 'mastered' ? 'text-emerald-800' : 'text-slate-900'}`}>
          {msg.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{msg.sub}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Time Used', value: fmtTime(Math.max(0, usedSecs)) },
          { label: 'Rounds Completed', value: String(roundHistory.length) },
          { label: 'Best Score', value: `${bestScore}%` },
          { label: 'Final Score', value: `${lastScore}%` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      {roundHistory.length > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Score Progress</h2>
          <div className="flex items-end gap-2 h-16">
            {roundHistory.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-sm transition-all ${scorePercBg(r.scorePercent)}`}
                  style={{ height: `${Math.max(8, r.scorePercent * 0.6)}px` }}
                />
                <span className="text-xs text-slate-400">R{r.roundNumber}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement */}
      {roundHistory.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Topics Improved</p>
            <p className="text-2xl font-bold text-emerald-700">{improvedCount}</p>
            <p className="text-xs text-emerald-600 mt-0.5">out of {firstWrong.length} initially missed</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Topics Still Weak</p>
            <p className="text-2xl font-bold text-amber-700">{lastWrong.length}</p>
            <p className="text-xs text-amber-600 mt-0.5">need more practice</p>
          </div>
        </div>
      )}

      {/* Weak topics list */}
      {stillWeakTopics.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Still Needs Work</h2>
          <ul className="space-y-2">
            {stillWeakTopics.slice(0, 8).map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 font-bold text-[10px] mt-0.5">
                  {i + 1}
                </span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Final mind map */}
      {lastMindMap && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700">Final Mind Map</h2>
            <button
              onClick={async () => {
                if (!svgRef.current || !lastMindMap) return
                setDlBusy(true)
                try { await downloadPNG(svgRef.current, lastMindMap.title) }
                catch { /* ignore */ }
                finally { setDlBusy(false) }
              }}
              disabled={dlBusy}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 disabled:opacity-50"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v1.25A1.25 1.25 0 004.25 19h11.5A1.25 1.25 0 0017 17.75V16.5M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5" />
              </svg>
              {dlBusy ? 'Downloading…' : 'Download PNG'}
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 max-h-[480px]">
            <MindMapSVG data={lastMindMap} svgRef={svgRef} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pb-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Back to Dashboard
        </button>
        {session.original_exam_id && (
          <button
            onClick={() => router.push(`/exams/${session.original_exam_id}/results`)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View Original Results
          </button>
        )}
      </div>
    </div>
  )
}

// Helper for score bar color
function scorePercBg(pct: number): string {
  if (pct >= 90) return 'bg-emerald-500'
  if (pct >= 70) return 'bg-amber-400'
  return 'bg-red-400'
}

// Need to declare SessionInfo here since it's used in CompleteView
interface SessionInfo {
  id: string
  started_at: string
  status: string
  total_duration_minutes: number
  question_count: number
  subject: string
  exam_title: string
  language?: string
  original_exam_id?: string
  standardized_exam?: string
}
