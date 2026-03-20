export type CartUnit = 'case' | 'pack'

export type CartItemKind = 'catalog' | 'mylar' | 'label'

export type CartItem = {
  id: string
  kind: CartItemKind
  sku: string
  slug: string
  name: string
  image: string
  productHref: string
  quantity: number
  unitPrice: number
  unit: CartUnit
  sizeLabel?: string
}

export const CART_STORAGE_KEY = 'bagsupplyco-cart-v1'

export function formatCartUnit(quantity: number, unit: CartUnit): string {
  return `${quantity} ${unit}${quantity === 1 ? '' : 's'}`
}

export function getCartLineTotal(item: CartItem): number {
  return item.unitPrice * item.quantity
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getCartLineTotal(item), 0)
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<CartItem>
  return (
    typeof item.id === 'string' &&
    typeof item.kind === 'string' &&
    typeof item.sku === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.productHref === 'string' &&
    typeof item.quantity === 'number' &&
    Number.isFinite(item.quantity) &&
    typeof item.unitPrice === 'number' &&
    Number.isFinite(item.unitPrice) &&
    (item.unit === 'case' || item.unit === 'pack')
  )
}
