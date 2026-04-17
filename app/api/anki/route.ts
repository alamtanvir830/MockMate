import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAnkiCards, type IncorrectQuestion } from '@/lib/ai/generate-anki-cards'

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: { questions: IncorrectQuestion[]; subject: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!Array.isArray(body.questions) || body.questions.length === 0) {
    return NextResponse.json({ error: 'No questions provided' }, { status: 400 })
  }

  try {
    const cards = await generateAnkiCards(body.questions, body.subject ?? 'General')
    return NextResponse.json({ cards })
  } catch (e) {
    console.error('[anki] card generation failed:', e)
    return NextResponse.json({ error: 'Card generation failed' }, { status: 500 })
  }
}
