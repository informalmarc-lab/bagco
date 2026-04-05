import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import FaqSection from '@/components/seo/FaqSection'
import StructuredData from '@/components/seo/StructuredData'
import { contactPhone, contactPhoneHref, contactTextHref } from '@/components/siteConfig'
import { getCatalogOverviewPath, getCatalogProductBySlug, money, type CatalogProduct } from '@/lib/catalogProducts'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import { buildPageMetadata } from '@/lib/seo/pageMetadata'
import { buildFaqJsonLd } from '@/lib/seo/structuredData'

export const metadata: Metadata = buildPageMetadata({
  title: 'Wholesale Pharmacy Bags for Independent Pharmacies',
  description:
    'Wholesale pharmacy bags for buyers who need stock prescription sizes, custom print options, and BagSupplyCo support for dependable reorders.',
  path: '/industries/pharmacies',
  imagePath: '/catalog/pharmacy/gs/GS-22-FRONT.webp',
})

const featuredPharmacySlugs = [
  'pharmacy-bag-gs-design',
  'pharmacy-bag-thank-you-design',
  'pharmacy-bags-plastic-gs-design',
] as const

const featuredCustomSlugs = [
  'full-custom-1-color-bags',
  'full-custom-2-color-bags',
  'full-custom-3-color-bags',
] as const

const aboutPoints = [
  'Stocked prescription bag programs keep daily script handoff fast and predictable.',
  'Branded carry-out options help independent pharmacies reinforce trust at checkout.',
  'One quote path makes it easier to plan stock replenishment and custom print together.',
]

const faqItems = [
  {
    question: 'Which pharmacy bag sizes should an independent pharmacy stock first?',
    answer:
      'Most independent pharmacies start with the most common prescription bag sizes such as #21, #22, #25, and #12 to cover daily script volume efficiently.',
  },
  {
    question: 'Can BagSupplyCo support both stock pharmacy bags and custom printed pharmacy bags?',
    answer:
      'Yes. Pharmacies often begin with stock white paper bags, then add custom print once they want stronger front-counter branding without changing suppliers.',
  },
  {
    question: 'Where do I browse the full pharmacy bag catalog before requesting pricing?',
    answer:
      'Use the pharmacy catalog page to compare GS, TY, and plastic GS bag families, then build a quote once you know the sizes your pharmacy needs.',
  },
]

function getFeaturedPharmacyProducts(): CatalogProduct[] {
  return featuredPharmacySlugs
    .map((slug) => getCatalogProductBySlug(slug))
    .filter((product): product is CatalogProduct => Boolean(product))
}

function getFeaturedCustomProducts(): CatalogProduct[] {
  return featuredCustomSlugs
    .map((slug) => getCatalogProductBySlug(slug))
    .filter((product): product is CatalogProduct => Boolean(product))
}

export default function PharmaciesIndustryPage() {
  const heroProduct = getCatalogProductBySlug('pharmacy-bag-gs-design')
  const featuredProducts = getFeaturedPharmacyProducts()
  const customProducts = getFeaturedCustomProducts()

  return (
    <div className="pb-16">
      <StructuredData data={buildFaqJsonLd(faqItems)} />
      <section className="page-hero overflow-hidden">
        <div className="page-hero-inner relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(181,129,58,0.24),transparent_70%)]" />
          <div className="relative split-panel items-start">
            <div>
              <p className="kicker">Pharmacy Programs</p>
              <h1 className="heading-display mt-5">
                Pharmacy bag programs built for independent counters that need stock now and branded carry-out later.
              </h1>
              <p className="mt-5 max-w-3xl text-lg muted-text">
                Keep prescription pickup moving with stocked paper pharmacy bags, then layer in custom print when you
                are ready to tighten up patient-facing branding across your locations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  3 stocked families
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  3 custom print options
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
                  Stock + custom planning
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/generic-bag-quote" className="btn-primary">
                  Build a Quote
                </Link>
                <Link href="/catalog/pharmacy" className="btn-secondary">
                  View All Pharmacy Bags
                </Link>
                <Link href="/catalog/custom" className="btn-secondary">
                  View Custom Bag Options
                </Link>
              </div>
            </div>

            <div className="hero-panel overflow-hidden">
              <div className="grid gap-4">
                {heroProduct && (
                  <Link
                    href={getCatalogOverviewPath(heroProduct)}
                    className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]"
                  >
                    <FallbackImage
                      src={heroProduct.image}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={getCatalogProductAlt(heroProduct)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      priority
                    />
                  </Link>
                )}
                <div className="grid gap-2 text-sm font-semibold text-[#5F4D33] sm:grid-cols-2">
                  <p className="surface-card rounded-xl px-3 py-2">Stock sizes cover the most common prescription pickup formats.</p>
                  <p className="surface-card rounded-xl px-3 py-2">Custom print adds branded carry-out without changing suppliers.</p>
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
            <h2 className="section-title mt-4">Wholesale paper bags for independent pharmacies that need cleaner prescription handoff.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Independent pharmacies usually need a packaging mix that does two jobs at once: support daily script
              volume with ready-to-ship stock bags and give the front counter a more polished branded handoff when
              custom print makes sense. This page is structured around that exact workflow.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#5F4D33] md:text-base">
              Start with the most-used prescription sizes, then move into custom 1-color, 2-color, or 3-color options
              when you want stronger carry-out recognition. Keeping both lanes under one supplier makes replenishment
              easier and reduces friction for repeat quote requests.
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
              <p className="kicker">Paper Bags</p>
              <h2 className="section-title mt-4">Three stocked pharmacy bag families covering the core lineup.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                Start with GS, TY, or Plastic GS depending on the type of pharmacy handoff you need, then use the full
                product page to choose the size that fits your script flow.
              </p>
            </div>
            <Link href="/catalog/pharmacy" className="btn-secondary">
              View All Pharmacy Bags
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.sku} className="surface-card product-card flex h-full flex-col">
                <Link href={getCatalogOverviewPath(product)} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={product.image}
                    fallbackSrc="/images/catalog/placeholder.svg"
                    alt={getCatalogProductAlt(product)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">
                    <Link href={getCatalogOverviewPath(product)} className="transition hover:text-[#B5813A]">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-[#5F4D33]">{product.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#5F4D33]">{product.caseCount}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">{product.sizeOptions.slice(0, 2).join(' / ')}</p>
                  <p className="mt-2 product-card-price">From {money(product.startingPrice)} / case</p>
                  <div className="mt-auto pt-4">
                    <Link href="/generic-bag-quote" className="btn-primary">
                      Build a Quote
                    </Link>
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
              <p className="kicker">Custom Bags</p>
              <h2 className="section-title mt-4">Custom 1-color, 2-color, and 3-color pharmacy bag programs.</h2>
              <p className="mt-3 max-w-3xl muted-text">
                Use the same core prescription sizes in a custom print lane when you are ready to standardize branding
                across independent locations, recurring orders, or higher-traffic counters.
              </p>
            </div>
            <Link href="/generic-bag-quote" className="btn-secondary">
              Get a Quote
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {customProducts.map((product) => (
              <article key={product.sku} className="surface-card product-card flex h-full flex-col">
                <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={product.image}
                    fallbackSrc="/images/catalog/placeholder.svg"
                    alt={getCatalogProductAlt(product)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{product.name}</h3>
                  <p className="mt-2 text-sm text-[#5F4D33]">{product.caseCount}</p>
                  <p className="mt-1 text-sm text-[#5F4D33]">Standard Rx sizes plus flat and gusset-bottom formats.</p>
                  <p className="mt-2 product-card-price">From {money(product.startingPrice)} / case</p>
                  <div className="mt-auto pt-4">
                    <Link href="/generic-bag-quote" className="btn-primary">
                      Get a Quote
                    </Link>
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
            Ready to line up a pharmacy bag program that covers both stock and branded carry-out?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#F4E8D8]">
            Start with the quote and we can help you map the right prescription bag sizes, custom print path, and
            reorder cadence for your pharmacy operation.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <a
              href={contactTextHref}
              className="btn-secondary-inverse"
            >
              Text {contactPhone}
            </a>
            <a
              href={contactPhoneHref}
              className="btn-secondary-inverse"
            >
              Call {contactPhone}
            </a>
          </div>
        </div>
      </section>

      <FaqSection
        title="Wholesale pharmacy bag FAQs for independent pharmacy buyers."
        intro="These answers help pharmacy teams compare stock bag sizes, custom print options, and the next step into the pharmacy catalog."
        items={faqItems}
      />
    </div>
  )
}
