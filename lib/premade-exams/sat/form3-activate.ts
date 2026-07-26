import { createAdminClient } from '@/lib/supabase/admin'

const PROMO_KEY = 'july-24-2026'
const DURATION_MS = (47 * 3600 + 59 * 60) * 1000

// Starts the global Form 3 promotion on the first call. All subsequent calls
// are no-ops because .is('starts_at', null) updates 0 rows once activated.
// Uses the admin (service-role) client to bypass RLS.
// The WHERE starts_at IS NULL condition makes concurrent calls atomic at the
// PostgreSQL row level — the second update finds starts_at set and skips.
// Non-fatal — never blocks login or page load if this fails.
export async function activateForm3PromotionIfNeeded(): Promise<void> {
  try {
    const admin = createAdminClient()
    const now = new Date()
    const endsAt = new Date(now.getTime() + DURATION_MS)

    await admin
      .from('sat_form3_promotion')
      .update({
        starts_at: now.toISOString(),
        ends_at: endsAt.toISOString(),
        is_active: true,
        updated_at: now.toISOString(),
      })
      .eq('promotion_key', PROMO_KEY)
      .is('starts_at', null)
  } catch {
    // swallow — promotion must never block auth or page load
  }
}
