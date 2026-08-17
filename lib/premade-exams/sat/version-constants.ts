export const SAT_CONTENT_VERSION_V1 = 1 as const
export const SAT_CONTENT_VERSION_V2 = 2 as const
export const SAT_CONTENT_VERSION_V3 = 3 as const
export const SAT_CONTENT_VERSION_V4 = 4 as const
export type SATContentVersion = 1 | 2 | 3 | 4

// ─── Per-form version registry ────────────────────────────────────────────────
//
// TRUE latest approved content version for each specific form.
// Derived from actual content in sat-form-resolver.ts:
//   Forms 1–6, 8–10 → V2 (only V2 content files exist)
//   Form 7           → V4 (V3 and V4 rebuilds exist; V4 is current)
//
// When a new form version is deployed:
//   1. Add the content files (lib/premade-exams/sat/vN/form-M.ts)
//   2. Register the form in vN_FORMS inside sat-form-resolver.ts
//   3. Update the entry below to reflect the new version
//   4. This automatically propagates to fresh-attempt creation and stale detection
//
export const LATEST_SAT_FORM_VERSION: Record<number, SATContentVersion> = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 2,
  6: 2,
  7: 4,
  8: 2,
  9: 2,
  10: 2,
}

// Returns the latest approved content version for a specific form.
// Use this for ALL fresh attempt creation — never use CURRENT_SAT_CONTENT_VERSION
// directly in per-form contexts because it may be ahead of forms that have not
// been rebuilt yet (e.g. CURRENT=4 but Form 1 latest content is V2).
export function getLatestSatContentVersion(formNumber: number): SATContentVersion {
  return LATEST_SAT_FORM_VERSION[formNumber] ?? SAT_CONTENT_VERSION_V2
}

// Global ceiling — the highest version constant defined. Used only for type-level
// enforcement and internal tooling. Do NOT use this to assign per-form versions.
export const CURRENT_SAT_CONTENT_VERSION: SATContentVersion = 4

// Per-form minimum content version required for an active (non-completed) attempt.
// A stored in-progress attempt with stored_version < minimum is stale and must restart.
// Matches LATEST_SAT_FORM_VERSION: any in-progress below the form's latest is stale.
export const FORM_MINIMUM_VERSION: Partial<Record<number, SATContentVersion>> = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 2,
  6: 2,
  7: 4, // Form 7 rebuilt as V4 — all V2/V3 in-progress attempts must restart
  8: 2,
  9: 2,
  10: 2,
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
