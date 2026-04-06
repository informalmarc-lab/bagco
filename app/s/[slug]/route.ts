import { NextResponse } from 'next/server'
import { recordShortLinkVisit } from '@/lib/admin/shortLinks'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const link = await recordShortLinkVisit(params.slug)
  if (!link) {
    return new NextResponse('Short link not found.', { status: 404 })
  }

  return NextResponse.redirect(link.destinationUrl, 307)
}
