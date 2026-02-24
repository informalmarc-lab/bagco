import { Metadata } from 'next'
import {
  contactAddress,
  contactEmail,
  contactPhone,
  contactPhoneHref,
  pricingMailto,
  subjectTemplate,
} from '@/components/siteConfig'

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
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Contact Bag Supply Co</h1>
        <p className="mt-4 text-lg text-slate-700">
          Email is the fastest way to get pricing and production timelines.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
          <a
            href={pricingMailto}
            className="mt-4 inline-flex rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700"
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

        <section className="rounded-xl border border-slate-200 bg-white p-6">
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
    </div>
  )
}
