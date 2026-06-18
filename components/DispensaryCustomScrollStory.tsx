'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FallbackImage from '@/components/FallbackImage'

export type DispensaryCustomStoryItem = {
  id: string
  eyebrow: string
  title: string
  copy: string
  image: string
  href: string
  price?: string
  meta: string[]
}

type DispensaryCustomScrollStoryProps = {
  items: DispensaryCustomStoryItem[]
}

export default function DispensaryCustomScrollStory({ items }: DispensaryCustomScrollStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])
  const activeItem = items[activeIndex] || items[0]
  const activeProgress = `${((activeIndex + 1) / items.length) * 100}%`

  useEffect(() => {
    if (items.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleEntry) return

        const index = Number((visibleEntry.target as HTMLElement).dataset.storyIndex)
        if (Number.isFinite(index)) setActiveIndex(index)
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: '-14% 0px -24% 0px',
      },
    )

    stepRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [items.length])

  if (!activeItem) return null

  return (
    <section className="section-container py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="lg:py-12">
          <h2 className="section-title">The custom bag changes as the program gets clearer.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Start simple, add print impact when it matters, then lock the proof and reorder from the same paper bag
            setup.
          </p>
        </div>

        <div className="hidden items-end justify-end lg:flex">
          <div className="w-full max-w-sm border-t border-kraft-300/60 pt-4">
            <p className="text-sm font-black text-brand-600">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <div className="mt-3 h-1 bg-kraft-300/30">
              <div className="h-full bg-accent-500 transition-[width] duration-300" style={{ width: activeProgress }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="grid gap-14 lg:gap-24">
          {items.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <article
                key={item.id}
                ref={(node) => {
                  stepRefs.current[index] = node
                }}
                data-story-index={index}
                className="flex min-h-[58vh] items-center lg:min-h-[72vh]"
              >
                <div
                  className={`w-full border-l-2 px-5 py-4 transition-colors duration-200 ${
                    isActive ? 'border-accent-500 bg-white' : 'border-kraft-300/60 bg-transparent'
                  }`}
                >
                  <p className="text-sm font-black text-accent-500">{item.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.01em] text-brand-600 md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted">{item.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.meta.map((meta) => (
                      <span
                        key={meta}
                        className="rounded-xl border border-kraft-300/40 bg-[#FFFDF8] px-3 py-2 text-sm font-semibold text-muted"
                      >
                        {meta}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl border border-kraft-300/40 bg-cream lg:hidden">
                    <FallbackImage
                      src={item.image}
                      fallbackSrc="/images/catalog/placeholder.svg"
                      alt={item.title}
                      fill
                      className="object-contain p-4"
                      sizes="100vw"
                    />
                  </div>
                  <Link href={item.href} className="btn-secondary mt-6">
                    View Option
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] lg:self-start">
          <div className="surface-card overflow-hidden rounded-2xl bg-white">
            <div className="h-1 bg-kraft-300/30">
              <div className="h-full bg-accent-500 transition-[width] duration-300" style={{ width: activeProgress }} />
            </div>
            <div className="relative h-[min(58vh,560px)] bg-cream">
              <FallbackImage
                key={activeItem.id}
                src={activeItem.image}
                fallbackSrc="/images/catalog/placeholder.svg"
                alt={activeItem.title}
                fill
                className="object-contain p-8 transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 54vw"
              />
            </div>
            <div className="border-t border-kraft-300/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase text-accent-600">{activeItem.eyebrow}</p>
                  <p className="mt-1 font-serif text-xl leading-6 text-brand-600">{activeItem.title}</p>
                </div>
                {activeItem.price && <p className="product-card-price">{activeItem.price}</p>}
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{activeItem.copy}</p>
            </div>
            <div className="grid border-t border-kraft-300/40 sm:grid-cols-4">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index)
                    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className={`border-t border-kraft-300/40 px-3 py-3 text-left text-xs font-black text-brand-600 sm:border-l sm:border-t-0 sm:first:border-l-0 ${
                    index === activeIndex ? 'bg-cream' : 'bg-white hover:bg-[#FFFDF8]'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
