'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface PerformanceEntryInput {
  exam_title: string
  date_taken: string
  score_percentage: number | null
  score_raw: number | null
  total_raw: number | null
  notes: string
  linked_exam_id: string | null
}

export async function addPerformanceEntry(
  input: PerformanceEntryInput,
): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('real_exam_performances').insert({
    user_id: user.id,
    exam_title: input.exam_title.trim(),
    date_taken: input.date_taken,
    score_percentage: input.score_percentage,
    score_raw: input.score_raw,
    total_raw: input.total_raw,
    notes: input.notes.trim() || null,
    linked_exam_id: input.linked_exam_id || null,
  })

  if (error) return { error: error.message }
  revalidatePath('/performance')
}

export async function updatePerformanceEntry(
  id: string,
  input: PerformanceEntryInput,
): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('real_exam_performances')
    .update({
      exam_title: input.exam_title.trim(),
      date_taken: input.date_taken,
      score_percentage: input.score_percentage,
      score_raw: input.score_raw,
      total_raw: input.total_raw,
      notes: input.notes.trim() || null,
      linked_exam_id: input.linked_exam_id || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/performance')
}

export async function deletePerformanceEntry(
  id: string,
): Promise<{ error: string } | void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('real_exam_performances')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/performance')
}
