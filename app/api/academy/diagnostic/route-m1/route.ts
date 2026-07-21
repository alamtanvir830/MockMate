import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDiagnosticV2Registry } from '@/lib/academy/diagnostic-questions'
import { routeToM2Branch, DIAGNOSTIC_M1_QUESTIONS } from '@/lib/academy/diagnostic-questions-v2'
import { hasSatPremium } from '@/lib/auth/server'

interface M1ResponseItem {
  questionId: string
  selectedAnswer: string
}

const M1_TOTAL = DIAGNOSTIC_M1_QUESTIONS.length

// Scores a student's Module 1 responses server-side and returns the branch they
// should take for Module 2. This endpoint does NOT persist anything; the final
// /complete endpoint saves the full attempt.
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as { m1Responses?: M1ResponseItem[] }
    const { m1Responses } = body

    if (!Array.isArray(m1Responses) || m1Responses.length === 0) {
      return NextResponse.json({ error: 'm1Responses array is required' }, { status: 400 })
    }

    const registry = getDiagnosticV2Registry()
    const seen = new Set<string>()
    let m1Correct = 0

    for (const r of m1Responses) {
      if (typeof r.questionId !== 'string' || typeof r.selectedAnswer !== 'string') continue
      // Only Module 1 questions are valid here.
      if (!r.questionId.startsWith('diag2-m1-')) {
        return NextResponse.json({ error: 'All responses must be Module 1 questions' }, { status: 400 })
      }
      if (seen.has(r.questionId)) continue  // deduplicate
      const meta = registry.get(r.questionId)
      if (!meta) {
        return NextResponse.json({ error: `Unknown question: ${r.questionId}` }, { status: 400 })
      }
      seen.add(r.questionId)
      if (r.selectedAnswer === meta.correctAnswer) m1Correct++
    }

    const m1Answered = seen.size
    if (m1Answered === 0) {
      return NextResponse.json({ error: 'No valid Module 1 responses provided' }, { status: 400 })
    }

    const branch = routeToM2Branch(m1Correct, M1_TOTAL)

    return NextResponse.json({ branch, m1Correct, m1Total: M1_TOTAL })
  } catch (err) {
    console.error('diagnostic route-m1 error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
