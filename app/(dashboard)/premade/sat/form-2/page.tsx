import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm2Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Practice Test Form 2 — Locked"
        description="Unlock Form 2, Form 3, and 300+ Question Bank practice questions for a one-time payment."
        features={[
          { label: 'SAT Practice Test Form 2', subtext: 'Score feedback + personalized weak-area sets' },
          { label: 'SAT Practice Test Form 3', subtext: 'Score feedback + personalized weak-area sets' },
          { label: '300+ Question Bank questions', subtext: 'Extra targeted practice from your weak areas' },
        ]}
      />
    )
  }

  return <SATExamTakerClient />
}
