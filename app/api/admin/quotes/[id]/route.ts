import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { deleteQuote, getQuoteById, updateQuoteStatus } from '@/lib/admin/quoteStore'
import { type AdminQuoteStatus } from '@/lib/admin/types'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const quote = await getQuoteById(params.id)
  if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ quote })
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let payload: { status?: AdminQuoteStatus }
  try {
    payload = (await request.json()) as { status?: AdminQuoteStatus }
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }
  if (!payload.status) return NextResponse.json({ error: 'Status is required.' }, { status: 400 })
  const updated = await updateQuoteStatus(params.id, payload.status)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ record: updated })
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const deleted = await deleteQuote(params.id)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
