'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CustomImage = { src: string; name: string }

const INTRO =
  "Full-custom bags for your company are one click away. Choose one-color, two-color, or three-color printing to match your brand and budget."

const BULLETS = [
  '4 case minimum order',
  'Orders over 10 cases, please call (252) 516-1944',
  'Front, back, and gusset print areas',
  '30-50# machine-finished paper',
  'Pinch-bottom with gusset or flat-bottom styles',
  'Typical 4 week lead time',
  '$50 art/plate fee on initial order and proof changes',
  'Free freight to commercial addresses for 8+ cases',
  'Orders under 8 total cases billed standard UPS rates',
]

const EXPERT_COPY =
  "Our team is ready to review artwork and provide a clear proof process before production."

const CUSTOM_SECTIONS = {
  '1-color': {
    title: 'Full-Custom, 1-Color Bags',
    tagline: 'High-value option',
    bullets: ['Includes custom printing in 1 stock color', ...BULLETS],
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case', price: '$95.56' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case', price: '$95.56' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case', price: '$95.56' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case', price: '$95.56' },
      { id: '#12', dims: '7" x 10"', qty: '3,000 per case', price: '$95.56' },
      { id: '#14', dims: '9" x 11"', qty: '2,000 per case', price: '$95.56' },
      { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case', price: '$95.56' },
    ],
  },
  '2-color': {
    title: 'Full-Custom, 2-Color Bags',
    tagline: 'Most popular option',
    bullets: ['Includes custom printing in 2 stock colors', ...BULLETS],
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
    tagline: 'Premium visual option',
    bullets: ['Includes custom printing in 3 stock colors', ...BULLETS],
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

export default function CustomGallery() {
  const [images, setImages] = useState<{
    '1-color': CustomImage[]
    '2-color': CustomImage[]
    '3-color': CustomImage[]
  }>({
    '1-color': [],
    '2-color': [],
    '3-color': [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<CustomImage | null>(null)

  const handleImageClick = (img: CustomImage) => {
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
    fetch('/api/catalog/custom')
      .then((res) => res.json())
      .then((data) => {
        setImages({
          '1-color': data['1-color'] || [],
          '2-color': data['2-color'] || [],
          '3-color': data['3-color'] || [],
        })
      })
      .catch(() => setImages({ '1-color': [], '2-color': [], '3-color': [] }))
      .finally(() => setLoading(false))
  }, [])

  const renderSection = (key: '1-color' | '2-color' | '3-color') => {
    const info = CUSTOM_SECTIONS[key]
    const list = images[key]

    return (
      <section key={key} className="border-b border-amber-200 py-12 last:border-b-0">
        <div className="section-container">
          <h2 className="heading-serif text-3xl font-black text-slate-900">{info.title}</h2>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-amber-800">{info.tagline}</p>
          <p className="mt-3 text-slate-700">{EXPERT_COPY}</p>

          <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {info.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          {list.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {list.map((img, idx) => (
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

          {info.sizes && (
            <div className="tonal-panel mt-8">
              <h3 className="text-xl font-black text-slate-900">Bag Size / Case Quantity</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {info.sizes.map((s) => (
                  <div key={s.id} className="surface-card rounded-lg p-3 text-sm">
                    <span className="font-black text-slate-900">{s.id}</span>
                    <span className="text-slate-700"> ({s.dims}) {s.qty}</span>
                    <p className="mt-1 font-black text-slate-900">{s.price} per case</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link href="/generic-bag-quote" className="btn-primary">
              Request Custom Quote
            </Link>
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
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">Custom Printed Bags Catalog</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">{INTRO}</p>
        </div>
      </section>

      {loading ? (
        <section className="section-container py-16">
          <p className="text-center text-lg text-slate-600">Loading custom catalog...</p>
        </section>
      ) : (
        <>
          {renderSection('1-color')}
          {renderSection('2-color')}
          {renderSection('3-color')}
        </>
      )}

      <section className="section-container pt-10">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-10">
          <h2 className="heading-serif text-3xl font-black md:text-4xl">
            Modern Bag-Making Capacity with Flexographic Printing
          </h2>
          <p className="mt-3 max-w-4xl text-slate-200">
            We run modern bag-making equipment and full-color flexographic printing to support quality, service, and speed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-md bg-amber-200 px-5 py-3 font-bold text-slate-950 hover:bg-amber-300">
              Email Us for Pricing
            </Link>
            <Link href="/catalog/pharmacy" className="rounded-md border border-white/25 bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20">
              View Pharmacy Catalog
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
