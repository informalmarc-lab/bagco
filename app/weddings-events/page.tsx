import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Pharmacy and Veterinary Packaging Programs',
  description:
    'Structured packaging programs for pharmacy and veterinary operations requiring reliable case supply and professional presentation.',
}

const offerings = [
  'Stock pharmacy programs (GS/TY/plastic)',
  'Veterinary VB program options',
  'Custom 1/2/3 color print pathways',
  'Recurring reorder support for stable supply',
]

export default function ProgramsPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Program Overview</p>
          <h1 className="heading-display mt-5">Pharmacy and Veterinary Packaging, Simplified</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We combine catalog clarity, production planning, and recurring support so day-to-day packaging stays consistent.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
            <a href={contactTextHref} className="btn-quiet">Text Our Team</a>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {offerings.map((item) => (
            <article key={item} className="tonal-panel">
              <p className="text-sm font-semibold text-[#5F4D33]">{item}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catalog/pharmacy" className="btn-secondary">Pharmacy Catalog</Link>
          <Link href="/catalog/veterinary" className="btn-secondary">Veterinary Catalog</Link>
          <Link href="/catalog/custom" className="btn-secondary">Custom Catalog</Link>
        </div>
      </section>
    </div>
  )
}



