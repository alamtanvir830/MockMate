'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm2 } from '@/lib/premade-exams/sat/form-2'

export default function SATExamTakerClient({
  isAdmin = false,
  countdownText,
}: {
  isAdmin?: boolean
  countdownText?: string
}) {
  return (
    <SATExamTaker
      form={satForm2}
      skipPasswordGate
      isAdmin={isAdmin}
      allowRetake={isAdmin}
      countdownText={countdownText}
    />
  )
}
