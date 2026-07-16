'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { glossaryTerms } from '@/lib/academy/glossary/terms'
import type { GlossaryTerm } from '@/lib/academy/glossary/terms'

const CATEGORY_LABELS: Record<string, string> = {
  grammar:     'Grammar',
  punctuation: 'Punctuation',
  rhetoric:    'Rhetoric & Composition',
  reading:     'Reading & Analysis',
  logic:       'Logic & Reasoning',
}

const CATEGORY_COLORS: Record<string, string> = {
  grammar:     'bg-sky-50 text-sky-700 border-sky-200',
  punctuation: 'bg-violet-50 text-violet-700 border-violet-200',
  rhetoric:    'bg-amber-50 text-amber-700 border-amber-200',
  reading:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  logic:       'bg-rose-50 text-rose-700 border-rose-200',
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return glossaryTerms.filter(t => {
      if (filterCategory !== 'all' && t.category !== filterCategory) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      )
    })
  }, [search, filterCategory])

  const categories = useMemo(() => {
    const cats = new Set(glossaryTerms.map(t => t.category))
    return ['all', ...Array.from(cats).sort()]
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">R&W Glossary</h1>
        <p className="mt-1 text-sm text-slate-500">
          Plain-language definitions for every term used in the R&W Academy.
          {glossaryTerms.length > 0 && (
            <span className="ml-1">{glossaryTerms.length} terms.</span>
          )}
        </p>
      </div>

      <div className="space-y-3 mb-5">
        <input
          type="search"
          placeholder="Search terms…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                'rounded-full border px-3 py-1 text-[12px] font-medium transition-colors',
                filterCategory === cat
                  ? 'border-sky-500 bg-sky-50 text-sky-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300',
              )}
            >
              {cat === 'all'
                ? `All (${glossaryTerms.length})`
                : CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          {glossaryTerms.length === 0
            ? 'Glossary terms are being loaded.'
            : 'No terms match your search.'}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filtered.map(term => {
            const isOpen = expandedId === term.id
            return (
              <div
                key={term.id}
                id={`term-${term.id}`}
                className={cn(
                  'rounded-xl border bg-white transition-shadow',
                  isOpen ? 'border-sky-200 shadow-sm' : 'border-slate-200',
                )}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : term.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="font-semibold text-slate-900 text-sm">{term.term}</span>
                    {term.partOfSpeech && (
                      <span className="text-[11px] italic text-slate-400">{term.partOfSpeech}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      'hidden sm:inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium',
                      CATEGORY_COLORS[term.category] ?? 'bg-slate-50 text-slate-600 border-slate-200',
                    )}>
                      {CATEGORY_LABELS[term.category] ?? term.category}
                    </span>
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                      className={cn('h-4 w-4 text-slate-400 shrink-0 transition-transform', isOpen && 'rotate-180')}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 text-sm border-t border-slate-100 pt-3">
                    <p className="text-slate-700 leading-relaxed">{term.definition}</p>

                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Example</p>
                      <p className="text-slate-700 italic text-[13px]">{term.example}</p>
                    </div>

                    {term.nonExample && (
                      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                        <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider mb-1">Common Confusion</p>
                        <p className="text-amber-800 text-[13px]">{term.nonExample}</p>
                      </div>
                    )}

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Related Terms</p>
                        <div className="flex flex-wrap gap-1.5">
                          {term.relatedTerms.map(rel => {
                            const relTerm = glossaryTerms.find(t => t.id === rel)
                            return (
                              <button
                                key={rel}
                                onClick={() => {
                                  setExpandedId(rel)
                                  const el = document.getElementById(`term-${rel}`)
                                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                }}
                                className="rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[12px] text-sky-600 hover:bg-sky-50 transition-colors"
                              >
                                {relTerm?.term ?? rel}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
