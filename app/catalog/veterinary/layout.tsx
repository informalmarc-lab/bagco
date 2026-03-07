import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Veterinary Bag Catalog | Paper Bags for Vet Clinics | Bag Supply Co',
  },
  description:
    'Stock and custom veterinary paper bags. Standard vet sizes available for immediate shipping or custom print programs.',
}

export default function VeterinaryCatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
