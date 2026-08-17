'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

function getMsRemaining(expiresAt: string): number {
  return Math.max(0, new Date(expiresAt).getTime() - Date.now())
}

interface Parts {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function toParts(ms: number): Parts {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const totalSeconds = Math.floor(ms / 1000)
  const days    = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours   = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds, expired: false }
}

// Full prose: "35 hours and 59 minutes" / "59 minutes and 42 seconds"
// Seconds shown only in the final hour.
function toBannerText({ days, hours, minutes, seconds }: Parts): string {
  const showSeconds = days === 0 && hours === 0
  const parts: string[] = []
  if (days > 0)    parts.push(`${days} day${days !== 1 ? 's' : ''}`)
  if (hours > 0)   parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
  if (showSeconds) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)
  if (parts.length === 0) return 'less than 1 second'
  if (parts.length === 1) return parts[0]
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`
  return `${parts[0]}, ${parts[1]}, and ${parts[2]}`
}

// Compact HH:MM:SS or MM:SS in the final minute
function toBadgeText({ days, hours, minutes, seconds }: Parts): string {
  const showSeconds = days === 0 && hours === 0
  const parts: string[] = []
  if (days > 0)    parts.push(`${days}d`)
  if (hours > 0)   parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (showSeconds) parts.push(`${seconds}s`)
  return parts.length > 0 ? parts.join(' ') : '< 1s'
}

function useCountdown(expiresAt: string) {
  const router = useRouter()
  const [ms, setMs] = useState(() => getMsRemaining(expiresAt))
  const refreshedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const tick = () => {
      const remaining = getMsRemaining(expiresAt)
      setMs(remaining)
      if (remaining === 0 && !refreshedRef.current) {
        refreshedRef.current = true
        router.refresh()
      }
    }

    intervalRef.current = setInterval(tick, 1_000)
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [expiresAt, router])

  return ms
}

// ── Dashboard top banner ──────────────────────────────────────────────────────

export function RollingPromoDashboardBanner({
  expiresAt,
  formNumber,
  actionHref,
  actionLabel,
}: {
  expiresAt: string
  formNumber: number
  actionHref: string
  actionLabel: string
}) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 flex flex-col sm:flex-row sm:items-start gap-4 flex-wrap">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-1">
          SAT Form {formNumber} — Free Access
        </p>
        <p className="text-[15px] font-bold text-brand-900 leading-snug mb-1">
          {parts.expired
            ? `Your free access to SAT Form ${formNumber} has expired.`
            : `SAT Form ${formNumber} is free for 24 hours — start before your window closes.`}
        </p>
        <p className="text-[12px] text-brand-700 leading-relaxed">
          {parts.expired
            ? 'Get SAT Premium to unlock all 10 exam forms.'
            : `${toBannerText(parts)} remaining in your personal access window.`}
        </p>
      </div>
      <a href={actionHref} className="shrink-0 sm:mt-1">
        <button className="w-full sm:w-auto rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-5 py-2.5 transition-colors whitespace-nowrap min-h-[44px]">
          {actionLabel} →
        </button>
      </a>
    </div>
  )
}

// ── SAT forms page countdown banner (full-width, above the grid) ──────────────

export function RollingPromoCountdownBanner({
  expiresAt,
  formNumber,
}: {
  expiresAt: string
  formNumber: number
}) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  if (parts.expired) return null

  return (
    <div className="rounded-xl bg-brand-50 border border-brand-200 px-5 py-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-0.5">
          Personal Access Window — SAT Form {formNumber}
        </p>
        <p className="text-[13px] text-brand-800 font-medium">
          Your 24-hour free window expires in{' '}
          <span className="font-bold">{toBannerText(parts)}</span>.
        </p>
      </div>
      <span className="text-[11px] text-brand-600 shrink-0 font-medium">
        Take Form {formNumber} before time runs out
      </span>
    </div>
  )
}

// ── Compact badge countdown (inside a card chip) ──────────────────────────────

export function RollingPromoCountdownBadge({ expiresAt }: { expiresAt: string }) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  if (parts.expired) return <>expired</>

  return <>{toBadgeText(parts)} left</>
}
