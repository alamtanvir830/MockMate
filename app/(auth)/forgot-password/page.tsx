import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Reset password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Forgot password?</h1>
            <p className="mt-1 text-sm text-slate-500">
              We&apos;ll email you a link to reset it
            </p>
          </div>

          <Suspense fallback={<div className="h-40 animate-pulse bg-slate-50 rounded-lg" />}>
            <ForgotPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
