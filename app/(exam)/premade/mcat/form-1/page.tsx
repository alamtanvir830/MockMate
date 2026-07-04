'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MCATExamTaker } from '@/components/premade/MCATExamTaker'
import { mcatForm1 } from '@/lib/premade-exams/mcat/form-1'

const SESSION_KEY = 'mcat_unlocked'

export default function MCATForm1Page() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) !== '1') {
      router.replace('/premade/mcat')
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) return null

  return <MCATExamTaker form={mcatForm1} />
}
