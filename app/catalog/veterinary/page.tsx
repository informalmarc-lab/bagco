'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type VetImage = { src: string; name: string }

const VET_DESIGNS = {
  vb1: {
    title: 'Veterinary Bag Design #VB1',
    description: 'Stock veterinary bag design #VB1 in three quantity/size options.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { name: 'Flat pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
    ],
  },
  vb2: {
    title: 'Veterinary Bag Design #VB2',
    description: 'Stock veterinary bag design #VB2 in three quantity/size options.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { name: 'Flat pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
    ],
  },
  vb6: {
    title: 'Veterinary Bag Design #VB6',
    description: 'Stock veterinary bag design #VB6 in three quantity/size options.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { name: 'Flat pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
    ],
  },
}

export default function VeterinaryCatalog() {
  const [images, setImages] = useState<{ vb1: VetImage[]; vb2: VetImage[]; vb6: VetImage[] }>({
    vb1: [],
    vb2: [],
    vb6: [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<VetImage | null>(null)

  const handleImageClick = (img: VetImage) => {
    setSelectedImage(img)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleCloseModal()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
        document.body.style.overflow = 'unset'
      }
    }
    if (selectedImage) window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  useEffect(() => {
    fetch('/api/catalog/veterinary')
      .then((res) => res.json())
      .then((data) => setImages(data || { vb1: [], vb2: [], vb6: [] }))
      .catch(() => setImages({ vb1: [], vb2: [], vb6: [] }))
      .finally(() => setLoading(false))
  }, [])

  const combinedCustomExamples = [...images.vb1, ...images.vb2, ...images.vb6].filter((img) => {
    const upper = img.name.toUpperCase()
    return !upper.startsWith('VB1-') && !upper.startsWith('VB2-') && !upper.startsWith('VB6-')
  })

  const renderSection = (design: 'vb1' | 'vb2' | 'vb6') => {
    const info = VET_DESIGNS[design]
    const list = images[design]
    const stockPrefix = `${design.toUpperCase()}-`
    const stockImages = list.filter((img) => img.name.toUpperCase().startsWith(stockPrefix))

    return (
      <section key={design} className="border-b border-amber-200 py-12 last:border-b-0">
        <div className="section-container">
          <h2 className="heading-serif text-3xl font-black text-slate-900">{info.title}</h2>
          <p className="mt-2 text-slate-700">{info.description}</p>

          {stockImages.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {stockImages.map((img, idx) => (
                <div
                  key={img.src + idx}
                  onClick={() => handleImageClick(img)}
                  className="surface-card cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="tonal-panel mt-8">
            <h3 className="text-xl font-black text-slate-900">Available Sizes</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {info.sizes.map((s) => (
                <div key={s.name} className="surface-card rounded-lg p-3">
                  <p className="font-black text-slate-900">{s.name}</p>
                  <p className="text-sm text-slate-700">{s.dims}</p>
                  <p className="text-sm text-slate-700">{s.qty}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/contact" className="btn-primary">
                Contact Us for Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <Link href="/catalog" className="rounded-md bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-amber-50">
            {'<- Back to Catalog'}
          </Link>
          <p className="kicker mt-6">Catalog</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">Veterinary Bags Catalog</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">Stock programs for VB1, VB2, and VB6 designs.</p>
        </div>
      </section>

      {loading ? (
        <section className="section-container py-16">
          <p className="text-center text-lg text-slate-600">Loading veterinary catalog...</p>
        </section>
      ) : (
        <>
          {renderSection('vb1')}
          {renderSection('vb2')}
          {renderSection('vb6')}
          {combinedCustomExamples.length > 0 && (
            <section className="border-b border-amber-200 py-12">
              <div className="section-container">
                <h2 className="heading-serif text-3xl font-black text-slate-900">Example Custom Bags</h2>
                <p className="mt-2 text-slate-700">Additional real-world custom veterinary bag examples.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {combinedCustomExamples.map((img, idx) => (
                    <div
                      key={img.src + idx}
                      onClick={() => handleImageClick(img)}
                      className="surface-card cursor-pointer overflow-hidden rounded-lg"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={img.src}
                          alt={img.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="section-container pt-10">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-10">
          <h2 className="heading-serif text-3xl font-black md:text-4xl">Need Full-Custom Instead?</h2>
          <p className="mt-3 text-slate-200">Browse one-color, two-color, and three-color custom bag programs.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog/custom" className="rounded-md bg-amber-200 px-5 py-3 font-bold text-slate-950 hover:bg-amber-300">
              Open Custom Catalog
            </Link>
            <Link href="/contact" className="rounded-md border border-white/25 bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20">
              Email Us for Pricing
            </Link>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleBackdropClick}
        >
          <button
            onClick={handleCloseModal}
            className="absolute right-4 top-4 z-10 text-white hover:text-gray-300"
            aria-label="Close"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative flex h-full w-full max-h-full max-w-7xl items-center justify-center">
            <Image
              src={selectedImage.src}
              alt={selectedImage.name}
              width={1200}
              height={1200}
              className="max-h-full max-w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  )
}
