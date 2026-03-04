import type { Metadata } from 'next'
import Link from 'next/link'
import IndustrySolutionsSection from '@/components/IndustrySolutionsSection'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Industry-specific packaging programs for pharmacies, dispensaries, smoke shops, veterinary clinics, and retail stores.',
}

const segments = [
  {
    title: 'Dispensaries',
    copy: 'Discreet presentation, strong branding, and reliable supply for regulated retail.',
    href: '/industries/dispensaries',
  },
  {
    title: 'Pharmacies',
    copy: 'Case-based programs that support daily script volume and customer trust at checkout.',
    href: '/industries/pharmacies',
  },
  {
    title: 'Smoke Shops',
    copy: 'Brand-forward packaging designed to improve recognition in local markets.',
    href: '/industries/smoke-shops',
  },
  {
    title: 'Retail Stores',
    copy: 'Flexible programs for boutiques, chains, and specialty storefront teams.',
    href: '/industries/retail-stores',
  },
]

export default function IndustriesPage() {
  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Industry Programs</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">
            Packaging Systems Built Around Your Business Model
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Select your industry and weâ€™ll align bag formats, branding options, and reorder cadence to the way your operation actually runs.
          </p>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {segments.map((item) => (
            <article key={item.title} className="tonal-panel">
              <h2 className="text-2xl font-black text-slate-950">{item.title}</h2>
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


