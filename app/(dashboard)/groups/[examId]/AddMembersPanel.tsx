'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { addGroupMembers } from '@/app/actions/groups'

interface Props {
  examId: string
  /** Emails already in the group — used for client-side duplicate pre-check */
  existingEmails: string[]
}

interface Row {
  name: string
  email: string
}

interface RowError {
  name?: string
  email?: string
}

export function AddMembersPanel({ examId, existingEmails }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<Row[]>([{ name: '', email: '' }])
  const [rowErrors, setRowErrors] = useState<RowError[]>([{}])
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  function updateRow(index: number, field: keyof Row, value: string) {
    setRows((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
    setRowErrors((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: undefined }
      return next
    })
  }

  function addRow() {
    if (rows.length >= 3) return
    setRows((prev) => [...prev, { name: '', email: '' }])
    setRowErrors((prev) => [...prev, {}])
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index))
    setRowErrors((prev) => prev.filter((_, i) => i !== index))
  }

  function reset() {
    setOpen(false)
    setRows([{ name: '', email: '' }])
    setRowErrors([{}])
    setGeneralError('')
    setSuccessMessage('')
  }

  async function handleSubmit() {
    setGeneralError('')

    // Client-side validation
    const errors: RowError[] = rows.map(() => ({}))
    let hasError = false
    const existing = new Set(existingEmails.map((e) => e.toLowerCase()))
    const seenInForm = new Set<string>()

    for (let i = 0; i < rows.length; i++) {
      const name = rows[i].name.trim()
      const email = rows[i].email.trim().toLowerCase()

      if (!name) {
        errors[i].name = 'Name is required'
        hasError = true
      }
      if (!email) {
        errors[i].email = 'Email is required'
        hasError = true
      } else if (!email.includes('@')) {
        errors[i].email = 'Enter a valid email address'
        hasError = true
      } else if (existing.has(email)) {
        errors[i].email = 'This person is already in the group.'
        hasError = true
      } else if (seenInForm.has(email)) {
        errors[i].email = 'Duplicate email — already entered above'
        hasError = true
      } else {
        seenInForm.add(email)
      }
    }

    setRowErrors(errors)
    if (hasError) return

    setSubmitting(true)
    const result = await addGroupMembers({ examId, members: rows })
    setSubmitting(false)

    if ('error' in result) {
      setGeneralError(result.error)
      return
    }

    // Mark any server-detected duplicates (race condition edge case)
    if (result.duplicates.length > 0) {
      const newErrors: RowError[] = [...rowErrors]
      for (let i = 0; i < rows.length; i++) {
        if (result.duplicates.includes(rows[i].email.trim().toLowerCase())) {
          newErrors[i] = { ...newErrors[i], email: 'This person is already in the group.' }
        }
      }
      setRowErrors(newErrors)
      if (result.added === 0) return
    }

    // Success
    const n = result.added
    let msg = n === 1 ? '1 person added to the group.' : `${n} people added to the group.`
    if (result.duplicates.length > 0) {
      msg += ` (${result.duplicates.length} already in group — skipped)`
    }
    setSuccessMessage(msg)
    router.refresh()
    setTimeout(() => reset(), 3000)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add people to group
      </button>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add people to group</CardTitle>
      </CardHeader>

      {successMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          {successMessage}
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="relative rounded-lg border border-slate-200 p-4 space-y-3">
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  aria-label="Remove person"
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Person {i + 1}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Input
                    placeholder="Name"
                    value={row.name}
                    onChange={(e) => updateRow(i, 'name', e.target.value)}
                    className={cn(rowErrors[i]?.name && 'border-red-400 focus:ring-red-400')}
                  />
                  {rowErrors[i]?.name && (
                    <p className="text-xs text-red-600">{rowErrors[i].name}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={row.email}
                    onChange={(e) => updateRow(i, 'email', e.target.value)}
                    className={cn(rowErrors[i]?.email && 'border-red-400 focus:ring-red-400')}
                  />
                  {rowErrors[i]?.email && (
                    <p className="text-xs text-red-600">{rowErrors[i].email}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {rows.length < 3 && (
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add another person
            </button>
          )}

          {generalError && <p className="text-sm text-red-600">{generalError}</p>}

          <div className="flex gap-3 pt-1">
            <Button onClick={handleSubmit} loading={submitting}>
              Add to group
            </Button>
            <Button variant="ghost" onClick={reset} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
