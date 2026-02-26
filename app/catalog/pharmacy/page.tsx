'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type PharmacyImage = { src: string; name: string; type: 'ty' | 'gs' | 'plastic-gs' }

const PRODUCT_INFO = {
  ty: {
    title: 'Pharmacy Bags - TY Design',
    description: 'Full case of TY pharmacy bag designs in multiple quantity/size options.',
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
    description: 'Our classic stock GS pharmacy bag program in multiple quantity/size options.',
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
    title: 'Pharmacy Bags - Plastic GS Design',
    description: 'Plastic GS pharmacy bag options in three quantity/size options.',
    sizes: [
      { id: '32', dims: '9" x 5.5" x 18"', qty: '1,000 per case', price: '$70.84' },
      { id: '35', dims: '12" x 7" x 23"', qty: '1,000 per case', price: '$90.84' },
      { id: '30', dims: '12" x 7" x 25"', qty: '500 per case', price: '$116.03' },
    ],
  },
}

export default function PharmacyCatalog() {
  const [images, setImages] = useState<{ ty: PharmacyImage[]; gs: PharmacyImage[]; 'plastic-gs': PharmacyImage[] }>({
    ty: [],
    gs: [],
    'plastic-gs': [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<PharmacyImage | null>(null)

  const handleImageClick = (img: PharmacyImage) => {
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
    fetch('/api/catalog/pharmacy')
      .then((res) => res.json())
      .then((data) => setImages(data || { ty: [], gs: [], 'plastic-gs': [] }))
      .catch(() => setImages({ ty: [], gs: [], 'plastic-gs': [] }))
      .finally(() => setLoading(false))
  }, [])

  const renderSection = (type: 'ty' | 'gs' | 'plastic-gs') => {
    const info = PRODUCT_INFO[type]
    const typeImages = images[type]

    return (
      <section key={type} className="border-b border-amber-200 py-12 last:border-b-0">
        <div className="section-container">
          <h2 className="heading-serif text-3xl font-black text-slate-900">{info.title}</h2>
          <p className="mt-2 text-slate-700">{info.description}</p>

          {typeImages.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {typeImages.map((img, idx) => (
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
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {info.sizes.map((size) => (
                <div key={size.id} className="surface-card rounded-lg p-3">
                  <p className="font-black text-slate-900">#{size.id}</p>
                  <p className="text-sm text-slate-700">{size.dims}</p>
                  <p className="text-sm text-slate-700">{size.qty}</p>
                  <p className="mt-1 text-sm font-black text-slate-900">{size.price} per case</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/generic-bag-quote" className="btn-primary">
                Request Custom Quote
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
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">Pharmacy Bags Catalog</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">TY design, GS design, and Plastic GS design collections.</p>
        </div>
      </section>

      {loading ? (
        <section className="section-container py-16">
          <p className="text-center text-lg text-slate-600">Loading pharmacy catalog...</p>
        </section>
      ) : (
        <>
          {renderSection('ty')}
          {renderSection('gs')}
          {renderSection('plastic-gs')}
        </>
      )}

      <section className="section-container pt-10">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-10">
          <h2 className="heading-serif text-3xl font-black md:text-4xl">Need a Veterinary Program Instead?</h2>
          <p className="mt-3 text-slate-200">Browse VB1, VB2, and VB6 designs in the veterinary catalog.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog/veterinary" className="rounded-md bg-amber-200 px-5 py-3 font-bold text-slate-950 hover:bg-amber-300">
              Open Veterinary Catalog
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
