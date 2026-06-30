'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm2 } from '@/lib/premade-exams/sat/form-2'

export default function SATForm2Page() {
  return <SATExamTaker form={satForm2} />
}
