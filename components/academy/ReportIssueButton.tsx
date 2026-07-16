'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ReportIssueButtonProps {
  contentType: string
  contentId: string
  contentVersion?: number
  route?: string
  className?: string
}

const FLAG_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18m0-14.25L12 6l-1.5 6 1.5 2.25-9 2.25V3z" />
  </svg>
)

const ISSUE_CATEGORIES = [
  { value: 'wrong_answer',       label: 'Possible wrong answer' },
  { value: 'unclear_wording',    label: 'Unclear wording' },
  { value: 'explanation_problem',label: 'Explanation problem' },
  { value: 'typo',               label: 'Typo or grammar issue' },
  { value: 'broken_display',     label: 'Broken chart or table' },
  { value: 'formatting',         label: 'Formatting problem' },
  { value: 'other',              label: 'Other' },
]

type Stage = 'idle' | 'open' | 'submitting' | 'done' | 'error'

export function ReportIssueButton({
  contentType,
  contentId,
  contentVersion = 1,
  route,
  className,
}: ReportIssueButtonProps) {
  const [stage, setStage] = useState<Stage>('idle')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function submit() {
    if (!category) { setErrorMsg('Please select an issue type.'); return }
    if (description.trim().length < 5) { setErrorMsg('Please describe the issue.'); return }

    setStage('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/academy/content-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          contentId,
          contentVersion,
          route: route ?? (typeof window !== 'undefined' ? window.location.pathname : undefined),
          issueCategory: category,
          description: description.trim(),
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setStage('done')
    } catch {
      setStage('error')
      setErrorMsg('Could not submit report. Please try again.')
    }
  }

  if (stage === 'idle') {
    return (
      <button
        onClick={() => setStage('open')}
        className={cn(
          'inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 transition-colors',
          className,
        )}
        aria-label="Report an issue with this content"
      >
        {FLAG_ICON}
        Report an Issue
      </button>
    )
  }

  if (stage === 'done') {
    return (
      <span className={cn('text-[11px] text-emerald-600', className)}>
        Report submitted — thank you.
      </span>
    )
  }

  return (
    <div className={cn('rounded-lg border border-slate-200 bg-white p-3 space-y-2.5 text-sm', className)}>
      <p className="font-medium text-slate-800 text-[12px]">Report an Issue</p>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-500">Issue type</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="">Select…</option>
          {ISSUE_CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-500">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Describe the problem briefly…"
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[12px] text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {errorMsg && <p className="text-[11px] text-red-500">{errorMsg}</p>}

      <div className="flex gap-2">
        <button
          onClick={submit}
          disabled={stage === 'submitting'}
          className="rounded-md bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold px-3 py-1.5 transition-colors disabled:opacity-50"
        >
          {stage === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
        <button
          onClick={() => { setStage('idle'); setCategory(''); setDescription(''); setErrorMsg('') }}
          className="rounded-md border border-slate-200 text-slate-600 text-[11px] font-medium px-3 py-1.5 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
