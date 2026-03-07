'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CustomImage = { src: string; name: string }
type CustomPayload = { '1-color': CustomImage[]; '2-color': CustomImage[]; '3-color': CustomImage[] }

const BASE_RULES = [
  '4 case minimum for selected custom bag type',
  'Art/plate setup fee applies on initial order and proof changes',
  'Typical lead time: around 4 weeks after proof approval',
  '8+ cases qualify for free shipping to commercial addresses',
]

const CUSTOM_SECTIONS = {
  '1-color': {
    title: 'Full-Custom, 1-Color Bags',
    tagline: 'Value-focused option',
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$95.56' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case', price: '$95.56' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$95.56' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$95.56' },
    ],
  },
  '2-color': {
    title: 'Full-Custom, 2-Color Bags',
    tagline: 'Most popular option',
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.80' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$117.39' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case', price: '$133.08' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$102.29' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$112.10' },
    ],
  },
  '3-color': {
    title: 'Full-Custom, 3-Color Bags',
    tagline: 'Highest visual impact',
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$119.46' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$149.76' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$146.76' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case', price: '$166.36' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$127.86' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$140.12' },
    ],
  },
} as const

export default function CustomCatalogPage() {
  const [images, setImages] = useState<CustomPayload>({ '1-color': [], '2-color': [], '3-color': [] })
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<CustomImage | null>(null)

  useEffect(() => {
    fetch('/api/catalog/custom')
      .then((res) => res.json())
      .then((data) => setImages({
        '1-color': data['1-color'] || [],
        '2-color': data['2-color'] || [],
        '3-color': data['3-color'] || [],
      }))
      .catch(() => setImages({ '1-color': [], '2-color': [], '3-color': [] }))
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

  const renderSection = (key: '1-color' | '2-color' | '3-color') => {
    const info = CUSTOM_SECTIONS[key]
    const list = images[key]

    return (
      <section key={key} className="section-container py-10 md:py-14">
        <div className="tonal-panel">
          <p className="kicker">{info.tagline}</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">{info.title}</h2>

          {list.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((img) => (
                <button key={img.src} type="button" onClick={() => setSelected(img)} className="surface-card overflow-hidden rounded-2xl">
                  <div className="relative aspect-square bg-[#FAF6F0]">
                    <Image src={img.src} alt={img.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {info.sizes.map((size) => (
              <div key={size.id} className="surface-card rounded-2xl p-4 text-sm">
                <p className="font-black text-[#1E4D2B]">{size.id}</p>
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
          <p className="kicker mt-6">Custom Catalog</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Custom Printed Bag Programs</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Compare 1-color, 2-color, and 3-color custom print options with case-level pricing.
          </p>
        </div>
      </section>

      <section className="section-container py-10">
        <div className="tonal-panel">
          <h2 className="section-title">Program Rules</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {BASE_RULES.map((rule) => (
              <p key={rule} className="surface-card rounded-2xl p-4 text-sm font-semibold text-[#5F4D33]">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <section className="section-container py-12">
          <p className="tonal-panel text-center muted-text">Loading custom catalog...</p>
        </section>
      ) : (
        <>
          {renderSection('1-color')}
          {renderSection('2-color')}
          {renderSection('3-color')}
        </>
      )}

      <section className="section-container pt-2">
        <div className="tonal-panel">
          <h2 className="section-title">Ready for a structured quote?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
            <Link href="/contact" className="btn-secondary">Contact Team</Link>
          </div>
        </div>
      </section>

      <section className="section-container pt-3">
        <div className="tonal-panel">
          <h2 className="section-title">Ready to order? Get a quote.</h2>
          <p className="mt-3 muted-text">Start with your preferred color count and submit a case-level estimate.</p>
          <Link href="/generic-bag-quote" className="btn-primary mt-5">Build a Quote</Link>
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



