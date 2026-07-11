'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resetPassword } from '@/app/actions/auth'

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPassword, null)

  return (
    <form action={action} className="space-y-4">
      <Input
        label="New password"
        type="password"
        name="password"
        placeholder="Min. 8 characters"
        required
        autoComplete="new-password"
        minLength={8}
        hint="Must be at least 8 characters"
      />
      <Input
        label="Confirm new password"
        type="password"
        name="confirm_password"
        placeholder="••••••••"
        required
        autoComplete="new-password"
      />

      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.error}
          {state.error.includes('expired') && (
            <a
              href="/forgot-password"
              className="block mt-2 font-medium text-red-700 underline"
            >
              Request a new reset email →
            </a>
          )}
        </div>
      )}

      <Button type="submit" loading={pending} className="w-full" size="md">
        Set new password
      </Button>
    </form>
  )
}
