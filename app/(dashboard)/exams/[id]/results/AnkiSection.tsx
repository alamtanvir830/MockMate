'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

type State = 'prompt' | 'loading' | 'done' | 'declined' | 'error'

export function AnkiSection({ incorrectQuestions, subject, examTitle }: Props) {
  const [state, setState] = useState<State>('prompt')
  const [cards, setCards] = useState<AnkiCard[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  // Nothing to do if there are no incorrect answers
  if (incorrectQuestions.length === 0) return null

  async function handleGenerate() {
    setState('loading')
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
      setCards(data.cards ?? [])
      setState('done')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Unknown error')
      setState('error')
    }
  }

  if (state === 'declined') return null

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
              Generate cards from your {incorrectQuestions.length} incorrect answer
              {incorrectQuestions.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

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

      {state === 'done' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Your Anki deck was generated from your incorrect answers.{' '}
            <span className="text-slate-400">
              {cards.length} card{cards.length !== 1 ? 's' : ''} created.
            </span>
          </p>
          <Button size="sm" onClick={() => downloadCSV(cards, examTitle)}>
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
      )}

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
