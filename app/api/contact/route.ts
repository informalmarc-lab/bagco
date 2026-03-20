import { NextResponse } from 'next/server'
import {
  normalizeContactSubmission,
  validateContactSubmission,
} from '@/lib/contactSubmission'
import { submitLeadToWebhook } from '@/lib/leadWebhook'

export async function POST(req: Request) {
  try {
    const data = normalizeContactSubmission(await req.json())

    // Honeypot spam field: silently accept to avoid bot retries.
    if (data.website) {
      return NextResponse.json({ success: true })
    }

    const validation = validateContactSubmission(data)
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    const result = await submitLeadToWebhook('contact', data)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
