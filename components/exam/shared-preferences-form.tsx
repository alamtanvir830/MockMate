'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { saveSharedExamPreferences } from '@/app/actions/shared-attempts'

interface Props {
  examId: string
  examTitle: string
}

function YesNoToggle({
  value,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
}: {
  value: boolean | null
  onChange: (v: boolean) => void
  yesLabel?: string
  noLabel?: string
}) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
          value === false
            ? 'border-slate-800 bg-slate-800 text-white'
            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
        )}
      >
        {noLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          'flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors',
          value === true
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
        )}
      >
        {yesLabel}
      </button>
    </div>
  )
}

export function SharedPreferencesForm({ examId, examTitle }: Props) {
  const [showScore, setShowScore] = useState<boolean | null>(null)
  const [includeRankings, setIncludeRankings] = useState<boolean | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = showScore !== null && includeRankings !== null

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    setError('')
    const result = await saveSharedExamPreferences({
      examId,
      showScoreToGroup: showScore!,
      includeInRankings: includeRankings!,
    })
    if (result?.error) {
      setError(result.error)
      setSubmitting(false)
    }
    // on success, server action calls redirect()
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-1">Shared exam</p>
        <h1 className="text-2xl font-bold text-slate-900">One last step</h1>
        <p className="mt-1 text-sm text-slate-500">
          Before viewing your results for <strong>{examTitle}</strong>, set your visibility
          preferences for this group.
        </p>
      </div>

      {/* Q1 — Score visibility */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mt-0.5">
            1
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900 leading-snug">
              Would you like your score to be revealed to the entire group?
            </p>
            <p className="text-sm text-slate-500 mt-1">
              If yes, other group members will be able to see your exact percentage.
            </p>
            <YesNoToggle
              value={showScore}
              onChange={setShowScore}
              yesLabel="Yes, share my score"
              noLabel="No, keep it private"
            />
          </div>
        </div>
      </Card>

      {/* Q2 — Rankings */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mt-0.5">
            2
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900 leading-snug">
              Would you like to be part of the group rankings?
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Your score will not be shown — only your ranking relative to other group members.
              Your score visibility is controlled separately by question 1.
            </p>
            <YesNoToggle
              value={includeRankings}
              onChange={setIncludeRankings}
              yesLabel="Yes, include me"
              noLabel="No, exclude me"
            />
          </div>
        </div>
      </Card>

      {/* Incomplete hint */}
      {!canSubmit && (
        <p className="text-center text-xs text-slate-400">
          Please answer both questions to continue.
        </p>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        loading={submitting}
        className="w-full"
      >
        Save and view my results
      </Button>
    </div>
  )
}
