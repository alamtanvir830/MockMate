import { timingSafeEqual } from 'crypto'

/**
 * Constant-time string comparison to prevent timing-oracle attacks.
 * Returns false for any missing, malformed, or unequal input.
 */
export function timingSafeStringEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false
  try {
    const aBuf = Buffer.from(a, 'utf8')
    const bBuf = Buffer.from(b, 'utf8')
    if (aBuf.length !== bBuf.length) return false
    return timingSafeEqual(aBuf, bBuf)
  } catch {
    return false
  }
}
