import { NextResponse } from 'next/server'
import { calculateQuote, money } from '@/lib/quoteMath'
import type { ArtworkStatus, PrintProgramId, PrintSide } from '@/lib/products'

type QuoteContact = {
  dispensaryName?: string
  ownerName?: string
  name?: string
  email?: string
  phone?: string
  state?: string
  message?: string
}

function clean(value: unknown, fallback = 'Not provided') {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return fallback
}

function webhookField(name: string, value: unknown, inline = true) {
  return {
    name,
    value: clean(value).slice(0, 1024),
    inline,
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const contact = (body.contact || {}) as QuoteContact
    const webhookUrl = process.env.QUOTE_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Bud Bags quote webhook failed: QUOTE_WEBHOOK_URL is not configured.')
      return NextResponse.json({ error: 'Quote webhook is not configured.' }, { status: 500 })
    }

    if (body.type === 'contact') {
      if (!contact.name || !contact.email || !contact.phone) {
        return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 })
      }
    } else if (!contact.dispensaryName || !contact.ownerName || !contact.email || !contact.phone || !contact.state) {
      return NextResponse.json({ error: 'Complete contact information is required.' }, { status: 400 })
    }

    const isQuote = body.type !== 'contact'
    const estimate = isQuote
      ? calculateQuote({
          programId: body.programId as PrintProgramId,
          sizeId: String(body.sizeId || '25'),
          cases: Number(body.cases || 4),
          printSide: body.printSide as PrintSide,
          artworkStatus: body.artworkStatus as ArtworkStatus,
          state: clean(contact.state, 'CA'),
        })
      : null

    const title = isQuote ? 'Bud Bags quote request' : 'Bud Bags contact request'
    const ownerName = contact.ownerName || contact.name
    const plateFees = estimate
      ? [
          `Art/plate: ${money(estimate.artPlateFee)}`,
          `Back setup: ${money(estimate.backPrintSetupFee)}`,
          `3-color surcharge: ${money(estimate.surcharge)}`,
          `FSC placeholder: ${money(estimate.estimatedFsc)}`,
        ].join('\n')
      : 'Not provided'

    console.log('Bud Bags quote webhook POST starting', {
      type: body.type || 'quote',
      dispensaryName: contact.dispensaryName || contact.name || 'Not provided',
      email: contact.email || 'Not provided',
    })

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Bud Bags Quotes',
        avatar_url: 'https://budbags.net/favicon.ico',
        embeds: [
          {
            title,
            color: 0x16a34a,
            timestamp: new Date().toISOString(),
            fields: [
              webhookField('Dispensary Name', contact.dispensaryName || contact.name),
              webhookField('Owner Name', ownerName),
              webhookField('Email', contact.email),
              webhookField('Phone', contact.phone),
              webhookField('State', contact.state),
              webhookField('Bag Size', estimate ? `${estimate.sizeLabel} ${estimate.dimensions}` : undefined),
              webhookField('Cases', estimate?.cases),
              webhookField('Print Program', estimate?.programName),
              webhookField('Sides', body.printSide),
              webhookField('Artwork Status', body.artworkStatus),
              webhookField('Estimated Price', estimate ? money(estimate.estimatedTotal) : undefined),
              webhookField('Plate Fees', plateFees, false),
              webhookField('Freight Zone', estimate?.zoneGroup),
              webhookField('Message', contact.message, false),
            ],
            footer: { text: 'budbags.net quote webhook' },
          },
        ],
      }),
    })

    console.log('Bud Bags quote webhook POST finished', {
      status: response.status,
      ok: response.ok,
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '')
      console.error('Bud Bags quote webhook failed', {
        status: response.status,
        body: errorBody,
      })
      return NextResponse.json({ error: 'Quote webhook failed.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true, estimate })
  } catch (error) {
    console.error('Bud Bags quote request failed', error)
    return NextResponse.json({ error: 'Quote request failed.' }, { status: 500 })
  }
}
