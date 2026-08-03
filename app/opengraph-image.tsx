import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand palette (matches globals.css @theme tokens)
const BRAND_500 = '#44A5F0'
const BRAND_600 = '#2D8FD4'
const NAVY     = '#0f172a'
const SLATE_400 = '#94a3b8'
const SLATE_500 = '#64748b'
const SLATE_700 = '#334155'
const SLATE_800 = '#1e293b'
const BG       = '#EFF6FF'  // light-blue tint for OG background

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: BG,
          padding: '52px 60px 36px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* ── Main two-column row ─────────────────────────── */}
        <div style={{ display: 'flex', flex: 1, gap: '56px' }}>

          {/* ── LEFT: brand copy ──────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              {/* Icon — rounded square (brand-600 bg) + white star */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: BRAND_600,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Star SVG — same path as components/shared/logo.tsx, scaled to 24×24 */}
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 1L11.5 6.5L17.5 7.3L13.25 11.4L14.3 17.4L9 14.5L3.7 17.4L4.75 11.4L0.5 7.3L6.5 6.5L9 1Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* "Mock" dark + "Mate" blue */}
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: NAVY }}>Mock</span>
                <span style={{ fontSize: 26, fontWeight: 700, color: BRAND_500 }}>Mate</span>
              </div>
            </div>

            {/* Hero headline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 68,
                  fontWeight: 800,
                  color: NAVY,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Take the exam
              </span>
              <span
                style={{
                  fontSize: 68,
                  fontWeight: 800,
                  color: BRAND_500,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                before the exam.
              </span>
            </div>

            {/* Sub-copy */}
            <div style={{ display: 'flex', marginTop: 22, marginBottom: 32 }}>
              <span style={{ fontSize: 20, color: SLATE_500, lineHeight: 1.45 }}>
                Affordable SAT, MCAT, and SHSAT practice exams and question banks.
              </span>
            </div>

            {/* URL pill */}
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                border: `2px solid ${BRAND_500}`,
                borderRadius: 100,
                padding: '9px 22px',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: BRAND_500 }}>
                mockmateapp.com
              </span>
            </div>
          </div>

          {/* ── RIGHT: score card + feedback card + pills ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', width: 460, gap: 14 }}>

            {/* Score card */}
            <div
              style={{
                backgroundColor: NAVY,
                borderRadius: 18,
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: SLATE_400,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                }}
              >
                ESTIMATED SAT SCORE
              </span>
              <span
                style={{
                  fontSize: 78,
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.0,
                  marginTop: 4,
                }}
              >
                1440
              </span>
              <div style={{ display: 'flex', gap: 36, marginTop: 6 }}>
                <span style={{ fontSize: 16, color: SLATE_400 }}>R&amp;W 720</span>
                <span style={{ fontSize: 16, color: SLATE_400 }}>Math 720</span>
              </div>
            </div>

            {/* Feedback card */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                border: '1px solid #e2e8f0',
                padding: '22px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: SLATE_400,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                }}
              >
                AI FEEDBACK
              </span>

              {/* Reading & Writing row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 15, color: SLATE_800, width: 160 }}>Reading &amp; Writing</span>
                <div style={{ flex: 1, height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, display: 'flex' }}>
                  <div style={{ width: '72%', height: 8, backgroundColor: BRAND_500, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: BRAND_500, width: 36 }}>72%</span>
              </div>

              {/* Math row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 15, color: SLATE_800, width: 160 }}>Math</span>
                <div style={{ flex: 1, height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, display: 'flex' }}>
                  <div style={{ width: '85%', height: 8, backgroundColor: BRAND_500, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: BRAND_500, width: 36 }}>85%</span>
              </div>

              {/* Question Bank row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 15, color: SLATE_800, width: 160 }}>Question Bank</span>
                <div style={{ flex: 1, height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, display: 'flex' }}>
                  <div style={{ width: '60%', height: 8, backgroundColor: BRAND_500, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: BRAND_500, width: 36 }}>60%</span>
              </div>
            </div>

            {/* SAT / MCAT / SHSAT pills */}
            <div style={{ display: 'flex', gap: 12 }}>
              {(['SAT', 'MCAT', 'SHSAT'] as const).map((label) => (
                <div
                  key={label}
                  style={{
                    border: `2px solid ${BRAND_500}`,
                    borderRadius: 100,
                    padding: '10px 28px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: BRAND_500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <span style={{ fontSize: 13, color: SLATE_700 }}>
            mockmateapp.com · Free SAT Form 1 · MCAT · SHSAT · Question Bank
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
