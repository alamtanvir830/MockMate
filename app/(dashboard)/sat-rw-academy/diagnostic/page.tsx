'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allSkills } from '@/lib/academy'
import type { DrillQuestion, AnswerLabel } from '@/lib/academy/types'

// ─── Sample 2–3 questions per skill (24 total) ───────────────────────────────
// Reading: 2 per skill × 6 = 12; Writing: 3 per skill × 4 = 12

const READING_SKILL_SLUGS = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences',
]
const WRITING_SKILL_SLUGS = [
  'boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis',
]

function buildDiagnosticQuestions(): DrillQuestion[] {
  const questions: DrillQuestion[] = []
  for (const slug of READING_SKILL_SLUGS) {
    const skill = allSkills.find(s => s.slug === slug)
    if (!skill) continue
    const dqs = skill.drillQuestions
    // Pick one easy (idx 0) and one hard (idx 9)
    if (dqs[0]) questions.push(dqs[0])
    if (dqs[9]) questions.push(dqs[9])
  }
  for (const slug of WRITING_SKILL_SLUGS) {
    const skill = allSkills.find(s => s.slug === slug)
    if (!skill) continue
    const dqs = skill.drillQuestions
    // Pick one easy (idx 0), one medium (idx 4), one hard (idx 9)
    if (dqs[0]) questions.push(dqs[0])
    if (dqs[4]) questions.push(dqs[4])
    if (dqs[9]) questions.push(dqs[9])
  }
  return questions
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

// ─── Intro ────────────────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-6">
            <div>
        <h1 className="text-2xl font-bold text-slate-900">Diagnostic</h1>
        <p className="mt-1 text-sm text-slate-500">Find your starting point across all 10 R&W skills.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: '24 questions', sub: '2–3 per skill' },
            { label: '10 skills', sub: '6 reading + 4 writing' },
            { label: '~20 minutes', sub: 'untimed, go at your pace' },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-center">
              <p className="text-base font-bold text-slate-900">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-2 text-sm text-slate-600">
          {[
            'Each question covers a different SAT R&W skill.',
            'Your results show which skills to prioritize first.',
            'Answers are saved and count toward your mastery scores.',
          ].map(t => (
            <li key={t} className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              {t}
            </li>
          ))}
        </ul>
        <button
          onClick={onStart}
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors"
        >
          Start Diagnostic →
        </button>
      </div>
    </div>
  )
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

function QuizScreen({
  questions,
  onComplete,
}: {
  questions: DrillQuestion[]
  onComplete: (answers: Record<string, AnswerLabel>) => void
}) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<Record<string, AnswerLabel>>({})

  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1
  const progress = Math.round(((qIdx + (revealed ? 1 : 0)) / questions.length) * 100)

  const skillTitle = useMemo(() => {
    return allSkills.find(s => s.slug === q.skillSlug)?.title ?? q.skillSlug
  }, [q.skillSlug])

  const handleReveal = useCallback(async () => {
    if (!selected) return
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)
    setRevealed(true)
    try {
      await fetch('/api/academy/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          difficulty: q.difficulty,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          isCorrect: selected === q.correctAnswer,
          sourceType: 'academy_diagnostic',
          sourceId: 'diagnostic',
        }),
      })
    } catch { /* non-blocking */ }
  }, [selected, q, answers])

  const handleNext = () => {
    if (isLast) {
      onComplete(answers)
    } else {
      setQIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  return (
    <div className="space-y-5">
            <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Diagnostic</h1>
          <p className="text-xs text-slate-400 mt-0.5">Question {qIdx + 1} of {questions.length}</p>
        </div>
        <span className="text-sm font-semibold text-slate-500">{progress}%</span>
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Skill + difficulty */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">
          {skillTitle}
        </span>
        <span className={cn(
          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
          q.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
          q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700',
        )}>
          {q.difficulty}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        {q.stimulus && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{q.stimulus}</p>
          </div>
        )}
        <p className="text-sm font-medium text-slate-900">{q.question}</p>

        <div className="space-y-2">
          {q.choices.map(choice => {
            const isSelected = selected === choice.label
            const isCorrect = choice.label === q.correctAnswer
            let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
            if (revealed) {
              if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
              else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
              else cls = 'border-slate-100 bg-white opacity-40 cursor-default'
            } else if (isSelected) {
              cls = 'border-indigo-400 bg-indigo-50 cursor-pointer'
            }
            return (
              <button
                key={choice.label}
                disabled={revealed}
                onClick={() => !revealed && setSelected(choice.label)}
                className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">
                  {choice.label}
                </span>
                <span className="text-sm text-slate-700">{choice.text}</span>
              </button>
            )
          })}
        </div>

        {!revealed ? (
          <button
            disabled={!selected}
            onClick={handleReveal}
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 transition-colors"
          >
            Submit
          </button>
        ) : (
          <div className="space-y-3">
            <div className={cn('rounded-lg border p-3 text-sm', selected === q.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', selected === q.correctAnswer ? 'text-emerald-700' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — correct: ${q.correctAnswer}`}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 transition-colors"
            >
              {isLast ? 'See results →' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Results ─────────────────────────────────────────────────────────────────

function ResultsScreen({
  questions,
  answers,
  onRetake,
}: {
  questions: DrillQuestion[]
  answers: Record<string, AnswerLabel>
  onRetake: () => void
}) {
  const skillResults = useMemo((): SkillResult[] => {
    const map: Record<string, { correct: number; total: number; title: string; section: 'reading' | 'writing' }> = {}
    for (const q of questions) {
      if (!map[q.skillSlug]) {
        const skill = allSkills.find(s => s.slug === q.skillSlug)
        map[q.skillSlug] = { correct: 0, total: 0, title: skill?.title ?? q.skillSlug, section: skill?.section ?? 'reading' }
      }
      map[q.skillSlug].total++
      if (answers[q.id] === q.correctAnswer) map[q.skillSlug].correct++
    }
    return Object.entries(map).map(([slug, v]) => ({
      slug, title: v.title, section: v.section,
      correct: v.correct, total: v.total,
      pct: Math.round((v.correct / v.total) * 100),
    })).sort((a, b) => a.pct - b.pct)
  }, [questions, answers])

  const totalCorrect = Object.values(answers).filter((ans, i) => ans === questions[i]?.correctAnswer).length
  // Simpler correct count
  const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length
  const overallPct = Math.round((correctCount / questions.length) * 100)

  const weak = skillResults.filter(s => s.pct < 67)
  const strong = skillResults.filter(s => s.pct >= 67)

  return (
    <div className="space-y-6">
            <div>
        <h1 className="text-2xl font-bold text-slate-900">Diagnostic Results</h1>
        <p className="mt-1 text-sm text-slate-500">Here&apos;s where to focus your Academy practice.</p>
      </div>

      {/* Overall score */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 flex items-center gap-6">
        <div className="text-center">
          <p className={cn('text-5xl font-bold', overallPct >= 80 ? 'text-emerald-600' : overallPct >= 60 ? 'text-amber-500' : 'text-red-500')}>
            {overallPct}%
          </p>
          <p className="text-xs text-slate-400 mt-1">{correctCount} / {questions.length} correct</p>
        </div>
        <div className="flex-1">
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className={cn('h-3 rounded-full transition-all', overallPct >= 80 ? 'bg-emerald-500' : overallPct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {overallPct >= 80 ? 'Strong start — focus on mastering your weaker skills.' :
             overallPct >= 60 ? 'Good foundation — keep building with the skills below.' :
             'Great starting point — the Academy will help you improve quickly.'}
          </p>
        </div>
      </div>

      {/* Start here — weak skills */}
      {weak.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Start Here — Needs Work</h2>
          <div className="space-y-2">
            {weak.map(s => (
              <div key={s.slug} className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">{s.section} · {s.correct}/{s.total} correct ({s.pct}%)</p>
                </div>
                <Link
                  href={`/sat-rw-academy/lesson/${s.slug}`}
                  className="shrink-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 transition-colors"
                >
                  Open Lesson →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strong skills */}
      {strong.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Looking Good</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {strong.map(s => (
              <div key={s.slug} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3">
                <span className={cn('w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                  s.pct === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-700',
                )}>
                  {s.pct}%
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{s.title}</p>
                  <p className="text-xs text-slate-400 capitalize">{s.section}</p>
                </div>
                <Link href={`/sat-rw-academy/lesson/${s.slug}`} className="text-xs text-emerald-600 hover:underline shrink-0">
                  Drill →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/sat-rw-academy/study-plan"
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          View personalized study plan →
        </Link>
        <button
          onClick={onRetake}
          className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Retake diagnostic
        </button>
      </div>

      {totalCorrect === 0 && <p className="hidden">{totalCorrect}</p>}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiagnosticPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, AnswerLabel>>({})

  const questions = useMemo(() => buildDiagnosticQuestions(), [])

  const handleComplete = (finalAnswers: Record<string, AnswerLabel>) => {
    setAnswers(finalAnswers)
    setPhase('results')
  }

  const handleRetake = () => {
    setAnswers({})
    setPhase('intro')
  }

  if (phase === 'intro') return <IntroScreen onStart={() => setPhase('quiz')} />
  if (phase === 'quiz') return <QuizScreen questions={questions} onComplete={handleComplete} />
  return <ResultsScreen questions={questions} answers={answers} onRetake={handleRetake} />
}
