import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'MockMate — Your Standardized Exam Hub for Affordable Test Prep',
    template: '%s | MockMate',
  },
  description:
    'Take your first free standardized exam and practice with affordable SAT, MCAT, SHSAT, and question bank tools built for students.',
  openGraph: {
    title: 'MockMate — Your Standardized Exam Hub for Affordable Test Prep',
    description:
      'Take your first free standardized exam and practice with affordable SAT, MCAT, SHSAT, and question bank tools built for students.',
    siteName: 'MockMate',
    url: 'https://www.mockmateapp.com',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MockMate — Take the exam before the exam.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MockMate — Your Standardized Exam Hub for Affordable Test Prep',
    description:
      'Take your first free standardized exam and practice with affordable SAT, MCAT, SHSAT, and question bank tools built for students.',
    images: ['/opengraph-image'],
  },
  metadataBase: new URL('https://www.mockmateapp.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}
