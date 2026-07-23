'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface Testimonial {
  initials: string
  score: number
  quote: string
}

interface Props {
  testimonials: Testimonial[]
  /** Total animation duration for one full loop in seconds (desktop) */
  durationSeconds: number
}

// Target comfortable reading speed for mobile vertical scroll
const MOBILE_PX_PER_SECOND = 35

export function TestimonialCarouselClient({ testimonials, durationSeconds }: Props) {
  const [desktopPaused, setDesktopPaused] = useState(false)
  const [mobilePaused, setMobilePaused] = useState(false)
  // null until measured — keeps animation paused until we know the correct speed
  const [mobileDuration, setMobileDuration] = useState<number | null>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    const track = mobileTrackRef.current
    if (!track) return
    // scrollHeight gives total height including clipped portion (doubled content)
    const halfHeight = track.scrollHeight / 2
    if (halfHeight > 20) {
      setMobileDuration(Math.max(18, halfHeight / MOBILE_PX_PER_SECOND))
    }
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (mobileTrackRef.current) ro.observe(mobileTrackRef.current)
    return () => ro.disconnect()
  }, [measure])

  if (testimonials.length === 0) return null

  // Duplicate once — translateY(-50%) moves exactly one full set for a seamless loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <>
      {/* ── Screen-reader list — single authoritative source for AT ──────── */}
      <ul className="sr-only" aria-label="Student testimonials">
        {testimonials.map((t) => (
          <li key={t.initials}>{`"${t.quote}" — ${t.initials}, ${t.score} scorer`}</li>
        ))}
      </ul>

      {/* ── Desktop: vertical animated loop ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        onMouseEnter={() => setDesktopPaused(true)}
        onMouseLeave={() => setDesktopPaused(false)}
        onFocus={() => setDesktopPaused(true)}
        onBlur={() => setDesktopPaused(false)}
      >
        {/* Animated version — hidden when prefers-reduced-motion: reduce */}
        <div
          className="mm-animated-section relative overflow-hidden"
          style={{ height: '460px' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-14 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-14 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }}
          />
          <div
            className="mm-testimonial-track flex flex-col gap-3 py-1"
            style={{
              '--mm-scroll-duration': `${durationSeconds}s`,
              animationPlayState: desktopPaused ? 'paused' : 'running',
            } as React.CSSProperties}
          >
            {doubled.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Static version — only shown when prefers-reduced-motion: reduce */}
        <div
          className="mm-static-section overflow-y-auto mm-no-scrollbar flex flex-col gap-3 py-1"
          style={{ height: '460px' }}
        >
          {testimonials.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      {/* ── Mobile: single-column vertical animated loop ──────────────────── */}
      {/*
        Uses the same CSS animation as desktop but with a measured duration so
        speed stays approximately constant regardless of how much text wraps.
        Touch-hold pauses the animation. Normal page scrolling is unaffected
        because the animated content is inside overflow-hidden — the page itself
        scrolls normally outside this container.
      */}
      <div
        aria-hidden="true"
        className="lg:hidden"
        onPointerDown={() => setMobilePaused(true)}
        onPointerUp={() => setMobilePaused(false)}
        onPointerCancel={() => setMobilePaused(false)}
        onPointerLeave={() => setMobilePaused(false)}
      >
        {/* Animated version */}
        <div
          className="mm-animated-section relative overflow-hidden"
          style={{ height: 'clamp(300px, 55svh, 380px)' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-10 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-10 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }}
          />
          <div
            ref={mobileTrackRef}
            className="mm-testimonial-track flex flex-col gap-3 py-1"
            style={{
              '--mm-scroll-duration': `${mobileDuration ?? durationSeconds}s`,
              // Keep paused until we have an accurate measurement to avoid racing
              animationPlayState: mobilePaused || mobileDuration === null ? 'paused' : 'running',
            } as React.CSSProperties}
          >
            {doubled.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Static version for prefers-reduced-motion users */}
        <div className="mm-static-section flex flex-col gap-3 py-1">
          {testimonials.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </>
  )
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[13px] text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-100">
        <div className="h-7 w-7 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[11px] font-semibold select-none">
          {t.initials.charAt(0)}
        </div>
        <div>
          <p className="text-[12px] font-semibold text-slate-800 leading-none">{t.initials}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">{t.score} scorer</p>
        </div>
      </div>
    </div>
  )
}
