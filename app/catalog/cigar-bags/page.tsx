import type { Metadata } from 'next'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import AddToCartControl from '@/components/cart/AddToCartControl'
import { money } from '@/lib/catalogProducts'
import {
  formatCigarQuantityLabel,
  getAllCigarProducts,
  getCigarStartingPrice,
} from '@/lib/cigarCatalog'

export const metadata: Metadata = {
  title: 'Printed Cigar Bags Catalog',
  description:
    'Shop printed cigar bags and slider cigar bag formats from BagSupplyCo with local images, case pricing, and product detail pages.',
}

function ProductCard({
  sku,
  slug,
  name,
  size,
  quantity,
  unit,
  price,
  image,
}: {
  sku: string
  slug: string
  name: string
  size: string
  quantity: number
  unit: 'case' | 'pack'
  price: number
  image: string
}) {
  const cartItem = {
    id: `cigar:${slug}`,
    kind: 'catalog' as const,
    sku,
    slug,
    name: `${name} ${size}`,
    image,
    productHref: `/catalog/cigar-bags/${slug}`,
    quantity: 1,
    unitPrice: price,
    unit,
    unitLabel: formatCigarQuantityLabel(quantity, unit),
    sizeLabel: size,
  }

  return (
    <article className="surface-card product-card flex h-full flex-col">
      <Link href={`/catalog/cigar-bags/${slug}`} className="relative block aspect-[4/3] bg-[#FAF6F0]">
        <FallbackImage
          src={image}
          fallbackSrc="/images/catalog/placeholder.svg"
          alt={`${name} ${size}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {sku}</p>
        <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">
          <Link href={`/catalog/cigar-bags/${slug}`} className="hover:text-[#B5813A]">
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-[#5F4D33]">{size}</p>
        <p className="mt-1 text-sm text-[#5F4D33]">{formatCigarQuantityLabel(quantity, unit)}</p>
        <p className="mt-2 product-card-price">{money(price)} / {formatCigarQuantityLabel(quantity, unit)}</p>
        <div className="mt-auto pt-4">
          <AddToCartControl item={cartItem} showQuantity={false} />
        </div>
      </div>
    </article>
  )
}

export default function CigarBagsCatalogPage() {
  const products = getAllCigarProducts()
  const startingPrice = getCigarStartingPrice()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Cigar Bags Catalog</p>
          <h1 className="heading-display mt-5">Printed Cigar Bags</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Printed cigar bag sizes and premium slider bag formats for cigar shops, lounges, and specialty tobacconists.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              Starting at {money(startingPrice)}
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              Free shipping on 2+ cases
            </span>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <p className="kicker">Printed Cigar Bags</p>
          <h2 className="section-title mt-4">Stocked sizes for singles, bundles, and premium cigar presentation.</h2>
          <p className="mt-3 max-w-3xl muted-text">
            Start with the size that fits your counter flow, then use the product page to review discount tiers, shipping breaks, and reorder-friendly case pricing.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
            <Link href="/catalog/mylar-bags" className="btn-secondary">Browse Mylar Bags</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
