import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import VisitorBeacon from '@/app/components/VisitorBeacon'
import SiteChrome from '@/components/SiteChrome'
import { buildPageTitle } from '@/lib/seo/pageMetadata'
import { getSiteUrl } from '@/lib/seo/site'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
})

const siteUrl = getSiteUrl()
const ogImage = `${siteUrl}/catalog/pharmacy/gs/GS-22-FRONT.webp`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: buildPageTitle('Wholesale Bags'),
    template: '%s',
  },
  description:
    'Wholesale bag programs for pharmacies, vet clinics, dispensaries, smoke shops, retailers, and distributors with dependable supply from BagSupplyCo.',
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
    title: buildPageTitle('Wholesale Bags'),
    description:
      'Wholesale bag programs for pharmacies, vet clinics, dispensaries, smoke shops, retailers, and distributors.',
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
    title: buildPageTitle('Wholesale Bags'),
    description:
      'Wholesale bags with catalog pricing, custom print options, and repeat supply support from BagSupplyCo.',
    images: [ogImage],
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id="microsoft-clarity" strategy="beforeInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wzh6y6cdyt");
          `}
        </Script>
      </head>
      <body className={`${dmSans.variable} ${dmSerif.variable}`}>
        <VisitorBeacon />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
