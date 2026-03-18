import Link from 'next/link'
import { money, type CatalogProduct } from '@/lib/catalogProducts'
import { getComplianceNote } from '@/lib/seo/compliance'
import { getDeliveryEstimate } from '@/lib/seo/delivery'
import { getIndustryProducts, getIndustryRecommendedSizes, type IndustryMeta } from '@/lib/seo/industries'
import type { CityCounts, CityData } from '@/lib/seo/cities'

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function getCompetitionLabel(count: number) {
  if (count >= 25) return 'High'
  if (count >= 10) return 'Moderate'
  if (count >= 1) return 'Low'
  return 'Limited'
}

function getPriceRange(product: CatalogProduct) {
  const prices = product.sizePricing?.map((row) => row.price) || [product.startingPrice]
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return min === max ? `${money(min)} per case` : `${money(min)} - ${money(max)} per case`
}

export default function IndustryCityPage({
  industry,
  city,
  counts,
}: {
  industry: IndustryMeta
  city: CityData
  counts: CityCounts
}) {
  const delivery = getDeliveryEstimate(city.distanceMiles, city.pickupEligible)
  const industryCount = counts.industryCounts[industry.key] ?? 0
  const competitionLabel = getCompetitionLabel(counts.competitionCount)
  const complianceNote = getComplianceNote(industry.key, city.state)
  const recommendedSizes = getIndustryRecommendedSizes(industry)
  const products = getIndustryProducts(industry).slice(0, 3)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Bag Supply Co',
        url: `https://www.bagsupplyco.com/${industry.slug}/${city.slug}`,
        telephone: '(704) 862-9256',
        areaServed: {
          '@type': 'City',
          name: `${city.city}, ${city.stateAbbr}`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Monroe',
          addressRegion: 'NC',
          postalCode: '28110',
          addressCountry: 'US',
        },
      },
      ...products.map((product) => {
        const prices = product.sizePricing?.map((row) => row.price) || [product.startingPrice]
        const min = Math.min(...prices)
        return {
          '@type': 'Product',
          name: product.name,
          sku: product.sku,
          brand: 'Bag Supply Co',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: min,
            availability: 'https://schema.org/InStock',
          },
        }
      }),
    ],
  }

  return (
    <div className="pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">City + Industry Program</p>
          <h1 className="heading-display mt-5">
            {industry.label} in {city.city}, {city.stateAbbr}
          </h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Factory-direct {industry.label} with fast replenishment from Monroe, North Carolina. Built
            for teams that need predictable case planning and consistent supply.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">Build a Quote</Link>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Local presence</p>
            <p className="mt-3 text-3xl font-black text-[#1E4D2B]">{formatNumber(industryCount)}</p>
            <p className="mt-2 text-sm muted-text">
              County CBP establishments for NAICS {industry.naics} in {counts.countyName}.
            </p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Delivery timeline</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">{delivery.timeline}</p>
            <p className="mt-2 text-sm muted-text">{delivery.distanceLabel}</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Pickup option</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">
              {city.pickupEligible ? 'Same-day pickup' : 'Pickup not available'}
            </p>
            <p className="mt-2 text-sm muted-text">{delivery.pickupLabel}</p>
          </div>
          <div className="tonal-panel">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#B5813A]">Wholesale alternatives</p>
            <p className="mt-3 text-xl font-black text-[#1E4D2B]">{competitionLabel}</p>
            <p className="mt-2 text-sm muted-text">
              {counts.competitionCount} paper/industrial supply wholesalers in {counts.countyName}.
            </p>
          </div>
        </div>
      </section>

      {complianceNote && (
        <section className="section-container pb-6">
          <div className="tonal-panel">
            <h2 className="section-title">{city.state} compliance note</h2>
            <p className="mt-3 text-sm leading-7 text-[#4B3E2E]">{complianceNote}</p>
          </div>
        </section>
      )}

      <section className="section-container pb-8">
        <h2 className="section-title">Recommended bag SKUs</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F4D33]">
          These are the most requested SKUs for {industry.marketLabel} orders, with pricing pulled directly
          from our live catalog.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[640px] w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1E4D2B] text-white">
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Bag</th>
                <th className="px-4 py-3 text-left">Common sizes</th>
                <th className="px-4 py-3 text-left">Price range</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.sku} className="border-b border-[#C4935A66] bg-white">
                  <td className="px-4 py-3 font-semibold text-[#1E4D2B]">{product.sku}</td>
                  <td className="px-4 py-3 text-[#4B3E2E]">{product.name}</td>
                  <td className="px-4 py-3 text-[#4B3E2E]">
                    {product.sizeOptions.slice(0, 3).join(', ')}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#1E4D2B]">{getPriceRange(product)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container pb-10">
        <div className="tonal-panel">
          <h2 className="section-title">Local {industry.marketLabel} FAQ</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <p className="font-semibold text-[#1E4D2B]">
                How fast can you deliver {industry.marketLabel} bags to {city.city}?
              </p>
              <p className="mt-2 text-sm leading-7 text-[#4B3E2E]">
                Typical delivery is {delivery.timeline.toLowerCase()} based on {delivery.distanceLabel}.
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#1E4D2B]">Is same-day pickup available?</p>
              <p className="mt-2 text-sm leading-7 text-[#4B3E2E]">
                {city.pickupEligible
                  ? 'Yes. Orders picked before the daily cutoff can be staged for same-day pickup in Monroe, NC.'
                  : 'Pickup is not available at this distance, but freight delivery remains fast and consistent.'}
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#1E4D2B]">
                How many {industry.marketLabel} locations are nearby?
              </p>
              <p className="mt-2 text-sm leading-7 text-[#4B3E2E]">
                Census County Business Patterns reports {formatNumber(industryCount)} NAICS {industry.naics}
                establishments in {counts.countyName}.
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#1E4D2B]">What sizes are most common?</p>
              <p className="mt-2 text-sm leading-7 text-[#4B3E2E]">
                Most {industry.marketLabel} orders use {recommendedSizes.join(', ')} depending on item mix.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container pb-6">
        <div className="flex flex-wrap gap-3">
          <Link href={`/${industry.slug}`} className="btn-secondary">
            View {industry.label} hub
          </Link>
          <Link href={`/local/${city.slug}`} className="btn-secondary">
            Explore {city.city} market page
          </Link>
        </div>
      </section>
    </div>
  )
}
