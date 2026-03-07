import { NextResponse } from 'next/server'

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

  return NextResponse.json({
    ok: true,
    email,
    source: payload.source || 'unknown',
  })
}
