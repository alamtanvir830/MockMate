import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resolveUserIdentity } from '@/lib/supabase/resolve-user-identity'

interface ModuleFeedbackBody {
  formNumber: number
  localAttemptId?: string
  rwModule1Feedback: string
  rwModule2Feedback: string
  mathModule1Feedback: string
  mathModule2Feedback: string
  rwModule2Path?: string
  mathModule2Path?: string
  satPremiumInterestAnswer?: string
  referredByFriend?: boolean
  referrerFullName?: string | null
  referrerEmail?: string | null
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

    const body = await req.json() as ModuleFeedbackBody

    const validFormNumbers = [1, 2, 3, 4, 5]
    if (!validFormNumbers.includes(body.formNumber)) {
      return NextResponse.json(
        { error: 'form_number must be 1, 2, 3, 4, or 5.' },
        { status: 400 }
      )
    }

    const validate = (s: unknown) => typeof s === 'string' && s.trim().length >= 50
    if (
      !validate(body.rwModule1Feedback) ||
      !validate(body.rwModule2Feedback) ||
      !validate(body.mathModule1Feedback) ||
      !validate(body.mathModule2Feedback)
    ) {
      return NextResponse.json(
        { error: 'Each feedback field must be at least 50 characters.' },
        { status: 400 }
      )
    }

    const premiumAnswer = body.satPremiumInterestAnswer
    if (premiumAnswer !== 'yes' && premiumAnswer !== 'no') {
      return NextResponse.json(
        { error: 'SAT Premium interest answer must be yes or no.' },
        { status: 400 }
      )
    }

    // Normalize referral field — legacy payloads omit it; undefined/null defaults to false
    const referredByFriend = body.referredByFriend === true
    let referrerFullName: string | null = null
    let referrerEmail: string | null = null
    if (referredByFriend) {
      const rawName = typeof body.referrerFullName === 'string' ? body.referrerFullName.trim() : ''
      if (!rawName) {
        return NextResponse.json(
          { error: 'referrerFullName is required when referredByFriend is true.' },
          { status: 400 }
        )
      }
      if (rawName.length > 150) {
        return NextResponse.json(
          { error: 'referrerFullName must be 150 characters or fewer.' },
          { status: 400 }
        )
      }
      referrerFullName = rawName

      const rawEmail = typeof body.referrerEmail === 'string' ? body.referrerEmail.trim() : ''
      if (rawEmail) {
        if (rawEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
          return NextResponse.json(
            { error: 'referrerEmail must be a valid email address.' },
            { status: 400 }
          )
        }
        referrerEmail = rawEmail.toLowerCase()
      }
    }

    const { user_name, user_email } = await resolveUserIdentity(supabase, user)

    const rw1 = (body.rwModule1Feedback as string).trim()
    const rw2 = (body.rwModule2Feedback as string).trim()
    const m1  = (body.mathModule1Feedback as string).trim()
    const m2  = (body.mathModule2Feedback as string).trim()

    const { error } = await supabase
      .from('sat_exam_module_feedback')
      .insert({
        user_id:                      user.id,
        user_email,
        user_name,
        form_number:                  body.formNumber,
        local_attempt_id:             body.localAttemptId ?? null,
        rw_module_1_feedback:         rw1,
        rw_module_2_feedback:         rw2,
        math_module_1_feedback:       m1,
        math_module_2_feedback:       m2,
        rw_module_2_path:             body.rwModule2Path ?? null,
        math_module_2_path:           body.mathModule2Path ?? null,
        rw_module_1_char_count:       rw1.length,
        rw_module_2_char_count:       rw2.length,
        math_module_1_char_count:     m1.length,
        math_module_2_char_count:     m2.length,
        sat_premium_interest_answer:  premiumAnswer,
        interested_in_sat_premium:    premiumAnswer === 'yes',
        referred_by_friend:           referredByFriend,
        referrer_full_name:           referrerFullName,
        referrer_email:               referrerEmail,
      })

    if (error) {
      console.error('sat/module-feedback insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('sat/module-feedback error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
