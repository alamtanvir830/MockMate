'use client'

import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  addPerformanceEntry,
  updatePerformanceEntry,
  deletePerformanceEntry,
  type PerformanceEntryInput,
} from '@/app/actions/performance'

interface PerformanceEntry {
  id: string
  exam_title: string
  date_taken: string
  score_percentage: number | null
  score_raw: number | null
  total_raw: number | null
  notes: string | null
  linked_exam_id: string | null
  created_at: string
}

interface PracticeExam {
  id: string
  title: string
  subject: string
  practicePercentage: number | null
}

interface Props {
  entries: PerformanceEntry[]
  practiceExams: PracticeExam[]
}

const emptyForm = (): PerformanceEntryInput => ({
  exam_title: '',
  date_taken: '',
  score_percentage: null,
  score_raw: null,
  total_raw: null,
  notes: '',
  linked_exam_id: null,
})

function scoreColor(pct: number) {
  if (pct >= 80) return 'text-emerald-600'
  if (pct >= 60) return 'text-amber-600'
  return 'text-red-500'
}

function scoreBg(pct: number) {
  if (pct >= 80) return 'bg-emerald-50 border-emerald-200 text-emerald-700'
  if (pct >= 60) return 'bg-amber-50 border-amber-200 text-amber-700'
  return 'bg-red-50 border-red-200 text-red-700'
}

export function PerformanceClient({ entries: initialEntries, practiceExams }: Props) {
  const [entries, setEntries] = useState<PerformanceEntry[]>(initialEntries)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PerformanceEntryInput>(emptyForm())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm())
    setError('')
    setShowForm(true)
  }

  function openEdit(entry: PerformanceEntry) {
    setEditingId(entry.id)
    setForm({
      exam_title: entry.exam_title,
      date_taken: entry.date_taken,
      score_percentage: entry.score_percentage,
      score_raw: entry.score_raw,
      total_raw: entry.total_raw,
      notes: entry.notes ?? '',
      linked_exam_id: entry.linked_exam_id,
    })
    setError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm())
    setError('')
  }

  function setField<K extends keyof PerformanceEntryInput>(
    key: K,
    value: PerformanceEntryInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): string | null {
    if (!form.exam_title.trim()) return 'Exam title is required'
    if (!form.date_taken) return 'Date is required'
    if (form.score_percentage === null || form.score_percentage === undefined) {
      return 'Score (%) is required'
    }
    if (form.score_percentage < 0 || form.score_percentage > 100) {
      return 'Score must be between 0 and 100'
    }
    if (form.score_raw !== null && form.total_raw === null) {
      return 'Please enter total marks if you entered a raw score'
    }
    return null
  }

  async function handleSubmit() {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    const result = editingId
      ? await updatePerformanceEntry(editingId, form)
      : await addPerformanceEntry(form)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Optimistically update local state
    if (editingId) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                exam_title: form.exam_title.trim(),
                date_taken: form.date_taken,
                score_percentage: form.score_percentage,
                score_raw: form.score_raw,
                total_raw: form.total_raw,
                notes: form.notes.trim() || null,
                linked_exam_id: form.linked_exam_id,
              }
            : e,
        ),
      )
    } else {
      // Add a placeholder entry — page will refresh from server on next load
      const newEntry: PerformanceEntry = {
        id: crypto.randomUUID(),
        exam_title: form.exam_title.trim(),
        date_taken: form.date_taken,
        score_percentage: form.score_percentage,
        score_raw: form.score_raw,
        total_raw: form.total_raw,
        notes: form.notes.trim() || null,
        linked_exam_id: form.linked_exam_id,
        created_at: new Date().toISOString(),
      }
      setEntries((prev) => [newEntry, ...prev])
    }

    setLoading(false)
    closeForm()
  }

  async function handleDelete(id: string) {
    const result = await deletePerformanceEntry(id)
    if (result?.error) {
      setError(result.error)
      return
    }
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const practiceMap = Object.fromEntries(practiceExams.map((p) => [p.id, p]))

  const linkOptions = [
    { value: '', label: 'None' },
    ...practiceExams.map((p) => ({
      value: p.id,
      label: `${p.title}${p.practicePercentage !== null ? ` (Practice: ${p.practicePercentage}%)` : ''}`,
    })),
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Previous Exam Performance</h1>
          <p className="mt-1 text-sm text-slate-500">
            Log your real exam scores and compare them against your practice results.
          </p>
        </div>
        {!showForm && (
          <Button onClick={openAdd} size="sm">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add entry
          </Button>
        )}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit entry' : 'Add real exam score'}</CardTitle>
            <CardDescription>Record how you did on the actual exam.</CardDescription>
          </CardHeader>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Exam title"
                placeholder="e.g. Microeconomics Final"
                value={form.exam_title}
                onChange={(e) => setField('exam_title', e.target.value)}
                required
              />
              <Input
                label="Date taken"
                type="date"
                value={form.date_taken}
                onChange={(e) => setField('date_taken', e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Score (%)"
                type="number"
                min={0}
                max={100}
                placeholder="e.g. 72"
                value={form.score_percentage ?? ''}
                onChange={(e) =>
                  setField(
                    'score_percentage',
                    e.target.value === '' ? null : Number(e.target.value),
                  )
                }
                required
              />
              <Input
                label="Raw score (optional)"
                type="number"
                min={0}
                placeholder="e.g. 58"
                value={form.score_raw ?? ''}
                onChange={(e) =>
                  setField('score_raw', e.target.value === '' ? null : Number(e.target.value))
                }
              />
              <Input
                label="Total marks (optional)"
                type="number"
                min={0}
                placeholder="e.g. 80"
                value={form.total_raw ?? ''}
                onChange={(e) =>
                  setField('total_raw', e.target.value === '' ? null : Number(e.target.value))
                }
              />
            </div>

            {practiceExams.length > 0 && (
              <Select
                label="Link to a practice exam (optional)"
                options={linkOptions}
                value={form.linked_exam_id ?? ''}
                onChange={(e) => setField('linked_exam_id', e.target.value || null)}
                hint="Linking enables a practice → real comparison"
              />
            )}

            <Textarea
              label="Notes / reflection (optional)"
              placeholder="How did it go? What would you do differently?"
              value={form.notes}
              onChange={(e) => setField('notes', e.target.value)}
              rows={3}
            />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex gap-3 pt-1">
              <Button onClick={handleSubmit} loading={loading}>
                {editingId ? 'Save changes' : 'Save entry'}
              </Button>
              <Button variant="ghost" onClick={closeForm} disabled={loading}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Empty state */}
      {entries.length === 0 && !showForm && (
        <Card>
          <div className="py-12 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p className="font-medium text-slate-700">No entries yet</p>
            <p className="mt-1 text-sm text-slate-500">Add your first real exam score to start tracking your progress.</p>
            <button
              onClick={openAdd}
              className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Add entry
            </button>
          </div>
        </Card>
      )}

      {/* Entries list */}
      {entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry) => {
            const linked = entry.linked_exam_id ? practiceMap[entry.linked_exam_id] : null
            const practicePct = linked?.practicePercentage ?? null
            const realPct = entry.score_percentage
            const diff =
              practicePct !== null && realPct !== null ? realPct - practicePct : null

            return (
              <Card key={entry.id}>
                <div className="flex items-start gap-4">
                  {/* Score badge */}
                  <div
                    className={cn(
                      'shrink-0 rounded-xl border px-3 py-2 text-center min-w-[64px]',
                      realPct !== null ? scoreBg(realPct) : 'bg-slate-50 border-slate-200 text-slate-500',
                    )}
                  >
                    <p className="text-xl font-bold leading-none">
                      {realPct !== null ? `${realPct}%` : '—'}
                    </p>
                    {entry.score_raw !== null && entry.total_raw !== null && (
                      <p className="mt-1 text-xs opacity-75">
                        {entry.score_raw}/{entry.total_raw}
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900 leading-tight">{entry.exam_title}</p>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {new Date(entry.date_taken).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEdit(entry)}
                          className="text-xs text-slate-400 hover:text-slate-700 transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Comparison insight */}
                    {linked && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-xs text-indigo-700">
                          Practice: {practicePct !== null ? `${practicePct}%` : 'N/A'}
                        </span>
                        {diff !== null && (
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
                              diff > 0
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                                : diff < 0
                                ? 'bg-red-50 border-red-100 text-red-700'
                                : 'bg-slate-50 border-slate-200 text-slate-600',
                            )}
                          >
                            {diff > 0 ? `↑ +${diff}%` : diff < 0 ? `↓ ${diff}%` : '→ No change'}
                          </span>
                        )}
                        <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs text-slate-500">
                          {linked.title}
                        </span>
                      </div>
                    )}

                    {/* Notes */}
                    {entry.notes && (
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
