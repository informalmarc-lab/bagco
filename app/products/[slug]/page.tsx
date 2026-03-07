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
  type CatalogIndustryKey,
} from '@/lib/catalogProducts'

const industryCatalogHref: Record<CatalogIndustryKey, string> = {
  pharmacy: '/catalog/pharmacy',
  veterinary: '/catalog/veterinary',
  dispensary: '/catalog?industry=dispensary',
  'smoke-shop': '/catalog?industry=smoke-shop',
  retail: '/catalog?industry=retail',
  'food-beverage': '/catalog?industry=food-beverage',
}

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
    title: `${product.name} | Design ${product.sku} | Bag Supply Co`,
    description:
      `${product.description} Available sizes: ${product.sizeOptions.join(', ')}. ` +
      `Case quantities: ${product.caseCount}. Price range: from ${money(product.startingPrice)}/case.`,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getCatalogProductBySlug(slug)
  if (!product) notFound()

  const related = getAllCatalogProducts()
    .filter((item) => item.slug !== product.slug && item.industry === product.industry)
    .slice(0, 3)

  const catalogHref = industryCatalogHref[product.industry]

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="text-sm font-semibold text-[#5F4D33]">
            <Link href="/" className="hover:text-[#1E4D2B]">Home</Link>
            {' / '}
            <Link href="/catalog" className="hover:text-[#1E4D2B]">Catalog</Link>
            {' / '}
            <Link href={catalogHref} className="hover:text-[#1E4D2B]">{INDUSTRY_LABELS[product.industry]}</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{product.sku}</span>
          </nav>
          <p className="kicker mt-6">Product Detail</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">{product.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            Design Number: {product.sku}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
        </div>
      </section>

      <section className="section-container py-10">
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
            <h2 className="section-title">Product Specs</h2>
            <div className="mt-5 space-y-2 text-sm text-[#5F4D33]">
              <p>
                <span className="font-semibold text-[#1E4D2B]">Available Sizes:</span>{' '}
                {product.sizeOptions.join(', ')}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Case Quantities:</span> {product.caseCount}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Price Range:</span>{' '}
                From {money(product.startingPrice)}/case (final range depends on size, case volume, and artwork complexity)
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Color Options:</span>{' '}
                {product.colorOptions.join(', ')}
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
              <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                Build a Quote
              </Link>
              <Link href={catalogHref} className="btn-secondary">
                Back to {INDUSTRY_LABELS[product.industry]} Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Related Products</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="surface-card overflow-hidden rounded-2xl">
                <Link href={`/products/${item.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <Image
                    src={item.image}
                    alt={`${item.name} bag product image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {item.sku}</p>
                  <h3 className="mt-2 text-base font-black text-[#1E4D2B]">{item.name}</h3>
                  <p className="mt-1 text-sm text-[#5F4D33]">From {money(item.startingPrice)}/case</p>
                  <Link href={`/products/${item.slug}`} className="btn-secondary mt-4">
                    View Product
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


