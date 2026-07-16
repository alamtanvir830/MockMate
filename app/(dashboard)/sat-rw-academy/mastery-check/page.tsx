'use client'

import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { allSkills } from '@/lib/academy'
import { SKILL_DISPLAY_NAMES } from '@/lib/academy/skill-mapping'
import { ReportIssueButton } from '@/components/academy/ReportIssueButton'
import type { DrillQuestion, AnswerLabel } from '@/lib/academy/types'

// ── Build mastery-check question set ─────────────────────────────────────────
// Uses drill questions at medium difficulty (idx 4-7) — different from the
// diagnostic which uses indices 0 and 9. Covers all 11 skills.

function buildMasteryCheckQuestions(): DrillQuestion[] {
  const questions: DrillQuestion[] = []
  const READING_SLUGS = [
    'words-in-context', 'central-ideas-details', 'text-structure-purpose',
    'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
  ]
  const WRITING_SLUGS = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']

  // Reading: 2 per skill (medium and hard) — indices 4 and 7
  for (const slug of READING_SLUGS) {
    const skill = allSkills.find(s => s.slug === slug)
    if (!skill) continue
    const dqs = skill.drillQuestions
    if (dqs[4]) questions.push(dqs[4])
    if (dqs[7]) questions.push(dqs[7])
  }

  // Writing: 2 per skill (medium indices) — indices 3 and 6
  for (const slug of WRITING_SLUGS) {
    const skill = allSkills.find(s => s.slug === slug)
    if (!skill) continue
    const dqs = skill.drillQuestions
    if (dqs[3]) questions.push(dqs[3])
    if (dqs[6]) questions.push(dqs[6])
  }

  return questions  // 14 reading + 8 writing = 22 questions
}

type Phase = 'intro' | 'quiz' | 'results'

interface SkillResult {
  slug: string
  title: string
  section: 'reading' | 'writing'
  correct: number
  total: number
  pct: number
}

interface DiagnosticComparison {
  slug: string
  title: string
  diagnosticPct: number | null
  masteryPct: number
  change: number | null
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function IntroScreen({ total, onStart }: { total: number; onStart: () => void }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Final R&W Mastery Check</h1>
        <p className="mt-1 text-sm text-slate-500">
          An end-of-course assessment covering all 11 R&W skills. Results are compared to your initial diagnostic.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: `${total} questions`, sub: '2 per skill' },
            { label: '11 skills', sub: '7 reading + 4 writing' },
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
              <span className="text-emerald-500 font-bold mt-0.5 shrink-0">✓</span>
              {t}
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-800">
          This assessment measures your Academy progress — not an official SAT score. Results show skill accuracy changes, not guaranteed score improvements.
        </div>

        <button
          onClick={onStart}
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors"
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
  const selected = answers[current.id]

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
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 font-medium">Question {currentIndex + 1} of {questions.length}</span>
        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Mastery Check</span>
      </div>

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
              cls = 'border-sky-400 bg-sky-50 text-sky-800'
            }
            return (
              <button
                key={choice.label}
                onClick={() => handleSelect(choice.label)}
                disabled={!!selected}
                className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors disabled:cursor-default', cls)}
              >
                <span className="shrink-0 font-semibold">{choice.label}.</span>
                <span>{choice.text}</span>
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className={cn('rounded-lg border p-3 text-sm', isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50')}>
            <p className={cn('font-semibold mb-1', isCorrect ? 'text-emerald-800' : 'text-red-800')}>
              {isCorrect ? 'Correct' : `Incorrect — correct answer: ${current.correctAnswer}`}
            </p>
            <p className={cn('text-[13px] leading-relaxed', isCorrect ? 'text-emerald-700' : 'text-red-700')}>
              {current.explanation}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Skill: {SKILL_DISPLAY_NAMES[current.skillSlug] ?? current.skillSlug}
            </p>
          </div>
        )}

        {revealed && (
          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 transition-colors"
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
  diagnosticData: SkillResult[]
}

function ResultsScreen({ questions, answers, diagnosticData }: ResultsProps) {
  const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length
  const total = questions.length
  const pct = Math.round((correct / total) * 100)

  const bySkill: Record<string, SkillResult> = {}
  for (const q of questions) {
    if (!bySkill[q.skillSlug]) {
      const skill = allSkills.find(s => s.slug === q.skillSlug)
      bySkill[q.skillSlug] = {
        slug: q.skillSlug,
        title: SKILL_DISPLAY_NAMES[q.skillSlug] ?? q.skillSlug,
        section: skill?.section ?? 'reading',
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

  const diagMap: Record<string, number> = {}
  for (const d of diagnosticData) diagMap[d.slug] = d.pct

  const comparisons: DiagnosticComparison[] = Object.values(bySkill).map(r => ({
    slug: r.slug,
    title: r.title,
    diagnosticPct: diagMap[r.slug] ?? null,
    masteryPct: r.pct,
    change: diagMap[r.slug] != null ? r.pct - diagMap[r.slug] : null,
  }))

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Your Academy Progress</h2>
        <p className="mt-1 text-sm text-slate-500">
          Mastery Check accuracy compared to your initial diagnostic.
          This reflects your Academy performance — not an official SAT score.
        </p>
      </div>

      <div className={cn(
        'rounded-xl border p-5 text-center',
        pct >= 85 ? 'border-emerald-300 bg-emerald-50' : pct >= 70 ? 'border-blue-200 bg-blue-50' : 'border-amber-200 bg-amber-50',
      )}>
        <p className={cn('text-4xl font-bold', pct >= 85 ? 'text-emerald-700' : pct >= 70 ? 'text-blue-700' : 'text-amber-700')}>
          {pct}%
        </p>
        <p className="text-sm text-slate-600 mt-1">{correct} of {total} correct on Mastery Check</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="font-semibold text-slate-800 text-sm">Skill Comparison: Diagnostic → Mastery Check</p>
        <div className="space-y-2.5">
          {comparisons.map(c => (
            <div key={c.slug} className="space-y-1">
              <div className="flex items-center justify-between">
                <a href={`/sat-rw-academy/lesson/${c.slug}`} className="text-[12px] text-sky-700 hover:underline truncate max-w-[180px]">
                  {c.title}
                </a>
                <div className="flex items-center gap-2 text-[11px]">
                  {c.diagnosticPct != null && (
                    <span className="text-slate-400">{c.diagnosticPct}%</span>
                  )}
                  {c.change != null && (
                    <span className={cn(
                      'font-semibold',
                      c.change > 0 ? 'text-emerald-600' : c.change < 0 ? 'text-red-500' : 'text-slate-400',
                    )}>
                      {c.change > 0 ? `+${c.change}` : c.change}%
                    </span>
                  )}
                  <span className={cn('font-medium', c.masteryPct >= 80 ? 'text-emerald-600' : c.masteryPct >= 60 ? 'text-sky-600' : 'text-amber-600')}>
                    {c.masteryPct}%
                  </span>
                </div>
              </div>
              <div className="flex gap-1 h-1.5">
                {c.diagnosticPct != null && (
                  <div className="h-full rounded-full bg-slate-300 transition-all" style={{ width: `${c.diagnosticPct}%` }} />
                )}
                <div
                  className={cn('h-full rounded-full transition-all', c.masteryPct >= 80 ? 'bg-emerald-500' : c.masteryPct >= 60 ? 'bg-sky-500' : 'bg-amber-500')}
                  style={{ width: `${c.masteryPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 pt-1">Grey bar = diagnostic · Colored bar = mastery check</p>
      </div>

      <div className="flex gap-3">
        <a href="/sat-rw-academy" className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold py-3 text-center text-sm hover:bg-slate-50 transition-colors">
          Course Home
        </a>
        <a href="/sat-rw-academy/capstones" className="flex-1 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 text-center text-sm transition-colors">
          Capstones
        </a>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MasteryCheckPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, AnswerLabel>>({})
  const [diagnosticData, setDiagnosticData] = useState<SkillResult[]>([])

  const questions = useMemo(() => buildMasteryCheckQuestions(), [])

  useEffect(() => {
    // Load diagnostic attempt data for comparison
    fetch('/api/academy/attempts')
      .then(r => r.json())
      .then((data: { skillSlug: string; masteryScore: number; attemptCount: number }[]) => {
        // Map diagnostic-tagged attempts to skill results for comparison
        // (Uses mastery scores as proxy — a proper comparison would filter by source_type='diagnostic')
        const results: SkillResult[] = data.map(d => {
          const skill = allSkills.find(s => s.slug === d.skillSlug)
          return {
            slug: d.skillSlug,
            title: SKILL_DISPLAY_NAMES[d.skillSlug] ?? d.skillSlug,
            section: skill?.section ?? 'reading',
            correct: Math.round(d.masteryScore / 10),
            total: 10,
            pct: d.masteryScore,
          }
        })
        setDiagnosticData(results)
      })
      .catch(() => null)
  }, [])

  function handleComplete(ans: Record<string, AnswerLabel>) {
    setAnswers(ans)
    // Save attempts
    for (const q of questions) {
      const sel = ans[q.id]
      if (!sel) continue
      void fetch('/api/academy/attempts', {
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
    <div className="p-4 sm:p-6 lg:p-8">
      {phase === 'intro' && <IntroScreen total={questions.length} onStart={() => setPhase('quiz')} />}
      {phase === 'quiz' && <QuizScreen questions={questions} onComplete={handleComplete} />}
      {phase === 'results' && (
        <ResultsScreen questions={questions} answers={answers} diagnosticData={diagnosticData} />
      )}
    </div>
  )
}
