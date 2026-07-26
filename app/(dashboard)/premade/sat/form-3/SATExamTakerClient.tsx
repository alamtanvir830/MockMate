'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm3 } from '@/lib/premade-exams/sat/form-3'
import { Form3CountdownBadge } from '@/components/sat/Form3CountdownBadge'

interface Props {
  isAdmin?: boolean
  promotionEndsAt?: string   // ISO timestamp; present only for promo-access users
  canStartNew?: boolean
}

export default function SATExamTakerClient({ isAdmin, promotionEndsAt }: Props) {
  return (
    <div>
      {promotionEndsAt && !isAdmin && (
        <div className="flex items-center justify-center gap-3 border-b border-amber-100 bg-amber-50 px-4 py-2.5 text-[12px] text-amber-800">
          <span className="font-medium">SAT Form 3 — Free limited-time access</span>
          <Form3CountdownBadge endsAt={promotionEndsAt} />
        </div>
      )}
      <SATExamTaker form={satForm3} skipPasswordGate isAdmin={isAdmin ?? false} />
    </div>
  )
}
