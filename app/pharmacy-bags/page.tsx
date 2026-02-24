import type { Metadata } from 'next'
import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Pharmacy Bags',
  description:
    'Factory-direct pharmacy paper bags for independent pharmacies. Stock programs, custom logo printing, low minimums, and nationwide shipping.',
}

const features = [
  'Prescription take-home bags in common pharmacy sizes',
  'Stock bag programs with same-day shipping availability',
  'Custom logo printing in 1, 2, and 3 colors',
  '3 to 4 week turnaround on custom production',
  'Local pickup available in North Carolina',
]

export default function PharmacyBagsPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Pharmacy Paper Bags Built for Daily Volume</h1>
        <p className="mt-4 text-lg text-slate-700">
          Bag Supply Co manufactures for independent pharmacies first. We focus on reliable bag supply, repeat ordering, and consistent print quality.
        </p>
      </div>

      <div className="mt-8 grid gap-3">
        {features.map((feature) => (
          <p key={feature} className="rounded-lg border border-slate-200 bg-white p-4 font-medium text-slate-800">
            {feature}
          </p>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-7">
        <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
        <p className="mt-3 text-slate-700">
          Email your bag size, quantity, and print color count. We will reply with production timelines and pricing.
        </p>
        <a href={pricingMailto} className="mt-4 inline-flex rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700">
          {contactEmail}
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/custom-printing" className="underline">
          Explore custom printing
        </Link>
        <Link href="/manufacturing" className="underline">
          View manufacturing details
        </Link>
      </div>
    </div>
  )
}
