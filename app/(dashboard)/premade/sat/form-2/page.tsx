import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm2Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Practice Test Form 2 — Locked"
        description="Unlock Form 2, Form 3, and unlimited Question Bank practice for a one-time payment."
        features={[
          'SAT Practice Test Form 2 (full adaptive exam)',
          'SAT Practice Test Form 3 (full adaptive exam)',
          'Unlimited Question Bank practice sets',
        ]}
      />
    )
  }

  return <SATExamTakerClient />
}
