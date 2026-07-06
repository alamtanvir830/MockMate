/**
 * Generates public/mockmate-og-v3.png (1200x630) using sharp.
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirname, '../public/mockmate-og-v3.png')

const W = 1200
const H = 630

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.10"/>
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="white"/>

  <!-- Subtle green blob top-left -->
  <ellipse cx="80" cy="80" rx="340" ry="300" fill="url(#blobGrad)"/>

  <!-- ── LEFT COLUMN ───────────────────────────────────────── -->

  <!-- Logo pill -->
  <rect x="64" y="62" width="44" height="44" rx="10" fill="#10b981"/>
  <rect x="76" y="74" width="20" height="20" rx="3" fill="white"/>

  <!-- MockMate wordmark -->
  <text x="118" y="92" font-family="system-ui,-apple-system,sans-serif" font-size="26" font-weight="700" fill="#0f172a" letter-spacing="-0.5">MockMate</text>

  <!-- Headline line 1 -->
  <text x="64" y="210" font-family="system-ui,-apple-system,sans-serif" font-size="68" font-weight="800" fill="#0f172a" letter-spacing="-2">Take the exam</text>
  <!-- Headline line 2 — green -->
  <text x="64" y="292" font-family="system-ui,-apple-system,sans-serif" font-size="68" font-weight="800" fill="#10b981" letter-spacing="-2">before the exam.</text>

  <!-- Subheadline -->
  <text x="64" y="356" font-family="system-ui,-apple-system,sans-serif" font-size="24" font-weight="400" fill="#64748b">Affordable SAT, MCAT, and SHSAT practice</text>
  <text x="64" y="388" font-family="system-ui,-apple-system,sans-serif" font-size="24" font-weight="400" fill="#64748b">exams and question banks.</text>

  <!-- URL badge -->
  <rect x="64" y="430" width="228" height="40" rx="20" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <text x="178" y="456" font-family="system-ui,-apple-system,sans-serif" font-size="17" font-weight="600" fill="#059669" text-anchor="middle">mockmateapp.com</text>

  <!-- ── RIGHT COLUMN ──────────────────────────────────────── -->

  <!-- Score card (dark) -->
  <rect x="700" y="60" width="436" height="168" rx="18" fill="#0f172a"/>
  <text x="728" y="103" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="600" fill="rgba(255,255,255,0.45)" letter-spacing="1.5">ESTIMATED SAT SCORE</text>
  <text x="728" y="170" font-family="system-ui,-apple-system,sans-serif" font-size="72" font-weight="800" fill="white" letter-spacing="-2">1440</text>
  <text x="728" y="207" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="rgba(255,255,255,0.5)">R&amp;W 720</text>
  <text x="826" y="207" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="rgba(255,255,255,0.5)">Math 720</text>

  <!-- AI Feedback card (light) -->
  <rect x="700" y="248" width="436" height="190" rx="18" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="726" y="284" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="600" fill="#94a3b8" letter-spacing="1.5">AI FEEDBACK</text>

  <!-- R&W row -->
  <text x="726" y="322" font-family="system-ui,-apple-system,sans-serif" font-size="15" font-weight="500" fill="#475569">Reading &amp; Writing</text>
  <rect x="980" y="310" width="100" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="980" y="310" width="72" height="8" rx="4" fill="#10b981"/>
  <text x="1092" y="322" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#10b981">72%</text>

  <!-- Math row -->
  <text x="726" y="360" font-family="system-ui,-apple-system,sans-serif" font-size="15" font-weight="500" fill="#475569">Math</text>
  <rect x="980" y="348" width="100" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="980" y="348" width="85" height="8" rx="4" fill="#10b981"/>
  <text x="1092" y="360" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#10b981">85%</text>

  <!-- Question Bank row -->
  <text x="726" y="398" font-family="system-ui,-apple-system,sans-serif" font-size="15" font-weight="500" fill="#475569">Question Bank</text>
  <rect x="980" y="386" width="100" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="980" y="386" width="60" height="8" rx="4" fill="#10b981"/>
  <text x="1092" y="398" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#10b981">60%</text>

  <!-- Exam badges -->
  <rect x="700" y="460" width="90" height="42" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <text x="745" y="487" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="700" fill="#059669" text-anchor="middle">SAT</text>

  <rect x="802" y="460" width="100" height="42" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <text x="852" y="487" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="700" fill="#059669" text-anchor="middle">MCAT</text>

  <rect x="914" y="460" width="108" height="42" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <text x="968" y="487" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="700" fill="#059669" text-anchor="middle">SHSAT</text>

  <!-- Bottom divider line -->
  <line x1="64" y1="${H - 52}" x2="${W - 64}" y2="${H - 52}" stroke="#f1f5f9" stroke-width="1"/>
  <text x="${W / 2}" y="${H - 24}" font-family="system-ui,-apple-system,sans-serif" font-size="14" fill="#cbd5e1" text-anchor="middle">mockmateapp.com · Free SAT Form 1 · MCAT · SHSAT · Question Bank</text>
</svg>`

try {
  await sharp(Buffer.from(svg))
    .png({ quality: 90, compressionLevel: 8 })
    .resize(W, H)
    .toFile(outPath)
  const { size } = fs.statSync(outPath)
  console.log(`✓ Written: ${outPath}`)
  console.log(`  Size: ${(size / 1024).toFixed(1)} KB`)
  console.log(`  Dimensions: ${W}x${H}`)
} catch (err) {
  console.error('Failed to generate OG image:', err.message)
  process.exit(1)
}
