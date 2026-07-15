import { getEntitlements } from '@/lib/entitlements'
import { UpgradeGate } from '@/components/shared/upgrade-gate'
import SATExamTakerClient from './SATExamTakerClient'

export default async function SATForm3Page() {
  const { satUpgradeUnlocked } = await getEntitlements()

  if (!satUpgradeUnlocked) {
    return (
      <UpgradeGate
        title="Unlock Lifetime SAT Access"
        description="Unlock SAT Forms 1, 2, 3, 4, and 5 plus the SAT Question Bank with unlimited lifetime access for a one-time payment."
        features={[
          { label: 'SAT Practice Test Forms 1, 2, 3, 4, and 5', subtext: 'Full-length adaptive SAT practice exams with score feedback' },
          { label: 'Unlimited lifetime usage', subtext: 'Retake available SAT forms anytime after upgrading' },
          { label: 'SAT Question Bank access', subtext: '700+ targeted practice questions built from your weak areas' },
          { label: 'Personalized score reports', subtext: 'Review strengths, weaknesses, and recommended practice' },
        ]}
      />
    )
  }

  return <SATExamTakerClient />
}
