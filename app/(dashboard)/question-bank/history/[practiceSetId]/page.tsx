'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { loadQBResultById } from '@/lib/question-bank/history'
import { rwQuestions } from '@/lib/question-bank/sat/rw-questions'
import { mathQuestions } from '@/lib/question-bank/sat/math-questions'
import { rwSkillToAcademySlug } from '@/lib/academy/skill-mapping'
import { allMCATQBQuestions } from '@/lib/question-bank/mcat/index'
import { StimulusRenderer } from '@/components/exam/StimulusRenderer'
import { SATGraph } from '@/components/exam/SATGraph'
import type { QBQuestion, QBPracticeSetResult } from '@/lib/question-bank/types'
import type { MCATQBQuestion, MCATQBPracticeSetResult, MCATQBSection } from '@/lib/question-bank/mcat/types'

const ALL_SAT = [...rwQuestions, ...mathQuestions]

const MCAT_SECTION_LABELS: Record<MCATQBSection, string> = {
  'chem-phys': 'Chem/Phys',
  'cars': 'CARS',
  'bio-biochem': 'Bio/Biochem',
  'psych-soc': 'Psych/Soc',
}

function isSatCorrect(q: QBQuestion, ans: string): boolean {
  if (q.questionType === 'grid_in') {
    return (q.acceptableAnswers ?? [q.correctAnswer]).some(
      a => a.replace(/\s/g, '').toLowerCase() === (ans ?? '').replace(/\s/g, '').toLowerCase()
    )
  }
  return ans === q.correctAnswer
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

// ── SAT Review ────────────────────────────────────────────────────────────────

function SATReview({ result }: { result: QBPracticeSetResult }) {
  const [showAll, setShowAll] = useState(false)

  const questions = result.questionIds.map(id => ALL_SAT.find(q => q.id === id)).filter(Boolean) as QBQuestion[]
  const correct = questions.filter(q => isSatCorrect(q, result.answers[q.id]))
  const incorrect = questions.filter(q => !isSatCorrect(q, result.answers[q.id]))
  const accuracy = Math.round((correct.length / (questions.length || 1)) * 100)

  const totalTime = Object.values(result.timeSpentSeconds).reduce((s, t) => s + t, 0)
  const mins = Math.floor(totalTime / 60)
  const secs = totalTime % 60

  const domainMap = new Map<string, { correct: number; total: number }>()
  for (const q of questions) {
    const e = domainMap.get(q.domain) ?? { correct: 0, total: 0 }
    e.total++
    if (isSatCorrect(q, result.answers[q.id])) e.correct++
    domainMap.set(q.domain, e)
  }
  const domainResults = [...domainMap.entries()].map(([domain, { correct: c, total: t }]) => ({
    domain, correct: c, total: t, pct: Math.round((c / t) * 100),
  })).sort((a, b) => a.pct - b.pct)

  const displayQ = showAll ? questions : incorrect

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <p className={cn('text-5xl font-bold leading-none',
              accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-red-500'
            )}>{accuracy}%</p>
            <p className="text-xs text-slate-400 mt-1">Accuracy</p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-900">{correct.length}</p>
              <p className="text-xs text-slate-400">Correct</p>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-900">{incorrect.length}</p>
              <p className="text-xs text-slate-400">Incorrect</p>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-900">{mins}:{secs.toString().padStart(2, '0')}</p>
              <p className="text-xs text-slate-400">Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain breakdown */}
      {domainResults.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Accuracy by Domain</h2>
          <div className="space-y-3">
            {domainResults.map(({ domain, correct: c, total: t, pct }) => (
              <div key={domain}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-700">{domain}</span>
                  <span className="text-xs text-slate-500">{c}/{t} · {pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className={cn('h-1.5 rounded-full', pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400')}
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">
            {showAll ? `All Questions (${questions.length})` : `Missed Questions (${incorrect.length})`}
          </h2>
          <button
            onClick={() => setShowAll(v => !v)}
            className="text-xs text-emerald-600 font-medium hover:underline"
          >
            {showAll ? 'Show missed only' : `Show all ${questions.length}`}
          </button>
        </div>
        {displayQ.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-400 text-center">
            {showAll ? 'No questions in this set.' : 'No missed questions — perfect score!'}
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayQ.map((q, idx) => {
              const userAns = result.answers[q.id]
              const isCorrect = isSatCorrect(q, userAns)
              return (
                <div key={q.id} className="px-5 py-5 space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      'text-[10px] font-bold rounded-full px-2 py-0.5',
                      isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600',
                    )}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {q.domain}
                    </span>
                    <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      {q.skill}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full capitalize">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Stimulus */}
                  {q.stimulus && (
                    <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-3 leading-relaxed">
                      <StimulusRenderer text={q.stimulus} underlineTargets={q.underlineTargets} />
                    </div>
                  )}
                  {q.graphData && (
                    <SATGraph data={q.graphData} className="border border-slate-100 rounded-lg p-2 bg-slate-50" />
                  )}

                  {/* Question */}
                  <p className="text-sm font-medium text-slate-800">{q.question}</p>

                  {/* Answer choices */}
                  {q.choices && (
                    <div className="space-y-1.5">
                      {q.choices.map(c => {
                        const isUser = c.label === userAns
                        const isRight = c.label === q.correctAnswer
                        return (
                          <div key={c.label} className={cn(
                            'flex items-start gap-2 text-xs rounded-lg px-3 py-2 border',
                            isRight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                            isUser && !isCorrect ? 'bg-red-50 border-red-200 text-red-700' :
                            'bg-slate-50 border-slate-100 text-slate-600',
                          )}>
                            <span className="font-bold shrink-0 mt-0.5">{c.label}.</span>
                            <span>{c.text}</span>
                            {isRight && <span className="ml-auto text-emerald-600 font-semibold shrink-0">✓</span>}
                            {isUser && !isRight && <span className="ml-auto text-red-500 font-semibold shrink-0">✗</span>}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {q.questionType === 'grid_in' && (
                    <div className="flex items-center gap-3 text-xs">
                      <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-red-600'}>
                        Your answer: <strong>{userAns || 'Skipped'}</strong>
                      </span>
                      {!isCorrect && (
                        <span className="text-emerald-700 font-semibold">
                          Correct: <strong>{q.correctAnswer}</strong>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Explanation</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{q.explanation}</p>
                  </div>

                  {/* Wrong answer explanation for the user's choice */}
                  {!isCorrect && userAns && q.wrongAnswerExplanations?.[userAns as 'A'|'B'|'C'|'D'] && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                      <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-1">Why {userAns} is wrong</p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {q.wrongAnswerExplanations[userAns as 'A'|'B'|'C'|'D']}
                      </p>
                    </div>
                  )}

                  {/* Teaching point */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                    <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-1">Teaching Point</p>
                    <p className="text-xs text-indigo-800 leading-relaxed">{q.teachingPoint}</p>
                  </div>

                  {/* Review This Skill — R&W only */}
                  {q.section === 'reading-writing' && (() => {
                    const slug = rwSkillToAcademySlug(q.skill)
                    if (!slug) return null
                    return (
                      <a
                        href={`/sat-rw-academy/lesson/${slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                        Review This Skill: {q.skill}
                      </a>
                    )
                  })()}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── MCAT Review ───────────────────────────────────────────────────────────────

function MCATReview({ result }: { result: MCATQBPracticeSetResult }) {
  const [showAll, setShowAll] = useState(false)

  const questions = result.questionIds.map(id => allMCATQBQuestions.find(q => q.id === id)).filter(Boolean) as MCATQBQuestion[]
  const correct = questions.filter(q => result.answers[q.id] === q.correctAnswer)
  const incorrect = questions.filter(q => result.answers[q.id] !== q.correctAnswer)
  const accuracy = Math.round((correct.length / (questions.length || 1)) * 100)

  const totalTime = Object.values(result.timeSpentSeconds).reduce((s, t) => s + t, 0)
  const mins = Math.floor(totalTime / 60)
  const secs = totalTime % 60

  const sectionMap = new Map<string, { correct: number; total: number }>()
  const disciplineMap = new Map<string, { correct: number; total: number }>()
  const skillMap = new Map<string, { correct: number; total: number }>()

  for (const q of questions) {
    const label = MCAT_SECTION_LABELS[q.section] ?? q.section
    const se = sectionMap.get(label) ?? { correct: 0, total: 0 }
    se.total++; if (result.answers[q.id] === q.correctAnswer) se.correct++
    sectionMap.set(label, se)

    const de = disciplineMap.get(q.discipline) ?? { correct: 0, total: 0 }
    de.total++; if (result.answers[q.id] === q.correctAnswer) de.correct++
    disciplineMap.set(q.discipline, de)

    const ske = skillMap.get(q.scientificSkill) ?? { correct: 0, total: 0 }
    ske.total++; if (result.answers[q.id] === q.correctAnswer) ske.correct++
    skillMap.set(q.scientificSkill, ske)
  }

  const toResults = (map: Map<string, { correct: number; total: number }>) =>
    [...map.entries()].map(([label, { correct: c, total: t }]) => ({
      label, correct: c, total: t, pct: Math.round((c / t) * 100),
    })).sort((a, b) => a.pct - b.pct)

  const sectionResults = toResults(sectionMap)
  const disciplineResults = toResults(disciplineMap)
  const skillResults = toResults(skillMap)

  const displayQ = showAll ? questions : incorrect

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <p className={cn('text-5xl font-bold leading-none',
              accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-red-500'
            )}>{accuracy}%</p>
            <p className="text-xs text-slate-400 mt-1">Accuracy</p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-900">{correct.length}</p>
              <p className="text-xs text-slate-400">Correct</p>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-900">{incorrect.length}</p>
              <p className="text-xs text-slate-400">Incorrect</p>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-900">{mins}:{secs.toString().padStart(2, '0')}</p>
              <p className="text-xs text-slate-400">Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdowns */}
      {sectionResults.length > 1 && (
        <BreakdownCard title="Accuracy by Section" results={sectionResults} />
      )}
      {disciplineResults.length > 1 && (
        <BreakdownCard title="Accuracy by Discipline" results={disciplineResults} />
      )}
      {skillResults.length > 1 && (
        <BreakdownCard title="Accuracy by Scientific Skill" results={skillResults} />
      )}

      {/* Questions */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">
            {showAll ? `All Questions (${questions.length})` : `Missed Questions (${incorrect.length})`}
          </h2>
          <button
            onClick={() => setShowAll(v => !v)}
            className="text-xs text-emerald-600 font-medium hover:underline"
          >
            {showAll ? 'Show missed only' : `Show all ${questions.length}`}
          </button>
        </div>
        {displayQ.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-400 text-center">
            {showAll ? 'No questions in this set.' : 'No missed questions — perfect score!'}
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {displayQ.map(q => {
              const userAns = result.answers[q.id]
              const isCorrect = userAns === q.correctAnswer
              return (
                <div key={q.id} className="px-5 py-5 space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      'text-[10px] font-bold rounded-full px-2 py-0.5',
                      isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600',
                    )}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {MCAT_SECTION_LABELS[q.section] ?? q.section}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {q.discipline}
                    </span>
                    <span className="text-[10px] text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                      {q.scientificSkill}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full capitalize">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Content category */}
                  <p className="text-[10px] text-slate-400">
                    <span className="font-semibold">Foundational Concept {q.foundationalConcept}</span>
                    {' · '}
                    {q.contentCategory}
                  </p>

                  {/* Passage */}
                  {q.passageText && (
                    <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-3 leading-relaxed max-h-40 overflow-y-auto">
                      {q.passageText}
                    </div>
                  )}

                  {/* Question */}
                  <p className="text-sm font-medium text-slate-800">{q.question}</p>

                  {/* Choices */}
                  <div className="space-y-1.5">
                    {q.choices.map(c => {
                      const isUser = c.label === userAns
                      const isRight = c.label === q.correctAnswer
                      return (
                        <div key={c.label} className={cn(
                          'flex items-start gap-2 text-xs rounded-lg px-3 py-2 border',
                          isRight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                          isUser && !isCorrect ? 'bg-red-50 border-red-200 text-red-700' :
                          'bg-slate-50 border-slate-100 text-slate-600',
                        )}>
                          <span className="font-bold shrink-0 mt-0.5">{c.label}.</span>
                          <span>{c.text}</span>
                          {isRight && <span className="ml-auto text-emerald-600 font-semibold shrink-0">✓</span>}
                          {isUser && !isRight && <span className="ml-auto text-red-500 font-semibold shrink-0">✗</span>}
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Explanation</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{q.explanation}</p>
                  </div>

                  {/* Wrong answer explanation for the user's choice */}
                  {!isCorrect && userAns && q.wrongAnswerExplanations?.[userAns as 'A'|'B'|'C'|'D'] && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                      <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-1">Why {userAns} is wrong</p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {q.wrongAnswerExplanations[userAns as 'A'|'B'|'C'|'D']}
                      </p>
                    </div>
                  )}

                  {/* Teaching point */}
                  <div className="bg-teal-50 border border-teal-100 rounded-lg p-3">
                    <p className="text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-1">Teaching Point</p>
                    <p className="text-xs text-teal-800 leading-relaxed">{q.teachingPoint}</p>
                  </div>

                  {/* Related topics */}
                  {q.relatedTopics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {q.relatedTopics.map(t => (
                        <span key={t} className="text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Shared breakdown card ─────────────────────────────────────────────────────

function BreakdownCard({ title, results }: { title: string; results: { label: string; correct: number; total: number; pct: number }[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="text-sm font-semibold text-slate-700 mb-4">{title}</h2>
      <div className="space-y-3">
        {results.map(({ label, correct: c, total: t, pct }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700">{label}</span>
              <span className="text-xs text-slate-500">{c}/{t} · {pct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className={cn('h-1.5 rounded-full', pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-400')}
                style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function QBReviewPage() {
  const params = useParams()
  const id = typeof params.practiceSetId === 'string' ? params.practiceSetId : ''

  type LoadedData =
    | { type: 'SAT'; result: QBPracticeSetResult }
    | { type: 'MCAT'; result: MCATQBPracticeSetResult }
    | { type: 'notfound' }
    | null

  const [data, setData] = useState<LoadedData>(null)

  useEffect(() => {
    if (!id) return
    const found = loadQBResultById(id)
    setData(found ?? { type: 'notfound' })
  }, [id])

  const completedAt = data && data.type !== 'notfound' ? data.result.completedAt : ''

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
        <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
        <span>›</span>
        <Link href="/question-bank/history" className="hover:text-slate-600 transition-colors">Practice History</Link>
        <span>›</span>
        <span className="text-slate-600 font-medium">Review</span>
      </div>

      {data === null ? (
        <div className="flex items-center justify-center min-h-[40vh] gap-3 text-sm text-slate-400">
          <svg className="animate-spin h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading…
        </div>
      ) : data.type === 'notfound' ? (
        <div className="text-center py-20">
          <p className="text-slate-500 font-medium">Practice set not found.</p>
          <p className="text-slate-400 text-sm mt-1">It may have been cleared from local storage.</p>
          <Link href="/question-bank/history" className="inline-block mt-4 text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors">
            Back to History
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border',
                data.type === 'SAT'
                  ? 'text-blue-700 bg-blue-50 border-blue-200'
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200',
              )}>
                {data.type}
              </span>
              <h1 className="text-xl font-bold text-slate-900">Practice Set Review</h1>
            </div>
            <p className="text-sm text-slate-500">Completed {formatDate(completedAt)}</p>
          </div>

          {data.type === 'SAT'
            ? <SATReview result={data.result} />
            : <MCATReview result={data.result} />
          }

          <div className="flex gap-3 mt-8">
            <Link
              href="/question-bank/history"
              className="flex-1 text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
            >
              ← Back to History
            </Link>
            <Link
              href={data.type === 'SAT' ? '/question-bank/sat' : '/question-bank/mcat'}
              className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors"
            >
              New Practice Set
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
