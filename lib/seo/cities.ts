import { INDUSTRY_PAGES, type IndustryKey } from '@/lib/seo/industries'
import citiesData from '@/data/seo/cities.json'
import industryCountsData from '@/data/seo/industryCounts.json'

export type CityData = {
  slug: string
  city: string
  state: string
  stateAbbr: string
  stateFips: string
  placeFips: string
  population: number
  countyName: string
  countyFips: string
  countyPopulation: number
  lat: number
  lon: number
  distanceMiles: number
  pickupEligible: boolean
  businessDensityScore: number
  totalEstablishments: number
}

type IndustryCounts = Record<IndustryKey, number>

export type CityCounts = {
  countyName: string
  countyFips: string
  totalEstablishments: number
  competitionCount: number
  industryCounts: IndustryCounts
}

export const CITIES: CityData[] = citiesData as CityData[]
const COUNTS: Record<string, CityCounts> = (industryCountsData as { counts: Record<string, CityCounts> }).counts

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((city) => city.slug === slug)
}

export function getCityCounts(slug: string): CityCounts | undefined {
  return COUNTS[slug]
}

export function getIndustryCount(slug: string, industryKey: IndustryKey): number {
  return COUNTS[slug]?.industryCounts?.[industryKey] ?? 0
}

export function getCitiesByIndustry(industryKey: IndustryKey): Array<{ city: CityData; count: number }> {
  return CITIES.map((city) => ({
    city,
    count: getIndustryCount(city.slug, industryKey),
  })).sort((a, b) => b.count - a.count)
}

export function getIndustryCitySlugs(_industryKey: IndustryKey): string[] {
  void _industryKey
  return CITIES.map((city) => city.slug)
}

export function getIndustryCityLinks(industryKey: IndustryKey, limit = 20) {
  return getCitiesByIndustry(industryKey).slice(0, limit).map(({ city, count }) => ({
    slug: city.slug,
    label: `${city.city}, ${city.stateAbbr}`,
    count,
  }))
}

export function getIndustryRoutesForCity(slug: string) {
  return INDUSTRY_PAGES.map((industry) => ({
    industry,
    href: `/${industry.slug}/${slug}`,
  }))
}
