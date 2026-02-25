'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const collections = [
  { name: 'Dispensary Bags', slug: 'dispensary' },
  { name: 'Faith & Religious Bags', slug: 'faith' },
  { name: 'Pride Bags', slug: 'pride' },
  { name: 'Holiday Bags', slug: 'holiday' },
  { name: 'Bakery Bags', slug: 'bakery' },
  { name: 'College & University Bags', slug: 'college' },
  { name: 'Dispensary Store Bags', slug: 'magazine-comics' },
  { name: 'Mini Cases', slug: 'minicases' },
  { name: 'Seasonal Bags', slug: 'seasonal' },
  { name: 'USA Bags', slug: 'usa' },
  { name: 'Winery Bags', slug: 'winery' },
]

const customProducts = [
  { id: 1, name: 'Full-Custom, 1-Color Bags', price: '95.56' },
  { id: 2, name: 'Full-Custom, 2-Color Bags', price: '95.56' },
  { id: 3, name: 'Full-Custom, 3-Color Bags', price: '119.46' },
]

const coreCatalogs = [
  {
    title: 'Pharmacy Catalog',
    href: '/catalog/pharmacy',
    description: 'GS, Thank You, and Plastic GS programs with pricing tables and images.',
  },
  {
    title: 'Veterinary Catalog',
    href: '/catalog/veterinary',
    description: 'VB1, VB2, and VB6 designs with matching styles and case details.',
  },
  {
    title: 'Custom 1/2/3 Color Catalog',
    href: '/catalog/custom',
    description: 'Full-custom printing programs organized by one, two, and three colors.',
  },
]

export default function Catalog() {
  const [randomImages, setRandomImages] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/catalog/custom?' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const selected: string[] = []

        const oneColorImages = (data['1-color'] || []).map((img: { src: string }) => img.src)
        selected.push(oneColorImages.length > 0 ? oneColorImages[Math.floor(Math.random() * oneColorImages.length)] : '')

        const twoColorImages = (data['2-color'] || []).map((img: { src: string }) => img.src)
        selected.push(twoColorImages.length > 0 ? twoColorImages[Math.floor(Math.random() * twoColorImages.length)] : '')

        const threeColorImages = (data['3-color'] || []).map((img: { src: string }) => img.src)
        selected.push(threeColorImages.length > 0 ? threeColorImages[Math.floor(Math.random() * threeColorImages.length)] : '')

        setRandomImages(selected)
      })
      .catch(() => setRandomImages(['', '', '']))
  }, [])

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-amber-200 bg-[linear-gradient(120deg,#fffdf8_0%,#f5e8d3_55%,#e8d6ba_100%)]">
        <div className="section-container py-14 md:py-20">
          <p className="kicker">Browse Designs</p>
          <h1 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-6xl">Catalog</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Pharmacy, veterinary, and full-custom paper bag catalogs in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog/pharmacy" className="btn-secondary">Pharmacy Catalog</Link>
            <Link href="/catalog/veterinary" className="btn-secondary">Veterinary Catalog</Link>
            <Link href="/catalog/custom" className="btn-secondary">Custom 1/2/3 Color</Link>
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-14">
        <h2 className="section-title heading-serif">Core Catalogs</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Start here for pharmacy, veterinary, and custom print programs.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {coreCatalogs.map((catalog) => (
            <Link
              key={catalog.href}
              href={catalog.href}
              className="surface-card rounded-xl p-5 hover:shadow-md"
            >
              <h3 className="text-lg font-black text-slate-900">{catalog.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{catalog.description}</p>
              <p className="mt-4 text-sm font-bold underline">Open catalog</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container py-10 md:py-14">
        <h2 className="section-title heading-serif">Custom Printed Bags</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Browse examples of one-color, two-color, and three-color custom programs with matching catalog details.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {customProducts.map((product, index) => {
            const productImage = randomImages[index] || null
            return (
              <div key={product.id} className="surface-card overflow-hidden rounded-2xl">
                <div className="relative h-56 bg-slate-100">
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-slate-900">{product.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-700">From ${product.price} USD</p>
                  <Link href="/catalog/custom" className="btn-primary mt-5 w-full">
                    View Custom Catalog
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section-container pt-8">
        <h2 className="section-title heading-serif">Specialty Collections</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Additional themed and seasonal bag collections.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {collections.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog/${c.slug}`}
              className="rounded-md border border-slate-900/20 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-amber-50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container pt-10">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-8 text-white md:p-10">
          <h2 className="heading-serif text-3xl font-black md:text-4xl">Need Help Choosing a Catalog?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">
            Tell us your industry, size, and quantity target and we will point you to the right bag program.
          </p>
          <Link href="/contact" className="mt-6 inline-flex rounded-md bg-amber-200 px-6 py-3 font-black text-slate-950 hover:bg-amber-300">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
