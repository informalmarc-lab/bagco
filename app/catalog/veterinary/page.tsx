'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type VetImage = { src: string; name: string }
type VetPayload = { vb1: VetImage[]; vb2: VetImage[]; vb6: VetImage[] }

const VET_DESIGNS = {
  vb1: {
    title: 'VB1 Design',
    description: 'Stock veterinary bag design for common clinic workflows.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.81' },
      { name: 'Flat pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case', price: '$65.91' },
    ],
  },
  vb2: {
    title: 'VB2 Design',
    description: 'Stock veterinary bag design for high-frequency script handoffs.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.81' },
      { name: 'Flat pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case', price: '$65.91' },
    ],
  },
  vb6: {
    title: 'VB6 Design',
    description: 'Stock veterinary bag design with matching case-level options.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.81' },
      { name: 'Flat pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case', price: '$65.91' },
    ],
  },
}

export default function VeterinaryCatalogPage() {
  const [images, setImages] = useState<VetPayload>({ vb1: [], vb2: [], vb6: [] })
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<VetImage | null>(null)

  useEffect(() => {
    fetch('/api/catalog/veterinary')
      .then((res) => res.json())
      .then((data) => setImages(data || { vb1: [], vb2: [], vb6: [] }))
      .catch(() => setImages({ vb1: [], vb2: [], vb6: [] }))
      .finally(() => setLoading(false))
  }, [])

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

  const combinedCustomExamples = [...images.vb1, ...images.vb2, ...images.vb6].filter((img) => {
    const upper = img.name.toUpperCase()
    return !upper.startsWith('VB1-') && !upper.startsWith('VB2-') && !upper.startsWith('VB6-')
  })

  const renderSection = (design: 'vb1' | 'vb2' | 'vb6') => {
    const info = VET_DESIGNS[design]
    const allImages = images[design]
    const stockPrefix = `${design.toUpperCase()}-`
    const stockImages = allImages.filter((img) => img.name.toUpperCase().startsWith(stockPrefix))

    return (
      <section key={design} className="section-container py-10 md:py-14">
        <div className="tonal-panel">
          <h2 className="text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">Veterinary {info.title}</h2>
          <p className="mt-2 muted-text">{info.description}</p>

          {stockImages.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stockImages.map((img) => (
                <button key={img.src} type="button" onClick={() => setSelected(img)} className="surface-card overflow-hidden rounded-2xl">
                  <div className="relative aspect-square bg-[#FAF6F0]">
                    <Image src={img.src} alt={img.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {info.sizes.map((size) => (
              <div key={size.name} className="surface-card rounded-2xl p-4 text-sm">
                <p className="font-black text-[#1E4D2B]">{size.name}</p>
                <p className="mt-1 text-[#5F4D33]">{size.dims}</p>
                <p className="text-[#5F4D33]">{size.qty}</p>
                <p className="mt-2 font-black text-[#1E4D2B]">{size.price} / case</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <Link href="/catalog" className="btn-secondary">Back to Catalog</Link>
          <p className="kicker mt-6">Veterinary Catalog</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Veterinary Bag Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            VB1, VB2, and VB6 designs with stock options and additional custom examples.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="section-container py-12">
          <p className="tonal-panel text-center muted-text">Loading veterinary catalog...</p>
        </section>
      ) : (
        <>
          {renderSection('vb1')}
          {renderSection('vb2')}
          {renderSection('vb6')}

          {combinedCustomExamples.length > 0 && (
            <section className="section-container pb-3">
              <div className="tonal-panel">
                <h2 className="text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">Example Custom Veterinary Bags</h2>
                <p className="mt-2 muted-text">Real custom production samples for veterinary clients.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {combinedCustomExamples.map((img) => (
                    <button key={img.src} type="button" onClick={() => setSelected(img)} className="surface-card overflow-hidden rounded-2xl">
                      <div className="relative aspect-square bg-[#FAF6F0]">
                        <Image src={img.src} alt={img.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="section-container pt-3">
        <div className="tonal-panel">
          <h2 className="section-title">Need custom print instead?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog/custom" className="btn-secondary">Open Custom Catalog</Link>
            <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container pt-3">
        <div className="tonal-panel">
          <h2 className="section-title">Ready to order? Get a quote.</h2>
          <p className="mt-3 muted-text">Build your veterinary case estimate and send it to our team in minutes.</p>
          <Link href="/generic-bag-quote" className="btn-primary mt-5">Get a Quote</Link>
        </div>
      </section>

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
    </div>
  )
}



