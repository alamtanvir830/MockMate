'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signup } from '@/app/actions/auth'

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, null)

  return (
    <form action={action} className="space-y-4">
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
    </form>
  )
}
