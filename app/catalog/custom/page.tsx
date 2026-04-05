import type { Metadata } from 'next'
import Link from 'next/link'
import CustomCatalogClient from '@/components/catalog/CustomCatalogClient'
import RelatedIndustryLinks from '@/components/seo/RelatedIndustryLinks'
import { getCustomCatalogImages } from '@/lib/catalogImages'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'

const BASE_RULES = [
  '4 case minimum for selected custom bag type',
  'Art/plate setup fee applies on initial order and proof changes',
  'Typical lead time: around 4 weeks after proof approval',
  '8+ cases qualify for free shipping to commercial addresses',
]

export const metadata: Metadata = buildPageMetadata({
  title: 'Custom Printed Wholesale Bags',
  description:
    'Compare custom printed wholesale bags for buyers who need branded paper bag options, production rules, and BagSupplyCo quote support.',
  path: '/catalog/custom',
  imagePath: '/catalog/custom/2-color/CBC-25-FC2C.webp',
})

export default function CustomCatalogPage() {
  const images = getCustomCatalogImages()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Custom Catalog</p>
          <h1 className="heading-display mt-5">Custom Printed Wholesale Paper Bags</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Compare 1-color, 2-color, and 3-color custom print options with case-level pricing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <h2 className="section-title">Program Rules</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {BASE_RULES.map((rule) => (
              <p key={rule} className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <CustomCatalogClient images={images} />

      <RelatedIndustryLinks
        title="Related industry pages for custom bag buyers."
        intro="These vertical pages show how custom paper bag programs fit pharmacy, veterinary, and retail-style workflows."
        links={[
          {
            href: '/industries/pharmacies',
            label: 'Custom Pharmacy Bag Programs',
            description: 'See how branded pharmacy carryout programs pair stock replenishment with custom print.',
          },
          {
            href: '/industries/retail',
            label: 'Custom Retail Bag Programs',
            description: 'Explore checkout-focused retail bag needs before requesting custom printed bag pricing.',
          },
        ]}
      />

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Ready for a custom printed bag quote?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-secondary">Contact Team</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
