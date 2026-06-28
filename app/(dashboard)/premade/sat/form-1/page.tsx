'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm1 } from '@/lib/premade-exams/sat/form-1'

export default function SATForm1Page() {
  return <SATExamTaker form={satForm1} />
}
