import { NextResponse } from 'next/server'
import { submitCouponToDiscord } from '@/lib/makeYourQuote/quoteWebhook'

type CouponRequestBody = {
  name?: string
  email?: string
  phone?: string
  sourcePath?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export async function POST(request: Request) {
  let body: CouponRequestBody

  try {
    body = (await request.json()) as CouponRequestBody
  } catch {
    return bad('Invalid JSON payload.')
  }

  const name = body.name?.trim() || ''
  const email = body.email?.trim() || ''
  const phone = body.phone?.trim() || ''

  if (!name) return bad('Name is required.')
  if (!EMAIL_REGEX.test(email)) return bad('Valid email is required.')
  if (!phone) return bad('Phone number is required.')

  const result = await submitCouponToDiscord({
    name,
    email,
    phone,
    submittedAt: new Date().toISOString(),
    sourcePath: body.sourcePath || '/',
  })

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })

  return NextResponse.json({ ok: true })
}
