import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse Bag Supply Co catalog products by industry, bag type, size, color options, and stock/custom availability with case-level pricing anchors.',
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
