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
      form={getSatForm(1, getLatestSatContentVersion(1))}
      contentVersion={getLatestSatContentVersion(1)}
      skipPasswordGate
      isAdmin={isAdmin}
      allowRetake={isAdmin}
      countdownText={countdownText}
    />
  )
}
