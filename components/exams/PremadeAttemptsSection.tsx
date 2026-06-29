'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadAllAttempts, type PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function PremadeAttemptsSection() {
  const [attempts, setAttempts] = useState<PremadeAttempt[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setAttempts(loadAllAttempts())
    setLoaded(true)
  }, [])

  if (!loaded) return null

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Premade Exams</h2>
        <p className="text-xs text-slate-500 mt-0.5">Official practice tests — results are saved locally in this browser</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {attempts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-indigo-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <p className="font-medium text-slate-700">No premade exam attempts yet</p>
            <p className="mt-1 text-sm text-slate-400">Complete a premade exam to see your results here</p>
            <Link
              href="/premade/sat"
              className="inline-block mt-4 text-sm font-medium text-[#1d4ed8] hover:underline"
            >
              Browse premade exams →
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
                      Official
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

                <Link
                  href={`/premade/sat/form-1/results/${attempt.id}`}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors shrink-0"
                >
                  View results
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
