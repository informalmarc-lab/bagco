import products from '@/data/makeYourQuoteProducts.json'
import zipZones from '@/data/makeYourQuoteZipZones.json'
import { type PrintSides, type QuoteCategory, type QuoteProduct } from '@/lib/makeYourQuote/types'

export const quoteProducts = products as unknown as QuoteProduct[]
export const quoteCategories: QuoteCategory[] = [
  'Prescription Bags',
  'Flat & Gusset Bags',
  'SOS Grocery Bags',
  'Plastic Bags',
]

export const DISCLAIMER = 'Final pricing subject to artwork review, shipping conditions, and production requirements.'

export function money(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function quantityTiers(product: QuoteProduct): number[] {
  return Object.keys(product.prices)
    .map(Number)
    .sort((a, b) => a - b)
}

export function getCaseCount(product: QuoteProduct, quantity: number): number {
  return Math.ceil(quantity / product.pack)
}

export function getTierPrice(product: QuoteProduct, quantity: number): number {
  return product.prices[String(quantity)] ?? 0
}

export function getSubtotal(product: QuoteProduct, quantity: number): number {
  return (quantity / 1000) * getTierPrice(product, quantity)
}

export function getPlateFees(product: QuoteProduct, printSides: PrintSides): number {
  if (!product.customPrintable) return 0
  return printSides === 'Front + back' ? 110 : 75
}

export function getLeadTime(product: QuoteProduct): string {
  return product.customPrintable ? 'Custom printed paper bags typically ship in 3-4 weeks after artwork approval.' : 'Stock plastic bags typically ship after quote review and availability confirmation.'
}

export function getUpsZone(zip: string): number | null {
  const prefix = zip.replace(/\D/g, '').slice(0, 3)
  if (prefix.length !== 3) return null
  const zones = zipZones as Record<string, number>
  return zones[prefix] ?? null
}

export function getFscRate(zone: number | null): number | null {
  if (!zone) return null
  if (zone >= 2 && zone <= 3) return 0.05
  if (zone >= 4 && zone <= 6) return 0.075
  if (zone >= 7 && zone <= 8) return 0.1
  return null
}

export function getFreight(product: QuoteProduct, quantity: number, zip: string, subtotal: number) {
  const caseCount = getCaseCount(product, quantity)
  const zipPrefix = zip.replace(/\D/g, '').slice(0, 3)
  const upsZone = getUpsZone(zip)

  if (zipPrefix.length !== 3) {
    return {
      fsc: null,
      fscRate: null,
      upsZone: null,
      message: 'Enter ZIP to estimate shipping',
    }
  }

  if (!upsZone) {
    return {
      fsc: null,
      fscRate: null,
      upsZone: null,
      message: 'Enter valid ZIP or review required',
    }
  }

  if (caseCount < 8) {
    return {
      fsc: null,
      fscRate: null,
      upsZone,
      message: 'Shipping calculated after quote review',
    }
  }

  const fscRate = getFscRate(upsZone)

  return {
    fsc: subtotal * (fscRate ?? 0),
    fscRate,
    upsZone,
    message: `Estimated FSC based on UPS Zone ${upsZone}`,
  }
}
