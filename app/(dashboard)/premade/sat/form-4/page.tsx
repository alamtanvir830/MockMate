import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm4Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="SAT Practice Test Form 4 — Locked"
        description="Unlock SAT Forms 1, 2, 3, and 4 plus the SAT Question Bank with unlimited lifetime access for a one-time payment."
        features={[
          { label: 'SAT Practice Test Forms 1, 2, 3, and 4', subtext: 'Full-length adaptive SAT practice exams with score feedback' },
          { label: 'Unlimited lifetime usage', subtext: 'Retake available SAT forms anytime after upgrading' },
          { label: 'SAT Question Bank access', subtext: '500+ targeted practice questions built from your weak areas' },
          { label: 'Personalized score reports', subtext: 'Review strengths, weaknesses, and recommended practice' },
        ]}
      />
    )
  }

  return <SATExamTakerClient />
}
