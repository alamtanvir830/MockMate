'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { getLatestSatContentVersion } from '@/lib/premade-exams/sat/version-constants'
import { Form7CountdownBadge } from '@/components/sat/Form7Countdown'

interface Props {
  isAdmin?: boolean
  freeWindowExpiresAt?: string | null
  showCountdown?: boolean
}

export default function SATExamTakerClient({ isAdmin, freeWindowExpiresAt, showCountdown }: Props) {
  return (
    <div>
      {showCountdown && freeWindowExpiresAt && (
        <div className="flex items-center justify-center gap-2 bg-brand-50 border-b border-brand-200 px-4 py-2.5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-brand-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span className="text-[12px] font-semibold text-brand-700">SAT Form 7 is free for 72 hours —</span>
          <Form7CountdownBadge expiresAt={freeWindowExpiresAt} />
        </div>
      )}
      <SATExamTaker form={getSatForm(7, getLatestSatContentVersion(7))} contentVersion={getLatestSatContentVersion(7)} skipPasswordGate isAdmin={isAdmin ?? false} />
    </div>
  )
}
