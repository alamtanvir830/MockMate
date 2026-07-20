import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripe } from '@/lib/stripe/client'
import { isAdminUser } from '@/lib/auth/server'

export async function POST(_req: NextRequest) {
  try {
    // ── 1. Authenticate ────────────────────────────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: 'You must be signed in.' }, { status: 401 })
    }

    if (isAdminUser(user)) {
      return Response.json({ error: 'Admin accounts do not have a billing portal.' }, { status: 400 })
    }

    // ── 2. Resolve the Stripe Customer ID from trusted server-side storage ──
    // Read from admin API to bypass JWT staleness.
    const admin = createAdminClient()
    const { data: freshData } = await admin.auth.admin.getUserById(user.id)
    const meta = (freshData?.user?.user_metadata ?? user.user_metadata ?? {}) as Record<string, unknown>

    const stripeCustomerId = meta.stripe_customer_id as string | undefined
    if (!stripeCustomerId) {
      return Response.json(
        { error: 'No billing account found. Please subscribe first.' },
        { status: 404 }
      )
    }

    // ── 3. Create the Stripe Customer Portal session ────────────────────────
    const stripe = getStripe()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/billing`,
    })

    return Response.json({ url: portalSession.url })
  } catch (err) {
    console.error('[stripe] create-portal-session error', err)
    return Response.json({ error: 'Failed to open billing portal.' }, { status: 500 })
  }
}
