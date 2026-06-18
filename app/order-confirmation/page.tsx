import type { Metadata } from 'next'
import Link from 'next/link'
import { contactPhone, contactPhoneHref, contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Order Received',
  description: 'Bag Supply Co order confirmation.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OrderConfirmationPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Order Received</p>
          <h1 className="heading-display mt-5">Thank you for your order!</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            We&apos;ve received it and will be in touch within 24 hours with next steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">
              Browse More Products
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
          <div className="tonal-panel">
            <p className="kicker">What Happens Next</p>
            <h2 className="section-title mt-4">We review, confirm, and follow up directly.</h2>
            <div className="mt-5 grid gap-3">
              <div className="surface-card rounded-2xl p-4 text-sm text-muted">
                <p className="font-black text-brand-600">1. Order review</p>
                <p className="mt-2">We check quantities, sizes, and notes so the next conversation is specific and useful.</p>
              </div>
              <div className="surface-card rounded-2xl p-4 text-sm text-muted">
                <p className="font-black text-brand-600">2. Payment follow-up</p>
                <p className="mt-2">If you selected card, we will email a Stripe payment link after reviewing the order.</p>
              </div>
              <div className="surface-card rounded-2xl p-4 text-sm text-muted">
                <p className="font-black text-brand-600">3. Shipping confirmation</p>
                <p className="mt-2">Our team will confirm delivery details and any next steps before fulfillment moves forward.</p>
              </div>
            </div>
          </div>

          <aside className="tonal-panel">
            <p className="kicker">Need Help Fast?</p>
            <h2 className="section-title mt-4">Reach the team directly.</h2>
            <p className="mt-3 muted-text">
              If you need to update shipping details or add notes to this order, contact us directly and we will jump on it.
            </p>
            <div className="mt-6 grid gap-3">
              <a href={contactPhoneHref} className="btn-secondary justify-center">
                Call {contactPhone}
              </a>
              <a href={contactTextHref} className="btn-secondary justify-center">
                Text {contactPhone}
              </a>
              <Link href="/catalog" className="btn-primary justify-center">
                Continue Browsing
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
