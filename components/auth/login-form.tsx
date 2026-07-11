'use client'

import { useActionState, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login, resendVerification } from '@/app/actions/auth'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null)
  const [resendState, resendAction, resendPending] = useActionState(resendVerification, null)
  const [showResend, setShowResend] = useState(false)

  const searchParams = useSearchParams()
  const urlMessage = searchParams.get('message')
  const urlError   = searchParams.get('error')

  const bannerMessage =
    urlMessage === 'check_email'
      ? 'Account created! Check your email to verify your account before signing in.'
      : null

  const bannerError =
    urlError === 'link_expired'
      ? 'That verification link has expired. Use "Resend verification email" below to get a new one.'
      : urlError === 'confirmation_failed'
      ? 'Email confirmation failed. Please try again or resend the verification email.'
      : null

  const showUnverifiedHint =
    state?.error?.toLowerCase().includes('verify') ||
    state?.error?.toLowerCase().includes('confirmed')

  return (
    <div className="space-y-4">
      {bannerMessage && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          {bannerMessage}
        </div>
      )}
      {bannerError && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
          {bannerError}
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remember me
          </label>
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

      {/* Resend verification section — shown automatically if hint triggers or user expands */}
      {(showUnverifiedHint || bannerError || urlMessage === 'check_email') && (
        <div className="pt-2 border-t border-slate-100">
          {!showResend ? (
            <button
              type="button"
              onClick={() => setShowResend(true)}
              className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors w-full text-center"
            >
              Resend verification email
            </button>
          ) : (
            <form action={resendAction} className="space-y-2">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@university.com"
                required
              />
              {resendState?.error && (
                <p className="text-sm text-red-600">{resendState.error}</p>
              )}
              {resendState?.message && (
                <p className="text-sm text-green-600">{resendState.message}</p>
              )}
              <Button
                type="submit"
                loading={resendPending}
                className="w-full"
                size="md"
                variant="outline"
              >
                Send verification email
              </Button>
            </form>
          )}
        </div>
      )}

      <p className="text-xs text-slate-400 text-center leading-relaxed">
        If you just created an account, verify your email first.{' '}
        If the link expired, use &quot;Resend verification email&quot; above.
      </p>
    </div>
  )
}
