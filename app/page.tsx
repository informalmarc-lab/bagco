import type { Metadata } from 'next'
import Link from 'next/link'
import AppleStory from '@/components/AppleStory'
import QuickQuoteForm from '@/components/QuickQuoteForm'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
import { contactPhone, contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Custom Paper Bag Manufacturer for Retail, Pharmacy, and Veterinary',
  description:
    'Bag Supply Co delivers custom retail bags, pharmacy packaging bags, and veterinary paper bag programs with predictable lead times and recurring reorder support.',
  keywords: [
    'custom retail bags',
    'pharmacy packaging bags',
    'veterinary paper bags',
    'wholesale custom packaging',
    'paper bag manufacturer',
  ],
}

const valueProps = [
  {
    title: 'Who We Serve',
    copy: 'Pharmacies, veterinary clinics, dispensaries, smoke shops, and growth retail teams.',
  },
  {
    title: 'What We Deliver',
    copy: 'Stock and custom paper bag programs with clear case-level quote structure.',
  },
  {
    title: 'Why Teams Stay',
    copy: 'Reliable production timelines and recurring reorder support that reduces operational stress.',
  },
]

const socialProof = [
  { label: 'Retail Clients', value: '500+' },
  { label: 'Bags Shipped', value: '10M+' },
  { label: 'Coverage', value: 'Ships Across the US' },
  { label: 'Terms', value: 'Net 30 Available' },
  { label: 'Lead Window', value: '3-4 Weeks' },
]

const pricingAnchors = [
  'Stock programs can start around $65.91 per case depending on size.',
  'Custom print programs start at 4-case minimum per selected bag type.',
  'Orders at 8+ total cases qualify for FSC-only freight model.',
]

const painVsOutcome = [
  {
    pain: 'Unclear restock timing creates checkout risk.',
    outcome: 'Structured replenishment keeps supply predictable.',
  },
  {
    pain: 'Generic packaging weakens brand perception.',
    outcome: 'Custom print options strengthen customer recall.',
  },
  {
    pain: 'Multiple vendors create communication drag.',
    outcome: 'One packaging partner keeps execution clean.',
  },
]

const reorderHighlights = [
  'Weekly or monthly reorder cadence based on your actual volume.',
  'Automatic production and billing flow for recurring accounts.',
  'Store-level program rules for multi-location operations.',
]

const testimonials = [
  {
    quote:
      'The case planning was clear, and reorders became automatic instead of chaotic.',
    person: 'R. Patel',
    location: 'Charlotte, NC',
    role: 'Independent Pharmacy Owner',
    business: 'Oakview Pharmacy',
  },
  {
    quote:
      'We moved from generic bags to custom print and immediately looked more established.',
    person: 'J. Monroe',
    location: 'Tampa, FL',
    role: 'Retail Operations Manager',
    business: 'Monroe Wellness Dispensary',
  },
  {
    quote:
      'Quality stayed consistent across repeat orders, and communication has been fast.',
    person: 'A. Kim',
    location: 'Raleigh, NC',
    role: 'Veterinary Practice Manager',
    business: 'Northgate Veterinary Clinic',
  },
]

const faqs = [
  {
    question: 'Can I order stock bags and custom printed bags from the same supplier?',
    answer:
      'Yes. We support both stock and custom programs so teams can move fast now and standardize branding over time.',
  },
  {
    question: 'Do you support pharmacy and veterinary operations specifically?',
    answer:
      'Yes. We run dedicated pharmacy and veterinary catalogs with established sizes, case counts, and recurring-order support.',
  },
  {
    question: 'Is there a way to estimate pricing before contacting sales?',
    answer:
      'Yes. Use our quote tool to build a case-based estimate, then send it to our team for review and final freight details.',
  },
  {
    question: 'Do you offer recurring reorder programs?',
    answer:
      'Yes. We help set practical reorder cadence so packaging does not become a manual weekly fire drill.',
  },
]

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="split-panel items-start">
            <div>
              <p className="kicker">Custom and Stock Paper Bag Programs</p>
              <h1 className="heading-display mt-5">
                Packaging Programs Built for Teams That Need Reliability
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Bag Supply Co helps pharmacies, retail stores, veterinary clinics, and dispensaries manage packaging with cleaner branding, clearer lead times, and repeatable replenishment.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-700">
                Questions? Text us: <a href={contactTextHref} className="underline">{contactPhone}</a>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/generic-bag-quote" className="btn-primary">
                  Build a Quote
                </Link>
                <Link href="/catalog" className="btn-secondary">
                  Explore Catalogs
                </Link>
                <a href={contactTextHref} className="btn-quiet">
                  Text Our Team
                </a>
              </div>
            </div>

            <div className="hero-panel">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">Price and Program Anchors</p>
              <div className="mt-4 grid gap-3">
                {pricingAnchors.map((item) => (
                  <div key={item} className="surface-card rounded-2xl p-4">
                    <p className="text-sm font-semibold text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-8">
        <div className="tonal-panel">
          <p className="kicker">Social Proof</p>
          <h2 className="section-title mt-4">Trusted by High-Volume Packaging Teams</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {socialProof.map((item) => (
              <article key={item.label} className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-8">
        <div className="grid gap-3 md:grid-cols-3">
          {valueProps.map((item) => (
            <article key={item.title} className="tonal-panel">
              <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm muted-text">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <AppleStory />

      <section className="section-container py-8 md:py-14">
        <div className="tonal-panel">
          <h2 className="section-title">From Packaging Friction to Operational Clarity</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {painVsOutcome.map((item) => (
              <article key={item.pain} className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">Before</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{item.pain}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.1em] text-blue-700">After</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-1">
        <div className="tonal-panel">
          <p className="kicker">Automated Reorder Program</p>
          <h2 className="section-title mt-4">Stop Manually Chasing Reorders</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {reorderHighlights.map((item) => (
              <article key={item} className="surface-card rounded-2xl p-4">
                <p className="text-sm font-semibold text-slate-800">{item}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="btn-secondary mt-6">
            Set Up Recurring Program
          </Link>
        </div>
      </section>

      <IndustrySolutionsSection />

      <section className="section-container py-10 md:py-16">
        <div className="split-panel items-start">
          <div className="tonal-panel">
            <p className="kicker">Client Feedback</p>
            <h2 className="section-title mt-4">Trusted by Real Operators</h2>
            <div className="mt-6 grid gap-3">
              {testimonials.map((item) => (
                <article key={item.quote} className="surface-card rounded-2xl p-4">
                  <p className="text-sm text-slate-800">"{item.quote}"</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.1em] text-slate-500">
                    {item.person} | {item.business} | {item.role} | {item.location}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <QuickQuoteForm />
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">FAQ</p>
          <h2 className="section-title mt-4">Answers Before You Reach Out</h2>
          <div className="mt-6 grid gap-3">
            {faqs.map((item) => (
              <article key={item.question} className="surface-card rounded-2xl p-4">
                <h3 className="text-lg font-black text-slate-950">{item.question}</h3>
                <p className="mt-2 text-sm muted-text">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">Social Media</p>
          <h2 className="section-title mt-4">Follow Bag Supply Co</h2>
          <p className="mt-3 muted-text">
            See updates, product highlights, and recent packaging work on Facebook.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=61586254914821"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5"
          >
            Visit Our Facebook
          </a>
        </div>
      </section>
    </div>
  )
}
