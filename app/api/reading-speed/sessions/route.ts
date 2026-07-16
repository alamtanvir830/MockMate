import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'

interface SessionBody {
  sourceWordCount: number
  completedWordCount: number
  completionPercentage: number
  startingWpm: number
  endingWpm: number
  highestWpm: number
  chunkSize: number
  durationSeconds: number
  pauseCount: number
  completed: boolean
  qualifiesForDailyPractice: boolean
  clientLocalDate?: string
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json() as SessionBody

    if (
      typeof body.sourceWordCount !== 'number' ||
      typeof body.completedWordCount !== 'number' ||
      typeof body.completionPercentage !== 'number' ||
      typeof body.startingWpm !== 'number' ||
      typeof body.endingWpm !== 'number' ||
      typeof body.highestWpm !== 'number' ||
      typeof body.chunkSize !== 'number' ||
      typeof body.durationSeconds !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid session data' }, { status: 400 })
    }

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const { data, error } = await supabase
      .from('reading_speed_sessions')
      .insert({
        user_id: user.id,
        user_email,
        user_name,
        source_word_count: body.sourceWordCount,
        completed_word_count: body.completedWordCount,
        completion_percentage: body.completionPercentage,
        starting_wpm: body.startingWpm,
        ending_wpm: body.endingWpm,
        highest_wpm: body.highestWpm,
        chunk_size: body.chunkSize,
        duration_seconds: body.durationSeconds,
        pause_count: body.pauseCount ?? 0,
        completed: body.completed ?? false,
        qualifies_for_daily_practice: body.qualifiesForDailyPractice ?? false,
        client_local_date: body.clientLocalDate ?? null,
        completed_at: body.completed ? new Date().toISOString() : null,
      })
      .select('id')
      .single()

    if (error) {
      console.error('reading-speed/sessions insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('reading-speed/sessions POST error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

interface DailyStats {
  streak: number
  totalSessions: number
  highestWpm: number
  lastSession: { completedAt: string; wpm: number } | null
  todayComplete: boolean
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    // Fetch all sessions (stats)
    const { data: allSessions, error: allError } = await supabase
      .from('reading_speed_sessions')
      .select('ending_wpm, highest_wpm, completed_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (allError) {
      console.error('reading-speed/sessions GET all error:', allError)
      return NextResponse.json({ error: allError.message }, { status: 500 })
    }

    // Fetch streak sessions (qualifying only, limited)
    const { data: qualifyingSessions, error: streakError } = await supabase
      .from('reading_speed_sessions')
      .select('client_local_date')
      .eq('user_id', user.id)
      .eq('qualifies_for_daily_practice', true)
      .not('client_local_date', 'is', null)
      .order('client_local_date', { ascending: false })
      .limit(365)

    if (streakError) {
      console.error('reading-speed/sessions GET streak error:', streakError)
      return NextResponse.json({ error: streakError.message }, { status: 500 })
    }

    const sessions = allSessions ?? []
    const qualifying = qualifyingSessions ?? []

    // Compute totals
    const totalSessions = sessions.length
    const highestWpm = sessions.reduce((max, s) => Math.max(max, s.highest_wpm ?? 0), 0)
    const lastSession = sessions.length > 0 && sessions[0].completed_at
      ? { completedAt: sessions[0].completed_at, wpm: sessions[0].ending_wpm }
      : null

    // Compute streak from unique dates
    const uniqueDates = Array.from(new Set(qualifying.map(s => s.client_local_date as string))).sort(
      (a, b) => b.localeCompare(a),
    )

    const today = new Date().toISOString().split('T')[0]
    const todayComplete = uniqueDates.includes(today)

    let streak = 0
    if (uniqueDates.length > 0) {
      const startDate = todayComplete ? today : (() => {
        const d = new Date()
        d.setDate(d.getDate() - 1)
        return d.toISOString().split('T')[0]
      })()

      let current = new Date(startDate)
      for (const date of uniqueDates) {
        const expected = current.toISOString().split('T')[0]
        if (date === expected) {
          streak++
          current.setDate(current.getDate() - 1)
        } else {
          break
        }
      }
    }

    const result: DailyStats = {
      streak,
      totalSessions,
      highestWpm,
      lastSession,
      todayComplete,
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('reading-speed/sessions GET error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
