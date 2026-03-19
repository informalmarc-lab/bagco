import {
  getCatalogProductsByIndustry,
  getMostOrderedSizesByIndustry,
  getStartingPriceByIndustry,
  type CatalogIndustryKey,
} from '@/lib/catalogProducts'

export type IndustryKey =
  | 'pharmacy'
  | 'veterinary'
  | 'dispensary'
  | 'smoke-shop'
  | 'event-company'

export type IndustryMeta = {
  key: IndustryKey
  slug: string
  label: string
  marketLabel: string
  focus: string
  naics: string
  catalogIndustry: CatalogIndustryKey
}

export const INDUSTRY_PAGES: IndustryMeta[] = [
  {
    key: 'pharmacy',
    slug: 'pharmacy-bags',
    label: 'Pharmacy Bags',
    marketLabel: 'pharmacy',
    focus: 'Prescription pickup workflows and compliance-ready bag sizing.',
    naics: '446110',
    catalogIndustry: 'pharmacy',
  },
  {
    key: 'veterinary',
    slug: 'veterinary-bags',
    label: 'Veterinary Bags',
    marketLabel: 'veterinary',
    focus: 'Clinic discharge, medication handoff, and client take-home kits.',
    naics: '541940',
    catalogIndustry: 'veterinary',
  },
  {
    key: 'dispensary',
    slug: 'dispensary-bags',
    label: 'Dispensary Bags',
    marketLabel: 'dispensary',
    focus: 'Exit-bag sizing, opaque options, and dispensary-ready carryout.',
    naics: '453998',
    catalogIndustry: 'dispensary',
  },
  {
    key: 'smoke-shop',
    slug: 'smoke-shop-bags',
    label: 'Smoke Shop Bags',
    marketLabel: 'smoke shop',
    focus: 'Small-item carryout bags with durable paper stock options.',
    naics: '453991',
    catalogIndustry: 'smoke-shop',
  },
  {
    key: 'event-company',
    slug: 'event-company-bags',
    label: 'Event Company Bags',
    marketLabel: 'event companies',
    focus: 'Kitting, gifting, and event swag distribution programs.',
    naics: '56192',
    catalogIndustry: 'retail',
  },
]

export function getIndustryBySlug(slug: string): IndustryMeta | undefined {
  return INDUSTRY_PAGES.find((industry) => industry.slug === slug)
}

export function getIndustryByKey(key: IndustryKey): IndustryMeta {
  const industry = INDUSTRY_PAGES.find((item) => item.key === key)
  if (!industry) {
    throw new Error(`Missing industry config for ${key}`)
  }
  return industry
}

export function getIndustryProducts(industry: IndustryMeta) {
  return getCatalogProductsByIndustry(industry.catalogIndustry)
}

export function getIndustryRecommendedSizes(industry: IndustryMeta): string[] {
  return getMostOrderedSizesByIndustry(industry.catalogIndustry)
}

export function getIndustryStartingPrice(industry: IndustryMeta): number {
  return getStartingPriceByIndustry(industry.catalogIndustry)
}
