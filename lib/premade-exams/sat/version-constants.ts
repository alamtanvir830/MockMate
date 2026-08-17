export const SAT_CONTENT_VERSION_V1 = 1 as const
export const SAT_CONTENT_VERSION_V2 = 2 as const
export const SAT_CONTENT_VERSION_V3 = 3 as const
export const SAT_CONTENT_VERSION_V4 = 4 as const
export type SATContentVersion = 1 | 2 | 3 | 4

// Controls the version assigned to every NEW attempt.
// Never used to override the version of an existing stored attempt.
export const CURRENT_SAT_CONTENT_VERSION: SATContentVersion = 4

// Per-form minimum content version required for an active (non-completed) attempt.
// A stored in-progress attempt with version < minimum is stale and must restart.
// Only set for forms that have been rebuilt to a higher version than the global baseline.
// Forms not listed here have no minimum — any stored version is acceptable.
export const FORM_MINIMUM_VERSION: Partial<Record<number, SATContentVersion>> = {
  7: 4, // Form 7 rebuilt as V4 — all V2/V3 in-progress attempts must restart
}

/**
 * Converts any stored value to a valid SATContentVersion.
 * undefined / null / missing fields → V1 (backward-compatible default).
 * Invalid values → V1 (fail safe).
 * 2 → V2 (explicit opt-in).
 * 3 → V3 (explicit opt-in).
 */
export function normalizeSatContentVersion(value: unknown): SATContentVersion {
  if (value === 4) return SAT_CONTENT_VERSION_V4
  if (value === 3) return SAT_CONTENT_VERSION_V3
  if (value === 2) return SAT_CONTENT_VERSION_V2
  return SAT_CONTENT_VERSION_V1
}

/**
 * Returns true when a stored in-progress attempt is stale for the given form.
 * Completed attempts (standardized_exam_attempts) are NEVER stale — they must
 * always resolve the content version at the time they were taken.
 * Only use this for in-progress (sat_in_progress_attempts) rows.
 */
export function isAttemptStaleForForm(
  formNumber: number,
  storedVersion: unknown,
): boolean {
  const minVersion = FORM_MINIMUM_VERSION[formNumber]
  if (minVersion === undefined) return false
  const stored = normalizeSatContentVersion(storedVersion)
  return stored < minVersion
}
