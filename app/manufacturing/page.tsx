import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Manufacturing',
  description:
    'Factory-direct paper bag manufacturing in North Carolina with predictable production and recurring supply support.',
  path: '/manufacturing',
})

const strengths = [
  'Factory-direct communication and pricing',
  'Modern paper bag manufacturing workflow',
  'Support for stock and custom print programs',
  'Production planning for recurring reorder accounts',
]

const photos = [
  '/catalog/pharmacy/gs/GS-22-FRONT.webp',
  '/catalog/custom/2-color/CBC-22-FC2C.webp',
  '/catalog/veterinary/vb1/VB1-22-FRONT.webp',
]

export default function ManufacturingPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Manufacturing</p>
          <h1 className="heading-display mt-5">Factory Direct, Built for Repeatability</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We manufacture and coordinate packaging programs from North Carolina with the goal of predictable quality and dependable timelines.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-3 md:grid-cols-2">
          {strengths.map((item) => (
            <p key={item} className="tonal-panel text-sm font-semibold text-muted">{item}</p>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {photos.map((src) => (
            <div key={src} className="surface-card relative h-56 overflow-hidden rounded-2xl">
              <Image src={src} alt="Manufacturing and finished bag examples" fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catalog" className="btn-secondary">Browse Catalogs</Link>
        </div>
      </section>
    </div>
  )
}



