import { createAdminClient } from '@/lib/supabase/admin'

// Calls the trusted DB function that starts the Form 3 global promotion
// on first login. Subsequent calls are no-ops (WHERE starts_at IS NULL).
// Non-fatal — never blocks login if this fails.
export async function activateForm3PromotionIfNeeded(): Promise<void> {
  try {
    const admin = createAdminClient()
    await admin.rpc('activate_sat_form3_if_needed')
  } catch {
    // swallow — promotion activation must never break auth
  }
}
