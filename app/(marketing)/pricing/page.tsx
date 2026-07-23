import { Suspense } from 'react'
import PricingClient from './PricingClient'
import { PremiumPlans } from '@/components/shared/premium-plans'

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 pb-16">
        <div className="max-w-5xl mx-auto pt-16 px-4">
          <PremiumPlans />
        </div>
      </div>
    }>
      <PricingClient />
    </Suspense>
  )
}
