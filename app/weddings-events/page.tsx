import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Wedding & Event Packaging',
  description:
    'Premium custom wedding and event packaging including gift bags, favor bags, and branded event distribution with structured scheduling and bulk support.',
}

const offerings = [
  {
    title: 'Wedding Gift & Favor Packaging',
    copy: 'Elegant custom bags for guest gifts, favor kits, and curated welcome packaging.',
  },
  {
    title: 'Branded Event Distribution',
    copy: 'Custom event branding for launches, hosted experiences, and premium private events.',
  },
  {
    title: 'Schedule-Aligned Production',
    copy: 'Timeline coordination built around event dates to avoid last-minute packaging risk.',
  },
  {
    title: 'Bulk Event Ordering',
    copy: 'Operational support for high-guest-count events and recurring event programs.',
  },
]

export default function WeddingsEventsPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#faf7f2,#f2ece2)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Weddings & Events</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            Custom Wedding & Event Packaging
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Premium custom bags for weddings, parties, and hosted events with the same structured production and reliability trusted by our B2B retail clients.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Request Event Quote</Link>
            <Link href="/contact" className="btn-secondary">Speak With Our Team</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offerings.map((item) => (
            <div key={item.title} className="surface-card rounded-xl p-5">
              <h2 className="text-lg font-black text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image src="/catalog/holiday/e710c9e9ec_605429_bbe1b496.jpg" alt="Elegant event bag example" fill className="object-cover" />
          </div>
          <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image src="/catalog/winery/3cf46738b6_CBC_WFC_11_82500eb0.jpg" alt="Premium branded gift bag" fill className="object-cover" />
          </div>
          <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image src="/catalog/holiday/a88110f1e8_605435_79826e6b.jpg" alt="Wedding favor packaging example" fill className="object-cover" />
          </div>
        </div>
      </section>
    </div>
  )
}

