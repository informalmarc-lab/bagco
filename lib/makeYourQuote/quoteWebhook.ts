import { type QuoteSubmissionPayload } from '@/lib/makeYourQuote/types'

type SubmitQuoteResult = { ok: true; skipped?: boolean } | { ok: false; status: number; error: string }

export type CouponSubmissionPayload = {
  name: string
  email: string
  phone: string
  submittedAt: string
  sourcePath: string
}

export const QUOTE_DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1507883597862801418/7wWBhLoHiH1qE2tvesCH_XP1xioMgOmT40XFhJSuq8KdkXs5FTo0vwegpENhXJ6I4Isk'

function field(name: string, value: string, inline = false) {
  return {
    name,
    value: value || 'N/A',
    inline,
  }
}

function fmtMoney(value: number | null): string {
  if (value === null) return 'Review required'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export async function submitQuoteToDiscord(payload: QuoteSubmissionPayload): Promise<SubmitQuoteResult> {
  const webhookUrl = QUOTE_DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('QUOTE_DISCORD_WEBHOOK_URL is not configured. Quote accepted without Discord notification.')
    return { ok: true, skipped: true }
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      username: 'Bag Supply Co Quotes',
      allowed_mentions: { parse: [] },
      content: `New quote request from ${payload.customer.name} (${payload.customer.email})`,
      embeds: [
        {
          title: `Quote Request - ${payload.customer.name}`,
          color: 1980757,
          timestamp: payload.submittedAt,
          description: `**Estimated Total:** ${fmtMoney(payload.estimatedTotal)}\n**Product:** ${payload.product.category} ${payload.product.item}\n**Submitted:** ${new Date(payload.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`,
          fields: [
            field(
              'Customer Contact',
              [
                `**Name:** ${payload.customer.name}`,
                `**Company:** ${payload.customer.company || 'N/A'}`,
                `**Email:** ${payload.customer.email}`,
                `**Phone:** ${payload.customer.phone || 'N/A'}`,
                `**ZIP:** ${payload.customer.zip}`,
              ].join('\n'),
            ),
            field(
              'Order Info',
              [
                `**Category:** ${payload.product.category}`,
                `**Item:** ${payload.product.item}`,
                `**Size:** ${payload.product.size}`,
                `**Material:** ${payload.product.material}`,
                `**Quantity:** ${payload.quantity.toLocaleString()}`,
                `**Case Count:** ${payload.caseCount}`,
                `**Print:** ${payload.printColors ? `${payload.printColors} color, ${payload.printSides}` : 'Stock only'}`,
              ].join('\n'),
            ),
            field(
              'Quote Totals',
              [
                `**Subtotal:** ${fmtMoney(payload.subtotal)}`,
                `**Plate Fees:** ${fmtMoney(payload.plateFees)}`,
                `**Shipping/FSC:** ${payload.fsc === null ? payload.freightMessage : fmtMoney(payload.fsc)}`,
                `**Estimated Total:** ${fmtMoney(payload.estimatedTotal)}`,
              ].join('\n'),
            ),
            field('Lead Time', payload.leadTime, false),
            field('Source', payload.sourcePath || '/makeyourquote'),
          ],
          footer: {
            text: 'Bag Supply Co quote configurator',
          },
        },
      ],
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    return { ok: false, status: 502, error: `Quote webhook failed (${response.status}). ${body}`.trim() }
  }

  return { ok: true }
}

export async function submitCouponToDiscord(payload: CouponSubmissionPayload): Promise<SubmitQuoteResult> {
  const response = await fetch(QUOTE_DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      username: 'Bag Supply Co Coupons',
      allowed_mentions: { parse: [] },
      content: `COUPON - Employee Price request from ${payload.name} (${payload.email})`,
      embeds: [
        {
          title: 'COUPON - Employee Price',
          color: 11960634,
          timestamp: payload.submittedAt,
          fields: [
            field(
              'Customer Contact',
              [
                `**Name:** ${payload.name}`,
                `**Email:** ${payload.email}`,
                `**Phone:** ${payload.phone}`,
              ].join('\n'),
            ),
            field('Offer', 'Employee Price coupon', true),
            field('Source', payload.sourcePath || '/', true),
          ],
          footer: {
            text: 'Bag Supply Co coupon capture',
          },
        },
      ],
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    return { ok: false, status: 502, error: `Coupon webhook failed (${response.status}). ${body}`.trim() }
  }

  return { ok: true }
}
