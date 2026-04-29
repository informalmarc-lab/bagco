import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StructuredData from '@/components/seo/StructuredData'
import {
  INDUSTRY_LABELS,
  INDUSTRY_ORDER,
  getAllCatalogProducts,
  getCatalogOverviewPath,
  getCatalogProductByRoute,
  getCatalogProductSizes,
  getCatalogSkuSlug,
  getCatalogSizePath,
  getIndustryCatalogHref,
  getLeadTimeShort,
  isCatalogProductQuoteOnly,
  money,
} from '@/lib/catalogProducts'
import { getCustomProgramContent } from '@/lib/customCatalogContent'
import { getCustomCatalogImageForSize } from '@/lib/customCatalogImage'
import { getCatalogImageClass } from '@/lib/catalogImagePresentation'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import { buildProductJsonLd, buildProductMetadata } from '@/lib/seo/productSeo'

const ACTIVE_FOLDER_SET = new Set<string>(INDUSTRY_ORDER)

export async function generateStaticParams() {
  return getAllCatalogProducts().map((product) => ({
    folder: product.industry,
    sku: getCatalogSkuSlug(product.sku),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folder: string; sku: string }>
}): Promise<Metadata> {
  const { folder, sku } = await params
  if (!ACTIVE_FOLDER_SET.has(folder)) return {}

  const product = getCatalogProductByRoute(folder, sku)
  if (!product) return {}

  return buildProductMetadata({
    name: product.name,
    description: product.description,
    urlPath: getCatalogOverviewPath(product),
    imagePath: product.image,
  })
}

export default async function CatalogSkuOverviewPage({
  params,
}: {
  params: Promise<{ folder: string; sku: string }>
}) {
  const { folder, sku } = await params
  if (!ACTIVE_FOLDER_SET.has(folder)) notFound()

  const product = getCatalogProductByRoute(folder, sku)
  if (!product) notFound()

  const sizes = getCatalogProductSizes(product)
  const industryHref = getIndustryCatalogHref(product.industry)
  const isQuoteOnly = isCatalogProductQuoteOnly(product)
  const customContent = product.industry === 'custom' ? getCustomProgramContent(product) : null
  const jsonLd = buildProductJsonLd({
    name: product.name,
    imagePath: product.image,
    description: product.description,
    urlPath: getCatalogOverviewPath(product),
    price: product.startingPrice,
  })

  return (
    <div className="pb-16">
      <StructuredData data={jsonLd} />
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="text-sm font-semibold text-[#5F4D33]">
            <Link href="/" className="hover:text-[#1E4D2B]">Home</Link>
            {' / '}
            <Link href="/catalog" className="hover:text-[#1E4D2B]">Catalog</Link>
            {' / '}
            <Link href={industryHref} className="hover:text-[#1E4D2B]">{INDUSTRY_LABELS[product.industry]}</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{product.sku}</span>
          </nav>
          <p className="kicker mt-6">SKU Overview</p>
          <h1 className="heading-display mt-5">{product.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            Design Number: {product.sku}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">
            {customContent ? customContent.shortPitch : product.description}
          </p>
          {customContent && (
            <div className="mt-5 max-w-3xl rounded-md border border-[#D8C5A7] bg-white/70 p-4">
              <p className="text-base font-black text-[#1E4D2B]">{customContent.headline}</p>
              <p className="mt-2 text-sm leading-7 text-[#5F4D33]">
                {customContent.printLabel}. Artwork, proofing, and reorder setup all sit inside the same custom program.
              </p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {isQuoteOnly ? (
              <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                Get a Quote
              </Link>
            ) : (
              <Link href="#available-sizes" className="btn-primary">
                Select a Size
              </Link>
            )}
            <Link href={industryHref} className="btn-secondary">
              View {INDUSTRY_LABELS[product.industry]} Catalog
            </Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-md bg-[rgba(255,255,255,0.62)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Starting Price</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#1E4D2B]">{money(product.startingPrice)}</p>
              <p className="text-sm text-[#5F4D33]">per case</p>
            </div>
            <div className="rounded-md bg-[rgba(255,255,255,0.62)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Availability</p>
              <p className="mt-1 text-lg font-black text-[#1E4D2B]">
                {product.availability === 'stock' ? 'In Stock' : 'Custom Print'}
              </p>
              <p className="text-sm text-[#5F4D33]">{getLeadTimeShort(product.availability)}</p>
            </div>
            <div className="rounded-md bg-[rgba(255,255,255,0.62)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Available Sizes</p>
              <p className="mt-1 text-lg font-black text-[#1E4D2B]">{sizes.length}</p>
              <p className="text-sm text-[#5F4D33]">size option{sizes.length === 1 ? '' : 's'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="surface-card overflow-hidden rounded-[10px]">
            <div className="relative aspect-[4/3] bg-[#FAF6F0]">
              <Image
                src={product.image}
                alt={getCatalogProductAlt(product, `SKU ${product.sku}`)}
                width={1200}
                height={900}
                className={getCatalogImageClass(product)}
                style={{ width: '100%', height: '100%' }}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">SKU Specs</h2>
            <div className="mt-5 grid gap-3 text-sm text-[#5F4D33]">
              <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">SKU</p>
                <p className="mt-1 font-semibold text-[#1E4D2B]">{product.sku}</p>
              </div>
              <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Bag Type</p>
                <p className="mt-1 font-semibold leading-6 text-[#1E4D2B]">{product.bagType}</p>
              </div>
              <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Color Options</p>
                <p className="mt-1 leading-6 text-[#1E4D2B]">{product.colorOptions.join(', ')}</p>
              </div>
              <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Lead Time</p>
                <p className="mt-1 font-semibold text-[#1E4D2B]">{getLeadTimeShort(product.availability)}</p>
              </div>
            </div>

            {customContent && (
              <div className="mt-5 grid gap-3">
                <div className="rounded-md border border-[#E7D9C3] bg-[#FCF8F2] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Best For</p>
                  <p className="mt-2 text-sm leading-6 text-[#1E4D2B]">{customContent.bestFor}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {customContent.features.map((feature) => (
                    <div key={feature} className="rounded-md border border-[#E7D9C3] bg-white p-4 text-sm leading-6 text-[#5F4D33]">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {isQuoteOnly ? (
                <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                  Get a Quote
                </Link>
              ) : (
                <Link href="#available-sizes" className="btn-primary">
                  Select a Size
                </Link>
              )}
              <Link href={industryHref} className="btn-secondary">
                Back to {INDUSTRY_LABELS[product.industry]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="available-sizes" className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Available Sizes</h2>
          <p className="mt-3 muted-text">
            Select a size to view exact pricing rows and case details.
          </p>
          {customContent && (
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {customContent.rules.slice(0, 3).map((rule) => (
                <div key={rule} className="rounded-md border border-[#E7D9C3] bg-white p-4 text-sm leading-6 text-[#5F4D33]">
                  {rule}
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sizes.map((size) => {
              const lowest = size.pricing.length > 0
                ? Math.min(...size.pricing.map((row) => row.price))
                : product.startingPrice
              const sizeImage = getCustomCatalogImageForSize(product, size.label)
              return (
                <article key={size.slug} className="surface-card product-card">
                  <Link
                    href={getCatalogSizePath(product, size.slug)}
                    className="relative block aspect-[4/3] bg-[#FAF6F0]"
                  >
                    <Image
                      src={sizeImage}
                      alt={getCatalogProductAlt(product, size.label)}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className={getCatalogImageClass(product)}
                      style={{ width: '100%', height: '100%' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Size Option</p>
                    <h3 className="mt-2 text-base font-black text-[#1E4D2B]">{size.label}</h3>
                    <div className="mt-3 flex items-end justify-between gap-3 rounded-md border border-[#E7D9C3] bg-white p-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Pricing</p>
                        <p className="mt-1 product-card-price">From {money(lowest)}/case</p>
                      </div>
                      <p className="text-sm font-semibold text-[#5F4D33]">{size.pricing.length} row{size.pricing.length === 1 ? '' : 's'}</p>
                    </div>
                    <Link href={getCatalogSizePath(product, size.slug)} className="btn-secondary mt-4">
                      View Size
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
