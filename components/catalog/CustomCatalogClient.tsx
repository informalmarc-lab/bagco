'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import FallbackImage from '@/components/FallbackImage'

type CustomImage = { src: string; name: string }

export type CustomCatalogImages = {
  '1-color': CustomImage[]
  '2-color': CustomImage[]
  '3-color': CustomImage[]
}

const CUSTOM_SECTIONS = {
  '1-color': {
    title: 'Full-Custom, 1-Color Bags',
    tagline: 'Value-focused option',
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.80' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$117.40' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case', price: '$133.08' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$102.29' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$112.10' },
      { id: '#12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { id: '#14', dims: '9" x 11"', qty: '2,000 per case', price: '$99.68' },
      { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case', price: '$95.78' },
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
      { id: '#12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { id: '#14', dims: '9" x 11"', qty: '2,000 per case', price: '$99.68' },
      { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case', price: '$95.78' },
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
      { id: '#12', dims: '7" x 10"', qty: '3,000 per case', price: '$144.18' },
      { id: '#14', dims: '9" x 11"', qty: '2,000 per case', price: '$124.61' },
      { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case', price: '$119.71' },
    ],
  },
} as const

type CustomCatalogClientProps = {
  images: CustomCatalogImages
}

export default function CustomCatalogClient({ images }: CustomCatalogClientProps) {
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

  const renderSection = (key: '1-color' | '2-color' | '3-color') => {
    const info = CUSTOM_SECTIONS[key]
    const list = images[key]

    return (
      <section key={key} className="section-container py-20 md:py-24">
        <div className="tonal-panel">
          <p className="kicker">{info.tagline}</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">{info.title}</h2>

          {list.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((img) => (
                <button key={img.src} type="button" onClick={() => setSelected(img)} className="surface-card overflow-hidden rounded-2xl">
                  <div className="relative aspect-square bg-[#FAF6F0]">
                    <FallbackImage
                      src={img.src}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={img.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
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
    <>
      {renderSection('1-color')}
      {renderSection('2-color')}
      {renderSection('3-color')}

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
