'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// ── Challenge data ───────────────────────��─────────────────────────────────────

interface Challenge {
  id: string
  title: string
  skill: string
  goal: string
  expressions: string[]
  task: string
  hint: string
}

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Solve a linear system graphically',
    skill: 'Systems of Equations',
    goal: 'Find the (x, y) intersection of two lines.',
    expressions: ['y = 2x + 3', 'y = -x + 9'],
    task: 'Type both equations. Click the intersection point on the graph. Read off the coordinates.',
    hint: 'The intersection of y = 2x + 3 and y = -x + 9 is where 2x + 3 = -x + 9. You should see (2, 7).',
  },
  {
    id: 'c2',
    title: 'Find the roots of a quadratic',
    skill: 'Quadratic Equations',
    goal: 'Identify the x-intercepts (zeros) of a parabola.',
    expressions: ['y = x^2 - 5x + 6'],
    task: 'Type the equation. Click the two points where the parabola crosses the x-axis.',
    hint: 'The zeros are x = 2 and x = 3, matching the factored form (x - 2)(x - 3).',
  },
  {
    id: 'c3',
    title: 'Locate the vertex of a parabola',
    skill: 'Quadratic Functions',
    goal: 'Find the minimum (or maximum) point of a parabola.',
    expressions: ['y = x^2 - 6x + 5'],
    task: 'Graph the parabola. Click the lowest point to read the vertex coordinates.',
    hint: 'The vertex is at x = -b/(2a) = 6/2 = 3. So the vertex is (3, -4).',
  },
  {
    id: 'c4',
    title: 'Explore exponential growth with a slider',
    skill: 'Exponential Functions',
    goal: 'See how the base affects exponential growth rate.',
    expressions: ['y = a \\cdot 2^x', 'a = 1'],
    task: 'Type the expression (Desmos will offer to create a slider for a). Drag the slider and observe how the curve scales.',
    hint: 'The slider changes the initial value (vertical stretch). The shape of exponential growth is always the same — only the scale shifts.',
  },
  {
    id: 'c5',
    title: 'Compare linear and exponential growth',
    skill: 'Linear vs. Exponential',
    goal: 'Visualise when exponential overtakes linear.',
    expressions: ['y = 5x', 'y = 1.5^x'],
    task: 'Graph both. Zoom out on the x-axis. Note where the exponential curve overtakes the linear one.',
    hint: 'For small x the line is higher, but around x ≈ 9 the exponential catches up and then grows far faster.',
  },
  {
    id: 'c6',
    title: 'Graphically solve a nonlinear system',
    skill: 'Nonlinear Equations & Systems',
    goal: 'Find where a line intersects a parabola.',
    expressions: ['y = x^2 - 4', 'y = x + 2'],
    task: 'Graph both curves. Click each intersection point and record (x, y).',
    hint: 'Setting equal: x² - 4 = x + 2 → x² - x - 6 = 0 → x = 3 or x = -2. Points: (3, 5) and (-2, 0).',
  },
  {
    id: 'c7',
    title: 'Graph a circle and read a radius',
    skill: 'Circles',
    goal: 'Recognise the standard form of a circle equation.',
    expressions: ['x^2 + y^2 = 49'],
    task: 'Type the equation. The circle appears. Click where it crosses the x-axis to confirm the radius.',
    hint: 'The radius is √49 = 7. The circle crosses at (7, 0), (-7, 0), (0, 7), (0, -7).',
  },
  {
    id: 'c8',
    title: 'Transformed circle (shifted centre)',
    skill: 'Circles',
    goal: 'Identify the centre and radius from a shifted circle.',
    expressions: ['(x - 3)^2 + (y + 2)^2 = 25'],
    task: 'Graph the equation. Hover over the centre to confirm (h, k) and estimate the radius.',
    hint: 'Centre is (3, -2) (note the sign flip). Radius is √25 = 5.',
  },
  {
    id: 'c9',
    title: 'Find half-life from an exponential decay graph',
    skill: 'Exponential Functions',
    goal: 'Read the half-life by finding where the curve reaches half its starting value.',
    expressions: ['y = 800 \\cdot (0.5)^{x/20}'],
    task: 'Graph the decay. The curve starts at 800. Click where y = 400 to find the half-life.',
    hint: 'The half-life is 20 (the denominator of the exponent). The curve hits y = 400 at x = 20.',
  },
  {
    id: 'c10',
    title: 'Verify a solution by substitution graphically',
    skill: 'Equivalent Expressions',
    goal: 'Confirm a claimed solution visually instead of algebraically.',
    expressions: ['y = 2x^2 - 7x + 3', 'x = 3', 'x = 0.5'],
    task: 'Graph the quadratic and the two vertical lines. Read the y-value at each intersection.',
    hint: 'At x = 3: y = 18 - 21 + 3 = 0 ✓ (root). At x = 0.5: y = 0.5 - 3.5 + 3 = 0 ✓ (root).',
  },
  {
    id: 'c11',
    title: 'Slope of a linear function from the graph',
    skill: 'Linear Functions',
    goal: 'Measure rise/run between two points on a line.',
    expressions: ['y = 0.75x - 2'],
    task: 'Graph the line. Click any two lattice points on it. Compute (y₂ - y₁)/(x₂ - x₁) to confirm slope = 0.75.',
    hint: 'Points (0, -2) and (4, 1) are on the line. Slope = (1 - (-2))/(4 - 0) = 3/4 = 0.75 ✓',
  },
  {
    id: 'c12',
    title: 'Right triangle — verify Pythagorean theorem',
    skill: 'Right Triangles & Trigonometry',
    goal: 'Plot a right triangle and check that a² + b² = c².',
    expressions: ['(0, 0)', '(5, 0)', '(5, 12)'],
    task: 'Plot the three points (type coordinates directly into Desmos). Measure the hypotenuse by clicking both endpoints.',
    hint: 'Legs are 5 and 12. Hypotenuse = √(25 + 144) = √169 = 13. The distance tool in Desmos confirms 13.',
  },
]

// ── Technique data ──────────────────────��───────────────────────────��──────────

interface Technique {
  title: string
  description: string
  example?: string
}

const TECHNIQUES: Technique[] = [
  {
    title: 'Find an intersection point',
    description: 'Graph two equations. Click the point where they cross. Desmos shows the exact (x, y) coordinates.',
    example: 'y = 2x + 3 and y = -x + 9 → click intersection → (2, 7)',
  },
  {
    title: 'Find zeros (x-intercepts)',
    description: 'Graph a function. Click the point where it crosses the x-axis. Desmos shows the root.',
    example: 'y = x² - 4 → click x-axis crossings → x = 2 and x = -2',
  },
  {
    title: 'Create a slider',
    description: 'Type an undefined variable like "a" in an expression. Desmos offers to create a slider. Drag it to explore how the constant affects the graph.',
    example: 'y = ax + b → sliders for a and b appear',
  },
  {
    title: 'Add a table',
    description: 'Click the + button (top left of the expression list) → Table. Type x-values and Desmos fills in f(x). Or link a column to an expression.',
    example: 'Table with x = 1, 2, 3 and y₁ = x² will compute 1, 4, 9',
  },
  {
    title: 'Zoom and pan',
    description: 'Scroll to zoom in/out. Click and drag to pan. Use the home button (circle icon) to reset the view to default.',
    example: 'Useful when a curve exits the screen',
  },
  {
    title: 'Plot a specific point',
    description: 'Type coordinates directly: (3, 5) plots a point at x = 3, y = 5.',
    example: '(0, 0) plots the origin',
  },
  {
    title: 'Restrict domain',
    description: 'Add a domain restriction with curly braces: y = 2x + 1 {0 ≤ x ≤ 5} draws only that segment.',
    example: 'Useful for piecewise questions',
  },
  {
    title: 'Check if two expressions are equivalent',
    description: 'Graph both. If the curves overlap perfectly, they are equivalent for those x-values.',
    example: 'y = (x+2)(x-3) and y = x² - x - 6 → identical graph',
  },
]

// ── Reference data ──────────────────────────���──────────────────────────────────

interface RefItem {
  syntax: string
  meaning: string
  example?: string
}

const REFERENCE_SECTIONS: { heading: string; items: RefItem[] }[] = [
  {
    heading: 'Exponents & Roots',
    items: [
      { syntax: 'x^2', meaning: 'x squared' },
      { syntax: 'x^(1/2)', meaning: 'Square root of x (same as √x)' },
      { syntax: 'sqrt(x)', meaning: 'Square root of x' },
      { syntax: 'nthroot(x, 3)', meaning: 'Cube root of x' },
      { syntax: 'x^(2/3)', meaning: 'Cube root of x, squared' },
    ],
  },
  {
    heading: 'Absolute Value & Piecewise',
    items: [
      { syntax: 'abs(x)  or  |x|', meaning: 'Absolute value of x' },
      { syntax: 'y = f(x) {a ≤ x ≤ b}', meaning: 'Draw f(x) only on [a, b]' },
    ],
  },
  {
    heading: 'Trigonometry',
    items: [
      { syntax: 'sin(x), cos(x), tan(x)', meaning: 'Trig functions (x in radians by default)' },
      { syntax: 'π', meaning: 'Type "pi" — Desmos converts it' },
      { syntax: 'sin(x \\cdot π/180)', meaning: 'Convert degrees to radians inside the function' },
    ],
  },
  {
    heading: 'Logarithms',
    items: [
      { syntax: 'log(x)', meaning: 'Base-10 logarithm' },
      { syntax: 'ln(x)', meaning: 'Natural logarithm (base e)' },
      { syntax: 'log_a(x)', meaning: 'Log base a of x' },
    ],
  },
  {
    heading: 'Inequalities & Regions',
    items: [
      { syntax: 'y > 2x + 1', meaning: 'Shades the region above the line' },
      { syntax: 'x^2 + y^2 < 9', meaning: 'Shades the interior of the circle' },
    ],
  },
  {
    heading: 'Implicit Equations',
    items: [
      { syntax: 'x^2 + y^2 = r^2', meaning: 'Circle centred at origin, radius r' },
      { syntax: '(x-h)^2 + (y-k)^2 = r^2', meaning: 'Circle centred at (h, k)' },
      { syntax: 'ax + by = c', meaning: 'Line in standard form (Desmos graphs it correctly)' },
    ],
  },
]

// ── Panel tabs ────────────────────────────────────────────────���────────────────

type PanelTab = 'challenges' | 'techniques' | 'reference'

// ── Main page ─────────────────────────��─────────────────────────────────���──────

export default function DemosSandboxPage() {
  const [tab, setTab] = useState<PanelTab>('challenges')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>('c1')
  const [showHint, setShowHint] = useState<Record<string, boolean>>({})

  function copyExpressions(challengeId: string, expressions: string[]) {
    const text = expressions.join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(challengeId)
      setTimeout(() => setCopiedId(null), 2000)
    }).catch(() => null)
  }

  function toggleHint(id: string) {
    setShowHint(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const TABS: { id: PanelTab; label: string }[] = [
    { id: 'challenges', label: 'Challenges' },
    { id: 'techniques', label: 'Techniques' },
    { id: 'reference', label: 'Reference' },
  ]

  return (
    <div className="space-y-0">
      {/* Page heading */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Desmos Sandbox</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Open-ended graphing calculator practice with SAT-focused challenges, techniques, and syntax reference.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">

      {/* ── Calculator pane ───────────────────────────────────────────────── */}
      <div className="relative lg:flex-1 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <iframe
          src="https://www.desmos.com/calculator"
          title="Desmos Graphing Calculator"
          className="w-full border-0"
          style={{ height: '72vh', minHeight: '480px' }}
          allow="fullscreen"
        />
        <div className="absolute bottom-2 left-2 rounded-md bg-white/80 border border-slate-200 px-2 py-1 text-[10px] text-slate-400 backdrop-blur-sm">
          Desmos Graphing Calculator — not affiliated with College Board
        </div>
      </div>

      {/* ── Side panel ────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-[22rem] flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden" style={{ maxHeight: '72vh', minHeight: '480px' }}>

        {/* Panel header */}
        <div className="border-b border-slate-200 px-4 pt-3 pb-0 shrink-0">
          <h2 className="text-sm font-bold text-slate-900 mb-2">Desmos Sandbox</h2>
          <div className="flex gap-1">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'px-3 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors',
                  tab === t.id
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700',
                )}
              >{t.label}</button>
            ))}
          </div>
        </div>

        {/* Panel content — scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Challenges tab ─────────────────────────────────────────────── */}
          {tab === 'challenges' && (
            <div className="divide-y divide-slate-100">
              <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                <p className="text-[11px] text-indigo-700 leading-relaxed">
                  Type the expressions below into the Desmos calculator on the left, then complete each task. Use the copy button to copy them to your clipboard.
                </p>
              </div>
              {CHALLENGES.map((c, idx) => {
                const open = expandedChallenge === c.id
                return (
                  <div key={c.id} className="px-4 py-3 space-y-2">
                    <button
                      onClick={() => setExpandedChallenge(open ? null : c.id)}
                      className="w-full flex items-start gap-2 text-left"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">{c.title}</p>
                        <p className="text-[10px] text-indigo-600 mt-0.5">{c.skill}</p>
                      </div>
                      <svg
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                        className={cn('h-3.5 w-3.5 shrink-0 text-slate-400 mt-1 transition-transform', open && 'rotate-180')}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {open && (
                      <div className="ml-7 space-y-2.5">
                        <p className="text-[11px] text-slate-600 leading-relaxed">{c.goal}</p>

                        {/* Expressions to type */}
                        <div className="rounded-lg bg-slate-900 px-3 py-2.5 space-y-1">
                          {c.expressions.map((expr, i) => (
                            <code key={i} className="block text-[12px] font-mono text-green-400">{expr}</code>
                          ))}
                          <button
                            onClick={() => copyExpressions(c.id, c.expressions)}
                            className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-white transition-colors"
                          >
                            {copiedId === c.id ? (
                              <>
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-green-400">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                                <span className="text-green-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                                  <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                  <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                </svg>
                                Copy expressions
                              </>
                            )}
                          </button>
                        </div>

                        {/* Task */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2">
                          <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider mb-0.5">Task</p>
                          <p className="text-[11px] text-indigo-800 leading-relaxed">{c.task}</p>
                        </div>

                        {/* Hint toggle */}
                        <button
                          onClick={() => toggleHint(c.id)}
                          className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          {showHint[c.id] ? 'Hide answer' : 'Show answer'}
                        </button>
                        {showHint[c.id] && (
                          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                            <p className="text-[11px] text-slate-600 leading-relaxed">{c.hint}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* ── Techniques tab ──────────────────────────────────────────────── */}
          {tab === 'techniques' && (
            <div className="divide-y divide-slate-100">
              <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                <p className="text-[11px] text-indigo-700 leading-relaxed">
                  Essential Desmos moves for the SAT. Knowing these turns the calculator from a graphing tool into a problem-solving shortcut.
                </p>
              </div>
              {TECHNIQUES.map((t, i) => (
                <div key={i} className="px-4 py-3.5 space-y-1.5">
                  <p className="text-xs font-semibold text-slate-800">{t.title}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{t.description}</p>
                  {t.example && (
                    <div className="rounded-md bg-slate-900 px-2.5 py-1.5">
                      <code className="text-[11px] font-mono text-green-400">{t.example}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Reference tab ────────────────────��──────────────────────────── */}
          {tab === 'reference' && (
            <div className="divide-y divide-slate-100">
              <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                <p className="text-[11px] text-indigo-700 leading-relaxed">
                  Desmos syntax for expressions you&apos;ll encounter on the SAT. Type these directly into the expression bar.
                </p>
              </div>
              {REFERENCE_SECTIONS.map(section => (
                <div key={section.heading} className="px-4 py-3 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{section.heading}</p>
                  <div className="space-y-1.5">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <code className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-mono text-slate-700 leading-relaxed">
                          {item.syntax}
                        </code>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
                <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-1">SAT Note</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  The SAT graphing calculator accepts natural math notation. Most expressions you type here will behave the same way on the actual exam.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      </div>{/* end flex row */}
    </div>
  )
}
