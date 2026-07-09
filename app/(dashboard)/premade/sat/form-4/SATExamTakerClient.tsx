'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm4 } from '@/lib/premade-exams/sat/form-4'

export default function SATExamTakerClient() {
  return <SATExamTaker form={satForm4} skipPasswordGate />
}
