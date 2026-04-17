'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AnkiCard, IncorrectQuestion } from '@/lib/ai/generate-anki-cards'

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

function downloadCSV(cards: AnkiCard[], examTitle: string) {
  const rows = [
    'Front,Back',
    ...cards.map((c) => `${csvEscape(c.front)},${csvEscape(c.back)}`),
  ]
  const csv = rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${examTitle.replace(/\s+/g, '-').toLowerCase()}-anki.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface Props {
  incorrectQuestions: IncorrectQuestion[]
  subject: string
  examTitle: string
}

type State = 'prompt' | 'loading' | 'preview' | 'declined' | 'error'

export function AnkiSection({ incorrectQuestions, subject, examTitle }: Props) {
  const [state, setState] = useState<State>('prompt')
  const [cards, setCards] = useState<AnkiCard[]>([])
  // Set of indices that are currently selected; starts fully populated after generation
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [validationMsg, setValidationMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  if (incorrectQuestions.length === 0) return null

  async function handleGenerate() {
    setState('loading')
    setValidationMsg('')
    try {
      const res = await fetch('/api/anki', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: incorrectQuestions, subject }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `Server error ${res.status}`)
      }
      const data = await res.json()
      const generated: AnkiCard[] = data.cards ?? []
      setCards(generated)
      // Default: all cards selected
      setSelected(new Set(generated.map((_, i) => i)))
      setState('preview')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Unknown error')
      setState('error')
    }
  }

  function toggleCard(index: number) {
    setValidationMsg('')
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  function toggleAll() {
    setValidationMsg('')
    if (selected.size === cards.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(cards.map((_, i) => i)))
    }
  }

  function handleDownload() {
    if (selected.size === 0) {
      setValidationMsg('Please select at least one card.')
      return
    }
    const chosenCards = cards.filter((_, i) => selected.has(i))
    downloadCSV(chosenCards, examTitle)
  }

  if (state === 'declined') return null

  const allSelected = selected.size === cards.length
  const someSelected = selected.size > 0 && selected.size < cards.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4 text-violet-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <div>
            <CardTitle>Anki Flashcards</CardTitle>
            <CardDescription>
              {state === 'preview'
                ? `${cards.length} card${cards.length !== 1 ? 's' : ''} generated from your incorrect answers`
                : `Generate cards from your ${incorrectQuestions.length} incorrect answer${incorrectQuestions.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* ── Prompt ── */}
      {state === 'prompt' && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="flex-1 text-sm text-slate-600">
            Would you like Anki cards generated from your incorrect answers?
          </p>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" onClick={handleGenerate}>
              Yes, generate
            </Button>
            <Button size="sm" variant="outline" onClick={() => setState('declined')}>
              No thanks
            </Button>
          </div>
        </div>
      )}

      {/* ── Loading ── */}
      {state === 'loading' && (
        <div className="flex items-center gap-2.5 text-sm text-slate-500">
          <svg
            className="animate-spin h-4 w-4 shrink-0 text-violet-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Generating your Anki deck…
        </div>
      )}

      {/* ── Preview & selection ── */}
      {state === 'preview' && (
        <div className="space-y-4">
          {/* Instruction + select-all row */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Which cards would you like to generate for your Anki deck?
            </p>
            <button
              type="button"
              onClick={toggleAll}
              className="shrink-0 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>
          </div>

          {/* Card list */}
          <div className="space-y-2">
            {cards.map((card, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleCard(i)}
                className={cn(
                  'w-full text-left rounded-xl border px-4 py-3 transition-colors',
                  'flex items-start gap-3',
                  selected.has(i)
                    ? 'border-violet-200 bg-violet-50'
                    : 'border-slate-200 bg-white hover:bg-slate-50',
                )}
              >
                {/* Checkbox */}
                <span
                  className={cn(
                    'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                    selected.has(i)
                      ? 'border-violet-600 bg-violet-600'
                      : 'border-slate-300 bg-white',
                  )}
                >
                  {selected.has(i) && (
                    <svg
                      fill="none"
                      viewBox="0 0 12 12"
                      stroke="white"
                      strokeWidth={2.5}
                      className="h-2.5 w-2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </span>

                {/* Front / Back columns */}
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">
                      Front
                    </p>
                    <p className="text-sm text-slate-800 leading-snug">{card.front}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">
                      Back
                    </p>
                    <p className="text-sm text-slate-600 leading-snug">{card.back}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Download row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
            <div className="flex-1">
              <p className="text-xs text-slate-400">
                {selected.size} of {cards.length} card{cards.length !== 1 ? 's' : ''} selected
                {someSelected && ' — unselected cards will not be included'}
              </p>
              {validationMsg && (
                <p className="mt-0.5 text-xs text-red-500">{validationMsg}</p>
              )}
            </div>
            <Button size="sm" onClick={handleDownload} className="shrink-0">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download Anki CSV
            </Button>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {state === 'error' && (
        <div className="space-y-3">
          <p className="text-sm text-red-600">
            Card generation failed: {errorMsg}. Please try again.
          </p>
          <Button size="sm" variant="outline" onClick={handleGenerate}>
            Retry
          </Button>
        </div>
      )}
    </Card>
  )
}
