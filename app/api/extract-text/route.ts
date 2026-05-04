import { NextResponse } from 'next/server'
import mammoth from 'mammoth'

// pdf-parse must NOT be statically imported — it runs fs.readFileSync at module
// init time which breaks when webpack bundles it. We use a dynamic require()
// instead, and next.config.ts marks it as a serverExternalPackage so Next.js
// skips bundling it entirely and lets Node.js require() it at runtime.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse') as (buffer: Buffer) => Promise<{ text: string; numpages: number }>

// Force dynamic rendering — this route handles file uploads, never cache it
export const dynamic = 'force-dynamic'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB per file
const ACCEPTED_TYPES = ['.pdf', '.docx', '.txt', '.md']

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch (err) {
    console.error('[extract-text] failed to parse form data:', err)
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const texts: string[] = []
  const errors: string[] = []

  for (const [, value] of formData.entries()) {
    if (!(value instanceof File)) continue

    const fileName = value.name
    const nameLower = fileName.toLowerCase()
    const ext = ACCEPTED_TYPES.find((e) => nameLower.endsWith(e))

    console.log(`[extract-text] processing file: "${fileName}" | type: ${value.type || 'unknown'} | size: ${value.size} bytes | ext: ${ext ?? 'unsupported'}`)

    if (!ext) {
      const msg = `${fileName}: unsupported file type`
      console.warn(`[extract-text] ${msg}`)
      errors.push(msg)
      continue
    }

    if (value.size > MAX_FILE_SIZE) {
      const msg = `${fileName}: file too large (max 10 MB, got ${(value.size / (1024 * 1024)).toFixed(1)} MB)`
      console.warn(`[extract-text] ${msg}`)
      errors.push(msg)
      continue
    }

    try {
      const buffer = Buffer.from(await value.arrayBuffer())
      console.log(`[extract-text] buffer read OK for "${fileName}" (${buffer.length} bytes)`)

      if (ext === '.pdf') {
        let data: { text: string; numpages: number }
        try {
          data = await pdfParse(buffer)
        } catch (parseErr) {
          const errMsg = parseErr instanceof Error ? parseErr.message : String(parseErr)
          console.error(`[extract-text] pdf-parse failed for "${fileName}":`, errMsg)
          errors.push(
            `${fileName}: We couldn't read this PDF. Try uploading a text-based PDF, DOCX, or paste your notes instead.`,
          )
          continue
        }

        const extracted = data.text.trim()
        console.log(`[extract-text] "${fileName}" — ${data.numpages} pages, ${extracted.length} chars extracted`)

        if (!extracted) {
          // Scanned/image-only PDF — no selectable text
          console.warn(`[extract-text] "${fileName}" appears to be a scanned or image-only PDF (no text layer)`)
          errors.push(
            `${fileName}: We couldn't read this PDF. Try uploading a text-based PDF, DOCX, or paste your notes instead.`,
          )
        } else {
          texts.push(extracted)
        }
      } else if (ext === '.docx') {
        const result = await mammoth.extractRawText({ buffer })
        const extracted = result.value.trim()
        console.log(`[extract-text] "${fileName}" — ${extracted.length} chars extracted from DOCX`)
        if (extracted) texts.push(extracted)
      } else {
        // .txt / .md — read as UTF-8
        const text = buffer.toString('utf-8').trim()
        console.log(`[extract-text] "${fileName}" — ${text.length} chars extracted from text file`)
        if (text) texts.push(text)
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      console.error(`[extract-text] unexpected error for "${fileName}":`, errMsg)

      if (ext === '.pdf') {
        errors.push(
          `${fileName}: We couldn't read this PDF. Try uploading a text-based PDF, DOCX, or paste your notes instead.`,
        )
      } else {
        errors.push(`${fileName}: failed to extract text (${errMsg})`)
      }
    }
  }

  console.log(`[extract-text] done — ${texts.length} file(s) succeeded, ${errors.length} failed, total text length: ${texts.join('').length}`)

  return NextResponse.json({
    text: texts.join('\n\n---\n\n'),
    errors,
  })
}
