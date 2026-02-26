'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const STEPS = [
  {
    title: 'Consultation',
    copy:
      'We align on store type, branding goals, packaging format, and reorder cadence so your program is operationally realistic from day one.',
    image: '/catalog/pharmacy/gs/GS-22-FRONT.webp',
  },
  {
    title: 'Design Visualization',
    copy:
      'You receive structured design and sizing guidance for custom dispensary bags, pharmacy packaging bags, and custom retail bags.',
    image: '/catalog/custom/2-color/CBC-22-FC2C.webp',
  },
  {
    title: 'Production',
    copy:
      'Your order moves through a controlled production schedule built for consistency, repeat quality, and dependable turnaround.',
    image: '/catalog/veterinary/vb1/VB1-22-FRONT.webp',
  },
  {
    title: 'Finished Bag Reveal',
    copy:
      'The final result is professional branded paper bags that elevate trust at checkout and create repeat brand visibility after every sale.',
    image: '/catalog/custom/3-color/CBC-22-FC3C.webp',
  },
]

export default function FromIdeaToBagCinematic() {
  const [visibleSteps, setVisibleSteps] = useState<Record<number, boolean>>({})
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-cinematic-step]'))
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.cinematicStep)
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => ({ ...prev, [idx]: true }))
          }
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="section-container py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="kicker">From Idea to Bag</p>
          <h2 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">
            A Structured Process That Feels Cinematic and Controlled
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-8">
        {STEPS.map((step, index) => {
          const isVisible = !!visibleSteps[index]
          const rawParallax = (scrollY * 0.014 + index * 6) * (index % 2 === 0 ? 1 : -1)
          const parallax = Math.max(-16, Math.min(16, rawParallax))
          return (
            <article
              key={step.title}
              data-cinematic-step={index}
              className={`idea-step grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-[1.05fr_1fr] md:p-7 ${
                isVisible ? 'idea-step-visible' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-800">Step {index + 1}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-900">{step.title}</h3>
                <p className="mt-3 text-slate-700">{step.copy}</p>
              </div>
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="idea-media relative h-56 overflow-hidden rounded-xl border border-slate-200 bg-white md:h-64">
                  <div
                    className="idea-media-inner absolute -inset-x-8 -inset-y-14"
                    style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.12)` }}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
