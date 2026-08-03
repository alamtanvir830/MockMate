export const SAT_CONTENT_VERSION_V1 = 1 as const
export const SAT_CONTENT_VERSION_V2 = 2 as const
export type SATContentVersion = 1 | 2

// Controls the version assigned to every NEW attempt.
// Never used to override the version of an existing stored attempt.
export const CURRENT_SAT_CONTENT_VERSION: SATContentVersion = 2

/**
 * Converts any stored value to a valid SATContentVersion.
 * undefined / null / missing fields → V1 (backward-compatible default).
 * Invalid values → V1 (fail safe).
 * 2 → V2 (explicit opt-in).
 */
export function normalizeSatContentVersion(value: unknown): SATContentVersion {
  if (value === 2) return SAT_CONTENT_VERSION_V2
  return SAT_CONTENT_VERSION_V1
}
