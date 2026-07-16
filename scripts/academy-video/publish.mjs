#!/usr/bin/env node
/**
 * Publishes a rendered video to Supabase Storage and upserts its database record.
 *
 * Prerequisites:
 *   1. node scripts/academy-video/validate.mjs --video <key>   (must pass)
 *   2. node scripts/academy-video/narrate.mjs --video <key>    (generates narration.mp3)
 *   3. Render the video to out/<video-key>/lesson.mp4 using your renderer
 *   4. Run this script to upload and register
 *
 * Usage:
 *   node scripts/academy-video/publish.mjs --video complete-sentences --mp4 ./out/lesson.mp4 [--captions ./captions.vtt]
 *
 * Required env variables:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ACADEMY_VIDEO_STORAGE_BUCKET   (defaults to sat-rw-academy-videos)
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '../..')

const getArg = (flag) =>
  process.argv.find((_, i) => process.argv[i - 1] === flag) ?? null

const videoArg = getArg('--video')
const mp4Path = getArg('--mp4')
const captionsOverride = getArg('--captions')
const dryRun = process.argv.includes('--dry-run')

if (!videoArg || !mp4Path) {
  console.error('Usage: node scripts/academy-video/publish.mjs --video <key> --mp4 <path> [--captions <path>] [--dry-run]')
  process.exit(1)
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET = process.env.ACADEMY_VIDEO_STORAGE_BUCKET ?? 'sat-rw-academy-videos'

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.')
  process.exit(1)
}

if (!existsSync(mp4Path)) {
  console.error(`MP4 not found: ${mp4Path}`)
  process.exit(1)
}

// Find config
import { readdirSync } from 'fs'
function findVideoDir(dir, target) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (full.includes(target)) return full
      const sub = findVideoDir(full, target)
      if (sub) return sub
    }
  }
  return null
}

const contentRoot = join(ROOT, 'academy-video-content')
const videoDir = findVideoDir(contentRoot, videoArg)
if (!videoDir) { console.error(`Config directory not found for: ${videoArg}`); process.exit(1) }

const configRaw = readFileSync(join(videoDir, 'video.config.ts'), 'utf8')

// Extract metadata from config file (simple regex — no TS transpile needed)
function extract(key) {
  const m = configRaw.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`))
  return m?.[1] ?? null
}
function extractBool(key) {
  const m = configRaw.match(new RegExp(`${key}:\\s*(true|false)`))
  return m?.[1] === 'true'
}
function extractNum(key) {
  const m = configRaw.match(new RegExp(`${key}:\\s*(\\d+)`))
  return m?.[1] ? parseInt(m[1], 10) : null
}

const videoKey = extract('videoKey')
const lessonSlug = extract('lessonSlug')
const skillSlug = extract('skillSlug')
const subskillSlug = extract('subskillSlug')
const title = extract('title')
const description = extract('description')
const scriptVersion = extractNum('scriptVersion') ?? 1
const videoVersion = extractNum('videoVersion') ?? 1
const estimatedDuration = extractNum('estimatedDurationSeconds')
const narrationProvider = extract('narrationProvider')
const narrationVoiceId = extract('narrationVoiceId') ?? ''
const originalContentConfirmed = extractBool('originalContentConfirmed')

if (!videoKey || !lessonSlug || !skillSlug || !title) {
  console.error('Could not extract required fields from video.config.ts')
  process.exit(1)
}

if (!originalContentConfirmed) {
  console.error('originalContentConfirmed must be true in video.config.ts before publishing.')
  process.exit(1)
}

// Read transcript
const transcriptPath = join(videoDir, 'transcript.md')
const transcript = existsSync(transcriptPath) ? readFileSync(transcriptPath, 'utf8').trim() : ''
if (!transcript) {
  console.error('transcript.md is missing or empty. Cannot publish.')
  process.exit(1)
}

// Determine captions path
const captionsPath = captionsOverride ?? join(videoDir, 'captions.vtt')
if (!existsSync(captionsPath)) {
  console.error(`Captions file not found: ${captionsPath}. Cannot publish without captions.`)
  process.exit(1)
}

const storagePath = `videos/${lessonSlug}/v${videoVersion}/lesson.mp4`
const captionsStoragePath = `videos/${lessonSlug}/v${videoVersion}/captions.vtt`

console.log(`\nPublishing: ${videoKey}`)
console.log(`  MP4:      ${mp4Path} → ${storagePath}`)
console.log(`  Captions: ${captionsPath} → ${captionsStoragePath}`)
console.log(`  Lesson:   ${lessonSlug} / ${skillSlug}`)
if (dryRun) { console.log('\n[DRY RUN] No changes made.'); process.exit(0) }

// Upload to Supabase Storage using REST
async function uploadFile(localPath, remotePath, contentType) {
  const fileData = readFileSync(localPath)
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${remotePath}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': contentType,
      'x-upsert': 'true',
    },
    body: fileData,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Upload failed (${res.status}): ${err}`)
  }
  console.log(`  ✓ Uploaded ${remotePath}`)
}

try {
  await uploadFile(mp4Path, storagePath, 'video/mp4')
  await uploadFile(captionsPath, captionsStoragePath, 'text/vtt')

  // Upsert database record
  const dbPayload = {
    video_key: videoKey,
    lesson_slug: lessonSlug,
    skill_slug: skillSlug,
    subskill_slug: subskillSlug ?? null,
    title,
    description: description ?? null,
    transcript,
    storage_path: storagePath,
    captions_storage_path: captionsStoragePath,
    duration_seconds: estimatedDuration,
    script_version: scriptVersion,
    video_version: videoVersion,
    narration_provider: narrationProvider ?? null,
    narration_voice_id: narrationVoiceId ?? null,
    original_content_confirmed: true,
    accuracy_reviewed: false,
    production_status: 'rendered',
    updated_at: new Date().toISOString(),
  }

  const dbRes = await fetch(
    `${SUPABASE_URL}/rest/v1/sat_rw_lesson_videos?on_conflict=video_key`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        apikey: SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(dbPayload),
    },
  )

  if (!dbRes.ok) {
    const err = await dbRes.text()
    throw new Error(`DB upsert failed (${dbRes.status}): ${err}`)
  }

  const rows = await dbRes.json()
  const row = Array.isArray(rows) ? rows[0] : rows
  console.log(`  ✓ Database record upserted (id: ${row?.id ?? 'unknown'})`)
  console.log(`\nStatus: rendered — go to /dashboard/admin/sat-rw-academy/videos to complete accuracy review and publish.`)
} catch (err) {
  console.error('Publish failed:', err.message)
  process.exit(1)
}
