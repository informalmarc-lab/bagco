import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCatalogProducts, getCatalogOverviewPath, INDUSTRY_LABELS, money } from '@/lib/catalogProducts'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const metadata: Metadata = buildMetaWithCanonical({
  title: 'Paper Bag Product Catalog | Bag Supply Co',
  description:
    'Browse individual paper bag product pages with SKU-level details, sizes, case quantities, and quote-ready pricing.',
  path: '/products',
})

export default function ProductsIndexPage() {
  const products = getAllCatalogProducts()
  const bagLines = products.map(
    (product) => `${product.name} | SKU ${product.sku} | ${INDUSTRY_LABELS[product.industry]}`,
  )

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Product Directory</p>
          <h1 className="heading-display mt-5">All Product Designs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Browse every catalog design by SKU with pricing anchors and direct quote actions.
          </p>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="surface-card product-card">
              <Link href={getCatalogOverviewPath(product)} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                <Image
                  src={product.image}
                  alt={`${product.name} bag product image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </Link>
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">
                  {INDUSTRY_LABELS[product.industry]} | SKU {product.sku}
                </p>
                <h2 className="mt-2 text-lg font-black text-[#1E4D2B]">{product.name}</h2>
                <p className="mt-1 product-card-price">From {money(product.startingPrice)}/case</p>
                <Link href={getCatalogOverviewPath(product)} className="btn-secondary mt-4">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <h2 className="section-title text-2xl md:text-3xl">All Bags (Plain Text)</h2>
          <p className="mt-2 text-sm text-[#5F4D33]">
            Copy or download the full list in plain text for quick sharing.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-2xl border border-[#C4935A66] bg-white p-4 text-sm font-mono text-[#1E4D2B]">
              {bagLines.join('\n')}
            </pre>
            <div className="grid content-start gap-3">
              <p className="text-sm text-[#5F4D33]">
                Direct text file link:
              </p>
              <a href="/bags.txt" className="btn-secondary w-fit">
                Download Plain Text
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

