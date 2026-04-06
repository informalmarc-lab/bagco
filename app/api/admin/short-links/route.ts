import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { createShortLink, listShortLinks } from '@/lib/admin/shortLinks'

export async function GET() {
  const session = requireAdminApiSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const links = await listShortLinks()
  return NextResponse.json({ links })
}

export async function POST(request: Request) {
  const session = requireAdminApiSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let payload: { slug?: string; destinationUrl?: string }
  try {
    payload = (await request.json()) as { slug?: string; destinationUrl?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const result = await createShortLink({
    slug: payload.slug || '',
    destinationUrl: payload.destinationUrl || '',
    createdBy: session.u,
  })

  if (result.errors?.length) {
    return NextResponse.json({ errors: result.errors }, { status: 400 })
  }

  return NextResponse.json({ record: result.record }, { status: 201 })
}
