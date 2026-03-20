import type { Metadata } from 'next'
import CartPageClient from '@/components/cart/CartPageClient'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review your Bag Supply Co cart and prepare your order submission.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CartPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Cart</p>
          <h1 className="heading-display mt-5">Your Order Cart</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Review item quantities, confirm line totals, and move into checkout when you are ready.
          </p>
        </div>
      </section>

      <CartPageClient />
    </div>
  )
}
