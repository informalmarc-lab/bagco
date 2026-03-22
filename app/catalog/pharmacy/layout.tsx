import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Pharmacy Bag Catalog | All Rx Bag Sizes & Designs | Bag Supply Co',
  },
  description:
    'Browse our full pharmacy bag catalog. All standard Rx sizes, stock designs, and custom print options with case-level pricing.',
  alternates: {
    canonical: '/catalog/pharmacy',
  },
}

export default function PharmacyCatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
