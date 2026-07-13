import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET /api/admin/qbank-practice-sets
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
export async function GET(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('question_bank_practice_sets')
    .select(
      'user_name, user_email, id, user_id, test, section, mode, ' +
      'correct_count, incorrect_count, count, total_time_sec, completed_at, created_at'
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('admin/qbank-practice-sets error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, total: (data ?? []).length })
}
