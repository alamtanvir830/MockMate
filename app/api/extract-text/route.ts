import { NextResponse } from 'next/server'
import mammoth from 'mammoth'

// Force dynamic rendering — this route handles file uploads, never cache it
export const dynamic = 'force-dynamic'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB per file
const ACCEPTED_TYPES = ['.pdf', '.docx', '.txt', '.md']
// PDFs with fewer than 50 chars are almost certainly scanned/image-only
const MIN_PDF_TEXT_LENGTH = 50

/**
 * Extract text from a single PDF buffer.
 * pdfParse is required() here (not at module level) so that if pdf-parse
 * fails to initialise, it only affects this one file — not the entire route.
 */
async function extractPdfText(buffer: Buffer, fileName: string): Promise<string> {
  // Dynamic require keeps pdf-parse out of the webpack bundle.
  // next.config.ts lists it in serverExternalPackages so Node.js require()s
  // it natively at runtime.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse') as (
    buf: Buffer,
  ) => Promise<{ text: string; numpages: number }>

  const data = await pdfParse(buffer)
  const text = data.text.trim()

  console.log(
    `[extract-text] "${fileName}" — ${data.numpages} pages, ${text.length} chars extracted`,
  )

  if (text.length < MIN_PDF_TEXT_LENGTH) {
    throw new Error('PDF contains no readable text (scanned or image-only)')
  }

  return text
}

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch (err) {
    console.error('[extract-text] failed to parse form data:', err)
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const successfulTexts: string[] = []
  const failedFiles: Array<{ name: string; reason: string }> = []

  for (const [, value] of formData.entries()) {
    if (!(value instanceof File)) continue

    const fileName = value.name
    const nameLower = fileName.toLowerCase()
    const ext = ACCEPTED_TYPES.find((e) => nameLower.endsWith(e))

    console.log(
      `[extract-text] file: "${fileName}" | mime: ${value.type || 'unknown'} | size: ${value.size} bytes | ext: ${ext ?? 'unsupported'}`,
    )

    if (!ext) {
      console.warn(`[extract-text] "${fileName}" — unsupported type, skipping`)
      failedFiles.push({ name: fileName, reason: 'unsupported file type' })
      continue
    }

    if (value.size > MAX_FILE_SIZE) {
      const mb = (value.size / (1024 * 1024)).toFixed(1)
      console.warn(`[extract-text] "${fileName}" — too large (${mb} MB), skipping`)
      failedFiles.push({ name: fileName, reason: `file too large (${mb} MB, max 10 MB)` })
      continue
    }

    // Each file gets its own try/catch — one failure never affects others
    try {
      const buffer = Buffer.from(await value.arrayBuffer())
      console.log(`[extract-text] buffer OK for "${fileName}" (${buffer.length} bytes)`)

      let extracted = ''

      if (ext === '.pdf') {
        extracted = await extractPdfText(buffer, fileName)
      } else if (ext === '.docx') {
        const result = await mammoth.extractRawText({ buffer })
        extracted = result.value.trim()
        console.log(`[extract-text] "${fileName}" — ${extracted.length} chars from DOCX`)
      } else {
        // .txt / .md
        extracted = buffer.toString('utf-8').trim()
        console.log(`[extract-text] "${fileName}" — ${extracted.length} chars from text file`)
      }

      if (extracted) {
        successfulTexts.push(extracted)
      } else {
        console.warn(`[extract-text] "${fileName}" — extracted nothing, treating as failed`)
        failedFiles.push({ name: fileName, reason: 'no text could be extracted' })
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      console.error(`[extract-text] FAILED "${fileName}":`, errMsg)

      const isPdfReadError =
        ext === '.pdf' ||
        errMsg.includes('PDF') ||
        errMsg.includes('scanned') ||
        errMsg.includes('no readable text')

      failedFiles.push({
        name: fileName,
        reason: isPdfReadError
          ? "couldn't read PDF — try a text-based PDF, DOCX, or paste your notes instead"
          : errMsg,
      })
    }
  }

  const successCount = successfulTexts.length
  const failureCount = failedFiles.length

  console.log(
    `[extract-text] done — ${successCount} succeeded, ${failureCount} failed, ` +
    `total text: ${successfulTexts.join('').length} chars`,
  )

  return NextResponse.json({
    text: successfulTexts.join('\n\n---\n\n'),
    successCount,
    failedFiles, // [{ name, reason }] — client uses these for the warning UI
  })
}
