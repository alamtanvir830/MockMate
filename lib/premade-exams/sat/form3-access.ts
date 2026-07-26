import { createAdminClient } from '@/lib/supabase/admin'
import type { SupabaseClient } from '@supabase/supabase-js'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Form3FreeWindow {
  startsAt: string
  expiresAt: string
}

export type Form3AttemptStatus = 'none' | 'in-progress' | 'completed' | 'feedback-required'
export type Form3AccessSource = 'admin' | 'premium' | 'free-window' | 'free-window-resume' | 'none'

export interface Form3AccessResult {
  formNumber: 3
  isPremium: boolean
  isAdmin: boolean
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

// ── DB helpers ─────────────────────────────────────────────────────────────────

/**
 * Initializes a per-user 48-hour Form 3 free access window on first call.
 * Subsequent calls are no-ops (ON CONFLICT DO NOTHING).
 * Uses the admin (service-role) client to call the SECURITY DEFINER RPC.
 * Non-fatal — never blocks login or auth flow if this fails.
 */
export async function ensureForm3FreeWindow(userId: string): Promise<void> {
  try {
    const admin = createAdminClient()
    await admin.rpc('init_form3_free_window', { p_user_id: userId })
  } catch {
    // swallow — timer must never block auth or page load
  }
}

/**
 * Fetches the Form 3 free window for the given user from sat_free_exam_access.
 * Returns null if no row exists.
 */
export async function getForm3FreeWindow(
  supabase: SupabaseClient,
  userId: string,
): Promise<Form3FreeWindow | null> {
  const { data } = await supabase
    .from('sat_free_exam_access')
    .select('access_started_at, access_expires_at')
    .eq('user_id', userId)
    .eq('form_number', 3)
    .maybeSingle()

  if (!data) return null

  return {
    startsAt: data.access_started_at as string,
    expiresAt: data.access_expires_at as string,
  }
}

// ── Central Form 3 access resolver (pure — no DB calls) ───────────────────────
//
// Priority order:
// 1. feedback-required → canViewResult + canCompleteFeedback
// 2. completed → canViewResult
// 3. admin → full access
// 4. premium → full access
// 5. active free window → canStart (if none) or canResume (if in-progress)
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

  const freeWindowActive = freeWindowExpiresAt != null
    ? now < new Date(freeWindowExpiresAt)
    : false

  // Remaining seconds in free window
  const remainingSeconds = freeWindowExpiresAt
    ? Math.max(0, Math.floor((new Date(freeWindowExpiresAt).getTime() - now.getTime()) / 1000))
    : 0

  // Base result shape
  const base: Omit<Form3AccessResult, 'accessSource' | 'canStart' | 'canResume' | 'canRetake' | 'canCompleteFeedback' | 'canViewResult' | 'lockReason'> = {
    formNumber: 3,
    isPremium,
    isAdmin,
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

  // Priority 5: active free window
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
 * Allowed when:
 * - Active free window exists, OR
 * - User has an existing in-progress row with localAttemptId matching
 *   the one being saved, AND it was started before the window expired.
 */
export async function canNonPremiumAccessForm3Api(
  supabase: SupabaseClient,
  userId: string,
  localAttemptId: string,
): Promise<boolean> {
  const [freeWindowResult, inProgressResult] = await Promise.all([
    supabase
      .from('sat_free_exam_access')
      .select('access_expires_at')
      .eq('user_id', userId)
      .eq('form_number', 3)
      .maybeSingle(),
    supabase
      .from('sat_in_progress_attempts')
      .select('local_attempt_id, started_at')
      .eq('user_id', userId)
      .eq('form_number', 3)
      .maybeSingle(),
  ])

  const expiresAt = freeWindowResult.data?.access_expires_at as string | undefined
  const now = new Date()

  // Active window
  if (expiresAt && now < new Date(expiresAt)) {
    return true
  }

  // Expired window — allow if this is the existing in-progress attempt started before expiry
  const existing = inProgressResult.data
  if (
    existing &&
    existing.local_attempt_id === localAttemptId &&
    expiresAt &&
    new Date(existing.started_at as string) < new Date(expiresAt)
  ) {
    return true
  }

  return false
}
