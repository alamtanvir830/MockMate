import type { Metadata } from 'next'
import { Suspense } from 'react'
import PricingClient from './PricingClient'
import { PremiumPlans } from '@/components/shared/premium-plans'

export const metadata: Metadata = {
  title: { absolute: 'SAT Prep Pricing | MockMate' },
  description:
    'MockMate plans start at $9.99/month, with a $24.99 3-month plan and $29.99 lifetime access. Every plan includes 10 full-length SAT practice exams, a 1,000+ question bank, both academies, and score reports.',
  alternates: { canonical: 'https://www.mockmateapp.com/pricing' },
  openGraph: {
    title: 'SAT Prep Pricing | MockMate',
    description:
      'MockMate plans start at $9.99/month, with a $24.99 3-month plan and $29.99 lifetime access.',
    url: 'https://www.mockmateapp.com/pricing',
    siteName: 'MockMate',
    images: [{ url: 'https://www.mockmateapp.com/opengraph-image', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAT Prep Pricing | MockMate',
    description:
      'MockMate plans start at $9.99/month, with a $24.99 3-month plan and $29.99 lifetime access.',
    images: ['https://www.mockmateapp.com/opengraph-image'],
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
