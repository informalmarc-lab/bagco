import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Veterinary Bag Catalog',
  description:
    'Browse wholesale veterinary bags for clinics that need stock sizes, custom print options, and dependable BagSupplyCo reorder support.',
  path: '/catalog/veterinary',
  imagePath: '/catalog/veterinary/vb1/VB1-22-FRONT.webp',
})

export default function VeterinaryCatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
