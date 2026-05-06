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
    id: 'custom-bags',
    title: 'Custom Bags',
    subtitle: 'Brand-forward print programs with clear production and reorder rules',
    examples: 'Single-location brands, multi-location operators, distributor private-label programs',
    why: [
      'Custom print programs improve brand recall on every carry-out transaction.',
      'Standardized color options and proofs reduce ordering uncertainty.',
      'Case-level pricing and lead-time planning support predictable reorders.',
    ],
    problems: [
      'Plain stock bags do not reinforce brand identity after checkout.',
      'Inconsistent artwork handoff creates delays and proof revisions.',
      'No custom reorder cadence leads to rush-order pressure.',
    ],
    benefits: [
      'Stronger street-level visibility from every bag leaving the store.',
      'Cleaner purchasing process with repeatable proof and reorder flow.',
      'Reliable production planning with 1/2/3 color program options.',
    ],
    catalogs: [
      { label: 'Custom Bags Catalog', href: '/catalog/custom' },
      { label: 'Pharmacy Catalog', href: '/catalog/pharmacy' },
      { label: 'Veterinary Catalog', href: '/catalog/veterinary' },
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
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

export default function IndustrySolutionsSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const active = useMemo(
    () => INDUSTRIES.find((industry) => industry.id === activeId) || null,
    [activeId],
  )

  return (
    <section id="industry-solutions" className="section-container py-20 md:py-24">
      <h2 className="section-title">Packaging programs by business type</h2>
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
              className={`surface-card rounded-md p-5 text-left ${
                isActive
                  ? 'border-[#B5813A99]'
                  : 'hover:border-[#C4935A66]'
              }`}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#1E4D2B] text-[#F4E8D8]">
                <Icon id={industry.id} />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#1E4D2B]">{industry.title}</h3>
              <p className="mt-2 text-sm muted-text">{industry.subtitle}</p>
              <p className="mt-3 text-xs font-semibold text-[#7A6548]">{isActive ? 'Selected' : 'View details'}</p>
            </button>
          )
        })}
      </div>

      <div
        ref={panelRef}
        className="mt-6 overflow-hidden rounded-md border border-[#D8C5A7] bg-white p-6 shadow-[0_2px_8px_rgba(30,77,43,0.05)] md:p-8"
      >
        {active ? (
          <div key={active.id} className="industry-panel">
            <div>
              <h3 className="text-2xl font-black text-[#1E4D2B]">{active.title}</h3>
              <p className="mt-2 text-sm font-semibold muted-text">{active.examples}</p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-md border border-[#D8C5A7] bg-[#FCFAF7] p-4">
                <h4 className="text-sm font-black text-[#1E4D2B]">Why Bag Supply Co</h4>
                <ul className="mt-3 space-y-2 text-sm muted-text">
                  {active.why.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-[#D8C5A7] bg-[#FCFAF7] p-4">
                <h4 className="text-sm font-black text-[#1E4D2B]">Problems We Solve</h4>
                <ul className="mt-3 space-y-2 text-sm muted-text">
                  {active.problems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-[#D8C5A7] bg-[#FCFAF7] p-4">
                <h4 className="text-sm font-black text-[#1E4D2B]">Business Benefits</h4>
                <ul className="mt-3 space-y-2 text-sm muted-text">
                  {active.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-black text-[#1E4D2B]">Related Catalogs</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.catalogs.map((catalog) => (
                  <Link
                    key={catalog.href}
                    href={catalog.href}
                    className="rounded-md border border-[#D8C5A7] bg-white px-3 py-2 text-xs font-bold text-[#5F4D33] hover:bg-[#FAF6F0]"
                  >
                    {catalog.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="industry-panel text-center">
            <p className="text-sm font-semibold text-[#5F4D33]">Select an industry above to view details.</p>
          </div>
        )}
      </div>
    </section>
  )
}

