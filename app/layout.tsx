import type { Metadata } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/SiteChrome'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bagsupplyco.com'
const ogImage = `${siteUrl}/catalog/pharmacy/gs/GS-22-FRONT.webp`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bag Supply Co | Custom Paper Bag Manufacturing and Packaging Programs',
    template: '%s | Bag Supply Co',
  },
  description:
    'Bag Supply Co manufactures custom and stock paper bags for pharmacies, veterinary clinics, dispensaries, smoke shops, and retail operations with structured reorder support and predictable delivery.',
  keywords: [
    'custom retail bags',
    'custom dispensary bags',
    'branded paper bags',
    'paper bag manufacturer',
    'wholesale custom packaging',
    'pharmacy packaging bags',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Bag Supply Co | Custom Paper Bag Manufacturing',
    description:
      'Custom and stock paper bag programs for regulated retail and healthcare-adjacent operations with reliable replenishment.',
    siteName: 'Bag Supply Co',
    locale: 'en_US',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Bag Supply Co branded packaging programs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bag Supply Co | Paper Bag Manufacturer',
    description:
      'Custom retail, pharmacy, and veterinary bag programs with clear lead times and repeat supply support.',
    images: [ogImage],
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bag Supply Co',
    description:
      'Custom paper bag manufacturing and packaging programs for pharmacies, retail stores, veterinary clinics, and dispensaries.',
    telephone: '+1-252-516-1944',
    email: 'info@bagco.com',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '912 Houston Drive',
      addressLocality: 'Monroe',
      addressRegion: 'NC',
      postalCode: '28110',
      addressCountry: 'US',
    },
    logo: `${siteUrl}/catalog/pharmacy/gs/GS-22-FRONT.webp`,
    areaServed: 'US',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bag Supply Co',
    url: siteUrl,
    inLanguage: 'en-US',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom Paper Bag Manufacturing and Reorder Programs',
    provider: {
      '@type': 'Organization',
      name: 'Bag Supply Co',
      url: siteUrl,
    },
    areaServed: 'US',
    serviceType: 'Custom printed paper bags and stock bag catalog programs',
  }

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sourceSerif.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
