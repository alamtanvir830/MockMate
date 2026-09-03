import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDiagnosticV2Registry, getDiagnosticV3Registry } from '@/lib/academy/diagnostic-questions'
import {
  routeToM2Branch,
  DIAGNOSTIC_M1_QUESTIONS,
  DIAGNOSTIC_V2_VERSION,
} from '@/lib/academy/diagnostic-questions-v2'
import {
  routeToM2V3Branch,
  DIAGNOSTIC_V3_M1_QUESTIONS,
  DIAGNOSTIC_V3_VERSION,
} from '@/lib/academy/diagnostic-questions-v3'
import { hasSatPremium } from '@/lib/auth/server'
import { getFreshAuthUser } from '@/lib/entitlements'

interface M1ResponseItem {
  questionId: string
  selectedAnswer: string
}

const M1_V2_TOTAL = DIAGNOSTIC_M1_QUESTIONS.length
const M1_V3_TOTAL = DIAGNOSTIC_V3_M1_QUESTIONS.length

// Scores a student's Module 1 responses server-side and returns the branch they
// should take for Module 2. Does NOT persist anything; the final /complete endpoint
// saves the full attempt.
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(await getFreshAuthUser(user))) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as { m1Responses?: M1ResponseItem[]; diagnosticVersion?: number }
    const { m1Responses, diagnosticVersion } = body

    if (!Array.isArray(m1Responses) || m1Responses.length === 0) {
      return NextResponse.json({ error: 'm1Responses array is required' }, { status: 400 })
    }

    const isV3 = diagnosticVersion === DIAGNOSTIC_V3_VERSION
    const expectedPrefix = isV3 ? 'diag3-m1-' : 'diag2-m1-'
    const registry = isV3 ? getDiagnosticV3Registry() : getDiagnosticV2Registry()
    const m1Total = isV3 ? M1_V3_TOTAL : M1_V2_TOTAL

    const seen = new Set<string>()
    let m1Correct = 0

    for (const r of m1Responses) {
      if (typeof r.questionId !== 'string' || typeof r.selectedAnswer !== 'string') continue
      if (!r.questionId.startsWith(expectedPrefix)) {
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

    if (seen.size === 0) {
      return NextResponse.json({ error: 'No valid Module 1 responses provided' }, { status: 400 })
    }

    const branch = isV3
      ? routeToM2V3Branch(m1Correct, m1Total)
      : routeToM2Branch(m1Correct, m1Total)

    return NextResponse.json({ branch, m1Correct, m1Total })
  } catch (err) {
    console.error('diagnostic route-m1 error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
