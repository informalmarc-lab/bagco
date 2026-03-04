import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Pharmacy Packaging Programs',
  description:
    'Pharmacy packaging programs with dependable sizing, case-level planning, and repeat reorder support.',
}

const pillars = [
  'Pharmacy-first bag sizes and catalog structure',
  'Reliable case availability for script volume',
  'Custom print options for trust-focused presentation',
]

export default function PharmaciesIndustryPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Focus</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Pharmacy Packaging Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Keep pharmacy operations smooth with clear case planning, stable replenishment, and professional checkout presentation.
          </p>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item} className="tonal-panel">
              <p className="text-base font-semibold text-slate-900">{item}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catalog/pharmacy" className="btn-secondary">View Pharmacy Catalog</Link>
          <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          <a href={contactTextHref} className="btn-quiet">Text Our Team</a>
        </div>
      </section>
    </div>
  )
}

