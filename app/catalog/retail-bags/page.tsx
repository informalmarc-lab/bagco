import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import { money } from '@/lib/catalogProducts'
import { getAllRetailProducts, getRetailStartingPrice } from '@/lib/retailCatalog'

export const metadata: Metadata = {
  title: 'Retail Bags Catalog',
  description:
    'Shop retail checkout bag options from BagSupplyCo with fixed case pricing, shipping breakpoints, and product detail pages.',
}

export default function RetailBagsPage() {
  const products = getAllRetailProducts()
  const startingPrice = getRetailStartingPrice()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Retail Bags</p>
          <h1 className="heading-display mt-5">Retail Checkout Bags</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Stocked checkout bag options for convenience stores, gift shops, and everyday retail counters with clear
            case pricing and shipping breakpoints.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              Starting at {money(startingPrice)} / case
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              Free shipping on 2+ cases
            </span>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="surface-card product-card flex h-full flex-col">
              <Link href={`/catalog/retail-bags/${product.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                <FallbackImage
                  src={product.image}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {product.sku}</p>
                <h2 className="mt-2 text-xl font-black text-[#1E4D2B]">
                  <Link href={`/catalog/retail-bags/${product.slug}`} className="hover:text-[#B5813A]">
                    {product.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-[#5F4D33]">{product.description}</p>
                <div className="mt-3 space-y-1 text-sm text-[#5F4D33]">
                  {product.variants.map((variant) => (
                    <p key={variant.slug}>
                      <span className="font-semibold text-[#1E4D2B]">{variant.label}:</span>{' '}
                      {variant.caseCount.toLocaleString('en-US')}/case at {money(variant.price)}
                    </p>
                  ))}
                </div>
                <p className="mt-2 product-card-price">From {money(Math.min(...product.variants.map((variant) => variant.price)))} / case</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <Link href={`/catalog/retail-bags/${product.slug}`} className="btn-primary">
                    View Product
                  </Link>
                  <Link href="/generic-bag-quote" className="btn-secondary">
                    Build a Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
