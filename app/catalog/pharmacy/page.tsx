import Link from 'next/link'
import PharmacyCatalogClient from '@/components/catalog/PharmacyCatalogClient'
import RelatedIndustryLinks from '@/components/seo/RelatedIndustryLinks'
import { getPharmacyCatalogImages, type PharmacyCatalogImages } from '@/lib/catalogImages'

export default function PharmacyCatalogPage() {
  const sourceImages = getPharmacyCatalogImages()
  const images: PharmacyCatalogImages = {
    ty: sourceImages.ty.map((image) => ({ ...image, type: 'ty' })),
    gs: sourceImages.gs.map((image) => ({ ...image, type: 'gs' })),
    'plastic-gs': sourceImages['plastic-gs'].map((image) => ({ ...image, type: 'plastic-gs' })),
  }

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Pharmacy Catalog</p>
          <h1 className="heading-display mt-5">Wholesale Pharmacy Bags for Independent Pharmacies</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            TY, GS, and plastic GS options with clear size and case details.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <PharmacyCatalogClient images={images} />

      <RelatedIndustryLinks
        title="Related pharmacy and clinic packaging pages."
        intro="Use these industry pages when you want category-specific buying guidance before choosing SKUs."
        links={[
          {
            href: '/industries/pharmacies',
            label: 'Wholesale Paper Bags for Independent Pharmacies',
            description: 'See stock and custom pharmacy bag recommendations built around prescription pickup workflows.',
          },
          {
            href: '/industries/veterinary',
            label: 'Veterinary Clinic Bag Programs',
            description: 'Compare another healthcare bag program with similar medication handoff and clinic checkout needs.',
          },
        ]}
      />

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Need wholesale veterinary bags instead?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog/veterinary" className="btn-secondary">Open Veterinary Catalog</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
