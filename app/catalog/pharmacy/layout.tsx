import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Pharmacy Bag Catalog',
  description:
    'Shop wholesale pharmacy bags for independent pharmacies and buyers who need stock sizes, pricing clarity, and BagSupplyCo reorder support.',
  path: '/catalog/pharmacy',
  imagePath: '/catalog/pharmacy/gs/GS-22-FRONT.webp',
})

export default function PharmacyCatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
