'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  categories,
  transitionQuestions,
  type CategoryInfo,
  type TransitionCategory,
  type TransitionQuestion,
} from '@/lib/academy/transitions'

type Mode = 'category' | 'mixed'
type Choice = 'A' | 'B' | 'C' | 'D'

const shortDescriptions: Record<TransitionCategory, string> = {
  addition: 'continuing ideas',
  contrast: 'opposing ideas',
  'cause-effect': 'cause & result',
  example: 'specific instances',
  concession: 'admitting counterpoints',
  sequence: 'time & order',
  clarification: 'restating ideas',
  emphasis: 'stressing importance',
  summary: 'drawing conclusions',
}

const difficultyStyles: Record<TransitionQuestion['difficulty'], string> = {
  easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  hard: 'bg-red-50 text-red-700 border-red-200',
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function TransitionsPage() {
  const [mode, setMode] = useState<Mode>('category')

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transition Trainer</h1>
        <p className="mt-1 text-sm text-slate-500">
          63 questions across 9 logical relationship categories
        </p>
      </div>

      <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
        {(
          [
            { key: 'category', label: 'Practice by Category' },
            { key: 'mixed', label: 'Mixed Practice' },
          ] as { key: Mode; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              mode === key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'category' ? <CategoryMode /> : <MixedMode />}
    </div>
  )
}

function CategoryMode() {
  const [activeSlug, setActiveSlug] = useState<TransitionCategory>(categories[0].slug)

  const activeCategory = categories.find((c) => c.slug === activeSlug)!
  const questions = useMemo(
    () => transitionQuestions.filter((q) => q.category === activeSlug),
    [activeSlug],
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Category selector */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {categories.map((cat) => {
            const isActive = cat.slug === activeSlug
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveSlug(cat.slug)}
                className={cn(
                  'min-w-[180px] shrink-0 rounded-xl border p-3 text-left transition-colors lg:min-w-0',
                  isActive
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <p
                  className={cn(
                    'text-sm font-semibold',
                    isActive ? 'text-emerald-800' : 'text-slate-900',
                  )}
                >
                  {cat.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 capitalize">
                  {shortDescriptions[cat.slug]}
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">7 questions</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quiz for the active category */}
      <div className="space-y-5">
        <CategoryReferenceCard category={activeCategory} />
        <Quiz key={activeSlug} questions={questions} showCategoryBadge={false} />
      </div>
    </div>
  )
}

function MixedMode() {
  const [shuffled, setShuffled] = useState(false)
  const [seed, setSeed] = useState(0)

  const questions = useMemo(() => {
    if (!shuffled) return transitionQuestions
    return shuffle(transitionQuestions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffled, seed])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">All 63 questions, one at a time.</p>
        <button
          onClick={() => {
            setShuffled((s) => !s)
            setSeed((n) => n + 1)
          }}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
            shuffled
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
          )}
        >
          {shuffled ? 'Shuffle: On' : 'Shuffle: Off'}
        </button>
      </div>
      <Quiz
        key={shuffled ? `shuffled-${seed}` : 'ordered'}
        questions={questions}
        showCategoryBadge
      />
    </div>
  )
}

function CategoryReferenceCard({ category }: { category: CategoryInfo }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">{category.label}</p>
          <p className="mt-0.5 text-xs text-slate-500">{category.description}</p>
        </div>
        <span className="shrink-0 text-xs font-medium text-slate-400">
          {open ? 'Hide' : 'Show'}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-slate-100 p-4">
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Signal words
            </p>
            <div className="flex flex-wrap gap-1.5">
              {category.signalWords.map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-800">Test tip</p>
            <p className="mt-0.5 text-xs text-amber-700">{category.testTip}</p>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-xs font-semibold text-red-800">Common mistake</p>
            <p className="mt-0.5 text-xs text-red-700">{category.commonMistake}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function categoryLabel(slug: TransitionCategory): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug
}

function Quiz({
  questions,
  showCategoryBadge,
}: {
  questions: TransitionQuestion[]
  showCategoryBadge: boolean
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<Choice | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = questions.length
  const current = questions[index]

  function reset() {
    setIndex(0)
    setSelected(null)
    setSubmitted(false)
    setCorrectCount(0)
    setAnsweredCount(0)
    setFinished(false)
  }

  function handleSubmit() {
    if (!selected || submitted) return
    setSubmitted(true)
    setAnsweredCount((n) => n + 1)
    if (selected === current.correctAnswer) {
      setCorrectCount((n) => n + 1)
    }
  }

  function handleNext() {
    if (index + 1 >= total) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setSubmitted(false)
  }

  if (finished) {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-500">Session complete</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">
          {correctCount} / {total}
        </p>
        <p className="mt-1 text-sm text-slate-500">{pct}% correct</p>
        <button
          onClick={reset}
          className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  const progressPct = total > 0 ? Math.round(((index + 1) / total) * 100) : 0

  return (
    <div className="space-y-4">
      {/* Score + progress */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-700">
          {correctCount} / {answeredCount} correct
        </p>
        <p className="text-sm text-slate-500">
          {index + 1} of {total}
        </p>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
              difficultyStyles[current.difficulty],
            )}
          >
            {current.difficulty}
          </span>
          {showCategoryBadge && (
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {categoryLabel(current.category)}
            </span>
          )}
        </div>

        <p className="text-[15px] leading-relaxed text-slate-800">{current.stimulus}</p>
        <p className="mt-3 text-sm font-medium text-slate-600">{current.question}</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {current.choices.map((choice) => {
            const isSelected = selected === choice.label
            const isCorrect = choice.label === current.correctAnswer
            const showAsCorrect = submitted && isCorrect
            const showAsWrong = submitted && isSelected && !isCorrect

            return (
              <button
                key={choice.label}
                onClick={() => !submitted && setSelected(choice.label)}
                disabled={submitted}
                className={cn(
                  'flex items-start gap-2.5 rounded-lg border p-3 text-left text-sm transition-colors',
                  showAsCorrect && 'border-emerald-300 bg-emerald-50',
                  showAsWrong && 'border-red-300 bg-red-50',
                  !submitted &&
                    isSelected &&
                    'border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200',
                  !submitted &&
                    !isSelected &&
                    'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                  submitted && !showAsCorrect && !showAsWrong && 'border-slate-200 bg-white',
                )}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                    showAsCorrect
                      ? 'bg-emerald-600 text-white'
                      : showAsWrong
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600',
                  )}
                >
                  {choice.label}
                </span>
                <span className="text-slate-800">{choice.text}</span>
              </button>
            )
          })}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={cn(
              'mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              selected
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'cursor-not-allowed bg-slate-100 text-slate-400',
            )}
          >
            Submit
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <div
              className={cn(
                'rounded-lg border p-3',
                selected === current.correctAnswer
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-red-200 bg-red-50',
              )}
            >
              <p
                className={cn(
                  'text-sm font-semibold',
                  selected === current.correctAnswer ? 'text-emerald-800' : 'text-red-800',
                )}
              >
                {selected === current.correctAnswer
                  ? 'Correct'
                  : `Incorrect — the answer is ${current.correctAnswer}`}
              </p>
              <p className="mt-1 text-sm text-slate-700">{current.explanation}</p>
              <p className="mt-2 text-xs italic text-slate-500">{current.categoryExplanation}</p>
            </div>

            {selected &&
              selected !== current.correctAnswer &&
              current.wrongAnswerExplanations[selected] && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">
                    Why {selected} is wrong
                  </p>
                  <p className="mt-0.5 text-sm text-slate-700">
                    {current.wrongAnswerExplanations[selected]}
                  </p>
                </div>
              )}

            <button
              onClick={handleNext}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              {index + 1 >= total ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
