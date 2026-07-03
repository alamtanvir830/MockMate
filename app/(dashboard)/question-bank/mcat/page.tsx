'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { allMCATQBQuestions } from '@/lib/question-bank/mcat/index'
import type { MCATQBDifficulty } from '@/lib/question-bank/mcat/types'
import {
  buildCategoryTree,
  getLeafIds,
  getSelectedQuestionIds,
  type CategoryNode,
} from '@/lib/question-bank/mcat/categories'

// ── helpers ──────────────────────────────────────────────────────────────────

function getNodeState(
  node: CategoryNode,
  selected: Set<string>,
): 'checked' | 'indeterminate' | 'unchecked' {
  const leaves = getLeafIds(node)
  const n = leaves.filter(id => selected.has(id)).length
  if (n === 0) return 'unchecked'
  if (n === leaves.length) return 'checked'
  return 'indeterminate'
}

function filterTree(nodes: CategoryNode[], q: string): CategoryNode[] {
  if (!q.trim()) return nodes
  const lq = q.toLowerCase()
  return nodes.flatMap(node => {
    if (node.children.length === 0) {
      return node.label.toLowerCase().includes(lq) ? [node] : []
    }
    if (node.label.toLowerCase().includes(lq)) return [{ ...node }]
    const fc = filterTree(node.children, q)
    if (fc.length > 0) return [{ ...node, children: fc }]
    return []
  })
}

// ── constants ─────────────────────────────────────────────────────────────────

const SECTION_SHORT: Record<string, string> = {
  'chem-phys': 'C/P',
  'cars': 'CARS',
  'bio-biochem': 'B/B',
  'psych-soc': 'P/S',
}

const SECTION_BADGE: Record<string, string> = {
  'chem-phys': 'text-blue-700 bg-blue-50 border-blue-200',
  'cars': 'text-purple-700 bg-purple-50 border-purple-200',
  'bio-biochem': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'psych-soc': 'text-amber-700 bg-amber-50 border-amber-200',
}

const SECTION_HEADER_BG: Record<string, string> = {
  'chem-phys': 'bg-blue-50 border-blue-100',
  'cars': 'bg-purple-50 border-purple-100',
  'bio-biochem': 'bg-emerald-50 border-emerald-100',
  'psych-soc': 'bg-amber-50 border-amber-100',
}

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard' | 'medium+hard'
type ModeFilter = 'tutor' | 'timed'

// ── sub-components ────────────────────────────────────────────────────────────

function TriCheckbox({
  id,
  checked,
  indeterminate,
  onChange,
}: {
  id: string
  checked: boolean
  indeterminate: boolean
  onChange: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <input
      ref={ref}
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded cursor-pointer shrink-0"
      style={{ accentColor: '#059669' }}
    />
  )
}

function SectionCard({
  section,
  selected,
  expandedSections,
  expandedDiscs,
  onToggle,
  onToggleSection,
  onToggleDisc,
}: {
  section: CategoryNode
  selected: Set<string>
  expandedSections: Set<string>
  expandedDiscs: Set<string>
  onToggle: (node: CategoryNode) => void
  onToggleSection: () => void
  onToggleDisc: (id: string) => void
}) {
  const state = getNodeState(section, selected)
  const expanded = expandedSections.has(section.id)

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Section header */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 border-b cursor-pointer select-none hover:brightness-95 transition-all',
          SECTION_HEADER_BG[section.id] ?? 'bg-slate-50 border-slate-200'
        )}
      >
        <TriCheckbox
          id={`chk-${section.id}`}
          checked={state === 'checked'}
          indeterminate={state === 'indeterminate'}
          onChange={() => onToggle(section)}
        />
        <button
          onClick={onToggleSection}
          className="flex-1 flex items-center gap-3 min-w-0 text-left"
        >
          <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0', SECTION_BADGE[section.id])}>
            {SECTION_SHORT[section.id] ?? section.id}
          </span>
          <span className="text-[13px] font-semibold text-slate-800 leading-tight flex-1 min-w-0">
            {section.label}
          </span>
          <span className="text-[11px] bg-white/70 border border-emerald-200 text-emerald-700 font-semibold rounded-full px-2 py-0.5 shrink-0">
            {section.count}
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
          {section.children.map(disc => {
            const dState = getNodeState(disc, selected)
            const dExpanded = expandedDiscs.has(disc.id)

            return (
              <div key={disc.id} className="border-t border-slate-100">
                {/* Discipline row */}
                <div className="flex items-center gap-3 px-4 py-2.5 pl-8 hover:bg-slate-50 cursor-pointer select-none transition-colors">
                  <TriCheckbox
                    id={`chk-${disc.id}`}
                    checked={dState === 'checked'}
                    indeterminate={dState === 'indeterminate'}
                    onChange={() => onToggle(disc)}
                  />
                  <button
                    onClick={() => onToggleDisc(disc.id)}
                    className="flex-1 flex items-center gap-2 text-left"
                  >
                    <span className="text-[12px] font-semibold text-slate-700 flex-1">{disc.label}</span>
                    <span className="text-[11px] bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 font-medium">{disc.count}</span>
                    <svg
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      className={cn('h-3.5 w-3.5 text-slate-400 shrink-0 transition-transform', dExpanded ? 'rotate-90' : '')}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Content categories */}
                {dExpanded && disc.children.map(cat => (
                  <label
                    key={cat.id}
                    htmlFor={`chk-${cat.id}`}
                    className="flex items-center gap-3 px-4 py-2 pl-14 hover:bg-slate-50 cursor-pointer select-none border-t border-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`chk-${cat.id}`}
                      checked={selected.has(cat.id)}
                      onChange={() => onToggle(cat)}
                      className="h-3.5 w-3.5 rounded cursor-pointer shrink-0"
                      style={{ accentColor: '#059669' }}
                    />
                    <span className="text-[11px] text-slate-600 flex-1 leading-tight">{cat.label}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-1.5 py-0.5 shrink-0">{cat.count}</span>
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

// ── main page ─────────────────────────────────────────────────────────────────

export default function MCATQuestionBankPage() {
  const router = useRouter()
  const tree = useMemo(() => buildCategoryTree(allMCATQBQuestions), [])
  const allLeafIds = useMemo(() => tree.flatMap(getLeafIds), [tree])

  const [selectedLeafIds, setSelectedLeafIds] = useState<Set<string>>(() => new Set(allLeafIds))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(tree.map(s => s.id)))
  const [expandedDiscs, setExpandedDiscs] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [count, setCount] = useState<number>(20)
  const [customCount, setCustomCount] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [mode, setMode] = useState<ModeFilter>('tutor')

  const selectedQIds = useMemo(() => getSelectedQuestionIds(selectedLeafIds, tree), [selectedLeafIds, tree])

  const diffMap = useMemo(() => {
    const m = new Map<string, MCATQBDifficulty>()
    for (const q of allMCATQBQuestions) m.set(q.id, q.difficulty)
    return m
  }, [])

  const filteredQIds = useMemo(() => {
    if (difficulty === 'all') return selectedQIds
    const allowed = difficulty === 'medium+hard' ? new Set(['medium', 'hard']) : new Set([difficulty])
    return selectedQIds.filter(id => allowed.has(diffMap.get(id) ?? ''))
  }, [selectedQIds, difficulty, diffMap])

  const actualCount = useCustom ? (parseInt(customCount) || 0) : count
  const canStart = filteredQIds.length > 0 && actualCount > 0

  const displayTree = useMemo(() => filterTree(tree, search), [tree, search])

  function toggleNode(node: CategoryNode) {
    const leaves = getLeafIds(node)
    const state = getNodeState(node, selectedLeafIds)
    setSelectedLeafIds(prev => {
      const next = new Set(prev)
      if (state === 'checked') leaves.forEach(id => next.delete(id))
      else leaves.forEach(id => next.add(id))
      return next
    })
  }

  function collapseAll() {
    setExpandedSections(new Set())
    setExpandedDiscs(new Set())
  }

  function expandAll() {
    setExpandedSections(new Set(tree.map(s => s.id)))
    setExpandedDiscs(new Set(tree.flatMap(s => s.children.map(d => d.id))))
  }

  function handleStart() {
    if (!canStart) return
    const pool = [...filteredQIds].sort(() => Math.random() - 0.5).slice(0, actualCount)
    sessionStorage.setItem('mockmate_mcat_custom_session', JSON.stringify(pool))
    router.push(`/question-bank/mcat/practice?mode=custom&count=${pool.length}`)
  }

  const startLabel = canStart
    ? `${Math.min(filteredQIds.length, actualCount)} questions · ${mode} mode`
    : filteredQIds.length === 0
    ? 'No questions match filters'
    : 'Enter a question count'

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">MCAT Question Bank</h1>
        <p className="text-slate-500 text-sm mt-1">
          Select subjects and topics to build a targeted MCAT practice set.
        </p>
      </div>

      {/* Personalized Practice Path */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mb-5 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-emerald-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-emerald-900">Personalized MCAT Practice Path</p>
          <p className="text-xs text-emerald-700 mt-0.5">
            Complete MCAT Practice Exam Form 1 to unlock a personalized path based on your missed topics.
          </p>
        </div>
        <Link
          href="/premade/mcat"
          className="shrink-0 text-xs font-semibold text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          Take Practice Exam
        </Link>
      </div>

      {/* Controls bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-5">
        {/* Row 1: search + collapse/expand + select/clear */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search topics, subjects, or skills…"
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

          {/* Collapse/Expand */}
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

          {/* Select / Clear */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedLeafIds(new Set(allLeafIds))}
              className="text-xs text-emerald-600 hover:text-emerald-700 px-2.5 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors font-medium"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedLeafIds(new Set())}
              className="text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Selected count */}
          <p className="text-sm text-slate-500 ml-auto hidden sm:block">
            <span className="font-semibold text-emerald-600">{filteredQIds.length}</span> available
            {selectedQIds.length < allMCATQBQuestions.length && (
              <> · <span className="font-semibold text-slate-700">{selectedQIds.length}</span> selected</>
            )}
          </p>
        </div>

        {/* Row 2: filters + start button */}
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
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                )}
              >
                {d === 'all' ? 'All' : d === 'medium+hard' ? 'Med+Hard' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-5 w-px bg-slate-200" />

          {/* Count */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Questions:</span>
            {[10, 20, 30, 40].map(n => (
              <button
                key={n}
                onClick={() => { setCount(n); setUseCustom(false) }}
                className={cn(
                  'w-9 py-1 rounded-lg text-xs font-semibold border transition-colors',
                  !useCustom && count === n
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
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
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
              )}
            >
              Custom
            </button>
            {useCustom && (
              <input
                type="number"
                min={1}
                max={filteredQIds.length}
                value={customCount}
                onChange={e => setCustomCount(e.target.value)}
                placeholder={`1–${filteredQIds.length}`}
                className="w-24 border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-400 transition-colors bg-slate-50"
              />
            )}
          </div>

          {/* Divider */}
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
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                )}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Start button */}
          <div className="flex items-center gap-3 ml-auto">
            <p className="text-xs text-slate-400 hidden md:block">{startLabel}</p>
            <button
              onClick={handleStart}
              disabled={!canStart}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              Start Practice Set
            </button>
          </div>
        </div>

        {/* Mobile count indicator */}
        <p className="text-sm text-slate-500 mt-3 sm:hidden">
          <span className="font-semibold text-emerald-600">{filteredQIds.length}</span> available
          {selectedQIds.length < allMCATQBQuestions.length && (
            <> · <span className="font-semibold text-slate-700">{selectedQIds.length}</span> selected</>
          )}
        </p>
      </div>

      {/* Category grid */}
      {displayTree.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-slate-400 text-sm">No topics match &ldquo;{search}&rdquo;</p>
        </div>
      ) : (
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}
        >
          {displayTree.map(section => (
            <SectionCard
              key={section.id}
              section={section}
              selected={selectedLeafIds}
              expandedSections={expandedSections}
              expandedDiscs={expandedDiscs}
              onToggle={toggleNode}
              onToggleSection={() => setExpandedSections(prev => {
                const next = new Set(prev)
                if (next.has(section.id)) next.delete(section.id)
                else next.add(section.id)
                return next
              })}
              onToggleDisc={discId => setExpandedDiscs(prev => {
                const next = new Set(prev)
                if (next.has(discId)) next.delete(discId)
                else next.add(discId)
                return next
              })}
            />
          ))}
        </div>
      )}

      {/* Footer disclaimer */}
      <p className="text-xs text-slate-400 mt-8 text-center">
        MCAT® is a registered trademark of the AAMC. MockMate is not affiliated with or endorsed by the AAMC.
      </p>
    </div>
  )
}
