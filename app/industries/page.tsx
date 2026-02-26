import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Industry-specific packaging programs for dispensaries, smoke shops, pharmacies, and retail stores focused on branding and operational reliability.',
}

const segments = [
  {
    title: 'Dispensaries',
    href: '/industries/dispensaries',
    copy: 'Custom dispensary bags built for discretion, compliance-aware presentation, and repeat customer trust.',
  },
  {
    title: 'Smoke Shops',
    href: '/industries/smoke-shops',
    copy: 'Packaging systems that strengthen shelf identity, local visibility, and recurring brand recognition.',
  },
  {
    title: 'Pharmacies',
    href: '/industries/pharmacies',
    copy: 'Clean, professional pharmacy packaging bags for high-volume daily operations and dependable reorder cycles.',
  },
  {
    title: 'Retail Stores',
    href: '/industries/retail-stores',
    copy: 'Custom retail bags that reinforce brand standards while supporting scalable store operations.',
  },
]

export default function IndustriesPage() {
  return (
    <div className="pb-16">
      <section className="border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Industry Programs</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">
            Packaging Programs Built for Regulated Retail
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Bag Supply Co supports operationally demanding sectors with professional packaging systems designed for brand trust and supply consistency.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {segments.map((segment) => (
            <Link key={segment.title} href={segment.href} className="surface-card rounded-xl p-6 hover:shadow-md">
              <h2 className="text-2xl font-black text-slate-900">{segment.title}</h2>
              <p className="mt-3 text-slate-700">{segment.copy}</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-amber-800">Open Industry Page</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

