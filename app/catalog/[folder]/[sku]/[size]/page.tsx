import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartControl from '@/components/cart/AddToCartControl'
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
  isCatalogProductQuoteOnly,
  money,
} from '@/lib/catalogProducts'
import { getCustomProgramContent } from '@/lib/customCatalogContent'
import { getCustomCatalogImageForSize } from '@/lib/customCatalogImage'
import { getCatalogImageClass } from '@/lib/catalogImagePresentation'
import { getCatalogProductAlt } from '@/lib/seo/imageAlt'
import { buildProductJsonLd, buildProductMetadata } from '@/lib/seo/productSeo'

const ACTIVE_FOLDER_SET = new Set<string>(INDUSTRY_ORDER)

function parseCaseCount(label: string): number | null {
  const match = label.match(/(\d[\d,]*)\s*(?:per case|\/case|qty)\b/i)
  if (!match) return null
  const value = Number(match[1].replace(/,/g, ''))
  return Number.isFinite(value) && value > 0 ? value : null
}

function formatPerBag(price: number, label: string): string {
  const caseCount = parseCaseCount(label)
  if (!caseCount) return '--'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(price / caseCount)
}

export async function generateStaticParams() {
  return getAllCatalogProducts().flatMap((product) =>
    getCatalogProductSizes(product).map((size) => ({
      folder: product.industry,
      sku: getCatalogSkuSlug(product.sku),
      size: size.slug,
    })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folder: string; sku: string; size: string }>
}): Promise<Metadata> {
  const { folder, sku, size } = await params
  if (!ACTIVE_FOLDER_SET.has(folder)) return {}

  const product = getCatalogProductByRoute(folder, sku)
  if (!product) return {}

  const sizeOption = getCatalogProductSizes(product).find((item) => item.slug === size)
  if (!sizeOption) return {}

  return buildProductMetadata({
    name: `${product.name} - ${sizeOption.label}`,
    description: `${product.description} Size: ${sizeOption.label}.`,
    urlPath: getCatalogSizePath(product, sizeOption.slug),
    imagePath: getCustomCatalogImageForSize(product, sizeOption.label),
  })
}

export default async function CatalogSkuSizePage({
  params,
}: {
  params: Promise<{ folder: string; sku: string; size: string }>
}) {
  const { folder, sku, size } = await params
  if (!ACTIVE_FOLDER_SET.has(folder)) notFound()

  const product = getCatalogProductByRoute(folder, sku)
  if (!product) notFound()

  const sizes = getCatalogProductSizes(product)
  const selectedSize = sizes.find((item) => item.slug === size)
  if (!selectedSize) notFound()
  const selectedImage = getCustomCatalogImageForSize(product, selectedSize.label)
  const customContent = product.industry === 'custom' ? getCustomProgramContent(product) : null

  const pricingRows = selectedSize.pricing.length > 0
    ? selectedSize.pricing
    : [{ label: `${selectedSize.label} ${product.caseCount}`, price: product.startingPrice }]
  const industryHref = getIndustryCatalogHref(product.industry)
  const isQuoteOnly = isCatalogProductQuoteOnly(product)
  const cartItem = {
    id: `catalog:${product.sku}:${selectedSize.slug}`,
    kind: 'catalog' as const,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    image: selectedImage,
    productHref: getCatalogSizePath(product, selectedSize.slug),
    quantity: 1,
    unitPrice: pricingRows[0].price,
    unit: 'case' as const,
    sizeLabel: selectedSize.label,
  }
  const jsonLd = buildProductJsonLd({
    name: `${product.name} - ${selectedSize.label}`,
    imagePath: selectedImage,
    description: `${product.description} Size: ${selectedSize.label}.`,
    urlPath: getCatalogSizePath(product, selectedSize.slug),
    price: pricingRows[0].price,
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
            <Link href={getCatalogOverviewPath(product)} className="hover:text-[#1E4D2B]">{product.sku}</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{selectedSize.label}</span>
          </nav>
          <p className="kicker mt-6">Size Detail</p>
          <h1 className="heading-display mt-5">{product.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            {product.sku} - {selectedSize.label}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">
            {customContent ? customContent.shortPitch : product.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {isQuoteOnly ? (
              <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                Get a Quote
              </Link>
            ) : (
              <AddToCartControl item={cartItem} />
            )}
            <Link href={getCatalogOverviewPath(product)} className="btn-secondary">
              Back to {product.sku} Sizes
            </Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-md bg-[rgba(255,255,255,0.62)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Selected Size</p>
              <p className="mt-1 text-lg font-black text-[#1E4D2B]">{selectedSize.label}</p>
            </div>
            <div className="rounded-md bg-[rgba(255,255,255,0.62)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Starting Price</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#1E4D2B]">{money(pricingRows[0].price)}</p>
              <p className="text-sm text-[#5F4D33]">per case</p>
            </div>
            <div className="rounded-md bg-[rgba(255,255,255,0.62)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Per Bag</p>
              <p className="mt-1 text-lg font-black text-[#1E4D2B]">{formatPerBag(pricingRows[0].price, pricingRows[0].label)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="surface-card overflow-hidden rounded-[10px]">
            <div className="relative aspect-[4/3] bg-[#FAF6F0]">
              <Image
                src={selectedImage}
                alt={getCatalogProductAlt(product, selectedSize.label)}
                width={1200}
                height={900}
                className={getCatalogImageClass(product)}
                style={{ width: '100%', height: '100%' }}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">Pricing for {selectedSize.label}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {customContent && (
                <div className="rounded-md border border-[#E7D9C3] bg-white p-4 md:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Best For</p>
                  <p className="mt-2 text-sm leading-6 text-[#1E4D2B]">{customContent.bestFor}</p>
                </div>
              )}
              <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Color Options</p>
                <p className="mt-1 leading-6 text-[#1E4D2B]">{product.colorOptions.join(', ')}</p>
              </div>
              <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Default Case Count</p>
                <p className="mt-1 font-semibold text-[#1E4D2B]">{product.caseCount}</p>
              </div>
            </div>
            {customContent && (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {customContent.rules.slice(0, 4).map((rule) => (
                  <div key={rule} className="rounded-md border border-[#E7D9C3] bg-[#FCF8F2] p-4 text-sm leading-6 text-[#5F4D33]">
                    {rule}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 overflow-x-auto rounded-md border border-[#C4935A66] bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#1E4D2B] text-white">
                  <tr>
                    <th className="px-3 py-2">Variant</th>
                    <th className="px-3 py-2 text-right">Per Case</th>
                    <th className="px-3 py-2 text-right">Per Bag</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row, idx) => (
                    <tr key={`${row.label}-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                      <td className="px-3 py-2 text-[#5F4D33]">{row.label}</td>
                      <td className="px-3 py-2 text-right font-bold text-[#1E4D2B]">{money(row.price)}</td>
                      <td className="px-3 py-2 text-right font-bold text-[#B5813A]">
                        {formatPerBag(row.price, row.label)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {isQuoteOnly ? (
                <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                  Get a Quote
                </Link>
              ) : (
                <AddToCartControl item={cartItem} />
              )}
              <Link href={industryHref} className="btn-secondary">
                View {INDUSTRY_LABELS[product.industry]} Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {sizes.length > 1 && (
        <section className="section-container pt-2">
          <div className="tonal-panel">
            <h2 className="section-title">Other Sizes for {product.sku}</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              {sizes
                .filter((item) => item.slug !== selectedSize.slug)
                .map((item) => (
                  <Link key={item.slug} href={getCatalogSizePath(product, item.slug)} className="surface-card rounded-md px-4 py-4 text-sm font-semibold text-[#1E4D2B] hover:border-[#C4935A] hover:bg-[#FFFCF7]">
                    <p className="font-black">{item.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#7A6548]">View pricing</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
