import { cn } from '@/lib/utils'
import type { ExamStatus } from '@/types'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  muted: 'bg-slate-50 text-slate-600 border-slate-200',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function ExamStatusBadge({
  status,
  locked = false,
}: {
  status: ExamStatus
  locked?: boolean
}) {
  if (locked) {
    return <Badge variant="muted">Scheduled</Badge>
  }
  const map: Record<ExamStatus, { label: string; variant: BadgeVariant }> = {
    draft: { label: 'Draft', variant: 'muted' },
    ready: { label: 'Ready', variant: 'info' },
    in_progress: { label: 'In Progress', variant: 'warning' },
    completed: { label: 'Completed', variant: 'success' },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}
