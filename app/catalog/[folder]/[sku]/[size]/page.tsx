import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartControl from '@/components/cart/AddToCartControl'
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

  return {
    title: `${product.sku} ${sizeOption.label} | Bag Supply Co`,
    description: `${product.name} ${sizeOption.label} pricing and case details.`,
    alternates: {
      canonical: getCatalogSizePath(product, sizeOption.slug),
    },
  }
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
    image: product.image,
    productHref: getCatalogSizePath(product, selectedSize.slug),
    quantity: 1,
    unitPrice: pricingRows[0].price,
    unit: 'case' as const,
    sizeLabel: selectedSize.label,
  }

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
            <Link href={getCatalogOverviewPath(product)} className="hover:text-[#1E4D2B]">{product.sku}</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{selectedSize.label}</span>
          </nav>
          <p className="kicker mt-6">Size Detail</p>
          <h1 className="heading-display mt-5">{product.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            {product.sku} - {selectedSize.label}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
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
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="surface-card overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] bg-[#FAF6F0]">
              <Image
                src={product.image}
                alt={`${product.name} ${selectedSize.label}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">Pricing for {selectedSize.label}</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-[#C4935A66] bg-white">
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

            <div className="mt-5 space-y-2 text-sm text-[#5F4D33]">
              <p><span className="font-semibold text-[#1E4D2B]">Color Options:</span> {product.colorOptions.join(', ')}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Default Case Count:</span> {product.caseCount}</p>
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
                  <Link key={item.slug} href={getCatalogSizePath(product, item.slug)} className="surface-card rounded-xl px-4 py-3 text-sm font-semibold text-[#1E4D2B] hover:bg-[#FAF6F0]">
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
