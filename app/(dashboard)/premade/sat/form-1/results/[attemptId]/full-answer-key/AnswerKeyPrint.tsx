'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SATGraph } from '@/components/exam/SATGraph'
import { StimulusRenderer } from '@/components/exam/StimulusRenderer'
import { rwModule1Questions } from '@/lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions } from '@/lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions } from '@/lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions } from '@/lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions } from '@/lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions } from '@/lib/premade-exams/sat/math-module-2-hard'
import { loadAttempt } from '@/lib/premade-exams/sat/attempt-store'
import type { SATQuestion, RWQuestion, MathMCQuestion, MathGridInQuestion, SATGraphData } from '@/lib/premade-exams/sat/types'

const MODULES = [
  { key: 'rw-m1',   label: 'Reading & Writing — Module 1',         questions: rwModule1Questions,        section: 'R&W' },
  { key: 'rw-m2e',  label: 'Reading & Writing — Module 2 (Easy)',  questions: rwModule2EasyQuestions,   section: 'R&W' },
  { key: 'rw-m2h',  label: 'Reading & Writing — Module 2 (Hard)',  questions: rwModule2HardQuestions,   section: 'R&W' },
  { key: 'math-m1', label: 'Math — Module 1',                       questions: mathModule1Questions,     section: 'Math' },
  { key: 'math-m2e',label: 'Math — Module 2 (Easy)',               questions: mathModule2EasyQuestions, section: 'Math' },
  { key: 'math-m2h',label: 'Math — Module 2 (Hard)',               questions: mathModule2HardQuestions, section: 'Math' },
] as const

function difficultyBadge(d: string) {
  if (d === 'easy')   return 'E'
  if (d === 'hard')   return 'H'
  return 'M'
}

function QuestionBlock({ q, num }: { q: SATQuestion; num: number }) {
  const isRW   = q.section === 'reading-writing'
  const isMC   = isRW || ('type' in q && (q as MathMCQuestion).type === 'multiple_choice')
  const isGrid = 'type' in q && (q as MathGridInQuestion).type === 'grid_in'
  const rw     = isRW ? (q as RWQuestion) : null
  const mc     = !isRW && isMC ? (q as MathMCQuestion) : null
  const gi     = isGrid ? (q as MathGridInQuestion) : null
  const graphData = (q as { graphData?: SATGraphData }).graphData
  const stimulus  = (q as { stimulus?: string }).stimulus
  const wrongExps = (q as { wrongAnswerExplanations?: Partial<Record<string, string>> }).wrongAnswerExplanations ?? {}
  const choices   = (q as { choices?: { label: string; text: string }[] }).choices

  return (
    <div className="mb-8 pb-6 border-b border-slate-200 last:border-0 print:mb-4 print:pb-4">
      {/* Question header */}
      <div className="flex items-start gap-2 mb-3">
        <span className="shrink-0 font-bold text-slate-500 text-[13px] w-7">Q{num}.</span>
        <div className="flex-1 text-[13px] text-slate-800 font-medium leading-snug">
          <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded mr-2 uppercase tracking-wide">
            {q.skill}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">
            {difficultyBadge(q.difficulty)}
          </span>
        </div>
      </div>

      {/* Stimulus / passage */}
      {stimulus && (
        <div className="ml-7 mb-3 text-[12px] text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-3 print:bg-white print:border-slate-300">
          <StimulusRenderer
            text={stimulus}
            underlineTargets={(q as RWQuestion).underlineTargets}
          />
        </div>
      )}

      {/* Visual */}
      {graphData && (
        <div className="ml-7 mb-3">
          <SATGraph
            data={graphData}
            className="bg-white border border-slate-200 rounded-lg p-3 print:border-slate-300"
          />
        </div>
      )}

      {/* Question stem */}
      <p className="ml-7 mb-3 text-[13px] text-slate-900 leading-relaxed">{q.question}</p>

      {/* Choices */}
      {choices && choices.length > 0 && (
        <div className="ml-7 mb-3 space-y-1">
          {choices.map((c) => {
            const isCorrect = c.label === q.correctAnswer
            return (
              <div
                key={c.label}
                className={`flex items-start gap-2 px-3 py-1.5 rounded text-[12px] ${
                  isCorrect
                    ? 'bg-green-50 border border-green-200 font-medium text-green-800 print:bg-white print:border-green-400'
                    : 'text-slate-700'
                }`}
              >
                <span className="shrink-0 font-semibold w-4">{c.label}.</span>
                <span>{c.text}</span>
                {isCorrect && (
                  <span className="ml-auto shrink-0 text-[10px] font-bold text-green-700 uppercase tracking-wide">
                    ✓ Correct
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Grid-in answer */}
      {gi && (
        <div className="ml-7 mb-3 flex items-center gap-3 text-[12px]">
          <span className="font-semibold text-slate-600">Correct answer:</span>
          <span className="font-bold text-green-700">{gi.correctAnswer}</span>
          {gi.acceptableAnswers.length > 1 && (
            <span className="text-slate-500">
              (also acceptable: {gi.acceptableAnswers.filter(a => a !== gi.correctAnswer).join(', ')})
            </span>
          )}
        </div>
      )}

      {/* Explanation */}
      <div className="ml-7 bg-green-50 border border-green-100 rounded-lg p-3 text-[12px] leading-relaxed print:bg-white print:border-green-300">
        <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">
          Correct answer: {q.correctAnswer}
        </p>
        <p className="text-slate-700">{q.explanation}</p>
      </div>

      {/* Wrong-choice explanations */}
      {choices && Object.keys(wrongExps).length > 0 && (
        <div className="ml-7 mt-2 space-y-1.5">
          {choices
            .filter((c) => c.label !== q.correctAnswer)
            .map((c) => {
              const exp = wrongExps[c.label]
              if (!exp) return null
              return (
                <div key={c.label} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-[11px] leading-relaxed">
                  <span className="font-semibold text-red-600">Choice {c.label}: </span>
                  <span className="text-slate-600">{exp}</span>
                </div>
              )
            })}
        </div>
      )}

      {/* Scoring notes (grid-in) */}
      {gi?.scoringNotes && (
        <div className="ml-7 mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-[11px] text-slate-700 print:bg-white print:border-amber-300">
          <span className="font-semibold text-amber-700">Scoring notes: </span>
          {gi.scoringNotes}
        </div>
      )}
    </div>
  )
}

function ModuleSection({
  label,
  questions,
  index,
}: {
  label: string
  questions: readonly SATQuestion[]
  index: number
}) {
  return (
    <section
      className={`${index > 0 ? 'print:break-before-page' : ''}`}
      style={index > 0 ? { pageBreakBefore: 'always' } : undefined}
    >
      {/* Module heading */}
      <div className="mb-6 pb-3 border-b-2 border-indigo-600">
        <h2 className="text-xl font-bold text-slate-900">{label}</h2>
        <p className="text-sm text-slate-500 mt-0.5">{questions.length} questions</p>
      </div>

      {/* Compact answer key table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr className="bg-slate-100 print:bg-slate-100">
              <th className="text-left px-3 py-2 font-semibold text-slate-600 border border-slate-200">#</th>
              <th className="text-left px-3 py-2 font-semibold text-slate-600 border border-slate-200">Answer</th>
              <th className="text-left px-3 py-2 font-semibold text-slate-600 border border-slate-200">Domain</th>
              <th className="text-left px-3 py-2 font-semibold text-slate-600 border border-slate-200">Skill</th>
              <th className="text-left px-3 py-2 font-semibold text-slate-600 border border-slate-200">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr key={q.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50 print:bg-white'}>
                <td className="px-3 py-1.5 border border-slate-200 font-medium">{i + 1}</td>
                <td className="px-3 py-1.5 border border-slate-200 font-bold text-green-700">{q.correctAnswer}</td>
                <td className="px-3 py-1.5 border border-slate-200 text-slate-600">{q.domain}</td>
                <td className="px-3 py-1.5 border border-slate-200 text-slate-600">{q.skill ?? '—'}</td>
                <td className="px-3 py-1.5 border border-slate-200 capitalize">{q.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full explanations */}
      <div>
        {(questions as SATQuestion[]).map((q, i) => (
          <QuestionBlock key={q.id} q={q} num={i + 1} />
        ))}
      </div>
    </section>
  )
}

export default function AnswerKeyPrint({
  attemptId,
  isAdmin,
}: {
  attemptId: string
  isAdmin: boolean
}) {
  const [ready, setReady] = useState(false)
  const [hasAttempt, setHasAttempt] = useState(false)

  useEffect(() => {
    const attempt = loadAttempt(attemptId)
    setHasAttempt(!!attempt || isAdmin)
    setReady(true)
  }, [attemptId, isAdmin])

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-sm text-slate-500">
        Loading answer key…
      </div>
    )
  }

  if (!hasAttempt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center">
        <p className="font-semibold text-slate-700">Complete SAT Form 1 to access the full answer key.</p>
        <Link
          href="/premade/sat/form-1"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Take SAT Form 1 →
        </Link>
      </div>
    )
  }

  const totalQuestions = MODULES.reduce((s, m) => s + m.questions.length, 0)
  const visualQuestions = MODULES.reduce(
    (s, m) => s + m.questions.filter(q => !!(q as { graphData?: unknown }).graphData).length,
    0,
  )

  return (
    <>
      {/* Print CSS */}
      <style>{`
        @media print {
          aside, header { display: none !important; }
          main { overflow: visible !important; }
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { margin: 1.5cm 2cm; }
        }
        @media screen {
          .answer-key-root { max-width: 800px; margin: 0 auto; }
        }
      `}</style>

      <div className="answer-key-root py-6 px-2">

        {/* Screen-only toolbar */}
        <div className="no-print flex items-center justify-between mb-6 gap-4 flex-wrap">
          <Link
            href={`/premade/sat/form-1/results/${attemptId}`}
            className="text-sm text-indigo-600 hover:underline"
          >
            ← Back to results
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save as PDF
          </button>
        </div>

        {/* Cover page */}
        <div className="mb-10 pb-6 border-b-2 border-slate-300">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            MockMate SAT Form 1
          </h1>
          <p className="text-lg font-semibold text-slate-600 mb-1">
            Full Answer Key &amp; Explanations
          </p>
          <p className="text-sm text-slate-500 mb-4">
            Reading &amp; Writing Module 1 · Module 2 Easy · Module 2 Hard ·
            Math Module 1 · Module 2 Easy · Module 2 Hard
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
            <span><strong>{totalQuestions}</strong> total questions</span>
            <span><strong>6</strong> modules</span>
            <span><strong>{visualQuestions}</strong> questions with diagrams/charts</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 leading-relaxed">
            MockMate is not affiliated with, endorsed by, or sponsored by College Board.
            SAT® is a trademark registered by College Board. All MockMate questions are
            independently created for practice purposes only.
          </div>
        </div>

        {/* Modules */}
        {MODULES.map((mod, i) => (
          <ModuleSection
            key={mod.key}
            label={mod.label}
            questions={mod.questions}
            index={i}
          />
        ))}
      </div>
    </>
  )
}
