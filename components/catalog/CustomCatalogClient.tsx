'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'
import { getCatalogOverviewPath, getCatalogProductSizes, money, type CatalogProduct } from '@/lib/catalogProducts'
import { getCustomProgramContent } from '@/lib/customCatalogContent'

type CustomImage = { src: string; name: string }

export type CustomCatalogImages = {
  '1-color': CustomImage[]
  '2-color': CustomImage[]
  '3-color': CustomImage[]
}

type CustomCatalogClientProps = {
  images: CustomCatalogImages
  products: CatalogProduct[]
}

function getImageKey(product: CatalogProduct): keyof CustomCatalogImages {
  if (product.image.includes('/1-color/')) return '1-color'
  if (product.image.includes('/2-color/')) return '2-color'
  return '3-color'
}

export default function CustomCatalogClient({ images, products }: CustomCatalogClientProps) {
  const [selected, setSelected] = useState<CustomImage | null>(null)

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }

    if (selected) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onEscape)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', onEscape)
    }
  }, [selected])

  const orderedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        const aRank = a.colorOptions[0] || ''
        const bRank = b.colorOptions[0] || ''
        return aRank.localeCompare(bRank)
      }),
    [products],
  )

  return (
    <>
      {orderedProducts.map((product) => {
        const content = getCustomProgramContent(product)
        const sizeRows = getCatalogProductSizes(product)
        const gallery = images[getImageKey(product)]

        return (
          <section key={product.sku} className="section-container py-12 md:py-16">
            <div className="tonal-panel">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px] xl:items-start">
                <div>
                  <p className="kicker">{product.colorOptions[0]}</p>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">
                    {product.name}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-[#5F4D33]">{content.headline}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#7A6548]">{content.shortPitch}</p>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Best For</p>
                      <p className="mt-2 text-sm leading-6 text-[#1E4D2B]">{content.bestFor}</p>
                    </div>
                    <div className="rounded-md border border-[#E7D9C3] bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Program Snapshot</p>
                      <p className="mt-2 text-sm leading-6 text-[#1E4D2B]">{content.printLabel}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {content.features.map((feature) => (
                      <div key={feature} className="rounded-md bg-[#FCF8F2] p-4 text-sm leading-6 text-[#5F4D33]">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-[#D8C5A7] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">At a Glance</p>
                  <div className="mt-4 grid gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Starting Price</p>
                      <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#1E4D2B]">
                        {money(product.startingPrice)}
                      </p>
                      <p className="text-sm text-[#5F4D33]">per case</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Available Sizes</p>
                      <p className="mt-1 text-lg font-black text-[#1E4D2B]">{sizeRows.length}</p>
                      <p className="text-sm text-[#5F4D33]">size options</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Lead Time</p>
                      <p className="mt-1 text-lg font-black text-[#1E4D2B]">About 4 weeks</p>
                      <p className="text-sm text-[#5F4D33]">after proof approval</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={getCatalogOverviewPath(product)} className="btn-primary">
                      View Program
                    </Link>
                    <Link href="/generic-bag-quote" className="btn-secondary">
                      Start Quote
                    </Link>
                  </div>
                </div>
              </div>

              {gallery.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm font-black text-[#1E4D2B]">Sample Artwork</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {gallery.slice(0, 8).map((img) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setSelected(img)}
                        className="surface-card overflow-hidden rounded-md"
                      >
                        <div className="relative aspect-square bg-[#FAF6F0]">
                          <FallbackImage
                            src={img.src}
                            fallbackSrc="/images/catalog/placeholder.svg"
                            alt={img.name}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[#1E4D2B]">Size Pricing</p>
                    <p className="mt-1 text-sm text-[#5F4D33]">
                      Compare the available bag sizes before moving into proofing and setup.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {sizeRows.map((size) => {
                    const lowest = size.pricing.length > 0
                      ? Math.min(...size.pricing.map((row) => row.price))
                      : product.startingPrice

                    return (
                      <Link
                        key={size.slug}
                        href={`${getCatalogOverviewPath(product)}/${size.slug}`}
                        className="surface-card rounded-md p-4 transition hover:border-[#C4935A] hover:bg-[#FFFCF7]"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">Size Option</p>
                        <p className="mt-2 text-lg font-black text-[#1E4D2B]">{size.label}</p>
                        <div className="mt-3 flex items-end justify-between gap-3 rounded-md border border-[#E7D9C3] bg-white p-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">From</p>
                            <p className="mt-1 font-black text-[#B5813A]">{money(lowest)}/case</p>
                          </div>
                          <p className="text-sm font-semibold text-[#5F4D33]">{size.pricing.length} row{size.pricing.length === 1 ? '' : 's'}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {content.rules.map((rule) => (
                  <div key={rule} className="rounded-md border border-[#E7D9C3] bg-white p-4 text-sm leading-6 text-[#5F4D33]">
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1E4D2B]/85 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null)
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm font-bold text-white"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
          <div className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-black/30">
            <Image src={selected.src} alt={selected.name} fill className="object-contain" sizes="100vw" unoptimized />
          </div>
        </div>
      )}
    </>
  )
}
