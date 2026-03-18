import Link from 'next/link'
import PharmacyCatalogClient from '@/components/catalog/PharmacyCatalogClient'
import { getPharmacyCatalogImages } from '@/lib/catalogImages'

export default function PharmacyCatalogPage() {
  const images = getPharmacyCatalogImages()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Pharmacy Catalog</p>
          <h1 className="heading-display mt-5">Pharmacy Bag Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            TY, GS, and plastic GS options with clear size and case details.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <PharmacyCatalogClient images={images} />

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Need a veterinary program instead?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog/veterinary" className="btn-secondary">Open Veterinary Catalog</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
