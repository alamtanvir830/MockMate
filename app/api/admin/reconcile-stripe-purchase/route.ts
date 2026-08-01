import { NextRequest, NextResponse } from 'next/server'
import { timingSafeStringEqual } from '@/lib/auth/timingSafeCompare'
import { getStripe } from '@/lib/stripe/client'
import { SAT_PREMIUM_PLANS, isOneTimePlanKey } from '@/lib/stripe/sat-premium-plans'
import { recordOneTimePurchase } from '@/lib/entitlements'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/admin/reconcile-stripe-purchase
// Header: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
// Body: { "checkoutSessionId": "cs_..." }
//
// Retrieves a Stripe checkout session and replays the one-time purchase
// entitlement grant. Safe to call multiple times for the same session.
// Does NOT trust userId from the request body — always resolves from Stripe metadata.
export async function POST(req: NextRequest) {
  // ── Auth ───────────────────────────────────────────────────────────────────
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (!timingSafeStringEqual(token, process.env.SUPABASE_SERVICE_ROLE_KEY)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Parse body ─────────────────────────────────────────────────────────────
  let body: { checkoutSessionId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const checkoutSessionId = (body.checkoutSessionId ?? '').trim()
  if (!checkoutSessionId || !checkoutSessionId.startsWith('cs_')) {
    return NextResponse.json(
      { error: 'checkoutSessionId is required and must be a Stripe checkout session ID (cs_...)' },
      { status: 400 }
    )
  }

  // ── Retrieve session from Stripe ────────────────────────────────────────────
  const stripe = getStripe()
  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>
  try {
    session = await stripe.checkout.sessions.retrieve(checkoutSessionId)
  } catch (err) {
    console.error('[reconcile] failed to retrieve Stripe session', checkoutSessionId, err)
    return NextResponse.json(
      { error: 'Failed to retrieve checkout session from Stripe', details: String(err) },
      { status: 502 }
    )
  }

  // ── Verify payment completed ────────────────────────────────────────────────
  if (session.payment_status !== 'paid') {
    return NextResponse.json(
      {
        success: false,
        sessionId: checkoutSessionId,
        note: `Session payment_status is "${session.payment_status}" — access not granted`,
      },
      { status: 422 }
    )
  }

  // ── Resolve user ID from trusted Stripe metadata ─────────────────────────────
  const userId = session.metadata?.mockmate_user_id
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        sessionId: checkoutSessionId,
        note: 'No mockmate_user_id in session metadata — cannot resolve user',
      },
      { status: 422 }
    )
  }

  // ── Verify plan_type ───────────────────────────────────────────────────────
  const planType = session.metadata?.plan_type
  if (!isOneTimePlanKey(planType)) {
    return NextResponse.json(
      {
        success: false,
        sessionId: checkoutSessionId,
        userId,
        note: `plan_type "${planType}" is not a valid one-time plan key`,
      },
      { status: 422 }
    )
  }

  // ── Verify paid price matches server-configured Price ID ───────────────────
  const expectedPriceId = SAT_PREMIUM_PLANS[planType].priceId
  if (!expectedPriceId) {
    return NextResponse.json(
      {
        success: false,
        sessionId: checkoutSessionId,
        userId,
        planType,
        note: `Price ID for plan "${planType}" is not configured on this server`,
      },
      { status: 500 }
    )
  }

  let priceVerified = false
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSessionId, { limit: 10 })
    priceVerified = lineItems.data.some(li => li.price?.id === expectedPriceId)
  } catch (err) {
    console.error('[reconcile] failed to list line items', checkoutSessionId, err)
    return NextResponse.json(
      { error: 'Failed to verify line items from Stripe', details: String(err) },
      { status: 502 }
    )
  }

  if (!priceVerified) {
    return NextResponse.json(
      {
        success: false,
        sessionId: checkoutSessionId,
        userId,
        planType,
        note: `Paid price does not match expected Price ID for plan "${planType}" — access not granted`,
      },
      { status: 422 }
    )
  }

  // ── Compute expiry ─────────────────────────────────────────────────────────
  const accessStartedAt = new Date()
  let accessExpiresAt: Date | null = null
  if (planType === 'three_month') {
    accessExpiresAt = new Date(accessStartedAt)
    accessExpiresAt.setMonth(accessExpiresAt.getMonth() + 3)
  }

  // Resolve Stripe IDs from the session object
  function resolveId(obj: string | { id: string } | null | undefined): string | null {
    if (!obj) return null
    return typeof obj === 'string' ? obj : obj.id
  }
  const paymentIntentId = resolveId(session.payment_intent)
  const customerId = resolveId(session.customer)

  // ── Grant entitlement ──────────────────────────────────────────────────────
  // Try recordOneTimePurchase first (writes audit row + user_metadata).
  // If the table doesn't exist yet, fall back to writing user_metadata directly.
  let note: string
  try {
    const recorded = await recordOneTimePurchase(userId, {
      planType,
      stripeCustomerId: customerId ?? undefined,
      stripeCheckoutSessionId: checkoutSessionId,
      stripePaymentIntentId: paymentIntentId ?? undefined,
      accessStartedAt,
      accessExpiresAt,
    })
    note = recorded
      ? `Purchase recorded via sat_premium_purchases; user_metadata updated`
      : `Session already processed (idempotent) — user_metadata already set`
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    const isTableMissing =
      errMsg.includes('sat_premium_purchases') ||
      errMsg.includes('relation') ||
      errMsg.includes('does not exist')

    if (isTableMissing) {
      // Table migration not yet applied — write directly to user_metadata
      console.warn(
        '[reconcile] sat_premium_purchases table missing; writing user_metadata directly',
        err
      )
      try {
        const admin = createAdminClient()
        await admin.auth.admin.updateUserById(userId, {
          user_metadata: {
            sat_purchase_plan_type: planType,
            sat_purchase_status: 'active',
            sat_purchase_expires_at: accessExpiresAt?.toISOString() ?? null,
            sat_purchase_started_at: accessStartedAt.toISOString(),
            stripe_customer_id: customerId ?? undefined,
          },
        })
        note =
          'sat_premium_purchases table missing — wrote user_metadata directly (run migration to persist audit row)'
      } catch (metaErr) {
        console.error('[reconcile] failed to write user_metadata directly', metaErr)
        return NextResponse.json(
          { error: 'Failed to grant entitlement', details: String(metaErr) },
          { status: 500 }
        )
      }
    } else {
      console.error('[reconcile] recordOneTimePurchase failed', err)
      return NextResponse.json(
        { error: 'Failed to record purchase', details: errMsg },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({
    success: true,
    userId,
    planType,
    sessionId: checkoutSessionId,
    accessExpiresAt: accessExpiresAt?.toISOString() ?? null,
    note,
  })
}
