import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm7Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Form 7 — Locked"
        description="Subscribe to SAT Premium to unlock all 10 full-length adaptive SAT practice forms."
      />
    )
  }

  return <SATExamTakerClient />
}
