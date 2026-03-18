import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  INDUSTRY_LABELS,
  getAllCatalogProducts,
  getCatalogProductBySlug,
  getLeadTimeShort,
  money,
} from '@/lib/catalogProducts'

export async function generateStaticParams() {
  return getAllCatalogProducts().map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getCatalogProductBySlug(slug)
  if (!product) return {}

  return {
    title: `${product.name} | ${product.sku}`,
    description: `${product.description} ${product.caseCount}. Starting at ${money(product.startingPrice)} per case.`,
  }
}

export default async function CatalogProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getCatalogProductBySlug(slug)
  if (!product) notFound()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">
            Back to Catalog
          </Link>
          <p className="kicker mt-6">Product Detail</p>
          <h1 className="heading-display mt-5">{product.name}</h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">SKU {product.sku}</p>
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="surface-card overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] bg-[#FAF6F0]">
              <Image
                src={product.image}
                alt={`${product.name} product photo`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="tonal-panel">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.08em] ${product.availability === 'stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}
              >
                {product.availability === 'stock' ? 'Stock' : 'Custom Print'}
              </span>
              {product.collections.includes('usa-made') && (
                <span className="rounded-full bg-[#B5813A22] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">
                  USA-Made
                </span>
              )}
              {product.collections.includes('seasonal') && (
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-rose-800">
                  Seasonal
                </span>
              )}
            </div>

            <div className="mt-5 space-y-2 text-sm text-[#5F4D33]">
              <p>
                <span className="font-semibold text-[#1E4D2B]">Industry:</span> {INDUSTRY_LABELS[product.industry]}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Bag Type:</span> {product.bagType}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Size Options:</span> {product.sizeOptions.join(', ')}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Case Count:</span> {product.caseCount}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Color Options:</span> {product.colorOptions.join(', ')}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Starting Price:</span> {money(product.startingPrice)}/case
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Lead Time:</span>{' '}
                {getLeadTimeShort(product.availability)}
              </p>
            </div>

            {product.sizePricing && product.sizePricing.length > 0 && (
              <div className="mt-6">
                <h3 className="text-base font-black uppercase tracking-[0.08em] text-[#1E4D2B]">
                  Size + Price Breakdown
                </h3>
                <div className="mt-3 overflow-x-auto rounded-xl border border-[#C4935A66] bg-white">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#1E4D2B] text-white">
                      <tr>
                        <th className="px-3 py-2">Bag Type / Size</th>
                        <th className="px-3 py-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizePricing.map((row, idx) => (
                        <tr key={`${row.label}-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                          <td className="px-3 py-2 text-[#5F4D33]">{row.label}</td>
                          <td className="px-3 py-2 text-right font-bold text-[#1E4D2B]">{money(row.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {product.availability === 'stock' ? (
                <Link href={`/contact?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                  Order Now
                </Link>
              ) : (
                <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                  Build a Quote
                </Link>
              )}
              <Link href={`/catalog?industry=${encodeURIComponent(product.industry)}`} className="btn-secondary">
                More {INDUSTRY_LABELS[product.industry]} Products
              </Link>
              <Link href={`/products/${product.slug}`} className="btn-secondary">
                Open Full Product Page
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}



