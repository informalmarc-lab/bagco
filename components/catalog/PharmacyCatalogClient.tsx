'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { PharmacyCatalogImages, PharmacyImage } from '@/lib/catalogImages'

const PRODUCT_INFO = {
  ty: {
    title: 'Pharmacy Bags - TY Design',
    description: 'Traditional thank-you design for pharmacy operations.',
    sizes: [
      { id: '21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.81' },
      { id: '23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$117.41' },
      { id: '25', dims: '6" x 4" x 11"', qty: '1,000 per case', price: '$65.91' },
      { id: '26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$102.29' },
      { id: '28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$112.10' },
      { id: '12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { id: '14', dims: '9" x 11"', qty: '2,000 per case', price: '$99.69' },
      { id: '15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case', price: '$95.78' },
    ],
  },
  gs: {
    title: 'Pharmacy Bags - GS Design',
    description: 'Stock GS design with common pharmacy bag dimensions.',
    sizes: [
      { id: '21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$119.81' },
      { id: '23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$117.42' },
      { id: '25', dims: '6" x 4" x 11"', qty: '1,000 per case', price: '$65.91' },
      { id: '26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$102.29' },
      { id: '28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$112.10' },
      { id: '12', dims: '7" x 10"', qty: '3,000 per case', price: '$115.35' },
      { id: '14', dims: '9" x 11"', qty: '2,000 per case', price: '$99.69' },
      { id: '15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case', price: '$95.78' },
    ],
  },
  'plastic-gs': {
    title: 'Plastic Pharmacy Bags - GS Design',
    description: 'Plastic GS alternatives for larger or specialty carryout needs.',
    sizes: [
      { id: '32', dims: '9" x 5.5" x 18"', qty: '1,000 per case', price: '$70.84' },
      { id: '35', dims: '12" x 7" x 23"', qty: '1,000 per case', price: '$90.84' },
      { id: '30', dims: '12" x 7" x 25"', qty: '500 per case', price: '$116.03' },
    ],
  },
}

type PharmacyCatalogClientProps = {
  images: PharmacyCatalogImages
}

export default function PharmacyCatalogClient({ images }: PharmacyCatalogClientProps) {
  const [selected, setSelected] = useState<PharmacyImage | null>(null)

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

  const renderSection = (type: 'ty' | 'gs' | 'plastic-gs') => {
    const info = PRODUCT_INFO[type]
    const list = images[type]

    return (
      <section key={type} className="section-container py-20 md:py-24">
        <div className="tonal-panel">
          <h2 className="text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">{info.title}</h2>
          <p className="mt-2 muted-text">{info.description}</p>

          {list.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((img) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setSelected(img)}
                  className="surface-card overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-square bg-[#FAF6F0]">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {info.sizes.map((size) => (
              <div key={size.id} className="surface-card rounded-2xl p-4 text-sm">
                <p className="font-black text-[#1E4D2B]">#{size.id}</p>
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
      {renderSection('ty')}
      {renderSection('gs')}
      {renderSection('plastic-gs')}

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
