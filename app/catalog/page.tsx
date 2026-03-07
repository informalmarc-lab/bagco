import { Suspense } from 'react'
import CatalogExplorer from '@/components/CatalogExplorer'

export default function CatalogPage() {
  return (
    <Suspense fallback={<section className="section-container py-12"><p className="tonal-panel text-center muted-text">Loading catalog...</p></section>}>
      <CatalogExplorer />
    </Suspense>
  )
}
