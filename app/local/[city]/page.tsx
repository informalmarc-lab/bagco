import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CityHubPage from '@/components/seo/CityHubPage'
import { CITIES, getCityBySlug, getCityCounts } from '@/lib/seo/cities'
import { buildCityMeta } from '@/lib/seo/meta'
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
  const meta = buildCityMeta({
    city: city.city,
    stateAbbr: city.stateAbbr,
    distanceMiles: city.distanceMiles,
    pickupEligible: city.pickupEligible,
    totalEstablishments: counts.totalEstablishments,
    countyName: counts.countyName,
  })
  return buildMetaWithCanonical({
    title: meta.title,
    description: meta.description,
    path: `/local/${city.slug}`,
  })
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city)
  if (!city) return notFound()
  const counts = getCityCounts(city.slug)
  if (!counts) return notFound()

  return <CityHubPage city={city} counts={counts} />
}
