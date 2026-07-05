import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { rescoreAttempt } from '@/lib/premade-exams/sat/sat-score-conversion'

// Secured with the service-role key itself — only the admin knows it.
// POST /api/admin/recalculate-sat-scores
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
//
// Recalculates rw_score, math_score, total_score for all SAT rows in
// standardized_exam_attempts using the corrected scoring tables.
// Prints before/after for every row that changes.
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.replace('Bearer ', '').trim()

  if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data: rows, error } = await supabase
    .from('standardized_exam_attempts')
    .select('id, rw_correct, math_correct, rw_m2_type, math_m2_type, rw_score, math_score, total_score, form_number')
    .eq('exam_type', 'SAT')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!rows || rows.length === 0) {
    return NextResponse.json({ message: 'No SAT attempts found.', updated: 0 })
  }

  const changes: unknown[] = []
  let updatedCount = 0

  for (const row of rows) {
    const rwRaw: number = row.rw_correct ?? 0
    const mathRaw: number = row.math_correct ?? 0
    const rwHard = row.rw_m2_type === 'hard'
    const mathHard = row.math_m2_type === 'hard'

    const { rwScaled, mathScaled, totalScore } = rescoreAttempt(rwRaw, rwHard, mathRaw, mathHard)

    if (rwScaled === row.rw_score && mathScaled === row.math_score && totalScore === row.total_score) {
      continue
    }

    const change = {
      id: row.id,
      form: row.form_number,
      rwRaw,
      rwM2: row.rw_m2_type,
      mathRaw,
      mathM2: row.math_m2_type,
      old: { rw: row.rw_score, math: row.math_score, total: row.total_score },
      new: { rw: rwScaled, math: mathScaled, total: totalScore },
    }

    const { error: updateError } = await supabase
      .from('standardized_exam_attempts')
      .update({ rw_score: rwScaled, math_score: mathScaled, total_score: totalScore })
      .eq('id', row.id)

    if (updateError) {
      changes.push({ ...change, error: updateError.message })
    } else {
      changes.push(change)
      updatedCount++
    }
  }

  return NextResponse.json({
    total: rows.length,
    updated: updatedCount,
    skipped: rows.length - updatedCount - changes.filter((c: any) => c.error).length,
    changes,
  })
}
