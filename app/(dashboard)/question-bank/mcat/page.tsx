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
  'chem-phys': 'text-blue-400 bg-blue-900/40 border-blue-800/60',
  'cars': 'text-purple-400 bg-purple-900/40 border-purple-800/60',
  'bio-biochem': 'text-emerald-400 bg-emerald-900/40 border-emerald-800/60',
  'psych-soc': 'text-amber-400 bg-amber-900/40 border-amber-800/60',
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
      className="h-3.5 w-3.5 rounded-sm cursor-pointer shrink-0"
      style={{ accentColor: '#10b981' }}
    />
  )
}

function SectionRow({
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
    <div className="rounded-xl border border-[#1e4039] overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#132b27] hover:bg-[#183530] cursor-pointer select-none">
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
          <span className="text-[13px] font-semibold text-slate-200 leading-tight flex-1 min-w-0 truncate">
            {section.label}
          </span>
          <span className="text-[11px] text-slate-500 font-mono shrink-0">{section.count}</span>
          <svg
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            className={cn('h-3.5 w-3.5 text-slate-500 shrink-0 transition-transform', expanded ? 'rotate-90' : '')}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="bg-[#0e2420]">
          {section.children.map(disc => {
            const dState = getNodeState(disc, selected)
            const dExpanded = expandedDiscs.has(disc.id)

            return (
              <div key={disc.id}>
                {/* Discipline row */}
                <div className="flex items-center gap-3 px-4 py-2.5 pl-8 border-t border-[#1a3530] hover:bg-[#132b27] cursor-pointer select-none">
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
                    <span className="text-[12px] font-medium text-slate-300 flex-1">{disc.label}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{disc.count}</span>
                    <svg
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      className={cn('h-3 w-3 text-slate-500 shrink-0 transition-transform', dExpanded ? 'rotate-90' : '')}
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
                    className="flex items-center gap-3 px-4 py-2 pl-14 border-t border-[#1a3530] hover:bg-[#132b27] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      id={`chk-${cat.id}`}
                      checked={selected.has(cat.id)}
                      onChange={() => onToggle(cat)}
                      className="h-3 w-3 rounded-sm cursor-pointer shrink-0"
                      style={{ accentColor: '#10b981' }}
                    />
                    <span className="text-[11px] text-slate-400 flex-1 leading-tight">{cat.label}</span>
                    <span className="text-[10px] text-slate-600 font-mono shrink-0">{cat.count}</span>
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

  const sectionBreakdown = useMemo(() =>
    tree.map(s => ({
      id: s.id,
      label: SECTION_SHORT[s.id] ?? s.id,
      count: filteredQIds.filter(id => s.questionIds.includes(id)).length,
    })), [tree, filteredQIds])

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="flex rounded-2xl overflow-hidden border border-[#1e4039] bg-[#0c1e1b]"
      style={{ height: 'calc(100vh - 7.5rem)' }}
    >
      {/* ── Left sidebar ─────────────────────────────────────── */}
      <div className="hidden md:flex w-48 shrink-0 bg-[#0f2f2a] flex-col border-r border-[#1e4039]">
        {/* Brand */}
        <div className="px-4 py-4 border-b border-[#1e4039] shrink-0">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">MockMate</p>
          <p className="text-[13px] font-semibold text-white mt-0.5 leading-tight">MCAT QBank</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-900/40 border border-emerald-800/30">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-emerald-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-[12px] font-semibold text-emerald-300">Create Set</span>
          </div>

          <Link href="/question-bank/mcat/results" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-slate-500 group-hover:text-slate-300 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[12px] text-slate-400 group-hover:text-slate-200">Previous Sets</span>
          </Link>

          <Link href="/question-bank/mcat/results" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-slate-500 group-hover:text-slate-300 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <span className="text-[12px] text-slate-400 group-hover:text-slate-200">Performance</span>
          </Link>

          <Link href="/anki" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-slate-500 group-hover:text-slate-300 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
            <span className="text-[12px] text-slate-400 group-hover:text-slate-200">Flashcards</span>
          </Link>

          <div className="border-t border-[#1e4039] my-2" />

          <button
            onClick={() => {
              if (typeof window !== 'undefined' && confirm('Reset your MCAT QB progress? This clears your seen questions and saved results.')) {
                localStorage.removeItem('mockmate_mcat_qb_seen_v1')
                localStorage.removeItem('mockmate_mcat_qb_results_v1')
              }
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group text-left"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-slate-500 group-hover:text-red-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span className="text-[12px] text-slate-400 group-hover:text-red-400">Reset Progress</span>
          </button>

          <Link href="/question-bank" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-slate-500 group-hover:text-slate-300 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <span className="text-[12px] text-slate-400 group-hover:text-slate-200">Help</span>
          </Link>
        </nav>

        <div className="px-3 py-3 border-t border-[#1e4039] shrink-0">
          <p className="text-[9px] text-slate-600 leading-relaxed">
            MCAT® is a registered trademark of the AAMC. MockMate is not affiliated with or endorsed by the AAMC.
          </p>
        </div>
      </div>

      {/* ── Center: category tree ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="px-5 py-4 border-b border-[#1e4039] bg-[#0c1e1b] shrink-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h1 className="text-[16px] font-bold text-white">MCAT Question Bank</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Select topics to build a custom practice set</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
              <button onClick={collapseAll} className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-white/5 transition-colors whitespace-nowrap">
                Collapse All
              </button>
              <button onClick={expandAll} className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-white/5 transition-colors whitespace-nowrap">
                Expand All
              </button>
              <span className="text-slate-600 text-[11px]">·</span>
              <button
                onClick={() => setSelectedLeafIds(new Set(allLeafIds))}
                className="text-[11px] text-emerald-500 hover:text-emerald-400 px-2 py-1 rounded hover:bg-emerald-900/20 transition-colors whitespace-nowrap"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedLeafIds(new Set())}
                className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search topics…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1a3530] border border-[#2a5048] text-[13px] text-slate-200 placeholder:text-slate-600 rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-emerald-700 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-[12px]"
              >
                ✕
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            <span className="text-emerald-400 font-semibold">{selectedQIds.length}</span> of {allMCATQBQuestions.length} questions selected
          </p>

          {/* Mobile quick controls */}
          <div className="md:hidden mt-3 flex gap-2 flex-wrap">
            {(['all', 'easy', 'medium', 'hard'] as DifficultyFilter[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors capitalize',
                  difficulty === d
                    ? 'bg-emerald-900/50 border-emerald-700 text-emerald-300'
                    : 'border-[#1e4039] text-slate-400 hover:bg-white/5 hover:text-slate-200'
                )}
              >
                {d === 'all' ? 'All Difficulties' : d}
              </button>
            ))}
          </div>

          {/* Mobile count + start */}
          <div className="md:hidden mt-2 flex items-center gap-2">
            <div className="flex gap-1">
              {[10, 20, 30].map(n => (
                <button
                  key={n}
                  onClick={() => { setCount(n); setUseCustom(false) }}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors',
                    !useCustom && count === n
                      ? 'bg-emerald-900/50 border-emerald-700 text-emerald-300'
                      : 'border-[#1e4039] text-slate-400'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              onClick={handleStart}
              disabled={!canStart}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-[12px] py-1.5 rounded-lg transition-colors"
            >
              Start Practice Set {canStart ? `(${Math.min(filteredQIds.length, actualCount)})` : ''}
            </button>
          </div>
        </div>

        {/* Category tree */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {displayTree.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-500 text-[13px]">No topics match &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            displayTree.map(section => (
              <SectionRow
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
            ))
          )}
        </div>
      </div>

      {/* ── Right panel: controls ─────────────────────────────── */}
      <div className="hidden md:flex w-64 shrink-0 bg-[#0a1a17] border-l border-[#1e4039] flex-col overflow-y-auto">
        {/* Selected count */}
        <div className="px-5 py-4 border-b border-[#1e4039] shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Available</p>
          <p className="text-[32px] font-bold text-white leading-none">{filteredQIds.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">questions match filters</p>

          {/* Section breakdown */}
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {sectionBreakdown.map(s => (
              <div key={s.id} className={cn('rounded-lg border px-2.5 py-1.5 text-center', SECTION_BADGE[s.id])}>
                <p className="text-[9px] font-bold uppercase">{s.label}</p>
                <p className="text-[14px] font-bold">{s.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="px-5 py-4 border-b border-[#1e4039] shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Difficulty</p>
          <div className="space-y-1.5">
            {(['all', 'easy', 'medium', 'hard', 'medium+hard'] as DifficultyFilter[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  'w-full px-3 py-1.5 rounded-lg text-left text-[12px] font-medium transition-colors border',
                  difficulty === d
                    ? 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                    : 'border-[#1e4039] text-slate-400 hover:bg-white/5 hover:text-slate-200'
                )}
              >
                {d === 'all' ? 'All Difficulties' : d === 'medium+hard' ? 'Medium + Hard' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div className="px-5 py-4 border-b border-[#1e4039] shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Questions</p>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {[10, 20, 30, 40].map(n => (
              <button
                key={n}
                onClick={() => { setCount(n); setUseCustom(false) }}
                className={cn(
                  'py-1.5 rounded-lg text-[12px] font-semibold transition-colors border',
                  !useCustom && count === n
                    ? 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                    : 'border-[#1e4039] text-slate-400 hover:bg-white/5 hover:text-slate-200'
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseCustom(v => !v)}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors border whitespace-nowrap',
                useCustom
                  ? 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                  : 'border-[#1e4039] text-slate-400 hover:bg-white/5 hover:text-slate-200'
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
                className="flex-1 bg-[#1a3530] border border-[#2a5048] text-[12px] text-slate-200 placeholder:text-slate-600 rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-700 transition-colors"
              />
            )}
          </div>
        </div>

        {/* Mode */}
        <div className="px-5 py-4 border-b border-[#1e4039] shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Mode</p>
          <div className="flex gap-2">
            {(['tutor', 'timed'] as ModeFilter[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-colors border capitalize',
                  mode === m
                    ? 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                    : 'border-[#1e4039] text-slate-400 hover:bg-white/5 hover:text-slate-200'
                )}
              >
                {m}
              </button>
            ))}
          </div>
          {mode === 'timed' && (
            <p className="text-[10px] text-slate-600 mt-1.5">Timed mode coming soon</p>
          )}
        </div>

        {/* Start */}
        <div className="px-5 py-4 mt-auto shrink-0">
          {filteredQIds.length === 0 ? (
            <p className="text-[11px] text-slate-500 text-center mb-3">
              No questions match your current selection.
            </p>
          ) : !canStart ? (
            <p className="text-[11px] text-slate-500 text-center mb-3">
              Enter a question count to continue.
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 text-center mb-3">
              {Math.min(filteredQIds.length, actualCount)} questions · {mode} mode
            </p>
          )}
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-[13px] py-3 rounded-xl transition-colors"
          >
            Start Practice Set
          </button>
        </div>
      </div>
    </div>
  )
}
