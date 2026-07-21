import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface InProgressBody {
  formNumber: number
  localAttemptId: string
  answers: Record<string, string>
  bookmarks: string[]
  strikeouts: Record<string, string[]>
  rwM2Type: 'easy' | 'hard'
  mathM2Type: 'easy' | 'hard'
  currentPhaseTag: string
  currentSection: string | null
  currentModule: string | null
  currentQuestionIdx: number | null
  secsLeft: number | null
  timerRunning: boolean
}

function isValidFormNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 5
}

// GET ?formNumber=N — returns in-progress row for the authenticated user
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const formNumber = parseInt(req.nextUrl.searchParams.get('formNumber') ?? '', 10)
  if (!isValidFormNumber(formNumber)) {
    return NextResponse.json({ error: 'Invalid formNumber' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('sat_in_progress_attempts')
    .select('local_attempt_id, form_number, answers, bookmarks, strikeouts, rw_m2_type, math_m2_type, current_phase_tag, current_section, current_module, current_question_idx, module_deadline_at, started_at, last_saved_at')
    .eq('user_id', user.id)
    .eq('form_number', formNumber)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ attempt: null })
  }

  return NextResponse.json({
    attempt: {
      localAttemptId: data.local_attempt_id,
      answers: data.answers as Record<string, string>,
      bookmarks: data.bookmarks as string[],
      strikeouts: data.strikeouts as Record<string, string[]>,
      rwM2Type: (data.rw_m2_type ?? 'easy') as 'easy' | 'hard',
      mathM2Type: (data.math_m2_type ?? 'easy') as 'easy' | 'hard',
      currentPhaseTag: data.current_phase_tag ?? 'rw_directions',
      currentSection: data.current_section as string | null,
      currentModule: data.current_module as string | null,
      currentQuestionIdx: data.current_question_idx as number | null,
      moduleDeadlineAt: data.module_deadline_at as string | null,
      startedAt: data.started_at as string,
    },
  })
}

// POST — upsert in-progress state
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  let body: InProgressBody
  try {
    body = await req.json() as InProgressBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!isValidFormNumber(body.formNumber)) {
    return NextResponse.json({ error: 'Invalid formNumber' }, { status: 400 })
  }

  if (!body.localAttemptId || typeof body.localAttemptId !== 'string' || body.localAttemptId.length > 100) {
    return NextResponse.json({ error: 'Invalid localAttemptId' }, { status: 400 })
  }

  // Resolve identity server-side — never trust client-supplied name/email.
  // profiles.full_name is authoritative; fall back to user_metadata, then null.
  const user_email = user.email ?? null
  let user_name: string | null = null
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    const raw = (profile as { full_name?: string | null } | null)?.full_name?.trim()
    user_name = raw || null
  } catch { /* ignore — table or row may not exist */ }
  if (!user_name) {
    const meta = user.user_metadata as Record<string, string> | null
    user_name = meta?.full_name?.trim() || meta?.name?.trim() || null
  }

  // Compute module_deadline_at from secsLeft
  let moduleDeadlineAt: string | null = null
  if (body.timerRunning && typeof body.secsLeft === 'number' && body.secsLeft > 0) {
    const deadlineMs = Date.now() + body.secsLeft * 1000
    moduleDeadlineAt = new Date(deadlineMs).toISOString()
  }

  const { error } = await supabase
    .from('sat_in_progress_attempts')
    .upsert(
      {
        user_id: user.id,
        form_number: body.formNumber,
        local_attempt_id: body.localAttemptId,
        user_name,
        user_email,
        answers: body.answers,
        bookmarks: body.bookmarks,
        strikeouts: body.strikeouts,
        rw_m2_type: body.rwM2Type,
        math_m2_type: body.mathM2Type,
        current_phase_tag: body.currentPhaseTag,
        current_section: body.currentSection,
        current_module: body.currentModule,
        current_question_idx: body.currentQuestionIdx,
        module_deadline_at: moduleDeadlineAt,
        last_saved_at: new Date().toISOString(),
      },
      { onConflict: 'user_id, form_number' },
    )

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// DELETE ?formNumber=N — delete in-progress row when exam is completed
export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const formNumber = parseInt(req.nextUrl.searchParams.get('formNumber') ?? '', 10)
  if (!isValidFormNumber(formNumber)) {
    return NextResponse.json({ error: 'Invalid formNumber' }, { status: 400 })
  }

  const { error } = await supabase
    .from('sat_in_progress_attempts')
    .delete()
    .eq('user_id', user.id)
    .eq('form_number', formNumber)

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
