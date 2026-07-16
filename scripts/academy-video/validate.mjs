#!/usr/bin/env node
/**
 * Validates academy video content packages before rendering.
 * Usage: node scripts/academy-video/validate.mjs [--video complete-sentences]
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '../..')

const VALID_STATUSES = [
  'script_draft', 'script_reviewed', 'narration_ready',
  'rendered', 'accuracy_review', 'published', 'archived',
]

const REQUIRED_SCENE_FIELDS = ['id', 'startSeconds', 'durationSeconds', 'narration', 'onScreenLines']

// Parse --video flag
const videoArg = process.argv.find((_, i) => process.argv[i - 1] === '--video') ?? null

// Discover config files
const glob = (await import('fs')).readdirSync
function findConfigs(dir) {
  const results = []
  if (!existsSync(dir)) return results
  for (const entry of glob(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findConfigs(full))
    else if (entry.name === 'video.config.ts') results.push(full)
  }
  return results
}

const contentRoot = join(ROOT, 'academy-video-content')
let configs = findConfigs(contentRoot)

if (videoArg) {
  configs = configs.filter(p => p.includes(videoArg))
  if (configs.length === 0) {
    console.error(`No config found matching --video ${videoArg}`)
    process.exit(1)
  }
}

let totalErrors = 0

for (const configPath of configs) {
  const dir = dirname(configPath)
  const relPath = configPath.replace(ROOT + '/', '')
  const errors = []
  const warnings = []

  // Read raw TypeScript (basic validation without transpiling)
  const raw = readFileSync(configPath, 'utf8')

  // Extract videoKey
  const keyMatch = raw.match(/videoKey:\s*['"]([^'"]+)['"]/)
  const videoKey = keyMatch?.[1] ?? '<unknown>'

  console.log(`\n▸ Validating: ${relPath} (${videoKey})`)

  // Check required fields in config
  const requiredFields = [
    'videoKey', 'lessonSlug', 'skillSlug', 'title', 'estimatedDurationSeconds',
    'narrationProvider', 'narrationVoiceId', 'captionsPath', 'transcriptPath',
    'originalContentConfirmed',
  ]
  for (const f of requiredFields) {
    if (!raw.includes(f + ':')) errors.push(`Missing field: ${f}`)
  }

  // Validate originalContentConfirmed is true
  if (raw.includes('originalContentConfirmed: false')) {
    errors.push('originalContentConfirmed must be true before validation passes')
  }

  // Check companion files
  const companions = {
    'script.md': join(dir, 'script.md'),
    'captions.vtt': join(dir, 'captions.vtt'),
    'transcript.md': join(dir, 'transcript.md'),
  }
  for (const [name, path] of Object.entries(companions)) {
    if (!existsSync(path)) {
      errors.push(`Missing required file: ${name}`)
    } else {
      const content = readFileSync(path, 'utf8').trim()
      if (content.length < 50) errors.push(`${name} appears empty or too short`)
    }
  }

  // Validate VTT structure
  if (existsSync(companions['captions.vtt'])) {
    const vtt = readFileSync(companions['captions.vtt'], 'utf8')
    if (!vtt.startsWith('WEBVTT')) errors.push('captions.vtt must start with WEBVTT')
    const cueCount = (vtt.match(/\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}/g) || []).length
    if (cueCount === 0) errors.push('captions.vtt has no valid cue timestamps')
    if (cueCount < 5) warnings.push(`captions.vtt has only ${cueCount} cues — may need more`)
  }

  // Check for scene objects in config
  const sceneMatches = raw.match(/id:\s*['"]scene-/g) || []
  if (sceneMatches.length < 4) {
    errors.push(`Too few scenes: found ${sceneMatches.length}, minimum 4`)
  }

  // Check for timing overlap (basic — just warn if any scene start >= 300s)
  const startMatches = [...raw.matchAll(/startSeconds:\s*(\d+)/g)]
  const starts = startMatches.map(m => parseInt(m[1], 10))
  if (starts.some(s => s > 600)) {
    warnings.push('Scene start time exceeds 10 minutes — unusually long')
  }

  // Check duplicate videoKey (cross-config)
  const otherConfigs = configs.filter(c => c !== configPath)
  for (const other of otherConfigs) {
    const otherKey = readFileSync(other, 'utf8').match(/videoKey:\s*['"]([^'"]+)['"]/)?.[1]
    if (otherKey === videoKey) {
      errors.push(`Duplicate videoKey "${videoKey}" found in ${other.replace(ROOT + '/', '')}`)
    }
  }

  // Report
  for (const w of warnings) console.warn(`  ⚠ ${w}`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  if (errors.length === 0) console.log('  ✓ Validation passed')
  totalErrors += errors.length
}

if (configs.length === 0) {
  console.log('No video config files found in academy-video-content/')
}

if (totalErrors > 0) {
  console.error(`\n${totalErrors} error(s) found. Fix before proceeding.`)
  process.exit(1)
} else {
  console.log('\nAll configs valid.')
}
