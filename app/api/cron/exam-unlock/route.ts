import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendExamOpenEmails } from '@/lib/email/send-exam-open'

// This route is called daily by Vercel Cron (configured in vercel.json).
// It finds every exam whose unlock_date is today and emails the creator
// (and all shared recipients, if it is a group exam).
//
// Protection: Vercel automatically sends `Authorization: Bearer <CRON_SECRET>`
// with every cron request. Set CRON_SECRET in your Vercel project environment variables.

export async function GET(request: NextRequest) {
  // ── Auth guard ─────────────────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('[cron:exam-unlock] unauthorized request — bad or missing CRON_SECRET')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = new Date().toISOString().split('T')[0]
  console.log(`[cron:exam-unlock] running for date: ${today}`)

  const admin = createAdminClient()

  // ── Find exams unlocking today ─────────────────────────────────────────────
  const { data: exams, error: examsError } = await admin
    .from('exams')
    .select('id, title, user_id')
    .eq('unlock_date', today)
    .eq('status', 'ready')

  if (examsError) {
    console.error('[cron:exam-unlock] failed to query exams:', examsError)
    return NextResponse.json({ error: examsError.message }, { status: 500 })
  }

  if (!exams || exams.length === 0) {
    console.log('[cron:exam-unlock] no exams unlocking today')
    return NextResponse.json({ processed: 0, emailsSent: 0 })
  }

  console.log(`[cron:exam-unlock] ${exams.length} exam(s) unlocking today`)

  let totalEmailsSent = 0

  for (const exam of exams) {
    console.log(`[cron:exam-unlock] processing exam "${exam.title}" (${exam.id})`)

    // ── Resolve creator ──────────────────────────────────────────────────────
    let creatorName = 'MockMate User'
    let creatorEmail = ''
    try {
      const { data: creatorAuth } = await admin.auth.admin.getUserById(exam.user_id)
      creatorEmail = creatorAuth?.user?.email ?? ''
      creatorName =
        creatorAuth?.user?.user_metadata?.full_name ??
        creatorEmail.split('@')[0] ??
        'MockMate User'
    } catch (e) {
      console.error(`[cron:exam-unlock] failed to resolve creator for exam ${exam.id}:`, e)
    }

    // ── Check for shared recipients ─────────────────────────────────────────
    const { data: recipients, error: recipientsError } = await admin
      .from('exam_shared_recipients')
      .select('name, email')
      .eq('exam_id', exam.id)

    if (recipientsError) {
      console.error(
        `[cron:exam-unlock] failed to query recipients for exam ${exam.id}:`,
        recipientsError,
      )
    }

    const isGroupExam = (recipients?.length ?? 0) > 0

    // ── Email creator ────────────────────────────────────────────────────────
    if (creatorEmail) {
      await sendExamOpenEmails(
        [{ name: creatorName, email: creatorEmail }],
        {
          examTitle: exam.title,
          examId: exam.id,
          isGroupExam,
          isCreator: true,
        },
      )
      totalEmailsSent++
    } else {
      console.warn(`[cron:exam-unlock] no creator email found for exam ${exam.id} — skipping creator`)
    }

    // ── Email shared recipients ──────────────────────────────────────────────
    if (isGroupExam && recipients && recipients.length > 0) {
      await sendExamOpenEmails(
        recipients,
        {
          examTitle: exam.title,
          examId: exam.id,
          isGroupExam: true,
          isCreator: false,
        },
      )
      totalEmailsSent += recipients.length
      console.log(
        `[cron:exam-unlock] queued ${recipients.length} recipient email(s) for exam ${exam.id}`,
      )
    }
  }

  console.log(
    `[cron:exam-unlock] done — processed ${exams.length} exam(s), ${totalEmailsSent} email(s) sent`,
  )
  return NextResponse.json({ processed: exams.length, emailsSent: totalEmailsSent })
}
