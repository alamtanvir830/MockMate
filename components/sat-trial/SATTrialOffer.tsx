'use client'

import { useState } from 'react'

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

const BENEFITS = [
  'All 5 SAT Practice Forms (Forms 1–5)',
  '700+ SAT Question Bank questions',
  'SAT R&W Academy & Math Academy',
  'Personalized Practice Path',
]

export function SATTrialOffer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleStartTrial() {
    if (loading) return
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
    <div className="mm-trial-float">
      <div
        className="rounded-[18px] overflow-hidden"
        style={{
          background: '#fffdf7',
          border: '1.5px solid #f59e0b',
          boxShadow: '0 0 0 4px rgba(245,158,11,0.10), 0 4px 24px 0 rgba(120,80,0,0.08)',
        }}
      >
        {/* ── Gold header strip ─────────────────────────────────────── */}
        <div
          className="px-7 py-6"
          style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            borderBottom: '1.5px solid #f59e0b',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            {/* Left: icon + label + heading */}
            <div className="flex items-start gap-4 min-w-0">
              <div
                className="shrink-0 mt-0.5 h-11 w-11 rounded-full flex items-center justify-center"
                style={{ background: '#fef9c3', border: '2px solid #f59e0b' }}
              >
                <StarIcon className="h-5 w-5 text-amber-500" />
              </div>
              <div className="min-w-0">
                <span
                  className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: '#92400e' }}
                >
                  Limited Offer
                </span>
                <h3
                  className="text-[18px] sm:text-[20px] font-bold leading-snug"
                  style={{ color: '#0f172a' }}
                >
                  Try everything in SAT Premium free for 7 days
                </h3>
              </div>
            </div>

            {/* Right: badge */}
            <span
              className="shrink-0 mt-1 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ background: '#f59e0b', color: '#1c1917' }}
            >
              FREE for 7 days
            </span>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className="px-7 py-6">
          {/* Benefits grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
            {BENEFITS.map(item => (
              <li key={item} className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                <span className="text-[13px] font-medium" style={{ color: '#1e293b' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {error && (
            <p className="text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleStartTrial}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 font-semibold text-[15px] text-white rounded-xl transition-all disabled:opacity-60 focus-visible:outline-none"
            style={{
              background: '#0f172a',
              padding: '16px 24px',
              boxShadow: '0 2px 8px rgba(15,23,42,0.18)',
            }}
            onMouseEnter={e => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 2px #f59e0b, 0 4px 12px rgba(15,23,42,0.22)'
              }
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.transform = ''
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(15,23,42,0.18)'
            }}
            onFocus={e => {
              ;(e.currentTarget as HTMLButtonElement).style.outline = '2px solid #f59e0b'
              ;(e.currentTarget as HTMLButtonElement).style.outlineOffset = '3px'
            }}
            onBlur={e => {
              ;(e.currentTarget as HTMLButtonElement).style.outline = ''
              ;(e.currentTarget as HTMLButtonElement).style.outlineOffset = ''
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Starting trial…
              </>
            ) : (
              <>
                <StarIcon className="h-4 w-4 text-amber-400" />
                Start your 7-day free trial
              </>
            )}
          </button>

          {/* Disclosure */}
          <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
            Credit card required. $0 today, then $9.99/month after your 7-day trial. Cancel before the trial ends to avoid being charged.
          </p>
        </div>
      </div>
    </div>
  )
}
