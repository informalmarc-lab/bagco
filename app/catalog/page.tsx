import type { Metadata } from 'next'
import CatalogExplorer from '@/components/CatalogExplorer'

export const metadata: Metadata = {
  alternates: {
    canonical: '/catalog',
  },
}

export default function CatalogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return <CatalogExplorer searchParams={searchParams} />
}

