import type { Metadata } from 'next'
import CheckoutPageClient from '@/components/cart/CheckoutPageClient'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Submit your Bag Supply Co order and preferred payment method.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Checkout</p>
          <h1 className="heading-display mt-5">Submit Your Order</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Send your cart to the Bag Supply Co team and we will follow up within 24 hours with next steps.
          </p>
        </div>
      </section>

      <CheckoutPageClient />
    </div>
  )
}
