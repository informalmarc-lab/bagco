import type { Metadata } from 'next'
import Link from 'next/link'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Industry-specific packaging programs for pharmacies, veterinary clinics, dispensaries, smoke shops, retail stores, and food service teams.',
}

const segments = [
  {
    title: 'Pharmacies',
    copy: 'Case-based stock and custom programs for daily script volume and cleaner checkout flow.',
    href: '/industries/pharmacies',
  },
  {
    title: 'Veterinary',
    copy: 'Paw print stock and custom handled/flat options built for clinic workflows.',
    href: '/industries/veterinary',
  },
  {
    title: 'Dispensaries',
    copy: 'Child-resistant, smell-proof, and custom print bag lines for compliant retail.',
    href: '/industries/dispensaries',
  },
  {
    title: 'Smoke Shops',
    copy: 'Generic and branded carry-out bags to improve recognition and repeat traffic.',
    href: '/industries/smoke-shops',
  },
  {
    title: 'Wineries & Breweries',
    copy: 'Bottle bag programs for tasting rooms, clubs, and retail bottle handoff workflows.',
    href: '/industries/wineries-breweries',
  },
  {
    title: 'Retail / Boutique',
    copy: 'Handled kraft, euro tote, glossy white, and seasonal collections in one flow.',
    href: '/industries/retail-stores',
  },
  {
    title: 'Food & Beverage',
    copy: 'Durable takeout and bakery bag programs with stock and custom paths.',
    href: '/industries/food-beverage',
  },
  {
    title: 'Distributors',
    copy: 'Factory-direct wholesale programs with blind shipping and drop shipping support.',
    href: '/industries/distributors',
  },
]

export default function IndustriesPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Programs</p>
          <h1 className="heading-display mt-5">
            Packaging Systems Built Around Your Business Type
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Select your industry and go directly to an industry-specific product gallery with a filtered
            catalog path and most-ordered sizes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((item) => (
            <article key={item.title} className="tonal-panel">
              <h2 className="text-2xl font-black text-[#1E4D2B]">{item.title}</h2>
              <p className="mt-3 muted-text">{item.copy}</p>
              <Link href={item.href} className="btn-secondary mt-5">
                Open Industry Page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <IndustrySolutionsSection />
    </div>
  )
}


