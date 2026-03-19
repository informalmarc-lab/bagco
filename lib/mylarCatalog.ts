import mylarData from '@/data/mylarProducts.json'

export type MylarCatalogType = 'designer-printed' | 'plain-stock'

export type MylarProduct = {
  sku: string
  slug: string
  name: string
  size: string
  finish: string
  quantity: number
  type: MylarCatalogType
  price: number
  image: string
  description: string
}

const PRODUCTS = (mylarData as { products: MylarProduct[] }).products

export function getAllMylarProducts(): MylarProduct[] {
  return [...PRODUCTS]
}

export function getMylarProductBySlug(slug: string): MylarProduct | undefined {
  return PRODUCTS.find((item) => item.slug === slug)
}

export function getMylarProductsByType(type: MylarCatalogType): MylarProduct[] {
  return PRODUCTS.filter((item) => item.type === type)
}

export function getMylarStartingPrice(): number {
  if (PRODUCTS.length === 0) return 0
  return Math.min(...PRODUCTS.map((item) => item.price))
}
