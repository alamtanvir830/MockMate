/**
 * Minimal layout for print/PDF pages.
 * Deliberately has no wrapper div — no h-screen, no overflow:hidden.
 * This lets browser print capture the full document height.
 */
export default function PrintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
