import Link from 'next/link'
import VeterinaryCatalogClient from '@/components/catalog/VeterinaryCatalogClient'
import { getVeterinaryCatalogImages } from '@/lib/catalogImages'

export default function VeterinaryCatalogPage() {
  const images = getVeterinaryCatalogImages()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Veterinary Catalog</p>
          <h1 className="heading-display mt-5">Veterinary Bag Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            VB1, VB2, and VB6 designs with stock options and additional custom examples.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <VeterinaryCatalogClient images={images} />

      <section className="section-container pt-3">
        <div className="tonal-panel">
          <h2 className="section-title">Need custom print instead?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog/custom" className="btn-secondary">Open Custom Catalog</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
