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

export default function CustomPrintingPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Custom Printing for Pharmacy and Retail Bags</h1>
        <p className="mt-4 text-lg text-slate-700">
          We print directly in-house with proven layouts for logos, pharmacy compliance messaging, and retail branding.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item) => (
          <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 font-semibold text-slate-800">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-7">
        <h2 className="text-2xl font-black text-slate-900">Next Step</h2>
        <p className="mt-3 text-slate-700">
          Email us with your artwork or logo files, target bag size, and quantity. We will return production options and lead time.
        </p>
        <a href={pricingMailto} className="mt-4 inline-flex rounded-md bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-700">
          Email Us for Pricing: {contactEmail}
        </a>
        <p className="mt-4 font-semibold text-slate-800">Email us for detailed pricing and production timelines.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
        <Link href="/pharmacy-bags" className="underline">
          Pharmacy bag programs
        </Link>
        <Link href="/industries" className="underline">
          Industries we serve
        </Link>
      </div>
    </div>
  )
}
