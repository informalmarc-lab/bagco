import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IndustryCityPage from '@/components/seo/IndustryCityPage'
import { CITIES, getCityBySlug, getCityCounts } from '@/lib/seo/cities'
import { getIndustryByKey } from '@/lib/seo/industries'
import { getIndustryStartingPrice } from '@/lib/seo/industries'
import { buildIndustryCityMeta } from '@/lib/seo/meta'
import { buildMetaWithCanonical } from '@/lib/seo/pageMetadata'

export const dynamicParams = false

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCityBySlug(params.city)
  if (!city) return {}
  const counts = getCityCounts(city.slug)
  if (!counts) return {}
  const industry = getIndustryByKey('pharmacy')
  const meta = buildIndustryCityMeta({
    industryLabel: industry.label,
    marketLabel: industry.marketLabel,
    city: city.city,
    stateAbbr: city.stateAbbr,
    distanceMiles: city.distanceMiles,
    pickupEligible: city.pickupEligible,
    deliveryTimeline: '',
    startingPrice: getIndustryStartingPrice(industry),
    businessCount: counts.industryCounts[industry.key],
    countyName: counts.countyName,
  })
  return buildMetaWithCanonical({
    title: meta.title,
    description: meta.description,
    path: `/pharmacy-bags/${city.slug}`,
  })
}

export default function IndustryCityPageRoute({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city)
  if (!city) return notFound()
  const counts = getCityCounts(city.slug)
  if (!counts) return notFound()
  const industry = getIndustryByKey('pharmacy')

  return <IndustryCityPage industry={industry} city={city} counts={counts} />
}
