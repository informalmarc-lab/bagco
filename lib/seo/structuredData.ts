import { contactPhone } from '@/components/siteConfig'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo/site'

export type FaqItem = {
  question: string
  answer: string
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BagSupplyCo',
    url: siteUrl,
    logo: toAbsoluteUrl('/catalog/pharmacy/gs/GS-22-FRONT.webp'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-704-862-9256',
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'en',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Monroe',
      addressRegion: 'NC',
      postalCode: '28110',
      addressCountry: 'US',
    },
  }
}

export function buildDistributorServiceJsonLd() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Wholesale bag supply and drop-ship fulfillment',
    name: 'Wholesale Bag Supply for Distributors',
    description:
      'Factory-direct wholesale bag supply, blind shipping, and drop-ship fulfillment for distributor accounts serving pharmacy, veterinary, dispensary, and retail buyers.',
    provider: {
      '@type': 'Organization',
      name: 'BagSupplyCo',
      url: siteUrl,
      telephone: contactPhone,
    },
    areaServed: 'US',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  }
}
