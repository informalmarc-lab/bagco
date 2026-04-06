import catalogProducts from '@/data/catalogProducts.json'
import { cleanText, cleanTextArray, cleanTextDeep } from './utils/cleanText.ts'

export type CatalogIndustryKey =
  | 'pharmacy'
  | 'veterinary'
  | 'dispensary'
  | 'smoke-shop'
  | 'custom'

export type CatalogAvailability = 'stock' | 'custom'
export type CatalogCollection = 'usa-made' | 'seasonal'

export type CatalogProduct = {
  sku: string
  slug: string
  name: string
  industry: CatalogIndustryKey
  bagType: string
  sizeOptions: string[]
  caseCount: string
  startingPrice: number
  colorOptions: string[]
  availability: CatalogAvailability
  image: string
  description: string
  collections: CatalogCollection[]
  sizePricing?: Array<{
    label: string
    price: number
  }>
}

export type CatalogFilters = {
  industry: CatalogIndustryKey | 'all'
  bagType: string | 'all'
  size: string | 'all'
  color: string | 'all'
  availability: CatalogAvailability | 'all'
  usaMadeOnly: boolean
  seasonalOnly: boolean
  search: string
}

export const INDUSTRY_LABELS: Record<CatalogIndustryKey, string> = {
  pharmacy: 'Pharmacy',
  veterinary: 'Veterinary',
  dispensary: 'Dispensary',
  'smoke-shop': 'Smoke Shop',
  custom: 'Custom Bags',
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  industry: 'all',
  bagType: 'all',
  size: 'all',
  color: 'all',
  availability: 'all',
  usaMadeOnly: false,
  seasonalOnly: false,
  search: '',
}

function sanitizeDescription(description: string): string {
  return cleanText(description)
    .replace(/1-800-526-9032/g, '(704) 862-9256')
}

function withGuaranteedSizePricing(product: CatalogProduct): CatalogProduct {
  const cleanedProduct = cleanTextDeep(product)

  if (Array.isArray(cleanedProduct.sizePricing) && cleanedProduct.sizePricing.length > 0) {
    return {
      ...cleanedProduct,
      name: cleanText(cleanedProduct.name),
      bagType: cleanText(cleanedProduct.bagType),
      caseCount: cleanText(cleanedProduct.caseCount),
      colorOptions: cleanTextArray(cleanedProduct.colorOptions),
      sizeOptions: cleanTextArray(cleanedProduct.sizeOptions),
      description: sanitizeDescription(cleanedProduct.description),
    }
  }

  const fallbackRows =
    cleanedProduct.sizeOptions.length > 0
      ? cleanedProduct.sizeOptions.map((size) => ({
          label: cleanText(`${size} ${cleanedProduct.caseCount}`.trim()),
          price: cleanedProduct.startingPrice,
        }))
      : [{ label: cleanText(`Standard Size ${cleanedProduct.caseCount}`.trim()), price: cleanedProduct.startingPrice }]

  return {
    ...cleanedProduct,
    name: cleanText(cleanedProduct.name),
    bagType: cleanText(cleanedProduct.bagType),
    caseCount: cleanText(cleanedProduct.caseCount),
    colorOptions: cleanTextArray(cleanedProduct.colorOptions),
    sizeOptions: cleanTextArray(cleanedProduct.sizeOptions),
    description: sanitizeDescription(cleanedProduct.description),
    sizePricing: fallbackRows,
  }
}

const ACTIVE_INDUSTRIES = new Set<CatalogIndustryKey>([
  'pharmacy',
  'veterinary',
  'dispensary',
  'smoke-shop',
  'custom',
])

const CATALOG_PRODUCTS = (catalogProducts as CatalogProduct[])
  .map(withGuaranteedSizePricing)
  .filter((product) => ACTIVE_INDUSTRIES.has(product.industry))

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))
}

export function money(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

export function getAllCatalogProducts(): CatalogProduct[] {
  return [...CATALOG_PRODUCTS]
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find((product) => product.slug === slug)
}

export function getCatalogProductsByIndustry(industry: CatalogIndustryKey): CatalogProduct[] {
  return CATALOG_PRODUCTS.filter((product) => product.industry === industry)
}

export function applyCatalogFilters(
  products: CatalogProduct[],
  filters: CatalogFilters,
): CatalogProduct[] {
  return products.filter((product) => {
    if (filters.industry !== 'all' && product.industry !== filters.industry) return false
    if (filters.bagType !== 'all' && product.bagType !== filters.bagType) return false
    if (filters.size !== 'all' && !product.sizeOptions.includes(filters.size)) return false
    if (filters.color !== 'all' && !product.colorOptions.includes(filters.color)) return false
    if (filters.availability !== 'all' && product.availability !== filters.availability) return false
    if (filters.usaMadeOnly && !product.collections.includes('usa-made')) return false
    if (filters.seasonalOnly && !product.collections.includes('seasonal')) return false
    const query = filters.search.trim().toLowerCase()
    if (query) {
      const haystack = [
        product.name,
        product.sku,
        product.bagType,
        product.industry,
        ...product.sizeOptions,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
}

export function getCatalogFilterOptions(products: CatalogProduct[]) {
  return {
    bagTypes: uniqueSorted(products.map((product) => product.bagType)),
    sizes: uniqueSorted(products.flatMap((product) => product.sizeOptions)),
    colors: uniqueSorted(products.flatMap((product) => product.colorOptions)),
  }
}

export function getStartingPriceByIndustry(industry: CatalogIndustryKey): number {
  const items = getCatalogProductsByIndustry(industry)
  if (items.length === 0) return 0
  return Math.min(...items.map((item) => item.startingPrice))
}

export function getMostOrderedSizesByIndustry(industry: CatalogIndustryKey): string[] {
  const sizeCounts = new Map<string, number>()
  for (const product of getCatalogProductsByIndustry(industry)) {
    for (const size of product.sizeOptions) {
      sizeCounts.set(size, (sizeCounts.get(size) || 0) + 1)
    }
  }

  return Array.from(sizeCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([size]) => size)
}

export const INDUSTRY_ORDER: CatalogIndustryKey[] = [
  'pharmacy',
  'veterinary',
  'dispensary',
  'smoke-shop',
  'custom',
]

const INDUSTRY_CATALOG_HREF: Record<CatalogIndustryKey, string> = {
  pharmacy: '/catalog/pharmacy',
  veterinary: '/catalog/veterinary',
  dispensary: '/catalog?industry=dispensary',
  'smoke-shop': '/catalog?industry=smoke-shop',
  custom: '/catalog/custom',
}

export function getIndustryCatalogHref(industry: CatalogIndustryKey): string {
  return INDUSTRY_CATALOG_HREF[industry]
}

export function getLeadTimeText(availability: CatalogAvailability): string {
  if (availability === 'stock') return 'Same day shipping for stock orders placed before 1 PM ET'
  return 'Custom print lead time: 3-4 weeks after proof approval'
}

export function getLeadTimeShort(availability: CatalogAvailability): string {
  if (availability === 'stock') return 'Same day before 1 PM ET'
  return 'Custom: 3-4 weeks'
}

export function isCatalogProductQuoteOnly(product: CatalogProduct): boolean {
  return product.availability === 'custom'
}

function slugifySegment(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'item'
}

function stripRowToSizeLabel(label: string): string {
  const withoutCase = label
    .replace(/\s*\d[\d,]*\s*(?:qty|per case|\/case)(?:\s*[-–].*)?$/i, '')
    .trim()

  return withoutCase
    .replace(/\s+\d+\s*-\s*color$/i, '')
    .trim()
}

export function getCatalogSkuSlug(sku: string): string {
  return slugifySegment(sku)
}

export function getCatalogSizeSlug(sizeLabel: string): string {
  const numericMatch = sizeLabel.match(/#(\d+)(?=\s|\(|$)/i)
  if (numericMatch) return numericMatch[1]

  const normalized = sizeLabel
    .replace(/\([^)]*\)/g, ' ')
    .replace(/^#/, '')
    .replace(/\s+/g, ' ')
    .trim()

  return slugifySegment(normalized)
}

export function getCatalogOverviewPath(product: CatalogProduct): string {
  return `/catalog/${product.industry}/${getCatalogSkuSlug(product.sku)}`
}

export function getCatalogSizePath(product: CatalogProduct, sizeSlug: string): string {
  return `${getCatalogOverviewPath(product)}/${sizeSlug}`
}

export function getCatalogProductByRoute(category: string, skuSlug: string): CatalogProduct | undefined {
  return CATALOG_PRODUCTS.find(
    (product) => product.industry === category && getCatalogSkuSlug(product.sku) === skuSlug,
  )
}

export function getCatalogProductSizes(product: CatalogProduct): Array<{
  slug: string
  label: string
  pricing: Array<{ label: string; price: number }>
}> {
  const orderedSlugs: string[] = []
  const sizeMap = new Map<
    string,
    { slug: string; label: string; pricing: Array<{ label: string; price: number }> }
  >()

  const ensure = (label: string) => {
    const slug = getCatalogSizeSlug(label)
    if (!sizeMap.has(slug)) {
      sizeMap.set(slug, { slug, label, pricing: [] })
      orderedSlugs.push(slug)
    }
    return sizeMap.get(slug)!
  }

  for (const label of product.sizeOptions) {
    ensure(label)
  }

  for (const row of product.sizePricing || []) {
    const baseLabel = stripRowToSizeLabel(row.label)
    const target = ensure(baseLabel || row.label)
    target.pricing.push(row)
  }

  return orderedSlugs.map((slug) => sizeMap.get(slug)!).filter(Boolean)
}
