import type { SupabaseClient, User } from '@supabase/supabase-js'

// Single source of truth for the current free SAT exam configuration.
// All calculations derive from these constants — do not duplicate them elsewhere.
export const FREE_SAT_EXAM_CONFIG = {
  formNumber: 2,
  newUserDurationHours: 48,
  existingUserResetMinutes: 47 * 60 + 59,
} as const

const FREE_ACCESS_MS = FREE_SAT_EXAM_CONFIG.newUserDurationHours * 60 * 60 * 1000

export interface FreeExamAccessRow {
  user_id: string
  email: string | null
  free_form_number: number
  access_started_at: string
  access_expires_at: string
  reason: string
}

export function isFreeExamExpired(access: Pick<FreeExamAccessRow, 'access_expires_at'>): boolean {
  return new Date(access.access_expires_at) <= new Date()
}

export function formatFreeExamCountdown(access: Pick<FreeExamAccessRow, 'access_expires_at'>): string {
  const msLeft = new Date(access.access_expires_at).getTime() - Date.now()
  if (msLeft <= 0) return 'expired'
  const totalHours = msLeft / (1000 * 60 * 60)
  const days = Math.floor(totalHours / 24)
  const hours = Math.floor(totalHours % 24)
  if (days >= 1) {
    return hours > 0
      ? `${days} day${days !== 1 ? 's' : ''} and ${hours} hour${hours !== 1 ? 's' : ''}`
      : `${days} day${days !== 1 ? 's' : ''}`
  }
  if (hours >= 1) return `${hours} hour${hours !== 1 ? 's' : ''}`
  return 'less than 1 hour'
}

// Gets the free-exam access row for a user, creating it if absent.
//
// Rules:
// - No row → create with access_started_at = now, access_expires_at = now + 48h
// - Row exists, already expired → return as-is (do not extend)
// - Row exists, expires_at ≤ now + 48h → return as-is (within window)
// - Row exists, expires_at > now + 48h → reduce to now + 48h
//
// Uses the user's own Supabase client (respects RLS).
export async function getOrCreateFreeExamAccess(
  supabase: SupabaseClient,
  user: User,
): Promise<FreeExamAccessRow> {
  const { data: existing } = await supabase
    .from('sat_free_exam_access')
    .select('user_id, email, free_form_number, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .maybeSingle()

  const now = Date.now()
  const fortyEightFromNow = new Date(now + FREE_ACCESS_MS).toISOString()

  if (existing) {
    const row = existing as FreeExamAccessRow
    const expiresTs = new Date(row.access_expires_at).getTime()

    // Expired or already within the 48-hour window → leave untouched
    if (expiresTs <= now || expiresTs <= now + FREE_ACCESS_MS) {
      return row
    }

    // More than 48 hours remaining → reduce to now + 48 hours
    await supabase
      .from('sat_free_exam_access')
      .update({ access_expires_at: fortyEightFromNow, reason: 'reduced_to_48h_window' })
      .eq('user_id', user.id)

    return { ...row, access_expires_at: fortyEightFromNow, reason: 'reduced_to_48h_window' }
  }

  // No row yet — first visit: start the 48-hour clock now
  const newRow: FreeExamAccessRow = {
    user_id: user.id,
    email: user.email ?? null,
    free_form_number: FREE_SAT_EXAM_CONFIG.formNumber,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: fortyEightFromNow,
    reason: 'first_visit_48h_window',
  }

  // ignoreDuplicates guards against a rare race where two requests arrive simultaneously
  await supabase
    .from('sat_free_exam_access')
    .upsert(newRow, { onConflict: 'user_id', ignoreDuplicates: true })

  const { data: refetched } = await supabase
    .from('sat_free_exam_access')
    .select('user_id, email, free_form_number, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .single()

  return refetched as FreeExamAccessRow
}
