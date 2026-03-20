import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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

  const sizes = getCatalogProductSizes(product)

  return {
    title: `${product.name} | ${product.sku} Sizes | Bag Supply Co`,
    description:
      `${product.description} Available sizes: ${sizes.map((size) => size.label).join(', ')}. ` +
      `Starting at ${money(product.startingPrice)} per case.`,
    alternates: {
      canonical: getCatalogOverviewPath(product),
    },
  }
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

  return (
    <div className="pb-16">
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
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
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
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="surface-card overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] bg-[#FAF6F0]">
              <Image
                src={product.image}
                alt={`${product.name} paper bag design ${product.sku}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">SKU Specs</h2>
            <div className="mt-5 space-y-2 text-sm text-[#5F4D33]">
              <p><span className="font-semibold text-[#1E4D2B]">SKU:</span> {product.sku}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Bag Type:</span> {product.bagType}</p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Starting Price:</span>{' '}
                {money(product.startingPrice)} / case
              </p>
              <p><span className="font-semibold text-[#1E4D2B]">Color Options:</span> {product.colorOptions.join(', ')}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Lead Time:</span> {getLeadTimeShort(product.availability)}</p>
            </div>

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
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sizes.map((size) => {
              const lowest = size.pricing.length > 0
                ? Math.min(...size.pricing.map((row) => row.price))
                : product.startingPrice
              return (
                <article key={size.slug} className="surface-card product-card">
                  <Link
                    href={getCatalogSizePath(product, size.slug)}
                    className="relative block aspect-[4/3] bg-[#FAF6F0]"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} ${size.label}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Size</p>
                    <h3 className="mt-2 text-base font-black text-[#1E4D2B]">{size.label}</h3>
                    <p className="mt-1 product-card-price">From {money(lowest)}/case</p>
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
