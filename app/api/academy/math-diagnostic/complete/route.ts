import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import {
  getMathDiagnosticRegistry,
  MATH_DIAGNOSTIC_VERSION,
  MATH_DOMAIN_TITLES,
} from '@/lib/academy/math/diagnostic-questions'
import { MATH_SKILL_DISPLAY_NAMES } from '@/lib/academy/math/skill-mapping'
import { hasSatPremium } from '@/lib/auth/server'

interface ResponseItem {
  questionId: string
  selectedAnswer: string
}

// Priority order for skill recommendations (foundational first within each domain)
const SKILL_PRIORITY_ORDER = [
  // Algebra
  'linear-equations', 'linear-equations-two-variables', 'linear-functions',
  'systems-of-equations', 'linear-inequalities',
  // Advanced Math
  'equivalent-expressions', 'quadratic-equations', 'exponential-functions',
  'polynomial-expressions', 'radical-rational-equations', 'nonlinear-equations-systems',
  // PSDA
  'ratios-rates-units', 'percentages', 'one-variable-data',
  'two-variable-data', 'probability', 'statistical-claims',
  // Geometry
  'area-volume', 'lines-angles-triangles', 'right-triangles-trig', 'circles',
] as const

function computeRecommendedSkill(
  skillResults: Record<string, { correct: number; total: number; pct: number }>,
): string | null {
  // Lowest-scoring skill in priority order
  let lowest: { slug: string; pct: number } | null = null
  for (const slug of SKILL_PRIORITY_ORDER) {
    const r = skillResults[slug]
    if (!r || r.total === 0) continue
    if (!lowest || r.pct < lowest.pct) {
      lowest = { slug, pct: r.pct }
    }
  }
  if (lowest) return lowest.slug
  // Fallback: any skill below 80%
  for (const slug of SKILL_PRIORITY_ORDER) {
    const r = skillResults[slug]
    if (r && r.total > 0 && r.pct < 80) return slug
  }
  return null
}

function rankSkills(
  skillResults: Record<string, { correct: number; total: number; pct: number }>,
  order: 'asc' | 'desc',
): string[] {
  return Object.entries(skillResults)
    .filter(([, r]) => r.total > 0)
    .sort(([slugA, a], [slugB, b]) => {
      const diff = order === 'asc' ? a.pct - b.pct : b.pct - a.pct
      if (diff !== 0) return diff
      // Tiebreak: priority order
      const pi = (s: string) => SKILL_PRIORITY_ORDER.indexOf(s as typeof SKILL_PRIORITY_ORDER[number])
      return order === 'asc' ? pi(slugA) - pi(slugB) : pi(slugB) - pi(slugA)
    })
    .map(([slug]) => slug)
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const body = await req.json() as { responses: ResponseItem[]; clientToken?: string }
    const { responses, clientToken } = body

    if (!Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: 'responses array is required' }, { status: 400 })
    }

    // Idempotency: if this clientToken was already completed, return existing result
    if (clientToken) {
      const { data: existing } = await supabase
        .from('sat_math_diagnostic_attempts')
        .select('*')
        .eq('client_token', clientToken)
        .single()
      if (existing) return NextResponse.json(existing)
    }

    const registry = getMathDiagnosticRegistry()

    const seen = new Set<string>()
    const validResponses: Array<{
      questionId: string
      selectedAnswer: string
      meta: NonNullable<ReturnType<typeof registry.get>>
    }> = []

    for (const r of responses) {
      if (typeof r.questionId !== 'string' || typeof r.selectedAnswer !== 'string') continue
      if (seen.has(r.questionId)) continue
      const meta = registry.get(r.questionId)
      if (!meta) continue
      seen.add(r.questionId)
      validResponses.push({ questionId: r.questionId, selectedAnswer: r.selectedAnswer, meta })
    }

    if (validResponses.length === 0) {
      return NextResponse.json({ error: 'No valid responses provided' }, { status: 400 })
    }

    // Server-side grading — never trust client
    const skillResults: Record<string, { correct: number; total: number; pct: number; title: string; domain: string }> = {}
    const domainResults: Record<string, { correct: number; total: number; pct: number; title: string }> = {}

    let correct = 0
    let incorrect = 0

    for (const { selectedAnswer, meta } of validResponses) {
      const isCorrect = selectedAnswer === meta.correctAnswer
      if (isCorrect) correct++; else incorrect++

      const { skillSlug, domainSlug } = meta
      const skillTitle = MATH_SKILL_DISPLAY_NAMES[skillSlug] ?? skillSlug

      if (!skillResults[skillSlug]) {
        skillResults[skillSlug] = { correct: 0, total: 0, pct: 0, title: skillTitle, domain: domainSlug }
      }
      skillResults[skillSlug].total++
      if (isCorrect) skillResults[skillSlug].correct++

      if (!domainResults[domainSlug]) {
        domainResults[domainSlug] = { correct: 0, total: 0, pct: 0, title: MATH_DOMAIN_TITLES[domainSlug] ?? domainSlug }
      }
      domainResults[domainSlug].total++
      if (isCorrect) domainResults[domainSlug].correct++
    }

    for (const r of Object.values(skillResults)) r.pct = Math.round((r.correct / r.total) * 100)
    for (const r of Object.values(domainResults)) r.pct = Math.round((r.correct / r.total) * 100)

    const totalAnswered = validResponses.length
    const omitted = registry.size - totalAnswered
    const accuracy = Math.round((correct / registry.size) * 100 * 100) / 100

    const weakestSlugs = rankSkills(skillResults, 'asc').slice(0, 5)
    const strongestSlugs = rankSkills(skillResults, 'desc').slice(0, 3)
    const recommendedSkill = computeRecommendedSkill(skillResults)

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)
    const now = new Date().toISOString()

    const { data: summary, error: summaryError } = await supabase
      .from('sat_math_diagnostic_attempts')
      .insert({
        user_id: user.id,
        user_email,
        user_name,
        client_token: clientToken ?? null,
        diagnostic_version: MATH_DIAGNOSTIC_VERSION,
        total_questions: registry.size,
        answered_questions: totalAnswered,
        correct_count: correct,
        incorrect_count: incorrect,
        omitted_count: Math.max(0, omitted),
        accuracy_percentage: accuracy,
        domain_results: domainResults,
        skill_results: skillResults,
        strongest_skill_slugs: strongestSlugs,
        weakest_skill_slugs: weakestSlugs,
        recommended_skill_slug: recommendedSkill,
        completed_at: now,
      })
      .select('*')
      .single()

    if (summaryError) {
      if (summaryError.code === '23505' && clientToken) {
        const { data: existing } = await supabase
          .from('sat_math_diagnostic_attempts')
          .select('*')
          .eq('client_token', clientToken)
          .single()
        if (existing) return NextResponse.json(existing)
      }
      console.error('math-diagnostic complete: summary insert error', summaryError)
      return NextResponse.json({ error: 'Failed to save diagnostic result' }, { status: 500 })
    }

    // Bulk-save individual responses to sat_math_academy_attempts for mastery tracking
    const attemptRows = validResponses.map(({ questionId, selectedAnswer, meta }) => ({
      user_id: user.id,
      question_id: questionId,
      skill_slug: meta.skillSlug,
      correct: selectedAnswer === meta.correctAnswer,
      practice_mode: 'skill_drill',
    }))

    const { error: attemptsError } = await supabase
      .from('sat_math_academy_attempts')
      .insert(attemptRows)

    if (attemptsError) {
      console.error('math-diagnostic complete: attempts insert error', attemptsError)
    }

    return NextResponse.json(summary)
  } catch (err) {
    console.error('math-diagnostic complete error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
