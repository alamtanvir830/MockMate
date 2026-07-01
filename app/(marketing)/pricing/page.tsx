import { Suspense } from 'react'
import PricingClient from './PricingClient'
import { UpgradeGate } from '@/components/shared/upgrade-gate'

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-lg mx-auto pt-16 px-4">
          <UpgradeGate />
        </div>
      </div>
    }>
      <PricingClient />
    </Suspense>
  )
}
