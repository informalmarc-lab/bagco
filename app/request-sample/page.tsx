import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export default function RequestSamplePage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Samples</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Request Samples by Email</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We handle sample requests directly through email so we can confirm the right size, print path, and shipping details.
          </p>
          <a href={pricingMailto} className="btn-primary mt-6">Email {contactEmail}</a>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Include These Details</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-slate-800">Bag type and preferred size</p>
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-slate-800">Expected quantity and timeline</p>
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-slate-800">Shipping city and state</p>
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-slate-800">Any print or branding requirements</p>
          </div>
          <Link href="/contact" className="btn-secondary mt-6">Go to Contact Form</Link>
        </div>
      </section>
    </div>
  )
}

