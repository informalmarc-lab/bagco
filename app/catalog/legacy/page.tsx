import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legacy Catalog Directory',
  description:
    'Complete directory of legacy and specialty paper bag catalog collections.',
}

const primary = [
  { title: 'Pharmacy Catalog', href: '/catalog/pharmacy' },
  { title: 'Veterinary Catalog', href: '/catalog/veterinary' },
  { title: 'Custom Print Catalog', href: '/catalog/custom' },
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
]

export default function LegacyCatalogPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Catalog Directory</p>
          <h1 className="heading-display mt-5">Legacy Catalogs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Access every catalog collection in one place, including specialty and seasonal programs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
            <Link href="/catalog" className="btn-secondary">Back to Catalog Hub</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <h2 className="section-title">Primary Catalogs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {primary.map((item) => (
            <Link key={item.href} href={item.href} className="tonal-panel hover:translate-y-[-2px] transition-transform">
              <h3 className="text-xl font-black text-[#1E4D2B]">{item.title}</h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-[#B5813A]">Open</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container">
        <h2 className="section-title">Specialty Collections</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {legacyCollections.map((item) => (
            <Link key={item.href} href={item.href} className="surface-card rounded-2xl px-4 py-3 text-sm font-semibold text-[#5F4D33] hover:bg-[#FAF6F0]">
              {item.title}
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}





