import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { generateQuotePdf } from '@/lib/admin/pdf'
import { type AdminQuotePayload, type AdminQuoteRecord } from '@/lib/admin/types'

function toRecord(payload: AdminQuotePayload): AdminQuoteRecord {
  const now = new Date().toISOString()
  return {
    id: 'preview',
    docSequence: 0,
    docType: payload.docType,
    docNumber: payload.docNumber,
    date: payload.date,
    validForDays: payload.validForDays,
    customer: payload.customer,
    lineItems: payload.lineItems,
    includeSetupFee: payload.includeSetupFee,
    freightCost: payload.freightCost,
    terms: payload.terms,
    internalNotes: payload.internalNotes,
    status: payload.status || 'Draft',
    createdAt: now,
    updatedAt: now,
  }
}

export async function POST(request: Request) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  let payload: AdminQuotePayload
  try {
    payload = (await request.json()) as AdminQuotePayload
  } catch {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }

  const record = toRecord(payload)
  const pdfBytes = await generateQuotePdf(record)
  const body = Uint8Array.from(pdfBytes).buffer
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=\"preview.pdf\"',
    },
  })
}
