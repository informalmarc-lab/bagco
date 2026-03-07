import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pharmacy Bags',
  description:
    'Factory-direct pharmacy and veterinary bag programs with stock and custom options, low minimums, and predictable supply.',
}

const highlights = [
  'Stock GS/TY pharmacy programs with common sizes',
  'Veterinary VB programs for clinic workflows',
  'Custom print options for brand consistency',
  'Case-based planning and recurring reorder support',
]

const catalogLinks = [
  {
    title: 'Pharmacy Catalog',
    href: '/catalog/pharmacy',
    copy: 'GS, TY, and plastic programs with case-level details.',
  },
  {
    title: 'Veterinary Catalog',
    href: '/catalog/veterinary',
    copy: 'VB1, VB2, and VB6 programs plus custom examples.',
  },
  {
    title: 'Custom Catalog',
    href: '/catalog/custom',
    copy: '1-color, 2-color, and 3-color print options.',
  },
]

export default function PharmacyBagsPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Core Program</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Pharmacy and Veterinary Bag Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Reliable stock and custom bag supply for healthcare-adjacent operations that need clear case planning.
          </p>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-3 md:grid-cols-2">
          {highlights.map((item) => (
            <p key={item} className="tonal-panel text-sm font-semibold text-[#5F4D33]">{item}</p>
          ))}
        </div>
      </section>

      <section className="section-container pb-2">
        <h2 className="section-title">Browse Programs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {catalogLinks.map((catalog) => (
            <Link key={catalog.href} href={catalog.href} className="tonal-panel hover:translate-y-[-2px] transition-transform">
              <h3 className="text-2xl font-black text-[#1E4D2B]">{catalog.title}</h3>
              <p className="mt-2 text-sm muted-text">{catalog.copy}</p>
              <p className="mt-5 text-sm font-black uppercase tracking-[0.08em] text-[#B5813A]">Open Catalog</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          <Link href="/custom-printing" className="btn-secondary">Custom Printing</Link>
        </div>
      </section>
    </div>
  )
}


