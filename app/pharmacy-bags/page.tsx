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

const factoryHighlights = [
  'Direct factory pricing from Union County, NC',
  'Low minimum order programs',
  'Consistent quality controls and repeat ordering support',
  'Nationwide distribution with local pickup options',
]

const catalogs = [
  {
    title: 'Pharmacy Bags Catalog',
    href: '/catalog/pharmacy',
    description: 'TY, GS, and Plastic GS designs with size and case count details.',
  },
  {
    title: 'Veterinary Bags Catalog',
    href: '/catalog/veterinary',
    description: 'VB1, VB2, and VB6 veterinary designs plus real custom examples.',
  },
  {
    title: 'Custom 1/2/3 Color Catalog',
    href: '/catalog/custom',
    description: 'Full-custom one-color, two-color, and three-color bag programs.',
  },
]

export default function PharmacyBagsPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="kicker">Core Program</p>
        <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Pharmacy and Veterinary Bag Programs</h1>
        <p className="mt-4 text-lg text-slate-700">
          Bag Supply Co manufactures for independent pharmacies and veterinary clinics with reliable supply, consistent print quality, and repeat ordering support.
        </p>
      </div>

      <div className="mt-8 grid gap-3">
        {features.map((feature) => (
          <p key={feature} className="surface-card rounded-lg p-4 font-medium text-slate-800">
            {feature}
          </p>
        ))}
      </div>

      <div className="mt-10 tonal-panel">
        <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
        <p className="mt-3 text-slate-700">
          Email your bag size, quantity, and print color count. We will reply with production timelines and pricing.
        </p>
        <a href={pricingMailto} className="btn-primary mt-4">
          {contactEmail}
        </a>
      </div>

      <div className="mt-10">
        <h2 className="section-title heading-serif">Factory Direct Advantage</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {factoryHighlights.map((item) => (
            <div key={item} className="surface-card rounded-lg p-4 font-medium text-slate-800">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="section-title heading-serif">Browse Catalogs</h2>
        <p className="mt-3 text-slate-700">Use the matching catalog below for pharmacy, veterinary, or full-custom programs.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {catalogs.map((catalog) => (
            <Link key={catalog.href} href={catalog.href} className="surface-card rounded-xl p-5 hover:shadow-md">
              <h3 className="text-lg font-black text-slate-900">{catalog.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{catalog.description}</p>
              <p className="mt-4 text-sm font-bold underline">Open catalog</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/custom-printing" className="rounded-md bg-white px-3 py-2 underline">
          Explore custom printing
        </Link>
        <Link href="/catalog" className="rounded-md bg-white px-3 py-2 underline">
          View all catalogs
        </Link>
      </div>
    </div>
  )
}
