#!/usr/bin/env node
// grant-sat-premium.mjs
// Grants SAT Premium access to a user by email.
// Usage: node scripts/grant-sat-premium.mjs <email>
//
// Reads SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL from .env.local

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── Load .env.local ──────────────────────────────────────────────────────────
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

// ─── Main ─────────────────────────────────────────────────────────────────────
const email = process.argv[2]?.trim().toLowerCase()
if (!email) {
  console.error('Usage: node scripts/grant-sat-premium.mjs <email>')
  process.exit(1)
}

const env = loadEnv()
const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const serviceRoleKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

console.log(`\nGranting SAT Premium to: ${email}`)

// Find user by email
const { data: { users }, error: listErr } = await admin.auth.admin.listUsers({ perPage: 1000 })
if (listErr) {
  console.error('Error listing users:', listErr.message)
  process.exit(1)
}

const user = users.find(u => u.email?.toLowerCase() === email)
if (!user) {
  console.error(`No user found with email: ${email}`)
  console.error('User must sign up at the app before premium can be granted.')
  process.exit(1)
}

console.log(`Found user: ${user.id} (${user.email})`)
console.log(`Current sat_upgrade_unlocked: ${user.user_metadata?.sat_upgrade_unlocked ?? false}`)

// Grant premium — only SAT entitlement, NOT admin
const { error: updateErr } = await admin.auth.admin.updateUserById(user.id, {
  user_metadata: {
    sat_upgrade_unlocked: true,
    sat_upgrade_unlocked_at: new Date().toISOString(),
    sat_upgrade_source: 'manual_grant',
  },
})

if (updateErr) {
  console.error('Error granting premium:', updateErr.message)
  process.exit(1)
}

// Verify
const { data: { user: updated } } = await admin.auth.admin.getUserById(user.id)
const granted = updated?.user_metadata?.sat_upgrade_unlocked === true

console.log(`\n✅ SAT Premium granted successfully`)
console.log(`   User: ${email}`)
console.log(`   User ID: ${user.id}`)
console.log(`   sat_upgrade_unlocked: ${granted}`)
console.log(`   sat_upgrade_source: ${updated?.user_metadata?.sat_upgrade_source}`)
console.log(`   Admin privileges: NONE (not granted)`)
console.log(`\nThis user can now access SAT Forms 1–5 and the SAT Question Bank.`)
