'use client'

import { useState } from 'react'

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/create-portal-session', { method: 'POST' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Failed to open billing portal')
      }
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <p className="text-[12px] text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-2">{error}</p>
      )}
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full border border-slate-300 hover:bg-slate-50 disabled:opacity-60 text-slate-700 font-semibold text-[14px] py-2.5 rounded-xl transition-colors"
      >
        {loading ? 'Opening portal…' : 'Manage Subscription'}
      </button>
    </div>
  )
}
