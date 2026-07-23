'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { EntitlementData } from '@/lib/entitlements'

// ─── SAT Premium star icon (white center, gold stroke) ───────────────────────
function PremiumStar({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4 shrink-0 text-amber-500', className)}
      fill="white"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('h-4 w-4 shrink-0', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-[15px] font-semibold text-slate-900 mb-4">{title}</h2>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

// ─── Plan badge ───────────────────────────────────────────────────────────────

interface PlanBadgeProps {
  isAdmin: boolean
  entitlements: EntitlementData
  cancelDate: string | null
}

function badgeIsThreeMonthActive(e: EntitlementData): boolean {
  if (e.satPurchasePlanType !== 'three_month' || e.satPurchaseStatus !== 'active') return false
  if (!e.satPurchaseExpiresAt) return false
  const expiry = new Date(e.satPurchaseExpiresAt).getTime()
  return !Number.isNaN(expiry) && expiry > Date.now()
}

function badgeIsLifetimeActive(e: EntitlementData): boolean {
  return e.satPurchasePlanType === 'lifetime' && e.satPurchaseStatus === 'active'
}

function PlanBadge({ isAdmin, entitlements, cancelDate }: PlanBadgeProps) {
  const { satUpgradeUnlocked, isLegacyLifetime, satSubscriptionStatus, satCancelAtPeriodEnd } = entitlements

  if (isAdmin) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-indigo-600" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <p className="text-[14px] font-bold text-slate-900">Admin Account</p>
          <p className="text-[12px] text-slate-500 mt-0.5">Full platform access</p>
        </div>
      </div>
    )
  }

  if (isLegacyLifetime) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <PremiumStar className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-amber-800">Legacy Lifetime Access</p>
          <p className="text-[12px] text-amber-700 mt-0.5">Permanent SAT Premium — no monthly charge</p>
        </div>
      </div>
    )
  }

  if (badgeIsLifetimeActive(entitlements)) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <PremiumStar className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-amber-800">SAT Premium — Lifetime Access</p>
          <p className="text-[12px] text-amber-700 mt-0.5">One-time payment. No expiration.</p>
        </div>
      </div>
    )
  }

  if (badgeIsThreeMonthActive(entitlements)) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <PremiumStar className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-amber-800">SAT Premium — 3-Month Access</p>
          <p className="text-[12px] text-amber-700 mt-0.5">One-time payment. Does not renew.</p>
        </div>
      </div>
    )
  }

  if (satUpgradeUnlocked && satSubscriptionStatus && satCancelAtPeriodEnd && cancelDate) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <PremiumStar className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-amber-800">SAT Premium — Cancels on {cancelDate}</p>
          <p className="text-[12px] text-amber-700 mt-0.5">Access remains active until the billing period ends</p>
        </div>
      </div>
    )
  }

  if (satUpgradeUnlocked && satSubscriptionStatus) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <PremiumStar className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-amber-800">SAT Premium — Monthly</p>
          <p className="text-[12px] text-amber-700 mt-0.5">Full access to all SAT Premium features</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-slate-400" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <p className="text-[14px] font-bold text-slate-900">Free Plan</p>
        <p className="text-[12px] text-slate-500 mt-0.5">Upgrade to unlock SAT Premium</p>
      </div>
    </div>
  )
}

// ─── Profile form ──────────────────────────────────────────────────────────────

function ProfileForm({ initialFullName }: { initialFullName: string }) {
  const [name, setName] = useState(initialFullName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const isDirty = name.trim() !== initialFullName.trim()

  async function handleSave() {
    if (!isDirty || saving) return
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name }),
      })
      const data = await res.json() as { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Failed to save. Please try again.')
        return
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-1.5">
      <input
        id="full-name"
        type="text"
        value={name}
        onChange={e => { setName(e.target.value); setSaved(false) }}
        maxLength={150}
        placeholder="Enter your full name"
        aria-label="Full name"
        aria-describedby={error ? 'name-error' : undefined}
        aria-invalid={!!error}
        className={cn(
          'w-full rounded-lg border px-3 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:ring-2 transition-colors',
          error ? 'bg-red-50 border-red-200 focus:ring-red-200' : 'bg-white border-slate-200 focus:ring-indigo-200'
        )}
      />
      {error && (
        <p id="name-error" role="alert" className="text-[11px] text-red-700 font-medium">{error}</p>
      )}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          aria-live="polite"
          className={cn(
            'rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors',
            isDirty && !saving
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-[12px] text-emerald-600 font-medium" role="status" aria-live="polite">
            <CheckIcon className="text-emerald-500" />
            Saved
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Billing portal button ────────────────────────────────────────────────────

function BillingPortalButton({ label = 'Manage or Cancel Subscription' }: { label?: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleClick() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnPath: '/settings' }),
      })
      const data = await res.json() as { url?: string; error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Could not open billing portal. Please try again.')
        return
      }
      if (data.url) window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <p role="alert" className="text-[12px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-2">
          {error}
        </p>
      )}
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-700 font-semibold text-[13px] px-4 py-2.5 transition-colors"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 shrink-0" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
        {loading ? 'Opening…' : label}
      </button>
    </div>
  )
}

// ─── Billing section ──────────────────────────────────────────────────────────

function BillingSection({
  isAdmin,
  entitlements,
  cancelDate,
  periodEndDate,
  purchaseExpiryDate,
}: {
  isAdmin: boolean
  entitlements: EntitlementData
  cancelDate: string | null
  periodEndDate: string | null
  purchaseExpiryDate: string | null
}) {
  const { satUpgradeUnlocked, isLegacyLifetime, satSubscriptionStatus, satCancelAtPeriodEnd, stripeCustomerId } = entitlements
  const isPastDue = satSubscriptionStatus === 'past_due'

  if (isAdmin && !satUpgradeUnlocked) {
    return (
      <p className="text-[13px] text-slate-500 leading-relaxed">
        Administrative access — no subscription management required.
      </p>
    )
  }

  if (isLegacyLifetime) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <PremiumStar />
          <span className="text-[13px] font-semibold text-amber-800">Legacy Lifetime Access</span>
        </div>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          You have permanent access to SAT Premium features from your original lifetime purchase.
        </p>
        <p className="inline-flex items-center gap-1.5 text-[12px] text-emerald-700 font-medium">
          <CheckIcon className="text-emerald-500" />
          No recurring payment
        </p>
      </div>
    )
  }

  if (badgeIsLifetimeActive(entitlements)) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <PremiumStar />
          <span className="text-[13px] font-semibold text-amber-800">SAT Premium — Lifetime Access</span>
        </div>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          One-time payment. No expiration. You have permanent access to all SAT Premium features.
        </p>
        <p className="inline-flex items-center gap-1.5 text-[12px] text-emerald-700 font-medium">
          <CheckIcon className="text-emerald-500" />
          No recurring payment
        </p>
      </div>
    )
  }

  if (badgeIsThreeMonthActive(entitlements)) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <PremiumStar />
          <span className="text-[13px] font-semibold text-amber-800">SAT Premium — 3-Month Access</span>
        </div>
        <div className="space-y-1 text-[13px] text-slate-600">
          <p><span className="font-medium text-slate-700">Plan:</span> SAT Premium — 3-Month Access</p>
          {purchaseExpiryDate && (
            <p><span className="font-medium text-slate-700">Access expires on:</span> {purchaseExpiryDate}</p>
          )}
        </div>
        <p className="text-[12px] text-slate-500">One-time payment. Does not renew.</p>
      </div>
    )
  }

  if (satUpgradeUnlocked && satSubscriptionStatus) {
    if (isPastDue) {
      return (
        <div className="space-y-3">
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-[13px] font-semibold text-red-800">Billing issue</p>
            <p className="text-[12px] text-red-700 mt-0.5">
              There is a billing issue with your SAT Premium subscription. Update your payment method to keep access.
            </p>
          </div>
          {stripeCustomerId && <BillingPortalButton label="Update Billing Information" />}
        </div>
      )
    }

    if (satCancelAtPeriodEnd && cancelDate) {
      return (
        <div className="space-y-3">
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-[13px] font-semibold text-amber-800">Cancellation scheduled</p>
            <p className="text-[12px] text-amber-700 mt-0.5">
              Your subscription will not renew. You will keep SAT Premium access until {cancelDate}.
            </p>
          </div>
          <div className="space-y-1 text-[13px] text-slate-600">
            <p><span className="font-medium text-slate-700">Plan:</span> SAT Premium</p>
            <p><span className="font-medium text-slate-700">Access ends:</span> {cancelDate}</p>
          </div>
          {stripeCustomerId && <BillingPortalButton label="Manage Subscription" />}
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <div className="space-y-1.5 text-[13px] text-slate-600">
          <p>
            <span className="font-medium text-slate-700">Plan:</span>{' '}
            <span className="inline-flex items-center gap-1">
              <PremiumStar className="h-3.5 w-3.5" />
              SAT Premium — Monthly
            </span>
          </p>
          <p><span className="font-medium text-slate-700">Price:</span> $9.99/month</p>
          {periodEndDate && (
            <p><span className="font-medium text-slate-700">Next billing date:</span> {periodEndDate}</p>
          )}
          <p><span className="font-medium text-slate-700">Billing:</span> Monthly, auto-renews until canceled</p>
        </div>
        {stripeCustomerId && <BillingPortalButton label="Manage or Cancel Subscription" />}
      </div>
    )
  }

  // Free user
  return (
    <div className="space-y-3">
      <p className="text-[13px] text-slate-600 leading-relaxed">
        Upgrade to SAT Premium to unlock SAT Forms 1–5, the 700+ question bank, the SAT Reading &amp; Writing Academy,
        the SAT Math &amp; Desmos Academy, personalized score reports, and full access while subscribed.
      </p>
      <Link
        href="/billing"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[13px] px-4 py-2.5 transition-colors"
      >
        <PremiumStar className="text-white" />
        View SAT Premium
      </Link>
    </div>
  )
}

// ─── Resend verification button ───────────────────────────────────────────────

export function ResendVerificationButton({ email }: { email: string }) {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleResend() {
    if (loading || sent) return
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error: resendError } = await supabase.auth.resend({ type: 'signup', email })
      if (resendError) {
        setError('Could not send verification email. Please try again.')
        return
      }
      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <p className="text-[13px] text-emerald-700 font-medium" role="status" aria-live="polite">
        A new verification email has been sent. Please check your inbox.
      </p>
    )
  }

  return (
    <div>
      {error && <p role="alert" className="text-[12px] text-red-700 mb-2">{error}</p>}
      <button
        onClick={handleResend}
        disabled={loading}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-60 transition-colors"
      >
        {loading ? 'Sending…' : 'Resend Verification Email'}
      </button>
    </div>
  )
}

// ─── Sign out button ───────────────────────────────────────────────────────────

export function SignOutButton() {
  async function handleSignOut() {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-colors"
    >
      Sign Out
    </button>
  )
}

// ─── Main client export ───────────────────────────────────────────────────────

export interface SettingsClientProps {
  email: string
  isEmailVerified: boolean
  fullName: string
  memberSince: string | null
  isAdmin: boolean
  entitlements: EntitlementData
  cancelDate: string | null
  periodEndDate: string | null
  purchaseExpiryDate: string | null
}

/** Returns true for an active, non-expired 3-Month Access purchase. */
function isThreeMonthActive(e: EntitlementData): boolean {
  if (e.satPurchasePlanType !== 'three_month' || e.satPurchaseStatus !== 'active') return false
  if (!e.satPurchaseExpiresAt) return false
  const expiry = new Date(e.satPurchaseExpiresAt).getTime()
  return !Number.isNaN(expiry) && expiry > Date.now()
}

/** Returns true for an active new Lifetime Access purchase (not legacy). */
function isLifetimeActive(e: EntitlementData): boolean {
  return e.satPurchasePlanType === 'lifetime' && e.satPurchaseStatus === 'active'
}

export default function SettingsClient({
  email,
  isEmailVerified,
  fullName,
  memberSince,
  isAdmin,
  entitlements,
  cancelDate,
  periodEndDate,
  purchaseExpiryDate,
}: SettingsClientProps) {
  const { satUpgradeUnlocked, isLegacyLifetime, satSubscriptionStatus, satCancelAtPeriodEnd } = entitlements
  const lifetimeActive = isLifetimeActive(entitlements)
  const threeMonthActive = isThreeMonthActive(entitlements)

  const planLabel = (() => {
    if (isAdmin) return 'Admin Account'
    if (isLegacyLifetime) return 'Legacy Lifetime Access'
    if (lifetimeActive) return 'SAT Premium — Lifetime Access'
    if (threeMonthActive) return 'SAT Premium — 3-Month Access'
    if (satUpgradeUnlocked && satSubscriptionStatus && satCancelAtPeriodEnd && cancelDate) return `SAT Premium — Cancels on ${cancelDate}`
    if (satUpgradeUnlocked && satSubscriptionStatus) return 'SAT Premium — Monthly'
    return 'Free Plan'
  })()

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-[14px] text-slate-500 mt-1">Manage your MockMate account and subscription.</p>
      </div>

      {/* Plan badge */}
      <PlanBadge isAdmin={isAdmin} entitlements={entitlements} cancelDate={cancelDate} />

      {/* Profile Information */}
      <section aria-labelledby="profile-heading" className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="px-6 pt-5 pb-4">
          <SectionHeading title="Profile Information" />
          <div className="space-y-5">
            {/* Full name */}
            <Field label="Full name">
              <ProfileForm initialFullName={fullName} />
            </Field>

            {/* Email (read-only) */}
            <Field label="Email address">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  readOnly
                  aria-label="Email address (read-only)"
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-500 cursor-default focus:outline-none"
                />
                {isEmailVerified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <CheckIcon className="h-3 w-3 text-emerald-500" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                    Not verified
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Your email address is connected to your MockMate login.
              </p>
            </Field>
          </div>
        </div>
      </section>

      {/* Account Information */}
      <section aria-labelledby="account-heading" className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 pt-5 pb-5">
          <SectionHeading title="Account Information" />
          <dl className="space-y-3">
            <div className="flex items-start gap-4">
              <dt className="w-36 shrink-0 text-[12px] font-semibold text-slate-500 uppercase tracking-wide pt-0.5">Email</dt>
              <dd className="text-[13px] text-slate-700">{email}</dd>
            </div>
            <div className="flex items-start gap-4">
              <dt className="w-36 shrink-0 text-[12px] font-semibold text-slate-500 uppercase tracking-wide pt-0.5">Verification</dt>
              <dd>
                {isEmailVerified ? (
                  <span className="inline-flex items-center gap-1 text-[13px] text-emerald-700 font-medium">
                    <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                    Verified
                  </span>
                ) : (
                  <span className="text-[13px] text-amber-700 font-medium">Not verified</span>
                )}
              </dd>
            </div>
            {memberSince && (
              <div className="flex items-start gap-4">
                <dt className="w-36 shrink-0 text-[12px] font-semibold text-slate-500 uppercase tracking-wide pt-0.5">Member since</dt>
                <dd className="text-[13px] text-slate-700">{memberSince}</dd>
              </div>
            )}
            <div className="flex items-start gap-4">
              <dt className="w-36 shrink-0 text-[12px] font-semibold text-slate-500 uppercase tracking-wide pt-0.5">Plan</dt>
              <dd className="text-[13px] text-slate-700">{planLabel}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Billing */}
      <section aria-labelledby="billing-heading" className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 pt-5 pb-5">
          <SectionHeading title="Billing" />
          <BillingSection
            isAdmin={isAdmin}
            entitlements={entitlements}
            cancelDate={cancelDate}
            periodEndDate={periodEndDate}
            purchaseExpiryDate={purchaseExpiryDate}
          />
        </div>
      </section>

      {/* Help */}
      <p className="text-[12px] text-slate-400 text-center">
        Questions?{' '}
        <a href="mailto:ranvi.contact@gmail.com" className="text-indigo-600 hover:underline">
          ranvi.contact@gmail.com
        </a>
      </p>
    </div>
  )
}

