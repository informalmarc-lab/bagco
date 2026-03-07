import { NextResponse } from 'next/server'
import { submitLeadToWebhook } from '@/lib/leadWebhook'

type LeadRequestBody = {
  form_type?: 'quote' | 'contact'
  payload?: Record<string, unknown>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: LeadRequestBody

  try {
    body = (await request.json()) as LeadRequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const formType = body.form_type
  const payload = body.payload

  if (formType !== 'quote' && formType !== 'contact') {
    return NextResponse.json({ error: 'form_type must be "quote" or "contact".' }, { status: 400 })
  }
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'payload object is required.' }, { status: 400 })
  }

  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  if (!name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  }

  const result = await submitLeadToWebhook(formType, payload)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({ ok: true })
}

