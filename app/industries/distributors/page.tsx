import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Distributors',
  description:
    'Wholesale paper bag programs for distributors with factory-direct supply, blind shipping, and drop shipping support.',
}

export default function DistributorsIndustryPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Focus</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">
            Wholesale Paper Bag Programs for Distributors
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We work directly with distributors who need reliable factory-direct supply, blind shipping, and drop
            shipping to their end customers.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.08em] text-[#5F4D33]">
            <span className="rounded-full bg-white px-3 py-1.5">Factory-Direct Pricing</span>
            <span className="rounded-full bg-white px-3 py-1.5">Blind Shipping</span>
            <span className="rounded-full bg-white px-3 py-1.5">Drop Shipping</span>
            <span className="rounded-full bg-white px-3 py-1.5">Recurring Supply Programs</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <Link href="/catalog" className="btn-secondary">
              Explore Catalogs
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container py-10">
        <div className="split-panel items-start">
          <article className="tonal-panel">
            <h2 className="text-2xl font-black text-[#1E4D2B]">Why Bag Supply Co</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#5F4D33]">
              <li>Factory-direct pricing with no middleman markup</li>
              <li>High-volume case programs for repeat distributor demand</li>
              <li>Blind shipping so your brand stays front and center</li>
            </ul>

            <h3 className="mt-7 text-xl font-black text-[#1E4D2B]">Problems We Solve</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5F4D33]">
              <li>Inconsistent supplier quality</li>
              <li>Branding exposure to end customers</li>
              <li>Unreliable lead times and no drop ship support</li>
            </ul>

            <h3 className="mt-7 text-xl font-black text-[#1E4D2B]">Business Benefits</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#5F4D33]">
              <li>Protect customer relationships with blind shipping</li>
              <li>Expand your catalog without holding inventory through drop shipping</li>
              <li>Reliable recurring supply for your distributor accounts</li>
            </ul>
          </article>

          <aside className="tonal-panel">
            <h2 className="section-title">Distributor Program Fit</h2>
            <p className="mt-3 text-sm text-[#5F4D33]">
              Build a wholesale program with factory-direct pricing, distributor-safe fulfillment, and repeatable lead
              time planning.
            </p>
            <div className="mt-5 grid gap-2">
              <p className="surface-card rounded-xl px-3 py-2 text-sm font-semibold text-[#5F4D33]">
                Blind ship protects your customer relationships.
              </p>
              <p className="surface-card rounded-xl px-3 py-2 text-sm font-semibold text-[#5F4D33]">
                Drop ship expands catalog reach without warehouse inventory.
              </p>
              <p className="surface-card rounded-xl px-3 py-2 text-sm font-semibold text-[#5F4D33]">
                Recurring replenishment supports account-level consistency.
              </p>
            </div>
            <Link href="/generic-bag-quote" className="btn-primary mt-5">
              Build a Quote
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Ready to Activate Distributor Fulfillment?</h2>
          <p className="mt-3 muted-text">
            Send your volume and fulfillment requirements and we will return a clear program recommendation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-secondary">
              Explore Catalogs
            </Link>
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
