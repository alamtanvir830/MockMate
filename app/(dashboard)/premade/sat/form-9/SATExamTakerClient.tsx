'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { getLatestSatContentVersion } from '@/lib/premade-exams/sat/version-constants'
import { RollingPromoCountdownBadge } from '@/components/sat/RollingPromoCountdown'

interface Props {
  freeWindowExpiresAt?: string | null
  showCountdown?: boolean
  formNumber?: number
}

export default function SATExamTakerClient({ freeWindowExpiresAt, showCountdown, formNumber = 9 }: Props) {
  return (
    <div>
      {showCountdown && freeWindowExpiresAt && (
        <div className="flex items-center justify-center gap-2 bg-brand-50 border-b border-brand-200 px-4 py-2.5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-brand-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span className="text-[12px] font-semibold text-brand-700">SAT Form {formNumber} is free for 24 hours —</span>
          <RollingPromoCountdownBadge expiresAt={freeWindowExpiresAt} />
        </div>
      )}
      <SATExamTaker form={getSatForm(9, getLatestSatContentVersion(9))} contentVersion={getLatestSatContentVersion(9)} skipPasswordGate />
    </div>
  )
}
