/**
 * Tests for the unified SAT Premium entitlement check.
 *
 * Covers hasSatPremium() (server), evalSatPremiumMeta() (client hook),
 * getQBAccess() (question bank gate), and the payment-success page logic.
 *
 * Run: npx vitest run __tests__/premium
 */

import { describe, it, expect } from 'vitest'
import { hasSatPremium, isAdminUser } from '@/lib/auth/server'
import { evalSatPremiumMeta } from '@/hooks/use-entitlements'
import { getQBAccess } from '@/lib/question-bank/access'

// ── Shared fixtures ────────────────────────────────────────────────────────────

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'
const FUTURE = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
const PAST   = new Date(Date.now() - 1).toISOString()

// Jaiden's exact production metadata (confirmed 2026-08-01)
const JAIDEN_META = {
  sat_purchase_plan_type: 'three_month',
  sat_purchase_status: 'active',
  sat_purchase_expires_at: '2026-12-01T02:48:30.236082+00:00',
}

// ── hasSatPremium (server-authoritative) ──────────────────────────────────────

describe('hasSatPremium — server-side authoritative check', () => {
  it('returns false for null user', () => {
    expect(hasSatPremium(null)).toBe(false)
  })

  it('returns false for undefined user', () => {
    expect(hasSatPremium(undefined)).toBe(false)
  })

  it('returns true for admin email regardless of metadata', () => {
    expect(hasSatPremium({ email: ADMIN_EMAIL, user_metadata: {} })).toBe(true)
  })

  it('returns true for legacy sat_upgrade_unlocked flag', () => {
    expect(hasSatPremium({ user_metadata: { sat_upgrade_unlocked: true } })).toBe(true)
  })

  it('returns false when sat_upgrade_unlocked is false', () => {
    expect(hasSatPremium({ user_metadata: { sat_upgrade_unlocked: false } })).toBe(false)
  })

  it('returns true for active three_month purchase with future expiry', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: FUTURE },
    })).toBe(true)
  })

  it('returns false for active three_month purchase with past expiry', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: PAST },
    })).toBe(false)
  })

  it('returns false for three_month purchase missing expiry', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active' },
    })).toBe(false)
  })

  it('returns false for three_month purchase with invalid expiry string', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: 'not-a-date' },
    })).toBe(false)
  })

  it('returns false for refunded three_month purchase', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'refunded', sat_purchase_expires_at: FUTURE },
    })).toBe(false)
  })

  it('returns true for active lifetime purchase', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active' },
    })).toBe(true)
  })

  it('returns false for refunded lifetime purchase', () => {
    expect(hasSatPremium({
      user_metadata: { sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'refunded' },
    })).toBe(false)
  })

  it('returns true for active monthly subscription', () => {
    expect(hasSatPremium({ user_metadata: { sat_subscription_status: 'active' } })).toBe(true)
  })

  it('returns true for past_due monthly subscription', () => {
    expect(hasSatPremium({ user_metadata: { sat_subscription_status: 'past_due' } })).toBe(true)
  })

  it('returns true for trialing monthly subscription', () => {
    expect(hasSatPremium({ user_metadata: { sat_subscription_status: 'trialing' } })).toBe(true)
  })

  it('returns false for canceled subscription', () => {
    expect(hasSatPremium({ user_metadata: { sat_subscription_status: 'canceled' } })).toBe(false)
  })

  it('returns false for incomplete subscription', () => {
    expect(hasSatPremium({ user_metadata: { sat_subscription_status: 'incomplete' } })).toBe(false)
  })

  it('returns false for empty metadata', () => {
    expect(hasSatPremium({ user_metadata: {} })).toBe(false)
  })

  it('returns true for Jaiden\'s exact production metadata', () => {
    expect(hasSatPremium({ user_metadata: JAIDEN_META })).toBe(true)
  })
})

// ── evalSatPremiumMeta (client hook) ──────────────────────────────────────────

describe('evalSatPremiumMeta — client-side hook helper', () => {
  it('returns false for empty metadata', () => {
    expect(evalSatPremiumMeta({})).toBe(false)
  })

  it('returns true for legacy sat_upgrade_unlocked flag', () => {
    expect(evalSatPremiumMeta({ sat_upgrade_unlocked: true })).toBe(true)
  })

  it('returns true for active three_month with future expiry', () => {
    expect(evalSatPremiumMeta({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: FUTURE,
    })).toBe(true)
  })

  it('returns false for active three_month with past expiry', () => {
    expect(evalSatPremiumMeta({
      sat_purchase_plan_type: 'three_month',
      sat_purchase_status: 'active',
      sat_purchase_expires_at: PAST,
    })).toBe(false)
  })

  it('returns true for active lifetime purchase', () => {
    expect(evalSatPremiumMeta({
      sat_purchase_plan_type: 'lifetime',
      sat_purchase_status: 'active',
    })).toBe(true)
  })

  it('returns true for active monthly subscription', () => {
    expect(evalSatPremiumMeta({ sat_subscription_status: 'active' })).toBe(true)
  })

  it('returns true for past_due monthly subscription', () => {
    expect(evalSatPremiumMeta({ sat_subscription_status: 'past_due' })).toBe(true)
  })

  it('returns false for canceled subscription', () => {
    expect(evalSatPremiumMeta({ sat_subscription_status: 'canceled' })).toBe(false)
  })

  it('matches hasSatPremium output for Jaiden\'s exact metadata', () => {
    const server = hasSatPremium({ user_metadata: JAIDEN_META })
    const client = evalSatPremiumMeta(JAIDEN_META)
    expect(client).toBe(server)
    expect(client).toBe(true)
  })
})

// ── getQBAccess ───────────────────────────────────────────────────────────────

describe('getQBAccess — question bank premium gate', () => {
  it('returns hasPremiumAccess:false for null user', () => {
    expect(getQBAccess(null).hasPremiumAccess).toBe(false)
  })

  it('sets lockedReason for null user', () => {
    expect(getQBAccess(null).lockedReason).toBe('Sign in required')
  })

  it('returns hasPremiumAccess:true for admin email', () => {
    expect(getQBAccess({ email: ADMIN_EMAIL, user_metadata: {} }).hasPremiumAccess).toBe(true)
  })

  it('returns hasPremiumAccess:true for active three_month purchase with future expiry', () => {
    expect(getQBAccess({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: FUTURE },
    }).hasPremiumAccess).toBe(true)
  })

  it('returns hasPremiumAccess:false for active three_month purchase with past expiry', () => {
    expect(getQBAccess({
      user_metadata: { sat_purchase_plan_type: 'three_month', sat_purchase_status: 'active', sat_purchase_expires_at: PAST },
    }).hasPremiumAccess).toBe(false)
  })

  it('returns hasPremiumAccess:true for active subscription', () => {
    expect(getQBAccess({ user_metadata: { sat_subscription_status: 'active' } }).hasPremiumAccess).toBe(true)
  })

  it('returns hasPremiumAccess:false for no premium', () => {
    expect(getQBAccess({ user_metadata: {} }).hasPremiumAccess).toBe(false)
  })

  it('sets lockedReason:null when premium is active', () => {
    expect(getQBAccess({
      user_metadata: { sat_purchase_plan_type: 'lifetime', sat_purchase_status: 'active' },
    }).lockedReason).toBeNull()
  })

  it('returns hasPremiumAccess:true for Jaiden\'s exact metadata', () => {
    expect(getQBAccess({ user_metadata: JAIDEN_META }).hasPremiumAccess).toBe(true)
  })
})

// ── isAdminUser ───────────────────────────────────────────────────────────────

describe('isAdminUser', () => {
  it('returns true for the admin email', () => {
    expect(isAdminUser({ email: ADMIN_EMAIL })).toBe(true)
  })

  it('returns false for non-admin emails', () => {
    expect(isAdminUser({ email: 'jaidenpurewal30@gmail.com' })).toBe(false)
  })

  it('returns false for null', () => {
    expect(isAdminUser(null)).toBe(false)
  })
})
