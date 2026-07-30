'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signup } from '@/app/actions/auth'
import { GoogleButton } from '@/components/auth/google-button'

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, null)
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  return (
    <div className="space-y-4">
      <GoogleButton next={next} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-slate-400 uppercase tracking-wide">
            or continue with email
          </span>
        </div>
      </div>

      <form action={action} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}
        <Input
          label="Full name"
          type="text"
          name="full_name"
          placeholder="Your name"
          required
          autoComplete="name"
        />
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
          placeholder="Min. 8 characters"
          required
          autoComplete="new-password"
          minLength={8}
          hint="Must be at least 8 characters"
        />

        {state?.error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <Button type="submit" loading={pending} className="w-full" size="md">
          Create account
        </Button>

        <p className="text-xs text-slate-400 text-center">
          You can access the dashboard immediately after signing up.{' '}
          <Link href={next ? `/login?next=${encodeURIComponent(next)}` : '/login'} className="underline hover:text-slate-600">
            Already have an account? Sign in →
          </Link>
        </p>
      </form>
    </div>
  )
}
