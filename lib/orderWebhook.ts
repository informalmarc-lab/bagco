import { formatCartUnit, getCartLineTotal, getCartSubtotal, type CartItem } from '@/lib/cart'
import type { OrderCustomer } from '@/lib/order'

const ORDER_DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1484349392273014815/rw8GncJS2FFjeJceoeW7AGZnBoX1IFEjhjArJpicm6AgFfEJ7Wgj2BuNVxxzReaZyu3a'
const EMBED_COLOR = 0x1e4d2b

type OrderSubmissionResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

function money(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}

function clampField(value: string, max = 1024): string {
  const clean = value.trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 15)}\n...[truncated]`
}

function buildPaymentPreference(customer: OrderCustomer): string {
  if (customer.paymentPreference === 'Card') {
    return 'Card - send Stripe payment link via email'
  }
  if (customer.paymentPreference === 'Other') {
    return customer.otherPaymentMethod
      ? `Other - ${customer.otherPaymentMethod}`
      : 'Other'
  }
  return 'Check'
}

function buildItemsField(items: CartItem[]): string {
  const lines = items.map((item) => {
    const details = [item.name]
    if (item.sizeLabel) details.push(item.sizeLabel)
    details.push(formatCartUnit(item.quantity, item.unit))
    details.push(money(getCartLineTotal(item)))
    return `\u2022 ${details.join(' \u2014 ')}`
  })

  return clampField(lines.join('\n'))
}

async function postJson(url: string, payload: Record<string, unknown>): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
}

export async function submitOrderToWebhook({
  customer,
  items,
  submittedAt,
}: {
  customer: OrderCustomer
  items: CartItem[]
  submittedAt: string
}): Promise<OrderSubmissionResult> {
  const customerField = customer.companyName
    ? `${customer.fullName}\n${customer.companyName}`
    : customer.fullName
  const notes = customer.orderNotes.trim()
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [
    { name: '\u{1F464} Customer', value: clampField(customerField) },
    { name: '\u{1F4E7} Email', value: clampField(customer.email), inline: true },
    { name: '\u{1F4DE} Phone', value: clampField(customer.phone), inline: true },
    { name: '\u{1F4E6} Ship To', value: clampField(customer.shippingAddress) },
    { name: '\u{1F4B3} Payment Preference', value: clampField(buildPaymentPreference(customer)) },
    { name: '\u{1F6D2} Items Ordered', value: buildItemsField(items) },
    { name: '\u{1F4B0} Order Total', value: money(getCartSubtotal(items)), inline: true },
  ]

  if (notes) {
    fields.push({ name: '\u{1F4DD} Notes', value: clampField(notes) })
  }

  try {
    const response = await postJson(ORDER_DISCORD_WEBHOOK_URL, {
      username: 'Bag Supply Co Orders',
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: '\u{1F6CD}\uFE0F New Order \u2014 BagSupplyCo',
          color: EMBED_COLOR,
          fields,
          footer: {
            text: 'BagSupplyCo \u2022 bagsupplyco.com',
          },
          timestamp: submittedAt,
        },
      ],
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      return {
        ok: false,
        status: 502,
        error: `Order webhook request failed (${response.status}). ${body}`.trim(),
      }
    }

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unexpected server error',
    }
  }
}
