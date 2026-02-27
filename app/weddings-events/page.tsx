import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pharmacy and Veterinary Packaging Programs',
  description:
    'Structured pharmacy and veterinary packaging programs with dependable production timelines and repeatable supply support.',
  keywords: ['custom retail bags', 'branded paper bags', 'wholesale custom packaging'],
}

const offerings = [
  {
    title: 'Pharmacy GS and TY Programs',
    copy: 'Structured stock program options with dependable case quantities and repeat ordering support.',
  },
  {
    title: 'Veterinary VB Programs',
    copy: 'Reliable VB design options built for veterinary clinic workflows and daily medication handoff consistency.',
  },
  {
    title: 'Custom 1/2/3 Color Programs',
    copy: 'Custom print programs to keep pharmacy and veterinary branding consistent across every order.',
  },
]

const reliabilityPoints = [
  'Structured production schedules aligned to recurring reorder cycles',
  'Bulk volume support for high-frequency pharmacy and clinic demand',
  'Design and size guidance to keep presentation consistent',
  'Net 30 terms and recurring reorder support for repeat clients',
]

export default function WeddingsEventsPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#faf7f2,#f2ece2)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Pharmacy and Veterinary</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            Pharmacy and Veterinary Packaging Built for Professional Execution
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Bag Supply Co supports pharmacies and veterinary operators with branded packaging programs that deliver clean presentation and dependable timelines.
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
            Share your volume, sizing, and branding goals. We return a structured program recommendation.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">Pharmacy and Veterinary Packaging Programs</h2>
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
          <h2 className="section-title heading-serif">Operational Reliability for Daily Demand</h2>
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
              Request Program Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
