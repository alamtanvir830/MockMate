import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code      = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type      = searchParams.get('type') as EmailOtpType | null
  const next      = searchParams.get('next') ?? '/dashboard'
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
