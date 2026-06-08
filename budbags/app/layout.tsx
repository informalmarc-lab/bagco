import type { Metadata } from 'next'
import './globals.css'
import VisitorBeacon from '@/app/components/VisitorBeacon'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  metadataBase: new URL('https://budbags.net'),
  title: {
    default: 'Bud Bags | Custom Paper Bags for Dispensaries',
    template: '%s | Bud Bags',
  },
  description:
    'Custom printed paper bags for cannabis dispensaries. Factory direct, low minimums, ships fast. Get a quote today.',
  openGraph: {
    title: 'Bud Bags | Custom Paper Bags for Dispensaries',
    description:
      'Custom printed paper bags for cannabis dispensaries. Factory direct, low minimums, ships fast. Get a quote today.',
    url: 'https://budbags.net',
    siteName: 'Bud Bags',
    images: [
      {
        url: 'https://bagsupplyco.com/catalog/custom/2-color/CBC-25-FC2C.webp',
        width: 1200,
        height: 900,
        alt: 'Custom printed Bud Bags paper bag for dispensaries',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <VisitorBeacon />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
