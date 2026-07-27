'use client'

import { useEffect, useRef } from 'react'

// ── Centralized social-proof count ────────────────────────────────────────────
// Update this one constant to change the number everywhere on the landing page.
// Do not derive this from auth.users, profile rows, or any private data.
export const LANDING_USER_COUNT_LABEL = '800+'

const AVATARS = [
  { initials: 'S', bg: '#d1fae5', color: '#065f46' },
  { initials: 'M', bg: '#e0f2fe', color: '#0369a1' },
  { initials: 'A', bg: '#ede9fe', color: '#5b21b6' },
  { initials: 'J', bg: '#fef3c7', color: '#92400e' },
]

interface SocialProofCardProps {
  /** Extra Tailwind classes applied to the outer wrapper div */
  className?: string
}

export function SocialProofCard({ className = '' }: SocialProofCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    // Trigger entrance animation after mount so it plays on every page load
    card.style.animationPlayState = 'running'
  }, [])

  return (
    <>
      {/* Keyframe animations — defined once per component instance */}
      <style>{`
        @keyframes sp-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes sp-avatar-in {
          from { opacity: 0; transform: translateY(5px) scale(0.82); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes sp-glow-in {
          from { box-shadow: 0 2px 8px rgba(16,185,129,0.06), 0 1px 3px rgba(0,0,0,0.04); }
          to   { box-shadow: 0 2px 16px rgba(16,185,129,0.14), 0 1px 6px rgba(0,0,0,0.06); }
        }

        .sp-card {
          animation:
            sp-rise    0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both,
            sp-glow-in 0.65s ease                        0.45s both;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .sp-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(16,185,129,0.18), 0 2px 8px rgba(0,0,0,0.07) !important;
        }

        .sp-avatar-0 { animation: sp-avatar-in 0.38s cubic-bezier(0.22,1,0.36,1) 0.16s both; }
        .sp-avatar-1 { animation: sp-avatar-in 0.38s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
        .sp-avatar-2 { animation: sp-avatar-in 0.38s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
        .sp-avatar-3 { animation: sp-avatar-in 0.38s cubic-bezier(0.22,1,0.36,1) 0.34s both; }

        @media (prefers-reduced-motion: reduce) {
          .sp-card,
          .sp-avatar-0, .sp-avatar-1, .sp-avatar-2, .sp-avatar-3 {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .sp-card:hover { transform: none !important; }
        }
      `}</style>

      <div
        ref={cardRef}
        className={`sp-card relative inline-flex items-center gap-3.5 rounded-2xl border border-emerald-200 px-5 py-3.5 ${className}`}
        style={{
          background: 'linear-gradient(140deg, #ffffff 55%, #ecfdf5 100%)',
          boxShadow: '0 2px 8px rgba(16,185,129,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {/* Decorative sparkle — top right */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute -top-2 -right-1.5 h-[14px] w-[14px] text-emerald-400 opacity-75 select-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 1l1.6 5H17l-4.3 3.1 1.6 5L10 11.1 5.7 14.1l1.6-5L3 6h5.4z" />
        </svg>

        {/* Decorative sparkle — bottom left */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute -bottom-1.5 left-4 h-[10px] w-[10px] text-emerald-300 opacity-60 select-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 1l1.6 5H17l-4.3 3.1 1.6 5L10 11.1 5.7 14.1l1.6-5L3 6h5.4z" />
        </svg>

        {/* Overlapping avatar circles */}
        <div className="flex -space-x-2 shrink-0" aria-hidden="true">
          {AVATARS.map((a, i) => (
            <div
              key={a.initials}
              className={`sp-avatar-${i} flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-white select-none`}
              style={{ background: a.bg, color: a.color }}
            >
              {a.initials}
            </div>
          ))}
        </div>

        {/* Text — screen reader reads this naturally as "Join 800+ users" */}
        <p className="flex items-baseline gap-1 leading-none m-0">
          <span className="text-[13px] font-medium text-slate-500">Join</span>
          <span
            className="text-[22px] font-extrabold tracking-tight leading-none"
            style={{ color: '#059669' }}
          >
            {LANDING_USER_COUNT_LABEL}
          </span>
          <span className="text-[13px] font-semibold text-slate-700">users</span>
        </p>
      </div>
    </>
  )
}
