export const ADMIN_EMAILS = ['ranvi.contact@gmail.com']

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase().trim())
}

export function isMockMateAdmin(user: { email?: string | null } | null | undefined): boolean {
  if (!user) return false
  return isAdminEmail(user.email)
}
