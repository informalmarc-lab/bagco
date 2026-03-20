import type { Metadata } from 'next'
import Link from 'next/link'

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
    </div>
  )
}
