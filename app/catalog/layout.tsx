import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Bag Catalog',
  description:
    'Browse wholesale bags by industry, size, material, and availability so buyers can compare options, pricing, and BagSupplyCo supply programs faster.',
  path: '/catalog',
})

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
