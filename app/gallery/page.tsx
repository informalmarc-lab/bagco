'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type GalleryImage = { src: string; folder: string; name: string }

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setImages(data.images || []))
      .catch(() => setImages([]))
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

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Gallery</p>
          <h1 className="heading-display mt-5">Production Gallery</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Browse real bag program imagery across catalog families and custom print work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/makeyourquote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        {loading ? (
          <p className="tonal-panel text-center muted-text">Loading gallery...</p>
        ) : images.length === 0 ? (
          <p className="tonal-panel text-center muted-text">No gallery images are available yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((img, idx) => (
              <button
                key={`${img.src}-${idx}`}
                type="button"
                onClick={() => setSelected(img)}
                className="surface-card overflow-hidden rounded-2xl text-left"
              >
                <div className="relative aspect-square">
                  <Image src={img.src} alt={img.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="border-t border-[#C4935A66] px-3 py-2">
                  <p className="truncate text-xs font-black uppercase tracking-[0.09em] text-[#7A6548]">{img.folder}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="section-container">
        <div className="tonal-panel">
          <h2 className="section-title">Need Help Choosing a Program?</h2>
          <p className="mt-3 muted-text">Share your use case and we&apos;ll route you to the right catalog and quote path.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-secondary">Browse Catalogs</Link>
          </div>
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



