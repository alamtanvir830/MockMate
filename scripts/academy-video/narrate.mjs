#!/usr/bin/env node
/**
 * Generates AI narration audio using ElevenLabs.
 * Usage: node scripts/academy-video/narrate.mjs --video complete-sentences
 *
 * Required env variables (never commit real values):
 *   ELEVENLABS_API_KEY
 *   ELEVENLABS_VOICE_ID
 *
 * Output: academy-video-content/<path>/narration.mp3
 * Caching: skips generation if narration.mp3 already exists and --force is not set.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '../..')

const videoArg = process.argv.find((_, i) => process.argv[i - 1] === '--video') ?? null
const force = process.argv.includes('--force')

if (!videoArg) {
  console.error('Usage: node scripts/academy-video/narrate.mjs --video <video-key-or-path-segment>')
  process.exit(1)
}

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID

if (!ELEVENLABS_API_KEY) {
  console.error('ELEVENLABS_API_KEY environment variable is not set.')
  console.error('Add it to your local .env.local (never commit real keys).')
  process.exit(1)
}
if (!ELEVENLABS_VOICE_ID) {
  console.error('ELEVENLABS_VOICE_ID environment variable is not set.')
  process.exit(1)
}

// Find the config directory
function findDir(root, target) {
  const fs = await import('fs')
  const entries = fs.readdirSync(root, { withFileTypes: true })
  for (const e of entries) {
    const full = join(root, e.name)
    if (e.isDirectory()) {
      if (full.includes(target)) return full
      const sub = findDir(full, target)
      if (sub) return sub
    }
  }
  return null
}

// Simple recursive directory search
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

if (!videoDir) {
  console.error(`No directory found matching: ${videoArg}`)
  process.exit(1)
}

const scriptPath = join(videoDir, 'script.md')
if (!existsSync(scriptPath)) {
  console.error(`script.md not found in ${videoDir}`)
  process.exit(1)
}

const outputPath = join(videoDir, 'narration.mp3')
if (existsSync(outputPath) && !force) {
  console.log(`Narration already exists: ${outputPath}`)
  console.log('Use --force to regenerate.')
  process.exit(0)
}

// Extract narration text (Scene sections only)
const raw = readFileSync(scriptPath, 'utf8')
const sceneBlocks = raw.split(/^##\s+Scene\s+\d+/m).slice(1)
const narrationLines = sceneBlocks.map(block => {
  const lines = block.split('\n')
    .filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('---'))
    .map(l => l.trim())
  return lines.join(' ')
})

const fullNarration = narrationLines.join('\n\n')

console.log(`Generating narration for: ${videoDir.replace(ROOT + '/', '')}`)
console.log(`Voice ID: ${ELEVENLABS_VOICE_ID}`)
console.log(`Text length: ${fullNarration.length} characters`)

try {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: fullNarration,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.80,
          style: 0.20,
          use_speaker_boost: true,
        },
      }),
    },
  )

  if (!response.ok) {
    const err = await response.text()
    console.error(`ElevenLabs API error ${response.status}: ${err}`)
    process.exit(1)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(outputPath, buffer)
  console.log(`✓ Narration saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`)
} catch (err) {
  console.error('Narration generation failed:', err.message)
  process.exit(1)
}
