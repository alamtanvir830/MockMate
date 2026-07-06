import type { SupabaseClient, User } from '@supabase/supabase-js'

export async function resolveUserIdentity(
  supabase: SupabaseClient,
  user: User,
): Promise<{ user_name: string; user_email: string }> {
  const user_email = user.email ?? ''

  let user_name: string | null = null

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    user_name = (profile as { full_name?: string | null } | null)?.full_name ?? null
  } catch { /* ignore */ }

  if (!user_name) {
    user_name =
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      null
  }

  if (!user_name) {
    user_name = user_email ? user_email.split('@')[0] : 'Unknown'
  }

  return { user_name: user_name || 'Unknown', user_email }
}
