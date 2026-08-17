'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { getLatestSatContentVersion } from '@/lib/premade-exams/sat/version-constants'

export default function SATExamTakerClient() {
  return <SATExamTaker form={getSatForm(9, getLatestSatContentVersion(9))} contentVersion={getLatestSatContentVersion(9)} skipPasswordGate />
}
