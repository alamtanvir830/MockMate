import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'
import { isAdminUser } from '@/lib/auth/server'

const VALID_ISSUE_CATEGORIES = [
  'wrong_answer', 'unclear_wording', 'explanation_problem',
  'typo', 'broken_display', 'formatting', 'other',
]

const VALID_CONTENT_TYPES = [
  'drill_question', 'guided_example', 'lesson', 'vocabulary',
  'capstone', 'mastery_check', 'transition_question', 'passage',
]

// POST /api/academy/content-reports — submit a content issue report
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json()
    const { contentType, contentId, contentVersion, route, issueCategory, description } = body

    if (
      typeof contentType !== 'string' || !VALID_CONTENT_TYPES.includes(contentType) ||
      typeof contentId !== 'string' || !contentId.trim() ||
      typeof issueCategory !== 'string' || !VALID_ISSUE_CATEGORIES.includes(issueCategory) ||
      typeof description !== 'string' || description.trim().length < 5
    ) {
      return NextResponse.json({ error: 'Invalid report data.' }, { status: 400 })
    }

    const { user_email } = await resolveUserIdentity(supabase, user)

    const { data, error } = await supabase
      .from('sat_rw_content_reports')
      .insert({
        user_id: user.id,
        user_email,
        content_type: contentType,
        content_id: contentId.trim(),
        content_version: typeof contentVersion === 'number' ? contentVersion : 1,
        route: typeof route === 'string' ? route.trim() : null,
        issue_category: issueCategory,
        description: description.trim().slice(0, 2000),
        status: 'open',
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('POST /api/academy/content-reports:', err)
    return NextResponse.json({ error: 'Failed to submit report.' }, { status: 500 })
  }
}

// GET /api/academy/content-reports — user gets their own reports; admin gets all
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const isAdmin = isAdminUser(user)

    const url = new URL(req.url)
    const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'))
    const limit = Math.min(50, parseInt(url.searchParams.get('limit') ?? '20'))
    const offset = (page - 1) * limit

    let query = supabase
      .from('sat_rw_content_reports')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (!isAdmin) {
      // Normal users only see their own reports (RLS also enforces this)
      query = query.eq('user_id', user.id)
    } else {
      // Admin can filter by status
      const status = url.searchParams.get('status')
      if (status) query = query.eq('status', status)
    }

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ reports: data, total: count ?? 0, isAdmin })
  } catch (err) {
    console.error('GET /api/academy/content-reports:', err)
    return NextResponse.json({ error: 'Failed to fetch reports.' }, { status: 500 })
  }
}

// PATCH /api/academy/content-reports/[id] — admin only: update status/notes
// Handled in a separate [id]/route.ts
