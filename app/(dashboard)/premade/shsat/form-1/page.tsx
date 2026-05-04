'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SHSATExamTaker } from '@/components/premade/SHSATExamTaker'
import { shsatForm1 } from '@/lib/premade-exams/shsat-form-1'

const SESSION_KEY = 'shsat_unlocked'

export default function SHSATForm1Page() {
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

  return <SHSATExamTaker form={shsatForm1} />
}
