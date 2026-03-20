import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import AddToCartControl from '@/components/cart/AddToCartControl'
import { contactPhone, contactPhoneHref, contactTextHref } from '@/components/siteConfig'
import { money } from '@/lib/catalogProducts'
import {
  formatCigarQuantityLabel,
  getAllCigarProducts,
  getCigarProductBySlug,
} from '@/lib/cigarCatalog'
import { formatMylarQuantityLabel, getMylarProductBySlug, type MylarProduct } from '@/lib/mylarCatalog'

export const metadata: Metadata = {
  title: {
    absolute: 'Cigar Shop Packaging Programs | Printed Cigar Bags and Mylar | Bag Supply Co',
  },
  description:
    'Printed cigar bags and mylar packaging for cigar shops and lounges that want a cleaner checkout presentation with stocked reorder-friendly options.',
  alternates: {
    canonical: '/industries/cigar-shops',
  },
}

const featuredMylarSlugs = [
  '1-8-oz-gloss-gold-clear-plain',
  '1-8-oz-matte-black-opaque-plain',
  '1-4-oz-kraft-opaque-plain',
  'pre-roll-gloss-holographic-clear-plain',
]

const aboutPoints = [
  'Printed cigar bags give shops and lounges a more polished handoff than plain carryout without forcing a custom run.',
  'Keeping the cigar bag lineup in a few proven sizes makes counter storage and reorder planning easier.',
  'Adding mylar alongside printed bags covers singles, bundles, and premium carryout in one packaging program.',
]

function getFeaturedMylarProducts(): MylarProduct[] {
  return featuredMylarSlugs
    .map((slug) => getMylarProductBySlug(slug))
    .filter((product): product is MylarProduct => Boolean(product))
}

export default function CigarShopsIndustryPage() {
  const cigarProducts = getAllCigarProducts()
  const heroProduct = getCigarProductBySlug('printed-cigar-bags-5x10') || cigarProducts[0]
  const featuredMylarProducts = getFeaturedMylarProducts()

  return (
    <div className="pb-16">
      <section className="page-hero overflow-hidden">
        <div className="page-hero-inner relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(181,129,58,0.24),transparent_70%)]" />
          <div className="relative split-panel items-start">
            <div>
              <p className="kicker">Cigar Shop Programs</p>
              <h1 className="heading-display mt-5">
                Printed cigar bags and mylar options built for cigar shops, lounges, and premium tobacco counters.
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Give every carryout a more intentional finish with printed cigar bags for singles, bundles, and boxed
                purchases, then layer in mylar formats for premium storage or specialty add-ons.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  4 cigar bag SKUs
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  From {money(115)} / case
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  Free shipping on 2+ cases
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/catalog/cigar-bags" className="btn-primary">
                  Browse Printed Cigar Bags
                </Link>
                <Link href="/catalog/mylar-bags" className="btn-secondary">
                  Browse Mylar Bags
                </Link>
                <Link href="/generic-bag-quote" className="btn-secondary">
                  Build a Quote
                </Link>
              </div>
            </div>

            <div className="hero-panel overflow-hidden">
              <div className="grid gap-4">
                {heroProduct && (
                  <Link
                    href={`/catalog/cigar-bags/${heroProduct.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]"
                  >
                    <FallbackImage
                      src={heroProduct.image}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={`${heroProduct.name} ${heroProduct.size}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      priority
                    />
                  </Link>
                )}
                <div className="grid gap-2 text-sm font-semibold text-[#5F4D33] sm:grid-cols-2">
                  <p className="surface-card rounded-xl px-3 py-2">Printed bag sizes for singles, sampler bundles, and counter carryout.</p>
                  <p className="surface-card rounded-xl px-3 py-2">Mylar options help extend the program into premium storage and add-on packaging.</p>
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
            <h2 className="section-title mt-4">Built for cigar retailers that want a cleaner bag program without overcomplicating the reorder.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Cigar shops and lounges usually need packaging that feels a little more elevated than a generic checkout
              bag but still works at a stocked, reorder-friendly pace. This lineup keeps the choices focused: a few
              proven printed bag sizes for everyday counter use plus a premium slider format for higher-end presentation.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Pair that with a handful of mylar options and you can cover routine purchases, special releases, and
              premium take-home packaging without splitting the program across multiple suppliers or workflows.
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
              <p className="mt-2 font-semibold text-[#1E4D2B]">{cigarProducts.length} stocked cigar bag SKUs</p>
              <p className="mt-1">Core lineup covers 3 x 10, 5 x 10, 8 x 10, and a premium 6.5 x 10 slider format.</p>
              <p className="mt-1">Use the mylar catalog for complementary premium storage and specialty packaging.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Printed Cigar Bags</p>
              <h2 className="section-title mt-4">Stocked formats for singles, bundles, and premium presentation.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                Start with the size that fits your counter flow, then use the product page for discount breaks and
                shipping details. Every SKU uses the same straightforward reorder ladder.
              </p>
            </div>
            <Link href="/catalog/cigar-bags" className="btn-secondary">
              Open Printed Cigar Bags
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cigarProducts.map((product) => (
              <article key={product.slug} className="surface-card product-card flex h-full flex-col">
                <Link href={`/catalog/cigar-bags/${product.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={product.image}
                    fallbackSrc="/images/catalog/placeholder.svg"
                    alt={`${product.name} ${product.size}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">
                    <Link href={`/catalog/cigar-bags/${product.slug}`} className="transition hover:text-[#B5813A]">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#5F4D33]">{product.size}</p>
                  <p className="mt-2 text-sm text-[#5F4D33]">{product.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#5F4D33]">
                    {formatCigarQuantityLabel(product.quantity, product.unit)}
                  </p>
                  <p className="mt-2 product-card-price">{money(product.price)} / {formatCigarQuantityLabel(product.quantity, product.unit)}</p>
                  <div className="mt-auto pt-4">
                    <AddToCartControl
                      item={{
                        id: `cigar:${product.slug}`,
                        kind: 'catalog',
                        sku: product.sku,
                        slug: product.slug,
                        name: `${product.name} ${product.size}`,
                        image: product.image,
                        productHref: `/catalog/cigar-bags/${product.slug}`,
                        quantity: 1,
                        unitPrice: product.price,
                        unit: product.unit,
                        unitLabel: formatCigarQuantityLabel(product.quantity, product.unit),
                        sizeLabel: product.size,
                      }}
                      showQuantity={false}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Mylar Bags</p>
              <h2 className="section-title mt-4">Add premium storage and specialty packaging to the cigar bag program.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                These featured mylar formats give cigar shops another packaging lane for premium releases, accessories,
                or higher-end carryout while keeping the sourcing path simple.
              </p>
            </div>
            <Link href="/catalog/mylar-bags" className="btn-secondary">
              Browse Mylar Bags
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredMylarProducts.map((product) => (
              <article key={product.slug} className="surface-card product-card flex h-full flex-col">
                <Link href={`/catalog/mylar-bags/${product.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={product.image}
                    fallbackSrc="/images/mylar/placeholder.webp"
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">
                    <Link href={`/catalog/mylar-bags/${product.slug}`} className="transition hover:text-[#B5813A]">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-[#5F4D33]">{product.size} / {product.finish}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">{formatMylarQuantityLabel(product.quantity)}</p>
                  <p className="mt-2 product-card-price">{money(product.price)} / {formatMylarQuantityLabel(product.quantity)}</p>
                  <div className="mt-auto pt-4">
                    <AddToCartControl
                      item={{
                        id: `mylar:${product.slug}`,
                        kind: 'mylar',
                        sku: product.sku,
                        slug: product.slug,
                        name: product.name,
                        image: product.image,
                        productHref: `/catalog/mylar-bags/${product.slug}`,
                        unit: 'pack',
                        unitLabel: formatMylarQuantityLabel(product.quantity),
                        unitPrice: product.price,
                        quantity: 1,
                      }}
                      showQuantity={false}
                    />
                  </div>
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
            Ready to tighten up your cigar shop packaging mix?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#F4E8D8]">
            Start with printed cigar bags, add premium mylar where it fits, and we can help you line up a repeatable
            ordering program for the counter, lounge, and special-release side of the business.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <Link href="/catalog/cigar-bags" className="btn-secondary-inverse">
              Browse Printed Cigar Bags
            </Link>
            <a href={contactTextHref} className="btn-secondary-inverse">
              Text {contactPhone}
            </a>
            <a href={contactPhoneHref} className="btn-secondary-inverse">
              Call {contactPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
