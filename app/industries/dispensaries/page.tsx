import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Dispensary Packaging Programs',
  description:
    'Custom dispensary bag programs for brand visibility, discretion, and reliable recurring supply.',
}

const pillars = [
  'Discreet checkout-ready bag options',
  'Custom print programs for stronger brand carryout',
  'Stable case supply with reorder planning',
]

export default function DispensariesIndustryPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Focus</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Dispensary Packaging Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Build a dispensary packaging system that supports compliance-aware presentation and dependable day-to-day operations.
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
          <Link href="/catalog/dispensary" className="btn-secondary">View Dispensary Catalog</Link>
          <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          <a href={contactTextHref} className="btn-quiet">Text Our Team</a>
        </div>
      </section>
    </div>
  )
}

