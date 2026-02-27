'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

type IndustryPanel = {
  id: string
  title: string
  subtitle: string
  examples: string
  why: string[]
  problems: string[]
  benefits: string[]
  catalogs: { label: string; href: string }[]
}

const INDUSTRIES: IndustryPanel[] = [
  {
    id: 'retail-boutiques',
    title: 'Retail & Boutiques',
    subtitle: 'Professional bag programs for style-driven storefronts',
    examples: 'Clothing stores, shoe shops, jewelry stores, gift shops',
    why: [
      'Higher-end retailers need sturdy, well-designed bags that match premium merchandise.',
      'Consistent bag quality keeps presentation uniform across peak days and seasonal traffic.',
      'Branded bags turn every customer exit into repeat local brand visibility.',
    ],
    problems: [
      'Low-grade bags tear or lose shape, hurting customer experience.',
      'Inconsistent reorders create stock pressure at checkout.',
      'Generic packaging weakens premium store positioning.',
    ],
    benefits: [
      'Stronger brand recognition after each sale.',
      'Cleaner checkout presentation that supports higher perceived value.',
      'More predictable operations with structured reorder cycles.',
    ],
    catalogs: [
      { label: 'Custom 1/2/3 Color', href: '/catalog/custom' },
      { label: 'USA Catalog', href: '/catalog/usa' },
      { label: 'Seasonal Catalog', href: '/catalog/seasonal' },
    ],
  },
  {
    id: 'events-hospitality',
    title: 'Events & Hospitality',
    subtitle: 'Elegant packaging for hosted experiences and client-facing events',
    examples: 'Wedding planners, party supply companies, corporate events, hotels, resorts',
    why: [
      'Event packaging must look polished and consistent across every guest touchpoint.',
      'Timeline-sensitive production keeps event schedules on track.',
      'Brand-matched bags reinforce premium service quality.',
    ],
    problems: [
      'Late or inconsistent packaging creates day-of execution risk.',
      'Unprofessional presentation weakens guest perception.',
      'Mismatch between event branding and bag design causes visual inconsistency.',
    ],
    benefits: [
      'Premium feel for guest gifting, welcome kits, and sponsor distribution.',
      'Stronger brand cohesion for planners, venues, and hosted events.',
      'Reliable order planning for one-time and recurring event programs.',
    ],
    catalogs: [
      { label: 'Winery Catalog', href: '/catalog/winery' },
      { label: 'Holiday Catalog', href: '/catalog/holiday' },
      { label: 'Custom 1/2/3 Color', href: '/catalog/custom' },
    ],
  },
  {
    id: 'food-beverage',
    title: 'Food & Beverage',
    subtitle: 'Durable carry-out programs for fast-moving service environments',
    examples: 'Cafes, bakeries, donut shops, specialty grocery, fast food, small restaurants',
    why: [
      'Food operations need consistent supply and dependable bag quality under daily volume.',
      'Branded carry-out packaging supports repeat recognition in local neighborhoods.',
      'Structured inventory planning prevents service interruptions.',
    ],
    problems: [
      'Weak bags fail in carry-out and delivery use.',
      'Supply gaps disrupt checkout and takeout flow.',
      'Generic bags miss a major branding opportunity for repeat traffic.',
    ],
    benefits: [
      'Free advertising through every takeout and delivery handoff.',
      'Smoother operations with planned replenishment.',
      'More professional presentation that supports customer trust.',
    ],
    catalogs: [
      { label: 'Bakery Catalog', href: '/catalog/bakery' },
      { label: 'Custom 1/2/3 Color', href: '/catalog/custom' },
      { label: 'USA Catalog', href: '/catalog/usa' },
    ],
  },
]

function Icon({ id }: { id: string }) {
  if (id === 'events-hospitality') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 4v16M4 12h16" />
        <path d="M7 7h10v10H7z" />
      </svg>
    )
  }
  if (id === 'food-beverage') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 4v6M10 4v6M8.5 10v10" />
        <path d="M16 4c1.7 1.7 1.7 4.3 0 6v10" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

export default function IndustrySolutionsSection() {
  const [activeId, setActiveId] = useState(INDUSTRIES[0].id)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const active = useMemo(
    () => INDUSTRIES.find((industry) => industry.id === activeId) || INDUSTRIES[0],
    [activeId],
  )

  return (
    <section id="industry-solutions" className="section-container py-14 md:py-20">
      <p className="kicker">Industry Solutions</p>
      <h2 className="heading-serif mt-5 text-4xl font-black text-slate-900 md:text-5xl">
        Packaging Programs by Business Type
      </h2>
      <p className="mt-4 max-w-3xl text-lg text-slate-700">
        Select an industry to see why teams choose Bag Supply Co, what problems we solve, and how packaging improves business outcomes.
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {INDUSTRIES.map((industry) => {
          const isActive = industry.id === activeId
          return (
            <button
              key={industry.id}
              type="button"
              onClick={() => {
                setActiveId(industry.id)
                window.setTimeout(() => {
                  panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }, 120)
              }}
              className={`surface-card rounded-xl p-5 text-left transition-all duration-300 ${
                isActive
                  ? 'border-slate-900/30 shadow-[0_16px_35px_rgba(15,23,42,0.14)]'
                  : 'hover:-translate-y-0.5 hover:border-slate-900/25 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]'
              }`}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-amber-100">
                <Icon id={industry.id} />
              </div>
              <h3 className="mt-4 text-xl font-black text-slate-900">{industry.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{industry.subtitle}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.09em] text-amber-800">
                {isActive ? 'Selected' : 'Click to expand'}
              </p>
            </button>
          )
        })}
      </div>

      <div
        ref={panelRef}
        className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.1)] md:p-8"
      >
        <div key={active.id} className="industry-panel reveal-up">
          <div className="flex flex-wrap items-center gap-3">
            <p className="kicker m-0">{active.title}</p>
            <p className="text-sm font-semibold text-slate-600">{active.examples}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.08em] text-slate-600">Why Bag Supply Co</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {active.why.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.08em] text-slate-600">Problems We Solve</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {active.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.08em] text-slate-600">Business Benefits</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {active.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-slate-600">Related Catalogs</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {active.catalogs.map((catalog) => (
                <Link
                  key={catalog.href}
                  href={catalog.href}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-amber-50"
                >
                  {catalog.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Link href="/generic-bag-quote" className="btn-primary">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
