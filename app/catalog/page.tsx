import { Suspense } from 'react'
import CatalogExplorer from '@/components/CatalogExplorer'

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="section-container py-20 text-sm text-[#5F4D33]">Loading catalog...</div>}>
      <CatalogExplorer />
    </Suspense>
  )
}

