export type CatalogIndustryKey =
  | 'pharmacy'
  | 'veterinary'
  | 'dispensary'
  | 'smoke-shop'
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
}

export type CatalogFilters = {
  industry: CatalogIndustryKey | 'all'
  bagType: string | 'all'
  size: string | 'all'
  color: string | 'all'
  availability: CatalogAvailability | 'all'
  usaMadeOnly: boolean
  seasonalOnly: boolean
}

export const INDUSTRY_LABELS: Record<CatalogIndustryKey, string> = {
  pharmacy: 'Pharmacy',
  veterinary: 'Veterinary',
  dispensary: 'Dispensary',
  'smoke-shop': 'Smoke Shop',
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
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    sku: 'TY',
    slug: 'pharmacy-bags-ty-design',
    name: 'Pharmacy Bags - TY Design',
    industry: 'pharmacy',
    bagType: 'Pharmacy Stock Design',
    sizeOptions: ['#21 3.5x1.5x10', '#22 4.5x2.25x11', '#23 5x2x10', '#25 6x4x11', '#26 7x4x14', '#28 8x5x17', '#12 7x10', '#14 9x11', '#15 8.5x3.5x14.5'],
    caseCount: '500-3,000/case',
    startingPrice: 65.91,
    colorOptions: ['Stock TY Print'],
    availability: 'stock',
    image: '/catalog/pharmacy/ty/TY-25-FRONT.webp',
    description: 'Full-case TY pharmacy design with nine size options.',
    collections: ['usa-made'],
  },
  {
    sku: 'GS',
    slug: 'pharmacy-bags-gs-design',
    name: 'Pharmacy Bags - GS Design',
    industry: 'pharmacy',
    bagType: 'Pharmacy Stock Design',
    sizeOptions: ['#21 3.5x1.5x10', '#22 4.5x2.25x11', '#23 5x2x10', '#25 6x4x11', '#26 7x4x14', '#28 8x5x17', '#12 7x10', '#14 9x11', '#15 8.5x3.5x14.5'],
    caseCount: '500-3,000/case',
    startingPrice: 65.91,
    colorOptions: ['Stock GS Print'],
    availability: 'stock',
    image: '/catalog/pharmacy/gs/GS-25-FRONT.webp',
    description: 'Full-case GS pharmacy design with nine size options.',
    collections: ['usa-made'],
  },
  {
    sku: 'GSP',
    slug: 'pharmacy-bags-plastic-gs-design',
    name: 'Pharmacy Bags - Plastic GS Design',
    industry: 'pharmacy',
    bagType: 'Plastic Pharmacy Design',
    sizeOptions: ['#32 9x5.5x18', '#35 12x7x23', '#30 12x7x25'],
    caseCount: '500-1,000/case',
    startingPrice: 70.84,
    colorOptions: ['White Plastic'],
    availability: 'stock',
    image: '/catalog/pharmacy/plastic-gs/32-GSP-FRONT.webp',
    description: 'Plastic GS pharmacy design in three size/case options.',
    collections: ['usa-made'],
  },
  {
    sku: 'PMC-TY',
    slug: 'pharmacy-bag-design-ty-mini-case',
    name: 'Pharmacy Bag Design #TY (Mini-Case)',
    industry: 'pharmacy',
    bagType: 'Pharmacy Mini-Case',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 40,
    colorOptions: ['TY Stock Print'],
    availability: 'stock',
    image: '/catalog/pharmacy/ty/TY-23-FRONT.webp',
    description: 'Mini-case TY pharmacy design sold in #23 and #25 sizes.',
    collections: ['usa-made'],
  },
  {
    sku: 'PMCCFOG2',
    slug: 'pharmacy-bag-design-cfog2-mini-case',
    name: 'Pharmacy Bag Design #CFOG2 (Mini-Case)',
    industry: 'pharmacy',
    bagType: 'Pharmacy Mini-Case',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 43.4,
    colorOptions: ['Cold/Flu Stock Print'],
    availability: 'stock',
    image: '/catalog/pharmacy/ty/TY-25-FRONT.webp',
    description: 'Mini-case pharmacy seasonal design #CFOG2.',
    collections: ['seasonal'],
  },
  {
    sku: 'VB6',
    slug: 'veterinary-bag-design-vb6',
    name: 'Veterinary Bag Design #VB6',
    industry: 'veterinary',
    bagType: 'Veterinary Stock Design',
    sizeOptions: ['#22 4.5x2.25x11', '#12 7x10', '#25 6x4x11'],
    caseCount: '1,000-3,000/case',
    startingPrice: 65.91,
    colorOptions: ['Paw Print Stock'],
    availability: 'stock',
    image: '/catalog/veterinary/vb6/VB6-25-FRONT.webp',
    description: 'VB6 veterinary line with pinch, flat, and square-bottom options.',
    collections: ['usa-made'],
  },
  {
    sku: 'RX-EXIT',
    slug: 'dispensary-prescription-exit-bag',
    name: 'Dispensary Prescription Exit Bag',
    industry: 'dispensary',
    bagType: 'Dispensary Stock Design',
    sizeOptions: ['#21-DS 3.5x1.5x10', '#12-DS 7x10', '#23-DS 5x2x10', '#25-DS 6x3.5x11'],
    caseCount: '500-1,000/case',
    startingPrice: 35,
    colorOptions: ['Stock Exit Design'],
    availability: 'stock',
    image: '/catalog/dispensary/4947165f2c_21-ds_f4603711.jpg',
    description: 'Dispensary stock exit bag with four quantity/size options.',
    collections: ['usa-made'],
  },
  {
    sku: 'DMC21',
    slug: 'dispensary-bag-design-21-mini-case',
    name: 'Dispensary Bag Design #21 (Mini-Case)',
    industry: 'dispensary',
    bagType: 'Dispensary Mini-Case',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 43.4,
    colorOptions: ['DMC Stock Print'],
    availability: 'stock',
    image: '/catalog/dispensary/df3928b6a7_CBC-DMC21_a0d5b191.png',
    description: 'Mini-case dispensary design #21.',
    collections: ['usa-made'],
  },
  {
    sku: 'DMC23',
    slug: 'dispensary-bag-design-23-mini-case',
    name: 'Dispensary Bag Design #23 (Mini-Case)',
    industry: 'dispensary',
    bagType: 'Dispensary Mini-Case',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 43.4,
    colorOptions: ['DMC Stock Print'],
    availability: 'stock',
    image: '/catalog/dispensary/0ab77fa71a_CBC-DMC23_51ad805e.png',
    description: 'Mini-case dispensary design #23.',
    collections: ['usa-made'],
  },
  {
    sku: 'DMC19',
    slug: 'dispensary-bag-design-19-mini-case',
    name: 'Dispensary Bag Design #19 (Mini-Case)',
    industry: 'smoke-shop',
    bagType: 'Generic Carry-Out',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 43.4,
    colorOptions: ['DMC Stock Print'],
    availability: 'stock',
    image: '/catalog/dispensary/2d5b73da28_CBC-DMC19_61b741f5.png',
    description: 'Mini-case carry-out design commonly used for smoke/dispensary retail.',
    collections: ['usa-made'],
  },
  {
    sku: 'DMC13',
    slug: 'dispensary-bag-design-13-mini-case',
    name: 'Dispensary Bag Design #13 (Mini-Case)',
    industry: 'smoke-shop',
    bagType: 'Branded Carry-Out',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 43.4,
    colorOptions: ['DMC Stock Print'],
    availability: 'stock',
    image: '/catalog/dispensary/48e41442b5_CBC-DMC13_261d406e.png',
    description: 'Mini-case branded carry-out design #13.',
    collections: ['usa-made'],
  },
  {
    sku: 'FC1C',
    slug: 'full-custom-1-color-bags',
    name: 'Full-Custom, 1-Color Bags',
    industry: 'retail',
    bagType: 'Custom Print Program',
    sizeOptions: ['#21 3.5x1.5x10', '#22 4.5x2.25x11', '#23 5x2x10', '#25 6x4x11', '#26 7x4x14', '#28 8x5x17', '#12 7x10', '#14 9x11', '#15 8.5x3.5x14.5'],
    caseCount: '500-3,000/case',
    startingPrice: 95.56,
    colorOptions: ['1-Color Custom'],
    availability: 'custom',
    image: '/catalog/custom/1-color/CBC-25-FC1C.webp',
    description: 'Full-custom one-color program with low minimums and case-based sizing.',
    collections: ['usa-made'],
  },
  {
    sku: 'FC2C',
    slug: 'full-custom-2-color-bags',
    name: 'Full-Custom, 2-Color Bags',
    industry: 'retail',
    bagType: 'Custom Print Program',
    sizeOptions: ['#21 3.5x1.5x10', '#22 4.5x2.25x11', '#23 5x2x10', '#25 6x4x11', '#26 7x4x14', '#28 8x5x17', '#12 7x10', '#14 9x11', '#15 8.5x3.5x14.5'],
    caseCount: '500-3,000/case',
    startingPrice: 95.56,
    colorOptions: ['2-Color Custom'],
    availability: 'custom',
    image: '/catalog/custom/2-color/CBC-25-FC2C.webp',
    description: 'Most popular full-custom two-color print program.',
    collections: ['usa-made'],
  },
  {
    sku: 'US17',
    slug: 'usa-design-17-mini-case',
    name: 'USA Design #17 (Mini-Case)',
    industry: 'retail',
    bagType: 'USA-Made Collection',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 40,
    colorOptions: ['Stock USA Print'],
    availability: 'stock',
    image: '/catalog/usa/e8d3f531f4_CBC_USMC_17_eef04970.png',
    description: 'Mini-case USA design #17.',
    collections: ['usa-made'],
  },
  {
    sku: 'US22',
    slug: 'usa-design-22-mini-case',
    name: 'USA Design #22 (Mini-Case)',
    industry: 'retail',
    bagType: 'USA-Made Collection',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 40,
    colorOptions: ['Stock USA Print'],
    availability: 'stock',
    image: '/catalog/usa/3425f82475_CBC-MCUS022_b3b5f199.jpg',
    description: 'Mini-case USA design #22.',
    collections: ['usa-made'],
  },
  {
    sku: 'US23',
    slug: 'usa-design-23-mini-case',
    name: 'USA Design #23 (Mini-Case)',
    industry: 'retail',
    bagType: 'USA-Made Collection',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 40,
    colorOptions: ['Stock USA Print'],
    availability: 'stock',
    image: '/catalog/usa/2dc431ce03_CBC-MCUS023_7e438bf5.jpg',
    description: 'Mini-case USA design #23.',
    collections: ['usa-made'],
  },
  {
    sku: 'SMCCOG020',
    slug: 'seasonal-bag-design-cog020-mini-case',
    name: 'Seasonal Bag Design #COG020',
    industry: 'food-beverage',
    bagType: 'Seasonal Collection',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 40,
    colorOptions: ['Seasonal Stock Print'],
    availability: 'stock',
    image: '/catalog/holiday/30ead5639c_605425_ed10acaf.jpg',
    description: 'Mini-case seasonal COG020 design.',
    collections: ['seasonal'],
  },
  {
    sku: 'SMCCN030',
    slug: 'seasonal-bag-design-cn030-mini-case',
    name: 'Seasonal Bag Design #CN030',
    industry: 'food-beverage',
    bagType: 'Seasonal Collection',
    sizeOptions: ['#23 5x2x10', '#25 6x4x11'],
    caseCount: '500-1,000/case',
    startingPrice: 40,
    colorOptions: ['Seasonal Stock Print'],
    availability: 'stock',
    image: '/catalog/holiday/2c1dd3fe1d_605431_ed1a88ac.jpg',
    description: 'Mini-case seasonal CN030 design.',
    collections: ['seasonal'],
  },
]

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
  'retail',
  'food-beverage',
]
