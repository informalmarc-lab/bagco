import { NextResponse } from 'next/server'
import { requireAdminApiSession } from '@/lib/admin/apiAuth'
import { getQuoteById } from '@/lib/admin/quoteStore'
import { generateQuotePdf } from '@/lib/admin/pdf'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!requireAdminApiSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const quote = await getQuoteById(params.id)
  if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const bytes = await generateQuotePdf(quote)
  const url = new URL(request.url)
  const download = url.searchParams.get('download') === '1'
  const filename = `${quote.docNumber.toLowerCase()}.pdf`
  const body = Uint8Array.from(bytes).buffer

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename=\"${filename}\"`,
    },
  })
}
