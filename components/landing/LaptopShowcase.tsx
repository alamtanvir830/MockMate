'use client'

import { useEffect, useRef } from 'react'

export function LaptopShowcase({ children }: { children: React.ReactNode }) {
  const laptopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !laptopRef.current) return
    // Animate from initial offset state to final resting position
    laptopRef.current.style.transition =
      'transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 1.1s cubic-bezier(0.22,1,0.36,1)'
    laptopRef.current.style.transform = 'rotateY(-6deg) rotateX(2deg)'
    laptopRef.current.style.opacity = '1'
  }, [])

  return (
    <div style={{ perspective: '1200px' }} className="w-full flex items-start justify-center">
      <div
        ref={laptopRef}
        className="mm-laptop-wrap w-full"
        style={{
          transform: 'translateX(60px) rotateY(-15deg)',
          opacity: '0',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Screen portion ──────────────────────────────────────────────── */}
        <div
          className="relative w-full rounded-t-xl"
          style={{
            background: 'linear-gradient(160deg, #e2e8ee 0%, #c8d0d8 100%)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 10px 30px rgba(0,0,0,0.12)',
            padding: '10px 10px 0 10px',
          }}
        >
          {/* Screen bezel */}
          <div
            className="w-full rounded-lg overflow-hidden"
            style={{
              background: '#1a1a1a',
              padding: '12px 12px 0 12px',
              borderRadius: '8px',
            }}
          >
            {/* Camera dot */}
            <div className="flex justify-center mb-2">
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#333',
                }}
              />
            </div>
            {/* Screen content */}
            <div
              className="w-full overflow-hidden"
              style={{
                background: '#f8fafc',
                borderRadius: '4px 4px 0 0',
                height: '420px',
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* ── Keyboard base ────────────────────────────────────────────────── */}
        <div
          className="relative w-full rounded-b-2xl"
          style={{
            background: 'linear-gradient(180deg, #c8d0d8 0%, #b8c0c8 100%)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 10px 30px rgba(0,0,0,0.12)',
            padding: '8px 14px 12px 14px',
            marginLeft: '-6px',
            marginRight: '-6px',
            width: 'calc(100% + 12px)',
          }}
        >
          {/* Hinge line */}
          <div
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #a0a8b0 20%, #a0a8b0 80%, transparent)',
              marginBottom: '6px',
              borderRadius: '1px',
            }}
          />

          {/* Keyboard rows — subtle grid hint */}
          <div className="flex flex-col gap-1 mb-3 opacity-30">
            {[...Array(3)].map((_, row) => (
              <div key={row} className="flex gap-1">
                {[...Array(row === 2 ? 8 : 12)].map((_, col) => (
                  <div
                    key={col}
                    style={{
                      flex: row === 2 && (col === 0 || col === 7) ? '2' : '1',
                      height: '6px',
                      background: '#8890a0',
                      borderRadius: '2px',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Trackpad */}
          <div className="flex justify-center">
            <div
              style={{
                width: '28%',
                height: '14px',
                background: '#b0b8c0',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
