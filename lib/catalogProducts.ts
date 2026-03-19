import catalogProducts from '@/data/catalogProducts.json'

export type CatalogIndustryKey =
  | 'pharmacy'
  | 'veterinary'
  | 'dispensary'
  | 'smoke-shop'
  | 'wineries-breweries'
  | 'retail'
  | 'food-beverage'

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
  'wineries-breweries': 'Wineries & Breweries',
  retail: 'Retail',
  'food-beverage': 'Food & Beverage',
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
  return description
    .replace(/1-800-526-9032/g, '(704) 862-9256')
}

function withGuaranteedSizePricing(product: CatalogProduct): CatalogProduct {
  if (Array.isArray(product.sizePricing) && product.sizePricing.length > 0) {
    return {
      ...product,
      description: sanitizeDescription(product.description),
    }
  }

  const fallbackRows =
    product.sizeOptions.length > 0
      ? product.sizeOptions.map((size) => ({
          label: `${size} ${product.caseCount}`.trim(),
          price: product.startingPrice,
        }))
      : [{ label: `Standard Size ${product.caseCount}`.trim(), price: product.startingPrice }]

  return {
    ...product,
    description: sanitizeDescription(product.description),
    sizePricing: fallbackRows,
  }
}

const ACTIVE_INDUSTRIES = new Set<CatalogIndustryKey>([
  'pharmacy',
  'veterinary',
  'dispensary',
  'smoke-shop',
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
]

export function getLeadTimeText(availability: CatalogAvailability): string {
  if (availability === 'stock') return 'Same day shipping for stock orders placed before 1 PM ET'
  return 'Custom print lead time: 3-4 weeks after proof approval'
}

export function getLeadTimeShort(availability: CatalogAvailability): string {
  if (availability === 'stock') return 'Same day before 1 PM ET'
  return 'Custom: 3-4 weeks'
}
