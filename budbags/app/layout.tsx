import type { Metadata } from 'next'
import './globals.css'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  metadataBase: new URL('https://budbags.net'),
  title: {
    default: 'Bud Bags | Custom Paper Bags for Dispensaries',
    template: '%s | Bud Bags',
  },
  description:
    'Factory-direct custom printed and stock paper exit bags for cannabis shops managing checkout branding, bag-law pressure, and fast reorders.',
  openGraph: {
    title: 'Bud Bags | Custom Paper Bags for Dispensaries',
    description:
      'Factory-direct custom printed and stock paper exit bags for cannabis shops with real pricing, fast quote follow-up, and practical reorder support.',
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
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
