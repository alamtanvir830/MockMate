'use client'

import { useSearchParams } from 'next/navigation'
import { PremiumPlans } from '@/components/shared/premium-plans'

export default function PricingClient() {
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled') === 'true'

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-5xl mx-auto pt-16 px-4">
        {canceled && (
          <div className="mb-8 mx-auto max-w-lg bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-center">
            <p className="text-[13px] font-semibold text-amber-800">Payment canceled.</p>
            <p className="text-[12px] text-amber-600 mt-0.5">You can unlock anytime — no worries.</p>
          </div>
        )}
        <PremiumPlans />
      </div>
    </div>
  )
}
