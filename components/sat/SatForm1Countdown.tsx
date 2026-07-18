'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds, expired: false }
}

// Full prose: "47 hours and 59 minutes" / "59 minutes and 42 seconds" / "42 seconds"
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

// Compact: "47h 59m" / "59m 42s" / "< 1s"
// Seconds shown only in the final hour.
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

    // 1-second tick so seconds remain accurate
    intervalRef.current = setInterval(tick, 1_000)
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [expiresAt, router])

  return ms
}

// Full-sentence countdown for the dashboard top banner.
// Renders inline — the parent <p> provides styling.
// Example: "You have 47 hours and 59 minutes to complete SAT Form 1"
// On expire: "Your free access to SAT Form 1 has expired."
export function SatForm1BannerCountdown({ expiresAt }: { expiresAt: string }) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  if (parts.expired) {
    return (
      <>
        Your free 48-hour access to SAT Form 1 has expired.{' '}
        <Link href="/billing" className="underline font-bold">
          Get SAT Premium
        </Link>
      </>
    )
  }

  return <>You have {toBannerText(parts)} to complete SAT Form 1</>
}

// Compact badge countdown for card chips.
// Example: "47h 59m left"
// On expire: "expired"
export function SatForm1BadgeCountdown({ expiresAt }: { expiresAt: string }) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  if (parts.expired) return <>expired</>

  return <>{toBadgeText(parts)} left</>
}
