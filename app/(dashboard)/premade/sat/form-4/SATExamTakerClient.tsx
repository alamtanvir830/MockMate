'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { getLatestSatContentVersion } from '@/lib/premade-exams/sat/version-constants'
import { Form4CountdownBadge } from '@/components/sat/Form4Countdown'

interface Props {
  isAdmin?: boolean
  freeWindowExpiresAt?: string | null
  showCountdown?: boolean
}

export default function SATExamTakerClient({ isAdmin, freeWindowExpiresAt, showCountdown }: Props) {
  return (
    <div>
      {showCountdown && freeWindowExpiresAt && (
        <div className="flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-amber-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span className="text-[12px] font-semibold text-amber-700">SAT Form 4 is free for 72 hours —</span>
          <Form4CountdownBadge expiresAt={freeWindowExpiresAt} />
        </div>
      )}
      <SATExamTaker form={getSatForm(4, getLatestSatContentVersion(4))} contentVersion={getLatestSatContentVersion(4)} skipPasswordGate isAdmin={isAdmin ?? false} />
    </div>
  )
}
