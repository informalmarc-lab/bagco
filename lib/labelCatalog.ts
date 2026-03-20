import labelData from '@/data/labelProducts.json'

export type LabelProduct = {
  sku: string
  slug: string
  name: string
  quantity: number
  price: number
  shippingBadge: string
  image: string
  description: string
}

const PRODUCTS = (labelData as { products: LabelProduct[] }).products

export function getAllLabelProducts(): LabelProduct[] {
  return [...PRODUCTS]
}
