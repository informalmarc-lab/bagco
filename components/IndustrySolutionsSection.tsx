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
    id: 'pharmacies',
    title: 'Pharmacies',
    subtitle: 'Reliable packaging programs for regulated daily-volume operations',
    examples: 'Independent pharmacies, multi-location groups, clinic-adjacent retail',
    why: [
      'Pharmacies need consistent bag quality for trust-first customer presentation.',
      'Reliable case supply prevents front-counter interruptions and reorder stress.',
      'Professional branded paper bags reinforce store credibility in regulated settings.',
    ],
    problems: [
      'Inconsistent packaging disrupts daily script handoff workflows.',
      'Poor-quality bags weaken customer confidence at checkout.',
      'Unclear replenishment cycles create avoidable stock pressure.',
    ],
    benefits: [
      'Cleaner customer experience and stronger trust signals.',
      'Operational stability through predictable reorder planning.',
      'Professional pharmacy branding beyond the counter.',
    ],
    catalogs: [
      { label: 'Pharmacy Catalog', href: '/catalog/pharmacy' },
      { label: 'Custom 1/2/3 Color', href: '/catalog/custom' },
      { label: 'Veterinary Catalog', href: '/catalog/veterinary' },
    ],
  },
  {
    id: 'veterinary',
    title: 'Veterinary',
    subtitle: 'Structured bag programs for veterinary and pet-care operations',
    examples: 'Veterinary clinics, pet hospitals, animal care groups',
    why: [
      'Veterinary operations need durable, consistent packaging for meds and take-home items.',
      'Branded bags strengthen clinic professionalism and client trust.',
      'Reliable reorder cadence prevents stock interruptions in busy practices.',
    ],
    problems: [
      'Low-quality bags fail in day-to-day clinic workflows.',
      'Irregular supply creates front-desk friction and order delays.',
      'Unbranded packaging weakens brand recognition across repeat clients.',
    ],
    benefits: [
      'More professional client handoff experience.',
      'Operational ease with repeatable replenishment.',
      'Consistent brand visibility for recurring pet-owner traffic.',
    ],
    catalogs: [
      { label: 'Veterinary Catalog', href: '/catalog/veterinary' },
      { label: 'Custom 1/2/3 Color', href: '/catalog/custom' },
      { label: 'Pharmacy Catalog', href: '/catalog/pharmacy' },
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
  if (id === 'pharmacies') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v14M5 12h14" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
    )
  }
  if (id === 'veterinary') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="7.5" cy="9" r="1.2" />
        <circle cx="12" cy="7.5" r="1.2" />
        <circle cx="16.5" cy="9" r="1.2" />
        <path d="M8.2 15.4c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8c0 1.7-1.3 2.8-3.8 2.8s-3.8-1.1-3.8-2.8z" />
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
      <h2 className="heading-display mt-5 text-3xl md:text-5xl">
        Packaging Programs by Business Type
      </h2>
      <p className="mt-4 max-w-3xl text-lg muted-text">
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
                  ? 'border-[#B5813A66] shadow-[0_16px_35px_rgba(181,129,58,0.18)]'
                  : 'hover:-translate-y-0.5 hover:border-[#C4935A66] hover:shadow-[0_12px_28px_rgba(30,77,43,0.12)]'
              }`}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E4D2B] text-[#F4E8D8]">
                <Icon id={industry.id} />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#1E4D2B]">{industry.title}</h3>
              <p className="mt-2 text-sm muted-text">{industry.subtitle}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.09em] text-[#B5813A]">
                {isActive ? 'Selected' : 'Click to expand'}
              </p>
            </button>
          )
        })}
      </div>

      <div
        ref={panelRef}
        className="mt-6 overflow-hidden rounded-3xl border border-[#C4935A66] bg-white/92 p-6 shadow-[0_14px_30px_rgba(30,77,43,0.12)] md:p-8"
      >
        <div key={active.id} className="industry-panel reveal-up">
          <div className="flex flex-wrap items-center gap-3">
            <p className="kicker m-0">{active.title}</p>
            <p className="text-sm font-semibold muted-text">{active.examples}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]/70 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.08em] text-[#5F4D33]">Why Bag Supply Co</h4>
              <ul className="mt-3 space-y-2 text-sm muted-text">
                {active.why.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]/70 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.08em] text-[#5F4D33]">Problems We Solve</h4>
              <ul className="mt-3 space-y-2 text-sm muted-text">
                {active.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#C4935A66] bg-[#FAF6F0]/70 p-4">
              <h4 className="text-sm font-black uppercase tracking-[0.08em] text-[#5F4D33]">Business Benefits</h4>
              <ul className="mt-3 space-y-2 text-sm muted-text">
                {active.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5F4D33]">Related Catalogs</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {active.catalogs.map((catalog) => (
                <Link
                  key={catalog.href}
                  href={catalog.href}
                  className="rounded-lg border border-[#C4935A66] bg-white px-3 py-1.5 text-xs font-bold text-[#5F4D33] hover:bg-[#FAF6F0]"
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

