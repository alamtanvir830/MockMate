import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { SignupForm } from '@/components/auth/signup-form'

export const metadata: Metadata = {
  title: 'Create account',
}

export default function SignupPage() {
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
            <h1 className="text-2xl font-bold text-slate-900">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Start preparing smarter, for free
            </p>
          </div>

          <SignupForm />

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
          By signing up you agree to our{' '}
          <Link href="/terms" className="underline hover:text-slate-600">Terms of Service</Link>,{' '}
          <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>,{' '}
          <Link href="/ai-disclosure" className="underline hover:text-slate-600">AI Disclosure</Link>, and{' '}
          <Link href="/sat-disclaimer" className="underline hover:text-slate-600">SAT Disclaimer</Link>.
          You must be at least 13 years old to use MockMate.
        </p>
      </div>
    </div>
  )
}
