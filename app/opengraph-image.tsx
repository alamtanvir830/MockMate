import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MockMate — Take the exam before the exam.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'white',
          display: 'flex',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft green gradient blob — top left */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)',
          }}
        />

        {/* Left content column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px 64px',
            flex: '1',
            maxWidth: '660px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '2px', display: 'flex' }} />
            </div>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.3px' }}>
              MockMate
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: '60px',
              fontWeight: '800',
              color: '#0f172a',
              lineHeight: '1.08',
              letterSpacing: '-1.5px',
              marginBottom: '24px',
            }}
          >
            Take the exam{' '}
            <span style={{ color: '#10b981' }}>before the exam.</span>
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: '22px',
              color: '#64748b',
              lineHeight: '1.5',
              fontWeight: '400',
              maxWidth: '520px',
            }}
          >
            Affordable SAT, MCAT, and SHSAT practice exams and question banks.
          </div>

          {/* URL badge */}
          <div
            style={{
              display: 'flex',
              marginTop: '44px',
              background: '#f0fdf4',
              border: '1.5px solid #bbf7d0',
              borderRadius: '999px',
              padding: '8px 20px',
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#059669' }}>
              mockmateapp.com
            </span>
          </div>
        </div>

        {/* Right panel — score cards mockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '64px 48px 64px 0',
            gap: '16px',
            width: '420px',
          }}
        >
          {/* Score card */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '16px',
              padding: '24px 28px',
              width: '340px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Estimated SAT Score
            </span>
            <span style={{ fontSize: '48px', fontWeight: '800', color: 'white', lineHeight: '1', letterSpacing: '-1px' }}>
              1440
            </span>
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>R&amp;W 720</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Math 720</span>
            </div>
          </div>

          {/* AI feedback card */}
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px 24px',
              width: '340px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              AI Feedback
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Reading & Writing', 'Math', 'Question Bank'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '80px', height: '6px', borderRadius: '999px', background: '#e2e8f0', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${[72, 85, 60][i]}%`, height: '100%', background: '#10b981', borderRadius: '999px', display: 'flex' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>{[72, 85, 60][i]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exams row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {['SAT', 'MCAT', 'SHSAT'].map((label) => (
              <div
                key={label}
                style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#059669' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
