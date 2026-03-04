import type { Metadata } from 'next'
import Link from 'next/link'
import AppleStory from '@/components/AppleStory'
import QuickQuoteForm from '@/components/QuickQuoteForm'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'
import { contactTextHref } from '@/components/siteConfig'

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

const trustPoints = [
  {
    label: 'Programs',
    value: 'Stock + Custom 1/2/3 Color',
    copy: 'Choose speed with stock options or build brand consistency with custom print runs.',
  },
  {
    label: 'Industries',
    value: 'Retail, Pharmacy, Veterinary, Dispensary',
    copy: 'Packaging systems tailored to regulated and high-frequency checkout environments.',
  },
  {
    label: 'Order Model',
    value: 'One-Time + Recurring Reorders',
    copy: 'Scale from first program launch to stable recurring replenishment.',
  },
]

const painVsOutcome = [
  {
    pain: 'Unclear restock timing creates checkout risk',
    outcome: 'Structured replenishment keeps supply predictable',
  },
  {
    pain: 'Generic packaging weakens brand perception',
    outcome: 'Custom print options strengthen customer recall',
  },
  {
    pain: 'Multiple vendors create communication drag',
    outcome: 'Single packaging partner with direct support',
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
                Modern Packaging Programs for Teams That Need Reliability
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Bag Supply Co helps pharmacies, retail stores, veterinary clinics, and dispensaries manage packaging with cleaner branding, clearer lead times, and repeatable replenishment.
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
              <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">What you get</p>
              <div className="mt-4 grid gap-3">
                {trustPoints.map((item) => (
                  <div key={item.label} className="surface-card rounded-2xl p-4">
                    <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                    <p className="mt-1 text-lg font-black text-slate-950">{item.value}</p>
                    <p className="mt-1 text-sm muted-text">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

      <IndustrySolutionsSection />

      <section className="section-container py-10 md:py-16">
        <div className="split-panel items-start">
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

          <QuickQuoteForm />
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


