import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Retail Store Packaging Programs',
  description:
    'Custom retail paper bag programs for boutiques and storefront teams that need quality and predictable supply.',
}

const pillars = [
  'Custom branding options for premium presentation',
  'Stock and custom paths for fast rollout',
  'Operational planning for recurring orders',
]

export default function RetailStoresIndustryPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Focus</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Retail Store Packaging Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Create cleaner checkout experience and consistent brand delivery with case-based retail bag programs.
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
          <Link href="/catalog/custom" className="btn-secondary">View Custom Catalog</Link>
          <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          <a href={contactTextHref} className="btn-quiet">Text Our Team</a>
        </div>
      </section>
    </div>
  )
}

