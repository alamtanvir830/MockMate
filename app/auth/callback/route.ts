import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'
  const hasError = searchParams.get('error')

  console.log('[auth/callback]', {
    hasCode: !!code,
    hasTokenHash: !!tokenHash,
    type,
    next,
    hasError: !!hasError,
  })

  if (hasError) {
    console.error('[auth/callback] Supabase returned error param:', hasError)
    return NextResponse.redirect(new URL('/login?error=confirmation_failed', origin))
  }

  const supabase = await createClient()

  // PKCE flow — Supabase redirects here with ?code=...
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('[auth/callback] PKCE exchange:', {
      success: !error,
      userEmail: data?.user?.email ?? null,
      error: error?.message ?? null,
    })
    if (!error) {
      return NextResponse.redirect(new URL(next, origin))
    }
    // If code exchange fails (e.g. code_verifier missing because link was opened
    // in a different browser), fall through to login with a friendly message.
    return NextResponse.redirect(
      new URL('/login?error=link_expired', origin),
    )
  }

  // Token hash flow — Supabase redirects here with ?token_hash=...&type=...
  if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    console.log('[auth/callback] OTP verify:', {
      success: !error,
      userEmail: data?.user?.email ?? null,
      error: error?.message ?? null,
    })
    if (!error) {
      return NextResponse.redirect(new URL(next, origin))
    }
    return NextResponse.redirect(
      new URL('/login?error=link_expired', origin),
    )
  }

  console.warn('[auth/callback] No code or token_hash in URL')
  return NextResponse.redirect(new URL('/login?error=confirmation_failed', origin))
}
