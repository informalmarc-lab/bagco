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
  'Retail stores',
  'Boutiques',
  'Small businesses',
  'Restaurants',
  'Specialty shops',
]

export default function IndustriesPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Industries We Serve</h1>
        <p className="mt-4 text-lg text-slate-700">
          Pharmacies are our core market. We also manufacture custom and stock paper bags for a broad set of retail and business uses.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, idx) => (
          <div
            key={industry}
            className={`rounded-lg border p-5 ${
              idx === 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            <p className={`text-lg ${idx === 0 ? 'font-black uppercase' : 'font-semibold'}`}>{industry}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-7">
        <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
        <p className="mt-3 text-slate-700">
          Include your industry, bag size, quantity, and desired print colors to receive program options.
        </p>
        <a href={pricingMailto} className="mt-4 inline-flex rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700">
          {contactEmail}
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/custom-retail-paper-bags" className="underline">
          Custom retail paper bags
        </Link>
        <Link href="/independent-pharmacy-packaging" className="underline">
          Independent pharmacy packaging
        </Link>
      </div>
    </div>
  )
}
