import type { Metadata } from 'next'
import MakeYourQuoteConfigurator from '@/components/MakeYourQuoteConfigurator'
import StructuredData from '@/components/seo/StructuredData'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo/site'

const title = 'Build Your Custom Bag Quote | Bag Supply Co'
const description = 'Instant estimates for custom paper bag orders from Bag Supply Co. Configure bag category, product, quantity, print options, and freight policy in a premium quote builder.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/makeyourquote',
  },
  openGraph: {
    type: 'website',
    url: `${getSiteUrl()}/makeyourquote`,
    title,
    description,
    siteName: 'Bag Supply Co',
    images: [
      {
        url: toAbsoluteUrl('/catalog/pharmacy/gs/GS-25-FRONT.webp'),
        width: 1200,
        height: 630,
        alt: 'Bag Supply Co custom bag quote configurator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [toAbsoluteUrl('/catalog/pharmacy/gs/GS-25-FRONT.webp')],
  },
}

export default function MakeYourQuotePage() {
  return (
    <>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `${getSiteUrl()}/makeyourquote`,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Bag Supply Co',
            url: getSiteUrl(),
          },
          provider: {
            '@type': 'Organization',
            name: 'Bag Supply Co',
            url: getSiteUrl(),
          },
        }}
      />
      <MakeYourQuoteConfigurator />
    </>
  )
}
