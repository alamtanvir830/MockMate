'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm3 } from '@/lib/premade-exams/sat/form-3'

export default function SATExamTakerClient() {
  return <SATExamTaker form={satForm3} skipPasswordGate />
}
