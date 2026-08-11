import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface InProgressBody {
  formNumber: number
  localAttemptId: string
  answers: Record<string, string>
  bookmarks: string[]
  currentSectionIdx: number | null
  currentQuestionIdx: number | null
  /** ISO-8601 deadline for the currently active section */
  sectionDeadlineAt: string | null
  /** Map of sectionIdx → ISO-8601 deadline (set once per section entry) */
  sectionDeadlines: Record<string, string>
  contentVersion: string
}

function isValidFormNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 5
}

// GET ?formNumber=N
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const formNumber = parseInt(req.nextUrl.searchParams.get('formNumber') ?? '', 10)
  if (!isValidFormNumber(formNumber)) {
    return NextResponse.json({ error: 'Invalid formNumber' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('mcat_in_progress_attempts')
    .select('local_attempt_id, form_number, answers, bookmarks, current_section_idx, current_question_idx, section_deadline_at, section_deadlines, content_version, started_at, last_saved_at')
    .eq('user_id', user.id)
    .eq('form_number', formNumber)
    .maybeSingle()

  if (error) {
    // Table may not exist yet (migration not applied) — return null gracefully
    if (error.code === '42P01') return NextResponse.json({ attempt: null })
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!data) return NextResponse.json({ attempt: null })

  return NextResponse.json({
    attempt: {
      localAttemptId: data.local_attempt_id,
      answers: data.answers as Record<string, string>,
      bookmarks: data.bookmarks as string[],
      currentSectionIdx: data.current_section_idx as number | null,
      currentQuestionIdx: data.current_question_idx as number | null,
      sectionDeadlineAt: data.section_deadline_at as string | null,
      sectionDeadlines: (data.section_deadlines ?? {}) as Record<string, string>,
      contentVersion: data.content_version as string,
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

  const { error } = await supabase
    .from('mcat_in_progress_attempts')
    .upsert(
      {
        user_id: user.id,
        form_number: body.formNumber,
        local_attempt_id: body.localAttemptId,
        answers: body.answers,
        bookmarks: body.bookmarks,
        current_section_idx: body.currentSectionIdx,
        current_question_idx: body.currentQuestionIdx,
        section_deadline_at: body.sectionDeadlineAt,
        section_deadlines: body.sectionDeadlines,
        content_version: body.contentVersion,
        last_saved_at: new Date().toISOString(),
      },
      { onConflict: 'user_id, form_number' },
    )

  if (error) {
    // Table may not exist yet — degrade gracefully
    if (error.code === '42P01') return NextResponse.json({ ok: true, degraded: true })
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// DELETE ?formNumber=N — remove in-progress row on exam completion
export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const formNumber = parseInt(req.nextUrl.searchParams.get('formNumber') ?? '', 10)
  if (!isValidFormNumber(formNumber)) {
    return NextResponse.json({ error: 'Invalid formNumber' }, { status: 400 })
  }

  const { error } = await supabase
    .from('mcat_in_progress_attempts')
    .delete()
    .eq('user_id', user.id)
    .eq('form_number', formNumber)

  if (error) {
    if (error.code === '42P01') return NextResponse.json({ ok: true, degraded: true })
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
