'use client'

import { useState, useActionState } from 'react'
import { resendVerification } from '@/app/actions/auth'

export function EmailVerificationBanner({ email }: { email: string }) {
  const [dismissed, setDismissed] = useState(false)
  const [state, action, pending] = useActionState(resendVerification, null)

  if (dismissed || state?.message) return null

  return (
    <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 mb-6 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700">Verify your email</p>
        <p className="text-xs text-slate-500 mt-0.5">
          Verify your email to enable password recovery and account updates.
        </p>
        {state?.error && (
          <p className="text-xs text-red-600 mt-1">{state.error}</p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <form action={action}>
          <input type="hidden" name="email" value={email} />
          <button
            type="submit"
            disabled={pending}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 transition-colors"
          >
            {pending ? 'Sending…' : 'Send verification email'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="text-slate-400 hover:text-slate-600 transition-colors text-base leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
