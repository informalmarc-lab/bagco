import type { Metadata } from 'next'
import Link from 'next/link'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Industry-specific packaging programs for custom retail bags, branded paper bags, wholesale custom packaging, and pharmacy packaging bags across retail, events, and food service.',
  keywords: [
    'custom retail bags',
    'custom dispensary bags',
    'branded paper bags',
    'wholesale custom packaging',
    'pharmacy packaging bags',
  ],
}

const regulatedSegments = [
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
    copy: 'Clean pharmacy packaging bags for high-volume daily operations and dependable reorder cycles.',
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
            Packaging Programs Built for Real Operations
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Bag Supply Co supports regulated retail, premium storefronts, events, hospitality, and food service teams with structured packaging supply and professional brand presentation.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">Regulated Retail Programs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {regulatedSegments.map((segment) => (
            <Link key={segment.title} href={segment.href} className="surface-card rounded-xl p-6 hover:shadow-md">
              <h3 className="text-2xl font-black text-slate-900">{segment.title}</h3>
              <p className="mt-3 text-slate-700">{segment.copy}</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-amber-800">Open Industry Page</p>
            </Link>
          ))}
        </div>
      </section>

      <IndustrySolutionsSection />
    </div>
  )
}
