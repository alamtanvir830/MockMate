#!/usr/bin/env node
/**
 * reconcile-sat-premium-user.mjs
 *
 * Reconciles a user's SAT Premium entitlement against their verified Stripe
 * transaction history. Useful when the webhook missed an event, wrote to the
 * wrong table, or a race condition left user_metadata stale.
 *
 * Usage:
 *   node scripts/reconcile-sat-premium-user.mjs --email <email> [--dry-run]
 *   node scripts/reconcile-sat-premium-user.mjs --email <email> --apply
 *
 * Flags:
 *   --email <email>   Required. The user's email address.
 *   --dry-run         Default. Show what would change without writing anything.
 *   --apply           Write changes to Supabase and upsert tables.
 *
 * Security constraints enforced:
 *   - Never grants admin access (ranvi.contact@gmail.com is the only admin — immutable)
 *   - Never grants premium for refunded or unpaid transactions
 *   - Never trusts client-supplied data — all entitlement comes from Stripe API
 *   - kurbanov.muhammadali23@gmail.com is always blocked from premium
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── Blocked accounts (cannot be granted premium via any path) ───────────────

const BLOCKED_EMAILS = new Set([
  'kurbanov.muhammadali23@gmail.com',
])

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

// ─── .env.local loader ───────────────────────────────────────────────────────

function loadEnv() {
  const env = {}
  const envPath = resolve(root, '.env.local')
  try {
    const raw = readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx < 0) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      env[key] = val
    }
  } catch {
    console.error('Could not read .env.local — make sure it exists at project root')
    process.exit(1)
  }
  return env
}

// ─── Arg parsing ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
let email = null
let apply = false

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--email' && args[i + 1]) {
    email = args[++i].trim().toLowerCase()
  } else if (args[i] === '--apply') {
    apply = true
  } else if (args[i] === '--dry-run') {
    apply = false
  }
}

if (!email) {
  console.error('Usage: node scripts/reconcile-sat-premium-user.mjs --email <email> [--dry-run | --apply]')
  process.exit(1)
}

// ─── Boot clients ─────────────────────────────────────────────────────────────

const env = loadEnv()
const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const serviceRoleKey = env['SUPABASE_SERVICE_ROLE_KEY']
const stripeSecretKey = env['STRIPE_SECRET_KEY']

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}
if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY in .env.local — needed to verify purchase history')
  process.exit(1)
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' })

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveId(obj) {
  if (!obj) return null
  return typeof obj === 'string' ? obj : obj.id
}

function toIso(unix) {
  return unix ? new Date(unix * 1000).toISOString() : null
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`\n=== SAT Premium Reconciliation ===`)
console.log(`Email : ${email}`)
console.log(`Mode  : ${apply ? 'APPLY (writes changes)' : 'DRY-RUN (no changes written)'}`)
console.log()

// 1. Safety checks
if (email === ADMIN_EMAIL) {
  console.error('ERROR: Cannot reconcile the admin account — admins have inherent access and no premium metadata should be set.')
  process.exit(1)
}

if (BLOCKED_EMAILS.has(email)) {
  console.error(`ERROR: ${email} is permanently blocked from receiving premium access.`)
  process.exit(1)
}

// 2. Find user in Supabase
console.log('Step 1: Finding user in Supabase...')
const { data: { users }, error: listErr } = await admin.auth.admin.listUsers({ perPage: 1000 })
if (listErr) {
  console.error('Error listing users:', listErr.message)
  process.exit(1)
}

const user = users.find(u => u.email?.toLowerCase() === email)
if (!user) {
  console.error(`No Supabase user found with email: ${email}`)
  console.error('The user must sign up at the app before reconciliation can run.')
  process.exit(1)
}

console.log(`  Found: ${user.id} (${user.email})`)
const meta = user.user_metadata ?? {}
console.log()
console.log('Current user_metadata:')
const relevantKeys = [
  'sat_upgrade_unlocked', 'sat_upgrade_unlocked_at', 'sat_upgrade_source',
  'sat_subscription_status', 'sat_subscription_id', 'sat_subscription_period_end', 'sat_cancel_at_period_end',
  'sat_purchase_plan_type', 'sat_purchase_status', 'sat_purchase_expires_at', 'sat_purchase_started_at',
  'stripe_customer_id',
]
for (const key of relevantKeys) {
  if (meta[key] !== undefined) {
    console.log(`  ${key}: ${JSON.stringify(meta[key])}`)
  }
}

const hasCurrentPremium =
  meta.sat_upgrade_unlocked === true ||
  (meta.sat_purchase_status === 'active') ||
  ['active', 'past_due', 'trialing'].includes(meta.sat_subscription_status ?? '')

console.log(`\n  Current premium status: ${hasCurrentPremium ? 'ACTIVE' : 'NOT ACTIVE'}`)
console.log()

// 3. Find Stripe customer
console.log('Step 2: Looking up Stripe customer...')

let stripeCustomerId = meta.stripe_customer_id ?? null
let stripeCustomer = null

if (stripeCustomerId) {
  try {
    const existing = await stripe.customers.retrieve(stripeCustomerId)
    if (!existing.deleted) {
      stripeCustomer = existing
      console.log(`  Found by stored customer ID: ${stripeCustomerId}`)
    } else {
      console.log(`  Stored customer ID ${stripeCustomerId} has been deleted in Stripe`)
      stripeCustomerId = null
    }
  } catch {
    console.log(`  Could not retrieve stored customer ID ${stripeCustomerId}`)
    stripeCustomerId = null
  }
}

if (!stripeCustomer) {
  const { data: customers } = await stripe.customers.list({ email, limit: 5 })
  if (customers.length === 0) {
    console.log('  No Stripe customer found for this email.')
    console.log()
    console.log('Result: No Stripe transaction history found — nothing to reconcile.')
    console.log('If this user should have premium, check Stripe dashboard manually.')
    process.exit(0)
  }

  // Use the most recently created non-deleted customer
  const active = customers.filter(c => !c.deleted)
  if (active.length === 0) {
    console.log('  All Stripe customers for this email have been deleted.')
    process.exit(0)
  }

  stripeCustomer = active[0]
  stripeCustomerId = stripeCustomer.id
  console.log(`  Found by email search: ${stripeCustomerId}${active.length > 1 ? ` (${active.length} customers found — using most recent)` : ''}`)
}

console.log()

// 4. Check subscriptions
console.log('Step 3: Checking Stripe subscriptions...')
const { data: subscriptions } = await stripe.subscriptions.list({
  customer: stripeCustomerId,
  limit: 10,
})

const activeSubscriptions = subscriptions.filter(s =>
  ['active', 'trialing', 'past_due'].includes(s.status)
)

console.log(`  Total subscriptions: ${subscriptions.length}`)
console.log(`  Active/trialing/past_due: ${activeSubscriptions.length}`)

// 5. Check one-time payments
console.log()
console.log('Step 4: Checking Stripe payment intents (one-time purchases)...')
const { data: paymentIntents } = await stripe.paymentIntents.list({
  customer: stripeCustomerId,
  limit: 20,
})

const paidOneTime = paymentIntents.filter(pi =>
  pi.status === 'succeeded' &&
  (pi.metadata?.product_key === 'sat_premium' || pi.metadata?.product === 'sat_upgrade_999')
)

const refundedPiIds = new Set()
for (const pi of paymentIntents) {
  if (pi.status === 'succeeded' && pi.amount_received > 0) {
    // Check for full refunds
    const charges = await stripe.charges.list({ payment_intent: pi.id, limit: 5 })
    for (const charge of charges.data) {
      if (charge.refunded) refundedPiIds.add(pi.id)
    }
  }
}

const validOneTime = paidOneTime.filter(pi => !refundedPiIds.has(pi.id))

console.log(`  SAT Premium payment intents (succeeded): ${paidOneTime.length}`)
console.log(`  After filtering refunded: ${validOneTime.length}`)

console.log()
console.log('=== Reconciliation Plan ===')
console.log()

// ─── Determine what to do ───────────────────────────────────────────────────

let actionTaken = false

// Case A: Active subscription
if (activeSubscriptions.length > 0) {
  const sub = activeSubscriptions[0]
  const priceId = sub.items.data[0]?.price?.id ?? 'unknown'

  const proposedMeta = {
    sat_subscription_status: sub.status,
    sat_subscription_id: sub.id,
    sat_subscription_period_end: toIso(sub.current_period_end),
    sat_cancel_at_period_end: sub.cancel_at_period_end,
    stripe_customer_id: stripeCustomerId,
  }

  console.log(`Found active subscription: ${sub.id}`)
  console.log(`  Status: ${sub.status}`)
  console.log(`  Price ID: ${priceId}`)
  console.log(`  Period end: ${toIso(sub.current_period_end)}`)
  console.log(`  Cancel at period end: ${sub.cancel_at_period_end}`)
  console.log()
  console.log('Proposed user_metadata update:')
  for (const [k, v] of Object.entries(proposedMeta)) {
    const current = meta[k]
    const changed = JSON.stringify(current) !== JSON.stringify(v)
    console.log(`  ${k}: ${JSON.stringify(current)} → ${JSON.stringify(v)}${changed ? ' [CHANGED]' : ' [unchanged]'}`)
  }

  if (apply) {
    console.log()
    console.log('Applying subscription upsert to sat_premium_subscriptions...')
    const { error: upsertErr } = await admin
      .from('sat_premium_subscriptions')
      .upsert(
        {
          user_id: user.id,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: sub.id,
          stripe_price_id: priceId,
          status: sub.status,
          current_period_end: toIso(sub.current_period_end),
          cancel_at_period_end: sub.cancel_at_period_end,
          canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
          ended_at: sub.ended_at ? new Date(sub.ended_at * 1000).toISOString() : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'stripe_subscription_id' }
      )

    if (upsertErr) {
      console.error('  sat_premium_subscriptions upsert error:', upsertErr.message)
    } else {
      console.log('  sat_premium_subscriptions: upserted ✓')
    }

    console.log('Applying user_metadata update...')
    const { error: metaErr } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: proposedMeta,
    })

    if (metaErr) {
      console.error('  user_metadata update error:', metaErr.message)
      process.exit(1)
    }

    console.log('  user_metadata: updated ✓')
    actionTaken = true
  }
}

// Case B: No active subscription — check one-time purchases
else if (validOneTime.length > 0) {
  const pi = validOneTime[0]
  const planType = pi.metadata?.plan_type ?? 'lifetime'
  const isValidPlanType = planType === 'three_month' || planType === 'lifetime'

  if (!isValidPlanType) {
    console.log(`Note: payment intent ${pi.id} has plan_type="${planType}" (not a recognized one-time plan — treating as lifetime).`)
  }

  const resolvedPlanType = isValidPlanType ? planType : 'lifetime'

  // Find the associated checkout session for accurate dates
  let accessStartedAt = new Date(pi.created * 1000).toISOString()
  let accessExpiresAt = null

  if (resolvedPlanType === 'three_month') {
    const expiry = new Date(pi.created * 1000)
    expiry.setMonth(expiry.getMonth() + 3)
    accessExpiresAt = expiry.toISOString()

    // If already expired, warn
    if (expiry < new Date()) {
      console.log(`WARNING: Three-month purchase ${pi.id} would have expired on ${expiry.toISOString()}.`)
      console.log('Granting it now would give an already-expired timestamp. Verify with Stripe before applying.')
      if (apply) {
        console.log('Skipping apply — expired three_month purchase. Review manually.')
        process.exit(1)
      }
    }
  }

  // Find checkout session for this payment intent (to get the session ID for idempotency)
  let checkoutSessionId = null
  const { data: sessions } = await stripe.checkout.sessions.list({ payment_intent: pi.id, limit: 5 })
  if (sessions.length > 0) checkoutSessionId = sessions[0].id

  const proposedMeta = {
    sat_purchase_plan_type: resolvedPlanType,
    sat_purchase_status: 'active',
    sat_purchase_expires_at: accessExpiresAt,
    sat_purchase_started_at: accessStartedAt,
    stripe_customer_id: stripeCustomerId,
  }

  console.log(`Found paid one-time purchase: ${pi.id}`)
  console.log(`  Plan type: ${resolvedPlanType}`)
  console.log(`  Payment date: ${accessStartedAt}`)
  if (accessExpiresAt) console.log(`  Expires at: ${accessExpiresAt}`)
  if (checkoutSessionId) console.log(`  Checkout session: ${checkoutSessionId}`)
  console.log()
  console.log('Proposed user_metadata update:')
  for (const [k, v] of Object.entries(proposedMeta)) {
    const current = meta[k]
    const changed = JSON.stringify(current) !== JSON.stringify(v)
    console.log(`  ${k}: ${JSON.stringify(current)} → ${JSON.stringify(v)}${changed ? ' [CHANGED]' : ' [unchanged]'}`)
  }

  if (apply) {
    if (checkoutSessionId) {
      console.log()
      console.log('Upserting sat_premium_purchases...')
      const { error: purchaseErr } = await admin
        .from('sat_premium_purchases')
        .upsert(
          {
            user_id: user.id,
            plan_type: resolvedPlanType,
            status: 'active',
            stripe_customer_id: stripeCustomerId,
            stripe_checkout_session_id: checkoutSessionId,
            stripe_payment_intent_id: pi.id,
            access_started_at: accessStartedAt,
            access_expires_at: accessExpiresAt,
          },
          { onConflict: 'stripe_checkout_session_id' }
        )

      if (purchaseErr) {
        console.error('  sat_premium_purchases upsert error:', purchaseErr.message)
      } else {
        console.log('  sat_premium_purchases: upserted ✓')
      }
    } else {
      console.log('  No checkout session found — skipping sat_premium_purchases upsert')
    }

    console.log('Applying user_metadata update...')
    const { error: metaErr } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: proposedMeta,
    })

    if (metaErr) {
      console.error('  user_metadata update error:', metaErr.message)
      process.exit(1)
    }

    console.log('  user_metadata: updated ✓')
    actionTaken = true
  }
}

// Case C: Legacy one-time payment (sat_upgrade_999)
else {
  const legacy = paymentIntents.find(pi =>
    pi.status === 'succeeded' &&
    pi.metadata?.product === 'sat_upgrade_999' &&
    !refundedPiIds.has(pi.id)
  )

  if (legacy) {
    console.log(`Found legacy SAT Premium payment: ${legacy.id}`)
    console.log()
    console.log('Proposed user_metadata update (legacy unlock):')
    const proposed = {
      sat_upgrade_unlocked: true,
      sat_upgrade_unlocked_at: meta.sat_upgrade_unlocked_at ?? new Date(legacy.created * 1000).toISOString(),
      stripe_customer_id: stripeCustomerId,
      stripe_payment_intent_id: legacy.id,
    }
    for (const [k, v] of Object.entries(proposed)) {
      const current = meta[k]
      const changed = JSON.stringify(current) !== JSON.stringify(v)
      console.log(`  ${k}: ${JSON.stringify(current)} → ${JSON.stringify(v)}${changed ? ' [CHANGED]' : ' [unchanged]'}`)
    }

    if (apply) {
      const { error: metaErr } = await admin.auth.admin.updateUserById(user.id, {
        user_metadata: proposed,
      })
      if (metaErr) {
        console.error('  user_metadata update error:', metaErr.message)
        process.exit(1)
      }
      console.log('  user_metadata: updated ✓')
      actionTaken = true
    }
  } else {
    console.log('No paid, non-refunded SAT Premium transactions found in Stripe.')
    console.log('Nothing to reconcile — verify this user actually completed a purchase.')
    process.exit(0)
  }
}

console.log()
if (apply && actionTaken) {
  // Verify the result
  const { data: { user: updated } } = await admin.auth.admin.getUserById(user.id)
  const updatedMeta = updated?.user_metadata ?? {}
  const nowHasPremium =
    updatedMeta.sat_upgrade_unlocked === true ||
    (updatedMeta.sat_purchase_status === 'active') ||
    ['active', 'past_due', 'trialing'].includes(updatedMeta.sat_subscription_status ?? '')

  console.log(`=== Result ===`)
  console.log(`Premium status after update: ${nowHasPremium ? 'ACTIVE ✓' : 'STILL NOT ACTIVE — investigate manually'}`)
  if (!nowHasPremium) process.exit(1)
} else if (!apply) {
  console.log('DRY-RUN complete — no changes written.')
  console.log('Re-run with --apply to execute.')
}
