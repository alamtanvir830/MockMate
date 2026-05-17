import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateMindMap } from '@/lib/ai/generate-mind-map'

interface RequestBody {
  questions: Array<{
    question_text: string
    correct_answer: string
    explanation_correct?: string | null
  }>
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

  // ── Check for cached mind map (non-fatal if table doesn't exist yet) ──
  try {
    const { data: existing } = await supabase
      .from('mind_maps')
      .select('mind_map_json')
      .eq('attempt_id', body.attemptId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existing?.mind_map_json) {
      return NextResponse.json({ mindMap: existing.mind_map_json, cached: true })
    }
  } catch {
    // Table may not exist yet — proceed to generation
  }

  // ── Generate ──
  try {
    const mindMap = await generateMindMap(
      body.questions,
      body.subject ?? 'General',
      body.examTitle ?? 'Exam',
      body.language,
    )

    // ── Cache result (non-fatal) ──
    try {
      await supabase.from('mind_maps').insert({
        attempt_id: body.attemptId,
        user_id: user.id,
        mind_map_json: mindMap,
      })
    } catch {
      // Non-fatal — table may not exist yet
    }

    return NextResponse.json({ mindMap })
  } catch (e) {
    console.error('[mind-map] generation failed:', e)
    return NextResponse.json({ error: 'Mind map generation failed' }, { status: 500 })
  }
}
