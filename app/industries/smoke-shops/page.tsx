import type { Metadata } from 'next'
import Link from 'next/link'
import { contactTextHref } from '@/components/siteConfig'

export const metadata: Metadata = {
  title: 'Smoke Shop Packaging Programs',
  description:
    'Branded paper bags and wholesale custom packaging systems for smoke shops focused on recognition, consistency, and operational scale.',
  keywords: ['branded paper bags', 'custom retail bags', 'wholesale custom packaging'],
}

export default function SmokeShopsIndustryPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <p className="kicker">Industry Focus</p>
      <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Smoke Shop Packaging Programs</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-700">
        We help smoke shops implement branded packaging that strengthens identity, increases repeat recognition, and supports store-level operational consistency.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Brand Identity at Checkout</h2>
          <p className="mt-2 text-slate-700">Custom retail bags make your store visually consistent and memorable.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Visibility in Local Market</h2>
          <p className="mt-2 text-slate-700">Every carry-out bag extends your brand into surrounding neighborhoods.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Reliable Supply Program</h2>
          <p className="mt-2 text-slate-700">Structured reorder support keeps packaging consistent as volume grows.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/generic-bag-quote" className="btn-primary">Request a Custom Quote</Link>
        <a href={contactTextHref} className="btn-secondary">Text Our Team</a>
      </div>
    </div>
  )
}
