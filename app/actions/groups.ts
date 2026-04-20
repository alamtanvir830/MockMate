'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendGroupAddedEmails } from '@/lib/email/send-group-added'

export type AddGroupMembersResult =
  | { ok: true; added: number; duplicates: string[] }
  | { error: string }

export async function addGroupMembers(input: {
  examId: string
  members: { name: string; email: string }[]
}): Promise<AddGroupMembersResult> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const admin = createAdminClient()

  // Only the exam creator may add members
  const { data: exam } = await admin
    .from('exams')
    .select('id, title, subject, user_id')
    .eq('id', input.examId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!exam) return { error: 'Only the group creator can add members.' }

  // Normalise
  const normalized = input.members.map((m) => ({
    name: m.name.trim(),
    email: m.email.trim().toLowerCase(),
  }))

  // Fetch all existing recipient emails for this exam
  const { data: existing } = await admin
    .from('exam_shared_recipients')
    .select('email')
    .eq('exam_id', input.examId)

  const existingSet = new Set([
    ...(existing ?? []).map((r) => r.email.toLowerCase()),
    user.email!.toLowerCase(), // creator can't be added as recipient
  ])

  // Separate duplicates from net-new
  const duplicates: string[] = []
  const toAdd: { name: string; email: string }[] = []

  for (const m of normalized) {
    if (existingSet.has(m.email)) {
      duplicates.push(m.email)
    } else {
      toAdd.push(m)
      existingSet.add(m.email) // guard against dupes within the same submission
    }
  }

  if (toAdd.length === 0) {
    return { ok: true, added: 0, duplicates }
  }

  // Insert new recipients — same structure as createExam
  const { error: insertError } = await admin
    .from('exam_shared_recipients')
    .insert(
      toAdd.map((m) => ({
        exam_id: input.examId,
        user_id: user.id,
        name: m.name,
        email: m.email,
      })),
    )

  if (insertError) {
    console.error('[addGroupMembers] insert failed:', insertError)
    return { error: `Failed to add members: ${insertError.message}` }
  }

  // Send group-added emails (non-fatal)
  const addedByName =
    user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Someone'

  try {
    await sendGroupAddedEmails(toAdd, {
      examTitle: exam.title,
      addedByName,
    })
  } catch (e) {
    console.error('[addGroupMembers] email send failed:', e)
  }

  return { ok: true, added: toAdd.length, duplicates }
}
