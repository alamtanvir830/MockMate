/**
 * Diagnostic script: inspect the exact OAuth parameters Supabase sends to Google.
 *
 * Usage:
 *   npx tsx scripts/diagnose-google-oauth.ts
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
 * from .env.local (or environment). Never prints secrets, tokens, or codes.
 */

// Run with: node --env-file=.env.local --import=tsx/esm scripts/diagnose-google-oauth.ts
// Or:        npx tsx --env-file=.env.local scripts/diagnose-google-oauth.ts (tsx >=4.x)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const EXPECTED_CLIENT_ID =
  '1066297444321-g6erbfsdnouvsukiko2iqh3klddovcof.apps.googleusercontent.com'
// The correct URI is derived from the actual project ref, not a hardcoded guess.
const MOCKMATE_CALLBACK = 'https://www.mockmateapp.com/auth/callback'

async function main() {
  if (!SUPABASE_URL) {
    console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL is not set.')
    process.exit(1)
  }

  const supabaseOrigin = new URL(SUPABASE_URL).origin
  const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0]
  const expectedSupabaseCallback = `${supabaseOrigin}/auth/v1/callback`

  console.log('================================================')
  console.log('MockMate — Google OAuth Diagnostic')
  console.log('================================================')
  console.log()
  console.log('Supabase project ref :', projectRef)
  console.log('Supabase origin      :', supabaseOrigin)
  console.log('Expected callback URI:', expectedSupabaseCallback)
  console.log()

  // ── 1. Check Google provider is enabled ──────────────────────────────────
  console.log('--- Checking Google provider status ---')
  const settingsUrl = `${supabaseOrigin}/auth/v1/settings`
  let settingsRes: Response
  try {
    settingsRes = await fetch(settingsUrl, {
      headers: {
        // anon key not required for /settings on most Supabase versions but try without first
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('Failed to reach Supabase settings endpoint:', err)
    process.exit(1)
  }

  if (settingsRes.status === 404) {
    console.log('Settings endpoint: 404 (expected on newer Supabase versions)')
  } else if (settingsRes.ok) {
    const settings = await settingsRes.json() as Record<string, unknown>
    const external = settings.external as Record<string, { enabled?: boolean }> | undefined
    const googleEnabled = external?.google?.enabled
    console.log(
      'Google provider enabled:',
      googleEnabled === true ? 'YES' : googleEnabled === false ? 'NO' : 'unknown',
    )
  } else {
    console.log(`Settings endpoint returned HTTP ${settingsRes.status} (auth required — skipping)`)
  }

  console.log()

  // ── 2. Generate the OAuth authorization URL ───────────────────────────────
  console.log('--- Generating OAuth authorization URL ---')
  const authorizeUrl = `${supabaseOrigin}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(MOCKMATE_CALLBACK)}`
  let authRes: Response
  try {
    authRes = await fetch(authorizeUrl, { redirect: 'manual' })
  } catch (err) {
    console.error('Failed to reach Supabase authorize endpoint:', err)
    process.exit(1)
  }

  const location = authRes.headers.get('location')
  if (!location) {
    console.error(`Supabase /auth/v1/authorize returned HTTP ${authRes.status} with no Location header.`)
    console.error('This usually means Google is not enabled in the Supabase provider settings.')
    process.exit(1)
  }

  const googleUrl = new URL(location)
  const params = googleUrl.searchParams

  const actualClientId   = params.get('client_id')   ?? 'NOT FOUND'
  const actualRedirectUri = decodeURIComponent(params.get('redirect_uri') ?? 'NOT FOUND')
  const actualRedirectTo  = decodeURIComponent(params.get('redirect_to')  ?? 'NOT FOUND')

  console.log()
  console.log('================================================')
  console.log('ACTUAL VALUES SENT TO GOOGLE')
  console.log('================================================')
  console.log()
  console.log('Google auth host  :', googleUrl.origin + googleUrl.pathname)
  console.log('client_id         :', actualClientId)
  console.log('redirect_uri      :', actualRedirectUri)
  console.log('redirect_to       :', actualRedirectTo)
  console.log()

  // ── 3. Compare against expected values ───────────────────────────────────
  console.log('================================================')
  console.log('COMPARISON')
  console.log('================================================')
  console.log()

  const clientIdMatch = actualClientId === EXPECTED_CLIENT_ID
  console.log('client_id matches expected?')
  console.log('  expected :', EXPECTED_CLIENT_ID)
  console.log('  actual   :', actualClientId)
  console.log('  result   :', clientIdMatch ? '✓ MATCH' : '✗ MISMATCH — Supabase is serving a different Google Client ID than the intended Google Cloud OAuth client.')
  console.log()

  const redirectUriMatch = actualRedirectUri === expectedSupabaseCallback
  console.log('redirect_uri matches expected Supabase callback?')
  console.log('  expected :', expectedSupabaseCallback)
  console.log('  actual   :', actualRedirectUri)
  console.log('  result   :', redirectUriMatch ? '✓ MATCH' : '✗ MISMATCH')

  if (!redirectUriMatch) {
    console.log()
    console.log('  Char-by-char diff:')
    const a = expectedSupabaseCallback
    const b = actualRedirectUri
    const len = Math.max(a.length, b.length)
    const diffs: string[] = []
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        diffs.push(`  position ${i}: expected ${JSON.stringify(a[i] ?? '<end>')} got ${JSON.stringify(b[i] ?? '<end>')}`)
      }
    }
    diffs.forEach(d => console.log(d))
  }

  console.log()

  // ── 4. Verdict ───────────────────────────────────────────────────────────
  console.log('================================================')
  console.log('VERDICT')
  console.log('================================================')
  console.log()

  if (!clientIdMatch) {
    console.log('ROOT CAUSE: Supabase is sending a different Google Client ID than expected.')
    console.log('ACTION    : Re-enter the correct Client ID and Secret in:')
    console.log('            Supabase Dashboard → Authentication → Providers → Google')
    console.log()
    console.log('Do NOT hardcode the Client ID or Secret in MockMate source code.')
  } else if (!redirectUriMatch) {
    console.log('ROOT CAUSE: redirect_uri mismatch.')
    console.log()
    console.log('Supabase sends this redirect URI to Google:')
    console.log('  ', actualRedirectUri)
    console.log()
    console.log('This URI must be added EXACTLY to Google Cloud Console:')
    console.log('  APIs & Services → Credentials → [your OAuth client] → Authorized redirect URIs')
    console.log()
    console.log('Note: check for invisible whitespace, trailing slash, or extra/missing characters.')
  } else {
    console.log('Client ID: MATCHES ✓')
    console.log('Redirect URI: MATCHES ✓')
    console.log()
    console.log('Both values are correct. If redirect_uri_mismatch still occurs:')
    console.log('  1. Verify the Google Cloud OAuth client is in the correct Google Cloud project.')
    console.log('  2. Verify the OAuth client is not in test-only mode with unverified users.')
    console.log('  3. Google propagates URI changes in seconds — confirm the exact saved value.')
    console.log('  4. Try clearing browser cache and retry.')
  }

  console.log()
}

main().catch(err => {
  console.error('Diagnostic failed unexpectedly:', err)
  process.exit(1)
})
