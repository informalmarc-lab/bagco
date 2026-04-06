'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type StoryStep = {
  id: string
  phase: string
  title: string
  copy: string
  bullets: string[]
  image: string
}

const STEPS: StoryStep[] = [
  {
    id: 'diagnose',
    phase: '01 Diagnose',
    title: 'We Start With Your Actual Throughput',
    copy:
      'Tell us what moves daily at checkout, and we map case counts and bag sizes to your real-world volume.',
    bullets: [
      'Industry fit and use-case alignment',
      'Bag format and case sizing recommendations',
      'Order rhythm planning for clean replenishment',
    ],
    image: '/catalog/dispensary/ff68982bbb_2321-ds_e56d8aab.jpg',
  },
  {
    id: 'design',
    phase: '02 Design',
    title: 'Branding and Print Decisions Become Simple',
    copy:
      'Stock, 1-color, 2-color, or 3-color options are presented clearly so your team can decide quickly.',
    bullets: [
      'Artwork and print color guidance',
      'Program fit: stock vs custom',
      'Proofing path before production',
    ],
    image: '/catalog/custom/3-color/CBC-22-FC3C.webp',
  },
  {
    id: 'produce',
    phase: '03 Produce',
    title: 'Production Runs on a Structured Timeline',
    copy:
      'Once approved, your bags move through a controlled schedule designed for consistency and repeat quality.',
    bullets: [
      'Clear lead-time communication',
      'Reliable quality checkpoints',
      'Consistent execution across reorders',
    ],
    image: '/catalog/veterinary/vb2/VB2-22-FRONT.webp',
  },
  {
    id: 'replenish',
    phase: '04 Replenish',
    title: 'Reorders Stay Predictable',
    copy:
      'Recurring programs and straightforward billing keep packaging from becoming an operational bottleneck.',
    bullets: [
      'Automated reorder support',
      'Net terms options for clients',
      'Stable supply for multi-location teams',
    ],
    image: '/catalog/usa/fcd8fc3bbc_CBC-MCUS020_854414f5.jpg',
  },
]

export default function AppleStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleEntry) return
        const idx = Number((visibleEntry.target as HTMLElement).dataset.stepIndex)
        if (Number.isFinite(idx)) {
          setActiveIndex(idx)
        }
      },
      {
        threshold: [0.35, 0.5, 0.7],
        rootMargin: '-10% 0px -20% 0px',
      },
    )

    stepRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const activeStep = STEPS[activeIndex] || STEPS[0]

  return (
    <section className="section-container py-20 md:py-24">
      <div className="max-w-3xl">
        <p className="kicker">How It Works</p>
        <h2 className="heading-display mt-4 text-3xl md:text-5xl">A scroll-driven process built for fast understanding.</h2>
        <p className="mt-4 text-lg muted-text">
          As you move through each stage, you see exactly how our packaging programs are set up from consultation to recurring supply.
        </p>
      </div>

      <div className="story-shell mt-10 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="story-track">
          {STEPS.map((step, index) => {
            const isActive = index === activeIndex
            return (
              <article
                key={step.id}
                ref={(node) => {
                  stepRefs.current[index] = node
                }}
                data-step-index={index}
                className={`story-step ${isActive ? 'story-step-active' : ''}`}
              >
                <div className="tonal-panel">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">{step.phase}</p>
                  <h3 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#1E4D2B]">{step.title}</h3>
                  <p className="mt-3 muted-text">{step.copy}</p>
                  <ul className="mt-5 grid gap-2">
                    {step.bullets.map((item) => (
                      <li key={item} className="surface-card rounded-xl px-4 py-3 text-sm font-semibold text-[#5F4D33]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <div className="story-visual">
          <div className="story-media">
            <Image
              src={activeStep.image}
              alt={activeStep.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
              priority
            />
            <div className="story-gradient" />
            <div className="story-caption">
              <p className="text-xs font-black uppercase tracking-[0.11em] text-[#B5813A]">{activeStep.phase}</p>
              <p className="mt-1 text-sm font-semibold text-[#5F4D33]">{activeStep.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/catalog" className="btn-secondary">
                  Browse Catalogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



