import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { getDashboardStats } from '@/lib/admin/quoteStore'

export async function GET() {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const stats = await getDashboardStats()
  return NextResponse.json(stats)
}
