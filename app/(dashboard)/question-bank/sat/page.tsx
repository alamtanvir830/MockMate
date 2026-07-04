'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { rwQuestions } from '@/lib/question-bank/sat/rw-questions'
import { mathQuestions } from '@/lib/question-bank/sat/math-questions'
import { loadAllQBResults } from '@/lib/question-bank/sat/question-selector'
import { loadAllAttempts, type PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { useEntitlements } from '@/hooks/use-entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import type { QBDifficulty } from '@/lib/question-bank/types'

const FREE_QB_LIMIT = 3
const ALL_QUESTIONS = [...rwQuestions, ...mathQuestions]

// ── Static tree definition ────────────────────────────────────────────────────

type SkillDef  = { label: string }
type DomainDef = { id: string; skills: SkillDef[] }
type SectionDef = { id: string; label: string; shortLabel: string; badge: string; headerBg: string; domains: DomainDef[] }

const SECTIONS: SectionDef[] = [
  {
    id: 'reading-writing',
    label: 'Reading and Writing',
    shortLabel: 'R&W',
    badge: 'text-blue-700 bg-blue-50 border-blue-200',
    headerBg: 'bg-blue-50 border-blue-100',
    domains: [
      {
        id: 'Craft and Structure',
        skills: [
          { label: 'Words in Context' },
          { label: 'Text Structure and Purpose' },
          { label: 'Cross-Text Connections' },
        ],
      },
      {
        id: 'Information and Ideas',
        skills: [
          { label: 'Central Ideas and Details' },
          { label: 'Command of Evidence' },
          { label: 'Inferences' },
        ],
      },
      {
        id: 'Standard English Conventions',
        skills: [
          { label: 'Boundaries' },
          { label: 'Form, Structure, and Sense' },
        ],
      },
      {
        id: 'Expression of Ideas',
        skills: [
          { label: 'Rhetorical Synthesis' },
          { label: 'Transitions' },
        ],
      },
    ],
  },
  {
    id: 'math',
    label: 'Math',
    shortLabel: 'MATH',
    badge: 'text-violet-700 bg-violet-50 border-violet-200',
    headerBg: 'bg-violet-50 border-violet-100',
    domains: [
      {
        id: 'Algebra',
        skills: [
          { label: 'Linear equations in one variable' },
          { label: 'Linear equations in two variables' },
          { label: 'Linear functions' },
          { label: 'Systems of two linear equations' },
          { label: 'Linear inequalities' },
        ],
      },
      {
        id: 'Advanced Math',
        skills: [
          { label: 'Equivalent expressions' },
          { label: 'Nonlinear functions' },
          { label: 'Quadratic equations' },
          { label: 'Exponential functions' },
          { label: 'Nonlinear equations in one variable' },
        ],
      },
      {
        id: 'Problem-Solving and Data Analysis',
        skills: [
          { label: 'Ratios, rates, proportional relationships' },
          { label: 'Percentages' },
          { label: 'One-variable data' },
          { label: 'Two-variable data' },
          { label: 'Probability' },
        ],
      },
      {
        id: 'Geometry and Trigonometry',
        skills: [
          { label: 'Area and volume' },
          { label: 'Lines, angles, and triangles' },
          { label: 'Right triangles and trigonometry' },
          { label: 'Circles' },
        ],
      },
    ],
  },
]

const ALL_SKILLS: string[] = SECTIONS.flatMap(s => s.domains.flatMap(d => d.skills.map(sk => sk.label)))

const SKILL_TO_SECTION: Record<string, string> = {}
for (const sec of SECTIONS) {
  for (const dom of sec.domains) {
    for (const sk of dom.skills) {
      SKILL_TO_SECTION[sk.label] = sec.id
    }
  }
}

// ── Counts from actual question data ─────────────────────────────────────────

function countBySkill(skill: string): number {
  return ALL_QUESTIONS.filter(q => q.skill === skill).length
}

function countByDomain(domain: string): number {
  return ALL_QUESTIONS.filter(q => q.domain === domain).length
}

function countBySection(sectionId: string): number {
  return ALL_QUESTIONS.filter(q => q.section === sectionId).length
}

// ── Tree filtering for search ─────────────────────────────────────────────────

function filterSections(sections: SectionDef[], q: string): SectionDef[] {
  if (!q.trim()) return sections
  const lq = q.toLowerCase()
  return sections.flatMap(sec => {
    if (sec.label.toLowerCase().includes(lq)) return [sec]
    const filteredDomains = sec.domains.flatMap(dom => {
      if (dom.id.toLowerCase().includes(lq)) return [dom]
      const filteredSkills = dom.skills.filter(sk => sk.label.toLowerCase().includes(lq))
      if (filteredSkills.length > 0) return [{ ...dom, skills: filteredSkills }]
      return []
    })
    if (filteredDomains.length > 0) return [{ ...sec, domains: filteredDomains }]
    return []
  })
}

// ── Tri-state helpers ─────────────────────────────────────────────────────────

type TriState = 'checked' | 'indeterminate' | 'unchecked'

function getSectionState(sec: SectionDef, selected: Set<string>): TriState {
  const skills = sec.domains.flatMap(d => d.skills.map(s => s.label))
  const n = skills.filter(s => selected.has(s)).length
  if (n === 0) return 'unchecked'
  if (n === skills.length) return 'checked'
  return 'indeterminate'
}

function getDomainState(dom: DomainDef, selected: Set<string>): TriState {
  const skills = dom.skills.map(s => s.label)
  const n = skills.filter(s => selected.has(s)).length
  if (n === 0) return 'unchecked'
  if (n === skills.length) return 'checked'
  return 'indeterminate'
}

// ── Checkbox component ────────────────────────────────────────────────────────

function TriCheckbox({
  id, checked, indeterminate, onChange,
}: {
  id: string; checked: boolean; indeterminate: boolean; onChange: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])
  return (
    <input
      ref={ref} type="checkbox" id={id}
      checked={checked} onChange={onChange}
      className="h-4 w-4 rounded cursor-pointer shrink-0"
      style={{ accentColor: '#059669' }}
    />
  )
}

// ── Section card component ────────────────────────────────────────────────────

function SectionCard({
  section, selectedSkills, expandedSections, expandedDomains,
  onToggleSection, onToggleDomain, onToggleSkill,
  onToggleSectionExpand, onToggleDomainExpand,
}: {
  section: SectionDef
  selectedSkills: Set<string>
  expandedSections: Set<string>
  expandedDomains: Set<string>
  onToggleSection: (sec: SectionDef) => void
  onToggleDomain: (dom: DomainDef) => void
  onToggleSkill: (skill: string) => void
  onToggleSectionExpand: (id: string) => void
  onToggleDomainExpand: (id: string) => void
}) {
  const secState = getSectionState(section, selectedSkills)
  const expanded = expandedSections.has(section.id)

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Section header */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 border-b cursor-pointer select-none hover:brightness-95 transition-all',
          section.headerBg,
        )}
      >
        <TriCheckbox
          id={`chk-sec-${section.id}`}
          checked={secState === 'checked'}
          indeterminate={secState === 'indeterminate'}
          onChange={() => onToggleSection(section)}
        />
        <button
          onClick={() => onToggleSectionExpand(section.id)}
          className="flex-1 flex items-center gap-3 min-w-0 text-left"
        >
          <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0', section.badge)}>
            {section.shortLabel}
          </span>
          <span className="text-[13px] font-semibold text-slate-800 flex-1 min-w-0">{section.label}</span>
          <span className="text-[11px] bg-white/70 border border-emerald-200 text-emerald-700 font-semibold rounded-full px-2 py-0.5 shrink-0">
            {countBySection(section.id)}
          </span>
          <svg
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            className={cn('h-4 w-4 text-slate-400 shrink-0 transition-transform', expanded ? 'rotate-90' : '')}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div>
          {section.domains.map(dom => {
            const domState = getDomainState(dom, selectedSkills)
            const domExpanded = expandedDomains.has(dom.id)

            return (
              <div key={dom.id} className="border-t border-slate-100">
                {/* Domain row */}
                <div className="flex items-center gap-3 px-4 py-2.5 pl-8 hover:bg-slate-50 cursor-pointer select-none transition-colors">
                  <TriCheckbox
                    id={`chk-dom-${dom.id}`}
                    checked={domState === 'checked'}
                    indeterminate={domState === 'indeterminate'}
                    onChange={() => onToggleDomain(dom)}
                  />
                  <button
                    onClick={() => onToggleDomainExpand(dom.id)}
                    className="flex-1 flex items-center gap-2 text-left"
                  >
                    <span className="text-[12px] font-semibold text-slate-700 flex-1">{dom.id}</span>
                    <span className="text-[11px] bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 font-medium">{countByDomain(dom.id)}</span>
                    <svg
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      className={cn('h-3.5 w-3.5 text-slate-400 shrink-0 transition-transform', domExpanded ? 'rotate-90' : '')}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Skills */}
                {domExpanded && dom.skills.map(sk => (
                  <label
                    key={sk.label}
                    htmlFor={`chk-skill-${sk.label}`}
                    className="flex items-center gap-3 px-4 py-2 pl-14 hover:bg-slate-50 cursor-pointer select-none border-t border-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`chk-skill-${sk.label}`}
                      checked={selectedSkills.has(sk.label)}
                      onChange={() => onToggleSkill(sk.label)}
                      className="h-3.5 w-3.5 rounded cursor-pointer shrink-0"
                      style={{ accentColor: '#059669' }}
                    />
                    <span className="text-[11px] text-slate-600 flex-1 leading-tight">{sk.label}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-1.5 py-0.5 shrink-0">
                      {countBySkill(sk.label)}
                    </span>
                  </label>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────────

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard' | 'medium+hard'
type ModeFilter = 'tutor' | 'timed'

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SATQuestionBankPage() {
  const router = useRouter()
  const { satUpgradeUnlocked, loading: entitlementLoading } = useEntitlements()

  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(() => new Set(ALL_SKILLS))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(SECTIONS.map(s => s.id)))
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(
    new Set(SECTIONS.flatMap(s => s.domains.map(d => d.id)))
  )
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [count, setCount] = useState(10)
  const [customCount, setCustomCount] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [mode, setMode] = useState<ModeFilter>('tutor')

  const [recentSets, setRecentSets] = useState(0)
  const [browseSets, setBrowseSets] = useState(0)
  const [satAttempts, setSatAttempts] = useState<PremadeAttempt[]>([])
  const [showAllAttempts, setShowAllAttempts] = useState(false)

  useEffect(() => {
    const results = loadAllQBResults()
    setRecentSets(results.length)
    setBrowseSets(results.filter(r => r.config.mode === 'browse').length)
    const attempts = loadAllAttempts().filter(a => a.examId.startsWith('sat-'))
    setSatAttempts(attempts)
  }, [])

  const filteredQuestions = useMemo(() => {
    let pool = ALL_QUESTIONS.filter(q => selectedSkills.has(q.skill))
    if (difficulty === 'medium+hard') {
      pool = pool.filter(q => q.difficulty === 'medium' || q.difficulty === 'hard')
    } else if (difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === difficulty as QBDifficulty)
    }
    return pool
  }, [selectedSkills, difficulty])

  const displaySections = useMemo(() => filterSections(SECTIONS, search), [search])

  const actualCount = useCustom ? (parseInt(customCount) || 0) : count
  const canStart = filteredQuestions.length > 0 && actualCount > 0

  function toggleSection(sec: SectionDef) {
    const skills = sec.domains.flatMap(d => d.skills.map(s => s.label))
    const state = getSectionState(sec, selectedSkills)
    setSelectedSkills(prev => {
      const next = new Set(prev)
      if (state === 'checked') skills.forEach(s => next.delete(s))
      else skills.forEach(s => next.add(s))
      return next
    })
  }

  function toggleDomain(dom: DomainDef) {
    const skills = dom.skills.map(s => s.label)
    const state = getDomainState(dom, selectedSkills)
    setSelectedSkills(prev => {
      const next = new Set(prev)
      if (state === 'checked') skills.forEach(s => next.delete(s))
      else skills.forEach(s => next.add(s))
      return next
    })
  }

  function toggleSkill(skill: string) {
    setSelectedSkills(prev => {
      const next = new Set(prev)
      if (next.has(skill)) next.delete(skill)
      else next.add(skill)
      return next
    })
  }

  function collapseAll() {
    setExpandedSections(new Set())
    setExpandedDomains(new Set())
  }

  function expandAll() {
    setExpandedSections(new Set(SECTIONS.map(s => s.id)))
    setExpandedDomains(new Set(SECTIONS.flatMap(s => s.domains.map(d => d.id))))
  }

  function handleStart() {
    const params = new URLSearchParams()

    // Section param — only set when skills from a single section are selected
    const rwSelected = [...selectedSkills].some(s => SKILL_TO_SECTION[s] === 'reading-writing')
    const mathSelected = [...selectedSkills].some(s => SKILL_TO_SECTION[s] === 'math')
    if (rwSelected && !mathSelected) params.set('section', 'reading-writing')
    else if (mathSelected && !rwSelected) params.set('section', 'math')

    // Skills — only send if not all are selected
    if (selectedSkills.size < ALL_SKILLS.length) {
      params.set('skills', [...selectedSkills].join(','))
    }

    // Difficulty
    if (difficulty !== 'all') {
      params.set('difficulties', difficulty === 'medium+hard' ? 'medium,hard' : difficulty)
    }

    const finalCount = useCustom ? (parseInt(customCount) || count) : count
    params.set('count', String(Math.min(Math.max(finalCount, 3), 50)))
    params.set('mode', 'browse')

    router.push(`/question-bank/sat/practice?${params.toString()}`)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Link href="/question-bank" className="hover:text-slate-600 transition-colors">Question Bank</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">SAT</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">SAT Question Bank</h1>
        <p className="text-slate-500 text-sm mt-1">
          Practice Reading and Writing or Math questions by SAT skill.
        </p>
      </div>

      {/* Upgrade gate (replaces the whole QBank if limit reached) */}
      {!entitlementLoading && !satUpgradeUnlocked && browseSets >= FREE_QB_LIMIT ? (
        <UpgradeGate
          title="Unlock 80+ SAT Question Bank Questions"
          description={`You've used your ${FREE_QB_LIMIT} free practice sets. Upgrade to access all SAT question bank questions.`}
          features={[
            { label: '80+ SAT Question Bank questions', subtext: 'Targeted skill practice for every SAT domain' },
            { label: 'SAT Practice Test Form 2', subtext: 'Score feedback + personalized weak-area question sets' },
            { label: 'SAT Practice Test Form 3', subtext: 'Score feedback + personalized weak-area question sets' },
          ]}
          compact
        />
      ) : (
        <>
          {/* Personalized practice path */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mb-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-emerald-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-900">Personalized SAT Practice Path</p>

                {satAttempts.length === 0 ? (
                  <>
                    <p className="text-xs text-emerald-700 mt-0.5 mb-3">
                      Complete a full SAT practice test to automatically build targeted practice sets for your weakest domains.
                    </p>
                    <Link
                      href="/premade/sat/form-1"
                      className="inline-block text-xs font-semibold text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Take SAT Practice Test 1
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-emerald-700 mt-0.5 mb-3">
                      {satAttempts.length === 1
                        ? '1 completed SAT exam found — view your personalized practice sets below.'
                        : `${satAttempts.length} completed SAT exams found — choose one for targeted practice.`}
                    </p>
                    <div className="space-y-2">
                      {(() => {
                        const COLLAPSE_LIMIT = 3
                        // Sort newest first
                        const sorted = [...satAttempts].sort((a, b) =>
                          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
                        )
                        // Pre-compute labels for all attempts (sorted order: newest = highest number)
                        const formTotals = sorted.reduce<Record<string, number>>((acc, a) => {
                          acc[a.examId] = (acc[a.examId] ?? 0) + 1
                          return acc
                        }, {})
                        const formCountSeen: Record<string, number> = {}
                        const labeled = sorted.map(attempt => {
                          formCountSeen[attempt.examId] = (formCountSeen[attempt.examId] ?? 0) + 1
                          const attemptNum = formTotals[attempt.examId] - formCountSeen[attempt.examId] + 1
                          const formNum =
                            attempt.examId === 'sat-form-1' ? '1' :
                            attempt.examId === 'sat-form-2' ? '2' :
                            attempt.examId === 'sat-form-3' ? '3' : ''
                          const label = formNum
                            ? `SAT Form ${formNum} Attempt ${attemptNum}`
                            : `SAT Attempt ${attemptNum}`
                          const date = new Date(attempt.completedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })
                          return { attempt, label, date }
                        })
                        const visible = showAllAttempts ? labeled : labeled.slice(0, COLLAPSE_LIMIT)
                        const hiddenCount = labeled.length - COLLAPSE_LIMIT
                        return (
                          <>
                            {visible.map(({ attempt, label, date }) => (
                              <div
                                key={attempt.id}
                                className="flex items-center justify-between bg-white border border-emerald-100 rounded-lg px-3 py-2.5 gap-4"
                              >
                                <div>
                                  <p className="text-xs font-semibold text-slate-700">{label} — {date}</p>
                                  <p className="text-[11px] text-slate-500">
                                    {attempt.totalScore} total · {attempt.rwScaled} R&amp;W · {attempt.mathScaled} Math
                                  </p>
                                </div>
                                <Link
                                  href={`/question-bank/sat/personalized/${attempt.id}`}
                                  className="shrink-0 bg-emerald-600 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                                >
                                  View practice sets
                                </Link>
                              </div>
                            ))}
                            {labeled.length > COLLAPSE_LIMIT && (
                              <button
                                onClick={() => setShowAllAttempts(v => !v)}
                                className="text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors mt-0.5"
                              >
                                {showAllAttempts
                                  ? 'Show less'
                                  : `Show more (${hiddenCount} older ${hiddenCount === 1 ? 'attempt' : 'attempts'})`}
                              </button>
                            )}
                          </>
                        )
                      })()}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Free set warning */}
          {!entitlementLoading && !satUpgradeUnlocked && browseSets > 0 && (
            <div className="mb-4 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700">
                {FREE_QB_LIMIT - browseSets} free practice {FREE_QB_LIMIT - browseSets === 1 ? 'set' : 'sets'} remaining.{' '}
                <Link href="/pricing" className="underline hover:no-underline font-medium">
                  Upgrade for unlimited access.
                </Link>
              </p>
            </div>
          )}

          {/* Controls bar */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-5">
            {/* Row 1: search + collapse/expand + select/clear */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="relative flex-1 min-w-[180px]">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search SAT topics, domains, or skills…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition-colors bg-slate-50"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={collapseAll}
                  className="text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Collapse All
                </button>
                <button
                  onClick={expandAll}
                  className="text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Expand All
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedSkills(new Set(ALL_SKILLS))}
                  className="text-xs text-emerald-600 hover:text-emerald-700 px-2.5 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors font-medium"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedSkills(new Set())}
                  className="text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Clear
                </button>
              </div>

              <p className="text-sm text-slate-500 ml-auto hidden sm:block">
                <span className="font-semibold text-emerald-600">{filteredQuestions.length}</span> available
                {selectedSkills.size < ALL_SKILLS.length && (
                  <> · <span className="font-semibold text-slate-700">{selectedSkills.size}</span> skills selected</>
                )}
              </p>
            </div>

            {/* Row 2: filters + start */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {/* Difficulty */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Difficulty:</span>
                {(['all', 'easy', 'medium', 'hard', 'medium+hard'] as DifficultyFilter[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap',
                      difficulty === d
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700',
                    )}
                  >
                    {d === 'all' ? 'All' : d === 'medium+hard' ? 'Med+Hard' : d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>

              <div className="hidden sm:block h-5 w-px bg-slate-200" />

              {/* Count */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Questions:</span>
                {[5, 10, 15, 20].map(n => (
                  <button
                    key={n}
                    onClick={() => { setCount(n); setUseCustom(false) }}
                    className={cn(
                      'w-9 py-1 rounded-lg text-xs font-semibold border transition-colors',
                      !useCustom && count === n
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700',
                    )}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setUseCustom(v => !v)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors',
                    useCustom
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700',
                  )}
                >
                  Custom
                </button>
                {useCustom && (
                  <input
                    type="number" min={3} max={50}
                    value={customCount}
                    onChange={e => setCustomCount(e.target.value)}
                    placeholder="3–50"
                    className="w-20 border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-400 transition-colors bg-slate-50"
                  />
                )}
              </div>

              <div className="hidden sm:block h-5 w-px bg-slate-200" />

              {/* Mode */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500">Mode:</span>
                {(['tutor', 'timed'] as ModeFilter[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors capitalize',
                      mode === m
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700',
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Start button */}
              <div className="flex items-center gap-3 ml-auto">
                {filteredQuestions.length === 0 ? (
                  <p className="text-xs text-amber-600 hidden md:block">No questions match your selection.</p>
                ) : (
                  <p className="text-xs text-slate-400 hidden md:block">
                    {Math.min(filteredQuestions.length, actualCount)} questions · {mode} mode
                  </p>
                )}
                <button
                  onClick={handleStart}
                  disabled={!canStart}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  Start Practice Set
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-3 sm:hidden">
              <span className="font-semibold text-emerald-600">{filteredQuestions.length}</span> available
            </p>
          </div>

          {/* Category grid */}
          {displaySections.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-slate-400 text-sm">No topics match &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <div
              className="grid gap-5"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}
            >
              {displaySections.map(section => (
                <SectionCard
                  key={section.id}
                  section={section}
                  selectedSkills={selectedSkills}
                  expandedSections={expandedSections}
                  expandedDomains={expandedDomains}
                  onToggleSection={toggleSection}
                  onToggleDomain={toggleDomain}
                  onToggleSkill={toggleSkill}
                  onToggleSectionExpand={id => setExpandedSections(prev => {
                    const next = new Set(prev)
                    if (next.has(id)) next.delete(id); else next.add(id)
                    return next
                  })}
                  onToggleDomainExpand={id => setExpandedDomains(prev => {
                    const next = new Set(prev)
                    if (next.has(id)) next.delete(id); else next.add(id)
                    return next
                  })}
                />
              ))}
            </div>
          )}

          {/* Practice history */}
          {recentSets > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Practice History</p>
                <p className="text-xs text-slate-400">
                  You have completed {recentSets} practice {recentSets === 1 ? 'set' : 'sets'}.
                </p>
              </div>
              <Link
                href="/question-bank/sat/results"
                className="text-xs font-medium text-emerald-600 hover:underline whitespace-nowrap"
              >
                View history →
              </Link>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-slate-400 mt-8 text-center">
        SAT is a trademark of College Board. MockMate is not affiliated with or endorsed by College Board.
      </p>
    </div>
  )
}
