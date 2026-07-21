'use client'

import { useState } from 'react'

export interface Testimonial {
  initials: string
  score: number
  quote: string
}

interface Props {
  testimonials: Testimonial[]
  /** Total animation duration for one full loop in seconds */
  durationSeconds: number
}

export function TestimonialCarouselClient({ testimonials, durationSeconds }: Props) {
  const [isPaused, setIsPaused] = useState(false)

  if (testimonials.length === 0) return null

  // Duplicate the list once — translateY(-50%) moves exactly one full set,
  // so the loop resets seamlessly back to the first card.
  const doubled = [...testimonials, ...testimonials]

  const trackStyle = {
    '--mm-scroll-duration': `${durationSeconds}s`,
    animationPlayState: isPaused ? 'paused' : 'running',
  } as React.CSSProperties

  return (
    <>
      {/* ── Screen-reader list — single authoritative source for AT ──────── */}
      <ul className="sr-only" aria-label="Student testimonials">
        {testimonials.map((t) => (
          <li key={t.initials}>{`"${t.quote}" — ${t.initials}, ${t.score} scorer`}</li>
        ))}
      </ul>

      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/*
          Animated version — shown by default, hidden when
          prefers-reduced-motion: reduce is active (CSS class toggle).
        */}
        <div
          className="mm-animated-section relative overflow-hidden"
          style={{ height: '460px' }}
        >
          {/* Top fade */}
          <div
            className="absolute inset-x-0 top-0 h-14 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-14 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }}
          />

          <div className="mm-testimonial-track flex flex-col gap-3 py-1" style={trackStyle}>
            {doubled.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>

        {/*
          Static scrollable version — only visible when
          prefers-reduced-motion: reduce is active. Shows every qualifying
          testimonial exactly once, no duplicates.
        */}
        <div
          className="mm-static-section overflow-y-auto mm-no-scrollbar flex flex-col gap-3 py-1"
          style={{ height: '460px' }}
        >
          {testimonials.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      {/* ── Mobile: horizontal snap carousel ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="lg:hidden flex gap-3 pb-2 overflow-x-auto mm-no-scrollbar snap-x snap-mandatory"
      >
        {testimonials.map((t, i) => (
          <div key={i} className="snap-center shrink-0 w-[82vw] max-w-[300px]">
            <Card t={t} />
          </div>
        ))}
        <div className="shrink-0 w-2" aria-hidden="true" />
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
