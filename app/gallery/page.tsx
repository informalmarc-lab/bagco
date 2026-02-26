'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type GalleryImage = { src: string; folder: string; name: string }

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setImages(data.images || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
        document.body.style.overflow = 'unset'
      }
    }

    if (selectedImage) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onEscape)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', onEscape)
    }
  }, [selectedImage])

  return (
    <div className="pb-16">
      <section className="border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Portfolio Gallery</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">Professional Bag Programs in Production</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Preview quality, style range, and finishing standards across pharmacy, retail, and custom programs.
          </p>
        </div>
      </section>

      <section className="section-container py-14">
        {loading ? (
          <p className="text-center text-lg font-semibold text-slate-600">Loading gallery images...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-lg font-semibold text-slate-600">No gallery images available yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((img, idx) => (
              <button
                key={`${img.src}-${idx}`}
                type="button"
                onClick={() => setSelectedImage(img)}
                className="surface-card group overflow-hidden rounded-xl text-left"
                aria-label={`Open ${img.name}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="border-t border-slate-200/80 px-3 py-2">
                  <p className="truncate text-xs font-bold uppercase tracking-[0.08em] text-slate-600">{img.folder}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="section-container">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-10">
          <h2 className="heading-serif text-3xl font-black md:text-4xl">Need Samples or Program Guidance?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">
            Share your use case and volume target. We will recommend the right catalog and quote path.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-md bg-amber-200 px-6 py-3 font-black text-slate-950 hover:bg-amber-300">
              Contact Us
            </Link>
            <Link href="/generic-bag-quote" className="rounded-md border border-white/30 bg-white/10 px-6 py-3 font-bold text-white hover:bg-white/20">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedImage(null)
            }
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            Close
          </button>
          <div className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-xl border border-white/20 bg-black/40">
            <Image
              src={selectedImage.src}
              alt={selectedImage.name}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  )
}
