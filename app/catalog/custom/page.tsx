import type { Metadata } from 'next'
import Link from 'next/link'
import CustomCatalogClient from '@/components/catalog/CustomCatalogClient'
import RelatedIndustryLinks from '@/components/seo/RelatedIndustryLinks'
import { getCustomCatalogImages } from '@/lib/catalogImages'
import { getCatalogProductsByIndustry, money } from '@/lib/catalogProducts'
import { CUSTOM_COMPARE_ROWS, CUSTOM_ORDER_STEPS, CUSTOM_PROOF_POINTS } from '@/lib/customCatalogContent'
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
  const customProducts = getCatalogProductsByIndustry('custom')

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Custom Catalog</p>
          <h1 className="heading-display mt-5">Custom Printed Wholesale Paper Bags</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Compare 1-color, 2-color, and 3-color custom print options, understand the production rules, and move buyers into a cleaner custom-order path.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">Start a Custom Quote</Link>
            <Link href="/contact" className="btn-secondary">Talk to the Team</Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {CUSTOM_PROOF_POINTS.map((point) => (
              <div key={point} className="rounded-2xl bg-[rgba(255,255,255,0.62)] p-4 text-sm leading-6 text-muted">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="tonal-panel">
            <h2 className="section-title">Compare the Custom Print Levels</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-kraft-300/60 bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-brand-600 text-white">
                  <tr>
                    <th className="px-4 py-3">Program</th>
                    {customProducts.map((product) => (
                      <th key={product.sku} className="px-4 py-3">
                        {product.colorOptions[0]}
                        <div className="mt-1 text-xs font-medium text-[#E9DFD0]">
                          from {money(product.startingPrice)}/case
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CUSTOM_COMPARE_ROWS.map((row, index) => (
                    <tr key={row.key} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                      <td className="px-4 py-3 font-semibold text-brand-600">{row.key}</td>
                      {row.values.map((value, valueIndex) => (
                        <td key={`${row.key}-${valueIndex}`} className="px-4 py-3 text-muted">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">Program Rules</h2>
            <div className="mt-5 grid gap-3">
              {BASE_RULES.map((rule) => (
                <p key={rule} className="surface-card rounded-2xl p-4 text-sm font-semibold leading-6 text-muted">{rule}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pb-6">
        <div className="rounded-2xl border border-kraft-300/60 bg-brand-600 px-6 py-8 text-[#FAF6F0] md:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.1em] text-accent-300">How Custom Works</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.01em] text-white md:text-4xl">
                Make the custom ordering path feel simple before the buyer asks for help.
              </h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {CUSTOM_ORDER_STEPS.map((step, index) => (
                  <div key={step} className="rounded-2xl border border-white/12 bg-brand-700/60 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-accent-300">Step 0{index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-[#F4E8D8]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/12 bg-brand-700/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-300">Best Next Move</p>
              <p className="mt-3 text-sm leading-7 text-[#F4E8D8]">
                If the buyer already knows they want branded bags, do not send them wandering through the entire catalog first. Move them into custom print sizing and quote support immediately.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/makeyourquote" className="btn-primary">Start a Quote</Link>
                <Link href="/contact" className="btn-secondary-inverse">Ask a Question</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomCatalogClient images={images} products={customProducts} />

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
            <Link href="/makeyourquote" className="btn-primary">Start a Custom Quote</Link>
            <Link href="/contact" className="btn-secondary">Contact Team</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
