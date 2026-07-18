'use client'

import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { allMathSkills } from '@/lib/academy/math'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_SKILL_DOMAIN,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
  type MathSkillSlug,
  type MathDomainSlug,
} from '@/lib/academy/math/skill-mapping'
import { ReportIssueButton } from '@/components/academy/ReportIssueButton'
import type { DrillQuestion, AnswerLabel } from '@/lib/academy/types'

// ── Build question set ────────────────────────────────────────────────────────
// 1 question per skill × 21 skills = 21 questions.
// Uses drill question at index 3 (second medium), separate from the diagnostic
// which uses a standalone question bank.

function buildMasteryCheckQuestions(): DrillQuestion[] {
  const questions: DrillQuestion[] = []
  for (const skill of allMathSkills) {
    const q = skill.drillQuestions[3]
    if (q) questions.push(q)
  }
  return questions
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'quiz' | 'results'

interface SkillResult {
  slug: string
  title: string
  domain: MathDomainSlug | ''
  correct: number
  total: number
  pct: number
}

interface PriorAccuracy {
  skillSlug: string
  recentAccuracy: number
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function IntroScreen({ total, onStart }: { total: number; onStart: () => void }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Math Academy Mastery Check</h1>
        <p className="mt-1 text-sm text-slate-500">
          An end-of-course assessment covering all 21 math skills. Results show how your accuracy compares to your prior practice.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: `${total} questions`, sub: '1 per skill' },
            { label: '21 skills', sub: '4 domains' },
            { label: 'Untimed', sub: 'go at your pace' },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
              <p className="text-base font-bold text-slate-900">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <ul className="space-y-2 text-sm text-slate-600">
          {[
            'Uses different questions from your initial diagnostic.',
            'Results show how your skill accuracy has changed.',
            'Skill labels are hidden until you answer.',
          ].map(t => (
            <li key={t} className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold mt-0.5 shrink-0">✓</span>
              {t}
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-800">
          This assessment measures your Academy progress — not an official SAT score. Results reflect skill accuracy changes, not guaranteed score improvements.
        </div>

        <button
          onClick={onStart}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition-colors"
        >
          Begin Mastery Check →
        </button>
      </div>
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

interface QuizProps {
  questions: DrillQuestion[]
  onComplete: (answers: Record<string, AnswerLabel>) => void
}

function QuizScreen({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerLabel>>({})
  const [revealed, setRevealed] = useState(false)

  const current = questions[currentIndex]
  const selected = answers[current.id] as AnswerLabel | undefined

  function handleSelect(label: AnswerLabel) {
    if (selected) return
    setAnswers(prev => ({ ...prev, [current.id]: label }))
    setRevealed(true)
  }

  function handleNext() {
    setRevealed(false)
    if (currentIndex + 1 >= questions.length) {
      onComplete(answers)
    } else {
      setCurrentIndex(i => i + 1)
    }
  }

  const isCorrect = selected === current.correctAnswer

  return (
    <div className="max-w-2xl space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 font-medium">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Mastery Check</span>
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        {current.stimulus && (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {current.stimulus}
          </div>
        )}

        <p className="text-sm font-medium text-slate-900">{current.question}</p>

        <div className="space-y-2">
          {current.choices.map(choice => {
            const isSelected = selected === choice.label
            const isRight = choice.label === current.correctAnswer
            let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
            if (revealed) {
              if (isRight) cls = 'border-emerald-500 bg-emerald-50 text-emerald-800'
              else if (isSelected) cls = 'border-red-400 bg-red-50 text-red-700'
              else cls = 'border-slate-200 bg-white text-slate-400'
            } else if (isSelected) {
              cls = 'border-indigo-400 bg-indigo-50 text-indigo-800'
            }
            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label)}
                disabled={!!selected}
                className={cn(
                  'w-full flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors disabled:cursor-default',
                  cls,
                )}
              >
                <span className="shrink-0 font-semibold">{choice.label}.</span>
                <span>{choice.text}</span>
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className={cn(
            'rounded-lg border p-3 text-sm',
            isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50',
          )}>
            <p className={cn('font-semibold mb-1', isCorrect ? 'text-emerald-800' : 'text-red-800')}>
              {isCorrect ? 'Correct' : `Incorrect — correct answer: ${current.correctAnswer}`}
            </p>
            <p className={cn('text-[13px] leading-relaxed', isCorrect ? 'text-emerald-700' : 'text-red-700')}>
              {current.explanation}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Skill: {MATH_SKILL_DISPLAY_NAMES[current.skillSlug as MathSkillSlug] ?? current.skillSlug}
            </p>
          </div>
        )}

        {revealed && (
          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 transition-colors"
          >
            {currentIndex + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </div>

      <ReportIssueButton
        contentType="mastery_check"
        contentId={current.id}
        contentVersion={current.contentVersion ?? 1}
      />
    </div>
  )
}

// ── Results ───────────────────────────────────────────────────────────────────

interface ResultsProps {
  questions: DrillQuestion[]
  answers: Record<string, AnswerLabel>
  priorAccuracy: PriorAccuracy[]
}

function ResultsScreen({ questions, answers, priorAccuracy }: ResultsProps) {
  const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length
  const total = questions.length
  const pct = Math.round((correct / total) * 100)

  const bySkill: Record<string, SkillResult> = {}
  for (const q of questions) {
    if (!bySkill[q.skillSlug]) {
      const domain = MATH_SKILL_DOMAIN[q.skillSlug as MathSkillSlug]
      bySkill[q.skillSlug] = {
        slug: q.skillSlug,
        title: MATH_SKILL_DISPLAY_NAMES[q.skillSlug as MathSkillSlug] ?? q.skillSlug,
        domain: domain ?? '',
        correct: 0,
        total: 0,
        pct: 0,
      }
    }
    bySkill[q.skillSlug].total++
    if (answers[q.id] === q.correctAnswer) bySkill[q.skillSlug].correct++
  }
  for (const r of Object.values(bySkill)) {
    r.pct = Math.round((r.correct / r.total) * 100)
  }

  const priorMap: Record<string, number> = {}
  for (const p of priorAccuracy) priorMap[p.skillSlug] = p.recentAccuracy

  // Group by domain for the domain summary
  const byDomain: Record<string, { display: string; badgeClass: string; correct: number; total: number }> = {}
  for (const r of Object.values(bySkill)) {
    if (!r.domain) continue
    if (!byDomain[r.domain]) {
      byDomain[r.domain] = {
        display: MATH_DOMAIN_DISPLAY[r.domain as MathDomainSlug],
        badgeClass: MATH_DOMAIN_BADGE_CLASS[r.domain as MathDomainSlug] ?? '',
        correct: 0,
        total: 0,
      }
    }
    byDomain[r.domain].correct += r.correct
    byDomain[r.domain].total += r.total
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Your Math Academy Progress</h2>
        <p className="mt-1 text-sm text-slate-500">
          Mastery Check accuracy compared to your prior practice. This reflects your Academy performance — not an official SAT score.
        </p>
      </div>

      {/* Overall score */}
      <div className={cn(
        'rounded-xl border p-5 text-center',
        pct >= 85 ? 'border-emerald-300 bg-emerald-50' : pct >= 70 ? 'border-indigo-200 bg-indigo-50' : 'border-amber-200 bg-amber-50',
      )}>
        <p className={cn('text-4xl font-bold', pct >= 85 ? 'text-emerald-700' : pct >= 70 ? 'text-indigo-700' : 'text-amber-700')}>
          {pct}%
        </p>
        <p className="text-sm text-slate-600 mt-1">{correct} of {total} correct on Mastery Check</p>
      </div>

      {/* Domain summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="font-semibold text-slate-800 text-sm">Results by Domain</p>
        <div className="space-y-2">
          {Object.entries(byDomain).map(([domainSlug, data]) => {
            const p = Math.round((data.correct / data.total) * 100)
            return (
              <div key={domainSlug} className="flex items-center gap-3">
                <span className={cn('text-[11px] font-semibold border rounded-full px-2 py-0.5 shrink-0 whitespace-nowrap', data.badgeClass)}>
                  {data.display}
                </span>
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

      {/* Skill comparison */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="font-semibold text-slate-800 text-sm">Skill Comparison: Prior Practice → Mastery Check</p>
        <div className="space-y-2.5">
          {Object.values(bySkill).map(r => {
            const prior = priorMap[r.slug]
            const change = prior != null ? r.pct - prior : null
            return (
              <div key={r.slug} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`/sat-math-academy/lesson/${r.slug}`}
                    className="text-[12px] text-indigo-700 hover:underline truncate max-w-[180px]"
                  >
                    {r.title}
                  </a>
                  <div className="flex items-center gap-2 text-[11px] shrink-0">
                    {prior != null && (
                      <span className="text-slate-400">{prior}%</span>
                    )}
                    {change != null && (
                      <span className={cn(
                        'font-semibold',
                        change > 0 ? 'text-emerald-600' : change < 0 ? 'text-red-500' : 'text-slate-400',
                      )}>
                        {change > 0 ? `+${change}` : change}%
                      </span>
                    )}
                    <span className={cn(
                      'font-medium',
                      r.pct >= 80 ? 'text-emerald-600' : r.pct >= 60 ? 'text-indigo-600' : 'text-amber-600',
                    )}>
                      {r.pct}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-1.5">
                  {prior != null && (
                    <div className="h-full rounded-full bg-slate-300 transition-all" style={{ width: `${prior}%` }} />
                  )}
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      r.pct >= 80 ? 'bg-emerald-500' : r.pct >= 60 ? 'bg-indigo-500' : 'bg-amber-500',
                    )}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[10px] text-slate-400 pt-1">Grey bar = prior practice accuracy · Colored bar = mastery check</p>
      </div>

      <div className="flex gap-3">
        <a
          href="/sat-math-academy"
          className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold py-3 text-center text-sm hover:bg-slate-50 transition-colors"
        >
          Course Home
        </a>
        <a
          href="/sat-math-academy/capstones"
          className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 text-center text-sm transition-colors"
        >
          Capstones
        </a>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MathMasteryCheckPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, AnswerLabel>>({})
  const [priorAccuracy, setPriorAccuracy] = useState<PriorAccuracy[]>([])

  const questions = useMemo(() => buildMasteryCheckQuestions(), [])

  useEffect(() => {
    fetch('/api/academy/math-attempts')
      .then(r => r.json())
      .then((data: { skillSlug: string; recentAccuracy: number }[]) => {
        if (Array.isArray(data)) {
          setPriorAccuracy(data.map(d => ({ skillSlug: d.skillSlug, recentAccuracy: d.recentAccuracy })))
        }
      })
      .catch(() => null)
  }, [])

  function handleComplete(ans: Record<string, AnswerLabel>) {
    setAnswers(ans)
    for (const q of questions) {
      const sel = ans[q.id]
      if (!sel) continue
      void fetch('/api/academy/math-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          difficulty: q.difficulty,
          selectedAnswer: sel,
          correctAnswer: q.correctAnswer,
          isCorrect: sel === q.correctAnswer,
          sourceType: 'mastery_check',
          sourceId: 'final-mastery-check',
          practiceMode: 'mastery_check',
        }),
      }).catch(() => null)
    }
    setPhase('results')
  }

  return (
    <div>
      {phase === 'intro' && <IntroScreen total={questions.length} onStart={() => setPhase('quiz')} />}
      {phase === 'quiz' && <QuizScreen questions={questions} onComplete={handleComplete} />}
      {phase === 'results' && (
        <ResultsScreen questions={questions} answers={answers} priorAccuracy={priorAccuracy} />
      )}
    </div>
  )
}
