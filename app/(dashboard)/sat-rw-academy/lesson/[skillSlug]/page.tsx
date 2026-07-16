'use client'

import { use, useState, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getSkill } from '@/lib/academy'
import type { GuidedExample, DrillQuestion, AcademySkill } from '@/lib/academy/types'
import type { AnswerLabel } from '@/lib/academy/types'
import { LessonVideoSection } from '@/components/academy/LessonVideoSection'

type Props = { params: Promise<{ skillSlug: string }> }
type Tab = 'overview' | 'strategy' | 'traps' | 'examples' | 'drill' | 'mastery'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'traps', label: 'Common Traps' },
  { id: 'examples', label: 'Guided Examples' },
  { id: 'drill', label: 'Drill' },
  { id: 'mastery', label: 'Mastery' },
]

// ─── Overview tab ────────────────────────────────────────────────────────────

function OverviewTab({ skill }: { skill: AcademySkill }) {
  const o = skill.overview
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-900">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: 'What it tests', value: o.whatItTests },
          { label: 'How it appears', value: o.howItAppears },
          { label: 'Why students miss it', value: o.whyStudentsMissIt },
          { label: 'What to look for', value: o.whatToLookFor },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
            <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Strategy tab ─────────────────────────────────────────────────────────────

function StrategyTab({ skill }: { skill: AcademySkill }) {
  const s = skill.strategy
  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-slate-900">Strategy</h2>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Decision process</p>
        <ol className="space-y-2">
          {s.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1">Time-saving tip</p>
        <p className="text-sm text-amber-800 leading-relaxed">{s.timeSavingTip}</p>
      </div>
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-1">When not to overthink</p>
        <p className="text-sm text-blue-800 leading-relaxed">{s.whenNotToOverthink}</p>
      </div>
    </div>
  )
}

// ─── Common Traps tab ─────────────────────────────────────────────────────────

function TrapsTab({ skill }: { skill: AcademySkill }) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-900">Common Traps</h2>
      <div className="space-y-3">
        {skill.commonTraps.map((trap, i) => (
          <div key={i} className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-800 mb-1">
              <span className="text-red-400 mr-2">⚠</span>
              {trap.title}
            </p>
            <p className="text-sm text-red-700 leading-relaxed mb-2">{trap.description}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-500 mb-0.5">How to avoid</p>
            <p className="text-sm text-red-700 leading-relaxed">{trap.avoidance}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Guided Examples tab ──────────────────────────────────────────────────────

function GuidedExamplesTab({ examples }: { examples: GuidedExample[] }) {
  const [exIdx, setExIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)

  const ex = examples[exIdx]
  const totalSteps = ex.steps.length

  const goToExample = (idx: number) => {
    setExIdx(idx)
    setStepIdx(0)
    setSelectedAnswer(null)
    setRevealed(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Guided Examples</h2>
        <div className="flex gap-1">
          {examples.map((_, i) => (
            <button
              key={i}
              onClick={() => goToExample(i)}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                exIdx === i
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Stimulus */}
      {ex.stimulus && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Passage</p>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{ex.stimulus}</p>
        </div>
      )}

      {/* Question */}
      <p className="text-sm font-medium text-slate-900">{ex.question}</p>

      {/* Choices */}
      <div className="space-y-2">
        {ex.choices.map((choice) => {
          const isSelected = selectedAnswer === choice.label
          const isCorrect = choice.label === ex.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-50 cursor-default'
          } else if (isSelected) {
            cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
          }
          return (
            <button
              key={choice.label}
              disabled={revealed}
              onClick={() => !revealed && setSelectedAnswer(choice.label)}
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

      {/* Steps */}
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Step-by-step walkthrough — {stepIdx + 1} of {totalSteps}
        </p>
        <div className="space-y-2">
          {ex.steps.slice(0, stepIdx + 1).map((step, i) => (
            <div key={i} className={cn('rounded-lg border p-3', i === stepIdx ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50')}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Step {i + 1}: {step.instruction}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{step.content}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {stepIdx < totalSteps - 1 && (
            <button
              onClick={() => setStepIdx(stepIdx + 1)}
              className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 transition-colors"
            >
              Next step →
            </button>
          )}
          {stepIdx === totalSteps - 1 && !revealed && (
            <button
              onClick={() => setRevealed(true)}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 transition-colors"
            >
              Reveal answer
            </button>
          )}
        </div>
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">Explanation</p>
          <p className="text-sm text-slate-700 leading-relaxed">{ex.explanation}</p>
          {ex.wrongAnswerExplanations && Object.keys(ex.wrongAnswerExplanations).length > 0 && (
            <div className="space-y-2 border-t border-emerald-200 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Why the others are wrong</p>
              {(Object.entries(ex.wrongAnswerExplanations) as [AnswerLabel, string][]).map(([label, text]) => (
                <p key={label} className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-700">({label})</span> {text}
                </p>
              ))}
            </div>
          )}
          {exIdx < examples.length - 1 && (
            <button
              onClick={() => goToExample(exIdx + 1)}
              className="mt-1 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 transition-colors"
            >
              Next example →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Drill tab ────────────────────────────────────────────────────────────────

function DrillTab({ questions, skillSlug }: { questions: DrillQuestion[]; skillSlug: string }) {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([])

  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1

  const handleReveal = useCallback(async () => {
    if (!selected) return
    const correct = selected === q.correctAnswer
    setRevealed(true)
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => [...prev, { correct }])

    // Save attempt
    try {
      await fetch('/api/academy/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          subskillSlug: q.subskill,
          difficulty: q.difficulty,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          isCorrect: correct,
          sourceType: 'academy_drill',
          sourceId: skillSlug,
        }),
      })
    } catch {
      // non-blocking
    }
  }, [selected, q, skillSlug])

  const handleNext = () => {
    if (isLast) {
      setDone(true)
    } else {
      setQIdx((i) => i + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="space-y-5">
        <h2 className="text-base font-semibold text-slate-900">Drill Complete</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className={cn('text-5xl font-bold mb-2', pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-500' : 'text-red-500')}>
            {pct}%
          </div>
          <p className="text-slate-500 text-sm mb-6">{score} of {questions.length} correct</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {answers.map((a, i) => (
              <span
                key={i}
                className={cn('inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold', a.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <button
            onClick={() => { setQIdx(0); setSelected(null); setRevealed(false); setScore(0); setDone(false); setAnswers([]) }}
            className="mt-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Retake drill
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Drill</h2>
        <span className="text-xs text-slate-400">{qIdx + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div
          className="bg-emerald-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((qIdx) / questions.length) * 100}%` }}
        />
      </div>

      {/* Difficulty badge */}
      <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
        q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
        'bg-red-100 text-red-700'
      )}>
        {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
      </span>

      {/* Stimulus */}
      {q.stimulus && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{q.stimulus}</p>
        </div>
      )}

      {/* Question */}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>

      {/* Choices */}
      <div className="space-y-2">
        {q.choices.map((choice) => {
          const isSelected = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSelected && !isCorrect) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
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

      {/* Submit / next */}
      {!revealed ? (
        <button
          disabled={!selected}
          onClick={handleReveal}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition-colors"
        >
          Submit answer
        </button>
      ) : (
        <div className="space-y-3">
          <div className={cn('rounded-lg border p-4', selected === q.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50')}>
            <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', selected === q.correctAnswer ? 'text-emerald-600' : 'text-red-600')}>
              {selected === q.correctAnswer ? 'Correct' : 'Incorrect — correct answer: ' + q.correctAnswer}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
            {q.wrongAnswerExplanations && selected && selected !== q.correctAnswer && q.wrongAnswerExplanations[selected] && (
              <p className="mt-2 text-xs text-slate-500 leading-relaxed border-t border-current/10 pt-2">
                <span className="font-bold">Why ({selected}) is wrong:</span> {q.wrongAnswerExplanations[selected]}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500 italic border-t border-current/10 pt-2">{q.teachingPoint}</p>
          </div>
          <button
            onClick={handleNext}
            className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            {isLast ? 'See results' : 'Next question →'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Mastery tab ──────────────────────────────────────────────────────────────

function MasteryTab({ skillSlug }: { skillSlug: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-slate-900">Mastery</h2>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        <p className="mb-2">Complete the drill to track your mastery for this skill. Your score is weighted by difficulty:</p>
        <ul className="space-y-1 text-xs">
          <li className="flex gap-2"><span className="font-semibold text-green-600 w-14">Easy</span> 1.0×</li>
          <li className="flex gap-2"><span className="font-semibold text-amber-600 w-14">Medium</span> 1.25×</li>
          <li className="flex gap-2"><span className="font-semibold text-red-600 w-14">Hard</span> 1.5×</li>
        </ul>
        <div className="mt-4 space-y-1 text-xs">
          <p className="font-semibold text-slate-600 mb-2">Status levels:</p>
          {[
            { label: 'Not Started', color: 'bg-slate-100 text-slate-500', req: '0 attempts' },
            { label: 'Learning', color: 'bg-amber-50 text-amber-600', req: '< 5 attempts' },
            { label: 'Developing', color: 'bg-orange-50 text-orange-600', req: '≥ 5 attempts, < 70% mastery' },
            { label: 'Proficient', color: 'bg-blue-50 text-blue-600', req: '70–84% mastery' },
            { label: 'Mastered', color: 'bg-emerald-50 text-emerald-700', req: '≥ 85% mastery and ≥ 15 attempts' },
          ].map(({ label, color, req }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium w-20 justify-center', color)}>{label}</span>
              <span className="text-slate-400">{req}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Practice this skill in the Drill tab. Questions you miss are automatically added to your Review Queue.
        </p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LessonPage({ params }: Props) {
  const { skillSlug } = use(params)
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const skill = getSkill(skillSlug)
  const section = skill?.section === 'reading' ? 'Reading Skills' : skill?.section === 'writing' ? 'Writing Skills' : 'SAT R&W Academy'

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/sat-rw-academy" className="hover:text-slate-600 transition-colors">SAT R&amp;W Academy</Link>
        <span>/</span>
        <Link
          href={skill?.section === 'reading' ? '/sat-rw-academy/reading' : '/sat-rw-academy/writing'}
          className="hover:text-slate-600 transition-colors"
        >
          {section}
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">{skill?.title ?? skillSlug}</span>
      </nav>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{skill?.title ?? skillSlug}</h1>
        <p className="mt-1 text-sm text-slate-500">{section}</p>
      </div>

      {/* Video lesson — shows only when a published video exists for this skill */}
      <LessonVideoSection lessonSlug={skillSlug} />

      {/* Tab bar */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="flex gap-1 min-w-max border-b border-slate-200 pb-0">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
                activeTab === id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        {!skill ? (
          <p className="text-sm text-slate-500">Skill not found.</p>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab skill={skill} />}
            {activeTab === 'strategy' && <StrategyTab skill={skill} />}
            {activeTab === 'traps' && <TrapsTab skill={skill} />}
            {activeTab === 'examples' && <GuidedExamplesTab examples={skill.guidedExamples} />}
            {activeTab === 'drill' && <DrillTab questions={skill.drillQuestions} skillSlug={skillSlug} />}
            {activeTab === 'mastery' && <MasteryTab skillSlug={skillSlug} />}
          </>
        )}
      </div>
    </div>
  )
}
