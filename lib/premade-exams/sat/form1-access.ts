import type { SupabaseClient, User } from '@supabase/supabase-js'

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

export interface Form1AccessRow {
  user_id: string
  email: string | null
  access_started_at: string
  access_expires_at: string
  reason: string
}

export function isForm1Expired(access: Pick<Form1AccessRow, 'access_expires_at'>): boolean {
  return new Date(access.access_expires_at) <= new Date()
}

// Returns a detailed countdown string, e.g. "2 days and 14 hours", "5 hours", "less than 1 hour"
export function formatCountdown(access: Pick<Form1AccessRow, 'access_expires_at'>): string {
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

// Gets the access row for a user, creating or reducing it as needed.
//
// Rules:
// - No row → create with access_started_at = now, access_expires_at = now + 3 days
// - Row exists, already expired → return as-is (do not extend)
// - Row exists, expires_at <= now + 3 days → return as-is (within window, do not shorten further)
// - Row exists, expires_at > now + 3 days → reduce to now + 3 days
//
// Uses the user's own Supabase client (respects RLS).
export async function getOrCreateForm1Access(
  supabase: SupabaseClient,
  user: User,
): Promise<Form1AccessRow> {
  const { data: existing } = await supabase
    .from('sat_form_1_access')
    .select('user_id, email, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .maybeSingle()

  const now = Date.now()
  const threeFromNow = new Date(now + THREE_DAYS_MS).toISOString()

  if (existing) {
    const row = existing as Form1AccessRow
    const expiresTs = new Date(row.access_expires_at).getTime()

    // Expired or already within the 3-day window → leave untouched
    if (expiresTs <= now || expiresTs <= now + THREE_DAYS_MS) {
      return row
    }

    // More than 3 days remaining → reduce to now + 3 days
    await supabase
      .from('sat_form_1_access')
      .update({ access_expires_at: threeFromNow, reason: 'reduced_to_3_day_window' })
      .eq('user_id', user.id)

    return { ...row, access_expires_at: threeFromNow, reason: 'reduced_to_3_day_window' }
  }

  // No row yet — first dashboard view: start the 3-day clock now
  const newRow: Form1AccessRow = {
    user_id: user.id,
    email: user.email ?? null,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: threeFromNow,
    reason: 'dashboard_first_seen_3_day_window',
  }

  // ignoreDuplicates guards against a rare race where two requests arrive simultaneously
  await supabase
    .from('sat_form_1_access')
    .upsert(newRow, { onConflict: 'user_id', ignoreDuplicates: true })

  const { data: refetched } = await supabase
    .from('sat_form_1_access')
    .select('user_id, email, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .single()

  return refetched as Form1AccessRow
}
