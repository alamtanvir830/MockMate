'use client'

import { useEffect, useRef } from 'react'

// ── Keyboard layout ──────────────────────────────────────────────────────────
// Each number = proportional flex width within the row. No text labels.
// Row order: fn row (narrow), number row, QWERTY, ASDF, ZXCV, bottom modifiers.

const FN_ROW: number[] = Array(13).fill(1)

const KEY_ROWS: number[][] = [
  // Number row: 13 standard + wide backspace
  [...Array(13).fill(1), 1.8],
  // QWERTY: wide tab + 12 standard + wide backslash
  [1.7, ...Array(12).fill(1), 1.5],
  // ASDF: wide caps lock + 11 standard + wide enter
  [2.0, ...Array(11).fill(1), 2.2],
  // ZXCV: wide left-shift + 10 standard + wide right-shift
  [2.6, ...Array(10).fill(1), 2.6],
  // Bottom row: fn ctrl opt cmd [SPACE] cmd opt ← ↕ →
  [1, 1, 1, 1.5, 5.8, 1.5, 1, 1, 1, 1],
]

export function LaptopShowcase({ children }: { children: React.ReactNode }) {
  const laptopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !laptopRef.current) return
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
        {/* ── LID (screen half) ─────────────────────────────────────────── */}
        <div
          style={{
            background: 'linear-gradient(160deg, #dce2e9 0%, #c8d2da 55%, #bcc6d0 100%)',
            borderRadius: '12px 12px 0 0',
            padding: '4px 4px 0',
            boxShadow:
              'inset 0 -1px 0 rgba(0,0,0,0.08), ' +
              'inset 1px 0 0 rgba(255,255,255,0.22), ' +
              'inset -1px 0 0 rgba(0,0,0,0.06)',
          }}
        >
          {/* Dark bezel */}
          <div
            style={{
              background: '#111214',
              borderRadius: '9px 9px 0 0',
              padding: '10px 10px 0',
            }}
          >
            {/* Webcam dot */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '7px' }}>
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 38% 35%, #2c2c2c, #080808)',
                  boxShadow: '0 0 0 1.5px #272727, 0 0 0 3px #181818',
                }}
              />
            </div>
            {/* Display area */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '3px 3px 0 0',
                height: '420px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Subtle top-glare reflection */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '70px',
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%)',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              />
              {children}
            </div>
          </div>
        </div>

        {/* ── HINGE ──────────────────────────────────────────────────────── */}
        <div
          style={{
            height: '5px',
            background: 'linear-gradient(to bottom, #7c848c 0%, #a0a8b0 50%, #b0b8c0 100%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
            marginLeft: '-2px',
            marginRight: '-2px',
          }}
        />

        {/* ── BASE (keyboard deck) ───────────────────────────────────────── */}
        <div
          style={{
            background: 'linear-gradient(175deg, #ccd3da 0%, #c0c8d0 40%, #b8c0c8 100%)',
            borderRadius: '0 0 14px 14px',
            padding: '10px 14px 16px',
            marginLeft: '-3px',
            marginRight: '-3px',
            boxShadow:
              '0 32px 72px rgba(0,0,0,0.22), ' +
              '0 10px 24px rgba(0,0,0,0.14), ' +
              'inset 0 1px 0 rgba(255,255,255,0.38)',
          }}
        >
          {/* Keyboard recess — clearly recessed tray so keys stand out */}
          <div
            style={{
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '6px',
              padding: '8px 8px 7px',
              marginBottom: '12px',
              boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.18)',
            }}
          >
            {/* Function row — short chiclet keys */}
            <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
              {FN_ROW.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '10px',
                    background: 'linear-gradient(to bottom, #e6ecf4 0%, #d0d9e6 100%)',
                    borderRadius: '2px',
                    border: '0.5px solid rgba(0,0,0,0.24)',
                    boxShadow:
                      'inset 0 2px 0 rgba(255,255,255,0.8), ' +
                      '0 2px 3px rgba(0,0,0,0.28)',
                  }}
                />
              ))}
            </div>

            {/* Main key rows — taller for realistic chiclet proportions */}
            {KEY_ROWS.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: 'flex',
                  gap: '3px',
                  marginBottom: ri < KEY_ROWS.length - 1 ? '3px' : '0',
                }}
              >
                {row.map((flex, ki) => (
                  <div
                    key={ki}
                    style={{
                      flex,
                      height: '15px',
                      background: 'linear-gradient(to bottom, #e4eaf2 0%, #cdd6e2 100%)',
                      borderRadius: '3px',
                      border: '0.5px solid rgba(0,0,0,0.24)',
                      boxShadow:
                        'inset 0 2px 0 rgba(255,255,255,0.8), ' +
                        '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Trackpad — large, centered, inset look */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '38%',
                height: '72px',
                background: 'linear-gradient(160deg, #c2cad4 0%, #b6bec8 100%)',
                borderRadius: '10px',
                border: '0.5px solid rgba(0,0,0,0.2)',
                boxShadow:
                  'inset 0 0 0 0.5px rgba(255,255,255,0.4), ' +
                  'inset 0 3px 8px rgba(0,0,0,0.14)',
              }}
            />
          </div>

          {/* Rubber feet */}
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              paddingLeft: '6px',
              paddingRight: '6px',
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: '14px',
                  height: '4px',
                  background: 'rgba(0,0,0,0.22)',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
