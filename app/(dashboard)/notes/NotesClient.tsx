'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createNote, updateNote, deleteNote } from '@/app/actions/notes'
import type { Note, NoteCategory } from '@/app/actions/notes'

const CATEGORIES: NoteCategory[] = [
  'General notes',
  'Study planner',
  'Professor notes',
  'Lecture notes',
  'Speaker notes',
  'Exam reminders',
  'Other',
]

const CATEGORY_COLORS: Record<NoteCategory, string> = {
  'General notes': 'bg-slate-100 text-slate-700',
  'Study planner': 'bg-blue-100 text-blue-700',
  'Professor notes': 'bg-purple-100 text-purple-700',
  'Lecture notes': 'bg-indigo-100 text-indigo-700',
  'Speaker notes': 'bg-teal-100 text-teal-700',
  'Exam reminders': 'bg-amber-100 text-amber-700',
  'Other': 'bg-rose-100 text-rose-700',
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

interface Props {
  initialNotes: Note[]
}

export function NotesClient({ initialNotes }: Props) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedId, setSelectedId] = useState<string | null>(initialNotes[0]?.id ?? null)
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<NoteCategory>('General notes')
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isNew = selectedId === '__new__'

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null

  // Load note into editor when selection changes
  useEffect(() => {
    if (isNew) {
      setTitle('')
      setContent('')
      setCategory('General notes')
      setLastSaved(null)
    } else if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
      setCategory(selectedNote.category)
      setLastSaved(selectedNote.updated_at)
    }
  }, [selectedId]) // eslint-disable-line react-hooks/exhaustive-deps

  const persistSave = useCallback(
    async (t: string, c: string, cat: NoteCategory) => {
      if (isNew) return // new notes are saved only on explicit save
      if (!selectedId) return
      setSaving(true)
      const { error } = await updateNote({ id: selectedId, title: t, content: c, category: cat })
      if (!error) {
        const now = new Date().toISOString()
        setLastSaved(now)
        setNotes((prev) =>
          prev.map((n) =>
            n.id === selectedId ? { ...n, title: t || 'Untitled', content: c, category: cat, updated_at: now } : n,
          ),
        )
      }
      setSaving(false)
    },
    [selectedId, isNew],
  )

  // Auto-save after 1.5 s of inactivity
  const scheduleAutoSave = (t: string, c: string, cat: NoteCategory) => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => persistSave(t, c, cat), 1500)
  }

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!isNew) scheduleAutoSave(v, content, category)
  }

  const handleContentChange = (v: string) => {
    setContent(v)
    if (!isNew) scheduleAutoSave(title, v, category)
  }

  const handleCategoryChange = (v: NoteCategory) => {
    setCategory(v)
    if (!isNew) scheduleAutoSave(title, content, v)
  }

  const handleCreate = async () => {
    setSaving(true)
    const { data, error } = await createNote({ title, content, category })
    setSaving(false)
    if (error || !data) return
    setNotes((prev) => [data, ...prev])
    setSelectedId(data.id)
    setLastSaved(data.updated_at)
  }

  const handleDelete = async (id: string) => {
    const { error } = await deleteNote(id)
    if (error) return
    const remaining = notes.filter((n) => n.id !== id)
    setNotes(remaining)
    setDeleteConfirmId(null)
    if (selectedId === id) {
      setSelectedId(remaining[0]?.id ?? null)
    }
  }

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()),
  )

  const hasEditor = isNew || selectedId !== null

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left panel — note list */}
      <aside className="w-72 shrink-0 flex flex-col border-r border-slate-200 bg-white">
        <div className="px-4 pt-5 pb-3 border-b border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-900">Personal Notes</h1>
            <button
              onClick={() => setSelectedId('__new__')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New note
            </button>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-slate-400 text-center">
              {search ? 'No matching notes' : 'No notes yet. Create your first one!'}
            </p>
          )}
          {filtered.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedId(note.id)}
              className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                selectedId === note.id ? 'bg-indigo-50 border-l-2 border-l-indigo-500' : ''
              }`}
            >
              <p className="text-sm font-medium text-slate-900 truncate">{note.title || 'Untitled'}</p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{note.content || 'No content'}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[note.category]}`}>
                  {note.category}
                </span>
                <span className="text-xs text-slate-300">{formatRelative(note.updated_at)}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Right panel — editor */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50">
        {!hasEditor ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="mx-auto h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Select a note or create a new one</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 min-h-0">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <input
                type="text"
                placeholder="Note title…"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="flex-1 text-xl font-semibold text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300"
              />
              <div className="flex items-center gap-2 shrink-0">
                {!isNew && (
                  <button
                    onClick={() => setDeleteConfirmId(selectedId)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete note"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors border ${
                    category === cat
                      ? `${CATEGORY_COLORS[cat]} border-transparent`
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              placeholder="Start writing…"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="flex-1 w-full resize-none bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 leading-relaxed"
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-slate-400">
                {saving ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Saving…
                  </span>
                ) : lastSaved ? (
                  `Last saved ${formatRelative(lastSaved)}`
                ) : null}
              </div>
              {isNew && (
                <button
                  onClick={handleCreate}
                  disabled={saving}
                  className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving…' : 'Save note'}
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Delete note?</h2>
            <p className="text-sm text-slate-500">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
