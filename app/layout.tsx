import type { Metadata } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bagco.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bag Supply Co | Factory Direct Paper Bag Manufacturing',
    template: '%s | Bag Supply Co',
  },
  description:
    'Bag Supply Co manufactures custom and stock paper bags for independent pharmacies and retail businesses from Union County, North Carolina.',
  keywords: [
    'custom pharmacy paper bags',
    'pharmacy paper bags wholesale',
    'independent pharmacy packaging',
    'custom retail paper bags',
    'made in usa paper bags',
    'paper bag manufacturer',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Bag Supply Co | Factory Direct Paper Bag Manufacturing',
    description:
      'Factory direct custom and stock paper bags for independent pharmacies and retail businesses.',
    siteName: 'Bag Supply Co',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bag Supply Co | Pharmacy Paper Bags Manufacturer',
    description:
      'Factory direct pharmacy and retail paper bag manufacturing with low minimums.',
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
    '@type': 'LocalBusiness',
    name: 'Bag Supply Co',
    description:
      'Factory direct custom and stock paper bag manufacturing for pharmacies and retail.',
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
    areaServed: 'US',
  }

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sourceSerif.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main className="min-h-screen site-surface">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
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
