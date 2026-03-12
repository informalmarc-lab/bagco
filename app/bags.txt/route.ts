import { NextResponse } from 'next/server'
import { getAllCatalogProducts, INDUSTRY_LABELS } from '@/lib/catalogProducts'

export async function GET() {
  const lines = getAllCatalogProducts().map(
    (product) => `${product.name} | SKU ${product.sku} | ${INDUSTRY_LABELS[product.industry]}`,
  )

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
