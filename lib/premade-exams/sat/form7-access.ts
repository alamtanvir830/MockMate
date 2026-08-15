// ── Form 7 Global Free-Access Window ──────────────────────────────────────────
//
// Form 7 uses hardcoded UTC constants for the 72-hour promotional window.
// This eliminates any DB migration requirement while remaining server-authoritative:
// all access decisions are evaluated at request time on the server using these
// fixed timestamps, so the window is identical for every user and never resets
// on refresh, login, or redeployment.
// ─────────────────────────────────────────────────────────────────────────────

export const FORM7_WINDOW_STARTS_AT = '2026-08-15T12:05:00Z'
export const FORM7_WINDOW_ENDS_AT   = '2026-08-18T12:05:00Z'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Form7FreeWindow {
  startsAt: string
  expiresAt: string
}

export type Form7AttemptStatus = 'none' | 'in-progress' | 'completed' | 'feedback-required'
export type Form7AccessSource  = 'admin' | 'premium' | 'free-window' | 'none'

export interface Form7AccessResult {
  formNumber: 7
  isPremium: boolean
  isAdmin: boolean
  globalWindowEnabled: boolean
  globalWindowStarted: boolean
  globalWindowExpired: boolean
  accessSource: Form7AccessSource
  freeWindowStartsAt: string | null
  freeWindowExpiresAt: string | null
  serverNow: string
  remainingSeconds: number
  canStart: boolean
  canResume: boolean
  canRetake: boolean
  canCompleteFeedback: boolean
  canViewResult: boolean
  attemptStatus: Form7AttemptStatus
  attemptId: string | null
  lockReason: string | null
}

// ── Window helper ─────────────────────────────────────────────────────────────

/**
 * Returns the Form 7 free window from hardcoded constants.
 * Returns null when the window constants are not set or invalid.
 * Always returns the window object regardless of whether ends_at has passed —
 * the resolver determines live/expired status from the timestamps.
 */
export function getForm7FreeWindow(): Form7FreeWindow | null {
  if (!FORM7_WINDOW_STARTS_AT || !FORM7_WINDOW_ENDS_AT) return null
  return {
    startsAt: FORM7_WINDOW_STARTS_AT,
    expiresAt: FORM7_WINDOW_ENDS_AT,
  }
}

// ── Central Form 7 access resolver (pure — no async calls) ───────────────────
//
// Priority order:
// 1. feedback-required → canViewResult + canCompleteFeedback
// 2. completed → canViewResult
// 3. admin → full access
// 4. premium → full access
// 5. active global free window → canStart (if none) or canResume (if in-progress)
// 6. no access → lockReason set (no grace period — expired = locked)

export function resolveForm7Access(opts: {
  isAdmin: boolean
  isPremium: boolean
  freeWindow: Form7FreeWindow | null
  attemptStatus: Form7AttemptStatus
  attemptId: string | null
  inProgressStartedAt?: string | null
}): Form7AccessResult {
  const { isAdmin, isPremium, freeWindow, attemptStatus, attemptId } = opts

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

  const base: Omit<Form7AccessResult, 'accessSource' | 'canStart' | 'canResume' | 'canRetake' | 'canCompleteFeedback' | 'canViewResult' | 'lockReason'> = {
    formNumber: 7,
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

  // Priority 6: no access (window expired or never active — no grace period)
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
 * Returns true if a non-premium user may access Form 7 via the API.
 * Only allows access while the global window is active. There is no grace period —
 * when the window expires all in-progress data is discarded.
 */
export async function canNonPremiumAccessForm7Api(userId: string): Promise<boolean> {
  const now = new Date()

  // No constants set → deny
  if (!FORM7_WINDOW_STARTS_AT || !FORM7_WINDOW_ENDS_AT) return false

  // Window hasn't started yet → deny
  if (new Date(FORM7_WINDOW_STARTS_AT) > now) return false

  // Active window → allow
  if (now < new Date(FORM7_WINDOW_ENDS_AT)) return true

  // Window has expired — deny and clean up any in-progress row so expired
  // attempt data is not retained beyond the promotional period.
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    await admin
      .from('sat_in_progress_attempts')
      .delete()
      .eq('user_id', userId)
      .eq('form_number', 7)
  } catch {
    // Cleanup failure is non-fatal; page-level cleanup handles it on next load
  }

  return false
}
