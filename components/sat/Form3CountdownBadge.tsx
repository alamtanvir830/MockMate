'use client'

import { useEffect, useRef, useState } from 'react'

// Displays a live HH:MM:SS countdown badge for the Form 3 promotion window.
// The countdown is informational only — server validates actual access on every request.
// Ticks every second; stops at 0 without reloading.

interface Props {
  endsAt: string   // ISO 8601 UTC timestamp from the trusted server-side promotion row
  className?: string
}

function computeSeconds(endsAt: string): number {
  return Math.max(0, Math.floor((new Date(endsAt).getTime() - Date.now()) / 1000))
}

function format(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function Form3CountdownBadge({ endsAt, className }: Props) {
  const [secs, setSecs] = useState(() => computeSeconds(endsAt))
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    ref.current = setInterval(() => {
      const remaining = computeSeconds(endsAt)
      setSecs(remaining)
      if (remaining === 0 && ref.current) clearInterval(ref.current)
    }, 1000)
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [endsAt])

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
      {format(secs)} remaining
    </span>
  )
}
