import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import {
  INDUSTRY_LABELS,
  getCatalogProductBySlug,
  getCatalogOverviewPath,
  getCatalogProductsByIndustry,
  getMostOrderedSizesByIndustry,
  getStartingPriceByIndustry,
  money,
  type CatalogProduct,
  type CatalogIndustryKey,
} from '@/lib/catalogProducts'
import { contactTextHref } from '@/components/siteConfig'

type IndustryLandingPageProps = {
  industry: CatalogIndustryKey
  title: string
  description: string
  heroLabel?: string
  deepDiveSection?: {
    title: string
    paragraphs: string[]
  }
  badges?: string[]
  heroCatalogLabel?: string
  bottomCatalogHref?: string
  bottomCatalogLabel?: string
  featuredProductSlugs?: string[]
  mostOrderedSizesOverride?: string[]
  startingPriceOverride?: number
}

export default function IndustryLandingPage({
  industry,
  title,
  description,
  heroLabel = 'Industry Focus',
  deepDiveSection,
  badges = [
    'Transparent Case Pricing',
    'Build a Quote',
    'Generic Same Day (Before 1 PM ET)',
    'Custom 3-4 Weeks',
    'Net 30 Available',
    'Ships Across The US',
  ],
  heroCatalogLabel = `Browse ${INDUSTRY_LABELS[industry]} Catalog`,
  bottomCatalogHref = `/catalog?industry=${industry}`,
  bottomCatalogLabel = `Open ${INDUSTRY_LABELS[industry]} Catalog`,
  featuredProductSlugs,
  mostOrderedSizesOverride,
  startingPriceOverride,
}: IndustryLandingPageProps) {
  const products = featuredProductSlugs?.length
    ? featuredProductSlugs
        .map((slug) => getCatalogProductBySlug(slug))
        .filter((product): product is CatalogProduct => Boolean(product))
    : getCatalogProductsByIndustry(industry)
  const featured = products.slice(0, 6)
  const sizes = mostOrderedSizesOverride || getMostOrderedSizesByIndustry(industry)
  const startingPrice = startingPriceOverride ?? getStartingPriceByIndustry(industry)

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">{heroLabel}</p>
          <h1 className="heading-display mt-5">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">{description}</p>
          <p className="mt-4 text-sm font-semibold text-[#5F4D33]">
            Starting stock pricing from {money(startingPrice)}/case.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.08em] text-[#5F4D33]">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-white px-3 py-1.5">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/catalog?industry=${industry}`} className="btn-secondary">
              {heroCatalogLabel}
            </Link>
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <a href={contactTextHref} className="btn-quiet">
              Text Our Team
            </a>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="tonal-panel">
            <h2 className="section-title">{INDUSTRY_LABELS[industry]} Product Gallery</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((product) => (
                <article key={product.sku} className="surface-card product-card flex h-full flex-col">
                  <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                    <FallbackImage
                      src={product.image}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={`${product.name} product photo`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                    <p className="mt-1 text-sm font-semibold text-[#1E4D2B]">{product.name}</p>
                    <p className="mt-1 product-card-price">From {money(product.startingPrice)}/case</p>
                    <Link href={getCatalogOverviewPath(product)} className="btn-secondary mt-auto pt-3">
                      View Product
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="tonal-panel">
            <h2 className="section-title">Most Ordered Sizes</h2>
            <div className="mt-5 grid gap-2">
              {sizes.map((size) => (
                <p key={size} className="surface-card rounded-xl px-3 py-2 text-sm font-semibold text-[#5F4D33]">
                  {size}
                </p>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#5F4D33]">
              Need a different format? Filter by size and bag type in the main catalog.
            </p>
            <Link href={`/catalog?industry=${industry}`} className="btn-primary mt-5">
              Open Filtered Catalog View
            </Link>
          </aside>
        </div>
      </section>

      {deepDiveSection && (
        <section className="section-container pt-2">
          <div className="tonal-panel">
            <h2 className="section-title">{deepDiveSection.title}</h2>
            <div className="mt-5 grid gap-4">
              {deepDiveSection.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[#5F4D33] md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Ready to Order from This Industry Program?</h2>
          <p className="mt-3 muted-text">
            Browse the most relevant catalog and move straight into case-level quote building.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={bottomCatalogHref} className="btn-secondary">
              {bottomCatalogLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
