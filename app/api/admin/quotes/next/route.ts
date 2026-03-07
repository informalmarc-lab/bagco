import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { getNextDocNumber } from '@/lib/admin/quoteStore'

export async function GET() {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const docNumber = await getNextDocNumber()
  return NextResponse.json({ docNumber })
}
