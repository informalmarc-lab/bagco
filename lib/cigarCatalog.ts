import { cleanTextDeep } from './utils/cleanText.ts'

export type CigarProductUnit = 'case' | 'pack'

export type CigarDiscountTier = {
  label: string
  quantityLabel: string
  discountPercent: number
  freeShipping: boolean
}

export type CigarBagProduct = {
  sku: string
  slug: string
  name: string
  size: string
  quantity: number
  unit: CigarProductUnit
  price: number
  image: string
  description: string
}

const CIGAR_PRODUCTS = ([
  {
    sku: 'CIG-3X10',
    slug: 'printed-cigar-bags-3x10',
    name: 'Printed Cigar Bags',
    size: '3 x 10',
    quantity: 1000,
    unit: 'case',
    price: 115,
    image: '/images/catalog/cigar-bags/cigar-bag-3x10.jpg',
    description: 'Printed cigar bags in a compact 3 x 10 format for singles, slim accessories, and front-counter cigar checkout.',
  },
  {
    sku: 'CIG-5X10',
    slug: 'printed-cigar-bags-5x10',
    name: 'Printed Cigar Bags',
    size: '5 x 10',
    quantity: 1000,
    unit: 'case',
    price: 120,
    image: '/images/catalog/cigar-bags/cigar-bag-5x10.jpg',
    description: 'Printed cigar bags in a versatile 5 x 10 size for everyday cigar shop checkout, sampler bundles, and lounge carryout.',
  },
  {
    sku: 'CIG-8X10',
    slug: 'printed-cigar-bags-8x10',
    name: 'Printed Cigar Bags',
    size: '8 x 10',
    quantity: 1000,
    unit: 'case',
    price: 135,
    image: '/images/catalog/cigar-bags/cigar-bag-8x10.jpg',
    description: 'Printed cigar bags in a larger 8 x 10 format for boxed purchases, multi-cigar orders, and wider retail bag displays.',
  },
  {
    sku: 'CIG-SLD-6.5X10',
    slug: 'slider-cigar-bags-4-mil-6-5x10',
    name: 'Slider Cigar Bags 4 Mil',
    size: '6.5 x 10',
    quantity: 100,
    unit: 'pack',
    price: 175,
    image: '/images/catalog/cigar-bags/cigar-bag-slider-6x10.jpg',
    description: '4 mil slider cigar bags with a larger 6.5 x 10 footprint for premium presentation, humidor-friendly storage, and protected multi-stick packaging.',
  },
] satisfies CigarBagProduct[]).map((product) => cleanTextDeep(product) as CigarBagProduct)

export const CIGAR_DISCOUNT_TIERS = ([
  {
    label: 'Single Case',
    quantityLabel: '1 case',
    discountPercent: 0,
    freeShipping: false,
  },
  {
    label: 'Free Shipping',
    quantityLabel: '2-4 cases',
    discountPercent: 0,
    freeShipping: true,
  },
  {
    label: 'Volume Tier',
    quantityLabel: '5-9 cases',
    discountPercent: 5,
    freeShipping: true,
  },
  {
    label: 'Best Case Pricing',
    quantityLabel: '10+ cases',
    discountPercent: 7,
    freeShipping: true,
  },
] satisfies CigarDiscountTier[]).map((tier) => cleanTextDeep(tier) as CigarDiscountTier)

export function getAllCigarProducts(): CigarBagProduct[] {
  return [...CIGAR_PRODUCTS]
}

export function getCigarProductBySlug(slug: string): CigarBagProduct | undefined {
  return CIGAR_PRODUCTS.find((product) => product.slug === slug)
}

export function getCigarStartingPrice(): number {
  return Math.min(...CIGAR_PRODUCTS.map((product) => product.price))
}

export function getDiscountedCigarPrice(price: number, discountPercent: number): number {
  if (discountPercent <= 0) return price
  return Number((price * (1 - discountPercent / 100)).toFixed(2))
}

export function formatCigarQuantityLabel(quantity: number, unit: CigarProductUnit): string {
  return `${quantity.toLocaleString('en-US')}/${unit}`
}
