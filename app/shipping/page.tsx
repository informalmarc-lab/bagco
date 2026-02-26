import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'Bag Supply Co shipping and fuel surcharge policy for orders under and over 8 cases, including UPS zone-based FSC rules and LTL guidance.',
}

export default function ShippingPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Shipping Policy</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            Freight and Fuel Surcharge Policy
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Shipping is handled by case volume and destination zone. This policy applies to bag orders and quote estimates.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-black text-slate-900">Order Size Rules</h2>
            <ol className="mt-4 space-y-3 text-slate-700">
              <li>1. Orders under 8 total cases ship UPS Ground. Freight is added to the invoice.</li>
              <li>2. Orders at 8 total cases or more are charged Fuel Surcharge (FSC) only.</li>
              <li>3. FSC is calculated as a percentage of total order value based on UPS zone group.</li>
            </ol>
          </div>

          <div className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-black text-slate-900">Fuel Surcharge Groups</h2>
            <div className="mt-4 space-y-3 text-slate-700">
              <p><strong>Group 1 (UPS Zones 2-3):</strong> 5.0% of total order</p>
              <p><strong>Group 2 (UPS Zones 4-6):</strong> 7.5% of total order</p>
              <p><strong>Group 3 (UPS Zones 7-8):</strong> 10.0% of total order</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-900 p-6 text-slate-100">
          <h2 className="text-2xl font-black text-white">LTL Shipping</h2>
          <p className="mt-3">
            Large orders shipping via LTL use a flat-rate FSC per pallet. Contact Bag Supply Co directly for current LTL pallet rates.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/generic-bag-quote" className="btn-primary">
            Request a Quote
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  )
}
