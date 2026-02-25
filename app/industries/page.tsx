import type { Metadata } from 'next'
import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Paper bag manufacturing for independent pharmacies, retail stores, boutiques, restaurants, and specialty businesses.',
}

const industries = [
  'Independent Pharmacies',
  'Veterinary Clinics',
  'Retail stores',
  'Boutiques',
  'Small businesses',
  'Restaurants',
  'Specialty shops and chains',
]

export default function IndustriesPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="kicker">Who We Build For</p>
        <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Industries We Serve</h1>
        <p className="mt-4 text-lg text-slate-700">
          Pharmacies are our core market. We also manufacture custom and stock paper bags for a broad set of retail and business uses.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, idx) => (
          <div
            key={industry}
            className={`rounded-lg border p-5 ${
              idx === 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800 shadow-sm'
            }`}
          >
            <p className={`text-lg ${idx === 0 ? 'font-black uppercase' : 'font-semibold'}`}>{industry}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 tonal-panel">
        <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
        <p className="mt-3 text-slate-700">
          Include your industry, bag size, quantity, and desired print colors to receive program options.
        </p>
        <a href={pricingMailto} className="btn-primary mt-4">
          {contactEmail}
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/custom-retail-paper-bags" className="rounded-md bg-white px-3 py-2 underline">
          Custom retail paper bags
        </Link>
        <Link href="/independent-pharmacy-packaging" className="rounded-md bg-white px-3 py-2 underline">
          Independent pharmacy packaging
        </Link>
        <Link href="/catalog/veterinary" className="rounded-md bg-white px-3 py-2 underline">
          Veterinary bag catalog
        </Link>
      </div>
    </div>
  )
}
