import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  iconOnly?: boolean
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L11.5 6.5L17.5 7.3L13.25 11.4L14.3 17.4L9 14.5L3.7 17.4L4.75 11.4L0.5 7.3L6.5 6.5L9 1Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-lg font-bold text-slate-900 tracking-tight">
          Mock<span className="text-emerald-600">Mate</span>
        </span>
      )}
    </div>
  )
}
