import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm2Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Practice Test Form 2 — Locked"
        description="Unlock Form 2, unlimited Question Bank practice, and full Form 1 review for a one-time payment."
        features={[
          'SAT Practice Test Form 2 (full adaptive exam)',
          'Unlimited Question Bank practice sets',
          'Full question-by-question review for Form 1',
        ]}
      />
    )
  }

  return <SATExamTakerClient />
}
