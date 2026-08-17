// ── Rolling Per-User SAT Free Exam Promo ──────────────────────────────────────
//
// After the global Form 7 window expires on 2026-08-17T19:00:00Z, every NEW
// eligible user (signed up on or after promoStartsAt) gets a personal 24-hour
// access window to ONE free SAT exam, starting on their first dashboard visit.
//
// To rotate the free exam form: change formNumber in ROLLING_PROMO_CONFIG.
// Everything else (DB, eligibility, API enforcement) auto-adapts.
// ─────────────────────────────────────────────────────────────────────────────

import type { SupabaseClient, User } from '@supabase/supabase-js'

// ── Single config location ────────────────────────────────────────────────────

export const ROLLING_PROMO_CONFIG = {
  formNumber: 7,                        // Change this ONE value to rotate the free SAT exam
  durationHours: 24,
  promoStartsAt: '2026-08-17T19:00:00Z', // Must match FORM7_WINDOW_ENDS_AT in form7-access.ts
} as const

const ROLLING_PROMO_MS = ROLLING_PROMO_CONFIG.durationHours * 60 * 60 * 1_000

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RollingPromoAccessRow {
  user_id: string
  email: string | null
  promo_form_number: number
  access_started_at: string
  access_expires_at: string
  reason: string
}

export type RollingPromoAccessSource = 'admin' | 'premium' | 'rolling-promo' | 'none'

export interface RollingPromoAccessResult {
  promoRow: RollingPromoAccessRow | null
  accessSource: RollingPromoAccessSource
  isExpired: boolean
  expiresAt: string | null
  assignedFormNumber: number | null
  canStart: boolean
  canResume: boolean
  canViewResult: boolean
  canCompleteFeedback: boolean
}

export type RollingPromoAttemptStatus = 'none' | 'in-progress' | 'completed' | 'feedback-required'

// ── Eligibility helpers ───────────────────────────────────────────────────────

/** Returns true when the rolling promo period has begun. */
export function isRollingPromoLive(): boolean {
  return new Date() >= new Date(ROLLING_PROMO_CONFIG.promoStartsAt)
}

/**
 * Returns true for accounts created on or after promoStartsAt.
 * Prevents pre-existing users (who already had the global Form 7 window)
 * from also receiving a personal rolling window.
 */
export function isEligibleForRollingPromo(userCreatedAt: string): boolean {
  return new Date(userCreatedAt) >= new Date(ROLLING_PROMO_CONFIG.promoStartsAt)
}

export function isRollingPromoExpired(row: Pick<RollingPromoAccessRow, 'access_expires_at'>): boolean {
  return new Date(row.access_expires_at) <= new Date()
}

// ── Row creation ──────────────────────────────────────────────────────────────

/**
 * Gets or creates a rolling promo row for a user on their first dashboard visit.
 *
 * - Returns null when: promo not yet live, or user is ineligible (signed up before cutover).
 * - Reads via user's own Supabase client (SELECT-only RLS).
 * - Writes via service-role admin client — users cannot self-insert or modify timestamps.
 * - Idempotent: safe to call on every dashboard load (upsert + ignoreDuplicates).
 * - Campaign versioning: promo_form_number is set once from ROLLING_PROMO_CONFIG.formNumber
 *   at row creation and is never updated, so rotating the config does not affect existing rows.
 */
export async function getOrCreateRollingPromoAccess(
  supabase: SupabaseClient,
  user: User,
): Promise<RollingPromoAccessRow | null> {
  if (!isRollingPromoLive()) return null
  if (!user.created_at || !isEligibleForRollingPromo(user.created_at)) return null

  // Read via user's client (SELECT-only RLS)
  const { data: existing } = await supabase
    .from('sat_rolling_promo_access')
    .select('user_id, email, promo_form_number, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) return existing as RollingPromoAccessRow

  // First visit — start the 24-hour clock now using the service-role client
  const now = Date.now()
  const newRow: RollingPromoAccessRow = {
    user_id: user.id,
    email: user.email ?? null,
    promo_form_number: ROLLING_PROMO_CONFIG.formNumber,
    access_started_at: new Date(now).toISOString(),
    access_expires_at: new Date(now + ROLLING_PROMO_MS).toISOString(),
    reason: 'rolling_promo_36h_first_visit',
  }

  const { createAdminClient } = await import('@/lib/supabase/admin')
  const adminClient = createAdminClient()

  // ignoreDuplicates guards against a rare race where two tabs arrive simultaneously
  await adminClient
    .from('sat_rolling_promo_access')
    .upsert(newRow, { onConflict: 'user_id', ignoreDuplicates: true })

  // Re-fetch the definitive row (may differ from newRow if the race was lost)
  const { data: refetched } = await adminClient
    .from('sat_rolling_promo_access')
    .select('user_id, email, promo_form_number, access_started_at, access_expires_at, reason')
    .eq('user_id', user.id)
    .single()

  return refetched as RollingPromoAccessRow
}

// ── Access resolver (pure — no async) ────────────────────────────────────────

export function resolveRollingPromoAccess(opts: {
  isAdmin: boolean
  isPremium: boolean
  promoRow: RollingPromoAccessRow | null
  attemptStatus: RollingPromoAttemptStatus
  attemptId: string | null
}): RollingPromoAccessResult {
  const { isAdmin, isPremium, promoRow, attemptStatus } = opts

  // Post-exam states: always allow viewing results regardless of expiry
  const isPostExam = attemptStatus === 'completed' || attemptStatus === 'feedback-required'

  if (isAdmin) {
    return {
      promoRow,
      accessSource: 'admin',
      isExpired: false,
      expiresAt: promoRow?.access_expires_at ?? null,
      assignedFormNumber: promoRow?.promo_form_number ?? ROLLING_PROMO_CONFIG.formNumber,
      canStart: attemptStatus === 'none',
      canResume: attemptStatus === 'in-progress',
      canViewResult: isPostExam,
      canCompleteFeedback: attemptStatus === 'feedback-required',
    }
  }

  if (isPremium) {
    return {
      promoRow,
      accessSource: 'premium',
      isExpired: false,
      expiresAt: promoRow?.access_expires_at ?? null,
      assignedFormNumber: promoRow?.promo_form_number ?? ROLLING_PROMO_CONFIG.formNumber,
      canStart: attemptStatus === 'none',
      canResume: attemptStatus === 'in-progress',
      canViewResult: isPostExam,
      canCompleteFeedback: attemptStatus === 'feedback-required',
    }
  }

  if (!promoRow) {
    return {
      promoRow: null,
      accessSource: 'none',
      isExpired: false,
      expiresAt: null,
      assignedFormNumber: null,
      canStart: false,
      canResume: false,
      canViewResult: isPostExam,
      canCompleteFeedback: attemptStatus === 'feedback-required',
    }
  }

  const isExpired = isRollingPromoExpired(promoRow)
  const expiresAt = promoRow.access_expires_at
  const activePromo = !isExpired

  if (isPostExam) {
    return {
      promoRow,
      accessSource: activePromo ? 'rolling-promo' : 'none',
      isExpired,
      expiresAt,
      assignedFormNumber: promoRow.promo_form_number,
      canStart: false,
      canResume: false,
      canViewResult: true,
      canCompleteFeedback: attemptStatus === 'feedback-required',
    }
  }

  if (activePromo) {
    return {
      promoRow,
      accessSource: 'rolling-promo',
      isExpired: false,
      expiresAt,
      assignedFormNumber: promoRow.promo_form_number,
      canStart: attemptStatus === 'none',
      canResume: attemptStatus === 'in-progress',
      canViewResult: false,
      canCompleteFeedback: false,
    }
  }

  // Promo expired, no exam taken
  return {
    promoRow,
    accessSource: 'none',
    isExpired: true,
    expiresAt,
    assignedFormNumber: promoRow.promo_form_number,
    canStart: false,
    canResume: false,
    canViewResult: false,
    canCompleteFeedback: false,
  }
}

// ── API enforcement helper ────────────────────────────────────────────────────

/**
 * Returns true if this user may access the given form via their rolling promo entitlement.
 * Verifies: row exists, promo_form_number matches requestedFormNumber, window not expired.
 * Uses admin client — bypasses RLS so the check is always authoritative.
 *
 * A user cannot gain access to a DIFFERENT form by changing the URL — the DB row
 * stores their assigned form and that is what we verify here.
 */
export async function canAccessRollingPromoFormApi(
  userId: string,
  requestedFormNumber: number,
): Promise<boolean> {
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const admin = createAdminClient()

  const { data: row } = await admin
    .from('sat_rolling_promo_access')
    .select('promo_form_number, access_expires_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (!row) return false
  if (row.promo_form_number !== requestedFormNumber) return false
  if (new Date(row.access_expires_at) <= new Date()) return false
  return true
}
