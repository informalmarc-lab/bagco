import type { Metadata } from 'next'
import Link from 'next/link'
import { contactEmail } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Payments',
  description:
    'How to pay Bag Supply Co invoices, including payment methods, Net 30 terms, and remittance steps.',
}

const paymentMethods = [
  {
    title: 'Credit Card',
    copy: 'To pay by credit card, email us and we will set up payment for your invoice.',
  },
  {
    title: 'Check',
    copy: 'Checks should be sent to the remittance address listed on your bill.',
  },
]

const paymentSteps = [
  'Open your invoice and confirm invoice number and total due.',
  `For credit card payments, email ${contactEmail} so we can set up your payment.`,
  'For checks, send payment to the address listed on your bill and include your invoice number.',
]

export default function PaymentsPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#eadbc5_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Payments</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            How to Pay
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Use this page for payment instructions, accepted methods, and the fastest way to confirm payment on your account.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${contactEmail}`} className="btn-primary">
              Email Billing
            </a>
            <Link href="/contact" className="btn-secondary">
              Contact Billing
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">Payment Methods</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {paymentMethods.map((method) => (
            <article key={method.title} className="surface-card rounded-xl p-5">
              <h3 className="text-xl font-black text-slate-900">{method.title}</h3>
              <p className="mt-3 text-slate-700">{method.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/45 py-14">
        <div className="section-container">
          <h2 className="section-title heading-serif">Payment Bar: 3 Steps</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {paymentSteps.map((step, index) => (
              <div key={step} className="surface-card rounded-xl p-5">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-amber-800">Step {index + 1}</p>
                <p className="mt-2 text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-3xl font-black text-slate-900 heading-serif">Payment Terms</h2>
          <p className="mt-3 text-slate-700">
            All orders should be paid within 30 days from invoice date. Late fees apply to past-due invoices.
          </p>
          <p className="mt-3 text-slate-700">
            Include your invoice number with all payments and remittance confirmations for faster posting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shipping" className="btn-secondary">
              View Shipping Policy
            </Link>
            <Link href="/contact" className="btn-primary">
              Contact Billing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
