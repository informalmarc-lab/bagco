import type { Metadata } from 'next'
import Link from 'next/link'
import { contactEmail, pricingMailto } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Custom Printing',
  description:
    'Custom paper bag printing with 1-color, 2-color, and 3-color options. Factory-direct production and low minimums for pharmacy and retail customers.',
}

const capabilities = [
  '1 Color Printing',
  '2 Color Printing',
  '3 Color Printing',
  'Multiple sizes available',
  'Custom logo placement',
]

const colorCatalogs = [
  {
    title: '1-Color Custom Bags',
    detail: 'Value-focused option with full-custom artwork and low minimum programs.',
  },
  {
    title: '2-Color Custom Bags',
    detail: 'Most popular option balancing brand detail and budget.',
  },
  {
    title: '3-Color Custom Bags',
    detail: 'Higher-impact visual branding for premium presentation.',
  },
]

export default function CustomPrintingPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <p className="kicker">In-House Capabilities</p>
        <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Custom Printing for Pharmacy and Retail Bags</h1>
        <p className="mt-4 text-lg text-slate-700">
          We print directly in-house with proven layouts for logos, pharmacy compliance messaging, and retail branding.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item) => (
          <div key={item} className="surface-card rounded-lg p-5 font-semibold text-slate-800">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-10 tonal-panel">
        <h2 className="text-2xl font-black text-slate-900">Next Step</h2>
        <p className="mt-3 text-slate-700">
          Email us with your artwork or logo files, target bag size, and quantity. We will return production options and lead time.
        </p>
        <a href={pricingMailto} className="btn-primary mt-4">
          Email Us for Pricing: {contactEmail}
        </a>
        <p className="mt-4 font-semibold text-slate-800">Email us for detailed pricing and production timelines.</p>
      </div>

      <div className="mt-10">
        <h2 className="section-title heading-serif">Custom 1/2/3 Color Catalog</h2>
        <p className="mt-3 text-slate-700">
          Browse full-custom examples and program details for one-color, two-color, and three-color bag runs.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {colorCatalogs.map((item) => (
            <div key={item.title} className="surface-card rounded-xl p-5">
              <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.detail}</p>
            </div>
          ))}
        </div>
        <Link href="/catalog/custom" className="btn-primary mt-5">
          Open Custom 1/2/3 Color Catalog
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/pharmacy-bags" className="rounded-md bg-white px-3 py-2 underline">
          Pharmacy and veterinary programs
        </Link>
        <Link href="/catalog/veterinary" className="rounded-md bg-white px-3 py-2 underline">
          Veterinary catalog
        </Link>
      </div>
    </div>
  )
}
