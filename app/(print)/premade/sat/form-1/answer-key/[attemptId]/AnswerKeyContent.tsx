'use client'

import { useEffect, useState } from 'react'
import { SATGraph } from '@/components/exam/SATGraph'
import { StimulusRenderer } from '@/components/exam/StimulusRenderer'
import { rwModule1Questions }       from '@/lib/premade-exams/sat/rw-module-1'
import { rwModule2EasyQuestions }   from '@/lib/premade-exams/sat/rw-module-2-easy'
import { rwModule2HardQuestions }   from '@/lib/premade-exams/sat/rw-module-2-hard'
import { mathModule1Questions }     from '@/lib/premade-exams/sat/math-module-1'
import { mathModule2EasyQuestions } from '@/lib/premade-exams/sat/math-module-2-easy'
import { mathModule2HardQuestions } from '@/lib/premade-exams/sat/math-module-2-hard'
import { loadAttempt }              from '@/lib/premade-exams/sat/attempt-store'
import type {
  SATQuestion,
  RWQuestion,
  MathMCQuestion,
  MathGridInQuestion,
  SATGraphData,
} from '@/lib/premade-exams/sat/types'

// ── Module data ───────────────────────────────────────────────────────────────

const MODULES = [
  {
    key: 'rw-m1',
    label: 'Reading & Writing — Module 1',
    questions: rwModule1Questions as SATQuestion[],
  },
  {
    key: 'rw-m2e',
    label: 'Reading & Writing — Module 2 (Easy)',
    questions: rwModule2EasyQuestions as SATQuestion[],
  },
  {
    key: 'rw-m2h',
    label: 'Reading & Writing — Module 2 (Hard)',
    questions: rwModule2HardQuestions as SATQuestion[],
  },
  {
    key: 'math-m1',
    label: 'Math — Module 1',
    questions: mathModule1Questions as SATQuestion[],
  },
  {
    key: 'math-m2e',
    label: 'Math — Module 2 (Easy)',
    questions: mathModule2EasyQuestions as SATQuestion[],
  },
  {
    key: 'math-m2h',
    label: 'Math — Module 2 (Hard)',
    questions: mathModule2HardQuestions as SATQuestion[],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function QuestionBlock({ q, num }: { q: SATQuestion; num: number }) {
  const isGrid   = 'type' in q && (q as MathGridInQuestion).type === 'grid_in'
  const gi       = isGrid ? (q as MathGridInQuestion) : null
  const graphData = (q as { graphData?: SATGraphData }).graphData
  const stimulus  = (q as { stimulus?: string }).stimulus
  const wrongExps = (q as { wrongAnswerExplanations?: Partial<Record<string, string>> }).wrongAnswerExplanations ?? {}
  const choices   = (q as { choices?: { label: string; text: string }[] }).choices

  return (
    <div className="question-card">
      {/* Question number + metadata */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: '#64748b', fontSize: 13, minWidth: 28 }}>
          Q{num}.
        </span>
        <div>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#4f46e5',
            background: '#eef2ff', padding: '2px 6px', borderRadius: 4,
            marginRight: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {q.skill}
          </span>
          <span style={{
            fontSize: 10, color: '#94a3b8', textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {q.domain} · {q.difficulty}
          </span>
        </div>
      </div>

      {/* Stimulus */}
      {stimulus && (
        <div style={{
          marginLeft: 28, marginBottom: 8, padding: '8px 12px',
          background: '#f8fafc', border: '1px solid #e2e8f0',
          borderRadius: 6, fontSize: 12, lineHeight: 1.6, color: '#475569',
        }}>
          <StimulusRenderer
            text={stimulus}
            underlineTargets={(q as RWQuestion).underlineTargets}
          />
        </div>
      )}

      {/* Visual / graph */}
      {graphData && (
        <div style={{ marginLeft: 28, marginBottom: 8 }}>
          <SATGraph
            data={graphData}
            className="bg-white border border-slate-200 rounded-lg p-3"
          />
        </div>
      )}

      {/* Question stem */}
      <p style={{ marginLeft: 28, marginBottom: 8, fontSize: 13, lineHeight: 1.6, color: '#1e293b' }}>
        {q.question}
      </p>

      {/* Multiple choice options */}
      {choices && (
        <div style={{ marginLeft: 28, marginBottom: 8 }}>
          {choices.map((c) => {
            const isCorrect = c.label === q.correctAnswer
            return (
              <div
                key={c.label}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 6,
                  padding: '4px 8px', borderRadius: 4, marginBottom: 3, fontSize: 12,
                  background: isCorrect ? '#f0fdf4' : 'transparent',
                  border: isCorrect ? '1px solid #86efac' : '1px solid transparent',
                  color: isCorrect ? '#166534' : '#475569',
                  fontWeight: isCorrect ? 600 : 400,
                }}
              >
                <span style={{ minWidth: 16, fontWeight: 700 }}>{c.label}.</span>
                <span style={{ flex: 1 }}>{c.text}</span>
                {isCorrect && (
                  <span style={{ fontSize: 10, color: '#15803d', fontWeight: 700, textTransform: 'uppercase' }}>
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
        <div style={{ marginLeft: 28, marginBottom: 8, fontSize: 12, display: 'flex', gap: 16 }}>
          <span>
            <strong>Correct answer:</strong>{' '}
            <span style={{ color: '#15803d', fontWeight: 700 }}>{gi.correctAnswer}</span>
          </span>
          {gi.acceptableAnswers.length > 1 && (
            <span style={{ color: '#64748b' }}>
              (also acceptable: {gi.acceptableAnswers.filter(a => a !== gi.correctAnswer).join(', ')})
            </span>
          )}
        </div>
      )}

      {/* Explanation */}
      <div style={{
        marginLeft: 28, padding: '8px 12px',
        background: '#f0fdf4', border: '1px solid #bbf7d0',
        borderRadius: 6, marginBottom: 6,
      }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Correct answer: {q.correctAnswer}
        </p>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: '#334155' }}>{q.explanation}</p>
      </div>

      {/* Wrong-choice explanations */}
      {choices && Object.keys(wrongExps).some(k => wrongExps[k]) && (
        <div style={{ marginLeft: 28 }}>
          {choices
            .filter(c => c.label !== q.correctAnswer && wrongExps[c.label])
            .map(c => (
              <div
                key={c.label}
                style={{
                  padding: '5px 10px', borderRadius: 4, marginBottom: 3,
                  border: '1px solid #e2e8f0', fontSize: 11, lineHeight: 1.5,
                }}
              >
                <span style={{ fontWeight: 600, color: '#dc2626' }}>Choice {c.label}: </span>
                <span style={{ color: '#475569' }}>{wrongExps[c.label]}</span>
              </div>
            ))}
        </div>
      )}

      {/* Scoring notes */}
      {gi?.scoringNotes && (
        <div style={{
          marginLeft: 28, marginTop: 4, padding: '6px 10px',
          background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 4, fontSize: 11,
        }}>
          <strong>Scoring notes: </strong>{gi.scoringNotes}
        </div>
      )}
    </div>
  )
}

function ModuleSection({
  label,
  questions,
  isFirst,
}: {
  label: string
  questions: SATQuestion[]
  isFirst: boolean
}) {
  return (
    <section
      className={isFirst ? '' : 'module-section'}
      style={isFirst ? undefined : { pageBreakBefore: 'always' }}
    >
      {/* Module heading */}
      <div style={{
        paddingBottom: 10, borderBottom: '2px solid #4f46e5',
        marginBottom: 20,
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>{label}</h2>
        <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>{questions.length} questions</p>
      </div>

      {/* Compact answer key table */}
      <table style={{
        width: '100%', borderCollapse: 'collapse', fontSize: 11,
        marginBottom: 24,
      }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            {['#', 'Answer', 'Domain', 'Skill', 'Difficulty'].map(h => (
              <th key={h} style={{
                textAlign: 'left', padding: '6px 8px', fontWeight: 600,
                color: '#475569', border: '1px solid #e2e8f0',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((q, i) => (
            <tr key={q.id} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
              <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', fontWeight: 500 }}>{i + 1}</td>
              <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#15803d' }}>{q.correctAnswer}</td>
              <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', color: '#475569' }}>{q.domain}</td>
              <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', color: '#475569' }}>{q.skill}</td>
              <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', textTransform: 'capitalize' }}>{q.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Full question explanations */}
      {questions.map((q, i) => (
        <QuestionBlock key={q.id} q={q} num={i + 1} />
      ))}
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AnswerKeyContent({
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
    const ok = !!attempt || isAdmin
    setHasAttempt(ok)
    setReady(true)
  }, [attemptId, isAdmin])

  // Auto-trigger print once content is confirmed to be available.
  // 900ms delay lets SATGraph SVGs finish rendering before the print dialog opens.
  useEffect(() => {
    if (!ready || !hasAttempt) return
    const t = setTimeout(() => window.print(), 900)
    return () => clearTimeout(t)
  }, [ready, hasAttempt])

  const totalQuestions = MODULES.reduce((s, m) => s + m.questions.length, 0)
  const visualQuestions = MODULES.reduce(
    (s, m) => s + m.questions.filter(q => !!(q as { graphData?: unknown }).graphData).length,
    0,
  )

  if (!ready) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#94a3b8',
      }}>
        Loading answer key…
      </div>
    )
  }

  if (!hasAttempt) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', gap: 16,
        fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: 24,
      }}>
        <p style={{ fontWeight: 600, color: '#334155', fontSize: 16 }}>
          Complete SAT Form 1 to access the full answer key.
        </p>
        <a href="/premade/sat/form-1" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>
          Take SAT Form 1 →
        </a>
      </div>
    )
  }

  return (
    <>
      {/* ── Global print CSS ─────────────────────────────────────────────────── */}
      <style>{`
        /* Screen: constrain to readable width */
        @media screen {
          .answer-key-page {
            max-width: 820px;
            margin: 0 auto;
            padding: 32px 24px;
            font-family: system-ui, -apple-system, sans-serif;
          }
        }

        /* Print: make sure full document renders across all pages */
        @media print {
          html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0;
            padding: 0;
          }

          /* Page margins */
          @page { margin: 1.5cm 2cm; }

          .no-print { display: none !important; }

          /* Keep each question card together where possible */
          .question-card {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e8f0;
          }

          /* Each module section starts on a fresh page (except the first) */
          .module-section {
            break-before: page;
            page-break-before: always;
          }

          /* Remove screen-only wrapper styles */
          .answer-key-page {
            max-width: 100% !important;
            padding: 0 !important;
          }
        }

        /* Shared: always */
        .question-card {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }
        .question-card:last-child {
          border-bottom: none;
        }
      `}</style>

      <div className="answer-key-page">
        {/* ── No-print toolbar (screen only) ─────────────────────────────── */}
        <div className="no-print" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 24, padding: '10px 14px', background: '#f8fafc',
          border: '1px solid #e2e8f0', borderRadius: 8,
        }}>
          <a
            href={`/premade/sat/form-1/results/${attemptId}`}
            style={{ fontSize: 13, color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}
          >
            ← Back to results
          </a>
          <button
            onClick={() => window.print()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#1e293b', color: '#fff', border: 'none',
              padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save as PDF
          </button>
        </div>

        {/* ── Cover / header ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '2px solid #cbd5e1' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
            MockMate SAT Form 1
          </h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#475569', margin: '0 0 4px' }}>
            Full Answer Key &amp; Explanations
          </p>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 16px' }}>
            Reading &amp; Writing: Module 1 · Module 2 Easy · Module 2 Hard ·
            Math: Module 1 · Module 2 Easy · Module 2 Hard
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: '#475569', marginBottom: 16 }}>
            <span><strong>{totalQuestions}</strong> questions</span>
            <span><strong>6</strong> modules</span>
            <span><strong>{visualQuestions}</strong> questions with visuals</span>
          </div>
          <div style={{
            padding: '10px 14px', background: '#fffbeb', border: '1px solid #fde68a',
            borderRadius: 6, fontSize: 11, color: '#92400e', lineHeight: 1.5,
          }}>
            MockMate is not affiliated with, endorsed by, or sponsored by College Board.
            SAT® is a trademark registered by College Board.
            All MockMate questions are independently created for practice purposes only.
          </div>
        </div>

        {/* ── Module sections ─────────────────────────────────────────────── */}
        {MODULES.map((mod, i) => (
          <ModuleSection
            key={mod.key}
            label={mod.label}
            questions={mod.questions}
            isFirst={i === 0}
          />
        ))}
      </div>
    </>
  )
}
