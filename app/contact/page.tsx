import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import {
  contactAddress,
  contactPhone,
  contactPhoneHref,
  contactTextHref,
} from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Bag Supply Co for catalog guidance, quote requests, and production timeline support.',
}

export default function ContactPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Contact</p>
          <h1 className="heading-display mt-5">Talk to the Packaging Team</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Whether you're a retailer, pharmacy, distributor, or just getting started - tell us what you need and we'll build a program around it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <aside className="tonal-panel">
            <h2 className="text-2xl font-black text-[#1E4D2B]">Direct Contact</h2>
            <dl className="mt-5 space-y-4 text-sm text-[#5F4D33]">
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Text</dt>
                <dd className="mt-1">
                  <a href={contactTextHref} className="font-semibold text-[#1E4D2B] underline">{contactPhone}</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Phone</dt>
                <dd className="mt-1">
                  <a href={contactPhoneHref} className="font-semibold text-[#1E4D2B] underline">{contactPhone}</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">Address</dt>
                <dd className="mt-1">
                  {contactAddress[0]}
                  <br />
                  {contactAddress[1]}
                </dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a href={contactTextHref} className="btn-secondary justify-center">Text Us</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

