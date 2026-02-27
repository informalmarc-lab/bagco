import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FromIdeaToBagCinematic from '@/components/FromIdeaToBagCinematic'
import HomeScrollMotion from '@/components/HomeScrollMotion'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
import QuickQuoteForm from '@/components/QuickQuoteForm'

export const metadata: Metadata = {
  title: 'Retail Packaging and Branding Partner for Regulated Retail',
  description:
    'Bag Supply Co delivers custom retail bags, custom dispensary bags, branded paper bags, and wholesale custom packaging programs with reliable turnaround for pharmacies, smoke shops, retailers, and wedding-event teams.',
  keywords: [
    'custom retail bags',
    'custom dispensary bags',
    'branded paper bags',
    'wholesale custom packaging',
    'pharmacy packaging bags',
  ],
}

const clarityPoints = [
  'Who we serve: regulated retail businesses and growth-focused storefronts.',
  'What we provide: branded paper bags and wholesale custom packaging programs.',
  'Why we are reliable: local support model with repeatable process and communication.',
  'Next step: request a custom quote or speak with our team directly.',
]

const authorityMetrics = [
  { label: 'Production Capacity', value: 'Scaled for Multi-Location Programs' },
  { label: 'Industries Served', value: 'Dispensary, Smoke Shop, Pharmacy, Retail' },
  { label: 'Volume Support', value: 'Startup to High-Volume Recurring Accounts' },
  { label: 'Typical Turnaround', value: 'Structured and Predictable by Program' },
  { label: 'Operational Model', value: 'Local Supply, Direct Communication, Clear Process' },
]

const problems = [
  {
    title: 'Generic Packaging Weakens Brand Perception',
    copy:
      'Unbranded bags make established businesses look temporary and interchangeable in competitive retail environments.',
  },
  {
    title: 'Inconsistent Supply Disrupts Operations',
    copy:
      'Missed deliveries and unclear reorder cycles create avoidable inventory stress and checkout bottlenecks.',
  },
  {
    title: 'Poor Presentation Reduces Customer Trust',
    copy:
      'In regulated retail, presentation quality directly affects credibility, repeat visits, and customer confidence.',
  },
]

const segments = [
  {
    title: 'Dispensaries',
    href: '/industries/dispensaries',
    copy: 'Discreet, compliant-ready custom dispensary bags with professional branded presentation.',
  },
  {
    title: 'Smoke Shops',
    href: '/industries/smoke-shops',
    copy: 'Branded paper bags designed for recognition, repeat traffic, and stronger local identity.',
  },
  {
    title: 'Pharmacies',
    href: '/industries/pharmacies',
    copy: 'Clean pharmacy packaging bags that support trust, consistency, and daily script volume.',
  },
  {
    title: 'Retail Stores',
    href: '/industries/retail-stores',
    copy: 'Custom retail bags that reinforce brand value and scale with store growth.',
  },
  {
    title: 'Retail & Boutiques',
    href: '/industries#industry-solutions',
    copy: 'Premium bag programs for apparel, footwear, jewelry, and gift-focused storefronts.',
  },
  {
    title: 'Veterinary',
    href: '/catalog/veterinary',
    copy: 'Reliable veterinary bag programs for clinics and animal care operations with repeat supply needs.',
  },
  {
    title: 'Food & Beverage',
    href: '/industries#industry-solutions',
    copy: 'Durable carry-out bag programs for cafes, bakeries, and fast-paced food service locations.',
  },
]

const outcomes = [
  'Improves customer perception at point-of-sale',
  'Increases brand recognition outside the store',
  'Supports repeat business with consistent brand presentation',
  'Strengthens store credibility in regulated markets',
  'Stabilizes packaging operations and inventory planning',
  'Protects revenue consistency by preventing supply gaps',
]

const processSteps = [
  {
    title: 'Consultation',
    copy: 'We define your retail goals, usage volume, and brand requirements.',
  },
  {
    title: 'Custom Design & Sizing',
    copy: 'We align graphics and bag formats to fit your customer experience.',
  },
  {
    title: 'Production',
    copy: 'Orders run through a controlled schedule built for quality and repeatability.',
  },
  {
    title: 'Delivery or Local Pickup',
    copy: 'You receive dependable fulfillment with a clear communication channel.',
  },
]

const objections = [
  {
    q: 'Do we have to place massive minimum orders?',
    a: 'No. Programs are structured around practical case volumes and scalable growth.',
  },
  {
    q: 'Can we customize design and bag format?',
    a: 'Yes. We support custom sizing, branding, and print guidance for regulated retail operations.',
  },
  {
    q: 'Is design support available?',
    a: 'Yes. We guide format, print layout, and brand presentation before production.',
  },
  {
    q: 'How reliable is turnaround?',
    a: 'Turnarounds are structured and communicated upfront to support real operational planning.',
  },
  {
    q: 'Do you support Net 30?',
    a: 'Yes. Net 30 terms are available for all clients, including recurring and one-time programs.',
  },
  {
    q: 'Can reorders be automated?',
    a: 'Yes. Automated recurring reorder schedules remove manual tracking and reduce shortage risk.',
  },
]

const testimonials = [
  {
    label: 'Dispensary',
    quote:
      'BagCo always delivers quality. The bags are durable, well-made, and exactly what we needed for our shop. Customer service is top-notch too!',
  },
  {
    label: 'Retail',
    quote:
      "I've tried multiple bag suppliers, but BagCo is hands down the best. Fast shipping, great customization options, and the material feels premium.",
  },
  {
    label: 'Retail',
    quote:
      'Perfect for our business needs. We ordered custom-printed bags, and they look fantastic. Highly recommend BagCo for anyone in retail.',
  },
  {
    label: 'Pharmacy',
    quote:
      'Reliable, professional, and consistent. Every order has arrived on time and exactly as requested. BagCo makes running our business easier.',
  },
  {
    label: 'Wedding',
    quote:
      'Great quality bags at a reasonable price. BagCo exceeded our expectations and made the ordering process simple and smooth.',
  },
  {
    label: 'Event',
    quote:
      "BagCo has become a dependable part of our operation. The ordering process is straightforward, turnaround times are consistent, and the finished bags present our brand exactly the way we want it. It's rare to find a supplier that delivers this level of reliability every time.",
  },
]

const faqItems = [
  {
    question: 'Do you provide custom retail bags and custom dispensary bags?',
    answer:
      'Yes. Bag Supply Co builds custom retail bags and custom dispensary bags with branding and format guidance for regulated retail environments.',
  },
  {
    question: 'Do you offer recurring reorder automation?',
    answer:
      'Yes. Automated reorder programs can be scheduled by week or month, with automatic production and invoicing workflows.',
  },
  {
    question: 'Are Net 30 terms available?',
    answer:
      'Yes. Net 30 terms are available to all retail clients for one-time and recurring orders.',
  },
  {
    question: 'What packaging categories do you support?',
    answer:
      'We support branded paper bags, pharmacy packaging bags, and wholesale custom packaging programs for retail operators.',
  },
]

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <HomeScrollMotion>
      <div className="pb-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#eadbc5_100%)]">
        <div className="section-container py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="kicker">Retail Packaging and Branding Partner</p>
              <h1 className="heading-serif mt-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
                Packaging Built to Make Retail Businesses Look Established and Operate Reliably
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-slate-700 md:text-xl">
                We support dispensaries, smoke shops, pharmacies, retailers, food service, and event teams with structured, scalable packaging programs designed for brand visibility and supply stability.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/generic-bag-quote" className="btn-primary">
                  Request a Custom Quote
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Speak With Our Team
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                No long intake process. Send your requirements and get a structured recommendation quickly.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300 bg-white/90 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-lg font-black text-slate-900">What You Know in 5 Seconds</h2>
                <div className="mt-4 grid gap-3">
                  {clarityPoints.map((item, idx) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-black text-slate-900">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-semibold text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <div className="relative h-48">
                  <Image
                    src="/catalog/pharmacy/gs/GS-22-FRONT.webp"
                    alt="Professional branded pharmacy bag"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-14 md:py-18">
        <h2 className="section-title heading-serif">Authority and Operational Strength</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {authorityMetrics.map((item) => (
            <div key={item.label} className="surface-card rounded-xl p-5">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
              <p className="mt-2 font-black text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/45 py-14 md:py-18">
        <div className="section-container">
          <h2 className="section-title heading-serif">The Retail Problem</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {problems.map((item) => (
              <div key={item.title} className="surface-card rounded-xl p-5">
                <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-700">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-slate-900/15 bg-slate-900 p-5 text-slate-100">
            Bag Supply Co solves this with structured packaging operations, professional design execution, and dependable replenishment.
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">Who We Serve</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((segment) => (
            <Link key={segment.title} href={segment.href} className="surface-card rounded-xl p-5 hover:shadow-md">
              <h3 className="text-2xl font-black text-slate-900">{segment.title}</h3>
              <p className="mt-2 text-slate-700">{segment.copy}</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-amber-800">View Industry Program</p>
            </Link>
          ))}
        </div>
      </section>

      <IndustrySolutionsSection />

      <section className="border-y border-slate-200 bg-[linear-gradient(135deg,#faf7f2,#f4f0e9)] py-16 md:py-20">
        <div className="section-container">
          <p className="kicker">Custom Wedding & Event Packaging</p>
          <h2 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">
            Premium Event Packaging with the Same Operational Reliability as Retail Programs
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            We support weddings, private events, hospitality teams, and corporate activations with polished custom bag programs for guest gifting, favors, and branded distribution.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="surface-card rounded-xl p-5">
              <h3 className="text-lg font-black text-slate-900">Gift & Favor Bags</h3>
              <p className="mt-2 text-sm text-slate-700">Custom packaging for wedding favors, welcome kits, and premium guest handoffs.</p>
            </div>
            <div className="surface-card rounded-xl p-5">
              <h3 className="text-lg font-black text-slate-900">Event Branding</h3>
              <p className="mt-2 text-sm text-slate-700">Branded bags for planners, venues, and event operators that need consistent presentation quality.</p>
            </div>
            <div className="surface-card rounded-xl p-5">
              <h3 className="text-lg font-black text-slate-900">Schedule-Aligned Production</h3>
              <p className="mt-2 text-sm text-slate-700">Production timelines matched to event dates to reduce last-minute packaging risk.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/weddings-events" className="btn-secondary">View Event Packaging</Link>
            <Link href="/generic-bag-quote" className="btn-primary">Request Event Quote</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/40 py-16 md:py-20">
        <div className="section-container">
          <h2 className="heading-serif text-4xl font-black text-slate-900">Built for Retail Operations</h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Packaging is not a side task. It impacts customer perception, repeat behavior, store credibility, and operational consistency.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item} className="surface-card rounded-lg px-4 py-3 text-sm font-semibold text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">Our Process: Simple. Structured. Reliable.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, idx) => (
            <div key={step.title} className="surface-card rounded-xl p-5">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-amber-800">Step {idx + 1}</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-amber-200 bg-[linear-gradient(130deg,#f8f3e8,#efe5d3)] py-16 md:py-20">
        <div className="section-container">
          <h2 className="heading-serif text-4xl font-black text-slate-900">Automated Reorder Program</h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Clients can automate reorders on a fixed schedule. Production, shipment, and invoicing run automatically to prevent shortages and remove manual reorder work.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            <li className="surface-card rounded-lg p-4">Set weekly or monthly reorder cadence aligned to your actual volume.</li>
            <li className="surface-card rounded-lg p-4">Automatic production and shipment workflow for predictable replenishment.</li>
            <li className="surface-card rounded-lg p-4">Automated invoices and cleaner purchasing process for your team.</li>
            <li className="surface-card rounded-lg p-4">Program rules can be customized per store, location, and demand profile.</li>
          </ul>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">Net 30 Terms</h2>
        <div className="mt-6 rounded-2xl border border-slate-300 bg-white p-6">
          <p className="text-lg text-slate-800">
            Net 30 is offered to all retail clients. Invoices are due 30 days from invoice date and apply to both one-time and recurring programs.
          </p>
          <p className="mt-3 text-slate-700">
            This supports professional B2B operations and long-term supply relationships without unnecessary cash-flow friction.
          </p>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/50 py-16 md:py-20">
        <div className="section-container">
          <h2 className="section-title heading-serif">Supply Stability and Infrastructure</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">Prevent Lost Revenue</h3>
              <p className="mt-2 text-slate-700">Consistent supply keeps checkout operations moving and protects conversion at the point of sale.</p>
            </div>
            <div className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">Protect Brand Reputation</h3>
              <p className="mt-2 text-slate-700">Reliable packaging quality keeps customer-facing presentation strong across all locations.</p>
            </div>
            <div className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">Reduce Operational Stress</h3>
              <p className="mt-2 text-slate-700">Structured reorder programs reduce emergencies and support long-term business growth planning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">Why Bag Supply Co Is Different</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="surface-card rounded-xl p-5">
            <h3 className="text-xl font-black text-slate-900">Common Supplier Problems</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>Overseas suppliers often introduce delay risk and communication gaps.</li>
              <li>Generic printers usually provide output, not an operational partnership.</li>
              <li>Large distributors can feel transactional and slow to adapt.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-[linear-gradient(135deg,#f5e8d3,#efe0c8)] p-5">
            <h3 className="text-xl font-black text-slate-900">Bag Supply Co Model</h3>
            <ul className="mt-3 space-y-2 text-slate-800">
              <li>Accessible team with direct communication.</li>
              <li>Consistent, relationship-driven support.</li>
              <li>Operational focus designed for repeat retail execution.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 md:py-20">
        <div className="section-container">
          <h2 className="section-title heading-serif">Objection Handling</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {objections.map((item) => (
              <div key={item.q} className="surface-card rounded-xl p-5">
                <h3 className="text-lg font-black text-slate-900">{item.q}</h3>
                <p className="mt-2 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">Client Testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.quote} className="surface-card rounded-xl p-5 text-slate-800">
              <p className="mb-3 text-lg text-amber-800">"</p>
              <p>{item.quote}</p>
              <footer className="mt-4 text-xs font-black uppercase tracking-[0.1em] text-slate-500">{item.label}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <FromIdeaToBagCinematic />

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {faqItems.map((item) => (
            <div key={item.question} className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">{item.question}</h3>
              <p className="mt-2 text-slate-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container pb-8 pt-4">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#f5e8d3,#e9dbc4)] p-8">
            <h2 className="heading-serif text-3xl font-black text-slate-900 md:text-4xl">Built for Retail Businesses Ready to Scale</h2>
            <p className="mt-4 text-slate-700">
              If you need a packaging partner that protects brand standards and supply reliability, request your custom program today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/generic-bag-quote" className="btn-primary">
                Request a Custom Quote
              </Link>
              <Link href="/contact" className="btn-secondary">
                Speak With Our Team
              </Link>
            </div>
          </div>
          <QuickQuoteForm />
        </div>
      </section>
      </div>
    </HomeScrollMotion>
  )
}
