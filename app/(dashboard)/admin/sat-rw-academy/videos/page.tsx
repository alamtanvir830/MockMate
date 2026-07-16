import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminVideoManager } from './AdminVideoManager'

const ADMIN_EMAIL = 'ranvi.contact@gmail.com'

export default async function AdminVideosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 max-w-md">
        <h1 className="text-base font-semibold text-red-700 mb-1">Access Denied</h1>
        <p className="text-sm text-red-600">This page is restricted to site administrators.</p>
      </div>
    )
  }

  // Initial fetch server-side
  const { data: videos } = await supabase
    .from('sat_rw_lesson_videos')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminVideoManager initialVideos={videos ?? []} />
}
