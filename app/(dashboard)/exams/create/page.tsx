import type { Metadata } from 'next'
import { CreateExamForm } from '@/components/exam/create-exam-form'

export const metadata: Metadata = { title: 'Create Exam' }

export default function CreateExamPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Create a practice exam</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tell us about your exam and we&apos;ll generate a personalized practice
          paper using AI.
        </p>
      </div>
      <CreateExamForm />
    </div>
  )
}
