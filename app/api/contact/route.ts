import { NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK || ''
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function safeText(value: unknown, max = 2000): string {
  return String(value || '').trim().slice(0, max)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const name = safeText(data?.name, 120)
    const email = safeText(data?.email, 180)
    const message = safeText(data?.message, 4000)
    const website = safeText(data?.website, 255)

    // Honeypot spam field: silently accept to avoid bot retries.
    if (website) {
      return NextResponse.json({ success: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (!WEBHOOK_URL) {
      return NextResponse.json({ error: 'Contact form endpoint is not configured yet.' }, { status: 503 })
    }

    const submissionType = safeText(data.submissionType, 140) || 'Contact Form'
    const sourcePage = safeText(data.sourcePage, 240) || 'N/A'

    const payload = {
      content: `**New Contact Form Submission**
**Type:** ${submissionType}
**Source Page:** ${sourcePage}
**Name:** ${name}
**Email:** ${email}
**Phone:** ${safeText(data.phone, 80) || 'N/A'}
**Company:** ${safeText(data.company, 140) || 'N/A'}
**Bag Type:** ${safeText(data.bagType, 140) || 'N/A'}
**Quantity:** ${safeText(data.quantity, 120) || 'N/A'}
**Message:** ${message}`,
    }

    const discordRes = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!discordRes.ok) {
      const text = await discordRes.text().catch(() => '')
      console.error('Discord webhook responded with', discordRes.status, text)
      return NextResponse.json({ error: 'Failed to forward to webhook' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
