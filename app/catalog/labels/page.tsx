import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartControl from '@/components/cart/AddToCartControl'
import { money } from '@/lib/catalogProducts'
import { getAllLabelProducts } from '@/lib/labelCatalog'

export const metadata: Metadata = {
  title: 'Compliance Labels Catalog',
  description:
    'Six dispensary-ready compliance label options with fixed case pricing, free shipping, and direct add-to-cart ordering.',
  alternates: {
    canonical: '/catalog/labels',
  },
}

export default function LabelsCatalogPage() {
  const labels = getAllLabelProducts()

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">
            Back to Catalog
          </Link>
          <p className="kicker mt-6">Compliance Labels</p>
          <h1 className="heading-display mt-5">Dispensary Labels</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Six label formats for dispensary packaging programs, each priced at {money(12)}/case with free shipping.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              {labels.length} label options
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">
              1,000 qty per case
            </span>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1E4D2B]">Free Shipping</span>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="tonal-panel">
          <p className="kicker">Label Catalog</p>
          <h2 className="section-title mt-4">Built for compliant dispensary workflows</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {labels.map((label) => (
              <article key={label.sku} className="surface-card product-card">
                <div className="relative aspect-[4/3] bg-[#FAF6F0]">
                  <Image
                    src={label.image}
                    alt={label.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#7A6548]">SKU {label.sku}</p>
                    <span className="rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#1E4D2B]">
                      {label.shippingBadge}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-black text-[#1E4D2B]">{label.name}</h3>
                  <p className="mt-2 text-sm text-[#5F4D33]">{label.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#5F4D33]">
                    {label.quantity.toLocaleString('en-US')} qty per case
                  </p>
                  <p className="mt-1 product-card-price">{money(label.price)} / case</p>
                  <AddToCartControl
                    className="mt-4"
                    showQuantity={false}
                    item={{
                      id: `label:${label.slug}`,
                      kind: 'label',
                      sku: label.sku,
                      slug: label.slug,
                      name: label.name,
                      image: label.image,
                      productHref: '/catalog/labels',
                      quantity: 1,
                      unitPrice: label.price,
                      unit: 'case',
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
