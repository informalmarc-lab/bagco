import type { Metadata } from 'next'
import SeoLandingPage from '@/components/SeoLandingPage'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Independent Pharmacy Packaging',
  description:
    'Independent pharmacy packaging solutions from a U.S. manufacturer with custom printing, low minimums, and dependable turnaround.',
  path: '/independent-pharmacy-packaging',
})

export default function IndependentPharmacyPackagingPage() {
  return (
    <SeoLandingPage
      h1="Independent Pharmacy Packaging"
      intro="We focus on practical independent pharmacy packaging with reliable lead times, durable construction, and clear branding."
      bullets={[
        'Prescription take-home bag formats',
        'Custom logo and pharmacy message layouts',
        'Low minimums for regional independent groups',
        'Factory-direct support from Union County, NC',
      ]}
      links={[
        { href: '/custom-pharmacy-paper-bags', label: 'Custom Pharmacy Paper Bags' },
        { href: '/pharmacy-paper-bags-wholesale', label: 'Pharmacy Paper Bags Wholesale' },
        { href: '/contact', label: 'Contact' },
      ]}
    />
  )
}

