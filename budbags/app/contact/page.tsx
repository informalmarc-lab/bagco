import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { contactInfo } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Bud Bags for cannabis paper bag pricing, stock coverage, custom print quotes, and reorder support.',
}

export default function ContactPage() {
  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[0.65fr_0.35fr]">
      <ContactForm />
      <aside className="card h-fit p-5 md:p-6">
        <h2 className="text-2xl font-black text-leaf">Talk through the bag situation at your shop.</h2>
        <div className="mt-5 grid gap-4 text-sm leading-6 text-mute">
          <p>
            Call or text <a href={contactInfo.phoneHref} className="font-bold text-leaf">{contactInfo.phone}</a>.
          </p>
          <p>{contactInfo.address}</p>
          <p>{contactInfo.support}</p>
          <p>
            Bring your target size, current checkout volume, artwork status, and how soon you need bags on the floor. We will help separate what should ship now from what should become your branded reorder program.
          </p>
        </div>
      </aside>
    </section>
  )
}
