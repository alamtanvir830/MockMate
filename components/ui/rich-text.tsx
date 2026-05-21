import type { ReactNode } from 'react'

/**
 * Renders a string that may contain **bold** markers as inline JSX.
 * Safe for use in both Server Components and Client Components.
 *
 * Example: "The **corpus luteum** produces progesterone"
 * →  "The " + <strong>corpus luteum</strong> + " produces progesterone"
 */
export function RichText({
  text,
  className,
}: {
  text: string
  className?: string
}): ReactNode {
  // Split on **...** capturing the inner text
  const parts = text.split(/\*\*(.+?)\*\*/g)

  const nodes = parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-slate-800">
        {part}
      </strong>
    ) : (
      part
    ),
  )

  return className ? <span className={className}>{nodes}</span> : <>{nodes}</>
}
