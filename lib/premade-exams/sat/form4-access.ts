// ── Form 4 Global Free-Access Window ──────────────────────────────────────────
//
// Form 4 uses hardcoded UTC constants for the 72-hour promotional window.
// This eliminates any DB migration requirement while remaining server-authoritative:
// all access decisions are evaluated at request time on the server using these
// fixed timestamps, so the window is identical for every user and never resets
// on refresh, login, or redeployment.
//
// UPDATE THESE TWO CONSTANTS immediately before the final production commit.
// Set FORM4_WINDOW_STARTS_AT to the current UTC time.
// Set FORM4_WINDOW_ENDS_AT to exactly 72 hours later.
// ─────────────────────────────────────────────────────────────────────────────

export const FORM4_WINDOW_STARTS_AT = '2026-08-04T14:00:00Z'
export const FORM4_WINDOW_ENDS_AT   = '2026-08-07T14:00:00Z'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Form4FreeWindow {
  startsAt: string
  expiresAt: string
}

export type Form4AttemptStatus = 'none' | 'in-progress' | 'completed' | 'feedback-required'
export type Form4AccessSource  = 'admin' | 'premium' | 'free-window' | 'free-window-resume' | 'none'

export interface Form4AccessResult {
  formNumber: 4
  isPremium: boolean
  isAdmin: boolean
  globalWindowEnabled: boolean
  globalWindowStarted: boolean
  globalWindowExpired: boolean
  accessSource: Form4AccessSource
  freeWindowStartsAt: string | null
  freeWindowExpiresAt: string | null
  serverNow: string
  remainingSeconds: number
  canStart: boolean
  canResume: boolean
  canRetake: boolean
  canCompleteFeedback: boolean
  canViewResult: boolean
  attemptStatus: Form4AttemptStatus
  attemptId: string | null
  lockReason: string | null
}

// ── Window helper ─────────────────────────────────────────────────────────────

/**
 * Returns the Form 4 free window from hardcoded constants.
 * Returns null when the window constants are not set or invalid.
 * Always returns the window object regardless of whether ends_at has passed —
 * the resolver determines live/expired status from the timestamps.
 */
export function getForm4FreeWindow(): Form4FreeWindow | null {
  if (!FORM4_WINDOW_STARTS_AT || !FORM4_WINDOW_ENDS_AT) return null
  return {
    startsAt: FORM4_WINDOW_STARTS_AT,
    expiresAt: FORM4_WINDOW_ENDS_AT,
  }
}

// ── Central Form 4 access resolver (pure — no async calls) ───────────────────
//
// Priority order (mirrors Form 3):
// 1. feedback-required → canViewResult + canCompleteFeedback
// 2. completed → canViewResult
// 3. admin → full access
// 4. premium → full access
// 5. active global free window → canStart (if none) or canResume (if in-progress)
// 6. expired window + in-progress started before expiry → canResume only
// 7. no access → lockReason set

export function resolveForm4Access(opts: {
  isAdmin: boolean
  isPremium: boolean
  freeWindow: Form4FreeWindow | null
  attemptStatus: Form4AttemptStatus
  attemptId: string | null
  inProgressStartedAt: string | null
}): Form4AccessResult {
  const { isAdmin, isPremium, freeWindow, attemptStatus, attemptId, inProgressStartedAt } = opts

  const now = new Date()
  const serverNow = now.toISOString()

  const freeWindowExpiresAt = freeWindow?.expiresAt ?? null
  const freeWindowStartsAt  = freeWindow?.startsAt ?? null

  const globalWindowEnabled = freeWindow != null
  const globalWindowStarted = freeWindow != null && new Date(freeWindow.startsAt) <= now
  const globalWindowExpired = freeWindow != null && new Date(freeWindow.expiresAt) <= now
  const freeWindowActive    = globalWindowEnabled && globalWindowStarted && !globalWindowExpired

  const remainingSeconds = freeWindowExpiresAt
    ? Math.max(0, Math.floor((new Date(freeWindowExpiresAt).getTime() - now.getTime()) / 1000))
    : 0

  const base: Omit<Form4AccessResult, 'accessSource' | 'canStart' | 'canResume' | 'canRetake' | 'canCompleteFeedback' | 'canViewResult' | 'lockReason'> = {
    formNumber: 4,
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

  // Priority 1 & 2: post-exam states — always allow viewing results
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
 * Returns true if a non-premium user may access Form 4 via the API.
 * Uses hardcoded window constants — no DB query required.
 *
 * Allowed when:
 * - Global window is active (now between STARTS_AT and ENDS_AT), OR
 * - User has an existing in-progress row started before the window expired.
 */
export async function canNonPremiumAccessForm4Api(
  userId: string,
  localAttemptId: string,
): Promise<boolean> {
  const now = new Date()

  // No constants set → deny
  if (!FORM4_WINDOW_STARTS_AT || !FORM4_WINDOW_ENDS_AT) return false

  // Window hasn't started yet → deny (no grace period to honor)
  if (new Date(FORM4_WINDOW_STARTS_AT) > now) return false

  // Active window → allow
  if (now < new Date(FORM4_WINDOW_ENDS_AT)) return true

  // Window has expired — check grace period: allow if user's in-progress attempt
  // started before the window closed.
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data: existing } = await admin
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', userId)
      .eq('form_number', 4)
      .maybeSingle()

    if (
      existing &&
      existing.local_attempt_id === localAttemptId &&
      new Date(existing.started_at as string) < new Date(FORM4_WINDOW_ENDS_AT)
    ) {
      return true
    }
  } catch {
    // If admin client fails (e.g., missing env in test), fail safe → deny
    return false
  }

  return false
}
