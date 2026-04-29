import type { CatalogProduct } from '@/lib/catalogProducts'

export function getCatalogImageClass(product: CatalogProduct): string {
  if (product.industry === 'custom') {
    return 'object-contain p-4'
  }

  return 'object-cover'
}
