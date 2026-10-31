import { NextResponse } from 'next/server'

// Server-only: never import this into client code.
const SAMPLES_DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1563327711017963532/tjR3lIwTI6i_Guez0dsIl5IQhKBIKiTD67rqhv3WMgpbI_xvLZTO6B2TqS77PTFUdKGm'

const SAMPLE_SIZES = [
  '#21 (3½×1½×10")',
  '#23 (5×2×10")',
  '#25 (6×3½×11")',
  '#26 (6½×4×13½")',
  '#28 (8×5×16½")',
] as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_REGEX = /^\d{5}(?:-\d{4})?$/
const STATE_REGEX = /^[A-Z]{2}$/
const SOURCE_REGEX = /^[a-z0-9_-]{1,32}$/

type RequestBody = Record<string, unknown>

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

function text(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function field(name: string, value: string, inline = false) {
  return { name, value: (value || 'N/A').slice(0, 1024), inline }
}

export async function POST(request: Request) {
  let body: RequestBody

  try {
    body = (await request.json()) as RequestBody
  } catch {
    return bad('Invalid request.')
  }

  // Honeypot: pretend success so bots don't retry.
  if (text(body.website, 200)) return NextResponse.json({ ok: true })

  const data = {
    name: text(body.name, 100),
    dispensary: text(body.dispensary, 150),
    street: text(body.street, 200),
    city: text(body.city, 100),
    state: text(body.state, 2).toUpperCase(),
    zip: text(body.zip, 10),
    phone: text(body.phone, 30),
    email: text(body.email, 200),
    notes: text(body.notes, 1000),
  }

  const missing = [
    ['Name', data.name],
    ['Dispensary', data.dispensary],
    ['Street address', data.street],
    ['City', data.city],
    ['State', data.state],
    ['ZIP', data.zip],
  ]
    .filter(([, value]) => !value)
    .map(([label]) => label)

  if (missing.length) return bad(`Please fill in: ${missing.join(', ')}.`)
  if (!STATE_REGEX.test(data.state)) return bad('State must be a 2-letter abbreviation.')
  if (!ZIP_REGEX.test(data.zip)) return bad('Please enter a valid ZIP code.')
  if (!data.phone && !data.email) return bad('Please give us a phone number or email so we can reach you.')
  if (data.email && !EMAIL_REGEX.test(data.email)) return bad('Please enter a valid email address.')
  if (data.phone && data.phone.replace(/\D/g, '').length < 10) return bad('Please enter a valid phone number.')

  const sizes = Array.isArray(body.sizes)
    ? SAMPLE_SIZES.filter((size) => (body.sizes as unknown[]).includes(size))
    : []

  const rawSource = text(body.source, 32).toLowerCase()
  const source = SOURCE_REGEX.test(rawSource) ? rawSource : 'direct'
  const submittedAt = new Date().toISOString()

  try {
    const response = await fetch(SAMPLES_DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        username: 'Bag Supply Co Samples',
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: 'New sample request',
            color: 1980757,
            timestamp: submittedAt,
            fields: [
              field('Name', data.name, true),
              field('Dispensary', data.dispensary, true),
              field('Address', `${data.street}\n${data.city}, ${data.state} ${data.zip}`),
              field('Phone', data.phone, true),
              field('Email', data.email, true),
              field('Sizes', sizes.join('\n') || 'None selected'),
              field('Notes', data.notes),
              field('Source', source, true),
            ],
            footer: { text: 'Bag Supply Co /samples' },
          },
        ],
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error(`Samples webhook failed (${response.status}). ${detail}`)
      return bad('Could not send your request.', 502)
    }
  } catch (error) {
    console.error('Samples webhook failed:', error)
    return bad('Could not send your request.', 502)
  }

  return NextResponse.json({ ok: true })
}
