import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Dispensary Bags',
  description:
    'Custom dispensary bags and branded paper bags designed for professional branding, discretion, and consistent retail operations.',
  keywords: ['custom dispensary bags', 'branded paper bags', 'wholesale custom packaging'],
}

export default function DispensariesIndustryPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <p className="kicker">Industry Focus</p>
      <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Dispensary Packaging Programs</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-700">
        We build custom dispensary bags that balance professional brand presentation with operational reliability for high-frequency retail environments.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Discretion and Compliance-Aware Design</h2>
          <p className="mt-2 text-slate-700">Packaging layouts are structured to support discreet presentation and clean point-of-sale handling.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Brand Visibility Beyond the Counter</h2>
          <p className="mt-2 text-slate-700">Branded paper bags turn every customer exit into local brand exposure and repeat recognition.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Structured Reorder Reliability</h2>
          <p className="mt-2 text-slate-700">Automated recurring reorders and predictable fulfillment reduce stockout risk.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/generic-bag-quote" className="btn-primary">Request a Custom Quote</Link>
        <Link href="/contact" className="btn-secondary">Speak With Our Team</Link>
      </div>
    </div>
  )
}
