'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { loadAllQBHistory, type QBHistoryEntry } from '@/lib/question-bank/history'
import { syncLocalQBHistoryToSupabase, hasUnsyncedQBHistory } from '@/lib/question-bank/sync-to-supabase'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function QBHistoryPage() {
  const [entries, setEntries] = useState<QBHistoryEntry[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<'all' | 'SAT' | 'MCAT'>('all')
  const [hasUnsynced, setHasUnsynced] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  useEffect(() => {
    setEntries(loadAllQBHistory())
    setLoaded(true)
    setHasUnsynced(hasUnsyncedQBHistory())
  }, [])

  async function handleManualSync() {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const result = await syncLocalQBHistoryToSupabase()
      if (result.errors.length > 0) {
        setSyncMsg(`Synced ${result.newlyInserted} set(s). Some errors occurred.`)
      } else if (result.newlyInserted > 0) {
        setSyncMsg(`Restored ${result.newlyInserted} practice set(s) to your account.`)
      } else {
        setSyncMsg('All history is already synced.')
      }
      setHasUnsynced(hasUnsyncedQBHistory())
    } catch {
      setSyncMsg('Sync failed. Please try again.')
    } finally {
      setSyncing(false)
    }
  }

  const filtered = filter === 'all' ? entries : entries.filter(e => e.test === filter)

  return (
    <div className="w-full">
      {/* Breadcrumb + header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">Practice History</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Question Bank History</h1>
        <p className="text-slate-500 text-sm mt-1">All your previous SAT and MCAT question bank practice sets.</p>
      </div>

      {/* Manual sync banner */}
      {(hasUnsynced || syncMsg) && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
          {syncMsg ? (
            <span className="flex-1 text-slate-600">{syncMsg}</span>
          ) : (
            <span className="flex-1 text-slate-600">You have local practice history that hasn&apos;t been saved to your account.</span>
          )}
          {!syncMsg && (
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-60"
            >
              {syncing ? 'Syncing…' : 'Import old history'}
            </button>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(['all', 'SAT', 'MCAT'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors',
              filter === f
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700',
            )}
          >
            {f === 'all' ? 'All' : f}
            {loaded && (
              <span className={cn(
                'ml-1.5 text-xs font-semibold rounded-full px-1.5',
                filter === f ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500',
              )}>
                {f === 'all' ? entries.length : entries.filter(e => e.test === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {!loaded ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 flex items-center justify-center gap-3 text-sm text-slate-400">
          <svg className="animate-spin h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading history…
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <p className="font-medium text-slate-700">No practice sets yet.</p>
          <p className="mt-1 text-sm text-slate-400">
            {filter !== 'all'
              ? `No ${filter} practice sets found.`
              : 'Complete a practice set to see it here.'}
          </p>
          <Link
            href="/question-bank"
            className="inline-block mt-4 text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
          >
            Start Question Bank Practice
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {filtered.map(entry => (
            <div key={entry.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <span className={cn(
                'shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold border',
                entry.test === 'SAT'
                  ? 'text-blue-700 bg-blue-50 border-blue-200'
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200',
              )}>
                {entry.test}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{entry.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {entry.subtitle} · {entry.mode} · {formatDate(entry.completedAt)}
                </p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className={cn(
                  'text-sm font-bold',
                  entry.accuracy >= 80 ? 'text-emerald-600' : entry.accuracy >= 60 ? 'text-amber-600' : 'text-red-500',
                )}>
                  {entry.correctCount}/{entry.totalQuestions}
                </p>
                <p className="text-xs text-slate-400">{entry.accuracy}% accuracy</p>
              </div>
              <Link
                href={entry.reviewUrl}
                className="shrink-0 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
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
