import type { SupabaseClient, User } from '@supabase/supabase-js'

// The day this feature went live — existing users get 10 days from here.
export const SAT_FORM1_LAUNCH_AT = '2026-07-07T00:00:00.000Z'

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000

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

// Returns e.g. "9 days", "23 hours", "less than 1 hour"
export function formatCountdown(access: Pick<Form1AccessRow, 'access_expires_at'>): string {
  const msLeft = new Date(access.access_expires_at).getTime() - Date.now()
  if (msLeft <= 0) return 'expired'
  const totalHours = msLeft / (1000 * 60 * 60)
  const days = Math.floor(totalHours / 24)
  if (days >= 2) return `${days} days`
  if (days === 1) return '1 day'
  const hours = Math.floor(totalHours)
  if (hours >= 2) return `${hours} hours`
  if (hours >= 1) return '1 hour'
  return 'less than 1 hour'
}

// Gets the access row for a user, creating one if it doesn't exist yet.
// Uses the user's own Supabase client (respects RLS — user must have INSERT policy).
export async function getOrCreateForm1Access(
  supabase: SupabaseClient,
  user: User,
): Promise<Form1AccessRow> {
  const { data: existing } = await supabase
    .from('sat_form_1_access')
    .select('user_id, email, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) return existing as Form1AccessRow

  // Compute effective start: whichever is later, account creation or feature launch
  const launchTs = new Date(SAT_FORM1_LAUNCH_AT).getTime()
  const createdTs = user.created_at ? new Date(user.created_at).getTime() : Date.now()
  const effectiveStart = Math.max(createdTs, launchTs)

  const newRow = {
    user_id: user.id,
    email: user.email ?? null,
    access_started_at: new Date(effectiveStart).toISOString(),
    access_expires_at: new Date(effectiveStart + TEN_DAYS_MS).toISOString(),
    reason: createdTs > launchTs ? 'signup' : 'existing_user_grace_period',
  }

  // ignoreDuplicates so a race-condition second request doesn't error
  await supabase
    .from('sat_form_1_access')
    .upsert(newRow, { onConflict: 'user_id', ignoreDuplicates: true })

  // Always re-fetch — the upsert may have been a no-op if another request won the race
  const { data: refetched } = await supabase
    .from('sat_form_1_access')
    .select('user_id, email, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .single()

  return refetched as Form1AccessRow
}
