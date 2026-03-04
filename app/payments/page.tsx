import type { Metadata } from 'next'
import Link from 'next/link'
import { contactEmail } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Payments',
  description:
    'Payment instructions, terms, and support for Bag Supply Co invoices.',
}

const methods = [
  {
    title: 'Credit Card',
    copy: `Email ${contactEmail} and our team will provide payment setup for your invoice.`,
  },
  {
    title: 'Check',
    copy: 'Send checks to the remittance address on your invoice and include invoice number.',
  },
]

const steps = [
  'Confirm invoice number and total due.',
  'Submit payment by card or check using invoice instructions.',
  'Send remittance confirmation for fastest posting.',
]

export default function PaymentsPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Payments</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Invoice Payment Guide</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Use this page for accepted methods, payment flow, and billing support.
          </p>
          <a href={`mailto:${contactEmail}`} className="btn-primary mt-6">Email Billing</a>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {methods.map((method) => (
            <article key={method.title} className="tonal-panel">
              <h2 className="text-2xl font-black text-slate-950">{method.title}</h2>
              <p className="mt-3 muted-text">{method.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">3-Step Payment Flow</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step} className="surface-card rounded-2xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-blue-700">Step {idx + 1}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-secondary">Contact Billing</Link>
            <Link href="/shipping" className="btn-quiet">Shipping Policy</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

