import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Manufacturing',
  description:
    'Direct manufacturing in Union County, North Carolina with low minimums, consistent quality, and nationwide distribution.',
}

const advantages = [
  'Direct factory pricing',
  'Made in Union County, NC',
  'Low minimum orders',
  'Consistent quality controls',
  'Nationwide distribution',
]

const photos = [
  '/gallery/imported/cardinalbag/pharmacy-bags/72a10283ba_GSP-Hero-Rec.jpg',
  '/gallery/imported/cardinalbag/pharmacy-bags/79824fe814_PRODUCT-PHOTO---Pharmacy-v2-banner.jpg',
  '/gallery/imported/cardinalbag/veterinary/15b131caac_IMG_8482.JPG',
]

export default function ManufacturingPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Factory Direct Manufacturing Authority</h1>
        <p className="mt-4 text-lg text-slate-700">
          Our team manufactures and distributes paper bags from Union County, North Carolina. We support repeat programs for pharmacies and retail businesses nationwide.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {advantages.map((advantage) => (
          <div key={advantage} className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800">
            {advantage}
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-black text-slate-900">Manufacturing Photos</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {photos.map((src) => (
          <div key={src} className="relative h-52 overflow-hidden rounded-lg border border-slate-200">
            <Image src={src} alt="Bag Supply Co factory and production output." fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-7">
        <h2 className="text-2xl font-black text-slate-900">Email Us for Pricing</h2>
        <p className="mt-3 text-slate-700">
          Share your target size, quantity, and print spec to receive factory-direct pricing and timeline guidance.
        </p>
        <a href={pricingMailto} className="mt-4 inline-flex rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700">
          {contactEmail}
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/made-in-usa-paper-bags" className="underline">
          Made in USA paper bags
        </Link>
        <Link href="/pharmacy-paper-bags-wholesale" className="underline">
          Pharmacy paper bags wholesale
        </Link>
      </div>
    </div>
  )
}
