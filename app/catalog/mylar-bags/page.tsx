import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import AddToCartControl from '@/components/cart/AddToCartControl'
import {
  formatMylarQuantityLabel,
  getAllMylarProducts,
  getMylarProductsBySection,
  getMylarStartingPrice,
} from '@/lib/mylarCatalog'
import { money } from '@/lib/catalogProducts'

export const metadata: Metadata = {
  title: 'Mylar Bags Catalog',
  description:
    'Shop Bag Supply Co mylar bag inventory by SKU with local images, pack quantities, transparent pricing, and direct cart ordering.',
  alternates: {
    canonical: '/catalog/mylar-bags',
  },
}

function ProductCard({
  sku,
  slug,
  name,
  finish,
  size,
  quantity,
  price,
  image,
}: {
  sku: string
  slug: string
  name: string
  finish: string
  size: string
  quantity: number
  price: number
  image: string
}) {
  const cartItem = {
    id: `mylar:${slug}`,
    kind: 'mylar' as const,
    sku,
    slug,
    name,
    image,
    productHref: `/catalog/mylar-bags/${slug}`,
    quantity: 1,
    unitPrice: price,
    unit: 'pack' as const,
    unitLabel: formatMylarQuantityLabel(quantity),
  }

  return (
    <article className="surface-card product-card flex h-full flex-col">
      <Link href={`/catalog/mylar-bags/${slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
        <FallbackImage
          src={image}
          fallbackSrc="/images/mylar/placeholder.webp"
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {sku}</p>
        <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">
          <Link href={`/catalog/mylar-bags/${slug}`} className="hover:text-[#B5813A]">
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-[#5F4D33]">{size} / {finish}</p>
        <p className="mt-1 text-sm text-[#5F4D33]">{quantity.toLocaleString('en-US')} qty</p>
        <p className="mt-2 product-card-price">{money(price)} / {formatMylarQuantityLabel(quantity)}</p>
        <div className="mt-auto pt-4">
          <AddToCartControl item={cartItem} showQuantity={false} />
        </div>
      </div>
    </article>
  )
}

export default function MylarCatalogPage() {
  const all = getAllMylarProducts()
  const designer = getMylarProductsBySection('designer-printed')
  const largeStorage = getMylarProductsBySection('large-storage')
  const plain = getMylarProductsBySection('plain-stock')
  const starting = getMylarStartingPrice()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Mylar Catalog</p>
          <h1 className="heading-display mt-5">Mylar Bags</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            {all.length} SKU-level mylar options with local product images, fixed pricing, and direct add-to-cart ordering.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              Starting at {money(starting)}
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              {all.length} SKU pages
            </span>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <p className="kicker">Designer Printed</p>
          <h2 className="section-title mt-4">Designer Printed Mylar (100-1,000 qty)</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {designer.map((item) => (
              <ProductCard key={item.slug} {...item} />
            ))}
          </div>
        </div>
      </section>

      {largeStorage.length > 0 && (
        <section className="section-container pt-2">
          <div className="tonal-panel">
            <p className="kicker">Large Storage</p>
            <h2 className="section-title mt-4">Large Storage Mylar</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {largeStorage.map((item) => (
                <ProductCard key={item.slug} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">Plain Stock</p>
          <h2 className="section-title mt-4">Plain Stock Mylar</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {plain.map((item) => (
              <ProductCard key={item.slug} {...item} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
            <Link href="/contact" className="btn-secondary">Contact Team</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
