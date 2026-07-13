'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { StimulusRenderer } from '@/components/exam/StimulusRenderer'
import { SATGraph } from '@/components/exam/SATGraph'
import { loadQBResult } from '@/lib/question-bank/sat/question-selector'
import { rwQuestions } from '@/lib/question-bank/sat/rw-questions'
import { mathQuestions } from '@/lib/question-bank/sat/math-questions'
import type { QBPracticeSetResult, QBQuestion, QBDomain } from '@/lib/question-bank/types'

const allQuestions = [...rwQuestions, ...mathQuestions]

function qById(id: string): QBQuestion | undefined {
  return allQuestions.find(q => q.id === id)
}

function isAnswerCorrect(q: QBQuestion, ans: string): boolean {
  if (q.questionType === 'grid_in') {
    return (q.acceptableAnswers ?? [q.correctAnswer]).some(a =>
      a.replace(/\s/g, '').toLowerCase() === ans?.replace(/\s/g, '').toLowerCase()
    )
  }
  return ans === q.correctAnswer
}

export default function QBResultsPage() {
  const searchParams = useSearchParams()
  const setId = searchParams.get('setId') ?? ''
  const [result, setResult] = useState<QBPracticeSetResult | null>(null)
  const [expandedMissed, setExpandedMissed] = useState(false)
  const [expandedAll, setExpandedAll] = useState(false)

  useEffect(() => {
    if (setId) setResult(loadQBResult(setId))
  }, [setId])

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-[#1b3a5c]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading results…
        </div>
      </div>
    )
  }

  const questions = result.questionIds.map(id => qById(id)).filter(Boolean) as QBQuestion[]
  const correct = questions.filter(q => isAnswerCorrect(q, result.answers[q.id]))
  const incorrect = questions.filter(q => !isAnswerCorrect(q, result.answers[q.id]))
  const accuracy = Math.round((correct.length / questions.length) * 100)

  const totalTime = Object.values(result.timeSpentSeconds).reduce((s, t) => s + t, 0)
  const mins = Math.floor(totalTime / 60)
  const secs = totalTime % 60

  const rwQs = questions.filter(q => q.section === 'reading-writing')
  const mathQs = questions.filter(q => q.section === 'math')
  const rwCorrect = rwQs.filter(q => isAnswerCorrect(q, result.answers[q.id])).length
  const mathCorrect = mathQs.filter(q => isAnswerCorrect(q, result.answers[q.id])).length

  // Accuracy by domain
  const domainMap = new Map<QBDomain, { correct: number; total: number }>()
  for (const q of questions) {
    const d = q.domain as QBDomain
    const entry = domainMap.get(d) ?? { correct: 0, total: 0 }
    entry.total++
    if (isAnswerCorrect(q, result.answers[q.id])) entry.correct++
    domainMap.set(d, entry)
  }

  const domainResults = [...domainMap.entries()]
    .map(([domain, { correct, total }]) => ({
      domain,
      correct,
      total,
      pct: Math.round((correct / total) * 100),
    }))
    .sort((a, b) => a.pct - b.pct)

  const weakest = domainResults.filter(d => d.pct < 70)

  const accuracyColor = accuracy >= 80 ? 'text-emerald-400' : accuracy >= 60 ? 'text-amber-400' : 'text-red-400'

  const completedLabel = new Date(result.completedAt).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })

  return (
    <div className="max-w-2xl mx-auto pb-12 space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#1b3a5c] rounded-xl px-6 py-5 text-white">
        <div className="flex items-center gap-2 text-[11px] text-blue-300 mb-3">
          <Link href="/question-bank" className="hover:text-white transition-colors">Question Bank</Link>
          <span>›</span>
          <Link href="/question-bank/sat" className="hover:text-white transition-colors">SAT</Link>
          <span>›</span>
          <span className="text-white/80">Results</span>
        </div>
        <h1 className="text-[22px] font-bold leading-tight">Practice Set Results</h1>
        <p className="text-[13px] text-blue-300 mt-0.5">Completed {completedLabel}</p>
      </div>

      {/* ── Score summary ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Practice Set Summary</h2>
        <div className="flex items-center justify-between flex-wrap gap-4">
          {rwQs.length > 0 && mathQs.length > 0 ? (
            <>
              <div className="text-center">
                <p className="text-[11px] text-slate-400 mb-1">Reading &amp; Writing</p>
                <p className="text-[32px] font-bold text-slate-900">{rwCorrect}/{rwQs.length}</p>
                <p className="text-[11px] text-slate-400">{Math.round((rwCorrect / rwQs.length) * 100)}% correct</p>
              </div>
              <div className="text-[24px] text-slate-200 font-light">+</div>
              <div className="text-center">
                <p className="text-[11px] text-slate-400 mb-1">Math</p>
                <p className="text-[32px] font-bold text-slate-900">{mathCorrect}/{mathQs.length}</p>
                <p className="text-[11px] text-slate-400">{Math.round((mathCorrect / mathQs.length) * 100)}% correct</p>
              </div>
              <div className="text-[24px] text-slate-200 font-light">=</div>
            </>
          ) : null}
          <div className="text-center bg-[#1b3a5c] text-white rounded-xl px-6 py-4">
            <p className="text-[11px] text-white/60 mb-1">Accuracy</p>
            <p className={cn('text-[42px] font-bold leading-none', accuracyColor)}>{accuracy}%</p>
            <p className="text-[11px] text-white/60">{correct.length}/{questions.length} correct</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-[12px]">
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-slate-400">Correct</p>
            <p className="font-semibold text-emerald-600 text-[18px]">{correct.length}</p>
          </div>
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-slate-400">Incorrect</p>
            <p className="font-semibold text-red-500 text-[18px]">{incorrect.length}</p>
          </div>
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <p className="text-[10px] text-slate-400">Time</p>
            <p className="font-semibold text-slate-700 text-[18px]">{mins}:{secs.toString().padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      {/* ── Domain breakdown ───────────────────────────────────────────────── */}
      {domainResults.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[13px] font-semibold text-slate-700 mb-4">Accuracy by Domain</h2>
          <div className="space-y-3">
            {domainResults.map(({ domain, correct: c, total: t, pct }) => (
              <div key={domain}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-slate-700">{domain}</span>
                  <span className="text-[12px] text-slate-500">{c}/{t} · {pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={cn('h-2 rounded-full transition-all',
                      pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400'
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Focus areas ────────────────────────────────────────────────────── */}
      {weakest.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-[13px] font-semibold text-amber-900 mb-2">Focus areas for next time</h2>
          <div className="space-y-1.5">
            {weakest.map(({ domain, pct }) => (
              <div key={domain} className="flex items-center justify-between text-[12px]">
                <span className="text-amber-800">{domain}</span>
                <Link
                  href={`/question-bank/sat/practice?domains=${encodeURIComponent(domain)}&count=10&mode=browse`}
                  className="font-semibold text-[#1b3a5c] hover:underline"
                >
                  Practice {domain.split(' ')[0]} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Missed questions ───────────────────────────────────────────────── */}
      {incorrect.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setExpandedMissed(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-[13px] font-semibold text-slate-700">
              Missed Questions ({incorrect.length})
            </span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              className={cn('h-4 w-4 text-slate-400 transition-transform', expandedMissed ? 'rotate-180' : '')}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {expandedMissed && (
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {incorrect.map((q, idx) => {
                const userAns = result.answers[q.id]
                return (
                  <div key={q.id} className="px-5 py-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-red-500">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{q.domain}</span>
                          <span className="text-[10px] text-slate-400">{q.skill}</span>
                        </div>
                        {q.stimulus && (
                          <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded-lg p-3 mb-2 leading-relaxed">
                            <StimulusRenderer text={q.stimulus} underlineTargets={q.underlineTargets} />
                          </div>
                        )}
                        {q.graphData && (
                          <div className="mb-2">
                            <SATGraph data={q.graphData} className="border border-slate-100 rounded p-2 bg-slate-50" />
                          </div>
                        )}
                        <p className="text-[13px] font-medium text-slate-800 mb-3">{q.question}</p>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <span className="flex items-center gap-1.5 text-red-600">
                            <span className="h-4 w-4 rounded-full bg-red-100 flex items-center justify-center font-bold text-[9px]">✗</span>
                            Your answer: <strong>{userAns || 'Skipped'}</strong>
                          </span>
                          <span className="flex items-center gap-1.5 text-green-600">
                            <span className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center font-bold text-[9px]">✓</span>
                            Correct: <strong>{q.correctAnswer}</strong>
                          </span>
                        </div>
                        <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-2">
                          <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Explanation</p>
                          <p className="text-[12px] text-slate-700 leading-relaxed">{q.explanation}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                          <p className="text-[10px] font-bold text-[#1b3a5c] uppercase tracking-widest mb-1">Teaching Point</p>
                          <p className="text-[12px] text-[#1b3a5c]/80 leading-relaxed">{q.teachingPoint}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── All questions review ───────────────────────────────────────────── */}
      {questions.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setExpandedAll(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-[13px] font-semibold text-slate-700">
              All Questions ({questions.length})
            </span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              className={cn('h-4 w-4 text-slate-400 transition-transform', expandedAll ? 'rotate-180' : '')}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {expandedAll && (
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {questions.map((q, idx) => {
                const userAns = result.answers[q.id]
                const isCorrect_ = isAnswerCorrect(q, userAns)
                return (
                  <div key={q.id} className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold',
                        isCorrect_ ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-red-100 text-red-500 border border-red-200'
                      )}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-700 truncate">{q.question}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-[11px]">
                          <span className={isCorrect_ ? 'text-green-600' : 'text-red-500'}>
                            {isCorrect_ ? '✓ Correct' : `✗ ${userAns || 'Skipped'} → ${q.correctAnswer}`}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-400">{q.skill}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Action buttons ─────────────────────────────────────────────────── */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href={`/question-bank/sat/practice?${new URLSearchParams({
            ...(result.config.section ? { section: result.config.section } : {}),
            count: String(result.config.count),
            mode: result.config.mode,
          })}`}
          className="flex-1 text-center bg-[#1b3a5c] hover:bg-[#152d48] text-white font-semibold text-[13px] px-4 py-3 rounded-xl transition-colors"
        >
          Generate another practice set
        </Link>
        <Link
          href="/question-bank/sat"
          className="flex-1 text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] px-4 py-3 rounded-xl transition-colors"
        >
          Change filters
        </Link>
      </div>
    </div>
  )
}
