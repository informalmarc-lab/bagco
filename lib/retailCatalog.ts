export type RetailDiscountTier = {
  label: string
  casesLabel: string
  discountPercent: number
  freeShipping: boolean
}

export type RetailBagVariant = {
  slug: string
  label: string
  caseCount: number
  price: number
}

export type RetailBagProduct = {
  sku: string
  slug: string
  name: string
  description: string
  image: string
  gallery: string[]
  variants: RetailBagVariant[]
  shippingNote: string
}

const RETAIL_PRODUCTS: RetailBagProduct[] = [
  {
    sku: 'RT-TYB',
    slug: 'thank-you-t-shirt-bags',
    name: '"Thank You" T-Shirt Bags',
    description:
      'White plastic t-shirt bags with red "Thank You" print. Perfect for retail checkout, convenience stores, and gift shops.',
    image: '/images/catalog/retail-bags/thank-you-t-shirt-bags-main.webp',
    gallery: [
      '/images/catalog/retail-bags/thank-you-t-shirt-bags-main.webp',
      '/images/catalog/retail-bags/thank-you-t-shirt-bags-alt.webp',
    ],
    variants: [
      {
        slug: 'large',
        label: 'Large',
        caseCount: 1000,
        price: 45,
      },
      {
        slug: 'small',
        label: 'Small',
        caseCount: 500,
        price: 30,
      },
    ],
    shippingNote: 'Order 2+ cases and get free shipping. Single case orders ship at calculated rate.',
  },
]

export const RETAIL_DISCOUNT_TIERS: RetailDiscountTier[] = [
  {
    label: 'Single Case',
    casesLabel: '1 case',
    discountPercent: 0,
    freeShipping: false,
  },
  {
    label: 'Core Reorder',
    casesLabel: '2-4 cases',
    discountPercent: 0,
    freeShipping: true,
  },
  {
    label: 'Volume Tier',
    casesLabel: '5-9 cases',
    discountPercent: 5,
    freeShipping: true,
  },
  {
    label: 'Best Case Pricing',
    casesLabel: '10+ cases',
    discountPercent: 7,
    freeShipping: true,
  },
]

export function getAllRetailProducts(): RetailBagProduct[] {
  return [...RETAIL_PRODUCTS]
}

export function getRetailProductBySlug(slug: string): RetailBagProduct | undefined {
  return RETAIL_PRODUCTS.find((product) => product.slug === slug)
}

export function getRetailStartingPrice(): number {
  return Math.min(...RETAIL_PRODUCTS.flatMap((product) => product.variants.map((variant) => variant.price)))
}

export function getDiscountedRetailPrice(price: number, discountPercent: number): number {
  if (discountPercent <= 0) return price
  return Number((price * (1 - discountPercent / 100)).toFixed(2))
}
