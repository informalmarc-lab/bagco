import Link from 'next/link'
import { getDeliveryEstimate } from '@/lib/seo/delivery'
import { getIndustryRoutesForCity, type CityCounts, type CityData } from '@/lib/seo/cities'

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export default function CityHubPage({ city, counts }: { city: CityData; counts: CityCounts }) {
  const delivery = getDeliveryEstimate(city.distanceMiles, city.pickupEligible)
  const industryLinks = getIndustryRoutesForCity(city.slug)

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Local Program Snapshot</p>
          <h1 className="heading-display mt-5">
            Wholesale bag programs in {city.city}, {city.stateAbbr}
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Factory-direct paper bag supply with case-level planning, fast replenishment, and reliable lead times for
            teams across {city.city}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Population</p>
            <p className="mt-3 text-3xl font-black text-[#1E4D2B]">{formatNumber(city.population)}</p>
            <p className="mt-2 text-sm muted-text">2020 Census population for {city.city}.</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Delivery window</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">{delivery.timeline}</p>
            <p className="mt-2 text-sm muted-text">{delivery.distanceLabel}</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Pickup</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">
              {city.pickupEligible ? 'Same-day available' : 'Not available'}
            </p>
            <p className="mt-2 text-sm muted-text">{delivery.pickupLabel}</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Business density</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">
              {city.businessDensityScore} per 1k
            </p>
            <p className="mt-2 text-sm muted-text">
              {formatNumber(counts.totalEstablishments)} establishments in {counts.countyName}.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container pb-10">
        <h2 className="section-title">Industry programs for {city.city}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F4D33]">
          Each industry page includes local business counts, delivery timelines from Monroe, NC, and SKU-level pricing.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {industryLinks.map(({ industry, href }) => (
            <Link key={industry.slug} href={href} className="tonal-panel hover:translate-y-[-2px] transition-transform">
              <h3 className="text-2xl font-black text-[#1E4D2B]">{industry.label}</h3>
              <p className="mt-2 text-sm text-[#5F4D33]">{industry.focus}</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.1em] text-[#B5813A]">Open local page</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container pb-6">
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-secondary">
            Contact Team
          </Link>
        </div>
      </section>
    </div>
  )
}
