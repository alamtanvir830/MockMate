/**
 * Tests for lib/auth/timingSafeCompare.ts
 *
 * NOTE: No test runner is configured in this project (no jest/vitest in package.json).
 * To run these tests, install a test runner:
 *   npm install --save-dev vitest
 * Then add to package.json scripts: "test": "vitest"
 * And run: npm test
 */

import { describe, it, expect } from 'vitest'
import { timingSafeStringEqual } from '../../lib/auth/timingSafeCompare'

describe('timingSafeStringEqual', () => {
  it('returns true for identical strings', () => {
    const secret = 'super-secret-key-abc123'
    expect(timingSafeStringEqual(secret, secret)).toBe(true)
  })

  it('returns true for equal but distinct string instances', () => {
    const a = 'super-secret-key-abc123'
    const b = 'super' + '-secret-key-abc123'
    expect(timingSafeStringEqual(a, b)).toBe(true)
  })

  it('returns false for different same-length strings', () => {
    const a = 'aaaaaaaaaa'
    const b = 'aaaaaaaaab'
    expect(timingSafeStringEqual(a, b)).toBe(false)
  })

  it('returns false for strings of different lengths', () => {
    expect(timingSafeStringEqual('short', 'much-longer-string')).toBe(false)
  })

  it('returns false for empty string vs non-empty string', () => {
    expect(timingSafeStringEqual('', 'secret')).toBe(false)
  })

  it('returns false when first argument is undefined', () => {
    expect(timingSafeStringEqual(undefined, 'secret')).toBe(false)
  })

  it('returns false when second argument is undefined', () => {
    expect(timingSafeStringEqual('secret', undefined)).toBe(false)
  })

  it('returns false when first argument is null', () => {
    expect(timingSafeStringEqual(null, 'secret')).toBe(false)
  })

  it('returns false when second argument is null', () => {
    expect(timingSafeStringEqual('secret', null)).toBe(false)
  })

  it('returns false when both arguments are undefined', () => {
    expect(timingSafeStringEqual(undefined, undefined)).toBe(false)
  })

  it('returns false when both arguments are null', () => {
    expect(timingSafeStringEqual(null, null)).toBe(false)
  })

  it('returns false when both arguments are empty strings', () => {
    // Two empty strings — timingSafeEqual on zero-length buffers is technically true,
    // but the !a || !b guard catches empty string early and returns false.
    // This prevents an empty-string secret from matching anything.
    expect(timingSafeStringEqual('', '')).toBe(false)
  })

  it('never throws for any input combination', () => {
    const inputs: Array<string | null | undefined> = [undefined, null, '', 'valid', '🔑emoji', 'a'.repeat(1000)]
    for (const a of inputs) {
      for (const b of inputs) {
        expect(() => timingSafeStringEqual(a, b)).not.toThrow()
      }
    }
  })
})
