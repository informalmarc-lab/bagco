import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { contactPhone, contactPhoneHref, contactTextHref } from '@/components/siteConfig'
import { getCatalogOverviewPath, getCatalogProductBySlug, money } from '@/lib/catalogProducts'
import { getAllLabelProducts } from '@/lib/labelCatalog'
import { getMylarProductBySlug, type MylarProduct } from '@/lib/mylarCatalog'

export const metadata: Metadata = {
  title: {
    absolute: 'Dispensary Packaging Programs | Labels, Mylar Bags, and Paper Bags | Bag Supply Co',
  },
  description:
    'Dispensary-ready packaging with compliance labels, curated mylar bags, paper exit bags, and direct quote routing.',
  alternates: {
    canonical: '/industries/dispensary',
  },
}

const featuredMylarSlugs = [
  '1-8-oz-matte-black-opaque-with-labels-designer',
  '1-4-oz-matte-black-clear-with-labels-designer',
  '1-2-oz-matte-black-opaque-with-labels-designer',
  '1-oz-matte-black-opaque-with-labels-designer',
  '1-8-oz-cr-exit-matte-black-designer',
  '1-4-oz-cr-exit-matte-black-designer',
]

const aboutPoints = [
  'Opaque exit bags keep checkout simple when visibility rules matter.',
  'Compliance labels give dispensary teams a fast way to standardize jars, mylar, and carryout packaging.',
  'A stocked-and-custom mix lets operators move now, then dial in branded programs without changing suppliers.',
]

function getFeaturedMylarProducts(): MylarProduct[] {
  return featuredMylarSlugs
    .map((slug) => getMylarProductBySlug(slug))
    .filter((product): product is MylarProduct => Boolean(product))
}

export default function DispensaryIndustryPage() {
  const labels = getAllLabelProducts()
  const mylarProducts = getFeaturedMylarProducts()
  const paperBag = getCatalogProductBySlug('dispensary-prescription-exit-bag')

  return (
    <div className="pb-16">
      <section className="page-hero overflow-hidden">
        <div className="page-hero-inner relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(181,129,58,0.24),transparent_70%)]" />
          <div className="relative split-panel items-start">
            <div>
              <p className="kicker">Dispensary Programs</p>
              <h1 className="heading-display mt-5">
                Dispensary packaging built around compliance, speed, and cleaner checkout flow.
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Pair compliance labels with curated mylar and paper exit bags so your dispensary team can move fast,
                stay organized, and keep packaging standards consistent across locations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  6 compliance labels
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  6 featured mylar SKUs
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  1 stocked paper exit bag
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/generic-bag-quote" className="btn-primary">
                  Build a Quote
                </Link>
                <Link href="/catalog/labels" className="btn-secondary">
                  Browse Labels
                </Link>
                <Link href="/catalog/mylar-bags" className="btn-secondary">
                  Browse Mylar
                </Link>
              </div>
            </div>

            <div className="hero-panel overflow-hidden">
              <div className="grid gap-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]">
                  <Image
                    src="/images/labels/california-v2-universal-symbol-rx-compliant-labels.webp"
                    alt="Dispensary compliance labels"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    priority
                  />
                </div>
                <div className="grid gap-2 text-sm font-semibold text-[#5F4D33] sm:grid-cols-2">
                  <p className="surface-card rounded-xl px-3 py-2">Fixed label pricing at {money(12)}/case</p>
                  <p className="surface-card rounded-xl px-3 py-2">Quote routing for stocked and branded programs</p>
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
            <h2 className="section-title mt-4">Built for dispensary operators who need packaging to stay predictable.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Dispensary teams usually need three things from packaging: fast replenishment, clear compliance handling,
              and a clean handoff at checkout. This page is built around that exact workflow. Start with stocked label
              and bag options, then layer in custom print once your core packaging lane is working smoothly.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Instead of bouncing between unrelated vendors, you can keep labels, mylar, and paper exit bags moving
              through one quote path. That makes it easier to standardize approved formats by location and reduce
              reorder friction for your team.
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
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Compliance Labels</p>
              <h2 className="section-title mt-4">Six label options for jars, mylar, and exit packaging.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                Each label stays on a simple case model: 1,000 qty, {money(12)}/case, and free shipping.
              </p>
            </div>
            <Link href="/catalog/labels" className="btn-secondary">
              Open Labels Catalog
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {labels.map((label) => (
              <article key={label.sku} className="surface-card product-card">
                <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                  <Image
                    src={label.image}
                    alt={label.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {label.sku}</p>
                    <span className="rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#1E4D2B]">
                      {label.shippingBadge}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{label.name}</h3>
                  <p className="mt-2 text-sm text-[#5F4D33]">{label.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#5F4D33]">
                    {label.quantity.toLocaleString('en-US')} qty per case
                  </p>
                  <p className="mt-1 product-card-price">{money(label.price)} / case</p>
                  <Link href="/generic-bag-quote" className="btn-primary mt-4">
                    Build a Quote
                  </Link>
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
              <h2 className="section-title mt-4">Curated mylar formats for label-ready and CR-focused programs.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                These six SKUs keep the mix tight around opaque formats, label-ready faces, and child-resistant exit
                bag use cases.
              </p>
            </div>
            <Link href="/catalog/mylar-bags" className="btn-secondary">
              View All Mylar
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mylarProducts.map((product) => (
              <article key={product.sku} className="surface-card product-card">
                <Link href={`/catalog/mylar-bags/${product.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
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
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{product.name}</h3>
                  <p className="mt-1 text-sm text-[#5F4D33]">{product.size} / {product.finish}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">{product.quantity.toLocaleString('en-US')} qty</p>
                  <p className="mt-2 product-card-price">{money(product.price)} / pack</p>
                  <Link href={`/catalog/mylar-bags/${product.slug}`} className="btn-secondary mt-4">
                    View SKU
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {paperBag && (
        <section className="section-container pt-2">
          <div className="tonal-panel">
            <div className="split-panel items-start">
              <div>
                <p className="kicker">Paper Bags</p>
                <h2 className="section-title mt-4">Keep a stocked paper exit bag in the core mix.</h2>
                <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
                  For dispensaries that want a straightforward paper carryout option, this stocked format gives your
                  team a reliable fallback alongside mylar-heavy programs. It works well for fast counter service,
                  multi-bag orders, and operators who need a cleaner branded handoff.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
                  If you are standardizing by store or region, this is also the easiest lane to pair with recurring
                  replenishment and a quote-built reorder plan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={getCatalogOverviewPath(paperBag)} className="btn-secondary">
                    View Paper Bag
                  </Link>
                  <Link href="/catalog?industry=dispensary" className="btn-secondary">
                    Filter Dispensary Catalog
                  </Link>
                  <Link href="/generic-bag-quote" className="btn-primary">
                    Quote This Program
                  </Link>
                </div>
              </div>

              <article className="surface-card product-card">
                <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                  <Image
                    src={paperBag.image}
                    alt={paperBag.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {paperBag.sku}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{paperBag.name}</h3>
                  <p className="mt-1 text-sm text-[#5F4D33]">{paperBag.caseCount}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">{paperBag.sizeOptions.join(', ')}</p>
                  <p className="mt-2 product-card-price">From {money(paperBag.startingPrice)} / case</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      <section className="section-container pt-2">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#1E4D2B,#225935_55%,#15361F)] p-8 text-white shadow-[0_24px_48px_rgba(30,77,43,0.28)] md:p-10">
          <p className="kicker text-[#F4E8D8]">Contact CTA</p>
          <h2 className="heading-display mt-4 max-w-4xl text-[2.4rem] leading-tight text-white md:text-[3.2rem]">
            Ready to tighten up your dispensary packaging mix?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#F4E8D8]">
            Build your quote first, then we can help you line up labels, mylar, and paper exit bags into one cleaner
            packaging program.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
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
