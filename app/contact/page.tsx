import { Metadata } from 'next'
import {
  contactAddress,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  pricingMailto,
} from '@/components/siteConfig'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Bag Supply Co for factory-direct paper bag pricing. Submit the form or reach out directly by email and phone.',
}

export default function ContactPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="kicker">Get a Quote</p>
        <h1 className="heading-serif mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Contact Bag Supply Co</h1>
        <p className="mt-4 text-lg text-slate-700">
          Submit your quote request form and our team will follow up with pricing and production timelines.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <ContactForm />

        <section className="surface-card rounded-xl p-6">
          <h2 className="text-2xl font-black text-slate-900">Direct Contact</h2>
          <dl className="mt-5 space-y-4 text-slate-700">
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-slate-500">Email</dt>
              <dd>
                <a href={pricingMailto} className="font-semibold underline">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-slate-500">Phone</dt>
              <dd>
                <a href={contactPhoneHref} className="font-semibold underline">
                  {contactPhone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-slate-500">Location</dt>
              <dd>
                {contactAddress[0]}
                <br />
                {contactAddress[1]}
              </dd>
            </div>
          </dl>
          <a href={pricingMailto} className="btn-secondary mt-6">
            Email Us Directly
          </a>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/generic-bag-quote" className="btn-secondary">
          Open Generic Bag Quote Tool
        </Link>
      </div>
    </div>
  )
}
