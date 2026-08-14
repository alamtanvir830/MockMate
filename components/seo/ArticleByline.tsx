interface ArticleBylineProps {
  published?: string
  updated?: string
}

export function ArticleByline({
  published = 'July 2026',
  updated = 'July 30, 2026',
}: ArticleBylineProps) {
  return (
    <p className="mt-4 text-sm text-slate-500">
      Published: {published} · MockMate Editorial Team
      <span className="mx-2 text-slate-300">|</span>
      Updated: {updated}
    </p>
  )
}

export default ArticleByline
