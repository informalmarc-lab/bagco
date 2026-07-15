'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

type IndustryPanel = {
  id: string
  title: string
  subtitle: string
  examples: string
  facts: string[]
  catalogs: { label: string; href: string; note: string }[]
  leadTime: string
}

const INDUSTRIES: IndustryPanel[] = [
  {
    id: 'dispensaries',
    title: 'Dispensaries',
    subtitle: 'Compliance-ready packaging for cannabis retail checkout',
    examples: 'Single-location dispensaries · Multi-location operators · Delivery services',
    facts: [
      'Opaque exit bags, mylar bags, and compliance labels — all sourced from one place so you\'re not coordinating three vendors.',
      'Stock programs ship same day before 1 PM ET. When you run low mid-shift, you\'re not waiting a week.',
      'State compliance requirements vary. We carry options that satisfy opaque-bag mandates across major legal markets.',
      'Start with stock while your volume stabilizes, then move to custom print when the reorder pattern is predictable.',
    ],
    catalogs: [
      { label: 'Dispensary Bags', href: '/industries/dispensary', note: 'Exit bags + carryout' },
      { label: 'Mylar Bags', href: '/catalog/mylar-bags', note: 'Resealable, labeled options' },
      { label: 'Compliance Labels', href: '/catalog/labels', note: 'State-specific formats' },
    ],
    leadTime: 'Stock: same day before 1 PM ET · Custom print: 3–4 weeks after proof',
  },
  {
    id: 'pharmacies',
    title: 'Pharmacies',
    subtitle: 'Stock and custom paper bags for independent and group pharmacy operations',
    examples: 'Independent pharmacies · Multi-location groups · Clinic-adjacent retail',
    facts: [
      'GS and TY stock designs have been the standard pharmacy bag for years — eight size options, consistent quality, case pricing.',
      'Custom 1-, 2-, and 3-color print programs let your bags carry the pharmacy name instead of a generic design.',
      'We help you set a reorder cadence so you\'re not scrambling when a case runs out mid-week.',
      'Plastic GS options available for larger prescription handoffs where paper isn\'t the right fit.',
    ],
    catalogs: [
      { label: 'Pharmacy Catalog', href: '/catalog/pharmacy', note: 'GS, TY, Plastic GS' },
      { label: 'Custom Print', href: '/catalog/custom', note: '1/2/3 color programs' },
      { label: 'Veterinary Bags', href: '/catalog/veterinary', note: 'If you carry pet meds' },
    ],
    leadTime: 'Stock: same day before 1 PM ET · Custom print: 3–4 weeks after proof',
  },
  {
    id: 'veterinary',
    title: 'Veterinary',
    subtitle: 'Consistent bag programs for veterinary clinics and animal care practices',
    examples: 'Veterinary clinics · Pet hospitals · Animal care groups',
    facts: [
      'VB1, VB2, and VB6 stock designs cover the size range from small-med dispensing bags to larger take-home carryout.',
      'Same-day stock shipping before 1 PM ET means a busy practice isn\'t waiting on packaging between patient visits.',
      'Custom print adds clinic branding to every bag that leaves the exam room — useful for multi-location groups.',
      'Order minimums and case pricing are the same structure as the pharmacy program — no different process to learn.',
    ],
    catalogs: [
      { label: 'Veterinary Catalog', href: '/catalog/veterinary', note: 'VB1, VB2, VB6 stock' },
      { label: 'Custom Print', href: '/catalog/custom', note: '1/2/3 color programs' },
      { label: 'Pharmacy Bags', href: '/catalog/pharmacy', note: 'Similar size range' },
    ],
    leadTime: 'Stock: same day before 1 PM ET · Custom print: 3–4 weeks after proof',
  },
  {
    id: 'custom-bags',
    title: 'Custom Bags',
    subtitle: 'Branded paper bag programs with guided artwork, sizing, and reorder planning',
    examples: 'Single-location brands · Multi-location operators · Distributor private-label programs',
    facts: [
      '1-color, 2-color, and 3-color print options — choose based on how much of the bag surface you want to brand.',
      'We handle artwork coordination: send us your logo and we walk through sizing, ink placement, and proof review.',
      'Lead time is 3–4 weeks after proof approval. We state this up front so production planning isn\'t a surprise.',
      'Reorder programs mean your second order is faster than your first — same proof, same specs, no restart.',
    ],
    catalogs: [
      { label: 'Custom Bags Catalog', href: '/catalog/custom', note: '1/2/3 color programs' },
      { label: 'Pharmacy Custom', href: '/custom-pharmacy-paper-bags', note: 'Pharmacy-specific sizing' },
      { label: 'Request a Sample', href: '/request-sample', note: 'See print quality first' },
    ],
    leadTime: 'Custom print: 3–4 weeks after proof approval · Reorders faster with same specs',
  },
]

function Icon({ id }: { id: string }) {
  if (id === 'dispensaries') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" />
      </svg>
    )
  }
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
  const [activeId, setActiveId] = useState<string>('dispensaries')
  const panelRef = useRef<HTMLDivElement | null>(null)
  const active = useMemo(
    () => INDUSTRIES.find((industry) => industry.id === activeId) ?? INDUSTRIES[0],
    [activeId],
  )

  return (
    <section id="industry-solutions" className="section-container py-20 md:py-24">
      <h2 className="section-title">Packaging programs by business type</h2>
      <p className="mt-4 max-w-3xl text-lg muted-text">
        Select your industry to see what problems we solve and how packaging improves your business outcomes.
      </p>

      <div className="mt-7 grid gap-4 grid-cols-2 md:grid-cols-4">
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
              className={`surface-card p-6 text-left transition-all hover:-translate-y-0.5 ${
                isActive
                  ? 'border-accent-500/60 shadow-[var(--shadow-pop)]'
                  : 'hover:border-kraft-400/40'
              }`}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-[#F4E8D8]">
                <Icon id={industry.id} />
              </div>
              <h3 className="mt-4 font-serif text-xl text-brand-600">{industry.title}</h3>
              <p className="mt-2 text-sm muted-text">{industry.subtitle}</p>
              <p className="mt-3 text-xs font-semibold text-accent-600">{isActive ? 'Selected' : 'View details'}</p>
            </button>
          )
        })}
      </div>

      <div
        ref={panelRef}
        className="mt-6 overflow-hidden rounded-2xl border border-kraft-300/40 bg-white p-6 shadow-[var(--shadow-soft)] md:p-9"
      >
        <div key={active.id} className="industry-panel">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl text-brand-600">{active.title}</h3>
              <p className="mt-1 text-xs text-muted">{active.examples}</p>
            </div>
            <p className="rounded-full bg-[#F0EBE2] px-3 py-1 text-xs font-semibold text-brand-600">{active.leadTime}</p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
            <ul className="space-y-4">
              {active.facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-sm leading-6 text-muted">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-wider text-brand-600">Catalogs</p>
              {active.catalogs.map((catalog) => (
                <Link
                  key={catalog.href}
                  href={catalog.href}
                  className="flex items-center justify-between rounded-xl border border-kraft-300/50 bg-[#FCFAF7] px-4 py-3 hover:border-accent-400/60 hover:bg-white"
                >
                  <span className="text-sm font-bold text-brand-600">{catalog.label}</span>
                  <span className="ml-3 text-xs text-muted">{catalog.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
