'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allMCATQBQuestions } from '@/lib/question-bank/mcat/index'
import { loadMCATQBResult } from '@/lib/question-bank/mcat/question-selector'
import type { MCATQBQuestion, MCATQBPracticeSetResult, MCATQBSection, MCATQBSkill } from '@/lib/question-bank/mcat/types'

const SECTION_LABELS: Record<MCATQBSection, string> = {
  'chem-phys': 'Chem/Phys',
  'cars': 'CARS',
  'bio-biochem': 'Bio/Biochem',
  'psych-soc': 'Psych/Soc',
}

function qById(id: string): MCATQBQuestion | undefined {
  return allMCATQBQuestions.find(q => q.id === id)
}

export default function MCATQBResultsPage() {
  const searchParams = useSearchParams()
  const setId = searchParams.get('setId') ?? ''
  const [result, setResult] = useState<MCATQBPracticeSetResult | null>(null)
  const [showMissed, setShowMissed] = useState(false)

  useEffect(() => {
    if (setId) setResult(loadMCATQBResult(setId))
  }, [setId])

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading results…
        </div>
      </div>
    )
  }

  const questions = result.questionIds.map(id => qById(id)).filter(Boolean) as MCATQBQuestion[]
  const correct = questions.filter(q => result.answers[q.id] === q.correctAnswer)
  const incorrect = questions.filter(q => result.answers[q.id] !== q.correctAnswer)
  const accuracy = Math.round((correct.length / questions.length) * 100)

  const totalTime = Object.values(result.timeSpentSeconds).reduce((s, t) => s + t, 0)
  const mins = Math.floor(totalTime / 60)
  const secs = totalTime % 60

  // Accuracy by section
  const sectionMap = new Map<MCATQBSection, { correct: number; total: number }>()
  for (const q of questions) {
    const entry = sectionMap.get(q.section) ?? { correct: 0, total: 0 }
    entry.total++
    if (result.answers[q.id] === q.correctAnswer) entry.correct++
    sectionMap.set(q.section, entry)
  }
  const sectionResults = [...sectionMap.entries()].map(([sec, { correct: c, total: t }]) => ({
    section: sec, label: SECTION_LABELS[sec], correct: c, total: t, pct: Math.round((c / t) * 100),
  })).sort((a, b) => a.pct - b.pct)

  // Accuracy by discipline
  const disciplineMap = new Map<string, { correct: number; total: number }>()
  for (const q of questions) {
    const entry = disciplineMap.get(q.discipline) ?? { correct: 0, total: 0 }
    entry.total++
    if (result.answers[q.id] === q.correctAnswer) entry.correct++
    disciplineMap.set(q.discipline, entry)
  }
  const disciplineResults = [...disciplineMap.entries()].map(([disc, { correct: c, total: t }]) => ({
    discipline: disc, correct: c, total: t, pct: Math.round((c / t) * 100),
  })).sort((a, b) => a.pct - b.pct)

  // Accuracy by scientific skill
  const skillMap = new Map<MCATQBSkill, { correct: number; total: number }>()
  for (const q of questions) {
    const entry = skillMap.get(q.scientificSkill) ?? { correct: 0, total: 0 }
    entry.total++
    if (result.answers[q.id] === q.correctAnswer) entry.correct++
    skillMap.set(q.scientificSkill, entry)
  }
  const skillResults = [...skillMap.entries()].map(([skill, { correct: c, total: t }]) => ({
    skill, correct: c, total: t, pct: Math.round((c / t) * 100),
  })).sort((a, b) => a.pct - b.pct)

  const weakSections = sectionResults.filter(s => s.pct < 70)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
          <span>›</span>
          <Link href="/question-bank/mcat" className="hover:text-slate-600 transition-colors">MCAT</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">Results</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Practice Set Results</h1>
        <p className="text-slate-400 text-[13px] mt-0.5">
          Completed {new Date(result.completedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>

      {/* Score summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <p className={cn('text-[48px] font-bold leading-none',
              accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-red-500'
            )}>
              {accuracy}%
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Accuracy</p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-[22px] font-bold text-slate-900">{correct.length}</p>
              <p className="text-[11px] text-slate-400">Correct</p>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-[22px] font-bold text-slate-900">{incorrect.length}</p>
              <p className="text-[11px] text-slate-400">Incorrect</p>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-[22px] font-bold text-slate-900">{mins}:{secs.toString().padStart(2, '0')}</p>
              <p className="text-[11px] text-slate-400">Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      {sectionResults.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[13px] font-semibold text-slate-700 mb-4">Accuracy by Section</h2>
          <div className="space-y-3">
            {sectionResults.map(({ label, correct: c, total: t, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-slate-700">{label}</span>
                  <span className="text-[12px] text-slate-500">{c}/{t} · {pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={cn('h-2 rounded-full', pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400')}
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discipline breakdown */}
      {disciplineResults.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[13px] font-semibold text-slate-700 mb-4">Accuracy by Discipline</h2>
          <div className="space-y-3">
            {disciplineResults.map(({ discipline, correct: c, total: t, pct }) => (
              <div key={discipline}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-slate-700">{discipline}</span>
                  <span className="text-[12px] text-slate-500">{c}/{t} · {pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={cn('h-2 rounded-full', pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400')}
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scientific skill breakdown */}
      {skillResults.length > 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[13px] font-semibold text-slate-700 mb-4">Accuracy by Scientific Skill</h2>
          <div className="space-y-3">
            {skillResults.map(({ skill, correct: c, total: t, pct }) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-slate-700">{skill}</span>
                  <span className="text-[12px] text-slate-500">{c}/{t} · {pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={cn('h-2 rounded-full', pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400')}
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Focus areas */}
      {weakSections.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-[13px] font-semibold text-amber-900 mb-2">Focus areas for next time</h2>
          <div className="space-y-1.5">
            {weakSections.map(({ section, label, pct }) => (
              <div key={section} className="flex items-center justify-between text-[12px]">
                <span className="text-amber-800">{label} — {pct}%</span>
                <Link
                  href={`/question-bank/mcat/practice?section=${section}&count=10`}
                  className="font-semibold text-teal-600 hover:underline"
                >
                  Practice {label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missed questions */}
      {incorrect.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200">
          <button
            onClick={() => setShowMissed(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-[13px] font-semibold text-slate-700">Missed Questions ({incorrect.length})</span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              className={cn('h-4 w-4 text-slate-400 transition-transform', showMissed ? 'rotate-180' : '')}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showMissed && (
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {incorrect.map((q, idx) => {
                const userAns = result.answers[q.id]
                return (
                  <div key={q.id} className="px-5 py-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-slate-400 shrink-0 mt-0.5">Q{idx + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                            {SECTION_LABELS[q.section]}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {q.discipline}
                          </span>
                          <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded">
                            {q.scientificSkill}
                          </span>
                        </div>
                        {q.passageText && (
                          <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-100 rounded p-2 mb-2 leading-relaxed line-clamp-3">
                            {q.passageText}
                          </div>
                        )}
                        <p className="text-[12px] font-medium text-slate-800 mb-2">{q.question}</p>
                        <div className="flex items-center gap-4 text-[11px]">
                          <span className="text-red-600">Your answer: <strong>{userAns || 'Skipped'}</strong></span>
                          <span className="text-green-600">Correct: <strong>{q.correctAnswer}</strong></span>
                        </div>
                        <div className="mt-2 bg-green-50 border border-green-100 rounded-lg p-2.5">
                          <p className="text-[11px] text-slate-700 leading-relaxed">{q.explanation}</p>
                        </div>
                        <div className="mt-2 bg-teal-50 border border-teal-100 rounded-lg p-2.5">
                          <p className="text-[10px] font-bold text-teal-700 uppercase tracking-widest mb-0.5">Teaching Point</p>
                          <p className="text-[11px] text-teal-800">{q.teachingPoint}</p>
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

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/question-bank/mcat/practice?count=10"
          className="flex-1 text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[13px] px-4 py-3 rounded-xl transition-colors"
        >
          New practice set
        </Link>
        <Link
          href="/question-bank/mcat"
          className="flex-1 text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] px-4 py-3 rounded-xl transition-colors"
        >
          Change filters
        </Link>
      </div>
    </div>
  )
}
