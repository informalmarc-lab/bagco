import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCatalogProducts, INDUSTRY_LABELS, money } from '@/lib/catalogProducts'

export const metadata: Metadata = {
  title: 'Paper Bag Product Catalog | Bag Supply Co',
  description:
    'Browse individual paper bag product pages with SKU-level details, sizes, case quantities, and quote-ready pricing.',
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsIndexPage() {
  const products = getAllCatalogProducts()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Product Directory</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">All Product Designs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Browse every catalog design by SKU with pricing anchors and direct quote actions.
          </p>
        </div>
      </section>

      <section className="section-container py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="surface-card overflow-hidden rounded-2xl">
              <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
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
                <p className="mt-1 text-sm text-[#5F4D33]">From {money(product.startingPrice)}/case</p>
                <Link href={`/products/${product.slug}`} className="btn-secondary mt-4">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

