'use client'

import { use, useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getSkill, allSkills } from '@/lib/academy'
import type {
  GuidedExample,
  DrillQuestion,
  AcademySkill,
  AnswerLabel,
  SkillLevel,
  KnowledgeCheck,
  CommonTrap,
} from '@/lib/academy/types'
import { getDomainForSkill } from '@/lib/academy/types'

// ── Constants ─────────────────────────────────────────────────────────────────

const LEVEL_LABEL: Record<SkillLevel, string> = {
  'foundation': 'Foundation',
  'sat-application': 'SAT Application',
  'advanced': 'Advanced',
  'challenge': '750+ Challenge',
}

const LEVEL_COLOR: Record<SkillLevel, string> = {
  'foundation': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'sat-application': 'bg-blue-50 text-blue-700 border-blue-200',
  'advanced': 'bg-violet-50 text-violet-700 border-violet-200',
  'challenge': 'bg-amber-50 text-amber-700 border-amber-200',
}

const DOMAIN_DISPLAY: Record<string, string> = {
  'standard-english-conventions': 'Standard English Conventions',
  'expression-of-ideas': 'Expression of Ideas',
  'craft-and-structure': 'Craft and Structure',
  'information-and-ideas': 'Information and Ideas',
}

const DOMAIN_BADGE: Record<string, string> = {
  'standard-english-conventions': 'border-violet-200 bg-violet-50 text-violet-700',
  'expression-of-ideas': 'border-teal-200 bg-teal-50 text-teal-700',
  'craft-and-structure': 'border-sky-200 bg-sky-50 text-sky-700',
  'information-and-ideas': 'border-indigo-200 bg-indigo-50 text-indigo-700',
}

const MASTERY_COLOR: Record<string, string> = {
  not_started: 'text-slate-400',
  learning: 'text-amber-600',
  developing: 'text-orange-600',
  proficient: 'text-blue-600',
  mastered: 'text-emerald-600',
}

const MASTERY_LABEL: Record<string, string> = {
  not_started: 'Not Started',
  learning: 'Learning',
  developing: 'Developing',
  proficient: 'Proficient',
  mastered: 'Mastered',
}

const TRAP_CATEGORY_LABEL: Record<string, string> = {
  clause: 'Clause',
  punctuation: 'Punctuation',
  'connecting-word': 'Connecting Word',
  meaning: 'Meaning',
}

const TRAP_CATEGORY_COLOR: Record<string, string> = {
  clause: 'bg-violet-50 text-violet-600 border-violet-200',
  punctuation: 'bg-red-50 text-red-600 border-red-200',
  'connecting-word': 'bg-amber-50 text-amber-600 border-amber-200',
  meaning: 'bg-blue-50 text-blue-600 border-blue-200',
}

// ── Tab types ─────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'strategy' | 'traps' | 'examples' | 'drill' | 'mastery'
type DrillMode = 'learn' | 'timed' | 'missed'

const TABS: { id: Tab; label: string; stageLabel: string }[] = [
  { id: 'overview',  label: 'Overview',        stageLabel: 'Learn' },
  { id: 'strategy',  label: 'Strategy',         stageLabel: 'Strategy' },
  { id: 'traps',     label: 'Common Traps',     stageLabel: 'Traps' },
  { id: 'examples',  label: 'Guided Examples',  stageLabel: 'Examples' },
  { id: 'drill',     label: 'Practice',         stageLabel: 'Practice' },
  { id: 'mastery',   label: 'Mastery Check',    stageLabel: 'Mastery' },
]

// ── Mastery API shape ─────────────────────────────────────────────────────────

interface SkillMastery {
  slug: string
  masteryScore: number
  masteryStatus: string
  totalAttempts: number
}

// ── Utility components ────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: SkillLevel }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold', LEVEL_COLOR[level])}>
      {LEVEL_LABEL[level]}
    </span>
  )
}

function StimulusBlock({ text, label }: { text: string; label?: string }) {
  type Seg = { type: 'text' | 'bullets' | 'goal'; lines: string[] }
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
    } else if (/^(the student wants|the student needs|which choice|the writer wants)/i.test(line)) {
      flushBullets(); flushText()
      segments.push({ type: 'goal', lines: [line] })
    } else {
      flushBullets()
      textBuf.push(line)
    }
  }
  flushBullets(); flushText()

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 space-y-2.5">
      {label && <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>}
      <div className="space-y-2.5">
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
          if (seg.type === 'goal') return (
            <p key={i} className="text-sm font-medium text-slate-800 leading-relaxed pt-0.5">{seg.lines[0]}</p>
          )
          return <p key={i} className="text-sm text-slate-700 leading-relaxed">{seg.lines[0]}</p>
        })}
      </div>
    </div>
  )
}

// ── MixedRecognitionCheck ─────────────────────────────────────────────────────

function MixedRecognitionCheck({ excludeSlug, onComplete }: { excludeSlug: string; onComplete: () => void }) {
  const questions = useMemo(() => {
    const pool: (DrillQuestion & { fromSkill: string })[] = []
    for (const skill of allSkills) {
      if (skill.slug === excludeSlug) continue
      for (const q of skill.drillQuestions) {
        pool.push({ ...q, fromSkill: skill.title })
      }
    }
    const seed = Date.now() % 0xffff
    let s = seed
    const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
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
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Cross-Skill Check — Complete</p>
      <p className="text-sm text-emerald-900 font-medium">{correct} of {questions.length} correct</p>
      <p className="text-xs text-emerald-700 leading-relaxed">Recognising skill types quickly is what turns accuracy into speed on test day.</p>
      <button onClick={onComplete} className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 transition-colors">Continue →</button>
    </div>
  )

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Cross-skill check</span>
        <span className="text-xs text-slate-400">{qIdx + 1} / {questions.length}</span>
      </div>
      {q.stimulus && <StimulusBlock text={q.stimulus} />}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>
      <div className="space-y-2">
        {q.choices.map(choice => {
          const isSel = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSel) cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed} onClick={() => !revealed && setSelected(choice.label)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
            </button>
          )
        })}
      </div>
      {!revealed
        ? <button disabled={!selected} onClick={handleReveal} className="rounded-lg bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 transition-colors">Submit</button>
        : (
          <div className="space-y-3">
            <div className={cn('rounded-lg border px-4 py-3 space-y-1', selected === q.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider', selected === q.correctAnswer ? 'text-emerald-600' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — answer: ${q.correctAnswer}`}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
              <p className="text-xs font-semibold text-slate-500 mt-1">Skill: <span className="text-slate-700">{q.fromSkill}</span></p>
            </div>
            <button onClick={handleNext} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              {qIdx < questions.length - 1 ? 'Next →' : 'Finish'}
            </button>
          </div>
        )
      }
    </div>
  )
}

// ── OverviewTab ───────────────────────────────────────────────────────────────

function InlineQuickCheck({
  q, onComplete,
}: {
  q: NonNullable<AcademySkill['overview']['quickCheckQuestion']>
  onComplete: () => void
}) {
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="space-y-3">
      {q.stimulus && <StimulusBlock text={q.stimulus} label="Text" />}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>
      <div className="space-y-2">
        {q.choices.map(choice => {
          const isSel = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSel) cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed} onClick={() => !revealed && setSelected(choice.label)}
              className={cn('w-full flex items-start gap-2.5 rounded-lg border p-3 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
            </button>
          )
        })}
      </div>
      {!revealed
        ? <button disabled={!selected} onClick={() => setRevealed(true)} className="rounded-lg bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 transition-colors">Check answer</button>
        : (
          <div className="space-y-3">
            <div className={cn('rounded-lg border px-4 py-3', selected === q.correctAnswer ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', selected === q.correctAnswer ? 'text-emerald-600' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — answer: ${q.correctAnswer}`}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
            <p className="text-[11px] text-slate-400 italic">This quick check does not affect your mastery score.</p>
            <button onClick={onComplete} className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 transition-colors">Continue to Strategy →</button>
          </div>
        )
      }
    </div>
  )
}

function OverviewTab({ skill, onComplete }: { skill: AcademySkill; onComplete: () => void }) {
  const o = skill.overview
  const [quickCheckDone, setQuickCheckDone] = useState(false)
  const [showQuickCheck, setShowQuickCheck] = useState(false)

  const handleQuickCheckComplete = () => {
    setQuickCheckDone(true)
    onComplete()
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Learning Objective */}
      {skill.objective && (
        <div className="border-l-2 border-emerald-400 pl-4 py-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">Learning Objective</p>
          <p className="text-sm text-slate-800 leading-relaxed">{skill.objective}</p>
        </div>
      )}

      {/* What this skill tests */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900">What this skill tests</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{o.whatItTests}</p>
      </div>

      {/* How it appears */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900">How it appears on the SAT</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{o.howItAppears}</p>
      </div>

      {/* Why students miss it */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900">Why students miss these questions</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{o.whyStudentsMissIt}</p>
      </div>

      {/* Skill anatomy */}
      {o.skillAnatomy && o.skillAnatomy.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">What to identify</h3>
          <ul className="space-y-2">
            {o.skillAnatomy.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key takeaway */}
      <div className="rounded-r-lg border-l-2 border-emerald-400 pl-4 py-3 pr-4 bg-emerald-50/70">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1.5">Key takeaway</p>
        <p className="text-sm text-emerald-900 leading-relaxed">{o.whatToLookFor}</p>
      </div>

      {/* One-minute diagnostic */}
      {o.quickCheckQuestion && (
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">One-minute check</h3>
            <p className="text-xs text-slate-500 mt-0.5">Try this example before moving on. It does not count toward your mastery score.</p>
          </div>

          {!showQuickCheck && !quickCheckDone && (
            <button onClick={() => setShowQuickCheck(true)} className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 px-4 py-2.5 transition-colors">
              Show example →
            </button>
          )}

          {(showQuickCheck || quickCheckDone) && (
            quickCheckDone
              ? (
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Quick check complete — continue to Strategy
                </div>
              )
              : <InlineQuickCheck q={o.quickCheckQuestion} onComplete={handleQuickCheckComplete} />
          )}
        </div>
      )}

      {/* If no quick check, show continue button */}
      {!o.quickCheckQuestion && (
        <div className="pt-2">
          <button onClick={onComplete} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
            Continue to Strategy →
          </button>
        </div>
      )}
    </div>
  )
}

// ── StrategyTab ───────────────────────────────────────────────────────────────

function StrategyTab({ skill, onComplete }: { skill: AcademySkill; onComplete: () => void }) {
  const s = skill.strategy
  const [tryItSelected, setTryItSelected] = useState<AnswerLabel | null>(null)
  const [tryItRevealed, setTryItRevealed] = useState(false)

  const handleTryItComplete = () => {
    setTryItRevealed(true)
    onComplete()
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-base font-semibold text-slate-900">Strategy</h2>

      {/* Intro */}
      {s.intro && (
        <p className="text-sm text-slate-600 leading-relaxed">{s.intro}</p>
      )}

      {/* Step-by-step */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">Step-by-step method</h3>
        <ol className="space-y-3">
          {s.steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
              <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Rule reference table */}
      {s.ruleTable && s.ruleTable.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-800">Rule reference</h3>
          <div className="overflow-x-auto -mx-1 rounded-lg border border-slate-200">
            <table className="w-full text-xs min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 w-1/4">Situation</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 w-1/4">Valid construction</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 w-1/4">Example</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 w-1/4">Common error</th>
                </tr>
              </thead>
              <tbody>
                {s.ruleTable.map((row, i) => (
                  <tr key={i} className={cn('border-b border-slate-100 last:border-0', i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50')}>
                    <td className="px-3 py-2.5 text-slate-700 align-top">{row.situation}</td>
                    <td className="px-3 py-2.5 text-emerald-700 font-medium align-top">{row.valid}</td>
                    <td className="px-3 py-2.5 text-slate-600 align-top italic">{row.example}</td>
                    <td className="px-3 py-2.5 text-red-600 align-top">{row.invalid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Time-saving tip */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1">Time-saving tip</p>
        <p className="text-sm text-amber-800 leading-relaxed">{s.timeSavingTip}</p>
      </div>

      {/* When not to overthink */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">When not to overthink</p>
        <p className="text-sm text-slate-700 leading-relaxed">{s.whenNotToOverthink}</p>
      </div>

      {/* Try it question */}
      {s.tryItQuestion && (
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Try the strategy</h3>
            <p className="text-xs text-slate-500 mt-0.5">Apply the steps you just read. Complete this to unlock Guided Examples.</p>
          </div>

          {s.tryItQuestion.stimulus && <StimulusBlock text={s.tryItQuestion.stimulus} label="Text" />}
          <p className="text-sm font-medium text-slate-900">{s.tryItQuestion.question}</p>

          <div className="space-y-2">
            {s.tryItQuestion.choices.map(choice => {
              const isSel = tryItSelected === choice.label
              const isCorrect = choice.label === s.tryItQuestion!.correctAnswer
              let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
              if (tryItRevealed) {
                if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
                else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
                else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
              } else if (isSel) cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
              return (
                <button key={choice.label} disabled={tryItRevealed}
                  onClick={() => !tryItRevealed && setTryItSelected(choice.label)}
                  className={cn('w-full flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors', cls)}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
                  <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
                </button>
              )
            })}
          </div>

          {!tryItRevealed
            ? <button disabled={!tryItSelected} onClick={handleTryItComplete}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
                Check answer
              </button>
            : (
              <div className="space-y-3">
                <div className={cn('rounded-lg border px-4 py-3.5 space-y-1.5', tryItSelected === s.tryItQuestion.correctAnswer ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50')}>
                  <p className={cn('text-xs font-bold uppercase tracking-wider', tryItSelected === s.tryItQuestion.correctAnswer ? 'text-emerald-600' : 'text-red-600')}>
                    {tryItSelected === s.tryItQuestion.correctAnswer ? 'Correct' : `Incorrect — answer: ${s.tryItQuestion.correctAnswer}`}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{s.tryItQuestion.explanation}</p>
                </div>
              </div>
            )
          }
        </div>
      )}

      {/* No try-it → simple continue */}
      {!s.tryItQuestion && (
        <button onClick={onComplete} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          Continue to Common Traps →
        </button>
      )}
    </div>
  )
}

// ── TrapsTab ──────────────────────────────────────────────────────────────────

function TrapsTab({ skill, onComplete }: { skill: AcademySkill; onComplete: () => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [filter, setFilter] = useState<string>('all')
  const traps = skill.commonTraps

  const categories = useMemo(() => {
    const cats = new Set<string>()
    for (const t of traps) { if (t.category) cats.add(t.category) }
    return Array.from(cats)
  }, [traps])

  const visible = filter === 'all' ? traps : traps.filter(t => t.category === filter)

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-base font-semibold text-slate-900">Common Traps</h2>
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setFilter('all')}
              className={cn('rounded-full px-3 py-1 text-xs font-medium transition-colors', filter === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
              All
            </button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={cn('rounded-full px-3 py-1 text-xs font-medium transition-colors', filter === cat ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                {TRAP_CATEGORY_LABEL[cat] ?? cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
        {visible.map((trap, i) => {
          const isOpen = openIdx === i
          const originalIdx = traps.indexOf(trap)
          return (
            <div key={originalIdx}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="flex-shrink-0 h-5 w-5 text-red-400" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{trap.title}</span>
                    {trap.category && (
                      <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold', TRAP_CATEGORY_COLOR[trap.category] ?? 'bg-slate-50 text-slate-600 border-slate-200')}>
                        {TRAP_CATEGORY_LABEL[trap.category] ?? trap.category}
                      </span>
                    )}
                  </div>
                </div>
                <svg className={cn('h-4 w-4 text-slate-400 flex-shrink-0 transition-transform', isOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 bg-white">
                  <p className="text-sm text-slate-600 leading-relaxed">{trap.description}</p>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3.5 py-3 space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">How to avoid it</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{trap.avoidance}</p>
                  </div>

                  {trap.miniExample && (
                    <div className="rounded-lg bg-red-50 border border-red-100 px-3.5 py-3 space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-red-500">Example of this trap</p>
                      <p className="text-sm text-red-800 leading-relaxed font-mono">{trap.miniExample}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="pt-2">
        <button onClick={onComplete} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          Continue to Guided Examples →
        </button>
      </div>
    </div>
  )
}

// ── GuidedExamplesTab ─────────────────────────────────────────────────────────

function GuidedExamplesTab({ examples, onComplete }: { examples: GuidedExample[]; onComplete: () => void }) {
  const [exIdx, setExIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [hintIdx, setHintIdx] = useState<number>(-1)
  const [seen, setSeen] = useState<Set<number>>(new Set([0]))
  const ex = examples[exIdx]
  const totalSteps = ex.steps.length

  const goToExample = (idx: number) => {
    setExIdx(idx); setStepIdx(0); setSelectedAnswer(null); setRevealed(false); setHintIdx(-1)
    setSeen(prev => new Set([...prev, idx]))
  }

  const handleNext = () => {
    if (exIdx < examples.length - 1) goToExample(exIdx + 1)
    else onComplete()
  }

  const hasHints = ex.hints && ex.hints.length > 0

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Navigation header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Example {exIdx + 1} of {examples.length}</span>
            {ex.level && <LevelBadge level={ex.level} />}
            {ex.subskill && (
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600">{ex.subskill}</span>
            )}
          </div>
          {/* Dot navigation */}
          <div className="flex gap-1.5 mt-1.5">
            {examples.map((_, i) => (
              <button key={i} onClick={() => goToExample(i)} aria-label={`Example ${i + 1}`}
                className={cn('h-2 rounded-full transition-all', i === exIdx ? 'w-5 bg-emerald-500' : seen.has(i) ? 'w-2 bg-emerald-200' : 'w-2 bg-slate-200 hover:bg-slate-300')}>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          <button disabled={exIdx === 0} onClick={() => goToExample(exIdx - 1)}
            className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 text-xs font-medium text-slate-600 px-3 py-1.5 transition-colors">← Prev</button>
          <button disabled={exIdx === examples.length - 1} onClick={() => goToExample(exIdx + 1)}
            className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 text-xs font-medium text-slate-600 px-3 py-1.5 transition-colors">Next →</button>
        </div>
      </div>

      {/* Stimulus */}
      {ex.stimulus && <StimulusBlock text={ex.stimulus} label="Text" />}

      {/* Question */}
      <p className="text-sm font-medium text-slate-900 pt-1">{ex.question}</p>

      {/* Answer choices */}
      <div className="space-y-2.5">
        {ex.choices.map(choice => {
          const isSel = selectedAnswer === choice.label
          const isCorrect = choice.label === ex.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-50 cursor-default'
          } else if (isSel) cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed}
              onClick={() => !revealed && setSelectedAnswer(choice.label)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
            </button>
          )
        })}
      </div>

      {/* Hint system */}
      {!revealed && hasHints && (
        <div className="space-y-2">
          {hintIdx >= 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">Hint {hintIdx + 1}</p>
              <p className="text-sm text-amber-800 leading-relaxed">{ex.hints![hintIdx]}</p>
            </div>
          )}
          {hintIdx < ex.hints!.length - 1 && (
            <button onClick={() => setHintIdx(h => h + 1)}
              className="text-xs font-medium text-amber-600 hover:text-amber-700 underline underline-offset-2 transition-colors">
              {hintIdx === -1 ? 'Show hint' : 'Next hint →'}
            </button>
          )}
        </div>
      )}

      {/* Submit or reveal */}
      {!revealed && (
        <button disabled={!selectedAnswer} onClick={() => setRevealed(true)}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          Submit answer
        </button>
      )}

      {/* After submission */}
      {revealed && (
        <div className="space-y-5 pt-1">
          {/* Correct indicator */}
          <div className={cn('rounded-lg border px-5 py-4 flex items-start gap-3', selectedAnswer === ex.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-200 bg-red-50')}>
            <svg className={cn('h-5 w-5 shrink-0 mt-0.5', selectedAnswer === ex.correctAnswer ? 'text-emerald-600' : 'text-red-500')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              {selectedAnswer === ex.correctAnswer
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              }
            </svg>
            <div className="space-y-1">
              <p className={cn('text-sm font-semibold', selectedAnswer === ex.correctAnswer ? 'text-emerald-700' : 'text-red-700')}>
                {selectedAnswer === ex.correctAnswer ? 'Correct' : `Incorrect — correct answer: ${ex.correctAnswer}`}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{ex.explanation}</p>
            </div>
          </div>

          {/* Step-by-step walkthrough */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Step-by-step walkthrough — {stepIdx + 1} of {totalSteps}</p>
              {stepIdx < totalSteps - 1 && (
                <button onClick={() => setStepIdx(s => s + 1)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-800 underline underline-offset-2">Next step →</button>
              )}
            </div>
            <div className="space-y-2">
              {ex.steps.slice(0, stepIdx + 1).map((step, i) => (
                <div key={i} className={cn('rounded-lg border px-4 py-3 space-y-1', i === stepIdx ? 'border-emerald-200 bg-emerald-50' : 'border-slate-100 bg-slate-50')}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Step {i + 1}: {step.instruction}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wrong-answer analysis */}
          {ex.wrongAnswerExplanations && Object.keys(ex.wrongAnswerExplanations).length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Why the other choices don&apos;t work</p>
              {(Object.entries(ex.wrongAnswerExplanations) as [AnswerLabel, string][]).map(([label, text]) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">{label}</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Coach takeaway */}
          {ex.coachTakeaway && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Coach&apos;s takeaway</p>
              <p className="text-sm text-slate-700 leading-relaxed">{ex.coachTakeaway}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-2 pt-1">
            {exIdx < examples.length - 1
              ? <button onClick={handleNext} className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">Next example →</button>
              : <button onClick={onComplete} className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">Continue to Practice →</button>
            }
          </div>
        </div>
      )}
    </div>
  )
}

// ── DrillTab ──────────────────────────────────────────────────────────────────

type MistakeSummary = { subskill: string; count: number }[]

function DrillTab({
  questions,
  skillSlug,
  onComplete,
}: {
  questions: DrillQuestion[]
  skillSlug: string
  onComplete: () => void
}) {
  const [mode, setMode] = useState<DrillMode | null>(null)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [confidence, setConfidence] = useState<'guessing' | 'unsure' | 'confident' | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [showMixed, setShowMixed] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean; subskill?: string; errorCategory?: string }[]>([])
  const [missedIds, setMissedIds] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState<number>(75)

  // For missed-questions mode, use questions the user got wrong this session
  const activeQuestions = useMemo(() => {
    if (mode === 'missed') {
      const missed = questions.filter(q => missedIds.has(q.id))
      return missed.length > 0 ? missed : questions.slice(0, 5)
    }
    return questions
  }, [mode, questions, missedIds])

  const q = activeQuestions[qIdx]
  const isLast = qIdx === activeQuestions.length - 1
  const pct = Math.round((score / activeQuestions.length) * 100)

  // Timer for timed mode
  useEffect(() => {
    if (mode !== 'timed' || revealed || done) return
    setTimeLeft(75)
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(id); if (!revealed) setRevealed(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [mode, qIdx, revealed, done])

  const handleReveal = useCallback(async () => {
    if (!selected) return
    const correct = selected === q.correctAnswer
    setRevealed(true)
    if (correct) setScore(s => s + 1)
    else setMissedIds(prev => new Set([...prev, q.id]))
    setAnswers(prev => [...prev, { correct, subskill: q.subskill, errorCategory: q.errorCategory }])

    try {
      await fetch('/api/academy/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          subskillSlug: q.subskill,
          difficulty: q.difficulty,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          isCorrect: correct,
          practiceMode: 'targeted_drill',
          confidence,
          errorCategory: q.errorCategory,
          contentVersion: q.contentVersion ?? 1,
        }),
      })
    } catch { /* non-blocking */ }
  }, [selected, q, confidence])

  const handleNext = () => {
    if (isLast) { setDone(true); setShowMixed(true) }
    else { setQIdx(i => i + 1); setSelected(null); setRevealed(false); setConfidence(null) }
  }

  const markComplete = useCallback(async () => {
    try {
      await fetch('/api/academy/lesson-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillSlug, status: 'completed' }),
      })
    } catch { /* non-blocking */ }
    onComplete()
  }, [skillSlug, onComplete])

  const mistakeSummary: MistakeSummary = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const a of answers) {
      if (!a.correct && a.subskill) {
        counts[a.subskill] = (counts[a.subskill] ?? 0) + 1
      }
    }
    return Object.entries(counts).map(([subskill, count]) => ({ subskill, count })).sort((a, b) => b.count - a.count)
  }, [answers])

  // Mode selector
  if (mode === null) {
    return (
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-base font-semibold text-slate-900">Practice</h2>
        <p className="text-sm text-slate-600 leading-relaxed">Choose a practice mode. All modes use the same question set; your responses are saved to your mastery history.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {([
            { id: 'learn' as DrillMode, label: 'Learn Mode', desc: 'Immediate feedback after each question. Take your time.', icon: '📖' },
            { id: 'timed' as DrillMode, label: 'Timed Mode', desc: '75 seconds per question. Builds test-day pacing.', icon: '⏱' },
            { id: 'missed' as DrillMode, label: 'Missed Questions', desc: missedIds.size > 0 ? `Retry your ${missedIds.size} missed question${missedIds.size === 1 ? '' : 's'} from this session.` : 'Complete Learn Mode first to populate missed questions.', icon: '🔁' },
          ] as const).map(opt => (
            <button key={opt.id} disabled={opt.id === 'missed' && missedIds.size === 0}
              onClick={() => { setMode(opt.id); setQIdx(0); setSelected(null); setRevealed(false); setConfidence(null); setScore(0); setDone(false); setShowMixed(false); setAnswers([]) }}
              className={cn('rounded-xl border p-4 text-left space-y-2 transition-colors', opt.id === 'missed' && missedIds.size === 0 ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed' : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer')}>
              <div className="text-xl">{opt.icon}</div>
              <p className="text-sm font-semibold text-slate-800">{opt.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Drill complete
  if (done && showMixed) {
    return (
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-base font-semibold text-slate-900">Practice Complete</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center space-y-2">
          <div className={cn('text-5xl font-bold', pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-500' : 'text-red-500')}>{pct}%</div>
          <p className="text-slate-500 text-sm">{score} of {activeQuestions.length} correct</p>
          <div className="flex gap-2 justify-center flex-wrap pt-1">
            {answers.map((a, i) => (
              <span key={i} className={cn('w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center', a.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>{i + 1}</span>
            ))}
          </div>
        </div>

        {/* Mistake summary */}
        {mistakeSummary.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Areas to review</p>
            {mistakeSummary.map(({ subskill, count }) => (
              <div key={subskill} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{count}</span>
                <span className="text-sm text-amber-800">{subskill}</span>
              </div>
            ))}
            <p className="text-xs text-amber-700 pt-1">Review these subskills in the Overview and Strategy tabs, then retry in Missed Questions mode.</p>
          </div>
        )}

        {pct < 60 && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5">
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold">Recommended:</span> Review the Strategy tab and retry missed questions before taking the Mastery Check.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cross-skill recognition</p>
          <p className="text-xs text-slate-500">Now identify skill types without labels — three questions from other skills.</p>
        </div>
        <MixedRecognitionCheck excludeSlug={skillSlug} onComplete={markComplete} />
        <button onClick={() => { setMode(null) }} className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2">Try a different mode</button>
      </div>
    )
  }

  // Active drill
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-500">{qIdx + 1} / {activeQuestions.length}</span>
          <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
            q.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
            q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-red-50 text-red-700 border-red-200')}>
            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
          </span>
          {q.level && <LevelBadge level={q.level} />}
          {q.subskill && <span className="text-[11px] text-slate-400">{q.subskill}</span>}
        </div>
        <div className="flex items-center gap-3">
          {mode === 'timed' && (
            <span className={cn('text-sm font-mono font-bold', timeLeft <= 15 ? 'text-red-500' : 'text-slate-600')}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          )}
          <button onClick={() => setMode(null)} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">← Modes</button>
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(qIdx / activeQuestions.length) * 100}%` }} />
      </div>

      {q.stimulus && <StimulusBlock text={q.stimulus} label="Text" />}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>

      <div className="space-y-2.5">
        {q.choices.map(choice => {
          const isSel = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSel) cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed}
              onClick={() => !revealed && setSelected(choice.label)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
            </button>
          )
        })}
      </div>

      {/* Confidence picker — learn mode only */}
      {mode === 'learn' && !revealed && selected && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">How confident are you?</p>
          <div className="flex gap-2">
            {(['guessing', 'unsure', 'confident'] as const).map(c => (
              <button key={c} onClick={() => setConfidence(c)}
                className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors capitalize', confidence === c ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50')}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {!revealed
        ? <button disabled={!selected} onClick={handleReveal}
            className="rounded-lg bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
            Submit answer
          </button>
        : (
          <div className="space-y-4">
            <div className={cn('rounded-lg border px-4 py-4 space-y-2', selected === q.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider', selected === q.correctAnswer ? 'text-emerald-600' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — correct: ${q.correctAnswer}`}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
              {q.wrongAnswerExplanations && selected && selected !== q.correctAnswer && q.wrongAnswerExplanations[selected] && (
                <p className="text-xs text-slate-500 leading-relaxed border-t border-current/10 pt-2">
                  <span className="font-bold">Why ({selected}) is wrong:</span> {q.wrongAnswerExplanations[selected]}
                </p>
              )}
              {q.teachingPoint && (
                <p className="text-xs text-slate-500 italic border-t border-current/10 pt-2">{q.teachingPoint}</p>
              )}
              {q.errorCategory && !selected || selected === q.correctAnswer ? null : (
                <p className="text-[11px] text-slate-400">Category: {q.errorCategory}</p>
              )}
            </div>
            <button onClick={handleNext}
              className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              {isLast ? 'See results' : 'Next question →'}
            </button>
          </div>
        )
      }
    </div>
  )
}

// ── MasteryCheckTab ───────────────────────────────────────────────────────────

interface SubskillResult {
  subskill: string
  correct: number
  total: number
}

function MasteryCheckTab({ skill, masteryData, onComplete }: {
  skill: AcademySkill
  masteryData: SkillMastery | null
  onComplete: () => void
}) {
  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<AnswerLabel | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean; subskill?: string }[]>([])
  const [done, setDone] = useState(false)

  const questions = skill.masteryQuestions ?? skill.drillQuestions.slice(0, 12)
  const q = questions[qIdx]
  const isLast = qIdx === questions.length - 1

  const score = answers.filter(a => a.correct).length
  const pct = done ? Math.round((score / questions.length) * 100) : 0

  const masteryStatus = pct >= 90 ? 'Mastered' : pct >= 80 ? 'Proficient' : pct >= 60 ? 'Developing' : 'Needs Review'
  const masteryStatusColor = pct >= 90 ? 'text-emerald-600' : pct >= 80 ? 'text-blue-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600'

  const subskillResults = useMemo((): SubskillResult[] => {
    const bySubskill: Record<string, { correct: number; total: number }> = {}
    answers.forEach((a, i) => {
      const sub = questions[i]?.subskill ?? 'General'
      if (!bySubskill[sub]) bySubskill[sub] = { correct: 0, total: 0 }
      bySubskill[sub].total++
      if (a.correct) bySubskill[sub].correct++
    })
    return Object.entries(bySubskill).map(([subskill, r]) => ({ subskill, ...r }))
  }, [answers, questions])

  const handleReveal = async () => {
    if (!selected) return
    const correct = selected === q.correctAnswer
    setRevealed(true)
    const newAnswers = [...answers, { correct, subskill: q.subskill }]
    setAnswers(newAnswers)

    try {
      await fetch('/api/academy/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          skillSlug: q.skillSlug,
          subskillSlug: q.subskill,
          difficulty: q.difficulty,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          isCorrect: correct,
          practiceMode: 'mastery_check',
          contentVersion: q.contentVersion ?? 1,
        }),
      })
    } catch { /* non-blocking */ }
  }

  const handleNext = () => {
    if (isLast) { setDone(true); onComplete() }
    else { setQIdx(i => i + 1); setSelected(null); setRevealed(false) }
  }

  if (!started) {
    return (
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-base font-semibold text-slate-900">Mastery Check</h2>
        {masteryData && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current mastery</p>
            <p className={cn('text-2xl font-bold', MASTERY_COLOR[masteryData.masteryStatus] ?? 'text-slate-600')}>
              {Math.round(masteryData.masteryScore)}%
            </p>
            <p className="text-xs text-slate-500">{MASTERY_LABEL[masteryData.masteryStatus] ?? masteryData.masteryStatus} · {masteryData.totalAttempts} total attempts</p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            This {questions.length}-question assessment covers all major subskills for this lesson. Your results update your mastery score.
          </p>
          <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Mastery thresholds</p>
            {[
              { label: 'Needs Review', range: 'Below 60%', color: 'text-red-600' },
              { label: 'Developing', range: '60–79%', color: 'text-amber-600' },
              { label: 'Proficient', range: '80–89%', color: 'text-blue-600' },
              { label: 'Mastered', range: '90–100% + ≥15 attempts', color: 'text-emerald-600' },
            ].map(({ label, range, color }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className={cn('font-semibold', color)}>{label}</span>
                <span className="text-slate-400">{range}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setStarted(true)} className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          Start Mastery Check →
        </button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-base font-semibold text-slate-900">Mastery Check — Results</h2>

        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center space-y-2">
          <div className={cn('text-5xl font-bold', masteryStatusColor)}>{pct}%</div>
          <p className={cn('text-base font-semibold', masteryStatusColor)}>{masteryStatus}</p>
          <p className="text-sm text-slate-500">{score} of {questions.length} correct</p>
          <div className="flex gap-2 justify-center flex-wrap pt-2">
            {answers.map((a, i) => (
              <span key={i} className={cn('w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center', a.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>{i + 1}</span>
            ))}
          </div>
        </div>

        {/* Subskill breakdown */}
        {subskillResults.length > 1 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">Performance by subskill</h3>
            <div className="space-y-2.5">
              {subskillResults.map(({ subskill, correct, total }) => {
                const p = Math.round((correct / total) * 100)
                return (
                  <div key={subskill} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">{subskill}</span>
                      <span className={cn('font-semibold', p >= 80 ? 'text-emerald-600' : p >= 60 ? 'text-amber-600' : 'text-red-600')}>{p}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className={cn('h-1.5 rounded-full', p >= 80 ? 'bg-emerald-500' : p >= 60 ? 'bg-amber-500' : 'bg-red-400')} style={{ width: `${p}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended next step</p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {pct >= 90
              ? 'Excellent work. Move on to the next skill in your learning path.'
              : pct >= 80
              ? 'Strong performance. Continue to the next skill and return here for spaced review.'
              : pct >= 60
              ? `Review the ${subskillResults.sort((a, b) => (a.correct / a.total) - (b.correct / b.total))[0]?.subskill ?? 'weakest'} subskill in Strategy, then retry Missed Questions in Practice.`
              : 'Return to the Overview and Strategy tabs to review the fundamentals, then complete another Practice session before retrying this check.'
            }
          </p>
        </div>

        <button onClick={() => { setStarted(false); setDone(false); setQIdx(0); setAnswers([]); setSelected(null); setRevealed(false) }}
          className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 px-4 py-2.5 transition-colors">
          Retake mastery check
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Question {qIdx + 1} of {questions.length}</span>
          <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
            q.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
            q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-red-50 text-red-700 border-red-200')}>
            {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
          </span>
          {q.subskill && <span className="text-[11px] text-slate-400">{q.subskill}</span>}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Mastery Check</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(qIdx / questions.length) * 100}%` }} />
      </div>

      {q.stimulus && <StimulusBlock text={q.stimulus} label="Text" />}
      <p className="text-sm font-medium text-slate-900">{q.question}</p>

      <div className="space-y-2.5">
        {q.choices.map(choice => {
          const isSel = selected === choice.label
          const isCorrect = choice.label === q.correctAnswer
          let cls = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 cursor-default'
            else if (isSel) cls = 'border-red-400 bg-red-50 cursor-default'
            else cls = 'border-slate-200 bg-white opacity-40 cursor-default'
          } else if (isSel) cls = 'border-emerald-400 bg-emerald-50 cursor-pointer'
          return (
            <button key={choice.label} disabled={revealed}
              onClick={() => !revealed && setSelected(choice.label)}
              className={cn('w-full flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors', cls)}>
              <span className="flex-shrink-0 w-5 h-5 rounded-full border border-current text-xs font-bold flex items-center justify-center mt-px">{choice.label}</span>
              <span className="text-sm text-slate-700 leading-relaxed">{choice.text}</span>
            </button>
          )
        })}
      </div>

      {!revealed
        ? <button disabled={!selected} onClick={handleReveal}
            className="rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
            Submit
          </button>
        : (
          <div className="space-y-3">
            <div className={cn('rounded-lg border px-4 py-3.5 space-y-1.5', selected === q.correctAnswer ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50')}>
              <p className={cn('text-xs font-bold uppercase tracking-wider', selected === q.correctAnswer ? 'text-emerald-600' : 'text-red-600')}>
                {selected === q.correctAnswer ? 'Correct' : `Incorrect — correct: ${q.correctAnswer}`}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
            <button onClick={handleNext} className="rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
              {isLast ? 'See results' : 'Next →'}
            </button>
          </div>
        )
      }
    </div>
  )
}

// ── Stage stepper ─────────────────────────────────────────────────────────────

function StageStepper({ tabs, activeTab, stagesCompleted, onTabClick }: {
  tabs: typeof TABS
  activeTab: Tab
  stagesCompleted: Set<Tab>
  onTabClick: (t: Tab) => void
}) {
  return (
    <div className="flex items-center gap-0.5 overflow-x-auto pb-0.5" role="tablist">
      {tabs.map((tab, i) => {
        const isActive = activeTab === tab.id
        const isDone = stagesCompleted.has(tab.id)
        return (
          <button key={tab.id} role="tab" aria-selected={isActive}
            onClick={() => onTabClick(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
              isActive ? 'bg-emerald-600 text-white' : isDone ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
            )}>
            {isDone && !isActive && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
            {tab.stageLabel}
          </button>
        )
      })}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ skillSlug: string }> }

export default function LessonPage({ params }: Props) {
  const { skillSlug } = use(params)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [stagesCompleted, setStagesCompleted] = useState<Set<Tab>>(new Set())
  const [masteryData, setMasteryData] = useState<SkillMastery | null>(null)

  const skill = getSkill(skillSlug)
  const domain = getDomainForSkill(skillSlug)
  const domainLabel = domain ? (DOMAIN_DISPLAY[domain] ?? domain) : null
  const domainBadgeCls = domain ? (DOMAIN_BADGE[domain] ?? 'border-slate-200 bg-slate-50 text-slate-600') : ''

  // Fetch mastery data
  useEffect(() => {
    fetch('/api/academy/attempts')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.skills) return
        const s = data.skills.find((sk: SkillMastery) => sk.slug === skillSlug)
        if (s) setMasteryData(s)
      })
      .catch(() => {})
  }, [skillSlug])

  const markStageComplete = useCallback((tab: Tab) => {
    setStagesCompleted(prev => new Set([...prev, tab]))
  }, [])

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
  }

  const completedCount = stagesCompleted.size
  const totalStages = TABS.length

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/sat-rw-academy" className="hover:text-slate-600 transition-colors">R&W Academy</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">{skill?.title ?? skillSlug}</span>
      </nav>

      {/* Lesson header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-start gap-3 justify-between">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-slate-900">{skill?.title ?? skillSlug}</h1>
            {domainLabel && (
              <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', domainBadgeCls)}>
                {domainLabel}
              </span>
            )}
          </div>
          {/* Mastery chip */}
          {masteryData ? (
            <div className="text-right space-y-0.5">
              <p className={cn('text-xl font-bold', MASTERY_COLOR[masteryData.masteryStatus] ?? 'text-slate-600')}>
                {Math.round(masteryData.masteryScore)}%
              </p>
              <p className="text-xs text-slate-500">{MASTERY_LABEL[masteryData.masteryStatus] ?? masteryData.masteryStatus}</p>
            </div>
          ) : (
            <div className="text-right space-y-0.5">
              <p className="text-xl font-bold text-slate-300">—</p>
              <p className="text-xs text-slate-400">No attempts yet</p>
            </div>
          )}
        </div>

        {/* Objective + meta */}
        {skill?.objective && (
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{skill.objective}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          {skill?.estimatedMinutes && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {skill.estimatedMinutes} min
            </span>
          )}
          <span>{completedCount} of {totalStages} stages complete</span>
          {completedCount > 0 && (
            <div className="w-24 bg-slate-100 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(completedCount / totalStages) * 100}%` }} />
            </div>
          )}
        </div>
      </div>

      {/* Stage stepper / tab bar */}
      <div className="border-b border-slate-100 pb-0">
        <StageStepper
          tabs={TABS}
          activeTab={activeTab}
          stagesCompleted={stagesCompleted}
          onTabClick={handleTabClick}
        />
      </div>

      {/* Tab content */}
      <div className="min-h-0">
        {!skill ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-500">Lesson not found for <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{skillSlug}</code>.</p>
            <Link href="/sat-rw-academy" className="inline-flex text-sm text-emerald-600 hover:underline">← Back to R&W Academy</Link>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewTab skill={skill} onComplete={() => { markStageComplete('overview'); setActiveTab('strategy') }} />
            )}
            {activeTab === 'strategy' && (
              <StrategyTab skill={skill} onComplete={() => { markStageComplete('strategy'); setActiveTab('traps') }} />
            )}
            {activeTab === 'traps' && (
              <TrapsTab skill={skill} onComplete={() => { markStageComplete('traps'); setActiveTab('examples') }} />
            )}
            {activeTab === 'examples' && (
              <GuidedExamplesTab examples={skill.guidedExamples} onComplete={() => { markStageComplete('examples'); setActiveTab('drill') }} />
            )}
            {activeTab === 'drill' && (
              <DrillTab questions={skill.drillQuestions} skillSlug={skillSlug} onComplete={() => { markStageComplete('drill'); setActiveTab('mastery') }} />
            )}
            {activeTab === 'mastery' && (
              <MasteryCheckTab skill={skill} masteryData={masteryData} onComplete={() => markStageComplete('mastery')} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
