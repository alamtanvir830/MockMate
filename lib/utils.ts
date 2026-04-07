import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function daysUntil(dateString: string): number {
  const target = new Date(dateString)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Returns true if today is before the exam's unlock date.
 * Uses ISO date string comparison (YYYY-MM-DD) which is lexicographically correct.
 */
export function isExamLocked(unlockDate: string | null | undefined): boolean {
  if (!unlockDate) return false
  const today = new Date().toISOString().split('T')[0]
  return unlockDate > today
}

export function scoreColor(percentage: number): string {
  if (percentage >= 80) return 'text-emerald-600'
  if (percentage >= 60) return 'text-amber-600'
  return 'text-red-600'
}

export function scoreBg(percentage: number): string {
  if (percentage >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (percentage >= 60) return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-red-50 text-red-700 border-red-200'
}
