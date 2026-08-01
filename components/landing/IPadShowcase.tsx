'use client'

import { useEffect, useRef } from 'react'

export function IPadShowcase({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.style.opacity = '1'
      el.style.transform = 'rotateY(-10deg) rotateX(4deg)'
      return
    }
    requestAnimationFrame(() => {
      el.style.transition =
        'transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 1.1s cubic-bezier(0.22,1,0.36,1)'
      el.style.transform = 'rotateY(-10deg) rotateX(4deg)'
      el.style.opacity = '1'
    })
  }, [])

  return (
    <div
      className="flex justify-center w-full relative"
      style={{ perspective: '1000px' }}
    >
      {/* Floor shadow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '28%',
          right: '28%',
          height: '28px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.20) 0%, transparent 70%)',
          filter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── iPad body ───────────────────────────────────────────────────────── */}
      <div
        ref={frameRef}
        style={{
          width: '256px',
          position: 'relative',
          zIndex: 1,
          opacity: 0,
          transform: 'rotateY(-22deg) rotateX(2deg) translateY(10px)',
          transformStyle: 'preserve-3d',
          /* Brushed-aluminum finish */
          background: 'linear-gradient(158deg, #d6dae2 0%, #c4c9d2 32%, #b8bec8 62%, #acb3bd 100%)',
          borderRadius: '30px',
          boxShadow: [
            '0 48px 96px rgba(0,0,0,0.18)',
            '0 20px 40px rgba(0,0,0,0.13)',
            '0 6px 12px rgba(0,0,0,0.08)',
            'inset 0 1.5px 0 rgba(255,255,255,0.62)',
            'inset 1.5px 0 0 rgba(255,255,255,0.22)',
            'inset -1.5px 0 0 rgba(0,0,0,0.06)',
            'inset 0 -1.5px 0 rgba(0,0,0,0.10)',
          ].join(', '),
        }}
      >
        {/* Top-edge specular highlight */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '1px',
            left: '20px',
            right: '20px',
            height: '1.5px',
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.80) 25%, rgba(255,255,255,0.80) 75%, transparent)',
            borderRadius: '1px',
            pointerEvents: 'none',
          }}
        />

        {/* ── Top bezel — camera ─────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '11px',
            paddingBottom: '9px',
          }}
        >
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #252528, #040405)',
              boxShadow: '0 0 0 1.5px #181818, 0 0 0 3px #0e0e10',
            }}
          />
        </div>

        {/* ── Screen assembly ────────────────────────────────────────────── */}
        <div
          style={{
            margin: '0 10px',
            background: '#0a0b0e',
            borderRadius: '18px',
            padding: '5px',
            boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.85)',
          }}
        >
          {/* Screen surface */}
          <div
            style={{
              borderRadius: '14px',
              height: '330px',
              overflow: 'hidden',
              position: 'relative',
              background: '#f8fafc',
            }}
          >
            {/* Screen glare — diagonal reflection */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '14px',
                background:
                  'linear-gradient(148deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 35%, transparent 55%)',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            />
            {/* Bottom screen fade — masks carousel scroll edge */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '36px',
                background: 'linear-gradient(to top, #f8fafc 0%, transparent 100%)',
                zIndex: 15,
                pointerEvents: 'none',
              }}
            />
            {children}
          </div>
        </div>

        {/* ── Bottom bezel — home button ─────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '10px',
            paddingBottom: '12px',
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #cdd3da 0%, #adb4be 100%)',
              boxShadow: [
                '0 2px 6px rgba(0,0,0,0.22)',
                'inset 0 1px 0 rgba(255,255,255,0.55)',
                'inset 0 -1px 2px rgba(0,0,0,0.18)',
              ].join(', '),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Inner ring detail */}
            <div
              style={{
                width: '23px',
                height: '23px',
                borderRadius: '50%',
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: 'linear-gradient(145deg, #c5cad1 0%, #a4acb5 100%)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.14)',
              }}
            />
          </div>
        </div>

        {/* ── Right side: power button ───────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '78px',
            right: '-3px',
            width: '3px',
            height: '38px',
            background: 'linear-gradient(to bottom, #9ea6b0, #8891a0)',
            borderRadius: '0 2px 2px 0',
            boxShadow: '2px 0 5px rgba(0,0,0,0.16)',
          }}
        />

        {/* ── Left side: mute toggle ─────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '62px',
            left: '-3px',
            width: '3px',
            height: '20px',
            background: 'linear-gradient(to bottom, #9ea6b0, #8891a0)',
            borderRadius: '2px 0 0 2px',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.16)',
          }}
        />
        {/* Left side: volume up */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '92px',
            left: '-3px',
            width: '3px',
            height: '28px',
            background: 'linear-gradient(to bottom, #9ea6b0, #8891a0)',
            borderRadius: '2px 0 0 2px',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.16)',
          }}
        />
        {/* Left side: volume down */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '130px',
            left: '-3px',
            width: '3px',
            height: '28px',
            background: 'linear-gradient(to bottom, #9ea6b0, #8891a0)',
            borderRadius: '2px 0 0 2px',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.16)',
          }}
        />
      </div>
    </div>
  )
}
