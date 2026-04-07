import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession, createPortalSession } from '@/app/actions/billing'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PLAN_LIMITS } from '@/types'
import type { SubscriptionTier } from '@/types'

export const metadata: Metadata = { title: 'Billing' }

interface PlanConfig {
  tier: SubscriptionTier
  name: string
  price: string
  period: string
  examLimit: string
  features: string[]
  priceId: string | null
}

const plans: PlanConfig[] = [
  {
    tier: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    examLimit: '1 exam',
    features: ['1 mock exam', 'AI question generation', 'Instant scoring', 'AI feedback'],
    priceId: null,
  },
  {
    tier: 'pro',
    name: 'Pro',
    price: '$8',
    period: 'per month',
    examLimit: '3 exams',
    features: [
      '3 mock exams',
      'AI question generation',
      'Instant scoring',
      'AI feedback',
      'Accountability emails',
    ],
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: '$12',
    period: 'per month',
    examLimit: 'Unlimited exams',
    features: [
      'Unlimited mock exams',
      'AI question generation',
      'Instant scoring',
      'AI feedback',
      'Accountability emails',
      'Priority support',
    ],
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID ?? null,
  },
]

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const { success } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier, subscription_status, stripe_customer_id')
    .eq('id', user!.id)
    .single()

  const tier = (profile?.subscription_tier ?? 'free') as SubscriptionTier
  const isSubscribed = !!profile?.stripe_customer_id && tier !== 'free'

  // Exam usage
  const { count: examCount } = await supabase
    .from('exams')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id)

  const used = examCount ?? 0
  const limit = PLAN_LIMITS[tier]
  const usagePercent = limit === Infinity ? 0 : Math.min((used / limit) * 100, 100)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your plan and subscription</p>
      </div>

      {/* Success banner */}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-center gap-3">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-emerald-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Subscription activated</p>
            <p className="text-sm text-emerald-700">Your plan has been upgraded successfully.</p>
          </div>
        </div>
      )}

      {/* Current plan + usage */}
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
              Current plan
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-slate-900 capitalize">{tier}</p>
              {tier !== 'free' && (
                <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  Active
                </span>
              )}
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Exams used</span>
                <span className="font-medium text-slate-900">
                  {used} / {limit === Infinity ? '∞' : limit}
                </span>
              </div>
              {limit !== Infinity && (
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      usagePercent >= 100 ? 'bg-red-500' : 'bg-emerald-500',
                    )}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {isSubscribed && (
            <form action={createPortalSession}>
              <Button type="submit" variant="outline" size="sm">
                Manage subscription
              </Button>
            </form>
          )}
        </div>
      </Card>

      {/* Plan cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.tier === tier
          const isUpgrade =
            (tier === 'free' && (plan.tier === 'pro' || plan.tier === 'premium')) ||
            (tier === 'pro' && plan.tier === 'premium')
          const isDowngrade = !isCurrent && !isUpgrade && plan.tier !== 'free'

          const checkoutAction = plan.priceId
            ? createCheckoutSession.bind(null, plan.priceId)
            : null

          return (
            <div
              key={plan.tier}
              className={cn(
                'rounded-xl border p-5 flex flex-col',
                isCurrent
                  ? 'border-emerald-300 bg-emerald-50 ring-1 ring-emerald-300'
                  : plan.tier === 'premium'
                  ? 'border-indigo-200 bg-indigo-50/50'
                  : 'border-slate-200 bg-white',
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-slate-900">{plan.name}</p>
                {isCurrent && (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full px-2 py-0.5">
                    Current
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500 ml-1">{plan.period}</span>
              </div>

              <p className="text-sm font-medium text-slate-700 mb-3">{plan.examLimit}</p>

              <ul className="space-y-2 flex-1 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <Button variant="outline" disabled className="w-full">
                  Current plan
                </Button>
              ) : checkoutAction && (isUpgrade || isDowngrade) ? (
                <form action={checkoutAction}>
                  <Button
                    type="submit"
                    className="w-full"
                    variant={isUpgrade ? 'primary' : 'outline'}
                  >
                    {isUpgrade ? `Upgrade to ${plan.name}` : `Switch to ${plan.name}`}
                  </Button>
                </form>
              ) : plan.tier === 'free' ? (
                <form action={createPortalSession}>
                  <Button type="submit" variant="outline" className="w-full">
                    Downgrade to Free
                  </Button>
                </form>
              ) : null}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-400 text-center">
        Payments are processed securely by Stripe. Cancel anytime from the customer portal.
      </p>
    </div>
  )
}
