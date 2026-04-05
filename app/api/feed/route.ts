import { buildMerchantFeedXml } from '../../../lib/feed/merchant.mjs'

export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(buildMerchantFeedXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
