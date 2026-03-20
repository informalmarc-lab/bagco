import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FallbackImage from '@/components/FallbackImage'
import AddToCartControl from '@/components/cart/AddToCartControl'
import { money } from '@/lib/catalogProducts'
import {
  formatMylarQuantityLabel,
  getAllMylarProducts,
  getMylarProductBySlug,
  isLargeStorageMylar,
} from '@/lib/mylarCatalog'
import { buildProductJsonLd, buildProductMetadata } from '@/lib/seo/productSeo'

export async function generateStaticParams() {
  return getAllMylarProducts().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getMylarProductBySlug(slug)
  if (!product) return {}

  return buildProductMetadata({
    name: product.name,
    description: product.description,
    urlPath: `/catalog/mylar-bags/${product.slug}`,
    imagePath: product.image,
  })
}

export default async function MylarProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getMylarProductBySlug(slug)
  if (!product) notFound()

  const productIsLargeStorage = isLargeStorageMylar(product)
  const related = getAllMylarProducts()
    .filter((item) => {
      if (item.slug === product.slug) return false
      if (productIsLargeStorage) return isLargeStorageMylar(item)
      return item.type === product.type && !isLargeStorageMylar(item)
    })
    .slice(0, 3)
  const cartItem = {
    id: `mylar:${product.slug}`,
    kind: 'mylar' as const,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    image: product.image,
    productHref: `/catalog/mylar-bags/${product.slug}`,
    quantity: 1,
    unitPrice: product.price,
    unit: 'pack' as const,
    unitLabel: formatMylarQuantityLabel(product.quantity),
  }
  const jsonLd = buildProductJsonLd({
    name: product.name,
    imagePath: product.image,
    description: product.description,
    urlPath: `/catalog/mylar-bags/${product.slug}`,
    price: product.price,
  })

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-hero">
        <div className="page-hero-inner">
          <nav className="text-sm font-semibold text-[#5F4D33]">
            <Link href="/" className="hover:text-[#1E4D2B]">Home</Link>
            {' / '}
            <Link href="/catalog" className="hover:text-[#1E4D2B]">Catalog</Link>
            {' / '}
            <Link href="/catalog/mylar-bags" className="hover:text-[#1E4D2B]">Mylar Bags</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{product.sku}</span>
          </nav>
          <p className="kicker mt-6">Mylar SKU</p>
          <h1 className="heading-display mt-5">{product.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            {productIsLargeStorage ? 'Large Storage' : product.type === 'designer-printed' ? 'Designer Printed' : 'Plain Stock'}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartControl item={cartItem} />
            <Link href="/catalog/mylar-bags" className="btn-secondary">
              Back to Mylar Catalog
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
                fallbackSrc="/images/mylar/placeholder.webp"
                alt={`${product.name} mylar bag`}
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
              <p><span className="font-semibold text-[#1E4D2B]">Finish:</span> {product.finish}</p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Pack Quantity:</span>{' '}
                {formatMylarQuantityLabel(product.quantity)}
              </p>
              <p>
                <span className="font-semibold text-[#1E4D2B]">Price:</span> {money(product.price)} / {formatMylarQuantityLabel(product.quantity)}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <AddToCartControl item={cartItem} />
              <Link href="/catalog/mylar-bags" className="btn-secondary">
                View All Mylar SKUs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Related Mylar SKUs</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="surface-card product-card flex h-full flex-col">
                <Link href={`/catalog/mylar-bags/${item.slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={item.image}
                    fallbackSrc="/images/mylar/placeholder.webp"
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {item.sku}</p>
                  <h3 className="mt-2 text-base font-black text-[#1E4D2B]">
                    <Link href={`/catalog/mylar-bags/${item.slug}`} className="hover:text-[#B5813A]">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="mt-1 product-card-price">{money(item.price)} / {formatMylarQuantityLabel(item.quantity)}</p>
                  <div className="mt-auto pt-4">
                    <AddToCartControl
                      item={{
                        id: `mylar:${item.slug}`,
                        kind: 'mylar',
                        sku: item.sku,
                        slug: item.slug,
                        name: item.name,
                        image: item.image,
                        productHref: `/catalog/mylar-bags/${item.slug}`,
                        quantity: 1,
                        unitPrice: item.price,
                        unit: 'pack',
                        unitLabel: formatMylarQuantityLabel(item.quantity),
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
    </div>
  )
}
