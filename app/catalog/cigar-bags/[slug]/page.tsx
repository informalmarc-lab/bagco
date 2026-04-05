import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FallbackImage from '@/components/FallbackImage'
import AddToCartControl from '@/components/cart/AddToCartControl'
import StructuredData from '@/components/seo/StructuredData'
import { money } from '@/lib/catalogProducts'
import {
  CIGAR_DISCOUNT_TIERS,
  formatCigarQuantityLabel,
  getAllCigarProducts,
  getCigarProductBySlug,
  getDiscountedCigarPrice,
} from '@/lib/cigarCatalog'
import { getCigarProductAlt } from '@/lib/seo/imageAlt'
import { buildProductJsonLd, buildProductMetadata } from '@/lib/seo/productSeo'

export async function generateStaticParams() {
  return getAllCigarProducts().map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getCigarProductBySlug(slug)
  if (!product) return {}

  return buildProductMetadata({
    name: `${product.name} ${product.size}`,
    description: product.description,
    urlPath: `/catalog/cigar-bags/${product.slug}`,
    imagePath: product.image,
  })
}

export default async function CigarBagProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getCigarProductBySlug(slug)
  if (!product) notFound()

  const cartItem = {
    id: `cigar:${product.slug}`,
    kind: 'catalog' as const,
    sku: product.sku,
    slug: product.slug,
    name: `${product.name} ${product.size}`,
    image: product.image,
    productHref: `/catalog/cigar-bags/${product.slug}`,
    quantity: 1,
    unitPrice: product.price,
    unit: product.unit,
    unitLabel: formatCigarQuantityLabel(product.quantity, product.unit),
    sizeLabel: product.size,
  }
  const jsonLd = buildProductJsonLd({
    name: `${product.name} ${product.size}`,
    imagePath: product.image,
    description: product.description,
    urlPath: `/catalog/cigar-bags/${product.slug}`,
    price: product.price,
  })
  const relatedProducts = getAllCigarProducts()
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3)

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
            <Link href="/catalog/cigar-bags" className="hover:text-[#1E4D2B]">Cigar Bags</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{product.sku}</span>
          </nav>
          <p className="kicker mt-6">Cigar Bag SKU</p>
          <h1 className="heading-display mt-5">{product.name} {product.size}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            {product.size} / {formatCigarQuantityLabel(product.quantity, product.unit)}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartControl item={cartItem} />
            <Link href="/catalog/cigar-bags" className="btn-secondary">
              Back to Cigar Bags
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="surface-card overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] bg-[#FAF6F0]">
              <FallbackImage
                src={product.image}
                fallbackSrc="/images/catalog/placeholder.svg"
                alt={getCigarProductAlt(product)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">Product Specs</h2>
            <div className="mt-5 space-y-2 text-sm text-[#5F4D33]">
              <p><span className="font-semibold text-[#1E4D2B]">SKU:</span> {product.sku}</p>
              <p><span className="font-semibold text-[#1E4D2B]">Size:</span> {product.size}</p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Pack Count:</span>{' '}
                {formatCigarQuantityLabel(product.quantity, product.unit)}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Base Price:</span>{' '}
                {money(product.price)} / {formatCigarQuantityLabel(product.quantity, product.unit)}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-[#B5813A66] bg-[#FAF6F0] px-4 py-4">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Shipping Note</p>
              <p className="mt-2 text-sm font-semibold text-[#1E4D2B]">
                Order 2+ cases and get free shipping. Single case orders ship at calculated rate.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <AddToCartControl item={cartItem} />
              <Link href="/generic-bag-quote" className="btn-secondary">
                Build a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">Discounts & Shipping</p>
          <h2 className="section-title mt-4">Volume pricing kicks in as the reorder grows.</h2>
          <p className="mt-3 max-w-3xl muted-text">
            Every cigar bag SKU follows the same case discount ladder, so you can keep pricing predictable across the full program.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-[#C4935A66] bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#1E4D2B] text-white">
                <tr>
                  <th className="px-3 py-2">Order Size</th>
                  <th className="px-3 py-2">Shipping</th>
                  <th className="px-3 py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {CIGAR_DISCOUNT_TIERS.map((tier, index) => (
                  <tr key={tier.label} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                    <td className="px-3 py-2">
                      <p className="font-semibold text-[#1E4D2B]">{tier.quantityLabel}</p>
                      <p className="text-xs text-[#5F4D33]">
                        {tier.discountPercent > 0 ? `${tier.discountPercent}% off` : 'Full price'}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-[#5F4D33]">
                      {tier.freeShipping ? 'Free shipping' : 'Calculated shipping'}
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-[#B5813A]">
                      {money(getDiscountedCigarPrice(product.price, tier.discountPercent))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-container pt-2">
          <div className="tonal-panel">
            <h2 className="section-title">Related Cigar Bag SKUs</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <article key={item.slug} className="surface-card product-card flex h-full flex-col">
                  <Link href={`/catalog/cigar-bags/${item.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                    <FallbackImage
                      src={item.image}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={getCigarProductAlt(item)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {item.sku}</p>
                    <h3 className="mt-2 text-base font-black text-[#1E4D2B]">
                      <Link href={`/catalog/cigar-bags/${item.slug}`} className="hover:text-[#B5813A]">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-[#5F4D33]">{item.size}</p>
                    <p className="mt-1 product-card-price">{money(item.price)} / {formatCigarQuantityLabel(item.quantity, item.unit)}</p>
                    <div className="mt-auto pt-4">
                      <AddToCartControl
                        item={{
                          id: `cigar:${item.slug}`,
                          kind: 'catalog',
                          sku: item.sku,
                          slug: item.slug,
                          name: `${item.name} ${item.size}`,
                          image: item.image,
                          productHref: `/catalog/cigar-bags/${item.slug}`,
                          quantity: 1,
                          unitPrice: item.price,
                          unit: item.unit,
                          unitLabel: formatCigarQuantityLabel(item.quantity, item.unit),
                          sizeLabel: item.size,
                        }}
                        showQuantity={false}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
