import type { SupabaseClient, User } from '@supabase/supabase-js'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Form3Promotion {
  id: number
  promotionKey: string
  startsAt: string | null
  endsAt: string | null
  eligibilitySignupUtcStart: string
  eligibilitySignupUtcEnd: string
  isActive: boolean
}

export type Form3AccessSource = 'admin' | 'premium' | 'promotion-new' | 'promotion-resume' | 'none'

export interface Form3AccessResult {
  canStart: boolean
  canResume: boolean
  accessSource: Form3AccessSource
  promotionEndsAt: string | null
  remainingSeconds: number
  reason: string
}

// ── DB helpers ─────────────────────────────────────────────────────────────────

export async function getForm3Promotion(
  supabase: SupabaseClient,
): Promise<Form3Promotion | null> {
  const { data } = await supabase
    .from('sat_form3_promotion')
    .select('id, promotion_key, form_number, starts_at, ends_at, eligibility_signup_utc_start, eligibility_signup_utc_end, is_active')
    .eq('promotion_key', 'july-24-2026')
    .maybeSingle()

  if (!data) return null

  return {
    id:                         data.id,
    promotionKey:               data.promotion_key,
    startsAt:                   data.starts_at,
    endsAt:                     data.ends_at,
    eligibilitySignupUtcStart:  data.eligibility_signup_utc_start,
    eligibilitySignupUtcEnd:    data.eligibility_signup_utc_end,
    isActive:                   data.is_active,
  }
}

// ── Eligibility helpers (pure, no DB calls) ────────────────────────────────────

export function isPromotionWindowActive(promotion: Form3Promotion): boolean {
  if (!promotion.isActive || !promotion.endsAt || !promotion.startsAt) return false
  const now = Date.now()
  return now >= new Date(promotion.startsAt).getTime()
      && now <  new Date(promotion.endsAt).getTime()
}

// Uses the trusted Supabase Auth created_at, which is set at account creation
// and is not user-editable. The SupabaseUser type exposes it as a top-level field.
export function isUserEligibleForPromotion(
  user: User,
  promotion: Form3Promotion,
): boolean {
  const signupAt = user.created_at
  if (!signupAt) return false
  const signupTs  = new Date(signupAt).getTime()
  const startTs   = new Date(promotion.eligibilitySignupUtcStart).getTime()
  const endTs     = new Date(promotion.eligibilitySignupUtcEnd).getTime()
  return signupTs >= startTs && signupTs < endTs
}

export function getPromotionRemainingSeconds(promotion: Form3Promotion): number {
  if (!promotion.endsAt) return 0
  return Math.max(0, Math.floor((new Date(promotion.endsAt).getTime() - Date.now()) / 1000))
}

export function formatPromotionCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '0:00:00'
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ── Central Form 3 access resolver ────────────────────────────────────────────
//
// Callers: form-3 page.tsx, SAT forms page, save-attempt, in-progress API
//
// Args:
//   user          — authenticated Supabase user (null → not logged in)
//   isAdmin       — result of isMockMateAdmin(user) (derived server-side)
//   isPremium     — result of getEntitlements() satUpgradeUnlocked (derived server-side)
//   promotion     — result of getForm3Promotion() (may be null if table not yet applied)
//   hasInProgress — true when a row exists in sat_in_progress_attempts for form_number=3

export function resolveForm3Access(opts: {
  user:          User | null
  isAdmin:       boolean
  isPremium:     boolean
  promotion:     Form3Promotion | null
  hasInProgress: boolean
}): Form3AccessResult {
  const { user, isAdmin, isPremium, promotion, hasInProgress } = opts

  if (!user) {
    return { canStart: false, canResume: false, accessSource: 'none', promotionEndsAt: null, remainingSeconds: 0, reason: 'unauthenticated' }
  }

  if (isAdmin) {
    return { canStart: true, canResume: true, accessSource: 'admin', promotionEndsAt: null, remainingSeconds: 0, reason: 'admin' }
  }

  if (isPremium) {
    return { canStart: true, canResume: true, accessSource: 'premium', promotionEndsAt: null, remainingSeconds: 0, reason: 'premium' }
  }

  if (promotion) {
    const eligible = isUserEligibleForPromotion(user, promotion)
    const active   = isPromotionWindowActive(promotion)

    if (eligible && active) {
      const secs = getPromotionRemainingSeconds(promotion)
      return {
        canStart:         true,
        canResume:        true,
        accessSource:     'promotion-new',
        promotionEndsAt:  promotion.endsAt,
        remainingSeconds: secs,
        reason:           'eligible-promotion-active',
      }
    }

    // Promotion expired but user had already started → allow resume only
    if (eligible && !active && hasInProgress && promotion.endsAt) {
      return {
        canStart:         false,
        canResume:        true,
        accessSource:     'promotion-resume',
        promotionEndsAt:  promotion.endsAt,
        remainingSeconds: 0,
        reason:           'promotion-expired-resume-in-progress',
      }
    }
  }

  return { canStart: false, canResume: false, accessSource: 'none', promotionEndsAt: null, remainingSeconds: 0, reason: 'no-access' }
}
