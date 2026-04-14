import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB per file
const ACCEPTED_TYPES = ['.pdf', '.docx', '.txt', '.md']

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const texts: string[] = []
  const errors: string[] = []

  for (const [, value] of formData.entries()) {
    if (!(value instanceof File)) continue

    const name = value.name.toLowerCase()
    const ext = ACCEPTED_TYPES.find((e) => name.endsWith(e))

    if (!ext) {
      errors.push(`${value.name}: unsupported file type`)
      continue
    }

    if (value.size > MAX_FILE_SIZE) {
      errors.push(`${value.name}: file too large (max 10 MB)`)
      continue
    }

    try {
      const buffer = Buffer.from(await value.arrayBuffer())

      if (ext === '.pdf') {
        const data = await pdfParse(buffer)
        if (data.text.trim()) texts.push(data.text.trim())
      } else if (ext === '.docx') {
        const result = await mammoth.extractRawText({ buffer })
        if (result.value.trim()) texts.push(result.value.trim())
      } else {
        // .txt / .md — read as UTF-8
        const text = buffer.toString('utf-8').trim()
        if (text) texts.push(text)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown error'
      errors.push(`${value.name}: failed to extract text (${msg})`)
    }
  }

  return NextResponse.json({
    text: texts.join('\n\n---\n\n'),
    errors,
  })
}
