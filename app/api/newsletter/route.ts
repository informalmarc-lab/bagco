import { NextResponse } from 'next/server'
import { submitLeadToWebhook } from '@/lib/leadWebhook'

type NewsletterPayload = {
  email?: string
  source?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let payload: NewsletterPayload

  try {
    payload = (await request.json()) as NewsletterPayload
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }

  const email = payload.email?.trim()
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
  }

  const result = await submitLeadToWebhook('newsletter', {
    email,
    source: payload.source || 'unknown',
    submitted_at: new Date().toISOString(),
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({ ok: true })
}
