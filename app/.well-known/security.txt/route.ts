import { NextResponse } from 'next/server'

// RFC 9116 — security.txt
// Served at /.well-known/security.txt
// Tells security researchers how to report vulnerabilities.

export const dynamic = 'force-static'

export function GET() {
  const expiry = new Date()
  expiry.setFullYear(expiry.getFullYear() + 1)

  const body = [
    'Contact: mailto:ranvi.contact@gmail.com',
    'Preferred-Languages: en',
    `Expires: ${expiry.toISOString().replace(/\.\d{3}Z$/, 'Z')}`,
    'Canonical: https://mockmateapp.com/.well-known/security.txt',
    'Policy: https://mockmateapp.com/privacy',
  ].join('\n') + '\n'

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
