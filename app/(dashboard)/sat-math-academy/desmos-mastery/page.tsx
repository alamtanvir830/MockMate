'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Step {
  title: string
  body: string
}

interface Lesson {
  id: string
  title: string
  domain: string
  badgeClass: string
  time: string
  overview: string
  steps: Step[]
  strategyTip: string
  tryExpressions: string[]
}

// ── Lesson data ───────────────────────────────────────────────────────────────

const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Solve a Linear System Graphically',
    domain: 'Algebra',
    badgeClass: 'bg-blue-100 text-blue-700',
    time: '4 min',
    overview:
      'Instead of solving a system algebraically, type both equations into Desmos and click the intersection point. This is the fastest method for any two-equation system on the calculator section.',
    steps: [
      {
        title: 'Enter the first equation',
        body: 'Type `y = 2x + 1` into line 1. Desmos draws the line immediately.',
      },
      {
        title: 'Enter the second equation',
        body: 'Type `y = -x + 7` into line 2. A second line appears.',
      },
      {
        title: 'Click the intersection',
        body: 'Click the point where the two lines cross. Desmos labels it with exact coordinates.',
      },
      {
        title: 'Read the solution',
        body: 'The labeled point is the solution (x, y) of the system — no algebra required.',
      },
    ],
    strategyTip:
      'If the lines are parallel (no intersection) the system has no solution. If they overlap completely it has infinitely many solutions. Both are visible at a glance — no need to check determinants.',
    tryExpressions: ['y = 2x + 1', 'y = -x + 7'],
  },
  {
    id: 'l2',
    title: 'Find Roots (Zeros) of a Polynomial',
    domain: 'Advanced Math',
    badgeClass: 'bg-purple-100 text-purple-700',
    time: '3 min',
    overview:
      'Any time a question asks for the roots, zeros, or x-intercepts of a polynomial, graph it. Desmos marks each crossing automatically and shows the exact value when you click.',
    steps: [
      {
        title: 'Graph the polynomial',
        body: 'Type `y = x^2 - 5x + 6` (or any polynomial). The curve appears instantly.',
      },
      {
        title: 'Click an x-intercept',
        body: 'Click anywhere the curve touches or crosses the x-axis. Desmos shows the exact point.',
      },
      {
        title: 'Read the root',
        body: 'The x-coordinate of that point is a root of the polynomial.',
      },
      {
        title: 'Repeat for all roots',
        body: 'Click each additional crossing point to collect all roots.',
      },
    ],
    strategyTip:
      'If you see `x = 1.414…`, the root is irrational — likely √2. If you see `x = 2.000`, the root is exactly 2. Use this to identify whether the SAT answer is a clean integer or a radical form.',
    tryExpressions: ['y = x^2 - 5x + 6'],
  },
  {
    id: 'l3',
    title: 'Locate the Vertex of a Parabola',
    domain: 'Advanced Math',
    badgeClass: 'bg-purple-100 text-purple-700',
    time: '4 min',
    overview:
      "Graph any quadratic and click the tip of the parabola. Desmos labels the vertex instantly — no completing the square, no formula. This alone can save 90 seconds on a vertex question.",
    steps: [
      {
        title: 'Enter the quadratic',
        body: 'Type `y = x^2 - 6x + 5`. The parabola opens upward.',
      },
      {
        title: 'Find the tip',
        body: 'For an upward parabola, hover near the bottom-most point until the cursor snaps to it.',
      },
      {
        title: 'Click the vertex',
        body: 'Desmos labels the point — in this case `(3, -4)` — as the vertex.',
      },
      {
        title: 'Downward parabolas',
        body: 'For `y = -x^2 + 4x - 1`, click the top-most point instead. The vertex is the maximum.',
      },
    ],
    strategyTip:
      'Quick check: the vertex x-coordinate equals `-b / (2a)`. For `x^2 - 6x + 5`, that is `6 / 2 = 3`. Desmos confirms this in one click, saving you from arithmetic errors mid-test.',
    tryExpressions: ['y = x^2 - 6x + 5'],
  },
  {
    id: 'l4',
    title: 'Use Sliders to Explore Parameters',
    domain: 'Advanced Math',
    badgeClass: 'bg-purple-100 text-purple-700',
    time: '5 min',
    overview:
      'When a problem involves a coefficient like `k` or `a`, type it as a letter and accept the slider Desmos offers. Drag the slider to instantly explore how the graph responds — ideal for "for what value of k…" questions.',
    steps: [
      {
        title: 'Type a parameter',
        body: 'Enter `y = a * x^2`. Desmos detects the undefined variable `a` and prompts "Add slider: a." Click it.',
      },
      {
        title: 'Use the slider',
        body: 'Drag the slider left and right. Watch the parabola widen, narrow, flip, or scale in real time.',
      },
      {
        title: 'Find a critical value',
        body: 'To find where two graphs intersect exactly once, drag the slider until the intersection count changes from 2 to 1. Read the exact slider value.',
      },
      {
        title: 'Set a precise value',
        body: 'Click the slider number and type the exact value (e.g., `3`) to lock it in for a clean read.',
      },
    ],
    strategyTip:
      'Sliders work with any variable letter except x, y, and e. For exponential parameters, try `y = a * b^x` — Desmos creates sliders for both `a` and `b` simultaneously.',
    tryExpressions: ['y = a * x^2'],
  },
  {
    id: 'l5',
    title: 'Solve Inequalities Graphically',
    domain: 'Algebra',
    badgeClass: 'bg-blue-100 text-blue-700',
    time: '4 min',
    overview:
      'Type an inequality directly and Desmos shades the solution region automatically. For a system of inequalities, the overlap is the solution set — visible at a glance.',
    steps: [
      {
        title: 'Enter an inequality',
        body: 'Type `y > 2x - 3`. Desmos shades the region above the line.',
      },
      {
        title: 'Add a second inequality',
        body: 'Type `y < -x + 4` on the next line. Desmos shades below that line in a different color.',
      },
      {
        title: 'Find the overlap',
        body: 'The region shaded by both inequalities is the solution set of the system.',
      },
      {
        title: 'Check a specific point',
        body: 'Click a point in the overlap to confirm its coordinates fall in the solution set.',
      },
    ],
    strategyTip:
      'Two-variable linear inequality systems appear in Algebra questions where you must identify feasible regions. On the SAT, the answer is usually a specific corner point or a description of the region — Desmos shows both.',
    tryExpressions: ['y > 2x - 3', 'y < -x + 4'],
  },
  {
    id: 'l6',
    title: 'Check Circle Equations',
    domain: 'Geometry',
    badgeClass: 'bg-orange-100 text-orange-700',
    time: '4 min',
    overview:
      'Enter a circle equation in standard or general form and Desmos draws it immediately. Click the circle or hover near the center to verify the center coordinates and radius.',
    steps: [
      {
        title: 'Enter standard form',
        body: 'Type `(x - 3)^2 + (y + 1)^2 = 25`. Desmos draws a circle of radius 5 centered at (3, -1).',
      },
      {
        title: 'Verify the center',
        body: 'Hover near the apparent center. Desmos labels it at `(3, -1)` confirming the center.',
      },
      {
        title: 'Add a line or other curve',
        body: 'Type `y = x + 2` to see where the line intersects the circle. Click each intersection point.',
      },
      {
        title: 'General form works too',
        body: 'Type `x^2 + y^2 - 6x + 2y - 15 = 0` directly — Desmos still plots the circle without you completing the square.',
      },
    ],
    strategyTip:
      'If the SAT gives a circle in general form, type it straight into Desmos. Read the center and radius from the graph rather than completing the square by hand — saves 2–3 minutes on a tricky geometry question.',
    tryExpressions: ['(x - 3)^2 + (y + 1)^2 = 25'],
  },
  {
    id: 'l7',
    title: 'Verify Answers by Function Evaluation',
    domain: 'Cross-domain',
    badgeClass: 'bg-slate-100 text-slate-700',
    time: '3 min',
    overview:
      'Define any function in Desmos and evaluate it at specific values. This eliminates arithmetic errors when checking answer choices and works for any expression the SAT throws at you.',
    steps: [
      {
        title: 'Define the function',
        body: 'Type `f(x) = 2x^2 - 3x + 1`. Desmos stores the definition.',
      },
      {
        title: 'Evaluate at a point',
        body: 'On the next line, type `f(5)`. Desmos displays `36` — the exact value of f at x = 5.',
      },
      {
        title: 'Check answer choices',
        body: 'If choices are 34, 36, 38, 42 — you already know it is 36 without any mental math.',
      },
      {
        title: 'Reuse for composed functions',
        body: 'Type `g(x) = f(x) + 3` or `f(g(x))` — Desmos handles function composition automatically.',
      },
    ],
    strategyTip:
      'Function notation saves time on "evaluate and compare" questions. Define the function once, then evaluate at 3–4 answer choices in 10 seconds each. No re-entering the expression, no sign errors.',
    tryExpressions: ['f(x) = 2x^2 - 3x + 1'],
  },
  {
    id: 'l8',
    title: 'Model Intersections in Context',
    domain: 'Problem Solving & Data',
    badgeClass: 'bg-green-100 text-green-700',
    time: '5 min',
    overview:
      "For break-even, crossing-rates, or 'when are two quantities equal' word problems, translate each quantity to a y = expression and find the intersection. One graph answers both 'when' and 'how much' sub-questions.",
    steps: [
      {
        title: 'Translate to equations',
        body: 'Identify the two quantities. E.g., "Company A costs $50x + $200; Company B costs $80x + $50." Enter `y = 50x + 200` and `y = 80x + 50`.',
      },
      {
        title: 'Find the intersection',
        body: 'Click the intersection point. Desmos labels it — e.g., `(5, 450)` — meaning break-even is at 5 units, costing $450.',
      },
      {
        title: 'Read the answer',
        body: 'The x-coordinate answers "when" (how many units, how many months, etc.). The y-coordinate answers "how much" (cost, distance, population, etc.).',
      },
      {
        title: 'Extend for non-linear models',
        body: 'The same technique works for exponential vs. linear: `y = 100 * 1.1^x` and `y = 50x + 100`. Find when exponential overtakes linear.',
      },
    ],
    strategyTip:
      'Many PSDA multi-part questions give you both "at what x do they cross?" and "what is the value at that point?" — two questions answered in one intersection click. Look for this pattern to pick up quick points.',
    tryExpressions: ['y = 50x + 200', 'y = 80x + 50'],
  },
]

// ── Chevron icon ──────────────────────────────────────────────────────────────

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={cn('h-4 w-4 shrink-0 transition-transform duration-200', open && 'rotate-180')}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

// ── Lesson card ───────────────────────────────────────────────────────────────

function LessonCard({ lesson, open, onToggle }: { lesson: Lesson; open: boolean; onToggle: () => void }) {
  return (
    <div className={cn(
      'rounded-xl border bg-white transition-shadow',
      open ? 'border-indigo-200 shadow-sm' : 'border-slate-200 hover:border-slate-300',
    )}>
      {/* Header row */}
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-5 py-4 text-left"
      >
        <div className="mt-0.5 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider', lesson.badgeClass)}>
              {lesson.domain}
            </span>
            <span className="text-[11px] text-slate-400">{lesson.time}</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">{lesson.title}</p>
          {!open && (
            <p className="text-xs text-slate-500 line-clamp-1">{lesson.overview}</p>
          )}
        </div>
        <ChevronDown open={open} />
      </button>

      {/* Expanded body */}
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-5">
          {/* Overview */}
          <p className="text-sm text-slate-700 leading-relaxed">{lesson.overview}</p>

          {/* Steps */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Steps</p>
            <ol className="space-y-3">
              {lesson.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{step.title}</p>
                    <p className="mt-0.5 text-[12px] text-slate-600 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Expressions to try */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Expressions to try</p>
            <div className="flex flex-wrap gap-2">
              {lesson.tryExpressions.map((expr, i) => (
                <code
                  key={i}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-mono text-slate-700"
                >
                  {expr}
                </code>
              ))}
            </div>
          </div>

          {/* Strategy tip */}
          <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">SAT Strategy</p>
            <p className="text-[12px] text-amber-900 leading-relaxed">{lesson.strategyTip}</p>
          </div>

          {/* Try in sandbox */}
          <Link
            href="/sat-math-academy/desmos-sandbox"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
            </svg>
            Practice in Desmos Sandbox
          </Link>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DemosMasteryPage() {
  const [openId, setOpenId] = useState<string | null>('l1')

  function toggle(id: string) {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Desmos Mastery Lessons</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            8 step-by-step lessons on SAT graphing calculator techniques — from systems to sliders.
          </p>
        </div>
        <Link
          href="/sat-math-academy/desmos-sandbox"
          className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          Open Sandbox →
        </Link>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700">Work through all 8 lessons</p>
          <p className="text-[11px] text-slate-500">Open each card, follow the steps, and try the expressions in the sandbox alongside.</p>
        </div>
      </div>

      {/* Lesson list */}
      <div className="space-y-2">
        {LESSONS.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            open={openId === lesson.id}
            onToggle={() => toggle(lesson.id)}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-slate-400 text-center pb-2">
        Desmos Graphing Calculator is not affiliated with College Board or the SAT exam.
      </p>
    </div>
  )
}
