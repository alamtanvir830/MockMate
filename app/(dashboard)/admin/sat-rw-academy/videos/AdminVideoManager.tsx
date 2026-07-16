'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { VideoProductionStatus } from '@/lib/academy/videos/types'

interface VideoRow {
  id: string
  video_key: string
  lesson_slug: string
  skill_slug: string
  subskill_slug: string | null
  title: string
  production_status: VideoProductionStatus
  storage_path: string | null
  captions_storage_path: string | null
  transcript: string
  duration_seconds: number | null
  script_version: number
  video_version: number
  original_content_confirmed: boolean
  accuracy_reviewed: boolean
  published_at: string | null
  archived_at: string | null
  created_at: string
}

const STATUS_LABELS: Record<VideoProductionStatus, string> = {
  script_draft: 'Script Draft',
  script_reviewed: 'Script Reviewed',
  narration_ready: 'Narration Ready',
  rendered: 'Rendered',
  accuracy_review: 'Accuracy Review',
  published: 'Published',
  archived: 'Archived',
}

const STATUS_COLORS: Record<VideoProductionStatus, string> = {
  script_draft: 'bg-slate-100 text-slate-600',
  script_reviewed: 'bg-blue-100 text-blue-700',
  narration_ready: 'bg-purple-100 text-purple-700',
  rendered: 'bg-orange-100 text-orange-700',
  accuracy_review: 'bg-amber-100 text-amber-700',
  published: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-red-100 text-red-600',
}

interface Props {
  initialVideos: VideoRow[]
}

export function AdminVideoManager({ initialVideos }: Props) {
  const [videos, setVideos] = useState<VideoRow[]>(initialVideos)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [working, setWorking] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function refresh() {
    const res = await fetch(`/api/admin/academy/videos${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`)
    const data = await res.json()
    if (data.videos) setVideos(data.videos)
  }

  async function doAction(id: string, action: string, extra?: Record<string, unknown>) {
    setWorking(id)
    setMessage(null)
    try {
      const res = await fetch(`/api/admin/academy/videos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extra }),
      })
      const data = await res.json()
      if (!res.ok) {
        const errors = data.validationErrors ? `\n${data.validationErrors.join('\n')}` : ''
        setMessage({ type: 'error', text: `${data.error}${errors}` })
      } else {
        setMessage({ type: 'success', text: `Action "${action}" completed.` })
        await refresh()
      }
    } catch {
      setMessage({ type: 'error', text: 'Request failed.' })
    } finally {
      setWorking(null)
    }
  }

  const filtered = statusFilter === 'all' ? videos : videos.filter(v => v.production_status === statusFilter)
  const statuses = ['all', ...Object.keys(STATUS_LABELS)]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academy Video Management</h1>
        <p className="mt-1 text-sm text-slate-500">Admin only — SAT R&W Academy lesson videos</p>
      </div>

      {message && (
        <div className={cn('rounded-lg border p-4 text-sm', message.type === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-red-300 bg-red-50 text-red-800 whitespace-pre-line')}>
          {message.text}
        </div>
      )}

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setMessage(null) }}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors border',
              statusFilter === s ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400',
            )}
          >
            {s === 'all' ? 'All' : STATUS_LABELS[s as VideoProductionStatus]}
          </button>
        ))}
      </div>

      {/* Video list */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500">No videos found.</p>
        )}
        {filtered.map(v => {
          const isWorking = working === v.id
          return (
            <div key={v.id} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold', STATUS_COLORS[v.production_status])}>
                      {STATUS_LABELS[v.production_status]}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{v.video_key}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-slate-900">{v.title}</h2>
                  <p className="text-xs text-slate-400">
                    {v.lesson_slug} · {v.skill_slug}{v.subskill_slug ? ` / ${v.subskill_slug}` : ''}
                    {' · '} Script v{v.script_version} · Video v{v.video_version}
                    {v.duration_seconds ? ` · ${Math.floor(v.duration_seconds / 60)}:${String(v.duration_seconds % 60).padStart(2, '0')}` : ''}
                  </p>
                </div>
                {v.published_at && (
                  <span className="text-[11px] text-emerald-600 font-medium">
                    Published {new Date(v.published_at).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: 'Video file', ok: !!v.storage_path },
                  { label: 'Captions', ok: !!v.captions_storage_path },
                  { label: 'Transcript', ok: !!v.transcript?.trim() },
                  { label: 'Accuracy reviewed', ok: v.accuracy_reviewed },
                  { label: 'Original content', ok: v.original_content_confirmed },
                ].map(({ label, ok }) => (
                  <div key={label} className={cn('flex items-center gap-1.5 rounded-md px-2 py-1 border', ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-400')}>
                    <span>{ok ? '✓' : '○'}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {v.production_status === 'script_draft' && (
                  <ActionButton onClick={() => doAction(v.id, 'mark_script_reviewed')} disabled={isWorking}>
                    Mark Script Reviewed
                  </ActionButton>
                )}
                {v.production_status === 'script_reviewed' && (
                  <ActionButton onClick={() => doAction(v.id, 'mark_narration_ready')} disabled={isWorking}>
                    Mark Narration Ready
                  </ActionButton>
                )}
                {!v.original_content_confirmed && (
                  <ActionButton onClick={() => doAction(v.id, 'confirm_original_content')} disabled={isWorking} variant="amber">
                    Confirm Original Content
                  </ActionButton>
                )}
                {!v.accuracy_reviewed && v.production_status === 'rendered' && (
                  <ActionButton onClick={() => doAction(v.id, 'mark_accuracy_reviewed')} disabled={isWorking}>
                    Mark Accuracy Reviewed
                  </ActionButton>
                )}
                {(v.production_status === 'accuracy_review' || v.production_status === 'rendered') && v.accuracy_reviewed && v.original_content_confirmed && (
                  <ActionButton onClick={() => doAction(v.id, 'publish')} disabled={isWorking} variant="emerald">
                    Publish
                  </ActionButton>
                )}
                {v.production_status === 'published' && (
                  <ActionButton onClick={() => doAction(v.id, 'unpublish')} disabled={isWorking} variant="amber">
                    Unpublish
                  </ActionButton>
                )}
                {v.production_status !== 'archived' && (
                  <ActionButton onClick={() => doAction(v.id, 'archive')} disabled={isWorking} variant="red">
                    Archive
                  </ActionButton>
                )}
                {isWorking && <span className="text-xs text-slate-400 self-center">Working…</span>}
              </div>

              {/* Preview links */}
              <div className="flex gap-3 text-xs flex-wrap">
                {v.storage_path && (
                  <span className="text-slate-400">Video: <span className="font-mono text-slate-600">{v.storage_path}</span></span>
                )}
                {v.captions_storage_path && (
                  <span className="text-slate-400">Captions: <span className="font-mono text-slate-600">{v.captions_storage_path}</span></span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = 'default',
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'default' | 'emerald' | 'amber' | 'red'
}) {
  const cls: Record<string, string> = {
    default: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200',
    emerald: 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600',
    amber: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200',
    red: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        cls[variant],
      )}
    >
      {children}
    </button>
  )
}
