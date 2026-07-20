import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm3Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Form 3 — Locked"
        description="Subscribe to SAT Premium to unlock SAT Forms 1–5, the 700+ question bank, and both SAT Academies."
      />
    )
  }

  return <SATExamTakerClient />
}
