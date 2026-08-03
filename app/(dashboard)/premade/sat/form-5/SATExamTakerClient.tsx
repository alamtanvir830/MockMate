'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { getSatForm } from '@/lib/premade-exams/sat/sat-form-resolver'
import { CURRENT_SAT_CONTENT_VERSION } from '@/lib/premade-exams/sat/version-constants'

export default function SATExamTakerClient() {
  return <SATExamTaker form={getSatForm(5, CURRENT_SAT_CONTENT_VERSION)} contentVersion={CURRENT_SAT_CONTENT_VERSION} skipPasswordGate />
}
