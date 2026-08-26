'use client'

import { Source_Serif_4 } from 'next/font/google'
import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { getLatestSatContentVersion } from '@/lib/premade-exams/sat/version-constants'
import { RollingPromoCountdownBadge } from '@/components/sat/RollingPromoCountdown'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-serif-4',
  display: 'swap',
})

interface Props {
  freeWindowExpiresAt?: string | null
  showCountdown?: boolean
  formNumber?: number
}

export default function SATExamTakerClient({ freeWindowExpiresAt, showCountdown, formNumber = 8 }: Props) {
  return (
    <div className={sourceSerif4.variable}>
      {showCountdown && freeWindowExpiresAt && (
        <div className="flex items-center justify-center gap-2 bg-brand-50 border-b border-brand-200 px-4 py-2.5">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-brand-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span className="text-[12px] font-semibold text-brand-700">SAT Form {formNumber} is free for 24 hours —</span>
          <RollingPromoCountdownBadge expiresAt={freeWindowExpiresAt} />
        </div>
      )}
      <SATExamTaker
        form={getSatForm(8, getLatestSatContentVersion(8))}
        contentVersion={getLatestSatContentVersion(8)}
        skipPasswordGate
        variant="paper"
      />
    </div>
  )
}
