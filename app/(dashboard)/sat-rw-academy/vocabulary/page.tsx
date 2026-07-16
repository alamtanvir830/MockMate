'use client'

import { useMemo, useState } from 'react'
import { vocabEntries, type VocabDifficulty, type VocabEntry } from '@/lib/academy/vocabulary'
import { AcademyNav } from '@/components/dashboard/AcademyNav'
import { cn } from '@/lib/utils'

type DifficultyFilter = 'all' | VocabDifficulty
type Mode = 'flashcard' | 'multiple-choice' | 'fill-blank'

const difficultyFilters: { label: string; value: DifficultyFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
]

const modes: { label: string; value: Mode }[] = [
  { label: 'Flashcard', value: 'flashcard' },
  { label: 'Multiple Choice', value: 'multiple-choice' },
  { label: 'Fill in the Blank', value: 'fill-blank' },
]

// Deterministic string hash so shuffles are stable per seed.
function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export default function VocabularyPage() {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [mode, setMode] = useState<Mode>('flashcard')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [shuffleSeed, setShuffleSeed] = useState(0)

  const [seen, setSeen] = useState<Set<string>>(new Set())
  const [known, setKnown] = useState<Set<string>>(new Set())
  const [correct, setCorrect] = useState<Set<string>>(new Set())

  // Filtered + shuffled list. Shuffle is deterministic given the seed so
  // re-renders never reshuffle mid-session.
  const filtered = useMemo(() => {
    const base = vocabEntries.filter(
      (entry) => difficulty === 'all' || entry.difficulty === difficulty,
    )
    if (shuffleSeed === 0) return base
    return [...base].sort((a, b) => {
      const ha = hashString(`${a.id}-${shuffleSeed}`)
      const hb = hashString(`${b.id}-${shuffleSeed}`)
      return ha - hb
    })
  }, [difficulty, shuffleSeed])

  const total = filtered.length
  const safeIndex = total > 0 ? index % total : 0
  const current: VocabEntry | undefined = filtered[safeIndex]

  // Deterministic quiz choices for the current word: pick 3 nearest others in
  // the filtered array (wrapping), then shuffle once keyed on the word's id.
  const choices = useMemo(() => {
    if (!current) return []
    const others = filtered.filter((e) => e.id !== current.id).slice(0, 8)
    if (others.length === 0) return [current]
    const picks: VocabEntry[] = []
    for (let i = 0; i < 3 && i < others.length; i++) {
      picks.push(others[i % others.length])
    }
    const unique = Array.from(new Set([current, ...picks]))
    return unique.sort((a, b) => {
      const ha = hashString(`${a.id}-${current.id}`)
      const hb = hashString(`${b.id}-${current.id}`)
      return ha - hb
    })
  }, [current, filtered])

  function resetCardState() {
    setFlipped(false)
    setSelected(null)
  }

  function goNext() {
    if (total === 0) return
    setIndex((prev) => (prev + 1) % total)
    resetCardState()
  }

  function goPrev() {
    if (total === 0) return
    setIndex((prev) => (prev - 1 + total) % total)
    resetCardState()
  }

  function changeDifficulty(value: DifficultyFilter) {
    setDifficulty(value)
    setIndex(0)
    resetCardState()
  }

  function changeMode(value: Mode) {
    setMode(value)
    setIndex(0)
    resetCardState()
  }

  function shuffle() {
    setShuffleSeed((prev) => prev + 1)
    setIndex(0)
    resetCardState()
  }

  function resetSession() {
    setSeen(new Set())
    setKnown(new Set())
    setCorrect(new Set())
    setIndex(0)
    resetCardState()
  }

  function markSeen(id: string) {
    setSeen((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  function handleStillLearning() {
    if (!current) return
    markSeen(current.id)
    goNext()
  }

  function handleKnowThis() {
    if (!current) return
    markSeen(current.id)
    setKnown((prev) => {
      const next = new Set(prev)
      next.add(current.id)
      return next
    })
    goNext()
  }

  function handleSelect(choiceWord: string) {
    if (!current || selected) return
    setSelected(choiceWord)
    markSeen(current.id)
    if (choiceWord === current.word) {
      setCorrect((prev) => {
        const next = new Set(prev)
        next.add(current.id)
        return next
      })
    }
  }

  const seenCount = seen.size
  const knownCount = known.size
  const correctCount = correct.size

  const sessionComplete = total > 0 && seenCount >= total

  return (
    <div className="space-y-5">
      <AcademyNav />

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vocabulary Trainer</h1>
        <p className="text-slate-500">120+ SAT-style academic words</p>
      </div>

      {/* Controls */}
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Difficulty</span>
          {difficultyFilters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => changeDifficulty(value)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                difficulty === value
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Mode</span>
          {modes.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => changeMode(value)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                mode === value
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="text-sm text-slate-500">{total} words</span>
          <button
            type="button"
            onClick={shuffle}
            className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Shuffle
          </button>
        </div>
      </div>

      {/* Session stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm text-slate-600">
        <span>
          Seen: {seenCount} / {total} &nbsp;&middot;&nbsp; Correct: {correctCount} &nbsp;&middot;&nbsp; Known: {knownCount}
        </span>
        <button
          type="button"
          onClick={resetSession}
          className="font-medium text-emerald-700 hover:underline"
        >
          Reset session
        </button>
      </div>

      {/* Content */}
      {total === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No words match this filter.
        </div>
      ) : sessionComplete ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-lg font-semibold text-emerald-800">Session complete!</p>
          <p className="mt-1 text-emerald-700">
            You&rsquo;ve seen all {total} words.
          </p>
          <button
            type="button"
            onClick={resetSession}
            className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Start Over
          </button>
        </div>
      ) : current ? (
        <>
          {mode === 'flashcard' && (
            <FlashcardView
              entry={current}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              onStillLearning={handleStillLearning}
              onKnowThis={handleKnowThis}
              onPrev={goPrev}
              onNext={goNext}
              position={safeIndex + 1}
              total={total}
            />
          )}

          {(mode === 'multiple-choice' || mode === 'fill-blank') && (
            <QuizView
              mode={mode}
              entry={current}
              choices={choices}
              selected={selected}
              onSelect={handleSelect}
              onNext={goNext}
            />
          )}
        </>
      ) : null}
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
      {children}
    </span>
  )
}

function FlashcardView({
  entry,
  flipped,
  onFlip,
  onStillLearning,
  onKnowThis,
  onPrev,
  onNext,
  position,
  total,
}: {
  entry: VocabEntry
  flipped: boolean
  onFlip: () => void
  onStillLearning: () => void
  onKnowThis: () => void
  onPrev: () => void
  onNext: () => void
  position: number
  total: number
}) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onFlip}
        className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition-shadow hover:shadow-md"
      >
        {!flipped ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold text-slate-900">{entry.word}</h2>
            <p className="mt-2 text-sm italic text-slate-400">{entry.pronunciation}</p>
            <div className="mt-3">
              <Badge>{entry.partOfSpeech}</Badge>
            </div>
            <p className="mt-8 text-sm text-slate-400">Tap to reveal</p>
          </div>
        ) : (
          <div className="min-h-[220px] space-y-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-2xl font-bold text-slate-900">{entry.word}</h2>
              <span className="text-sm italic text-slate-400">{entry.pronunciation}</span>
              <Badge>{entry.partOfSpeech}</Badge>
            </div>
            <p className="text-base text-slate-700">{entry.definition}</p>
            <p className="border-l-2 border-slate-200 pl-3 text-sm italic text-slate-500">
              {entry.exampleSentence}
            </p>
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
              <span className="font-semibold">Memory tip: </span>
              {entry.memoryTip}
            </div>
            {entry.relatedWords && entry.relatedWords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.relatedWords.map((word) => (
                  <span
                    key={word}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                  >
                    {word}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </button>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onStillLearning}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
        >
          Still Learning
        </button>
        <button
          type="button"
          onClick={onKnowThis}
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          I Know This!
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-md px-2 py-1 font-medium hover:bg-slate-100"
        >
          &larr; Previous
        </button>
        <span>
          Card {position} of {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md px-2 py-1 font-medium hover:bg-slate-100"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}

function QuizView({
  mode,
  entry,
  choices,
  selected,
  onSelect,
  onNext,
}: {
  mode: Mode
  entry: VocabEntry
  choices: VocabEntry[]
  selected: string | null
  onSelect: (word: string) => void
  onNext: () => void
}) {
  const answered = selected !== null
  const isCorrect = selected === entry.word

  const prompt =
    mode === 'multiple-choice'
      ? entry.definition
      : entry.exampleSentence.replace(new RegExp(entry.word, 'i'), '_______')

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          {mode === 'multiple-choice'
            ? 'Which word matches this definition?'
            : 'Which word best fills the blank?'}
        </p>
        <p className="mt-3 text-lg text-slate-800">{prompt}</p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {choices.map((choice) => {
          const isThis = choice.word === entry.word
          const isPicked = choice.word === selected
          let style = 'border-slate-200 bg-white hover:bg-slate-50'
          if (answered) {
            if (isThis) {
              style = 'border-emerald-400 bg-emerald-50'
            } else if (isPicked) {
              style = 'border-red-400 bg-red-50'
            } else {
              style = 'border-slate-200 bg-white opacity-70'
            }
          }
          return (
            <button
              key={choice.id}
              type="button"
              disabled={answered}
              onClick={() => onSelect(choice.word)}
              className={cn(
                'flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors',
                style,
              )}
            >
              <span>{choice.word}</span>
              {answered && isThis && <span className="text-emerald-600">&#10003;</span>}
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={cn(
            'rounded-lg px-4 py-3 text-sm',
            isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800',
          )}
        >
          {isCorrect ? (
            <p>
              <span className="font-semibold">Correct! </span>
              {entry.memoryTip}
            </p>
          ) : (
            <p>
              <span className="font-semibold">Not quite. </span>
              &ldquo;{entry.word}&rdquo; fits because it means {entry.definition.charAt(0).toLowerCase()}
              {entry.definition.slice(1)}
            </p>
          )}
        </div>
      )}

      {answered && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
