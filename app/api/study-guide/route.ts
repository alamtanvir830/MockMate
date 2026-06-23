import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateStudyGuide, type MissedQuestion } from '@/lib/ai/generate-study-guide'

interface RequestBody {
  questions: MissedQuestion[]
  subject: string
  examTitle: string
  attemptId: string
  language?: string
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: RequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.attemptId) {
    return NextResponse.json({ error: 'attemptId is required' }, { status: 400 })
  }

  if (!Array.isArray(body.questions) || body.questions.length === 0) {
    return NextResponse.json({ error: 'No questions provided' }, { status: 400 })
  }

  // ── Check for cached study guide (non-fatal if table doesn't exist yet) ──
  try {
    const { data: existing } = await supabase
      .from('study_guides')
      .select('guide_json')
      .eq('attempt_id', body.attemptId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existing?.guide_json) {
      return NextResponse.json({ guide: existing.guide_json, cached: true })
    }
  } catch {
    // Table may not exist yet — proceed to generation
  }

  // ── Generate ──
  try {
    const guide = await generateStudyGuide(
      body.questions,
      body.subject ?? 'General',
      body.examTitle ?? 'Exam',
      body.language,
    )

    // ── Cache result (non-fatal) ──
    try {
      await supabase.from('study_guides').insert({
        attempt_id: body.attemptId,
        user_id: user.id,
        guide_json: guide,
      })
    } catch {
      // Non-fatal — table may not exist yet
    }

    return NextResponse.json({ guide })
  } catch (e) {
    console.error('[study-guide] generation failed:', e)
    return NextResponse.json({ error: 'Study guide generation failed' }, { status: 500 })
  }
}
