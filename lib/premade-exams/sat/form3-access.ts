import { createAdminClient } from '@/lib/supabase/admin'
import type { SupabaseClient } from '@supabase/supabase-js'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Form3FreeWindow {
  startsAt: string
  expiresAt: string  // maps to ends_at in sat_form3_promotion
}

export type Form3AttemptStatus = 'none' | 'in-progress' | 'completed' | 'feedback-required'
export type Form3AccessSource = 'admin' | 'premium' | 'free-window' | 'free-window-resume' | 'none'

export interface Form3AccessResult {
  formNumber: 3
  isPremium: boolean
  isAdmin: boolean
  // Global promotional window state
  globalWindowEnabled: boolean   // sat_form3_promotion row exists with enabled=true
  globalWindowStarted: boolean   // starts_at has passed (now >= starts_at)
  globalWindowExpired: boolean   // ends_at has passed (now >= ends_at)
  accessSource: Form3AccessSource
  freeWindowStartsAt: string | null
  freeWindowExpiresAt: string | null
  serverNow: string
  remainingSeconds: number
  canStart: boolean
  canResume: boolean
  canRetake: boolean
  canCompleteFeedback: boolean
  canViewResult: boolean
  attemptStatus: Form3AttemptStatus
  attemptId: string | null
  lockReason: string | null
}

// ── Global window DB helper ───────────────────────────────────────────────────

/**
 * Fetches the current global Form 3 promotional window from sat_form3_promotion.
 * Returns null when the window is disabled, not yet activated, or the table is missing.
 *
 * Returns data regardless of whether ends_at has passed — the resolver determines
 * live/expired status from the timestamps. This allows the resolver to grant the
 * "started before expiry" resume grace period.
 */
export async function getGlobalForm3Window(
  supabase: SupabaseClient,
): Promise<Form3FreeWindow | null> {
  const { data } = await supabase
    .from('sat_form3_promotion')
    .select('starts_at, ends_at, enabled')
    .eq('promotion_key', 'august-2026')
    .eq('enabled', true)
    .not('starts_at', 'is', null)
    .maybeSingle()

  if (!data) return null

  return {
    startsAt: data.starts_at as string,
    expiresAt: data.ends_at as string,
  }
}

// ── Central Form 3 access resolver (pure — no DB calls) ───────────────────────
//
// Priority order:
// 1. feedback-required → canViewResult + canCompleteFeedback
// 2. completed → canViewResult
// 3. admin → full access
// 4. premium → full access
// 5. active global free window → canStart (if none) or canResume (if in-progress)
// 6. expired window + in-progress started before expiry → canResume only
// 7. no access → lockReason set

export function resolveForm3Access(opts: {
  isAdmin: boolean
  isPremium: boolean
  freeWindow: Form3FreeWindow | null
  attemptStatus: Form3AttemptStatus
  attemptId: string | null
  inProgressStartedAt: string | null
}): Form3AccessResult {
  const { isAdmin, isPremium, freeWindow, attemptStatus, attemptId, inProgressStartedAt } = opts

  const now = new Date()
  const serverNow = now.toISOString()

  const freeWindowExpiresAt = freeWindow?.expiresAt ?? null
  const freeWindowStartsAt = freeWindow?.startsAt ?? null

  // Global window state flags
  const globalWindowEnabled = freeWindow != null
  const globalWindowStarted = freeWindow != null && new Date(freeWindow.startsAt) <= now
  const globalWindowExpired = freeWindow != null && new Date(freeWindow.expiresAt) <= now
  const freeWindowActive = globalWindowEnabled && globalWindowStarted && !globalWindowExpired

  // Remaining seconds in free window (non-negative)
  const remainingSeconds = freeWindowExpiresAt
    ? Math.max(0, Math.floor((new Date(freeWindowExpiresAt).getTime() - now.getTime()) / 1000))
    : 0

  // Base result shape
  const base: Omit<Form3AccessResult, 'accessSource' | 'canStart' | 'canResume' | 'canRetake' | 'canCompleteFeedback' | 'canViewResult' | 'lockReason'> = {
    formNumber: 3,
    isPremium,
    isAdmin,
    globalWindowEnabled,
    globalWindowStarted,
    globalWindowExpired,
    freeWindowStartsAt,
    freeWindowExpiresAt,
    serverNow,
    remainingSeconds,
    attemptStatus,
    attemptId,
  }

  // Priority 1 & 2: post-exam states — always allow viewing results regardless of premium/access
  if (attemptStatus === 'feedback-required') {
    return {
      ...base,
      accessSource: isAdmin ? 'admin' : isPremium ? 'premium' : freeWindowActive ? 'free-window' : 'none',
      canStart: false,
      canResume: false,
      canRetake: isAdmin || isPremium,
      canCompleteFeedback: true,
      canViewResult: true,
      lockReason: null,
    }
  }

  if (attemptStatus === 'completed') {
    return {
      ...base,
      accessSource: isAdmin ? 'admin' : isPremium ? 'premium' : freeWindowActive ? 'free-window' : 'none',
      canStart: false,
      canResume: false,
      canRetake: isAdmin || isPremium,
      canCompleteFeedback: false,
      canViewResult: true,
      lockReason: null,
    }
  }

  // Priority 3: admin full access
  if (isAdmin) {
    return {
      ...base,
      accessSource: 'admin',
      canStart: attemptStatus === 'none',
      canResume: attemptStatus === 'in-progress',
      canRetake: true,
      canCompleteFeedback: false,
      canViewResult: false,
      lockReason: null,
    }
  }

  // Priority 4: premium full access
  if (isPremium) {
    return {
      ...base,
      accessSource: 'premium',
      canStart: attemptStatus === 'none',
      canResume: attemptStatus === 'in-progress',
      canRetake: true,
      canCompleteFeedback: false,
      canViewResult: false,
      lockReason: null,
    }
  }

  // Priority 5: active global free window
  if (freeWindowActive) {
    return {
      ...base,
      accessSource: 'free-window',
      canStart: attemptStatus === 'none',
      canResume: attemptStatus === 'in-progress',
      canRetake: false,
      canCompleteFeedback: false,
      canViewResult: false,
      lockReason: null,
    }
  }

  // Priority 6: expired window but in-progress attempt started before expiry
  if (
    attemptStatus === 'in-progress' &&
    inProgressStartedAt != null &&
    freeWindowExpiresAt != null &&
    new Date(inProgressStartedAt) < new Date(freeWindowExpiresAt)
  ) {
    return {
      ...base,
      accessSource: 'free-window-resume',
      canStart: false,
      canResume: true,
      canRetake: false,
      canCompleteFeedback: false,
      canViewResult: false,
      lockReason: null,
    }
  }

  // Priority 7: no access
  return {
    ...base,
    accessSource: 'none',
    canStart: false,
    canResume: false,
    canRetake: false,
    canCompleteFeedback: false,
    canViewResult: false,
    lockReason: 'no-access',
  }
}

// ── API-route helper ───────────────────────────────────────────────────────────

/**
 * Returns true if a non-premium user may access Form 3 via the API
 * (save-attempt, in-progress autosave).
 *
 * Uses the admin client to bypass RLS for the global sat_form3_promotion read.
 *
 * Allowed when:
 * - Global window is active (enabled=true AND now between starts_at and ends_at), OR
 * - User has an existing in-progress row started before the window expired.
 */
export async function canNonPremiumAccessForm3Api(
  _supabase: SupabaseClient,
  userId: string,
  localAttemptId: string,
): Promise<boolean> {
  const admin = createAdminClient()

  const [globalWindowResult, inProgressResult] = await Promise.all([
    admin
      .from('sat_form3_promotion')
      .select('starts_at, ends_at')
      .eq('promotion_key', 'august-2026')
      .eq('enabled', true)
      .not('starts_at', 'is', null)
      .maybeSingle(),
    admin
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', userId)
      .eq('form_number', 3)
      .maybeSingle(),
  ])

  const promo = globalWindowResult.data
  const now = new Date()

  // Active global window
  if (
    promo?.starts_at &&
    promo?.ends_at &&
    new Date(promo.starts_at as string) <= now &&
    now < new Date(promo.ends_at as string)
  ) {
    return true
  }

  // Expired window — allow if this is the existing in-progress attempt started before expiry
  const existing = inProgressResult.data
  if (
    existing &&
    existing.local_attempt_id === localAttemptId &&
    promo?.ends_at &&
    new Date(existing.started_at as string) < new Date(promo.ends_at as string)
  ) {
    return true
  }

  return false
}

// ── Legacy no-op stubs (kept so existing imports compile) ────────────────────
// Form 3 now uses a global window (sat_form3_promotion). Per-user window
// initialization is no longer needed for Form 3.

export async function getForm3FreeWindow(
  supabase: SupabaseClient,  // eslint-disable-line @typescript-eslint/no-unused-vars
  userId: string,            // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<Form3FreeWindow | null> {
  return null
}

export async function ensureForm3FreeWindow(
  userId: string,  // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> {
  // No-op: Form 3 uses a global promotional window, not per-user rows.
}
