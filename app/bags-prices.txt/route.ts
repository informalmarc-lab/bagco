import { NextResponse } from 'next/server'
import { getAllCatalogProducts, INDUSTRY_LABELS, money } from '@/lib/catalogProducts'

export async function GET() {
  const lines = getAllCatalogProducts().map((product) => {
    const sizePricing = product.sizePricing?.length
      ? product.sizePricing.map((row) => `${row.label} - ${money(row.price)}`).join('; ')
      : `Starting price ${money(product.startingPrice)}`
    return `${product.name} | SKU ${product.sku} | ${INDUSTRY_LABELS[product.industry]} | ${sizePricing}`
  })

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
