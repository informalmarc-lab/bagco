'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type CatalogImage = { src: string }

const coreCatalogs = [
  {
    title: 'Pharmacy Catalog',
    href: '/catalog/pharmacy',
    description: 'GS, TY, and Plastic GS programs with case-level sizing.',
  },
  {
    title: 'Veterinary Catalog',
    href: '/catalog/veterinary',
    description: 'VB1, VB2, and VB6 programs for clinic workflows.',
  },
  {
    title: 'Custom Print Catalog',
    href: '/catalog/custom',
    description: '1-color, 2-color, and 3-color custom print options.',
  },
]

const specialtyCollections = [
  { name: 'Dispensary Bags', slug: 'dispensary' },
  { name: 'Faith & Religious', slug: 'faith' },
  { name: 'Holiday', slug: 'holiday' },
  { name: 'Bakery', slug: 'bakery' },
  { name: 'College & University', slug: 'college' },
  { name: 'Dispensary Store', slug: 'magazine-comics' },
  { name: 'Mini Cases', slug: 'minicases' },
  { name: 'Pride', slug: 'pride' },
  { name: 'Seasonal', slug: 'seasonal' },
  { name: 'USA', slug: 'usa' },
  { name: 'Winery', slug: 'winery' },
]

export default function CatalogPage() {
  const [heroImages, setHeroImages] = useState<string[]>(['', '', ''])

  useEffect(() => {
    fetch('/api/catalog/custom')
      .then((res) => res.json())
      .then((data) => {
        const pickRandom = (arr: CatalogImage[]) => {
          if (!Array.isArray(arr) || arr.length === 0) return ''
          return arr[Math.floor(Math.random() * arr.length)]?.src || ''
        }

        setHeroImages([
          pickRandom(data['1-color'] || []),
          pickRandom(data['2-color'] || []),
          pickRandom(data['3-color'] || []),
        ])
      })
      .catch(() => setHeroImages(['', '', '']))
  }, [])

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Catalog Hub</p>
          <h1 className="heading-display mt-5 text-4xl md:text-6xl">Find the Right Bag Program Fast</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Start with pharmacy, veterinary, or custom print catalogs. Then move into specialty collections as needed.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalog/pharmacy" className="btn-secondary">Pharmacy</Link>
            <Link href="/catalog/veterinary" className="btn-secondary">Veterinary</Link>
            <Link href="/catalog/custom" className="btn-secondary">Custom Print</Link>
            <Link href="/generic-bag-quote" className="btn-primary">Build Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-12">
        <h2 className="section-title">Core Catalogs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {coreCatalogs.map((catalog) => (
            <Link key={catalog.href} href={catalog.href} className="tonal-panel hover:translate-y-[-2px] transition-transform">
              <h3 className="text-2xl font-black text-slate-950">{catalog.title}</h3>
              <p className="mt-2 text-sm muted-text">{catalog.description}</p>
              <p className="mt-5 text-sm font-black uppercase tracking-[0.08em] text-blue-700">Open Catalog</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container pb-4">
        <h2 className="section-title">Custom Print Examples</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['1 Color', '2 Color', '3 Color'].map((label, idx) => (
            <article key={label} className="tonal-panel overflow-hidden">
              <div className="relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                {heroImages[idx] ? (
                  <Image
                    src={heroImages[idx]}
                    alt={`${label} custom bag`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-xl font-black text-slate-950">{label} Program</h3>
              <p className="mt-2 text-sm muted-text">Case-level custom bag options with repeatable print quality.</p>
              <Link href="/catalog/custom" className="btn-primary mt-5 w-full justify-center">View Custom Catalog</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container pt-10">
        <h2 className="section-title">Specialty Collections</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {specialtyCollections.map((item) => (
            <Link
              key={item.slug}
              href={`/catalog/${item.slug}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link href="/catalog/legacy" className="btn-secondary mt-6">Open Full Legacy Directory</Link>
      </section>
    </div>
  )
}

