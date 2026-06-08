import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuoteConfigurator from '@/components/QuoteConfigurator'

export const metadata: Metadata = {
  title: 'Custom Paper Bag Quote',
  description:
    'Build a Bud Bags custom paper bag quote for your dispensary counter with print program, size, quantity, sides, artwork, and freight placeholders.',
}

export default function QuotePage() {
  return (
    <section className="container-page py-10">
      <Suspense fallback={<div className="card p-6 text-sm font-bold text-mute">Loading quote configurator...</div>}>
        <QuoteConfigurator />
      </Suspense>
    </section>
  )
}
