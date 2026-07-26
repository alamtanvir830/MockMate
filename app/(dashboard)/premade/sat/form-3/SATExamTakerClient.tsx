'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm3 } from '@/lib/premade-exams/sat/form-3'
import { Form3CountdownBadge } from '@/components/sat/Form3CountdownBadge'

interface Props {
  isAdmin?: boolean
  promotionEndsAt?: string | null
}

export default function SATExamTakerClient({ isAdmin, promotionEndsAt }: Props) {
  return (
    <div>
      {promotionEndsAt && (
        <div className="flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-amber-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span className="text-[12px] font-semibold text-amber-700">SAT Form 3 is free until the countdown ends —</span>
          <Form3CountdownBadge endsAt={promotionEndsAt} />
        </div>
      )}
      <SATExamTaker form={satForm3} skipPasswordGate isAdmin={isAdmin ?? false} />
    </div>
  )
}
