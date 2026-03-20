import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contactPhone, contactPhoneHref, contactTextHref } from '@/components/siteConfig'
import {
  getCatalogOverviewPath,
  getCatalogProductBySlug,
  getCatalogProductsByIndustry,
  money,
  type CatalogProduct,
} from '@/lib/catalogProducts'

export const metadata: Metadata = {
  title: {
    absolute: 'Smoke Shop Bag Programs | Stocked Dispensary Style Paper Bags | Bag Supply Co',
  },
  description:
    'Stocked dispensary style paper bag designs for smoke shops and specialty retailers. Browse 15 paper designs in Classic RX and #12-DS formats with case pricing from $43.40.',
  alternates: {
    canonical: '/industries/smoke-shops',
  },
}

const featuredSmokeShopSlugs = [
  'dispensary-bag-design-10',
  'dispensary-bag-design-11',
  'dispensary-bag-design-12',
  'dispensary-bag-design-13',
  'dispensary-bag-design-14',
  'dispensary-bag-design-15',
]

const aboutPoints = [
  'Stocked paper designs give smoke shops a discreet carryout option without waiting on custom print setup.',
  'Keeping the program to Classic RX and #12-DS sizes makes storage, reordering, and front-counter handoff easier.',
  'Design variety lets teams refresh the look of the bag wall without changing the core case-count program.',
]

function getFeaturedProducts(): CatalogProduct[] {
  return featuredSmokeShopSlugs
    .map((slug) => getCatalogProductBySlug(slug))
    .filter((product): product is CatalogProduct => Boolean(product))
}

export default function SmokeShopsIndustryPage() {
  const smokeShopProducts = getCatalogProductsByIndustry('smoke-shop')
  const featuredProducts = getFeaturedProducts()
  const firstProduct = featuredProducts[0]

  return (
    <div className="pb-16">
      <section className="page-hero overflow-hidden">
        <div className="page-hero-inner relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(181,129,58,0.24),transparent_70%)]" />
          <div className="relative split-panel items-start">
            <div>
              <p className="kicker">Smoke Shop Programs</p>
              <h1 className="heading-display mt-5">
                Stocked dispensary style paper bags for smoke shops that need discreet carryout fast.
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Give your front counter a cleaner paper handoff with stocked bag designs built for smoke shops,
                vape counters, and specialty retailers. The lineup stays simple: 15 designs, two proven sizes,
                and predictable case pricing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  15 stocked designs
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  Classic RX and #12-DS
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  From {money(43.4)} / case
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/catalog?industry=smoke-shop" className="btn-secondary">
                  Browse Smoke Shop Catalog
                </Link>
                <Link href="/generic-bag-quote" className="btn-primary">
                  Build a Quote
                </Link>
                <a href={contactTextHref} className="btn-quiet">
                  Text Our Team
                </a>
              </div>
            </div>

            <div className="hero-panel overflow-hidden">
              <div className="grid gap-4">
                {firstProduct && (
                  <Link
                    href={getCatalogOverviewPath(firstProduct)}
                    className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]"
                  >
                    <Image
                      src={firstProduct.image}
                      alt={firstProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      priority
                    />
                  </Link>
                )}
                <div className="grid gap-2 text-sm font-semibold text-[#5F4D33] sm:grid-cols-2">
                  <p className="surface-card rounded-xl px-3 py-2">Stock paper program with two consistent bag sizes</p>
                  <p className="surface-card rounded-xl px-3 py-2">Ideal for discreet checkout and repeat replenishment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="tonal-panel">
            <p className="kicker">About</p>
            <h2 className="section-title mt-4">Built for retailers that want ready-to-ship paper bags without a custom setup cycle.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Smoke shops often need packaging that feels more polished than a blank kraft bag but does not require the
              lead time, proofs, and minimums of a full custom run. This stocked design lineup gives teams a faster path:
              choose the look you want, keep the size program consistent, and reorder the same format as traffic changes.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Because every design shares the same core bag sizes and case model, stores can standardize checkout flow,
              storage, and reorder timing while still rotating graphics across locations or seasons. It is a simpler way
              to keep the counter looking intentional without rebuilding the entire bag program.
            </p>
          </div>

          <div className="tonal-panel">
            <p className="kicker">Why It Works</p>
            <div className="mt-5 grid gap-3">
              {aboutPoints.map((point) => (
                <div key={point} className="surface-card rounded-xl px-4 py-3 text-sm font-semibold text-[#1E4D2B]">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-[#C4935A66] bg-white px-4 py-4 text-sm text-[#5F4D33]">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Program Snapshot</p>
              <p className="mt-2 font-semibold text-[#1E4D2B]">{smokeShopProducts.length} stocked SKUs</p>
              <p className="mt-1">1,000/case model across the smoke shop paper program.</p>
              <p className="mt-1">Most-used sizes: Classic RX (10&quot; x 5&quot; x 1&quot;) and #12-DS (7&quot; x 10&quot;).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Products</p>
              <h2 className="section-title mt-4">Featured smoke shop bag designs ready for size selection.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                Start with one of the stocked designs below, then choose your size on the product page. Every SKU stays
                in the same two-size paper program to keep ordering and replenishment simple.
              </p>
            </div>
            <Link href="/catalog?industry=smoke-shop" className="btn-secondary">
              Open Full Smoke Shop Catalog
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.sku} className="surface-card product-card">
                <Link href={getCatalogOverviewPath(product)} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">
                    <Link href={getCatalogOverviewPath(product)} className="transition hover:text-[#B5813A]">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-[#5F4D33]">{product.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#5F4D33]">{product.caseCount}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">{product.sizeOptions.join(' / ')}</p>
                  <p className="mt-2 product-card-price">From {money(product.startingPrice)} / case</p>
                  <Link href={getCatalogOverviewPath(product)} className="btn-secondary mt-4">
                    View Product
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#1E4D2B,#225935_55%,#15361F)] p-8 text-white shadow-[0_24px_48px_rgba(30,77,43,0.28)] md:p-10">
          <p className="kicker text-[#F4E8D8]">Contact CTA</p>
          <h2 className="heading-display mt-4 max-w-4xl text-[2.4rem] leading-tight text-white md:text-[3.2rem]">
            Ready to standardize your smoke shop paper bag lineup?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#F4E8D8]">
            Browse the stocked catalog, pick the bag style that fits your counter, and we can help you line up repeat
            ordering or build a broader packaging program around it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <Link href="/catalog?industry=smoke-shop" className="btn-secondary">
              Browse Smoke Shop Catalog
            </Link>
            <a href={contactTextHref} className="btn-secondary">
              Text {contactPhone}
            </a>
            <a href={contactPhoneHref} className="btn-secondary">
              Call {contactPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
