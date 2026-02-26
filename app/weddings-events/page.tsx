import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Wedding and Event Packaging',
  description:
    'Premium custom wedding and event packaging including gift bags, favors, and branded event distribution with reliable production timelines.',
  keywords: ['custom retail bags', 'branded paper bags', 'wholesale custom packaging'],
}

const offerings = [
  {
    title: 'Wedding Gift Bag Programs',
    copy: 'Elegant custom bags for guest gifts, welcome kits, and curated wedding favors with consistent finishing quality.',
  },
  {
    title: 'Corporate Event Packaging',
    copy: 'Branded event bags for conferences, launches, and hosted activations where presentation quality impacts brand perception.',
  },
  {
    title: 'Hotel and Resort Amenity Bags',
    copy: 'Premium amenity and concierge bag programs aligned to property branding and operational volume.',
  },
]

const reliabilityPoints = [
  'Structured production schedules aligned to event dates',
  'Bulk volume support for high guest counts and multi-day events',
  'Design and size guidance to keep presentation consistent',
  'Net 30 terms and recurring reorder support for repeat event clients',
]

export default function WeddingsEventsPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#faf7f2,#f2ece2)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Events and Weddings</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            Custom Wedding and Event Packaging Built for Professional Execution
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Bag Supply Co supports wedding planners, hospitality teams, and corporate event operators with branded packaging programs that deliver premium presentation and dependable timelines.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Request a Custom Quote
            </Link>
            <Link href="/contact" className="btn-secondary">
              Speak With Our Team
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Share event date, volume, and design goals. We return a structured program recommendation.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">Custom Wedding and Event Packaging Programs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-700">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="section-container">
          <h2 className="section-title heading-serif">Operational Reliability for Event Teams</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {reliabilityPoints.map((point) => (
              <li key={point} className="surface-card rounded-lg p-4 text-sm font-semibold text-slate-800">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/industries#industry-solutions" className="btn-secondary">
              View Industry Solutions
            </Link>
            <Link href="/generic-bag-quote" className="btn-primary">
              Request Event Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
