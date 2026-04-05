import type { Metadata } from 'next'
import CatalogExplorer from '@/components/CatalogExplorer'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Bag Catalog',
  description:
    'Browse wholesale bags by industry, size, material, and availability so buyers can compare options, pricing, and BagSupplyCo supply programs faster.',
  path: '/catalog',
})

export default function CatalogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return <CatalogExplorer searchParams={searchParams} />
}

