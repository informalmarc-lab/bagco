import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pharmacy Packaging Bags Programs',
  description:
    'Professional pharmacy packaging bags for independent and multi-location pharmacies requiring trust, clean presentation, and reliability.',
}

export default function PharmaciesIndustryPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <p className="kicker">Industry Focus</p>
      <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Pharmacy Packaging Programs</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-700">
        We deliver pharmacy packaging bags that help stores project trust, maintain clean presentation standards, and keep supply stable across recurring demand.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Trust-First Presentation</h2>
          <p className="mt-2 text-slate-700">Professional packaging supports confidence in sensitive retail transactions.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Daily Volume Ready</h2>
          <p className="mt-2 text-slate-700">Sizing and case programs align with repeat, high-frequency pharmacy operations.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Operationally Reliable</h2>
          <p className="mt-2 text-slate-700">Automated reorder and Net 30 terms support long-term B2B pharmacy partnerships.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/generic-bag-quote" className="btn-primary">Request a Custom Quote</Link>
        <Link href="/contact" className="btn-secondary">Speak With Our Team</Link>
      </div>
    </div>
  )
}

