'use client'

import { useState } from 'react'

export interface Testimonial {
  initials: string
  score: number
  quote: string
}

export function TestimonialCarouselClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [isPaused, setIsPaused] = useState(false)

  if (testimonials.length === 0) return null

  const doubled = [...testimonials, ...testimonials]

  return (
    <>
      {/* Screen-reader list — always accessible regardless of visual layout */}
      <ul className="sr-only" aria-label="Student testimonials">
        {testimonials.map((t) => (
          <li key={t.initials}>{`"${t.quote}" — ${t.initials}, ${t.score} scorer`}</li>
        ))}
      </ul>

      {/* ── Desktop: vertical infinite scroll ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="hidden lg:block relative overflow-hidden"
        style={{ height: '460px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Top fade mask */}
        <div
          className="absolute inset-x-0 top-0 h-14 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }}
        />
        {/* Bottom fade mask */}
        <div
          className="absolute inset-x-0 bottom-0 h-14 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }}
        />

        {/*
          Animated track — translateY(-50%) moves the track up by exactly the
          height of the first (original) set of cards. The duplicate set below
          is identical, so the loop is seamless.
        */}
        <div
          className="mm-testimonial-track flex flex-col gap-3 py-1"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {doubled.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      {/* ── Mobile: horizontal snap carousel ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="lg:hidden flex gap-3 pb-2 overflow-x-auto mm-no-scrollbar snap-x snap-mandatory"
      >
        {testimonials.map((t, i) => (
          <div key={i} className="snap-center shrink-0 w-[82vw] max-w-[300px]">
            <Card t={t} />
          </div>
        ))}
        {/* trailing spacer so last card snap-centers correctly */}
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
