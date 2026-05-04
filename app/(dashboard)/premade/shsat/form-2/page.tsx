'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremadeExamTaker } from '@/components/premade/PremadeExamTaker'
import { shsatForm2 } from '@/lib/premade-exams/shsat-form-2'

const SESSION_KEY = 'shsat_unlocked'

export default function SHSATForm2Page() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) !== '1') {
      router.replace('/premade/shsat')
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) return null

  return <PremadeExamTaker form={shsatForm2} />
}
