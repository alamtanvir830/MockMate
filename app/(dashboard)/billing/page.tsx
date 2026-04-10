import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Billing' }

export default function BillingPage() {
  return (
    <div className="max-w-xl mx-auto mt-12">
      <Card className="text-center py-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-indigo-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900">Billing coming soon</h1>
        <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">
          Paid plans are on the way. For now everything is free — no limits.
        </p>
        <Link href="/dashboard" className="inline-block mt-6">
          <Button variant="outline" size="sm">Back to dashboard</Button>
        </Link>
      </Card>
    </div>
  )
}
