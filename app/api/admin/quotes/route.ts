import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { listQuotes, saveQuote } from '@/lib/admin/quoteStore'
import { type AdminQuotePayload } from '@/lib/admin/types'

export async function GET() {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const quotes = await listQuotes()
  return NextResponse.json({ quotes })
}

export async function POST(request: Request) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let payload: AdminQuotePayload
  try {
    payload = (await request.json()) as AdminQuotePayload
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }

  const result = await saveQuote(payload)
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 })
  return NextResponse.json({ record: result.record })
}
