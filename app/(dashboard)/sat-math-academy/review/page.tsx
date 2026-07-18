'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  MATH_SKILL_DISPLAY_NAMES,
  MATH_SKILL_DOMAIN,
  MATH_DOMAIN_DISPLAY,
  MATH_DOMAIN_BADGE_CLASS,
  ALGEBRA_SKILL_SLUGS,
  ADVANCED_MATH_SKILL_SLUGS,
  PSDA_SKILL_SLUGS,
  GEO_TRIG_SKILL_SLUGS,
  type MathSkillSlug,
  type MathDomainSlug,
} from '@/lib/academy/math/skill-mapping'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SkillRow {
  skillSlug: MathSkillSlug
  title: string
  domain: MathDomainSlug
  domainDisplay: string
  domainBadge: string
  attemptCount: number
  recentAccuracy: number
  status: 'needs-review' | 'improving' | 'strong' | 'untried'
}

interface AttemptData {
  skillSlug: string
  attemptCount: number
  recentAccuracy: number
  lastAttemptAt: string | null
}

const ALL_SKILL_SLUGS: MathSkillSlug[] = [
  ...ALGEBRA_SKILL_SLUGS,
  ...ADVANCED_MATH_SKILL_SLUGS,
  ...PSDA_SKILL_SLUGS,
  ...GEO_TRIG_SKILL_SLUGS,
]

function classifyStatus(accuracy: number, attempts: number): SkillRow['status'] {
  if (attempts === 0) return 'untried'
  if (accuracy < 60) return 'needs-review'
  if (accuracy < 80) return 'improving'
  return 'strong'
}

const STATUS_CONFIG: Record<SkillRow['status'], { label: string; color: string; dot: string }> = {
  'needs-review': { label: 'Needs Review', color: 'text-red-600', dot: 'bg-red-400' },
  'improving':    { label: 'Improving',    color: 'text-amber-600', dot: 'bg-amber-400' },
  'strong':       { label: 'Strong',       color: 'text-emerald-600', dot: 'bg-emerald-400' },
  'untried':      { label: 'Not Started',  color: 'text-slate-400', dot: 'bg-slate-300' },
}

const DOMAIN_ORDER: MathDomainSlug[] = [
  'algebra',
  'advanced-math',
  'problem-solving-data-analysis',
  'geometry-trigonometry',
]

// ── Skill card ────────────────────────────────────────────────────────────────

function SkillCard({ row }: { row: SkillRow }) {
  const cfg = STATUS_CONFIG[row.status]
  return (
    <div className={cn(
      'flex items-center gap-3 rounded-xl border bg-white px-4 py-3',
      row.status === 'needs-review' ? 'border-red-200' : 'border-slate-200',
    )}>
      <span className={cn('mt-0.5 h-2 w-2 shrink-0 rounded-full', cfg.dot)} />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800 truncate">{row.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={cn('text-[10px] font-semibold border rounded-full px-1.5 py-px', row.domainBadge)}>
            {row.domainDisplay}
          </span>
          {row.status !== 'untried' && (
            <span className="text-[11px] text-slate-400">{row.recentAccuracy}% · {row.attemptCount} attempts</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className={cn('text-[11px] font-semibold', cfg.color)}>{cfg.label}</span>
        <Link
          href={`/sat-math-academy/lesson/${row.skillSlug}`}
          className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          {row.status === 'untried' ? 'Start →' : 'Review →'}
        </Link>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function MathReviewPage() {
  const [rows, setRows] = useState<SkillRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'needs-review' | 'improving' | 'strong' | 'untried'>('all')

  useEffect(() => {
    fetch('/api/academy/math-attempts')
      .then(r => r.json())
      .then((data: AttemptData[] | { error: string }) => {
        if (!Array.isArray(data)) { setLoading(false); return }

        const bySlug: Record<string, AttemptData> = {}
        for (const d of data) bySlug[d.skillSlug] = d

        const built: SkillRow[] = ALL_SKILL_SLUGS.map(slug => {
          const d = bySlug[slug]
          const domain = MATH_SKILL_DOMAIN[slug]
          return {
            skillSlug: slug,
            title: MATH_SKILL_DISPLAY_NAMES[slug],
            domain,
            domainDisplay: MATH_DOMAIN_DISPLAY[domain],
            domainBadge: MATH_DOMAIN_BADGE_CLASS[domain],
            attemptCount: d?.attemptCount ?? 0,
            recentAccuracy: d?.recentAccuracy ?? 0,
            status: classifyStatus(d?.recentAccuracy ?? 0, d?.attemptCount ?? 0),
          }
        })

        setRows(built)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? rows : rows.filter(r => r.status === filter)

  const counts = {
    'needs-review': rows.filter(r => r.status === 'needs-review').length,
    'improving':    rows.filter(r => r.status === 'improving').length,
    'strong':       rows.filter(r => r.status === 'strong').length,
    'untried':      rows.filter(r => r.status === 'untried').length,
  }

  const prioritySkills = rows.filter(r => r.status === 'needs-review')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Review Queue</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Skills ranked by your recent accuracy. Focus on &quot;Needs Review&quot; first.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          Loading your skill data…
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {([
              { key: 'needs-review', label: 'Needs Review', color: 'text-red-600 bg-red-50 border-red-200' },
              { key: 'improving',    label: 'Improving',    color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { key: 'strong',       label: 'Strong',       color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { key: 'untried',      label: 'Not Started',  color: 'text-slate-500 bg-slate-50 border-slate-200' },
            ] as const).map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setFilter(filter === key ? 'all' : key)}
                className={cn(
                  'rounded-xl border p-3 text-center transition-all',
                  filter === key ? color : 'bg-white border-slate-200 hover:border-slate-300',
                )}
              >
                <p className={cn('text-2xl font-bold', filter === key ? '' : 'text-slate-800')}>
                  {counts[key]}
                </p>
                <p className={cn('text-[11px] font-medium mt-0.5', filter === key ? '' : 'text-slate-500')}>
                  {label}
                </p>
              </button>
            ))}
          </div>

          {/* Priority alert */}
          {prioritySkills.length > 0 && filter === 'all' && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-semibold text-red-700 mb-1">
                {prioritySkills.length} skill{prioritySkills.length > 1 ? 's' : ''} need attention
              </p>
              <p className="text-[12px] text-red-600 leading-relaxed">
                Your recent accuracy on {prioritySkills.map(s => s.title).join(', ')} is below 60%. Review these lessons before your next capstone.
              </p>
            </div>
          )}

          {/* All caught up */}
          {prioritySkills.length === 0 && counts['untried'] === 0 && filter === 'all' && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm font-semibold text-emerald-700">All caught up!</p>
              <p className="text-[12px] text-emerald-600 mt-0.5">
                No skills flagged for review. Keep practising to push all skills to Strong.
              </p>
            </div>
          )}

          {/* Skill list grouped by domain */}
          {filter === 'all' ? (
            <div className="space-y-5">
              {DOMAIN_ORDER.map(domain => {
                const domainRows = rows.filter(r => r.domain === domain)
                if (domainRows.length === 0) return null
                return (
                  <div key={domain}>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      {MATH_DOMAIN_DISPLAY[domain]}
                    </p>
                    <div className="space-y-2">
                      {domainRows.map(row => <SkillCard key={row.skillSlug} row={row} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400">
                  No skills in this category yet.
                </div>
              ) : (
                filtered.map(row => <SkillCard key={row.skillSlug} row={row} />)
              )}
            </div>
          )}

          {/* Footer actions */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/sat-math-academy/mixed-practice"
              className="flex-1 rounded-xl border border-indigo-200 bg-indigo-50 py-3 text-center text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              Mixed Practice
            </Link>
            <Link
              href="/sat-math-academy/mastery-check"
              className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-center text-sm font-semibold text-white transition-colors"
            >
              Mastery Check →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
