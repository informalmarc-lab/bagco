import { NextResponse } from 'next/server'
import { submitLeadToWebhook } from '@/lib/leadWebhook'

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

    const result = await submitLeadToWebhook('contact', {
      submissionType: safeText(data.submissionType, 140) || 'Contact Form',
      sourcePage: safeText(data.sourcePage, 240) || 'N/A',
      name,
      email,
      phone: safeText(data.phone, 80),
      company: safeText(data.company, 140),
      bagType: safeText(data.bagType, 140),
      quantity: safeText(data.quantity, 120),
      message,
      industry: safeText(data.industry, 120),
      shippingPreference: safeText(data.shippingPreference, 120),
      existingCustomer: safeText(data.existingCustomer, 40),
      submitted_at: new Date().toISOString(),
    })

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
