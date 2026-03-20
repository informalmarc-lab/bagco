import { NextResponse } from 'next/server'
import { isCartItem } from '@/lib/cart'
import type { OrderCustomer, OrderSubmissionPayload } from '@/lib/order'
import { submitOrderToWebhook } from '@/lib/orderWebhook'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function safeText(value: unknown, max = 4000): string {
  return String(value || '').trim().slice(0, max)
}

function parseCustomer(input: unknown): OrderCustomer | null {
  if (!input || typeof input !== 'object') return null
  const customer = input as Partial<OrderCustomer>
  const paymentPreference =
    customer.paymentPreference === 'Check' ||
    customer.paymentPreference === 'Card' ||
    customer.paymentPreference === 'Other'
      ? customer.paymentPreference
      : ''

  return {
    fullName: safeText(customer.fullName, 160),
    companyName: safeText(customer.companyName, 160),
    shippingAddress: safeText(customer.shippingAddress, 1000),
    email: safeText(customer.email, 180),
    phone: safeText(customer.phone, 120),
    orderNotes: safeText(customer.orderNotes, 2000),
    paymentPreference: paymentPreference as OrderCustomer['paymentPreference'],
    otherPaymentMethod: safeText(customer.otherPaymentMethod, 240),
  }
}

export async function POST(request: Request) {
  let body: OrderSubmissionPayload

  try {
    body = (await request.json()) as OrderSubmissionPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const customer = parseCustomer(body.customer)
  const items = Array.isArray(body.items) ? body.items.filter(isCartItem) : []
  const submittedAt = safeText(body.submittedAt, 80) || new Date().toISOString()

  if (!customer) {
    return NextResponse.json({ error: 'Customer payload is required.' }, { status: 400 })
  }

  if (!customer.fullName) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 })
  }
  if (!customer.shippingAddress) {
    return NextResponse.json({ error: 'Shipping address is required.' }, { status: 400 })
  }
  if (!customer.email || !EMAIL_REGEX.test(customer.email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
  }
  if (!customer.phone) {
    return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 })
  }
  if (!customer.paymentPreference) {
    return NextResponse.json({ error: 'Payment preference is required.' }, { status: 400 })
  }
  if (customer.paymentPreference === 'Other' && !customer.otherPaymentMethod) {
    return NextResponse.json({ error: 'Describe the preferred payment method.' }, { status: 400 })
  }
  if (items.length === 0) {
    return NextResponse.json({ error: 'At least one cart item is required.' }, { status: 400 })
  }

  const result = await submitOrderToWebhook({ customer, items, submittedAt })
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({ ok: true })
}
