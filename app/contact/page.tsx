import { Metadata } from 'next'
import {
  contactAddress,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  pricingMailto,
  subjectTemplate,
} from '@/components/siteConfig'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Bag Supply Co for factory-direct paper bag pricing. Email-only inquiry flow for independent pharmacies and retail businesses.',
}

const checklist = [
  'Bag size',
  'Quantity',
  'Number of print colors',
  'Timeline',
  'Shipping city and state',
]

export default function ContactPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="kicker">Get a Quote</p>
        <h1 className="heading-serif mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Contact Bag Supply Co</h1>
        <p className="mt-4 text-lg text-slate-700">
          Email is the fastest way to get pricing and production timelines.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="tonal-panel">
          <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
          <a
            href={pricingMailto}
            className="btn-primary mt-4"
          >
            {contactEmail}
          </a>
          <p className="mt-4 text-slate-700">Suggested subject line:</p>
          <p className="mt-1 rounded bg-amber-50 px-3 py-2 font-semibold text-slate-900">{subjectTemplate}</p>
          <p className="mt-5 text-slate-700">Include the following in your email:</p>
          <ul className="mt-3 space-y-2">
            {checklist.map((item) => (
              <li key={item} className="rounded border border-amber-200 bg-amber-50 px-3 py-2 font-medium text-slate-800">
                {item}
              </li>
            ))}
          </ul>
        </section>

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
