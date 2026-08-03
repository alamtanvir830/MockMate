'use client'

import { use, useState, useCallback, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getMathSkill, allMathSkills } from '@/lib/academy/math'
import type { MathAcademySkill, GuidedExample, DrillQuestion } from '@/lib/academy/math/types'
import type { AnswerLabel } from '@/lib/academy/types'
import {
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
} from '@/lib/academy/math/skill-mapping'

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'strategy' | 'traps' | 'examples' | 'drill' | 'mastery'

type MasteryStatus = 'not_started' | 'learning' | 'developing' | 'proficient' | 'mastered'

interface SkillMastery {
  masteryPct: number
  masteryStatus: MasteryStatus
  attemptCount: number
}

const MASTERY_STATUS_LABEL: Record<MasteryStatus, string> = {
  not_started: 'Not Started',
  learning:    'Learning',
  developing:  'Developing',
  proficient:  'Proficient',
  mastered:    'Mastered',
}

const MASTERY_STATUS_COLOR: Record<MasteryStatus, string> = {
  not_started: 'bg-slate-100 text-slate-500',
  learning:    'bg-amber-50 text-amber-600',
  developing:  'bg-orange-50 text-orange-600',
  proficient:  'bg-blue-50 text-blue-600',
  mastered:    'bg-brand-50 text-brand-700',
}

// ── Utilities ──────────────────────────────────────────────────────────────────

function seededRandom(seed: number) {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
}

function shuffled<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  const rng = seededRandom(seed)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// ── Stimulus renderer ──────────────────────────────────────────────────────────

function StimulusBlock({ text }: { text: string }) {
  type Seg = { type: 'text' | 'bullets'; lines: string[] }
  const segments: Seg[] = []
  const textBuf: string[] = []
  const bulletBuf: string[] = []

  const flushText = () => {
    const joined = textBuf.splice(0).join(' ').trim()
    if (joined) segments.push({ type: 'text', lines: [joined] })
  }
  const flushBullets = () => {
    if (bulletBuf.length) segments.push({ type: 'bullets', lines: bulletBuf.splice(0) })
  }

  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) { flushBullets(); flushText(); continue }
    if (/^[•\-\*]\s/.test(line)) {
      flushText()
      bulletBuf.push(line.replace(/^[•\-\*]\s*/, ''))
    } else {
      flushBullets()
      textBuf.push(line)
    }
  }
  flushBullets(); flushText()

  return (
    <div className="space-y-3">
      {segments.map((seg, i) => {
        if (seg.type === 'bullets') return (
          <ul key={i} className="space-y-1.5 ml-1">
            {seg.lines.map((line, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        )
        return <p key={i} className="text-sm text-slate-700 leading-relaxed">{seg.lines[0]}</p>
      })}
    </div>
  )
}

// ── Cross-skill recognition check ──────────────────────────────────────────────

function MathRecognitionCheck({ excludeSlug, onComplete }: { excludeSlug: string; onComplete: () => void }) {
  const questions = useMemo(() => {
    const seed = excludeSlug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const rng = seededRandom(seed)
    const pool: (DrillQuestion & { fromSkill: string })[] = []
    for (const skill of allMathSkills) {
      if (skill.slug === excludeSlug) continue
      for (const q of skill.drillQuestions) pool.push({ ...q, fromSkill: skill.title })
    }
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, 3)
  }, [excludeSlug])

  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const q = questions[qIdx]

  const handleReveal = () => {
    if (!selected) return
    if (selected === q.correctAnswer) setCorrect(c => c + 1)
    setRevealed(true)
  }
  const handleNext = () => {
    if (qIdx < questions.length - 1) { setQIdx(i => i + 1); setSelected(null); setRevealed(false) }
    else setDone(true)
  }

  if (done) return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Mixed Recognition Check — Complete</p>
      <p className="text-sm text-brand-900 font-medium">{correct} of {questions.length} correct</p>
      <p className="text-xs text-brand-600 leading-relaxed">Recognising skill types quickly is what turns accuracy into speed on test day.</p>
      <button onClick={onComplete} className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 transition-colors">Done →</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3">
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Mixed Recognition Check</p>
        <p className="text-[11px] text-brand-500 mt-0.5">No skill labels shown until you answer.</p>
      </div>
      <span className="text-xs text-slate-400">{qIdx + 1} / {questions.length}</span>
      {q.stimulus && <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><StimulusBlock text={q.stimulus} /></div>}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>
      <div className="space-y-2">
        {q.choices.map(choice => {
          const isSelected = selected === choice.label
          const isCorrectChoice = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrectChoice) cls = 'border-brand-500 bg-brand-50 cursor-default'
            else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSelected) cls = 'border-brand-400 bg-brand-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed} onClick={() => !revealed && setSelected(choice.label as AnswerLabel)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">{choice.label}</span>
              <span className="text-sm text-slate-700">{choice.text}</span>
            </button>
          )
        })}
      </div>
      {!revealed
        ? <button disabled={!selected} onClick={handleReveal} className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition-colors">Submit</button>
        : <div className="space-y-2">
            <div className={cn('rounded-lg border p-4 space-y-1', selected === q.correctAnswer ? 'border-brand-300 bg-brand-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider', selected === q.correctAnswer ? 'text-brand-600' : 'text-red-600')}>{selected === q.correctAnswer ? 'Correct' : 'Incorrect — correct: ' + q.correctAnswer}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
              <p className="mt-1 text-xs font-semibold text-brand-600">Skill: <span className="text-brand-800">{q.fromSkill}</span></p>
            </div>
            <button onClick={handleNext} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              {qIdx < questions.length - 1 ? 'Next →' : 'See summary'}
            </button>
          </div>}
    </div>
  )
}

// ── Overview tab ───────────────────────────────────────────────────────────────

function OverviewTab({ skill, onComplete }: { skill: MathAcademySkill; onComplete: () => void }) {
  const o = skill.overview
  const [qckSelected, setQckSelected] = useState<AnswerLabel | null>(null)
  const [qckRevealed, setQckRevealed] = useState(false)

  return (
    <div className="space-y-8 max-w-2xl">
      {skill.objective && (
        <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-1.5">Learning objective</p>
          <p className="text-sm font-medium text-brand-900 leading-relaxed">{skill.objective}</p>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800">What this skill tests</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{o.whatItTests}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800">How it appears on the SAT</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{o.howItAppears}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800">Why students miss these questions</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{o.whyStudentsMissIt}</p>
      </div>

      {o.skillAnatomy && o.skillAnatomy.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-800">Skill anatomy</h3>
          <ol className="space-y-1.5">
            {o.skillAnatomy.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {o.keyFormulas && o.keyFormulas.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-800">Key formulas</h3>
          <ul className="space-y-1.5">
            {o.keyFormulas.map((f, i) => (
              <li key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono text-slate-700">{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-l-2 border-brand-400 pl-4 py-3 pr-4 rounded-r-lg bg-brand-50/70">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1.5">Key takeaway</p>
        <p className="text-sm text-brand-900 leading-relaxed">{o.whatToLookFor}</p>
      </div>

      {o.quickCheckQuestion && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">One-minute check</p>
          {o.quickCheckQuestion.stimulus && (
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3"><StimulusBlock text={o.quickCheckQuestion.stimulus} /></div>
          )}
          <p className="text-sm font-medium text-slate-900">{o.quickCheckQuestion.question}</p>
          <div className="space-y-2">
            {o.quickCheckQuestion.choices.map(c => {
              const isSel = qckSelected === c.label
              const isCorr = c.label === o.quickCheckQuestion!.correctAnswer
              let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
              if (qckRevealed) {
                if (isCorr) cls = 'border-brand-500 bg-brand-50 cursor-default'
                else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
                else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
              } else if (isSel) cls = 'border-brand-400 bg-brand-50'
              return (
                <button key={c.label} disabled={qckRevealed} onClick={() => !qckRevealed && setQckSelected(c.label as AnswerLabel)}
                  className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">{c.label}</span>
                  <span className="text-sm text-slate-700">{c.text}</span>
                </button>
              )
            })}
          </div>
          {!qckRevealed
            ? <button disabled={!qckSelected} onClick={() => setQckRevealed(true)}
                className="rounded-lg bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 transition-colors">Check answer</button>
            : <div className={cn('rounded-lg border p-3 text-sm', qckSelected === o.quickCheckQuestion.correctAnswer ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-red-200 bg-red-50 text-red-800')}>
                <p className="font-semibold mb-1">{qckSelected === o.quickCheckQuestion.correctAnswer ? '✓ Correct' : `Incorrect — correct: ${o.quickCheckQuestion.correctAnswer}`}</p>
                <p className="text-xs leading-relaxed">{o.quickCheckQuestion.explanation}</p>
              </div>}
        </div>
      )}

      <button onClick={onComplete} className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
        Continue to Strategy →
      </button>
    </div>
  )
}

// ── Strategy tab ───────────────────────────────────────────────────────────────

function StrategyTab({ skill, onComplete }: { skill: MathAcademySkill; onComplete: () => void }) {
  const s = skill.strategy
  const [trySelected, setTrySelected] = useState<AnswerLabel | null>(null)
  const [tryRevealed, setTryRevealed] = useState(false)

  return (
    <div className="space-y-6 max-w-2xl">
      {s.intro && <p className="text-sm text-slate-600 leading-relaxed">{s.intro}</p>}

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Decision process</p>
        <ol className="space-y-2">
          {s.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {s.ruleTable && s.ruleTable.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Quick reference</p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-3 py-2 font-semibold text-slate-600">Situation</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-600">Approach</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-600">Example</th>
                  <th className="text-left px-3 py-2 font-semibold text-red-500">Avoid</th>
                </tr>
              </thead>
              <tbody>
                {s.ruleTable.map((row, i) => (
                  <tr key={i} className={cn('border-b border-slate-100', i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50')}>
                    <td className="px-3 py-2 text-slate-700">{row.situation}</td>
                    <td className="px-3 py-2 text-slate-700">{row.valid}</td>
                    <td className="px-3 py-2 text-slate-500 font-mono">{row.example}</td>
                    <td className="px-3 py-2 text-red-600">{row.invalid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1">Time-saving tip</p>
        <p className="text-sm text-amber-800 leading-relaxed">{s.timeSavingTip}</p>
      </div>

      {s.desmosDecision && (
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 mb-1">Desmos vs. manual</p>
          <p className="text-sm text-teal-800 leading-relaxed">{s.desmosDecision}</p>
        </div>
      )}

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-1">When not to overthink</p>
        <p className="text-sm text-blue-800 leading-relaxed">{s.whenNotToOverthink}</p>
      </div>

      {s.tryItQuestion && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Try the strategy</p>
          {s.tryItQuestion.stimulus && (
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3"><StimulusBlock text={s.tryItQuestion.stimulus} /></div>
          )}
          <p className="text-sm font-medium text-slate-900">{s.tryItQuestion.question}</p>
          <div className="space-y-2">
            {s.tryItQuestion.choices.map(c => {
              const isSel = trySelected === c.label
              const isCorr = c.label === s.tryItQuestion!.correctAnswer
              let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
              if (tryRevealed) {
                if (isCorr) cls = 'border-brand-500 bg-brand-50 cursor-default'
                else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
                else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
              } else if (isSel) cls = 'border-brand-400 bg-brand-50'
              return (
                <button key={c.label} disabled={tryRevealed} onClick={() => !tryRevealed && setTrySelected(c.label as AnswerLabel)}
                  className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">{c.label}</span>
                  <span className="text-sm text-slate-700">{c.text}</span>
                </button>
              )
            })}
          </div>
          {!tryRevealed
            ? <button disabled={!trySelected} onClick={() => setTryRevealed(true)}
                className="rounded-lg bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 transition-colors">Check answer</button>
            : <div className={cn('rounded-lg border p-3 text-sm', trySelected === s.tryItQuestion.correctAnswer ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-red-200 bg-red-50 text-red-800')}>
                <p className="font-semibold mb-1">{trySelected === s.tryItQuestion.correctAnswer ? '✓ Correct' : `Incorrect — correct: ${s.tryItQuestion.correctAnswer}`}</p>
                <p className="text-xs leading-relaxed">{s.tryItQuestion.explanation}</p>
              </div>}
        </div>
      )}

      <button onClick={onComplete} className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
        Continue to Common Traps →
      </button>
    </div>
  )
}

// ── Common Traps tab ───────────────────────────────────────────────────────────

function TrapsTab({ skill, onComplete }: { skill: MathAcademySkill; onComplete: () => void }) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="space-y-5 max-w-2xl">
      <p className="text-xs text-slate-400 leading-relaxed">
        These are the most common errors on this skill. Knowing the trap is half of avoiding it.
      </p>
      <div className="space-y-2">
        {skill.commonTraps.map((trap, i) => (
          <div key={i} className="rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-red-400 text-base leading-none" aria-hidden="true">⚠</span>
                <span className="text-sm font-semibold text-slate-800">{trap.title}</span>
              </div>
              <svg className={cn('h-4 w-4 text-slate-400 transition-transform', expanded === i && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded === i && (
              <div className="border-t border-slate-200 px-4 py-4 space-y-3 bg-white">
                <p className="text-sm text-slate-700 leading-relaxed">{trap.description}</p>
                {trap.miniExample && (
                  <div className="rounded-md bg-red-50 border border-red-100 px-3 py-2">
                    <p className="text-[11px] font-semibold text-red-500 mb-0.5 uppercase tracking-wider">Example</p>
                    <p className="text-xs text-red-700 leading-relaxed font-mono">{trap.miniExample}</p>
                  </div>
                )}
                <div className="rounded-md bg-green-50 border border-green-100 px-3 py-2">
                  <p className="text-[11px] font-semibold text-green-600 mb-0.5 uppercase tracking-wider">How to avoid</p>
                  <p className="text-xs text-green-800 leading-relaxed">{trap.avoidance}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={onComplete} className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
        Continue to Guided Examples →
      </button>
    </div>
  )
}

// ── Guided Examples tab ────────────────────────────────────────────────────────

function GuidedExamplesTab({ examples, skillSlug, onComplete }: { examples: GuidedExample[]; skillSlug: string; onComplete: () => void }) {
  const [exIdx, setExIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [hintIdx, setHintIdx] = useState(-1)
  const [seen, setSeen] = useState<Set<number>>(new Set([0]))

  const ex = examples[exIdx]
  const totalSteps = ex.steps.length

  const goToExample = (idx: number) => {
    setExIdx(idx)
    setStepIdx(0)
    setSelectedAnswer(null)
    setRevealed(false)
    setHintIdx(-1)
    setSeen(prev => new Set([...prev, idx]))
  }

  const allSeen = examples.every((_, i) => seen.has(i))

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Example selector */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-semibold text-slate-900">
          Example {exIdx + 1} of {examples.length}
          {ex.level && (
            <span className={cn('ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              ex.level === 'foundation'       ? 'bg-green-100 text-green-700' :
              ex.level === 'sat-application'  ? 'bg-blue-100 text-blue-700' :
              ex.level === 'advanced'         ? 'bg-purple-100 text-purple-700' :
              'bg-red-100 text-red-700',
            )}>{ex.level === 'sat-application' ? 'SAT Application' : ex.level}</span>
          )}
        </h2>
        <div className="flex gap-1 flex-wrap">
          {examples.map((_, i) => (
            <button key={i} onClick={() => goToExample(i)}
              className={cn('w-7 h-7 rounded-full text-xs font-bold transition-colors',
                exIdx === i ? 'bg-brand-600 text-white' :
                seen.has(i) ? 'bg-brand-100 text-brand-700' :
                'bg-slate-100 text-slate-500 hover:bg-slate-200',
              )}>{i + 1}</button>
          ))}
        </div>
      </div>

      {ex.subskill && (
        <p className="text-[11px] text-slate-400">Subskill: <span className="font-semibold text-slate-600">{ex.subskill}</span></p>
      )}

      {ex.stimulus && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Context</p>
          <StimulusBlock text={ex.stimulus} />
        </div>
      )}

      <p className="text-sm font-medium text-slate-900 pt-1">{ex.question}</p>

      {/* Hints */}
      {ex.hints && ex.hints.length > 0 && (
        <div className="space-y-2">
          {hintIdx >= 0 && ex.hints.slice(0, hintIdx + 1).map((hint, i) => (
            <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-0.5">Hint {i + 1}</p>
              <p className="text-xs text-amber-800 leading-relaxed">{hint}</p>
            </div>
          ))}
          {!revealed && hintIdx < ex.hints.length - 1 && (
            <button onClick={() => setHintIdx(h => h + 1)}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              {hintIdx < 0 ? 'Show hint' : 'Next hint →'}
            </button>
          )}
        </div>
      )}

      {/* Answer choices */}
      <div className="space-y-2.5">
        {ex.choices.map(choice => {
          const isSelected = selectedAnswer === choice.label
          const isCorrect = choice.label === ex.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-brand-500 bg-brand-50 cursor-default'
            else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-50 cursor-default'
          } else if (isSelected) cls = 'border-brand-400 bg-brand-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed} onClick={() => !revealed && setSelectedAnswer(choice.label as AnswerLabel)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
            </button>
          )
        })}
      </div>

      {/* Walkthrough steps — revealed progressively before submitting */}
      <div className="space-y-4 pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Step-by-step — {stepIdx + 1} of {totalSteps}</p>
        <div className="space-y-3">
          {ex.steps.slice(0, stepIdx + 1).map((step, i) => (
            <div key={i} className={cn('rounded-lg border px-4 py-3.5 space-y-1.5', i === stepIdx ? 'border-brand-300 bg-brand-50' : 'border-slate-200 bg-slate-50')}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Step {i + 1}: {step.instruction}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{step.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1 flex-wrap">
          {stepIdx < totalSteps - 1 && (
            <button onClick={() => setStepIdx(stepIdx + 1)}
              className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 transition-colors">Next step →</button>
          )}
          {stepIdx === totalSteps - 1 && !revealed && (
            <button onClick={() => setRevealed(true)}
              className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors">Reveal answer</button>
          )}
        </div>
      </div>

      {/* Result + analysis */}
      {revealed && (
        <div className="space-y-4 pt-2">
          <div className="rounded-lg border border-brand-300 bg-brand-50 px-5 py-4 space-y-3">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-brand-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-sm font-semibold text-brand-700">Correct answer: {ex.correctAnswer}</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{ex.explanation}</p>
          </div>

          {ex.wrongAnswerExplanations && Object.keys(ex.wrongAnswerExplanations).length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Why the other choices fail</p>
              {(Object.entries(ex.wrongAnswerExplanations) as [AnswerLabel, string][]).map(([label, text]) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">{label}</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          )}

          {ex.desmos && (
            <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-600">Desmos method</p>
                <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold',
                  ex.desmos.recommendation === 'recommended'    ? 'bg-teal-100 text-teal-700' :
                  ex.desmos.recommendation === 'optional'       ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-500')}>
                  {ex.desmos.recommendation === 'recommended' ? 'Recommended' : ex.desmos.recommendation === 'optional' ? 'Optional' : 'Not recommended'}
                </span>
              </div>
              <div className="rounded-md border border-teal-200 bg-white/70 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-500 mb-0.5">Type into Desmos</p>
                <p className="text-xs font-mono text-teal-900 leading-relaxed">{ex.desmos.entry}</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{ex.desmos.note}</p>
            </div>
          )}

          {ex.coachTakeaway && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Coach's takeaway</p>
              <p className="text-sm text-slate-700 leading-relaxed">{ex.coachTakeaway}</p>
            </div>
          )}

          {exIdx < examples.length - 1
            ? <button onClick={() => goToExample(exIdx + 1)}
                className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 transition-colors">Next example →</button>
            : allSeen && (
                <button onClick={onComplete}
                  className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">Continue to Drill →</button>
              )
          }
        </div>
      )}
    </div>
  )
}

// ── Drill tab ──────────────────────────────────────────────────────────────────

type DrillMode = 'learn' | 'timed' | 'missed'

function DrillTab({ questions, skillSlug, onComplete }: { questions: DrillQuestion[]; skillSlug: string; onComplete: () => void }) {
  const [mode, setMode] = useState<DrillMode | null>(null)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [confidence, setConfidence] = useState<'guessing' | 'unsure' | 'confident' | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [showMixed, setShowMixed] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean; qId: string }[]>([])
  const [timeLeft, setTimeLeft] = useState(75)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Shuffle questions deterministically per mode
  const shuffledQuestions = useMemo(() => {
    const seed = skillSlug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    return shuffled(questions, seed + (mode === 'timed' ? 1 : 0))
  }, [questions, skillSlug, mode])

  // Missed questions (from previous Learn session)
  const missedIds = useMemo(() => answers.filter(a => !a.correct).map(a => a.qId), [answers])
  const missedQuestions = useMemo(
    () => shuffledQuestions.filter(q => missedIds.includes(q.id)),
    [shuffledQuestions, missedIds],
  )
  const activeQuestions = mode === 'missed' ? missedQuestions : shuffledQuestions

  const q = activeQuestions[qIdx]
  const isLast = qIdx === activeQuestions.length - 1

  // Timed mode countdown
  useEffect(() => {
    if (mode !== 'timed' || revealed || done || !q) return
    setTimeLeft(75)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          handleSubmit(null, true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx, mode, done])

  const handleSubmit = useCallback(async (override?: AnswerLabel | null, timeout = false) => {
    const ans = override !== undefined ? override : selected
    if (!ans && !timeout) return
    if (timerRef.current) clearInterval(timerRef.current)
    const correct = ans === q.correctAnswer
    setRevealed(true)
    if (correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, { correct, qId: q.id }])

    try {
      await fetch('/api/academy/math-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId:     q.id,
          skillSlug:      q.skillSlug,
          subskillSlug:   q.subskill ?? null,
          difficulty:     q.difficulty,
          selectedAnswer: ans ?? null,
          correctAnswer:  q.correctAnswer,
          isCorrect:      correct,
          practiceMode:   'skill_drill',
          confidence:     confidence ?? null,
          timed:          mode === 'timed',
          errorCategory:  q.errorCategory ?? null,
          contentVersion: q.contentVersion ?? 1,
        }),
      })
    } catch { /* non-blocking */ }
  }, [selected, q, confidence, mode])

  const handleNext = () => {
    if (isLast) {
      setDone(true)
      if (mode === 'learn') setShowMixed(true)
    } else {
      setQIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
      setConfidence(null)
    }
  }

  const markComplete = useCallback(async () => {
    try {
      await fetch('/api/academy/math-lesson-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillSlug, status: 'completed' }),
      })
    } catch { /* non-blocking */ }
    onComplete()
  }, [skillSlug, onComplete])

  const resetDrill = () => {
    setQIdx(0); setSelected(null); setRevealed(false); setConfidence(null)
    setScore(0); setDone(false); setShowMixed(false); setAnswers([])
  }

  // Mode selector
  if (!mode) {
    return (
      <div className="space-y-6 max-w-sm">
        <h2 className="text-base font-semibold text-slate-900">Choose a drill mode</h2>
        <div className="space-y-3">
          {[
            { id: 'learn' as DrillMode, label: 'Learn Mode', desc: 'Immediate feedback, hints available, build toward mastery', color: 'border-brand-200 bg-brand-50 hover:bg-brand-100' },
            { id: 'timed' as DrillMode, label: 'Timed Mode', desc: '75 seconds per question — realistic SAT pacing, no hints', color: 'border-amber-200 bg-amber-50 hover:bg-amber-100' },
            { id: 'missed' as DrillMode, label: 'Missed Questions', desc: 'Retry only the questions you got wrong in Learn Mode', color: missedIds.length === 0 ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed' : 'border-slate-200 bg-slate-50 hover:bg-slate-100', disabled: missedIds.length === 0 },
          ].map(({ id, label, desc, color, disabled }) => (
            <button key={id} disabled={disabled} onClick={() => { resetDrill(); setMode(id) }}
              className={cn('w-full text-left rounded-xl border p-4 transition-colors', color)}>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">{label}</p>
              <p className="text-xs text-slate-500">{desc}</p>
              {id === 'missed' && missedIds.length === 0 && (
                <p className="text-xs text-slate-400 mt-1">Complete Learn Mode first to see missed questions here.</p>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const pct = activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0

  // Results screen
  if (done) {
    if (showMixed) {
      return (
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-slate-900">Drill Complete</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center space-y-2">
            <div className={cn('text-5xl font-bold', pct >= 80 ? 'text-brand-600' : pct >= 60 ? 'text-amber-500' : 'text-red-500')}>{pct}%</div>
            <p className="text-slate-500 text-sm">{score} of {activeQuestions.length} correct</p>
            <div className="flex gap-1.5 justify-center flex-wrap pt-2">
              {answers.map((a, i) => (
                <span key={i} className={cn('inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold', a.correct ? 'bg-brand-100 text-brand-700' : 'bg-red-100 text-red-700')}>{i + 1}</span>
              ))}
            </div>
            {pct >= 80
              ? <p className="text-xs text-brand-600 font-medium pt-1">Strong work. Head to Mastery to lock this in.</p>
              : pct >= 60
              ? <p className="text-xs text-amber-600 font-medium pt-1">Good progress. Review missed questions, then try Mastery.</p>
              : <p className="text-xs text-red-600 font-medium pt-1">Review the Strategy and Traps tabs, then try again.</p>}
          </div>
          <p className="text-xs text-slate-500">Now test cross-skill recognition — 3 questions from other Math skills.</p>
          <MathRecognitionCheck excludeSlug={skillSlug} onComplete={markComplete} />
        </div>
      )
    }
    return (
      <div className="space-y-5">
        <h2 className="text-base font-semibold text-slate-900">Drill Complete</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className={cn('text-5xl font-bold mb-2', pct >= 80 ? 'text-brand-600' : pct >= 60 ? 'text-amber-500' : 'text-red-500')}>{pct}%</div>
          <p className="text-slate-500 text-sm mb-4">{score} of {activeQuestions.length} correct</p>
          <div className="flex gap-1.5 justify-center flex-wrap mb-6">
            {answers.map((a, i) => (
              <span key={i} className={cn('inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold', a.correct ? 'bg-brand-100 text-brand-700' : 'bg-red-100 text-red-700')}>{i + 1}</span>
            ))}
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            <button onClick={() => { resetDrill(); setMode(null) }}
              className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-5 py-2.5 transition-colors">Back to modes</button>
            <button onClick={() => { resetDrill(); setMode(mode) }}
              className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">Retry</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900">{mode === 'learn' ? 'Learn Mode' : mode === 'timed' ? 'Timed Mode' : 'Missed Questions'}</h2>
          {mode === 'timed' && !revealed && (
            <span className={cn('text-sm font-bold tabular-nums', timeLeft <= 10 ? 'text-red-500' : 'text-slate-500')}>{timeLeft}s</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{qIdx + 1} / {activeQuestions.length}</span>
          <button onClick={() => { resetDrill(); setMode(null) }} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">← modes</button>
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-brand-500 h-1.5 rounded-full transition-all" style={{ width: `${(qIdx / activeQuestions.length) * 100}%` }} />
      </div>

      <div className="flex items-center gap-2">
        <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border',
          q.difficulty === 'easy'   ? 'bg-green-50 text-green-700 border-green-200' :
          q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-red-50 text-red-700 border-red-200')}>{q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}</span>
        {q.subskill && <span className="text-[11px] text-slate-400">{q.subskill}</span>}
      </div>

      {q.stimulus && <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><StimulusBlock text={q.stimulus} /></div>}

      <p className="text-sm font-medium text-slate-900">{q.question}</p>

      <div className="space-y-2">
        {q.choices.map(choice => {
          const isSelected = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-brand-500 bg-brand-50 cursor-default'
            else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSelected) cls = 'border-brand-400 bg-brand-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed} onClick={() => !revealed && setSelected(choice.label as AnswerLabel)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">{choice.label}</span>
              <span className="text-sm text-slate-700">{choice.text}</span>
            </button>
          )
        })}
      </div>

      {/* Confidence picker (Learn mode only, before submission) */}
      {mode === 'learn' && selected && !revealed && (
        <div className="space-y-1.5">
          <p className="text-[11px] text-slate-400 font-medium">How confident are you?</p>
          <div className="flex gap-2">
            {(['guessing', 'unsure', 'confident'] as const).map(c => (
              <button key={c} onClick={() => setConfidence(c)}
                className={cn('rounded-full px-3 py-1 text-[11px] font-semibold border transition-colors capitalize',
                  confidence === c ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400')}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {!revealed
        ? <button disabled={!selected} onClick={() => handleSubmit()}
            className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition-colors">Submit answer</button>
        : <div className="space-y-3">
            <div className={cn('rounded-lg border p-4', selected === q.correctAnswer ? 'border-brand-300 bg-brand-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', selected === q.correctAnswer ? 'text-brand-600' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : 'Incorrect — correct answer: ' + q.correctAnswer}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
              {q.wrongAnswerExplanations && selected && selected !== q.correctAnswer && q.wrongAnswerExplanations[selected] && (
                <p className="mt-2 text-xs text-slate-500 leading-relaxed border-t border-current/10 pt-2">
                  <span className="font-bold">Why ({selected}) is wrong:</span> {q.wrongAnswerExplanations[selected]}
                </p>
              )}
              {mode === 'learn' && <p className="mt-2 text-xs text-slate-500 italic border-t border-current/10 pt-2">{q.teachingPoint}</p>}
            </div>
            <button onClick={handleNext} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              {isLast ? 'See results' : 'Next question →'}
            </button>
          </div>}
    </div>
  )
}

// ── Mastery tab — real 12-question assessment ──────────────────────────────────

function MasteryTab({ skill, masteryData, onComplete }: {
  skill: MathAcademySkill
  masteryData: SkillMastery | null
  onComplete: () => void
}) {
  const pool = useMemo(() => {
    const base = skill.masteryQuestions && skill.masteryQuestions.length >= 6
      ? skill.masteryQuestions
      : skill.drillQuestions
    const seed = skill.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 99)
    return shuffled(base, seed).slice(0, Math.min(12, base.length))
  }, [skill])

  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean; difficulty: string }[]>([])
  const [done, setDone] = useState(false)

  const q = pool[qIdx]
  const isLast = qIdx === pool.length - 1
  const pct = answers.length > 0 ? Math.round((answers.filter(a => a.correct).length / answers.length) * 100) : 0

  const handleSubmit = async () => {
    if (!selected) return
    const correct = selected === q.correctAnswer
    setRevealed(true)
    setAnswers(prev => [...prev, { correct, difficulty: q.difficulty }])

    try {
      await fetch('/api/academy/math-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId:    q.id,
          skillSlug:     q.skillSlug,
          difficulty:    q.difficulty,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          isCorrect:     correct,
          practiceMode:  'mastery_assessment',
          contentVersion: q.contentVersion ?? 1,
        }),
      })
    } catch { /* non-blocking */ }
  }

  const handleNext = () => {
    if (isLast) setDone(true)
    else { setQIdx(i => i + 1); setSelected(null); setRevealed(false) }
  }

  // Pre-assessment info
  if (!started) {
    return (
      <div className="space-y-6 max-w-md">
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">Mastery Assessment</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {pool.length} questions covering all subskills for this lesson. No hints — simulate real test conditions.
          </p>
        </div>

        {masteryData && masteryData.attemptCount > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Current mastery</p>
            <div className="flex items-center gap-3">
              <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', MASTERY_STATUS_COLOR[masteryData.masteryStatus])}>
                {MASTERY_STATUS_LABEL[masteryData.masteryStatus]}
              </span>
              <span className="text-sm font-bold text-slate-700">{masteryData.masteryPct}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className={cn('h-2 rounded-full transition-all', masteryData.masteryPct >= 85 ? 'bg-brand-500' : masteryData.masteryPct >= 70 ? 'bg-blue-400' : 'bg-amber-400')}
                style={{ width: `${masteryData.masteryPct}%` }} />
            </div>
            <p className="text-xs text-slate-400">{masteryData.attemptCount} total attempts</p>
          </div>
        )}

        <div className="space-y-2 text-xs text-slate-500">
          <div className="flex gap-2"><span className="font-semibold text-green-600 w-16">Easy</span>1.0× weight</div>
          <div className="flex gap-2"><span className="font-semibold text-amber-600 w-16">Medium</span>1.25× weight</div>
          <div className="flex gap-2"><span className="font-semibold text-red-600 w-16">Hard</span>1.5× weight</div>
          <p className="pt-1 text-slate-400">Mastered = weighted score ≥ 85% across ≥ 15 total attempts.</p>
        </div>

        <button onClick={() => setStarted(true)} className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          Start Mastery Assessment
        </button>
      </div>
    )
  }

  // Results
  if (done) {
    const correct = answers.filter(a => a.correct).length
    let recommendation = ''
    if (pct >= 90) recommendation = 'Excellent. Continue to the next lesson in your pathway.'
    else if (pct >= 80) recommendation = 'Strong. Continue to the next lesson and return here for a spaced review.'
    else if (pct >= 60) recommendation = 'Review the Strategy and Common Traps tabs, then complete another Drill session before retrying Mastery.'
    else recommendation = 'Return to the Overview and Strategy tabs to review foundations, then complete two Drill sessions.'

    return (
      <div className="space-y-6 max-w-md">
        <h2 className="text-base font-semibold text-slate-900">Mastery Result</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center space-y-3">
          <div className={cn('text-5xl font-bold', pct >= 80 ? 'text-brand-600' : pct >= 60 ? 'text-amber-500' : 'text-red-500')}>{pct}%</div>
          <p className="text-slate-500 text-sm">{correct} of {pool.length} correct</p>
          <div className="flex gap-1.5 justify-center flex-wrap">
            {answers.map((a, i) => (
              <span key={i} className={cn('inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold', a.correct ? 'bg-brand-100 text-brand-700' : 'bg-red-100 text-red-700')}>{i + 1}</span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Recommendation</p>
          <p className="text-sm text-slate-700 leading-relaxed">{recommendation}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => { setStarted(false); setDone(false); setQIdx(0); setSelected(null); setRevealed(false); setAnswers([]) }}
            className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 transition-colors">Retry Mastery</button>
          <button onClick={onComplete} className="rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 transition-colors">Continue →</button>
        </div>
      </div>
    )
  }

  // Assessment in progress
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Mastery Assessment</h2>
        <span className="text-xs text-slate-400">{qIdx + 1} / {pool.length}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-brand-500 h-1.5 rounded-full transition-all" style={{ width: `${(qIdx / pool.length) * 100}%` }} />
      </div>
      <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border',
        q.difficulty === 'easy'   ? 'bg-green-50 text-green-700 border-green-200' :
        q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
        'bg-red-50 text-red-700 border-red-200')}>{q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}</span>
      {q.stimulus && <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><StimulusBlock text={q.stimulus} /></div>}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>
      <div className="space-y-2">
        {q.choices.map(choice => {
          const isSelected = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-brand-500 bg-brand-50 cursor-default'
            else if (isSelected) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSelected) cls = 'border-brand-400 bg-brand-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed} onClick={() => !revealed && setSelected(choice.label as AnswerLabel)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center">{choice.label}</span>
              <span className="text-sm text-slate-700">{choice.text}</span>
            </button>
          )
        })}
      </div>
      {!revealed
        ? <button disabled={!selected} onClick={handleSubmit}
            className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 transition-colors">Submit answer</button>
        : <div className="space-y-3">
            <div className={cn('rounded-lg border p-4', selected === q.correctAnswer ? 'border-brand-300 bg-brand-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', selected === q.correctAnswer ? 'text-brand-600' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : 'Incorrect — correct: ' + q.correctAnswer}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
            <button onClick={handleNext} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              {isLast ? 'See results' : 'Next →'}
            </button>
          </div>}
    </div>
  )
}

// ── Stage nav / tab bar ────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; shortLabel: string }[] = [
  { id: 'overview',  label: 'Overview',        shortLabel: 'Learn' },
  { id: 'strategy',  label: 'Strategy',         shortLabel: 'Strategy' },
  { id: 'traps',     label: 'Common Traps',     shortLabel: 'Traps' },
  { id: 'examples',  label: 'Guided Examples',  shortLabel: 'Examples' },
  { id: 'drill',     label: 'Drill',            shortLabel: 'Drill' },
  { id: 'mastery',   label: 'Mastery',          shortLabel: 'Mastery' },
]

// ── Lesson header ──────────────────────────────────────────────────────────────

function LessonHeader({
  skill,
  masteryData,
  completedTabs,
  activeTab,
}: {
  skill: MathAcademySkill
  masteryData: SkillMastery | null
  completedTabs: Set<Tab>
  activeTab: Tab
}) {
  const domainLabel = MATH_DOMAIN_DISPLAY[skill.domain]
  const badgeCls = MATH_DOMAIN_BADGE_CLASS[skill.domain]
  const mastery = masteryData
  const completedCount = completedTabs.size
  const totalStages = TABS.length

  return (
    <div className="space-y-4 pb-4 border-b border-slate-200">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/sat-math-academy" className="hover:text-slate-600 transition-colors">SAT Math Academy</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">{skill.title}</span>
      </nav>

      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{skill.title}</h1>
            <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0', badgeCls)}>
              {domainLabel}
            </span>
            {skill.desmosClassification && (
              <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0',
                skill.desmosClassification === 'recommended' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                skill.desmosClassification === 'optional'    ? 'bg-amber-50 text-amber-600 border-amber-200' :
                'bg-slate-50 text-slate-500 border-slate-200')}>
                Desmos: {skill.desmosClassification === 'not-recommended' ? 'not recommended' : skill.desmosClassification}
              </span>
            )}
          </div>
          {skill.estimatedMinutes && (
            <p className="text-xs text-slate-400">Estimated time: {skill.estimatedMinutes} min</p>
          )}
        </div>

        {/* Mastery pill */}
        {mastery && mastery.attemptCount > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <p className="text-xs text-slate-400">Mastery</p>
              <p className="text-lg font-bold text-slate-900">{mastery.masteryPct}%</p>
            </div>
            <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', MASTERY_STATUS_COLOR[mastery.masteryStatus])}>
              {MASTERY_STATUS_LABEL[mastery.masteryStatus]}
            </span>
          </div>
        )}
      </div>

      {/* Stage progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-100 rounded-full h-1.5 min-w-0">
          <div className="bg-brand-500 h-1.5 rounded-full transition-all" style={{ width: `${(completedCount / totalStages) * 100}%` }} />
        </div>
        <p className="text-xs text-slate-400 shrink-0">{completedCount} of {totalStages} stages</p>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

export default function MathLessonPage({ params }: Props) {
  const { slug } = use(params)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [completedTabs, setCompletedTabs] = useState<Set<Tab>>(new Set())
  const [masteryData, setMasteryData] = useState<SkillMastery | null>(null)

  const skill = getMathSkill(slug)

  const markTabComplete = useCallback((tab: Tab) => {
    setCompletedTabs(prev => new Set([...prev, tab]))
  }, [])

  const goToTab = useCallback((tab: Tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Fetch mastery on mount
  useEffect(() => {
    let cancelled = false
    fetch('/api/academy/math-attempts')
      .then(r => r.json())
      .then((data: { skills?: { skillSlug: string; masteryPct: number; masteryStatus: MasteryStatus; attemptCount: number }[] }) => {
        if (cancelled || !data.skills) return
        const found = data.skills.find(s => s.skillSlug === slug)
        if (found) setMasteryData({ masteryPct: found.masteryPct, masteryStatus: found.masteryStatus, attemptCount: found.attemptCount })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [slug])

  if (!skill) {
    return (
      <div className="space-y-3 p-6">
        <p className="text-sm text-slate-500">Lesson not found for <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{slug}</code>.</p>
        <Link href="/sat-math-academy" className="inline-flex text-sm text-brand-600 hover:underline">← Back to Math Academy</Link>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {/* Premium lesson header */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6">
        <LessonHeader skill={skill} masteryData={masteryData} completedTabs={completedTabs} activeTab={activeTab} />
      </div>

      {/* Stage tab bar — horizontally scrollable on mobile */}
      <div className="overflow-x-auto -mx-0 px-4 sm:px-6 pt-3">
        <div className="flex gap-0 min-w-max border-b border-slate-200">
          {TABS.map(({ id, label, shortLabel }) => {
            const isActive    = activeTab === id
            const isCompleted = completedTabs.has(id)
            return (
              <button key={id} onClick={() => goToTab(id)}
                className={cn(
                  'px-3 sm:px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors flex items-center gap-1.5',
                  isActive
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                )}>
                {isCompleted && (
                  <svg className="h-3 w-3 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{shortLabel}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 sm:px-6 py-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
          {activeTab === 'overview' && (
            <OverviewTab skill={skill} onComplete={() => { markTabComplete('overview'); goToTab('strategy') }} />
          )}
          {activeTab === 'strategy' && (
            <StrategyTab skill={skill} onComplete={() => { markTabComplete('strategy'); goToTab('traps') }} />
          )}
          {activeTab === 'traps' && (
            <TrapsTab skill={skill} onComplete={() => { markTabComplete('traps'); goToTab('examples') }} />
          )}
          {activeTab === 'examples' && (
            <GuidedExamplesTab examples={skill.guidedExamples} skillSlug={slug}
              onComplete={() => { markTabComplete('examples'); goToTab('drill') }} />
          )}
          {activeTab === 'drill' && (
            <DrillTab questions={skill.drillQuestions} skillSlug={slug}
              onComplete={() => { markTabComplete('drill'); goToTab('mastery') }} />
          )}
          {activeTab === 'mastery' && (
            <MasteryTab skill={skill} masteryData={masteryData}
              onComplete={() => { markTabComplete('mastery') }} />
          )}
        </div>
      </div>
    </div>
  )
}
