import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET /api/admin/sat-module-feedback
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
export async function GET(req: NextRequest) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('sat_exam_module_feedback')
    .select(
      'user_email, user_name, form_number, local_attempt_id, created_at, ' +
      'rw_module_1_feedback, rw_module_2_feedback, math_module_1_feedback, math_module_2_feedback, ' +
      'rw_module_2_path, math_module_2_path, ' +
      'rw_module_1_char_count, rw_module_2_char_count, math_module_1_char_count, math_module_2_char_count'
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('admin/sat-module-feedback error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, total: (data ?? []).length })
}
