import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'

interface QuestionResponse {
  questionId: string
  questionNumber: number
  moduleId: string
  moduleName: string
  domain: string
  skill: string
  difficulty: string
  selectedAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
}

interface SaveAttemptBody {
  localAttemptId: string
  examType: string
  formNumber: number
  examTitle: string
  totalScore: number
  rwScore: number
  mathScore: number
  rwCorrect: number
  rwTotal: number
  mathCorrect: number
  mathTotal: number
  rwM2Type: string
  mathM2Type: string
  moduleBreakdown: Record<string, unknown>
  weakSkills: { section: string; skill: string; correct: number; total: number }[]
  submittedAnswers: Record<string, string>
  completedAt: string
  responses: QuestionResponse[]
}

interface UpdateFeedbackBody {
  localAttemptId: string
  aiFeedback: Record<string, unknown>
}

// POST — save initial attempt + all question responses
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json() as SaveAttemptBody

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    // Compute attempt_number for this user + form
    const { count } = await supabase
      .from('standardized_exam_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('exam_type', body.examType)
      .eq('form_number', body.formNumber)

    const attemptNumber = (count ?? 0) + 1

    // Insert attempt row
    const { data: inserted, error: insertErr } = await supabase
      .from('standardized_exam_attempts')
      .insert({
        local_attempt_id:   body.localAttemptId,
        user_id:            user.id,
        user_name,
        user_email,
        exam_type:          body.examType,
        form_number:        body.formNumber,
        exam_title:         body.examTitle,
        attempt_number:     attemptNumber,
        total_score:        body.totalScore,
        rw_score:           body.rwScore,
        math_score:         body.mathScore,
        rw_correct:         body.rwCorrect,
        rw_total:           body.rwTotal,
        math_correct:       body.mathCorrect,
        math_total:         body.mathTotal,
        rw_m2_type:         body.rwM2Type,
        math_m2_type:       body.mathM2Type,
        module_breakdown:   body.moduleBreakdown,
        weak_skills:        body.weakSkills,
        submitted_answers:  body.submittedAnswers,
        completed_at:       body.completedAt,
      })
      .select('id')
      .single()

    if (insertErr) {
      console.error('save-attempt insert error:', insertErr)
      return NextResponse.json({ error: insertErr.message }, { status: 500 })
    }

    // Insert question-level responses
    if (body.responses.length > 0) {
      const rows = body.responses.map(r => ({
        standardized_exam_attempt_id: inserted.id,
        local_attempt_id:             body.localAttemptId,
        user_id:                      user.id,
        exam_type:                    body.examType,
        form_number:                  body.formNumber,
        module_id:                    r.moduleId,
        module_name:                  r.moduleName,
        question_id:                  r.questionId,
        question_number:              r.questionNumber,
        domain:                       r.domain,
        skill:                        r.skill,
        difficulty:                   r.difficulty,
        selected_answer:              r.selectedAnswer,
        correct_answer:               r.correctAnswer,
        is_correct:                   r.isCorrect,
      }))

      const { error: respErr } = await supabase
        .from('standardized_exam_responses')
        .insert(rows)

      if (respErr) {
        console.error('save-attempt responses error:', respErr)
        // Don't fail the whole request — attempt row is already saved
      }
    }

    return NextResponse.json({ ok: true, attemptNumber })
  } catch (err) {
    console.error('save-attempt error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// PATCH — update ai_feedback on an existing attempt
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const { localAttemptId, aiFeedback } = await req.json() as UpdateFeedbackBody

    const { error } = await supabase
      .from('standardized_exam_attempts')
      .update({ ai_feedback: aiFeedback })
      .eq('local_attempt_id', localAttemptId)
      .eq('user_id', user.id)

    if (error) {
      console.error('save-attempt patch error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('save-attempt patch error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
