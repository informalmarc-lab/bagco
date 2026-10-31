import type { CatalogProduct } from '@/lib/catalogProducts'
import type { RetailBagProduct } from '@/lib/retailCatalog'

function normalize(value: string): string {
  return value.toLowerCase()
}

function getCatalogMaterial(product: CatalogProduct): string {
  const haystack = normalize(`${product.name} ${product.description} ${product.bagType}`)
  if (haystack.includes('plastic')) return 'plastic'
  if (haystack.includes('kraft')) return 'kraft paper'
  if (haystack.includes('white')) return 'white paper'
  return 'paper'
}

export function getCatalogProductAlt(product: CatalogProduct, detail?: string): string {
  const suffix = detail ? `, ${detail}` : ''
  return `${product.name}, ${getCatalogMaterial(product)} bag${suffix}`
}

export function getRetailProductAlt(product: RetailBagProduct, detail?: string): string {
  const suffix = detail ? `, ${detail}` : ''
  return `${product.name}, white plastic checkout bag${suffix}`
}

