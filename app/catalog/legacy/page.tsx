import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Legacy Catalogs',
  description:
    'Complete legacy catalog directory including pharmacy, veterinary, custom, and specialty bag collections.',
}

const primaryCatalogs = [
  {
    title: 'Pharmacy Catalog',
    href: '/catalog/pharmacy',
    description: 'GS, TY, and Plastic GS bag programs.',
  },
  {
    title: 'Veterinary Catalog',
    href: '/catalog/veterinary',
    description: 'VB1, VB2, and VB6 veterinary bag designs.',
  },
  {
    title: 'Custom 1/2/3 Color Catalog',
    href: '/catalog/custom',
    description: 'Full-custom one-color, two-color, and three-color programs.',
  },
]

const legacyCollections = [
  { title: 'Bakery Bags', href: '/catalog/bakery' },
  { title: 'College & University Bags', href: '/catalog/college' },
  { title: 'Dispensary Bags', href: '/catalog/dispensary' },
  { title: 'Faith & Religious Bags', href: '/catalog/faith' },
  { title: 'Holiday Bags', href: '/catalog/holiday' },
  { title: 'Dispensary Store Bags', href: '/catalog/magazine-comics' },
  { title: 'Mini Cases', href: '/catalog/minicases' },
  { title: 'Pride Bags', href: '/catalog/pride' },
  { title: 'Seasonal Bags', href: '/catalog/seasonal' },
  { title: 'USA Bags', href: '/catalog/usa' },
  { title: 'Winery Bags', href: '/catalog/winery' },
]

export default function LegacyCatalogPage() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Catalog Directory</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">All Legacy Catalogs</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Use this page to access every old catalog collection in one place.
          </p>
          <Link href="/catalog" className="btn-secondary mt-6">
            Back to Catalog Hub
          </Link>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">Primary Catalogs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {primaryCatalogs.map((catalog) => (
            <Link key={catalog.href} href={catalog.href} className="surface-card rounded-xl p-5 hover:shadow-md">
              <h3 className="text-lg font-black text-slate-900">{catalog.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{catalog.description}</p>
              <p className="mt-4 text-sm font-bold underline">Open catalog</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container">
        <h2 className="section-title heading-serif">Legacy Specialty Collections</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {legacyCollections.map((catalog) => (
            <Link
              key={catalog.href}
              href={catalog.href}
              className="surface-card rounded-lg px-4 py-3 font-semibold text-slate-800 hover:shadow-sm"
            >
              {catalog.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

