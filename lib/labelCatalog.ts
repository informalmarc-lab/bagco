import labelData from '@/data/labelProducts.json'
import { cleanTextDeep } from './utils/cleanText.ts'

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

const PRODUCTS = ((labelData as { products: LabelProduct[] }).products).map((product) =>
  cleanTextDeep(product),
)

export function getAllLabelProducts(): LabelProduct[] {
  return [...PRODUCTS]
}
