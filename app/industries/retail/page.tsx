import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import FaqSection from '@/components/seo/FaqSection'
import StructuredData from '@/components/seo/StructuredData'
import { getRetailProductAlt } from '@/lib/seo/imageAlt'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'
import { buildFaqJsonLd } from '@/lib/seo/structuredData'
import { getAllRetailProducts, getRetailStartingPrice } from '@/lib/retailCatalog'
import { money } from '@/lib/catalogProducts'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Retail Bags for Stores',
  description:
    'Wholesale retail bags for store buyers who need checkout-ready carryout, clear pricing, and BagSupplyCo support for repeat orders.',
  path: '/industries/retail',
  imagePath: '/images/catalog/retail-bags/thank-you-t-shirt-bags-main.webp',
})

const faqItems = [
  {
    question: 'Which retail stores are the best fit for this checkout bag program?',
    answer:
      'Convenience stores, gift shops, small retailers, and everyday checkout counters are the best fit because they need simple, reorder-friendly carryout bags.',
  },
  {
    question: 'Can I review pricing before contacting BagSupplyCo?',
    answer:
      'Yes. The retail bag catalog shows fixed case pricing and shipping breakpoints so buyers can compare options before requesting a quote.',
  },
  {
    question: 'Where should I go to see the full retail bag category?',
    answer:
      'Use the retail bag catalog to compare all available checkout bag variants, then return to BagSupplyCo for quote help if you need broader packaging support.',
  },
]

export default function RetailIndustryPage() {
  const products = getAllRetailProducts()
  const featuredProduct = products[0]
  const startingPrice = getRetailStartingPrice()

  return (
    <div className="pb-16">
      <StructuredData data={buildFaqJsonLd(faqItems)} />

      <section className="page-hero overflow-hidden">
        <div className="page-hero-inner relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(181,129,58,0.24),transparent_70%)]" />
          <div className="relative split-panel items-start">
            <div>
              <p className="kicker">Retail Programs</p>
              <h1 className="heading-display mt-5">Wholesale Retail Bags for Convenience Stores and Gift Shops</h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Keep checkout simple with stocked retail bags that give store buyers clear case pricing, repeat-order visibility, and fast BagSupplyCo support.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-brand-600">
                  Starting at {money(startingPrice)} / case
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-brand-600">
                  Free shipping on 2+ cases
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/catalog/retail-bags" className="btn-secondary">
                  Browse Retail Bag Catalog
                </Link>
                <Link href="/makeyourquote" className="btn-primary">
                  Build a Quote
                </Link>
              </div>
            </div>

            {featuredProduct && (
              <div className="hero-panel overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-kraft-400/40 bg-[#FAF6F0]">
                  <FallbackImage
                    src={featuredProduct.image}
                    fallbackSrc="/images/catalog/placeholder.svg"
                    alt={getRetailProductAlt(featuredProduct)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    priority
                  />
                </div>
                <div className="mt-4 grid gap-2 text-sm font-semibold text-muted">
                  <p className="surface-card rounded-xl px-3 py-2">Retail checkout bags for convenience stores and gift shops</p>
                  <p className="surface-card rounded-xl px-3 py-2">Most buyers start with stocked thank-you t-shirt bags</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="tonal-panel">
            <p className="kicker">About</p>
            <h2 className="section-title mt-4">Wholesale retail checkout bags built for fast-moving store counters.</h2>
            <p className="mt-4 text-sm leading-7 text-muted md:text-base">
              Retail buyers usually want a bag program that is simple to stock, easy to reorder, and priced clearly enough that store managers can make decisions quickly. This page is built for that kind of checkout workflow.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted md:text-base">
              Start with the stocked retail bag catalog, compare the case options that match your counter volume, and use BagSupplyCo when you need a broader quote or another category tied into the same buying plan.
            </p>
          </div>

          <div className="tonal-panel">
            <p className="kicker">Why It Works</p>
            <div className="mt-5 grid gap-3">
              <div className="surface-card rounded-xl px-4 py-3 text-sm font-semibold text-brand-600">
                Fixed case pricing makes checkout bag planning easier for multi-store and independent buyers.
              </div>
              <div className="surface-card rounded-xl px-4 py-3 text-sm font-semibold text-brand-600">
                Stocked retail bags reduce lead-time stress when stores need a quick reorder.
              </div>
              <div className="surface-card rounded-xl px-4 py-3 text-sm font-semibold text-brand-600">
                The retail category links directly back to the catalog for fast SKU comparison and quote follow-up.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Retail Catalog</p>
              <h2 className="section-title mt-4">Retail checkout bag options for everyday store reorders.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                Compare stocked retail bag variants, then move into the full retail catalog for exact case counts and pricing.
              </p>
            </div>
            <Link href="/catalog/retail-bags" className="btn-secondary">
              Open Retail Bag Catalog
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((product) => (
              <article key={product.slug} className="surface-card product-card flex h-full flex-col">
                <Link href={`/catalog/retail-bags/${product.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={product.image}
                    fallbackSrc="/images/catalog/placeholder.svg"
                    alt={getRetailProductAlt(product)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-accent-600">SKU {product.sku}</p>
                  <h3 className="mt-2 font-serif text-lg text-brand-600">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted">{product.description}</p>
                  <p className="mt-2 product-card-price">From {money(Math.min(...product.variants.map((variant) => variant.price)))} / case</p>
                  <div className="mt-auto pt-4">
                    <Link href="/catalog/retail-bags" className="btn-primary">
                      Browse Retail Catalog
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title="Wholesale retail bag FAQs for store buyers."
        intro="These answers cover the key questions retail buyers ask before moving into the category page."
        items={faqItems}
      />
    </div>
  )
}
