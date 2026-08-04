'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Displays live HH:MM:SS countdowns for Form 4 free access windows.
// The countdowns are informational only — server validates actual access on every request.
// Ticks every second; stops at 0 without reloading.

function computeSeconds(expiresAt: string): number {
  return Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
}

function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '0:00:00'
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function formatLocalExpiry(expiresAt: string): string {
  try {
    return new Date(expiresAt).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
  } catch {
    return expiresAt
  }
}

function useCountdown(expiresAt: string) {
  const [, setTick] = useState(0)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    ref.current = setInterval(() => {
      setTick((t) => t + 1)
      if (computeSeconds(expiresAt) === 0 && ref.current) clearInterval(ref.current)
    }, 1000)
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [expiresAt])

  return computeSeconds(expiresAt)
}

// ── Large amber banner for the top of /premade/sat ────────────────────────────

interface BannerProps {
  expiresAt: string
}

export function Form4CountdownBanner({ expiresAt }: BannerProps) {
  const secs = useCountdown(expiresAt)

  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-amber-900 text-sm">
            SAT Form 4 is free for 72 hours
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            Start Form 4 before the promotional window ends. An exam started before expiration can still be completed afterward.
          </p>
          <p className="text-xs text-amber-600 mt-1">
            Expires: {formatLocalExpiry(expiresAt)}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100 px-3 py-1.5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-amber-700 shrink-0" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <time
            aria-live="off"
            className="text-sm font-bold text-amber-800 tabular-nums"
            dateTime={expiresAt}
          >
            {secs === 0 ? 'Expired' : `${formatCountdown(secs)} remaining`}
          </time>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard banner with built-in action button ─────────────────────────────

interface DashboardBannerProps {
  expiresAt: string
  actionHref: string
  actionLabel: string
}

export function Form4DashboardBanner({ expiresAt, actionHref, actionLabel }: DashboardBannerProps) {
  const secs = useCountdown(expiresAt)

  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
            SAT Form 4 — Free Access
          </p>
          <p className="text-[15px] font-bold text-amber-900 leading-snug mb-1">
            SAT Form 4 is free for 72 hours
          </p>
          <p className="text-[12px] text-amber-700 leading-relaxed">
            Start Form 4 before the promotional window ends. An exam started before expiration can still be completed afterward.
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-amber-600 shrink-0" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <time
              aria-live="off"
              className="text-sm font-bold text-amber-800 tabular-nums"
              dateTime={expiresAt}
            >
              {secs === 0 ? 'Expired' : `${formatCountdown(secs)} remaining`}
            </time>
          </div>
          <p className="text-[11px] text-amber-600 mt-0.5">
            Expires: {formatLocalExpiry(expiresAt)}
          </p>
        </div>
        <Link href={actionHref} className="shrink-0 sm:mt-1">
          <button className="w-full sm:w-auto rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 transition-colors whitespace-nowrap min-h-[44px]">
            {actionLabel} →
          </button>
        </Link>
      </div>
    </div>
  )
}

// ── Compact inline badge for the Form 4 card ─────────────────────────────────

interface BadgeProps {
  expiresAt: string
  className?: string
}

export function Form4CountdownBadge({ expiresAt, className }: BadgeProps) {
  const secs = useCountdown(expiresAt)

  if (secs === 0) {
    return (
      <span className={className ?? 'inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500'}>
        Expired
      </span>
    )
  }

  return (
    <span className={className ?? 'inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 tabular-nums'}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
      <time aria-live="off" dateTime={expiresAt} className="tabular-nums">
        {formatCountdown(secs)} remaining
      </time>
    </span>
  )
}
