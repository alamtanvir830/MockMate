import type { NextConfig } from "next";

// ── Security headers ──────────────────────────────────────────────────────────
// Applied to every response. Does not include Content-Security-Policy because
// the Supabase URL is dynamic per environment; add CSP via Vercel headers or
// middleware once all trusted origins are confirmed.
// See docs/security/manual-production-checklist.md for remaining manual steps.
const SECURITY_HEADERS = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Restrict referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Permissions-Policy: disable unused powerful features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.stripe.com")',
  },
  // HSTS: enforced on production; Vercel typically adds this automatically but
  // explicit declaration ensures consistent behavior.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent Cross-Origin information leakage in embedded resources
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  // Opt out of interest-cohort / FLoC
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
]

const nextConfig: NextConfig = {
  // cache bust: 2026-04-14
  // pdf-parse uses fs.readFileSync at module init time, which breaks when webpack
  // bundles it. Marking it as a server external forces Next.js to require() it at
  // runtime instead, which works correctly in the Node.js serverless environment.
  serverExternalPackages: ['pdf-parse'],

  // Disable production browser source maps so application source is not publicly
  // downloadable from the deployed URL.
  productionBrowserSourceMaps: false,

  async redirects() {
    return [
      {
        source: '/sat-rw-academy/study-plan',
        destination: '/sat-rw-academy',
        permanent: false,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
    ]
  },
};

export default nextConfig;
