'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { getLatestSatContentVersion } from '@/lib/premade-exams/sat/version-constants'

export default function SATExamTakerClient({
  isAdmin = false,
  countdownText,
}: {
  isAdmin?: boolean
  countdownText?: string
}) {
  return (
    <SATExamTaker
      form={getSatForm(2, getLatestSatContentVersion(2))}
      contentVersion={getLatestSatContentVersion(2)}
      skipPasswordGate
      isAdmin={isAdmin}
      allowRetake={isAdmin}
      countdownText={countdownText}
    />
  )
}
