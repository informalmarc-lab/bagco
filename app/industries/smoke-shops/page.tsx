import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Smoke Shop Packaging Programs',
  description:
    'Packaging programs for smoke shops focused on stronger brand presence and reliable inventory planning.',
}

const pillars = [
  'Brand-forward carryout packaging',
  'Catalog and custom print flexibility',
  'Reorder support for growing store demand',
]

export default function SmokeShopsIndustryPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Focus</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Smoke Shop Packaging Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Use packaging as a visibility channel while keeping your daily operations simple and predictable.
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
          <Link href="/catalog/magazine-comics" className="btn-secondary">View Smoke Shop Catalogs</Link>
          <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          <a href={contactTextHref} className="btn-quiet">Text Our Team</a>
        </div>
      </section>
    </div>
  )
}

