import type { Metadata } from 'next'
import SeoLandingPage from '@/components/SeoLandingPage'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Custom Pharmacy Paper Bags',
  description:
    'Custom pharmacy paper bags with 1, 2, and 3 color printing. Factory direct manufacturing and low minimums for independent pharmacies.',
  path: '/custom-pharmacy-paper-bags',
})

export default function CustomPharmacyPaperBagsPage() {
  return (
    <SeoLandingPage
      h1="Custom Pharmacy Paper Bags"
      intro="We manufacture custom pharmacy paper bags that support daily prescription volume while keeping your branding visible at checkout."
      bullets={[
        'Custom logo printing in 1, 2, and 3 colors',
        'Multiple pharmacy-focused size options',
        'Low minimum order programs for independents',
        '3 to 4 week lead times for most custom runs',
      ]}
      links={[
        { href: '/pharmacy-bags', label: 'Pharmacy Bags' },
        { href: '/custom-printing', label: 'Custom Printing' },
        { href: '/contact', label: 'Contact' },
      ]}
    />
  )
}

