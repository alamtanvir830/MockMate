'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm5 } from '@/lib/premade-exams/sat/form-5'
import { loadAttempt, type PremadeAttempt } from '@/lib/premade-exams/sat/attempt-store'
import { useEntitlements } from '@/hooks/use-entitlements'

export default function SATForm5ResultsPage() {
  const params = useParams()
  const attemptId = typeof params.attemptId === 'string' ? params.attemptId : ''
  const [attempt, setAttempt] = useState<PremadeAttempt | null | 'loading'>('loading')
  const { satUpgradeUnlocked } = useEntitlements()

  useEffect(() => {
    setAttempt(loadAttempt(attemptId))
  }, [attemptId])

  if (attempt === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <svg className="animate-spin h-4 w-4 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading results…
        </div>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center gap-4">
        <p className="text-slate-600 font-medium">Attempt not found.</p>
        <p className="text-sm text-slate-400">This result may have been cleared from your browser storage.</p>
        <Link
          href="/exams"
          className="text-sm font-medium text-[#1d4ed8] hover:underline"
        >
          ← Back to Exam History
        </Link>
      </div>
    )
  }

  return <SATExamTaker form={satForm5} initialAttempt={attempt} satUpgradeUnlocked={satUpgradeUnlocked} />
}
