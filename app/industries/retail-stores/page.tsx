import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Retail Bags Programs',
  description:
    'Custom retail bags and wholesale custom packaging systems built to improve customer experience, brand consistency, and scalable operations.',
}

export default function RetailStoresIndustryPage() {
  return (
    <div className="section-container py-14 md:py-20">
      <p className="kicker">Industry Focus</p>
      <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">Retail Store Packaging Programs</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-700">
        We provide custom retail bags and wholesale custom packaging programs that strengthen customer experience while supporting store growth and repeat operations.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Brand Reinforcement</h2>
          <p className="mt-2 text-slate-700">Branded paper bags keep visual standards consistent across every sale.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Customer Experience</h2>
          <p className="mt-2 text-slate-700">High-quality packaging improves perceived professionalism at checkout.</p>
        </div>
        <div className="surface-card rounded-xl p-5">
          <h2 className="text-xl font-black text-slate-900">Scalable Operations</h2>
          <p className="mt-2 text-slate-700">Structured reorder and delivery planning keeps packaging aligned with growth.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/generic-bag-quote" className="btn-primary">Request a Custom Quote</Link>
        <Link href="/contact" className="btn-secondary">Speak With Our Team</Link>
      </div>
    </div>
  )
}

