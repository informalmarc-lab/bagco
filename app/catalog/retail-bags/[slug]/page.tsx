import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FallbackImage from '@/components/FallbackImage'
import StructuredData from '@/components/seo/StructuredData'
import { money } from '@/lib/catalogProducts'
import { buildProductJsonLd, buildProductMetadata } from '@/lib/seo/productSeo'
import { getRetailProductAlt } from '@/lib/seo/imageAlt'
import {
  getAllRetailProducts,
  getDiscountedRetailPrice,
  getRetailProductBySlug,
  RETAIL_DISCOUNT_TIERS,
} from '@/lib/retailCatalog'

export async function generateStaticParams() {
  return getAllRetailProducts().map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getRetailProductBySlug(slug)
  if (!product) return {}

  return buildProductMetadata({
    name: product.name,
    description: product.description,
    urlPath: `/catalog/retail-bags/${product.slug}`,
    imagePath: product.image,
  })
}

export default async function RetailBagProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getRetailProductBySlug(slug)
  if (!product) notFound()

  const jsonLd = buildProductJsonLd({
    name: product.name,
    imagePath: product.image,
    description: product.description,
    urlPath: `/catalog/retail-bags/${product.slug}`,
    price: Math.min(...product.variants.map((variant) => variant.price)),
  })

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
            <Link href="/catalog/retail-bags" className="hover:text-[#1E4D2B]">Retail Bags</Link>
            {' / '}
            <span className="text-[#1E4D2B]">{product.sku}</span>
          </nav>
          <p className="kicker mt-6">Retail SKU</p>
          <h1 className="heading-display mt-5">{product.name}</h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[#7A6548]">
            SKU {product.sku}
          </p>
          <p className="mt-4 max-w-3xl text-lg muted-text">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">
              Build a Quote
            </Link>
            <Link href="/catalog/retail-bags" className="btn-secondary">
              Back to Retail Bags
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="split-panel items-start">
          <div className="grid gap-4">
            <div className="surface-card overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                <FallbackImage
                  src={product.gallery[0]}
                  fallbackSrc="/images/catalog/placeholder.svg"
                  alt={getRetailProductAlt(product)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
            {product.gallery[1] && (
              <div className="surface-card overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                  <FallbackImage
                    src={product.gallery[1]}
                    fallbackSrc="/images/catalog/placeholder.svg"
                    alt={getRetailProductAlt(product, 'alternate view')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="tonal-panel">
            <h2 className="section-title">Case Options</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-[#C4935A66] bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#1E4D2B] text-white">
                  <tr>
                    <th className="px-3 py-2">Variant</th>
                    <th className="px-3 py-2 text-right">Count</th>
                    <th className="px-3 py-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant, index) => (
                    <tr key={variant.slug} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                      <td className="px-3 py-2 font-semibold text-[#1E4D2B]">{variant.label}</td>
                      <td className="px-3 py-2 text-right text-[#5F4D33]">
                        {variant.caseCount.toLocaleString('en-US')}/case
                      </td>
                      <td className="px-3 py-2 text-right font-bold text-[#B5813A]">{money(variant.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-2xl border border-[#B5813A66] bg-[#FAF6F0] px-4 py-4">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">Shipping Note</p>
              <p className="mt-2 text-sm font-semibold text-[#1E4D2B]">{product.shippingNote}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/makeyourquote" className="btn-primary">
                Build a Quote
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <p className="kicker">Discounts & Shipping</p>
          <h2 className="section-title mt-4">Case pricing improves as reorder volume increases.</h2>
          <p className="mt-3 max-w-3xl muted-text">
            The same discount and shipping breaks apply to both sizes, so stores can scale the order without changing the bag style.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-[#C4935A66] bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#1E4D2B] text-white">
                <tr>
                  <th className="px-3 py-2">Order Size</th>
                  <th className="px-3 py-2">Shipping</th>
                  <th className="px-3 py-2 text-right">Large</th>
                  <th className="px-3 py-2 text-right">Small</th>
                </tr>
              </thead>
              <tbody>
                {RETAIL_DISCOUNT_TIERS.map((tier, index) => (
                  <tr key={tier.label} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAF6F0]'}>
                    <td className="px-3 py-2">
                      <p className="font-semibold text-[#1E4D2B]">{tier.casesLabel}</p>
                      <p className="text-xs text-[#5F4D33]">
                        {tier.discountPercent > 0 ? `${tier.discountPercent}% off` : 'Full price'}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-[#5F4D33]">
                      {tier.freeShipping ? 'Free shipping' : 'Calculated shipping'}
                    </td>
                    {product.variants.map((variant) => (
                      <td key={`${tier.label}-${variant.slug}`} className="px-3 py-2 text-right font-bold text-[#B5813A]">
                        {money(getDiscountedRetailPrice(variant.price, tier.discountPercent))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
