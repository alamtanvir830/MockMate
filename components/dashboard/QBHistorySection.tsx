'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { loadAllQBHistory, type QBHistoryEntry } from '@/lib/question-bank/history'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function AccuracyColor(acc: number) {
  if (acc >= 80) return 'text-emerald-600'
  if (acc >= 60) return 'text-amber-600'
  return 'text-red-500'
}

export function QBHistorySection() {
  const [entries, setEntries] = useState<QBHistoryEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setEntries(loadAllQBHistory().slice(0, 5))
    setLoaded(true)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Question Bank History</h2>
          <p className="text-xs text-slate-500 mt-0.5">Review your previous targeted practice sets.</p>
        </div>
        {entries.length > 0 && (
          <Link
            href="/question-bank/history"
            className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
          >
            View all
          </Link>
        )}
      </div>

      {!loaded ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-3 text-sm text-slate-400">
          <svg className="animate-spin h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading…
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-500 text-sm font-medium">No question bank practice sets yet.</p>
          <p className="text-slate-400 text-xs mt-1">Complete an SAT or MCAT practice set to see your history here.</p>
          <Link
            href="/question-bank"
            className="inline-block mt-4 text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
          >
            Start Question Bank Practice
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {entries.map(entry => (
            <div key={entry.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <span className={cn(
                'shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold border',
                entry.test === 'SAT'
                  ? 'text-blue-700 bg-blue-50 border-blue-200'
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200',
              )}>
                {entry.test}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{entry.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {entry.subtitle} · {entry.mode} · {formatDate(entry.completedAt)}
                </p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className={cn('text-sm font-bold', AccuracyColor(entry.accuracy))}>
                  {entry.correctCount}/{entry.totalQuestions}
                </p>
                <p className="text-xs text-slate-400">{entry.accuracy}%</p>
              </div>
              <Link
                href={entry.reviewUrl}
                className="shrink-0 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                Review
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
