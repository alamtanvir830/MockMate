'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { updateGroupPrivacyInPlace } from '@/app/actions/shared-attempts'

interface Props {
  examId: string
  /** Current saved value from DB — null means not yet answered (treated as private) */
  initialShowScore: boolean | null
  initialIncludeInRankings: boolean | null
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'columns_missing'

export function GroupPrivacyPrefs({
  examId,
  initialShowScore,
  initialIncludeInRankings,
}: Props) {
  // Null defaults to false (private / excluded) as the safe fallback
  const [showScore, setShowScore] = useState<boolean>(initialShowScore ?? false)
  const [includeRankings, setIncludeRankings] = useState<boolean>(
    initialIncludeInRankings ?? false,
  )
  const [status, setStatus] = useState<SaveStatus>('idle')

  async function persist(nextShowScore: boolean, nextIncludeRankings: boolean) {
    setStatus('saving')
    const result = await updateGroupPrivacyInPlace({
      examId,
      showScoreToGroup: nextShowScore,
      includeInRankings: nextIncludeRankings,
    })
    if ('error' in result) {
      console.error('[GroupPrivacyPrefs] save failed:', result.error)
      setStatus(result.error === 'columns_missing' ? 'columns_missing' : 'error')
    } else {
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  function handleShowScore(value: boolean) {
    setShowScore(value)
    persist(value, includeRankings)
  }

  function handleIncludeRankings(value: boolean) {
    setIncludeRankings(value)
    persist(showScore, value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4 text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <CardTitle>Group Preferences</CardTitle>
          </div>

          {/* Save status indicator */}
          <div className="shrink-0 h-5 flex items-center">
            {status === 'saving' && (
              <span className="text-xs text-slate-400">Saving…</span>
            )}
            {status === 'saved' && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4.5" />
                </svg>
                Saved
              </span>
            )}
            {status === 'error' && (
              <span className="text-xs text-red-500">Failed to save — try again</span>
            )}
            {status === 'columns_missing' && (
              <span className="text-xs text-amber-600">
                Missing columns on <code className="font-mono">exam_attempts</code> — run migration in Supabase
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <div className="space-y-5">
        {/* Question 1: Score visibility */}
        <div>
          <p className="text-sm font-medium text-slate-800 mb-2.5">
            Would you like your score to be revealed to the group?
          </p>
          <div className="flex gap-2">
            <OptionButton
              selected={showScore === true}
              onClick={() => handleShowScore(true)}
              label="Reveal my score"
              activeClass="border-indigo-300 bg-indigo-50 text-indigo-700"
            />
            <OptionButton
              selected={showScore === false}
              onClick={() => handleShowScore(false)}
              label="Keep my score private"
              activeClass="border-slate-300 bg-slate-100 text-slate-700"
            />
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Question 2: Rankings */}
        <div>
          <p className="text-sm font-medium text-slate-800 mb-0.5">
            Would you like to be included in the group rankings?
          </p>
          <p className="text-xs text-slate-400 mb-2.5">
            Your score will not be shown in rankings.
          </p>
          <div className="flex gap-2">
            <OptionButton
              selected={includeRankings === true}
              onClick={() => handleIncludeRankings(true)}
              label="Include me in rankings"
              activeClass="border-indigo-300 bg-indigo-50 text-indigo-700"
            />
            <OptionButton
              selected={includeRankings === false}
              onClick={() => handleIncludeRankings(false)}
              label="Do not include me in rankings"
              activeClass="border-slate-300 bg-slate-100 text-slate-700"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

function OptionButton({
  selected,
  onClick,
  label,
  activeClass,
}: {
  selected: boolean
  onClick: () => void
  label: string
  activeClass: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors text-center',
        selected ? activeClass : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50',
      )}
    >
      {label}
    </button>
  )
}
