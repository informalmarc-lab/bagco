import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn how Bag Supply Co supports pharmacies, retail stores, and veterinary teams with modern packaging programs and reliable replenishment.',
}

const principles = [
  {
    title: 'Operational Clarity',
    copy: 'You get clear catalog options, case-level guidance, and direct communication from quote through delivery.',
  },
  {
    title: 'Brand Consistency',
    copy: 'Stock and custom programs are built to keep customer-facing packaging aligned with your brand standards.',
  },
  {
    title: 'Long-Term Support',
    copy: 'We focus on repeat supply and stable reorder rhythms, not one-off transactions.',
  },
]

const capabilityList = [
  'Stock pharmacy and veterinary catalog programs',
  'Custom 1-color, 2-color, and 3-color printing',
  'Case-based quote workflow for faster decisions',
  'Recurring reorder support for scaling operations',
  'Net terms options for qualified clients',
]

export default function AboutPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">About Bag Supply Co</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">
            A Packaging Partner Built Around Repeatable Execution
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We work with operational teams that need packaging to stay reliable, understandable, and scalable as demand grows.
          </p>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="tonal-panel">
              <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
              <p className="mt-3 muted-text">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-3">
        <div className="tonal-panel">
          <h2 className="section-title">What We Deliver</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {capabilityList.map((item) => (
              <p key={item} className="surface-card rounded-2xl p-4 text-sm font-semibold text-slate-800">
                {item}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-secondary">
              Browse Catalogs
            </Link>
            <Link href="/generic-bag-quote" className="btn-primary">
              Open Quote Tool
            </Link>
            <a href={contactTextHref} className="btn-quiet">
              Text Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}


