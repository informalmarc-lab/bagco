import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { duplicateQuote } from '@/lib/admin/quoteStore'

export async function POST(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const record = await duplicateQuote(params.id)
  if (!record) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ record })
}
