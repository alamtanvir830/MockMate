'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type NoteCategory =
  | 'General notes'
  | 'Study planner'
  | 'Professor notes'
  | 'Lecture notes'
  | 'Speaker notes'
  | 'Exam reminders'
  | 'Other'

export interface Note {
  id: string
  title: string
  content: string
  category: NoteCategory
  created_at: string
  updated_at: string
}

export async function createNote(input: {
  title: string
  content: string
  category: NoteCategory
}): Promise<{ data: Note | null; error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('personal_notes')
    .insert({
      user_id: user.id,
      title: input.title || 'Untitled',
      content: input.content,
      category: input.category,
    })
    .select('*')
    .single()

  if (error) return { data: null, error: error.message }

  revalidatePath('/notes')
  return { data: data as Note, error: null }
}

export async function updateNote(input: {
  id: string
  title?: string
  content?: string
  category?: NoteCategory
}): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const updates: Record<string, string> = { updated_at: new Date().toISOString() }
  if (input.title !== undefined) updates.title = input.title || 'Untitled'
  if (input.content !== undefined) updates.content = input.content
  if (input.category !== undefined) updates.category = input.category

  const { error } = await supabase
    .from('personal_notes')
    .update(updates)
    .eq('id', input.id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/notes')
  return { error: null }
}

export async function deleteNote(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('personal_notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/notes')
  return { error: null }
}
