import { NextRequest, NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import {
  getDiagnosticRegistry,
  getDiagnosticV2Registry,
  DIAGNOSTIC_VERSION,
  DIAGNOSTIC_V2_VERSION,
  routeToM2Branch,
} from '@/lib/academy/diagnostic-questions'
import { DIAGNOSTIC_M1_QUESTIONS } from '@/lib/academy/diagnostic-questions-v2'
import { SKILL_DISPLAY_NAMES, ACADEMY_SKILL_SLUGS } from '@/lib/academy/skill-mapping'
import { allSkills } from '@/lib/academy'
import { hasSatPremium } from '@/lib/auth/server'

interface ResponseItem {
  questionId: string
  selectedAnswer: string
}

const M1_TOTAL = DIAGNOSTIC_M1_QUESTIONS.length

// Priority order for recommendations (foundational first)
const WRITING_PRIORITY = ['boundaries', 'form-structure-sense', 'transitions', 'rhetorical-synthesis']
const READING_PRIORITY = [
  'words-in-context', 'central-ideas-details', 'text-structure-purpose',
  'command-of-evidence', 'quantitative-evidence', 'inferences', 'cross-text-connections',
]

function computeRecommendedSkill(
  skillResults: Record<string, { correct: number; total: number; pct: number; section: string }>
): string | null {
  // Priority 1: Writing skill below 70%
  for (const slug of WRITING_PRIORITY) {
    const r = skillResults[slug]
    if (r && r.total > 0 && r.pct < 70) return slug
  }
  // Priority 2: Lowest-scoring Reading skill
  let lowestReading: { slug: string; pct: number; incorrect: number } | null = null
  for (const slug of READING_PRIORITY) {
    const r = skillResults[slug]
    if (!r || r.total === 0) continue
    const incorrect = r.total - r.correct
    if (!lowestReading || r.pct < lowestReading.pct || (r.pct === lowestReading.pct && incorrect > lowestReading.incorrect)) {
      lowestReading = { slug, pct: r.pct, incorrect }
    }
  }
  if (lowestReading) return lowestReading.slug
  // Priority 3: Any skill below 80%
  for (const slug of ACADEMY_SKILL_SLUGS) {
    const r = skillResults[slug]
    if (r && r.total > 0 && r.pct < 80) return slug
  }
  return null
}

function rankSkills(
  skillResults: Record<string, { correct: number; total: number; pct: number; section: string }>,
  order: 'asc' | 'desc'
): string[] {
  return Object.entries(skillResults)
    .filter(([, r]) => r.total > 0)
    .sort(([slugA, a], [slugB, b]) => {
      const diff = order === 'asc' ? a.pct - b.pct : b.pct - a.pct
      if (diff !== 0) return diff
      // Tiebreak 1: more incorrect answers = weaker
      const incA = a.total - a.correct
      const incB = b.total - b.correct
      if (order === 'asc' && incA !== incB) return incB - incA
      // Tiebreak 2: more total questions = more confidence
      if (a.total !== b.total) return order === 'asc' ? b.total - a.total : a.total - b.total
      // Tiebreak 3: foundational order
      const orderIdx = (s: string) => ACADEMY_SKILL_SLUGS.indexOf(s as typeof ACADEMY_SKILL_SLUGS[number])
      return order === 'asc' ? orderIdx(slugA) - orderIdx(slugB) : orderIdx(slugB) - orderIdx(slugA)
    })
    .map(([slug]) => slug)
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    if (!hasSatPremium(user)) return NextResponse.json({ error: 'SAT Premium required' }, { status: 403 })

    const rawBody = await req.json() as {
      responses: ResponseItem[]
      clientToken?: string
      diagnosticVersion?: number
      m2Branch?: string
    }

    // ── v2 adaptive path ──────────────────────────────────────────────────────
    // Only taken when the client explicitly opts in with diagnosticVersion: 2.
    // The v1 path below is untouched for older clients.
    if (rawBody.diagnosticVersion === DIAGNOSTIC_V2_VERSION) {
      return await completeV2(supabase, user, rawBody)
    }

    const body = rawBody
    const { responses, clientToken } = body

    if (!Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json({ error: 'responses array is required' }, { status: 400 })
    }

    // Idempotency: if this clientToken was already completed, return the existing result
    if (clientToken) {
      const { data: existing } = await supabase
        .from('sat_rw_diagnostic_attempts')
        .select('*')
        .eq('client_token', clientToken)
        .single()
      if (existing) return NextResponse.json(existing)
    }

    const registry = getDiagnosticRegistry()

    // Validate all question IDs belong to the current diagnostic
    const seen = new Set<string>()
    const validResponses: Array<{ questionId: string; selectedAnswer: string; meta: ReturnType<typeof registry.get> & object }> = []

    for (const r of responses) {
      if (typeof r.questionId !== 'string' || typeof r.selectedAnswer !== 'string') continue
      if (seen.has(r.questionId)) continue  // deduplicate
      const meta = registry.get(r.questionId)
      if (!meta) continue  // skip unknown questions
      seen.add(r.questionId)
      validResponses.push({ questionId: r.questionId, selectedAnswer: r.selectedAnswer, meta })
    }

    if (validResponses.length === 0) {
      return NextResponse.json({ error: 'No valid responses provided' }, { status: 400 })
    }

    // Server-side grading (never trust client isCorrect/correctAnswer)
    const skillResults: Record<string, { correct: number; total: number; pct: number; section: string; title: string }> = {}
    const domainResults: Record<string, { correct: number; total: number; pct: number; title: string }> = {}

    let correct = 0
    let incorrect = 0

    const DOMAIN_TITLES: Record<string, string> = {
      'information-and-ideas': 'Information and Ideas',
      'craft-and-structure': 'Craft and Structure',
      'expression-of-ideas': 'Expression of Ideas',
      'standard-english-conventions': 'Standard English Conventions',
    }

    for (const { questionId, selectedAnswer, meta } of validResponses) {
      const isCorrect = selectedAnswer === meta.correctAnswer
      if (isCorrect) correct++; else incorrect++

      const slug = meta.skillSlug
      const skillTitle = SKILL_DISPLAY_NAMES[slug] ?? slug
      if (!skillResults[slug]) {
        const skillMeta = allSkills.find(s => s.slug === slug)
        skillResults[slug] = { correct: 0, total: 0, pct: 0, section: skillMeta?.section ?? 'reading', title: skillTitle }
      }
      skillResults[slug].total++
      if (isCorrect) skillResults[slug].correct++

      if (meta.domainSlug) {
        if (!domainResults[meta.domainSlug]) {
          domainResults[meta.domainSlug] = { correct: 0, total: 0, pct: 0, title: DOMAIN_TITLES[meta.domainSlug] ?? meta.domainSlug }
        }
        domainResults[meta.domainSlug].total++
        if (isCorrect) domainResults[meta.domainSlug].correct++
      }

      void questionId  // referenced via registry key
    }

    // Calculate percentages
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

    // Save diagnostic summary
    const { data: summary, error: summaryError } = await supabase
      .from('sat_rw_diagnostic_attempts')
      .insert({
        user_id: user.id,
        user_email,
        user_name,
        client_token: clientToken ?? null,
        diagnostic_version: DIAGNOSTIC_VERSION,
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
        recommended_lesson_slug: recommendedSkill,
        completed_at: now,
      })
      .select('*')
      .single()

    if (summaryError) {
      // If it's a unique constraint violation on client_token, fetch the existing record
      if (summaryError.code === '23505' && clientToken) {
        const { data: existing } = await supabase
          .from('sat_rw_diagnostic_attempts')
          .select('*')
          .eq('client_token', clientToken)
          .single()
        if (existing) return NextResponse.json(existing)
      }
      console.error('diagnostic complete: summary insert error', summaryError)
      return NextResponse.json({ error: 'Failed to save diagnostic result' }, { status: 500 })
    }

    // Bulk-save individual question responses to sat_rw_academy_attempts for mastery tracking
    // Done after summary so failures here don't block the result from being returned
    const attemptRows = validResponses.map(({ questionId, selectedAnswer, meta }) => ({
      user_id: user.id,
      user_email,
      user_name,
      source_type: 'academy_diagnostic',
      source_id: 'diagnostic',
      question_id: questionId,
      skill_slug: meta.skillSlug,
      difficulty: meta.difficulty,
      selected_answer: selectedAnswer,
      correct_answer: meta.correctAnswer,
      is_correct: selectedAnswer === meta.correctAnswer,
      practice_mode: 'diagnostic',
      domain_slug: meta.domainSlug,
      content_version: DIAGNOSTIC_VERSION,
      hint_count: 0,
      timed: false,
    }))

    const { error: attemptsError } = await supabase
      .from('sat_rw_academy_attempts')
      .insert(attemptRows)

    if (attemptsError) {
      // Non-fatal: the summary is already saved; mastery data may be stale until next drill
      console.error('diagnostic complete: attempts insert error', attemptsError)
    }

    return NextResponse.json(summary)
  } catch (err) {
    console.error('diagnostic complete error', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// ── v2 adaptive completion ────────────────────────────────────────────────────

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

const DOMAIN_TITLES_V2: Record<string, string> = {
  'information-and-ideas': 'Information and Ideas',
  'craft-and-structure': 'Craft and Structure',
  'expression-of-ideas': 'Expression of Ideas',
  'standard-english-conventions': 'Standard English Conventions',
}

async function completeV2(
  supabase: SupabaseServerClient,
  user: User,
  body: { responses: ResponseItem[]; clientToken?: string; m2Branch?: string },
) {
  const { responses, clientToken, m2Branch } = body

  if (!Array.isArray(responses) || responses.length === 0) {
    return NextResponse.json({ error: 'responses array is required' }, { status: 400 })
  }
  if (m2Branch !== 'easy' && m2Branch !== 'hard') {
    return NextResponse.json({ error: 'm2Branch must be "easy" or "hard"' }, { status: 400 })
  }

  // Idempotency: if this clientToken was already completed, return the existing result
  if (clientToken) {
    const { data: existing } = await supabase
      .from('sat_rw_diagnostic_attempts')
      .select('*')
      .eq('client_token', clientToken)
      .single()
    if (existing) return NextResponse.json(existing)
  }

  const registry = getDiagnosticV2Registry()

  // Deduplicate + validate every response against the v2 registry.
  const seen = new Set<string>()
  const validResponses: Array<{ questionId: string; selectedAnswer: string; meta: NonNullable<ReturnType<typeof registry.get>> }> = []

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

  // Separate Module 1 from Module 2, and reject any M2 response from the wrong branch.
  const m1Items = validResponses.filter(v => v.questionId.startsWith('diag2-m1-'))
  const m2Items = validResponses.filter(v => v.questionId.startsWith('diag2-m2'))
  const expectedM2Prefix = m2Branch === 'hard' ? 'diag2-m2h-' : 'diag2-m2e-'

  for (const item of m2Items) {
    if (!item.questionId.startsWith(expectedM2Prefix)) {
      return NextResponse.json({ error: 'Module 2 responses do not match the submitted branch' }, { status: 400 })
    }
  }

  // Server re-derives the branch from the Module 1 score and rejects a mismatch.
  const m1Correct = m1Items.reduce((n, v) => n + (v.selectedAnswer === v.meta.correctAnswer ? 1 : 0), 0)
  const derivedBranch = routeToM2Branch(m1Correct, M1_TOTAL)
  if (derivedBranch !== m2Branch) {
    return NextResponse.json({ error: 'Submitted branch does not match Module 1 performance' }, { status: 400 })
  }

  // Server-side grading across all responses (never trust the client).
  const skillResults: Record<string, { correct: number; total: number; pct: number; section: string; title: string }> = {}
  const domainResults: Record<string, { correct: number; total: number; pct: number; title: string }> = {}

  let correct = 0
  let incorrect = 0

  for (const { selectedAnswer, meta } of validResponses) {
    const isCorrect = selectedAnswer === meta.correctAnswer
    if (isCorrect) correct++; else incorrect++

    const slug = meta.skillSlug
    const skillTitle = SKILL_DISPLAY_NAMES[slug] ?? slug
    if (!skillResults[slug]) {
      const skillMeta = allSkills.find(s => s.slug === slug)
      skillResults[slug] = { correct: 0, total: 0, pct: 0, section: skillMeta?.section ?? 'reading', title: skillTitle }
    }
    skillResults[slug].total++
    if (isCorrect) skillResults[slug].correct++

    if (meta.domainSlug) {
      if (!domainResults[meta.domainSlug]) {
        domainResults[meta.domainSlug] = { correct: 0, total: 0, pct: 0, title: DOMAIN_TITLES_V2[meta.domainSlug] ?? meta.domainSlug }
      }
      domainResults[meta.domainSlug].total++
      if (isCorrect) domainResults[meta.domainSlug].correct++
    }
  }

  for (const r of Object.values(skillResults)) r.pct = Math.round((r.correct / r.total) * 100)
  for (const r of Object.values(domainResults)) r.pct = Math.round((r.correct / r.total) * 100)

  const totalAnswered = validResponses.length
  const totalQuestions = M1_TOTAL + m2Items.length
  const omitted = Math.max(0, totalQuestions - totalAnswered)
  const accuracy = Math.round((correct / totalQuestions) * 100 * 100) / 100

  const weakestSlugs = rankSkills(skillResults, 'asc').slice(0, 5)
  const strongestSlugs = rankSkills(skillResults, 'desc').slice(0, 3)
  const recommendedSkill = computeRecommendedSkill(skillResults)

  const { user_name, user_email } = await resolveUserIdentity(supabase, user)
  const now = new Date().toISOString()

  const { data: summary, error: summaryError } = await supabase
    .from('sat_rw_diagnostic_attempts')
    .insert({
      user_id: user.id,
      user_email,
      user_name,
      client_token: clientToken ?? null,
      diagnostic_version: DIAGNOSTIC_V2_VERSION,
      m2_branch: m2Branch,
      m1_correct: m1Correct,
      m1_total: M1_TOTAL,
      total_questions: totalQuestions,
      answered_questions: totalAnswered,
      correct_count: correct,
      incorrect_count: incorrect,
      omitted_count: omitted,
      accuracy_percentage: accuracy,
      domain_results: domainResults,
      skill_results: skillResults,
      strongest_skill_slugs: strongestSlugs,
      weakest_skill_slugs: weakestSlugs,
      recommended_skill_slug: recommendedSkill,
      recommended_lesson_slug: recommendedSkill,
      completed_at: now,
    })
    .select('*')
    .single()

  if (summaryError) {
    if (summaryError.code === '23505' && clientToken) {
      const { data: existing } = await supabase
        .from('sat_rw_diagnostic_attempts')
        .select('*')
        .eq('client_token', clientToken)
        .single()
      if (existing) return NextResponse.json(existing)
    }
    console.error('diagnostic complete v2: summary insert error', summaryError)
    return NextResponse.json({ error: 'Failed to save diagnostic result' }, { status: 500 })
  }

  const attemptRows = validResponses.map(({ questionId, selectedAnswer, meta }) => ({
    user_id: user.id,
    user_email,
    user_name,
    source_type: 'academy_diagnostic',
    source_id: 'diagnostic',
    question_id: questionId,
    skill_slug: meta.skillSlug,
    difficulty: meta.difficulty,
    selected_answer: selectedAnswer,
    correct_answer: meta.correctAnswer,
    is_correct: selectedAnswer === meta.correctAnswer,
    practice_mode: 'diagnostic',
    domain_slug: meta.domainSlug,
    content_version: DIAGNOSTIC_V2_VERSION,
    hint_count: 0,
    timed: false,
  }))

  const { error: attemptsError } = await supabase
    .from('sat_rw_academy_attempts')
    .insert(attemptRows)

  if (attemptsError) {
    console.error('diagnostic complete v2: attempts insert error', attemptsError)
  }

  return NextResponse.json(summary)
}
