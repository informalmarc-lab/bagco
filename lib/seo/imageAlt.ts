import type { CatalogProduct } from '@/lib/catalogProducts'
import type { RetailBagProduct } from '@/lib/retailCatalog'
import type { MylarProduct } from '@/lib/mylarCatalog'
import type { LabelProduct } from '@/lib/labelCatalog'
import type { CigarBagProduct } from '@/lib/cigarCatalog'

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

export function getMylarProductAlt(product: MylarProduct, detail?: string): string {
  const base = `${product.name}, ${product.finish.toLowerCase()} mylar bag`
  return detail ? `${base}, ${detail}` : base
}

export function getLabelProductAlt(product: LabelProduct): string {
  return `${product.name}, dispensary compliance labels`
}

export function getCigarProductAlt(product: CigarBagProduct, detail?: string): string {
  const material = normalize(product.name).includes('slider') ? '4 mil plastic cigar bag' : 'printed cigar bag'
  return detail
    ? `${product.name}, ${material}, ${detail}`
    : `${product.name}, ${material}, ${product.size}`
}
