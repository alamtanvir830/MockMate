import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { EmailOtpType } from '@supabase/supabase-js'

/**
 * Validates that a redirect destination is a safe relative path to prevent open redirects.
 * Rejects absolute URLs, protocol-relative URLs, and scheme-like patterns.
 */
function safeRedirect(next: string | null): string {
  if (!next) return '/dashboard'
  // Must be a relative path starting with / but not //
  if (!next.startsWith('/') || next.startsWith('//')) return '/dashboard'
  // Reject anything resembling a URI scheme (e.g. javascript:, data:, https:)
  if (/[a-zA-Z][a-zA-Z0-9+\-.]*:/.test(next)) return '/dashboard'
  return next
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code      = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type      = searchParams.get('type') as EmailOtpType | null
  const next      = safeRedirect(searchParams.get('next'))
  const hasError  = searchParams.get('error')

  // Is this a password-reset callback? (type=recovery OR next was set to /reset-password)
  const isRecovery = type === 'recovery' || next === '/reset-password'

  console.log('[auth/callback]', {
    hasCode: !!code,
    hasTokenHash: !!tokenHash,
    type,
    next,
    isRecovery,
    hasError: !!hasError,
  })

  // Supabase forwarded an error — route to the right recovery page
  if (hasError) {
    console.error('[auth/callback] error from Supabase:', hasError, searchParams.get('error_description'))
    if (isRecovery) {
      return NextResponse.redirect(new URL('/forgot-password?error=link_expired', origin))
    }
    return NextResponse.redirect(new URL('/login?error=link_expired', origin))
  }

  const supabase = await createClient()

  // PKCE flow — ?code=...
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user: cbUser } } = await supabase.auth.getUser()

      // Belt-and-suspenders: ensure a profile row exists. The DB trigger handles
      // this at account-creation time; this is a non-fatal fallback only.
      if (cbUser) {
        try {
          const provider = cbUser.app_metadata?.provider as string | undefined
          const fullName = (cbUser.user_metadata?.full_name as string | undefined)
            ?? (cbUser.user_metadata?.name as string | undefined)
            ?? null
          const admin = createAdminClient()
          await admin.from('profiles').upsert(
            {
              id: cbUser.id,
              email: cbUser.email ?? null,
              full_name: fullName,
              used_google_auth: provider === 'google',
            },
            { onConflict: 'id', ignoreDuplicates: true },
          )
        } catch { /* non-fatal: trigger already created the profile */ }
      }

      // Form 3 now uses a global promotional window — no per-user initialization needed.
      return NextResponse.redirect(new URL(next, origin))
    }
    console.error('[auth/callback] PKCE exchange failed:', error.message)
    return NextResponse.redirect(
      new URL(isRecovery ? '/forgot-password?error=link_expired' : '/login?error=link_expired', origin),
    )
  }

  // OTP / token-hash flow — ?token_hash=...&type=...
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) {
      // Recovery OTP always lands on the reset-password page
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/reset-password', origin))
      }
      // Form 3 now uses a global promotional window — no per-user initialization needed.
      return NextResponse.redirect(new URL(next, origin))
    }
    console.error('[auth/callback] OTP verify failed:', error.message)
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/forgot-password?error=link_expired', origin))
    }
    return NextResponse.redirect(new URL('/login?error=link_expired', origin))
  }

  console.warn('[auth/callback] no code or token_hash in URL')
  return NextResponse.redirect(new URL('/login?error=link_expired', origin))
}
