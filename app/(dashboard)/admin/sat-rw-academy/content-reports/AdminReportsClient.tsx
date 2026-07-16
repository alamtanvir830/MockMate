'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ContentReport {
  id: string
  user_email: string | null
  content_type: string
  content_id: string
  content_version: number
  route: string | null
  issue_category: string
  description: string
  status: string
  admin_notes: string | null
  resolution_summary: string | null
  resolved_at: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  open:      'bg-red-50 text-red-700 border-red-200',
  reviewing: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-orange-50 text-orange-700 border-orange-200',
  corrected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected:  'bg-slate-100 text-slate-500 border-slate-200',
  archived:  'bg-slate-50 text-slate-400 border-slate-200',
}

const VALID_STATUSES = ['open', 'reviewing', 'confirmed', 'corrected', 'rejected', 'archived']

export function AdminReportsClient() {
  const [reports, setReports] = useState<ContentReport[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('open')
  const [page, setPage] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNotes, setEditNotes] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editResolution, setEditResolution] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ status: filterStatus, page: String(page), limit: '20' })
      const res = await fetch(`/api/academy/content-reports?${params}`)
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setReports(data.reports ?? [])
      setTotal(data.total ?? 0)
    } catch {
      setReports([])
    } finally {
      setLoading(false)
    }
  }, [filterStatus, page])

  useEffect(() => { void load() }, [load])

  function startEdit(report: ContentReport) {
    setEditingId(report.id)
    setEditNotes(report.admin_notes ?? '')
    setEditStatus(report.status)
    setEditResolution(report.resolution_summary ?? '')
  }

  async function saveEdit(id: string) {
    setSaving(true)
    try {
      const res = await fetch(`/api/academy/content-reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          adminNotes: editNotes,
          resolutionSummary: editResolution,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setEditingId(null)
      void load()
    } catch {
      alert('Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Content Issue Reports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Admin view · ranvi.contact@gmail.com only</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['open', 'reviewing', 'confirmed', 'corrected', 'rejected', 'archived', 'all'].map(s => (
          <button
            key={s}
            onClick={() => { setFilterStatus(s === 'all' ? '' : s); setPage(1) }}
            className={cn(
              'rounded-full border px-3 py-1 text-[12px] font-medium transition-colors capitalize',
              (filterStatus === s || (s === 'all' && !filterStatus))
                ? 'border-sky-500 bg-sky-50 text-sky-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300',
            )}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-[12px] text-slate-400 self-center">{total} total</span>
      </div>

      {/* Reports */}
      {loading ? (
        <div className="text-sm text-slate-500">Loading…</div>
      ) : reports.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No reports with this status.
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map(r => (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize', STATUS_COLORS[r.status] ?? 'bg-slate-100')}>
                      {r.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{r.content_type}:{r.content_id} v{r.content_version}</span>
                    <span className="text-[11px] text-slate-400 capitalize">{r.issue_category.replace(/_/g, ' ')}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {r.user_email ?? 'unknown'} · {new Date(r.created_at).toLocaleString()}
                    {r.route && ` · ${r.route}`}
                  </p>
                </div>
                {editingId !== r.id && (
                  <button
                    onClick={() => startEdit(r)}
                    className="rounded-lg border border-slate-200 text-slate-600 text-[11px] font-medium px-2.5 py-1 hover:bg-slate-50 transition-colors shrink-0"
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-[12px] text-slate-700">
                <p className="font-semibold text-slate-500 text-[10px] uppercase tracking-wider mb-1">User report</p>
                {r.description}
              </div>

              {r.admin_notes && (
                <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 text-[12px] text-sky-800">
                  <p className="font-semibold text-[10px] uppercase tracking-wider mb-1">Admin notes</p>
                  {r.admin_notes}
                </div>
              )}

              {editingId === r.id && (
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Status</label>
                      <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        {VALID_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Resolution summary</label>
                      <input
                        type="text"
                        value={editResolution}
                        onChange={e => setEditResolution(e.target.value)}
                        className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        placeholder="Brief resolution note…"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">Admin notes</label>
                    <textarea
                      rows={2}
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[12px] text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(r.id)}
                      disabled={saving}
                      className="rounded-md bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold px-3 py-1.5 transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-md border border-slate-200 text-slate-600 text-[11px] font-medium px-3 py-1.5 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 20 && (
        <div className="flex gap-2 justify-center">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded-md border border-slate-200 text-slate-600 text-[12px] px-3 py-1.5 hover:bg-slate-50 disabled:opacity-40">← Prev</button>
          <span className="text-[12px] text-slate-500 self-center">Page {page} of {Math.ceil(total / 20)}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 20)} className="rounded-md border border-slate-200 text-slate-600 text-[12px] px-3 py-1.5 hover:bg-slate-50 disabled:opacity-40">Next →</button>
        </div>
      )}
    </div>
  )
}
