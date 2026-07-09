'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm5 } from '@/lib/premade-exams/sat/form-5'

export default function SATExamTakerClient() {
  return <SATExamTaker form={satForm5} skipPasswordGate />
}
