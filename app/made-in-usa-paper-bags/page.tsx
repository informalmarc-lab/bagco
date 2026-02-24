import type { Metadata } from 'next'
import SeoLandingPage from '@/components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Made in USA Paper Bags',
  description:
    'Made in USA paper bags manufactured in Union County, North Carolina. Factory-direct production for pharmacies and retail businesses.',
}

export default function MadeInUsaPaperBagsPage() {
  return (
    <SeoLandingPage
      h1="Made in USA Paper Bags"
      intro="Bag Supply Co manufactures paper bags in Union County, North Carolina, giving customers direct access to U.S.-based production and support."
      bullets={[
        'Manufactured in Union County, NC',
        'Factory-direct communication and pricing',
        'Low minimum order requirements',
        'Nationwide shipping and local pickup options',
      ]}
      links={[
        { href: '/manufacturing', label: 'Manufacturing' },
        { href: '/pharmacy-bags', label: 'Pharmacy Bags' },
        { href: '/custom-retail-paper-bags', label: 'Custom Retail Paper Bags' },
      ]}
    />
  )
}
