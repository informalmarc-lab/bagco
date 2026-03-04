import type { Metadata } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeadDock from '@/components/LeadDock'

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
        <Navbar />
        <main className="min-h-screen site-surface">{children}</main>
        <LeadDock />
        <Footer />
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/699cb9545da48c1c32d4390f/1ji637sal';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
