import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { NotesClient } from './NotesClient'
import type { Note } from '@/app/actions/notes'

export const metadata: Metadata = { title: 'Personal Notes' }

export default async function NotesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: notes } = await supabase
    .from('personal_notes')
    .select('*')
    .eq('user_id', user!.id)
    .order('updated_at', { ascending: false })

  // Break out of the max-w-5xl / py-8 wrapper the dashboard layout applies
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      <NotesClient initialNotes={(notes ?? []) as Note[]} />
    </div>
  )
}
