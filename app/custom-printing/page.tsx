import type { Metadata } from 'next'
import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Custom Printing',
  description:
    'Custom paper bag printing programs with 1-color, 2-color, and 3-color options for pharmacy and retail teams.',
}

const capabilities = [
  '1-color custom printing',
  '2-color custom printing',
  '3-color custom printing',
  'Multiple bag sizes and formats',
  'Proofing path before production',
]

export default function CustomPrintingPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Custom Printing</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Print Programs That Scale With Your Brand</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Choose the print depth that fits your budget and brand requirements, then move into a repeatable production process.
          </p>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <p key={item} className="tonal-panel text-sm font-semibold text-slate-800">{item}</p>
          ))}
        </div>

        <div className="mt-6 tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Next Step</h2>
          <p className="mt-3 muted-text">
            Send your artwork or logo files with target bag size and quantity for a structured production recommendation.
          </p>
          <a href={pricingMailto} className="btn-primary mt-5">Email {contactEmail}</a>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog/custom" className="btn-secondary">Open Custom Catalog</Link>
            <Link href="/generic-bag-quote" className="btn-quiet">Build Quote</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

