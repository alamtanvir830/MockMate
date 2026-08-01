'use client'

import { useEffect, useRef } from 'react'

/**
 * Landscape tablet mockup — clean dark bezel, no home button, no side buttons,
 * no camera. Screen fills the available column width. Subtle 3-D perspective tilt.
 */
export function TabletShowcase({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.style.opacity = '1'
      el.style.transform = 'rotateY(-8deg) rotateX(5deg)'
      return
    }
    requestAnimationFrame(() => {
      el.style.transition =
        'transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 1.1s cubic-bezier(0.22,1,0.36,1)'
      el.style.transform = 'rotateY(-8deg) rotateX(5deg)'
      el.style.opacity = '1'
    })
  }, [])

  return (
    <div style={{ perspective: '1200px' }} className="w-full relative">
      {/* Floor shadow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '8%',
          right: '8%',
          height: '32px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.24) 0%, transparent 70%)',
          filter: 'blur(14px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Tablet body — dark clean bezel ──────────────────────────────── */}
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: 0,
          transform: 'rotateY(-24deg) rotateX(4deg) translateY(8px)',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(160deg, #252930 0%, #1c1f25 45%, #14171c 100%)',
          borderRadius: '18px',
          padding: '12px',
          boxShadow: [
            '0 52px 100px rgba(0,0,0,0.30)',
            '0 22px 48px rgba(0,0,0,0.22)',
            '0 8px 18px rgba(0,0,0,0.18)',
            'inset 0 1px 0 rgba(255,255,255,0.09)',
            'inset 0 -1px 0 rgba(0,0,0,0.32)',
            'inset 1px 0 0 rgba(255,255,255,0.05)',
            'inset -1px 0 0 rgba(0,0,0,0.20)',
          ].join(', '),
        }}
      >
        {/* Top-edge specular — very subtle on dark body */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '1px',
            left: '28px',
            right: '28px',
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.14) 35%, rgba(255,255,255,0.14) 65%, transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Screen ──────────────────────────────────────────────────────── */}
        <div
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            background: '#f8fafc',
            height: '340px',
          }}
        >
          {/* Top-left diagonal glare */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 28%, transparent 50%)',
              zIndex: 20,
              pointerEvents: 'none',
              borderRadius: '8px',
            }}
          />
          {/* Bottom fade — masks scroll edge */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to top, #f8fafc 0%, transparent 100%)',
              zIndex: 15,
              pointerEvents: 'none',
            }}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
