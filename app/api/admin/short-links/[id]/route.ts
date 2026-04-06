import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { deleteShortLink } from '@/lib/admin/shortLinks'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = requireAdminApiSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const deleted = await deleteShortLink(params.id)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
