import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password: string }
    const correct = process.env.SAT_FORM_1_PASSWORD
    if (!correct) {
      return NextResponse.json({ valid: false }, { status: 503 })
    }
    return NextResponse.json({ valid: password === correct })
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 })
  }
}
