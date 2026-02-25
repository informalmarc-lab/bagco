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
  { name: 'Independent Pharmacies', featured: true },
  { name: 'Veterinary Clinics' },
  { name: 'Retail Stores' },
  { name: 'Boutiques' },
  { name: 'Restaurants' },
  { name: 'Specialty Shops and Chains' },
]

const printCaps = [
  '1-color, 2-color, and 3-color printing',
  'Multiple pharmacy-ready sizes',
  'Custom logo placement and proofing',
  'Stock and full-custom programs',
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

const stats = [
  { label: 'Custom Lead Time', value: '3-4 Weeks' },
  { label: 'Stock Shipping', value: 'Same Day' },
  { label: 'Color Options', value: 'Up to 3' },
]

function EmailCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`tonal-panel ${compact ? 'p-5' : 'p-7 md:p-9'}`}>
      <p className="kicker">Get Pricing Fast</p>
      <h3 className="mt-3 text-2xl font-black text-slate-900">Email Us for Pricing</h3>
      <p className="mt-2 text-slate-700">
        Include bag size, quantity, number of print colors, and your timeline.
      </p>
      <a href={pricingMailto} className="btn-primary mt-4">
        {contactEmail}
      </a>
      <p className="mt-3 text-sm text-slate-600">Suggested subject: {subjectTemplate}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(115deg,#fffef8_0%,#f8ead2_52%,#e5d1b2_100%)]">
        <div className="section-container py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-end">
            <div className="reveal-up">
              <p className="kicker">Made in Union County, North Carolina</p>
              <h1 className="title-xl mt-6 heading-serif">Custom Paper Bags Built for Daily Pharmacy Volume</h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-700 md:text-xl">
                Factory direct manufacturing with low minimums, consistent print quality, and nationwide shipping.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={pricingMailto} className="btn-primary">
                  Email Us for Pricing
                </a>
                <Link href="/custom-printing" className="btn-secondary">
                  View Printing Options
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="hero-panel min-w-[160px]">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-xl font-black text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 reveal-up">
              <div className="hero-panel col-span-2 overflow-hidden p-0">
                <div className="relative h-44 md:h-52">
                  <Image src={factoryPhotos[0].src} alt={factoryPhotos[0].alt} fill className="object-cover" />
                </div>
              </div>
              <div className="hero-panel overflow-hidden p-0">
                <div className="relative h-36 md:h-44">
                  <Image src={factoryPhotos[1].src} alt={factoryPhotos[1].alt} fill className="object-cover" />
                </div>
              </div>
              <div className="hero-panel overflow-hidden p-0">
                <div className="relative h-36 md:h-44">
                  <Image src={factoryPhotos[2].src} alt={factoryPhotos[2].alt} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title heading-serif">Built for Independent Pharmacies</h2>
            <p className="mt-4 text-slate-700">
              We manufacture pharmacy-ready paper bags built for daily prescription throughput and reliable reordering.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="surface-card rounded-lg p-4">Prescription take-home bags for daily script volume.</li>
              <li className="surface-card rounded-lg p-4">Custom logo printing in 1, 2, and 3 colors.</li>
              <li className="surface-card rounded-lg p-4">3 to 4 week turnaround for custom runs.</li>
              <li className="surface-card rounded-lg p-4">Same-day shipping on stock bags.</li>
              <li className="surface-card rounded-lg p-4">Local pickup available in North Carolina.</li>
            </ul>
          </div>
          <EmailCta compact />
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50/55 py-16 md:py-20">
        <div className="section-container">
          <h2 className="section-title heading-serif">Printing Capabilities</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {printCaps.map((cap) => (
              <div key={cap} className="surface-card rounded-lg p-5 font-semibold text-slate-800">
                {cap}
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg font-semibold text-slate-800">Email us for detailed pricing and production timelines.</p>
          <a href={pricingMailto} className="btn-primary mt-4">
            Email Us for Pricing
          </a>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <h2 className="section-title heading-serif">Industries We Serve</h2>
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
                {industry.featured ? 'INDEPENDENT PHARMACIES' : industry.name}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catalog/pharmacy" className="btn-secondary">
            Pharmacy Catalog
          </Link>
          <Link href="/catalog/veterinary" className="btn-secondary">
            Veterinary Catalog
          </Link>
          <Link href="/catalog/custom" className="btn-secondary">
            Custom 1/2/3 Color Catalog
          </Link>
        </div>
      </section>

      <section className="section-container pt-6 md:pt-10">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-12">
          <h2 className="heading-serif text-3xl font-black md:text-5xl">Ready to Upgrade Your Paper Bags?</h2>
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
