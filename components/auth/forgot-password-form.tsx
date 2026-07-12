'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { forgotPassword } from '@/app/actions/auth'

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPassword, null)
  const searchParams = useSearchParams()
  const linkExpired = searchParams.get('error') === 'link_expired'

  if (state?.message) {
    return (
      <div className="space-y-4 text-center">
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-4 text-sm text-green-700">
          {state.message}
        </div>
        <p className="text-sm text-slate-500">
          Didn&apos;t receive it?{' '}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Try again
          </button>
        </p>
        <Link
          href="/login"
          className="block text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4">
      {linkExpired && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
          That reset link has expired or already been used. Enter your email to get a new one.
        </div>
      )}

      <p className="text-sm text-slate-500">
        Enter the email you used to create your account and we&apos;ll send a
        password reset link.
      </p>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@university.com"
        required
        autoComplete="email"
      />

      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" loading={pending} className="w-full" size="md">
        Send reset email
      </Button>

      <Link
        href="/login"
        className="block text-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
      >
        Back to sign in
      </Link>
    </form>
  )
}
