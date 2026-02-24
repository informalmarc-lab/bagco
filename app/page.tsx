import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contactEmail, pricingMailto, subjectTemplate } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Custom Paper Bags for Independent Pharmacies',
  description:
    'Factory direct paper bag manufacturing for independent pharmacies. Low minimums, custom printing, and nationwide shipping from Union County, North Carolina.',
}

const industries = [
  { name: 'Pharmacies', featured: true },
  { name: 'Retail stores' },
  { name: 'Boutiques' },
  { name: 'Small businesses' },
  { name: 'Restaurants' },
  { name: 'Specialty shops' },
]

const printCaps = [
  '1 Color Printing',
  '2 Color Printing',
  '3 Color Printing',
  'Multiple sizes available',
  'Custom logo placement',
]

const factoryPhotos = [
  {
    src: '/gallery/imported/cardinalbag/pharmacy-bags/72a10283ba_GSP-Hero-Rec.jpg',
    alt: 'Production-ready pharmacy bags staged for shipment.',
  },
  {
    src: '/gallery/imported/cardinalbag/pharmacy-bags/79824fe814_PRODUCT-PHOTO---Pharmacy-v2-banner.jpg',
    alt: 'Bulk pharmacy paper bags prepared in a manufacturing facility.',
  },
  {
    src: '/gallery/imported/cardinalbag/veterinary/065ddcba20_DSC_2449.jpg',
    alt: 'Manufactured paper bag inventory prepared for nationwide distribution.',
  },
]

function EmailCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-amber-200 bg-amber-50 ${compact ? 'p-5' : 'p-7 md:p-9'}`}>
      <h3 className="text-2xl font-black text-slate-900">Email Us for Pricing</h3>
      <p className="mt-2 text-slate-700">
        Include bag size, quantity, number of print colors, and your timeline.
      </p>
      <a
        href={pricingMailto}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700"
      >
        {contactEmail}
      </a>
      <p className="mt-3 text-sm text-slate-600">Suggested subject: {subjectTemplate}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-slate-900/15 bg-white/85 px-4 py-2 text-sm font-bold text-slate-700">
              Made in Union County, North Carolina
            </p>
            <h1 className="mt-6 text-balance text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Custom Paper Bags for Independent Pharmacies
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700 md:text-xl">
              Factory Direct Manufacturing. Low Minimums. Nationwide Shipping.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={pricingMailto}
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-7 py-4 font-bold text-white hover:bg-slate-700"
              >
                Email Us for Pricing
              </a>
              <Link
                href="/custom-printing"
                className="inline-flex items-center justify-center rounded-md border border-slate-900/20 bg-white px-7 py-4 font-bold text-slate-900 hover:bg-amber-50"
              >
                View Printing Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Built for Independent Pharmacies</h2>
            <p className="mt-4 text-slate-700">
              We manufacture pharmacy-ready paper bags built for daily prescription volume and consistent branding.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="rounded-lg border border-slate-200 bg-white p-4">Prescription take-home bags for daily script volume.</li>
              <li className="rounded-lg border border-slate-200 bg-white p-4">Custom logo printing in 1, 2, and 3 colors.</li>
              <li className="rounded-lg border border-slate-200 bg-white p-4">3 to 4 week turnaround for custom runs.</li>
              <li className="rounded-lg border border-slate-200 bg-white p-4">Same-day shipping on stock bags.</li>
              <li className="rounded-lg border border-slate-200 bg-white p-4">Local pickup available in North Carolina.</li>
            </ul>
          </div>
          <EmailCta compact />
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/50 py-16 md:py-20">
        <div className="section-container">
          <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Our Manufacturing Advantage</h2>
          <div className="mt-6 grid gap-4 text-slate-700 md:grid-cols-5">
            <div className="rounded-lg border border-amber-200 bg-white p-4 font-semibold">Direct factory pricing</div>
            <div className="rounded-lg border border-amber-200 bg-white p-4 font-semibold">Made in Union County, NC</div>
            <div className="rounded-lg border border-amber-200 bg-white p-4 font-semibold">Low minimum orders</div>
            <div className="rounded-lg border border-amber-200 bg-white p-4 font-semibold">Consistent quality</div>
            <div className="rounded-lg border border-amber-200 bg-white p-4 font-semibold">Nationwide distribution</div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {factoryPhotos.map((photo) => (
              <div key={photo.src} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-52">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Industries We Serve</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className={`rounded-lg border p-5 ${
                industry.featured
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <p className={`text-lg ${industry.featured ? 'font-black' : 'font-semibold'}`}>
                {industry.featured ? 'PHARMACIES' : industry.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/50 py-16 md:py-20">
        <div className="section-container">
          <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Printing Capabilities</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {printCaps.map((cap) => (
              <div key={cap} className="rounded-lg border border-amber-200 bg-white p-5 font-semibold text-slate-800">
                {cap}
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg font-semibold text-slate-800">Email us for detailed pricing and production timelines.</p>
          <a
            href={pricingMailto}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-700"
          >
            Email Us for Pricing
          </a>
        </div>
      </section>

      <section className="section-container pt-16 md:pt-20">
        <div className="rounded-2xl bg-slate-900 p-8 text-white md:p-12">
          <h2 className="text-3xl font-black md:text-5xl">Ready to Upgrade Your Paper Bags?</h2>
          <p className="mt-4 max-w-3xl text-slate-200 md:text-lg">
            Email our team directly with your bag size, quantity, and logo for pricing and availability.
          </p>
          <a
            href={pricingMailto}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-amber-200 px-7 py-4 text-base font-black text-slate-950 hover:bg-amber-300"
          >
            {contactEmail}
          </a>
        </div>
      </section>
    </div>
  )
}
