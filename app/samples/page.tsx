import type { Metadata } from 'next'
import SampleRequestForm from '@/components/SampleRequestForm'

export const metadata: Metadata = {
  title: 'Free Samples',
  description: 'Request free bag samples from Bag Supply Co.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SamplesPage() {
  return (
    <div className="pb-16">
      <section className="section-container pt-10 pb-6 md:pt-16">
        <p className="kicker">Free samples</p>
        <h1 className="heading-display mt-4">See the bags before you order</h1>
        <p className="mt-4 max-w-2xl text-lg muted-text">
          Tell us where to send them and we&apos;ll mail you free samples.
        </p>
      </section>

      <section className="section-container">
        <div className="max-w-2xl">
          <SampleRequestForm />
        </div>
      </section>
    </div>
  )
}
