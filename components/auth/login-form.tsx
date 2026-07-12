'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/app/actions/auth'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null)

  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')

  const bannerError =
    urlError === 'link_expired'
      ? 'That link has expired or has already been used. If you were resetting your password, request a new link below.'
      : null

  return (
    <div className="space-y-4">
      {bannerError && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
          {bannerError}{' '}
          <Link href="/forgot-password" className="font-semibold underline hover:text-amber-900">
            Reset password →
          </Link>
        </div>
      )}

      <form action={action} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@university.com"
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {state?.error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <Button type="submit" loading={pending} className="w-full" size="md">
          Sign in
        </Button>
      </form>

      <p className="text-xs text-slate-400 text-center leading-relaxed">
        Having trouble signing in?{' '}
        <Link href="/forgot-password" className="underline hover:text-slate-600">
          Reset your password
        </Link>
      </p>
    </div>
  )
}
