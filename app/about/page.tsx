import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'About',
  description:
    'Learn how Bag Supply Co supports pharmacies, retail stores, and veterinary teams with modern packaging programs and reliable replenishment.',
  path: '/about',
})

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
          <h1 className="heading-display mt-5">
            A Packaging Partner Built Around Repeatable Execution
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We work with operational teams that need packaging to stay reliable, understandable, and scalable as demand grows.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="tonal-panel">
              <h2 className="font-serif text-2xl text-brand-600">{item.title}</h2>
              <p className="mt-3 muted-text">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <h2 className="section-title">What We Deliver</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {capabilityList.map((item) => (
              <p key={item} className="surface-card rounded-2xl p-4 text-sm font-semibold text-muted">
                {item}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-secondary">
              Browse Catalogs
            </Link>
            <a href={contactTextHref} className="btn-quiet">
              Text Our Team
            </a>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="tonal-panel">
            <p className="kicker">How We Work</p>
            <h2 className="section-title mt-4 text-2xl md:text-3xl">Packaging decisions should feel easier, not noisier.</h2>
            <p className="mt-3 muted-text">
              We structure the buying process around case counts, repeat sizes, and real reorder behavior so teams can move
              without second-guessing every SKU. That usually means a clearer stock lane now and a more strategic custom lane later.
            </p>
            <p className="mt-4 muted-text">
              Instead of pushing one-off orders, we focus on programs that can actually be repeated by stores, clinics, and distributors
              who need the same outcome month after month.
            </p>
          </article>

          <article className="tonal-panel">
            <p className="kicker">Who We Support</p>
            <div className="mt-4 grid gap-3">
              {[
                'Independent and multi-location pharmacies',
                'Veterinary clinics and pet-care teams',
                'Dispensaries and smoke shops',
                'Distributors needing blind ship or drop ship support',
              ].map((item) => (
                <p key={item} className="surface-card rounded-2xl px-4 py-3 text-sm font-semibold text-brand-600">
                  {item}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">What To Expect</p>
          <h2 className="section-title mt-4">A steady process from first order to repeat replenishment.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                title: 'Get Oriented',
                copy: 'We help narrow the right catalog, bag format, and case model for how your team actually uses packaging.',
              },
              {
                title: 'Place With Confidence',
                copy: 'Pricing, quantities, and timelines stay visible so there are fewer surprises once an order is moving.',
              },
              {
                title: 'Reorder Smoothly',
                copy: 'Once the first lane is working, we help turn it into a repeatable reorder rhythm instead of a fresh scramble.',
              },
            ].map((item) => (
              <article key={item.title} className="surface-card rounded-2xl p-4">
                <h3 className="font-serif text-lg text-brand-600">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
