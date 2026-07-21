'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadAllAttempts, deleteAttempt, type PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { syncLocalSatAttemptsToSupabase, type SyncResult } from '@/lib/premade-exams/sat/sync-to-supabase'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function resultsLink(attempt: PremadeAttempt): string {
  const m = attempt.examId?.match(/sat-form-(\d+)/)
  const formNum = m ? m[1] : '1'
  return `/premade/sat/form-${formNum}/results/${attempt.id}`
}

interface InProgressRow {
  local_attempt_id: string
  form_number: number
  answers: Record<string, string>
  started_at: string
  last_saved_at: string
  current_phase_tag: string | null
  rw_m2_type: string | null
  math_m2_type: string | null
}

export function PremadeAttemptsSection({ inProgressAttempts = [] }: { inProgressAttempts?: InProgressRow[] }) {
  const [attempts, setAttempts] = useState<PremadeAttempt[]>([])
  const [loaded, setLoaded] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  function handleDelete(id: string) {
    deleteAttempt(id)
    setAttempts(prev => prev.filter(a => a.id !== id))
    setConfirmDeleteId(null)
  }

  useEffect(() => {
    setAttempts(loadAllAttempts())
    setLoaded(true)
  }, [])

  async function handleManualSync() {
    setSyncing(true)
    setSyncResult(null)
    try {
      const result = await syncLocalSatAttemptsToSupabase()
      setSyncResult(result)
    } catch {
      setSyncResult({ found: 0, newlyInserted: 0, alreadySynced: 0, errors: ['Sync failed — check your connection.'] })
    } finally {
      setSyncing(false)
    }
  }

  if (!loaded) return null

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">SAT Practice Exams</h2>
          <p className="text-xs text-slate-500 mt-0.5">Results are saved locally in this browser</p>
        </div>
        {attempts.length > 0 && (
          <div className="flex flex-col items-end gap-1 shrink-0">
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50 transition-colors"
            >
              {syncing ? 'Syncing…' : 'Sync to account ↑'}
            </button>
            {syncResult && (
              <div className="text-right">
                {syncResult.errors.length > 0 ? (
                  <p className="text-[10px] text-red-500">{syncResult.errors[0]}</p>
                ) : (
                  <p className="text-[10px] text-slate-400">
                    {syncResult.found} found · {syncResult.newlyInserted} uploaded · {syncResult.alreadySynced} already synced
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {inProgressAttempts.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">In Progress</h3>
          <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
            {inProgressAttempts.map((row) => {
              const formNum = row.form_number
              const answeredCount = Object.values(row.answers ?? {}).filter(v => v?.trim()).length
              const resumeHref = `/premade/sat/form-${formNum}`
              return (
                <div key={row.local_attempt_id} className="flex items-center gap-4 px-6 py-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900 truncate">SAT Practice — Form {formNum}</p>
                      <span className="shrink-0 inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-medium text-amber-700">
                        In Progress
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {answeredCount} answers saved · Last saved {formatDate(row.last_saved_at)}
                    </p>
                  </div>
                  <Link
                    href={resumeHref}
                    className="shrink-0 text-sm font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition-colors"
                  >
                    Resume →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {attempts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-indigo-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <p className="font-medium text-slate-700">No SAT practice exam attempts yet</p>
            <p className="mt-1 text-sm text-slate-400">Complete a premade SAT exam to see your results here</p>
            <Link
              href="/premade/sat"
              className="inline-block mt-4 text-sm font-medium text-[#1d4ed8] hover:underline"
            >
              Browse SAT practice exams →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className="flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 truncate">{attempt.examTitle}</p>
                    <span className="shrink-0 inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600">
                      SAT Practice
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {formatDate(attempt.completedAt)}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-center shrink-0">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">RW</p>
                    <p className="text-[15px] font-bold text-slate-900">{attempt.rwScaled}</p>
                  </div>
                  <div className="text-slate-200 font-light">+</div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Math</p>
                    <p className="text-[15px] font-bold text-slate-900">{attempt.mathScaled}</p>
                  </div>
                  <div className="text-slate-200 font-light">=</div>
                  <div className="bg-[#1b3a5c] text-white rounded-lg px-3 py-1.5 text-center">
                    <p className="text-[10px] text-white/60 uppercase tracking-widest">Total</p>
                    <p className="text-[17px] font-bold leading-tight">{attempt.totalScore}</p>
                  </div>
                </div>

                <div className="sm:hidden text-right shrink-0">
                  <p className="text-[17px] font-bold text-slate-900">{attempt.totalScore}</p>
                  <p className="text-[10px] text-slate-400">/ 1600</p>
                </div>

                {confirmDeleteId === attempt.id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-500">Delete?</span>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(attempt.id)}
                      className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={resultsLink(attempt)}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      View results
                    </Link>
                    <button
                      onClick={() => setConfirmDeleteId(attempt.id)}
                      aria-label="Delete attempt"
                      className="text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
