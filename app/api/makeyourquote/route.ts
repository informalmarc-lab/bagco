import { NextResponse } from 'next/server'
import { DISCLAIMER, getFreight, getLeadTime, getPlateFees, getSubtotal, quoteProducts } from '@/lib/makeYourQuote/calculate'
import { submitQuoteToDiscord } from '@/lib/makeYourQuote/quoteWebhook'
import { type PrintSides, type QuoteSubmissionPayload } from '@/lib/makeYourQuote/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_REGEX = /^\d{5}(?:-\d{4})?$/

type RequestBody = {
  item?: string
  quantity?: number
  printColors?: 0 | 1 | 2 | 3
  printSides?: PrintSides | 'Stock only'
  customer?: {
    name?: string
    company?: string
    email?: string
    phone?: string
    zip?: string
  }
  sourcePath?: string
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export async function POST(request: Request) {
  let body: RequestBody

  try {
    body = (await request.json()) as RequestBody
  } catch {
    return bad('Invalid JSON payload.')
  }

  const product = quoteProducts.find((item) => item.item === body.item)
  if (!product) return bad('Valid product selection is required.')

  const quantity = Number(body.quantity)
  if (!Number.isFinite(quantity) || !product.prices[String(quantity)]) {
    return bad('Quantity must match an available pricing tier.')
  }

  const customer = {
    name: body.customer?.name?.trim() || '',
    company: body.customer?.company?.trim() || '',
    email: body.customer?.email?.trim() || '',
    phone: body.customer?.phone?.trim() || '',
    zip: body.customer?.zip?.trim() || '',
  }

  if (!customer.name) return bad('Name is required.')
  if (!EMAIL_REGEX.test(customer.email)) return bad('Valid email is required.')
  if (!ZIP_REGEX.test(customer.zip)) return bad('Valid ZIP code is required.')

  const caseCount = Math.ceil(quantity / product.pack)
  const printColors = product.customPrintable ? body.printColors : 0
  const printSides = product.customPrintable ? body.printSides : 'Stock only'

  if (product.customPrintable) {
    if (printColors !== 1 && printColors !== 2 && printColors !== 3) return bad('Print colors are required.')
    if (printSides !== 'Front only' && printSides !== 'Front + back') return bad('Print sides are required.')
    if (caseCount < 4) return bad('Custom printed bags require a minimum order of 4 cases.')
  }

  const subtotal = getSubtotal(product, quantity)
  const plateFees = product.customPrintable ? getPlateFees(product, printSides as PrintSides) : 0
  const freight = getFreight(product, quantity, customer.zip, subtotal)
  const estimatedTotal = freight.fsc === null ? null : subtotal + plateFees + freight.fsc

  const payload: QuoteSubmissionPayload = {
    customer,
    product,
    quantity,
    caseCount,
    printColors: (printColors || 0) as 0 | 1 | 2 | 3,
    printSides: printSides as PrintSides | 'Stock only',
    subtotal,
    plateFees,
    fsc: freight.fsc,
    fscRate: freight.fscRate,
    upsZone: freight.upsZone,
    estimatedTotal,
    freightMessage: freight.message,
    leadTime: getLeadTime(product),
    disclaimer: DISCLAIMER,
    submittedAt: new Date().toISOString(),
    sourcePath: body.sourcePath || '/makeyourquote',
  }

  const result = await submitQuoteToDiscord(payload)
  if (!result.ok) return bad(result.error, result.status)

  return NextResponse.json({ ok: true })
}
