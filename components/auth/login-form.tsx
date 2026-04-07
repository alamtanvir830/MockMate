'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/app/actions/auth'

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null)

  return (
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
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Forgot password?
        </a>
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
  )
}
