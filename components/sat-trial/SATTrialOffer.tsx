'use client'

import { useState } from 'react'

export function SATTrialOffer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleStartTrial() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/create-trial-checkout', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-indigo-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Limited Offer</span>
          <h3 className="text-white font-bold text-[16px] mt-0.5">7-Day Free SAT Premium Trial</h3>
        </div>
        <span className="bg-amber-400 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full">
          FREE for 7 days
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        <p className="text-[13px] text-slate-700 mb-3 leading-relaxed">
          Unlock everything MockMate has to offer — free for one week. Card required; cancel before 7 days and you won&apos;t be charged.
        </p>
        <ul className="text-[12px] text-slate-600 space-y-1.5 mb-4">
          {[
            'All 5 SAT Practice Forms (Forms 1–5)',
            '700+ SAT Question Bank questions',
            'SAT R&W Academy & Math Academy',
            'Personalized Practice Path',
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 shrink-0 text-indigo-500 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {error && (
          <p className="text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
            {error}
          </p>
        )}

        <button
          onClick={handleStartTrial}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Starting trial…
            </>
          ) : (
            'Start 7-Day Free Trial →'
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center mt-2.5 leading-relaxed">
          $9.99/month after trial. Cancel anytime. Card required to prevent abuse.
        </p>
      </div>
    </div>
  )
}
