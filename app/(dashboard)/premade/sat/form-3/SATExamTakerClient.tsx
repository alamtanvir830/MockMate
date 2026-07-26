'use client'

import SATExamTaker from '@/components/premade/SATExamTaker'
import { satForm3 } from '@/lib/premade-exams/sat/form-3'

interface Props {
  isAdmin?: boolean
}

export default function SATExamTakerClient({ isAdmin }: Props) {
  return (
    <SATExamTaker form={satForm3} skipPasswordGate isAdmin={isAdmin ?? false} />
  )
}
