'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm1 } from '@/lib/premade-exams/sat/form-1'

export default function SATExamTakerClient({
  isAdmin = false,
  countdownText,
}: {
  isAdmin?: boolean
  countdownText?: string
}) {
  return (
    <SATExamTaker
      form={satForm1}
      skipPasswordGate
      isAdmin={isAdmin}
      allowRetake={isAdmin}
      countdownText={countdownText}
    />
  )
}
