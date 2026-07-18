'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_SKILL_DOMAIN,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
  type MathSkillSlug,
  type MathDomainSlug,
} from '@/lib/academy/math/skill-mapping'
import { ReportIssueButton } from '@/components/academy/ReportIssueButton'
import { loadMathCapstone } from '@/lib/academy/math/capstones'
import type { MathCapstoneInfo, MathCapstoneQuestion } from '@/lib/academy/math/capstones'

// ── Timer ─────────────────────────────────────────────────────────────────────

function useTimer(initialSeconds: number, running: boolean) {
  const [seconds, setSeconds] = useState(initialSeconds)
  useEffect(() => {
    if (!running) return
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [running, seconds])
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const display = `${mins}:${secs.toString().padStart(2, '0')}`
  const urgent = seconds <= 120
  return { seconds, display, urgent }
}

type Phase = 'intro' | 'module1' | 'module1-review' | 'module2' | 'module2-review' | 'results'

interface ModuleState {
  answers: Record<number, string>
  markedForReview: Set<number>
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function IntroScreen({ capstone, onStart }: { capstone: MathCapstoneInfo; onStart: () => void }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{capstone.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{capstone.description}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          {[
            { label: '44 questions', sub: '2 modules of 22' },
            { label: '70 minutes', sub: '35 min per module' },
            { label: '21 skills', sub: 'all 4 domains' },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <p className="font-bold text-slate-900 text-sm">{label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-1.5 text-[13px] text-slate-600">
          {[
            'Skill labels are hidden until you answer each question.',
            'You may mark questions for review and revisit them before submitting.',
            'The timer counts down — submit before time runs out.',
            'Explanations appear after each module, not during.',
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-800">
          This is a MockMate Academy assessment. It does not produce an official SAT score and is not affiliated with College Board.
        </div>
        <button
          onClick={onStart}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition-colors"
        >
          Begin Module 1 →
        </button>
      </div>
    </div>
  )
}

// ── Module exam ───────────────────────────────────────────────────────────────

interface ModuleExamProps {
  questions: MathCapstoneQuestion[]
  moduleNum: 1 | 2
  state: ModuleState
  onChange: (qNum: number, answer: string) => void
  onToggleMark: (qNum: number) => void
  onSubmit: () => void
  capstoneId: string
}

function ModuleExam({ questions, moduleNum, state, onChange, onToggleMark, onSubmit, capstoneId }: ModuleExamProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { display, urgent } = useTimer(35 * 60, true)
  const current = questions[currentIndex]
  const selected = state.answers[current.questionNumber]

  return (
    <div className="max-w-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="text-sm font-semibold text-slate-700">Module {moduleNum}</span>
        <span className={cn(
          'font-mono text-sm font-semibold',
          urgent ? 'text-red-600' : 'text-slate-600',
        )}>
          {display}
        </span>
        <span className="text-[12px] text-slate-500">
          {Object.keys(state.answers).length}/{questions.length} answered
        </span>
      </div>

      {/* Question navigator */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-3">
        {questions.map((q, i) => {
          const ans = state.answers[q.questionNumber]
          const marked = state.markedForReview.has(q.questionNumber)
          const isCurrent = i === currentIndex
          return (
            <button
              key={q.questionNumber}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'h-7 w-7 rounded text-[11px] font-semibold border transition-colors',
                isCurrent ? 'bg-indigo-600 border-indigo-600 text-white' :
                  marked ? 'bg-amber-100 border-amber-400 text-amber-700' :
                    ans ? 'bg-emerald-100 border-emerald-400 text-emerald-700' :
                      'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100',
              )}
            >
              {q.questionNumber}
            </button>
          )
        })}
      </div>

      {/* Question */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Question {current.questionNumber} of {questions.length}
          </span>
          <button
            onClick={() => onToggleMark(current.questionNumber)}
            className={cn(
              'text-[11px] font-medium rounded px-2 py-1 border transition-colors',
              state.markedForReview.has(current.questionNumber)
                ? 'border-amber-400 bg-amber-50 text-amber-700'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50',
            )}
          >
            {state.markedForReview.has(current.questionNumber) ? '★ Marked' : '☆ Mark'}
          </button>
        </div>

        {current.stimulus && (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {current.stimulus}
          </div>
        )}

        <p className="text-sm font-medium text-slate-900">{current.question}</p>

        <div className="space-y-2">
          {current.choices.map(choice => (
            <button
              key={choice.label}
              onClick={() => onChange(current.questionNumber, choice.label)}
              className={cn(
                'w-full flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors',
                selected === choice.label
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
              )}
            >
              <span className="shrink-0 font-semibold">{choice.label}.</span>
              <span>{choice.text}</span>
            </button>
          ))}
        </div>

        <ReportIssueButton
          contentType="capstone"
          contentId={current.id}
          contentVersion={current.contentVersion ?? 1}
          route={`/sat-math-academy/capstones/${capstoneId}`}
          className="mt-2"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium px-4 py-2 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(i => i + 1)}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Submit Module {moduleNum} →
          </button>
        )}
      </div>
    </div>
  )
}

// ── Module review ─────────────────────────────────────────────────────────────

interface ModuleReviewProps {
  questions: MathCapstoneQuestion[]
  moduleNum: 1 | 2
  answers: Record<number, string>
  onNext: () => void
  isLastModule: boolean
}

function ModuleReview({ questions, moduleNum, answers, onNext, isLastModule }: ModuleReviewProps) {
  const correct = questions.filter(q => answers[q.questionNumber] === q.correctAnswer).length

  return (
    <div className="max-w-2xl space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900 text-base mb-1">Module {moduleNum} Results</h2>
        <p className="text-sm text-slate-500">
          {correct}/{questions.length} correct · {Math.round((correct / questions.length) * 100)}% accuracy
        </p>
      </div>

      <div className="space-y-3">
        {questions.map(q => {
          const sel = answers[q.questionNumber] as string | undefined
          const isCorrect = sel === q.correctAnswer
          const domain = MATH_SKILL_DOMAIN[q.skillSlug as MathSkillSlug]
          return (
            <div key={q.id} className={cn(
              'rounded-xl border p-4 space-y-3',
              isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-red-200 bg-red-50/40',
            )}>
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">
                  Q{q.questionNumber} · {MATH_SKILL_DISPLAY_NAMES[q.skillSlug as MathSkillSlug] ?? q.skillSlug} · {q.difficulty}
                </span>
                <span className={cn('text-[11px] font-bold', isCorrect ? 'text-emerald-700' : 'text-red-600')}>
                  {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>

              {q.stimulus && (
                <div className="rounded-lg bg-white border border-slate-200 p-3 text-[13px] text-slate-700 leading-relaxed whitespace-pre-line">
                  {q.stimulus}
                </div>
              )}

              <p className="text-[13px] font-medium text-slate-900">{q.question}</p>

              <div className="space-y-1.5">
                {q.choices.map(c => {
                  const isRight = c.label === q.correctAnswer
                  const isSelected = c.label === sel
                  return (
                    <div key={c.label} className={cn(
                      'flex items-start gap-2 rounded-lg border px-3 py-2 text-[12px]',
                      isRight ? 'border-emerald-400 bg-emerald-50 text-emerald-800 font-medium' :
                        isSelected ? 'border-red-300 bg-red-50 text-red-700' :
                          'border-slate-200 bg-white text-slate-500',
                    )}>
                      <span className="font-semibold shrink-0">{c.label}.</span>
                      <span>{c.text}</span>
                      {isRight && <span className="ml-auto text-emerald-600 font-bold shrink-0">✓</span>}
                    </div>
                  )
                })}
              </div>

              <div className="rounded-lg bg-white border border-slate-200 p-3 text-[12px] text-slate-700">
                <p className="font-semibold text-slate-800 mb-1">Explanation</p>
                <p className="leading-relaxed">{q.explanation}</p>
                {sel && sel !== q.correctAnswer && q.wrongAnswerExplanations[sel as 'A' | 'B' | 'C' | 'D'] && (
                  <p className="mt-1.5 text-slate-500">
                    <span className="font-medium">Why {sel} is wrong: </span>
                    {q.wrongAnswerExplanations[sel as 'A' | 'B' | 'C' | 'D']}
                  </p>
                )}
                <p className="mt-2 text-[11px] text-indigo-700 font-medium">{q.teachingPoint}</p>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={`/sat-math-academy/lesson/${q.skillSlug}`}
                  className="text-[11px] text-indigo-600 hover:underline"
                >
                  Review {domain ? MATH_DOMAIN_DISPLAY[domain] : ''} Lesson →
                </a>
                <ReportIssueButton
                  contentType="capstone"
                  contentId={q.id}
                  contentVersion={q.contentVersion ?? 1}
                />
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onNext}
        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition-colors"
      >
        {isLastModule ? 'View Final Results →' : 'Continue to Module 2 →'}
      </button>
    </div>
  )
}

// ── Final results ─────────────────────────────────────────────────────────────

interface ResultsProps {
  capstone: MathCapstoneInfo
  m1Answers: Record<number, string>
  m2Answers: Record<number, string>
}

function ResultsScreen({ capstone, m1Answers, m2Answers }: ResultsProps) {
  const allQuestions = [...capstone.module1Questions, ...capstone.module2Questions]
  const allAnswers = { ...m1Answers, ...m2Answers }
  const correct = allQuestions.filter(q => allAnswers[q.questionNumber] === q.correctAnswer).length
  const total = allQuestions.length
  const pct = Math.round((correct / total) * 100)

  // Per-skill breakdown
  const bySkill: Record<string, { title: string; domain: string; domainDisplay: string; correct: number; total: number }> = {}
  for (const q of allQuestions) {
    if (!bySkill[q.skillSlug]) {
      const domain = MATH_SKILL_DOMAIN[q.skillSlug as MathSkillSlug]
      bySkill[q.skillSlug] = {
        title: MATH_SKILL_DISPLAY_NAMES[q.skillSlug as MathSkillSlug] ?? q.skillSlug,
        domain: domain ?? '',
        domainDisplay: domain ? MATH_DOMAIN_DISPLAY[domain] : '',
        correct: 0,
        total: 0,
      }
    }
    bySkill[q.skillSlug].total++
    if (allAnswers[q.questionNumber] === q.correctAnswer) bySkill[q.skillSlug].correct++
  }

  // Per-domain breakdown
  const byDomain: Record<string, { display: string; badgeClass: string; correct: number; total: number }> = {}
  for (const [, data] of Object.entries(bySkill)) {
    if (!data.domain) continue
    if (!byDomain[data.domain]) {
      byDomain[data.domain] = {
        display: data.domainDisplay,
        badgeClass: MATH_DOMAIN_BADGE_CLASS[data.domain as MathDomainSlug] ?? '',
        correct: 0,
        total: 0,
      }
    }
    byDomain[data.domain].correct += data.correct
    byDomain[data.domain].total += data.total
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{capstone.title} — Your Academy Results</h2>
        <p className="mt-1 text-sm text-slate-500">MockMate Academy accuracy · not an official SAT score</p>
      </div>

      <div className={cn(
        'rounded-xl border p-5 text-center',
        pct >= 85 ? 'border-emerald-300 bg-emerald-50' : pct >= 70 ? 'border-indigo-200 bg-indigo-50' : 'border-amber-200 bg-amber-50',
      )}>
        <p className={cn('text-5xl font-bold mb-1', pct >= 85 ? 'text-emerald-700' : pct >= 70 ? 'text-indigo-700' : 'text-amber-700')}>
          {pct}%
        </p>
        <p className="text-sm text-slate-600">{correct} of {total} correct across both modules</p>
      </div>

      {/* Domain breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="font-semibold text-slate-800 text-sm">Results by Domain</p>
        <div className="space-y-2">
          {Object.entries(byDomain).map(([domainSlug, data]) => {
            const p = Math.round((data.correct / data.total) * 100)
            return (
              <div key={domainSlug} className="flex items-center gap-3">
                <span className={cn('text-[11px] font-semibold border rounded-full px-2 py-0.5 shrink-0', data.badgeClass)}>
                  {data.display}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', p >= 80 ? 'bg-emerald-500' : p >= 60 ? 'bg-indigo-500' : 'bg-amber-500')}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 w-12 text-right shrink-0">{data.correct}/{data.total}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Skill breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="font-semibold text-slate-800 text-sm">Results by Skill</p>
        <div className="space-y-2">
          {Object.entries(bySkill).map(([slug, data]) => {
            const p = Math.round((data.correct / data.total) * 100)
            return (
              <div key={slug} className="flex items-center gap-3">
                <a href={`/sat-math-academy/lesson/${slug}`} className="text-[12px] text-indigo-700 hover:underline w-48 shrink-0 truncate">
                  {data.title}
                </a>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', p >= 80 ? 'bg-emerald-500' : p >= 60 ? 'bg-indigo-500' : 'bg-amber-500')}
                    style={{ width: `${p}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 w-10 text-right shrink-0">{data.correct}/{data.total}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <a
          href="/sat-math-academy/capstones"
          className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold py-3 text-center text-sm hover:bg-slate-50 transition-colors"
        >
          All Capstones
        </a>
        <a
          href="/sat-math-academy/mastery-check"
          className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 text-center text-sm transition-colors"
        >
          Take Mastery Check →
        </a>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function MathCapstoneTestPage() {
  const { id } = useParams<{ id: string }>()
  const [capstone, setCapstone] = useState<MathCapstoneInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState<Phase>('intro')
  const [m1State, setM1State] = useState<ModuleState>({ answers: {}, markedForReview: new Set() })
  const [m2State, setM2State] = useState<ModuleState>({ answers: {}, markedForReview: new Set() })

  useEffect(() => {
    loadMathCapstone(id).then(c => {
      setCapstone(c)
      setLoading(false)
    })
  }, [id])

  function handleM1Answer(qNum: number, answer: string) {
    setM1State(prev => ({ ...prev, answers: { ...prev.answers, [qNum]: answer } }))
  }
  function handleM1Mark(qNum: number) {
    setM1State(prev => {
      const next = new Set(prev.markedForReview)
      next.has(qNum) ? next.delete(qNum) : next.add(qNum)
      return { ...prev, markedForReview: next }
    })
  }
  function handleM2Answer(qNum: number, answer: string) {
    setM2State(prev => ({ ...prev, answers: { ...prev.answers, [qNum]: answer } }))
  }
  function handleM2Mark(qNum: number) {
    setM2State(prev => {
      const next = new Set(prev.markedForReview)
      next.has(qNum) ? next.delete(qNum) : next.add(qNum)
      return { ...prev, markedForReview: next }
    })
  }

  async function saveAttempts(questions: MathCapstoneQuestion[], answers: Record<number, string>, capstoneId: string, moduleNum: number) {
    for (const q of questions) {
      const sel = answers[q.questionNumber]
      if (!sel) continue
      await fetch('/api/academy/math-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          difficulty: q.difficulty,
          selectedAnswer: sel,
          correctAnswer: q.correctAnswer,
          isCorrect: sel === q.correctAnswer,
          sourceType: 'capstone',
          sourceId: `${capstoneId}-m${moduleNum}`,
          practiceMode: 'capstone',
          timed: true,
        }),
      }).catch(() => null)
    }
  }

  function submitM1() {
    if (capstone) void saveAttempts(capstone.module1Questions, m1State.answers, id, 1)
    setPhase('module1-review')
  }
  function submitM2() {
    if (capstone) void saveAttempts(capstone.module2Questions, m2State.answers, id, 2)
    setPhase('module2-review')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-slate-500">Loading capstone…</div>
      </div>
    )
  }

  if (!capstone) {
    return (
      <div className="max-w-xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-semibold text-red-700">Capstone not found.</p>
          <a href="/sat-math-academy/capstones" className="mt-2 text-sm text-indigo-600 hover:underline block">
            ← Back to Capstones
          </a>
        </div>
      </div>
    )
  }

  if (capstone.module1Questions.length === 0) {
    return (
      <div className="max-w-xl">
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{capstone.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{capstone.description}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-800 text-sm">Content In Development</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              This capstone is currently being prepared. Check back soon — it will appear here once ready.
            </p>
          </div>
          <a href="/sat-math-academy/capstones" className="block text-sm text-indigo-600 hover:underline">
            ← Back to Capstones
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      {phase === 'intro' && <IntroScreen capstone={capstone} onStart={() => setPhase('module1')} />}

      {phase === 'module1' && (
        <ModuleExam
          questions={capstone.module1Questions}
          moduleNum={1}
          state={m1State}
          onChange={handleM1Answer}
          onToggleMark={handleM1Mark}
          onSubmit={submitM1}
          capstoneId={id}
        />
      )}

      {phase === 'module1-review' && (
        <ModuleReview
          questions={capstone.module1Questions}
          moduleNum={1}
          answers={m1State.answers}
          onNext={() => setPhase('module2')}
          isLastModule={false}
        />
      )}

      {phase === 'module2' && (
        <ModuleExam
          questions={capstone.module2Questions}
          moduleNum={2}
          state={m2State}
          onChange={handleM2Answer}
          onToggleMark={handleM2Mark}
          onSubmit={submitM2}
          capstoneId={id}
        />
      )}

      {phase === 'module2-review' && (
        <ModuleReview
          questions={capstone.module2Questions}
          moduleNum={2}
          answers={m2State.answers}
          onNext={() => setPhase('results')}
          isLastModule={true}
        />
      )}

      {phase === 'results' && (
        <ResultsScreen capstone={capstone} m1Answers={m1State.answers} m2Answers={m2State.answers} />
      )}
    </div>
  )
}
