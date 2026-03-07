import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export default function RequestSamplePage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Samples</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Request Samples</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Use the contact form or quote builder so our team can confirm the right size, print path, and shipping details.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Contact Form</Link>
            <a href={contactTextHref} className="btn-secondary">Text Us</a>
          </div>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">Include These Details</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">Bag type and preferred size</p>
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">Expected quantity and timeline</p>
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">Shipping city and state</p>
            <p className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">Any print or branding requirements</p>
          </div>
          <Link href="/contact" className="btn-secondary mt-6">Go to Contact Form</Link>
        </div>
      </section>
    </div>
  )
}
