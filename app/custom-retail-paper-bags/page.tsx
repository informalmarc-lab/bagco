import type { Metadata } from 'next'
import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Custom Retail Paper Bags',
  description:
    'Custom retail paper bags for stores, boutiques, restaurants, and specialty businesses. Factory direct production with flexible print options.',
}

export default function CustomRetailPaperBagsPage() {
  return (
    <SeoLandingPage
      h1="Custom Retail Paper Bags"
      intro="Beyond pharmacy, we manufacture custom retail paper bags for businesses that want dependable quality and direct factory pricing."
      bullets={[
        'Custom branding for storefront packaging',
        '1, 2, and 3 color print options',
        'Multiple sizes for checkout and specialty carryout',
        'Low minimums for small and mid-sized businesses',
      ]}
      links={[
        { href: '/industries', label: 'Industries' },
        { href: '/custom-printing', label: 'Custom Printing' },
        { href: '/made-in-usa-paper-bags', label: 'Made in USA Paper Bags' },
      ]}
    />
  )
}
