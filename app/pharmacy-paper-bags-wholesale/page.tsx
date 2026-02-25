import type { Metadata } from 'next'
import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Pharmacy Paper Bags Wholesale',
  description:
    'Wholesale pharmacy paper bags from a direct manufacturer in North Carolina with low minimums and nationwide shipping.',
}

export default function PharmacyPaperBagsWholesalePage() {
  return (
    <SeoLandingPage
      h1="Pharmacy Paper Bags Wholesale"
      intro="Our wholesale pharmacy paper bag programs are built for predictable reordering, reliable stock availability, and factory-direct pricing."
      bullets={[
        'Factory-direct wholesale pricing structure',
        'Same-day shipping on select stock programs',
        'Custom and stock options for independent pharmacies',
        'Nationwide distribution with NC pickup available',
      ]}
      links={[
        { href: '/manufacturing', label: 'Manufacturing' },
        { href: '/pharmacy-bags', label: 'Pharmacy Bags' },
        { href: '/independent-pharmacy-packaging', label: 'Independent Pharmacy Packaging' },
      ]}
    />
  )
}
