import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

interface FeedbackRow {
  user_email: string | null
  user_name: string | null
  form_number: number | null
  local_attempt_id: string | null
  created_at: string | null
  rw_module_1_feedback: string | null
  rw_module_2_feedback: string | null
  math_module_1_feedback: string | null
  math_module_2_feedback: string | null
  rw_module_2_path: string | null
  math_module_2_path: string | null
  rw_module_1_char_count: number | null
  rw_module_2_char_count: number | null
  math_module_1_char_count: number | null
  math_module_2_char_count: number | null
  interested_in_sat_premium: boolean | null
  sat_premium_interest_answer: string | null
}

interface AttemptScores {
  local_attempt_id: string
  total_score: number | null
  rw_score: number | null
  math_score: number | null
}

// GET /api/admin/sat-module-feedback
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
export async function GET(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data: rawFeedback, error } = await supabase
    .from('sat_exam_module_feedback')
    .select(
      'user_email, user_name, form_number, local_attempt_id, created_at, ' +
      'rw_module_1_feedback, rw_module_2_feedback, math_module_1_feedback, math_module_2_feedback, ' +
      'rw_module_2_path, math_module_2_path, ' +
      'rw_module_1_char_count, rw_module_2_char_count, math_module_1_char_count, math_module_2_char_count, ' +
      'interested_in_sat_premium, sat_premium_interest_answer'
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('admin/sat-module-feedback error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const feedback = (rawFeedback ?? []) as unknown as FeedbackRow[]

  // Join scores from standardized_exam_attempts on local_attempt_id
  const attemptIds = feedback
    .map(r => r.local_attempt_id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)

  let scoresMap: Record<string, Omit<AttemptScores, 'local_attempt_id'>> = {}

  if (attemptIds.length > 0) {
    const { data: rawAttempts } = await supabase
      .from('standardized_exam_attempts')
      .select('local_attempt_id, total_score, rw_score, math_score')
      .in('local_attempt_id', attemptIds)

    const attempts = (rawAttempts ?? []) as AttemptScores[]
    scoresMap = Object.fromEntries(
      attempts.map(a => [a.local_attempt_id, { total_score: a.total_score, rw_score: a.rw_score, math_score: a.math_score }])
    )
  }

  const data = feedback.map(r => ({
    ...r,
    total_score: r.local_attempt_id ? (scoresMap[r.local_attempt_id]?.total_score ?? null) : null,
    rw_score:    r.local_attempt_id ? (scoresMap[r.local_attempt_id]?.rw_score    ?? null) : null,
    math_score:  r.local_attempt_id ? (scoresMap[r.local_attempt_id]?.math_score  ?? null) : null,
  }))

  return NextResponse.json({ data, total: data.length })
}
