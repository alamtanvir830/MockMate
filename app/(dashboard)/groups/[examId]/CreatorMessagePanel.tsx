'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { updateGroupMessage } from '@/app/actions/groups'

interface Props {
  examId: string
  initialMessage: string | null
  isCreator: boolean
}

export function CreatorMessagePanel({ examId, initialMessage, isCreator }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initialMessage ?? '')
  const [message, setMessage] = useState(initialMessage)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Non-creator: hide when there is no message
  if (!isCreator && !message) return null

  async function handleSave() {
    setSaveError('')
    setSaving(true)
    const result = await updateGroupMessage({ examId, message: draft })
    setSaving(false)

    if ('error' in result) {
      setSaveError(result.error)
      return
    }

    setMessage(draft.trim() || null)
    setEditing(false)
    router.refresh()
  }

  function handleCancel() {
    setDraft(message ?? '')
    setSaveError('')
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
            <CardTitle>Notes from the creator</CardTitle>
          </div>

          {/* Edit button — creator only, not while editing */}
          {isCreator && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="shrink-0 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              {message ? 'Edit' : 'Add a note'}
            </button>
          )}
        </div>
      </CardHeader>

      {editing ? (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            placeholder="e.g. Please complete this before Friday. Focus on chapters 3–5."
            className={cn(
              'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900',
              'placeholder:text-slate-400 resize-none',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
              'hover:border-slate-300 transition-colors',
            )}
          />
          {saveError && <p className="text-xs text-red-600">{saveError}</p>}
          <div className="flex gap-3">
            <Button size="sm" onClick={handleSave} loading={saving}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : message ? (
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{message}</p>
      ) : (
        /* Creator, no message yet */
        <p className="text-sm text-slate-400 italic">No note added yet.</p>
      )}
    </Card>
  )
}
