import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Events and Hospitality Packaging',
  description:
    'Event and hospitality packaging programs are now included inside the Industries section for a unified experience.',
}

export default function WeddingsEventsPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#faf7f2,#f2ece2)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Updated Section</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            Events and Hospitality Is Now in Industries
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            We consolidated wedding, event, and hospitality packaging into the main Industries page so everything is in one place with the same structured format.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/industries#industry-solutions" className="btn-primary">
              View Industry Solutions
            </Link>
            <Link href="/generic-bag-quote" className="btn-secondary">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
