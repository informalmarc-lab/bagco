import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Bag Supply Co',
  description:
    'Learn how Bag Supply Co supports retail, pharmacy, veterinary, and food service clients with structured packaging programs built for operational consistency.',
}

const principles = [
  {
    title: 'Operational Consistency',
    copy: 'We run structured packaging programs that support repeat orders, predictable lead times, and clear communication.',
  },
  {
    title: 'Brand-First Presentation',
    copy: 'Our bag programs are built to protect brand standards and deliver a professional customer-facing finish.',
  },
  {
    title: 'Partnership Approach',
    copy: 'We work as a long-term packaging partner, not a one-off vendor, with support for recurring and one-time programs.',
  },
]

const capabilities = [
  'Custom retail bags and custom dispensary bags',
  'Branded paper bags for pharmacy and food service operations',
  'Veterinary bag programs for clinics and animal-care teams',
  'Wholesale custom packaging for recurring B2B accounts',
  'Net 30 terms and automated recurring reorder support',
]

export default function AboutPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">About Bag Supply Co</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            A Packaging Partner Built for Serious Operations
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Bag Supply Co supports retail, pharmacy, veterinary, and food service clients with premium bag programs focused on brand presentation, operational reliability, and long-term scale.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">How We Operate</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-700">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="section-container">
          <h2 className="section-title heading-serif">Core Capabilities</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="surface-card rounded-lg p-4 text-sm font-semibold text-slate-800">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Request a Custom Quote
            </Link>
            <Link href="/contact" className="btn-secondary">
              Speak With Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
