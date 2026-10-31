import { NextResponse } from 'next/server'

const DISTRIBUTOR_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1486859202654634156/Xhk1uvtu9K0q34fsWtyg2y2wDITeBbKzOvwh8PFZ9354586yzBf68JdBW7Im7cw0RO9a'

const CONTACT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type DistributorPayload = {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  monthlyVolume?: unknown
  interestedProducts?: unknown
  message?: unknown
  website?: unknown
  sourcePage?: unknown
  submitted_at?: unknown
}

function safeText(value: unknown, max = 2000): string {
  return String(value || '').trim().slice(0, max)
}

function normalizeProducts(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => safeText(item, 120))
    .filter(Boolean)
    .slice(0, 12)
}

function createFallbackMailto(data: {
  name: string
  company: string
  email: string
  phone: string
  monthlyVolume: string
  interestedProducts: string[]
  message: string
}): string {
  const body = [
    'Distributor Program Request',
    '',
    `Name: ${data.name || 'N/A'}`,
    `Company: ${data.company || 'N/A'}`,
    `Email: ${data.email || 'N/A'}`,
    `Phone: ${data.phone || 'N/A'}`,
    `Estimated Monthly Volume: ${data.monthlyVolume || 'N/A'}`,
    `Interested Products: ${data.interestedProducts.length > 0 ? data.interestedProducts.join(', ') : 'Not specified'}`,
    '',
    'Message:',
    data.message || 'N/A',
  ].join('\n')

  return `mailto:info@bagsupplyco.com?subject=${encodeURIComponent('Distributor Pricing Sheet Request')}&body=${encodeURIComponent(body)}`
}

function buildWebhookContent(data: {
  name: string
  company: string
  email: string
  phone: string
  monthlyVolume: string
  interestedProducts: string[]
  message: string
  sourcePage: string
  submittedAt: string
}): string {
  return [
    'New Distributor Program Request',
    '',
    `Name: ${data.name || 'N/A'}`,
    `Company: ${data.company || 'N/A'}`,
    `Email: ${data.email || 'N/A'}`,
    `Phone: ${data.phone || 'N/A'}`,
    `Estimated Monthly Volume: ${data.monthlyVolume || 'N/A'}`,
    `Interested Products: ${data.interestedProducts.length > 0 ? data.interestedProducts.join(', ') : 'Not specified'}`,
    `Source Page: ${data.sourcePage || '/distributors'}`,
    `Submitted At: ${data.submittedAt}`,
    '',
    'Message:',
    data.message || 'N/A',
  ].join('\n')
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as DistributorPayload
    const data = {
      name: safeText(payload.name, 120),
      company: safeText(payload.company, 140),
      email: safeText(payload.email, 180),
      phone: safeText(payload.phone, 80),
      monthlyVolume: safeText(payload.monthlyVolume, 80),
      interestedProducts: normalizeProducts(payload.interestedProducts),
      message: safeText(payload.message, 4000),
      website: safeText(payload.website, 255),
      sourcePage: safeText(payload.sourcePage, 240) || '/distributors',
      submittedAt: safeText(payload.submitted_at, 80) || new Date().toISOString(),
    }

    const fallbackMailto = createFallbackMailto(data)

    if (data.website) {
      return NextResponse.json({ success: true })
    }

    if (!data.name || !data.company || !data.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!CONTACT_EMAIL_REGEX.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const response = await fetch(DISTRIBUTOR_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'BagSupplyCo Distributor Leads',
        allowed_mentions: { parse: [] },
        content: buildWebhookContent(data),
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('Distributor webhook failed:', response.status, body)
      return NextResponse.json(
        {
          error: 'Webhook request failed',
          fallbackMailto,
        },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Distributor API error:', error)
    return NextResponse.json(
      {
        error: 'Server error',
        fallbackMailto:
          'mailto:info@bagsupplyco.com?subject=Distributor%20Pricing%20Sheet%20Request',
      },
      { status: 500 },
    )
  }
}
