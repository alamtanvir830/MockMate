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
  expired: boolean
}

function toParts(ms: number): Parts {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, expired: true }
  const totalMinutes = Math.floor(ms / (1000 * 60))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60
  return { days, hours, minutes, expired: false }
}

// "2 days, 23 hours, and 41 minutes" / "23 hours and 41 minutes" / "41 minutes" / "less than 1 minute"
function toBannerText({ days, hours, minutes }: Parts): string {
  const parts: string[] = []
  if (days > 0)    parts.push(`${days} day${days !== 1 ? 's' : ''}`)
  if (hours > 0)   parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
  if (parts.length === 0) return 'less than 1 minute'
  if (parts.length === 1) return parts[0]
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`
  return `${parts[0]}, ${parts[1]}, and ${parts[2]}`
}

// "2d 23h 41m" / "23h 41m" / "41m" / "< 1m"
function toBadgeText({ days, hours, minutes }: Parts): string {
  const parts: string[] = []
  if (days > 0)    parts.push(`${days}d`)
  if (hours > 0)   parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  return parts.length > 0 ? parts.join(' ') : '< 1m'
}

function useCountdown(expiresAt: string) {
  const router = useRouter()
  const [ms, setMs] = useState(() => getMsRemaining(expiresAt))
  const refreshedRef = useRef(false)

  useEffect(() => {
    const tick = () => {
      const remaining = getMsRemaining(expiresAt)
      setMs(remaining)
      if (remaining === 0 && !refreshedRef.current) {
        refreshedRef.current = true
        router.refresh()
      }
    }
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [expiresAt, router])

  return ms
}

// Full-sentence countdown for the dashboard top banner.
// Renders inline — the parent <p> provides styling.
// Example: "You have 2 days, 23 hours, and 41 minutes to complete SAT Form 1"
// On expire: "Your free access to SAT Form 1 has expired."
export function SatForm1BannerCountdown({ expiresAt }: { expiresAt: string }) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  if (parts.expired) {
    return (
      <>
        Your free access to SAT Form 1 has expired.{' '}
        <Link href="/billing" className="underline font-bold">
          Get Unlimited Access
        </Link>
      </>
    )
  }

  return <>You have {toBannerText(parts)} to complete SAT Form 1</>
}

// Compact badge countdown for card chips.
// Example: "2d 23h 41m left"
// On expire: "expired"
export function SatForm1BadgeCountdown({ expiresAt }: { expiresAt: string }) {
  const ms = useCountdown(expiresAt)
  const parts = toParts(ms)

  if (parts.expired) return <>expired</>

  return <>{toBadgeText(parts)} left</>
}
