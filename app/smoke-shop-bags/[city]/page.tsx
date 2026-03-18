import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IndustryCityPage from '@/components/seo/IndustryCityPage'
import { CITIES, getCityBySlug, getCityCounts } from '@/lib/seo/cities'
import { getIndustryByKey } from '@/lib/seo/industries'
import { getIndustryStartingPrice } from '@/lib/seo/industries'
import { buildIndustryCityMeta } from '@/lib/seo/meta'

export const dynamicParams = false

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }))
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCityBySlug(params.city)
  if (!city) return {}
  const counts = getCityCounts(city.slug)
  if (!counts) return {}
  const industry = getIndustryByKey('smoke-shop')
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
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default function IndustryCityPageRoute({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city)
  if (!city) return notFound()
  const counts = getCityCounts(city.slug)
  if (!counts) return notFound()
  const industry = getIndustryByKey('smoke-shop')

  return <IndustryCityPage industry={industry} city={city} counts={counts} />
}
