import type { Metadata } from 'next'
import { Suspense } from 'react'
import PricingClient from './PricingClient'
import { PremiumPlans } from '@/components/shared/premium-plans'

export const metadata: Metadata = {
  title: 'Pricing | MockMate SAT Prep',
  description:
    'MockMate plans start at $9.99/month, with a $24.99 3-month plan and $29.99 lifetime access. Every plan includes SAT Forms 1–5, a 700+ question bank, both academies, and score reports.',
  alternates: { canonical: 'https://www.mockmateapp.com/pricing' },
  openGraph: {
    title: 'Pricing | MockMate SAT Prep',
    description:
      'MockMate plans start at $9.99/month, with a $24.99 3-month plan and $29.99 lifetime access.',
    url: 'https://www.mockmateapp.com/pricing',
    siteName: 'MockMate',
    images: [{ url: 'https://www.mockmateapp.com/mockmate-og-v4.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | MockMate SAT Prep',
    description:
      'MockMate plans start at $9.99/month, with a $24.99 3-month plan and $29.99 lifetime access.',
    images: ['https://www.mockmateapp.com/mockmate-og-v4.png'],
  },
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 pb-16">
        <div className="max-w-5xl mx-auto pt-16 px-4">
          <PremiumPlans />
        </div>
      </div>
    }>
      <PricingClient />
    </Suspense>
  )
}
