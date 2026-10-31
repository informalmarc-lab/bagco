import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { QUOTE_DISCORD_WEBHOOK_URL } from '@/lib/makeYourQuote/quoteWebhook'

const REQUEST_LOG_WEBHOOK_URL = QUOTE_DISCORD_WEBHOOK_URL

function firstHeader(request: NextRequest, names: string[]): string {
  for (const name of names) {
    const value = request.headers.get(name)
    if (value) return value
  }
  return ''
}

function getIpAddress(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || ''

  return firstHeader(request, [
    'cf-connecting-ip',
    'x-real-ip',
    'x-client-ip',
    'true-client-ip',
    'fastly-client-ip',
  ])
}

function getLocation(request: NextRequest) {
  const city = firstHeader(request, ['x-vercel-ip-city', 'cf-ipcity'])
  const region = firstHeader(request, ['x-vercel-ip-country-region', 'cf-region'])
  const country = firstHeader(request, ['x-vercel-ip-country', 'cf-ipcountry'])
  const latitude = firstHeader(request, ['x-vercel-ip-latitude', 'cf-iplatitude'])
  const longitude = firstHeader(request, ['x-vercel-ip-longitude', 'cf-iplongitude'])

  return {
    city,
    state: region,
    country,
    latitude,
    longitude,
  }
}

async function sendRequestLog(request: NextRequest) {
  if (!REQUEST_LOG_WEBHOOK_URL) return

  const location = getLocation(request)

  await fetch(REQUEST_LOG_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      state: location.state,
      timestamp: new Date().toISOString(),
      Location: location,
      requestPath: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent') || '',
      ipAddress: getIpAddress(request),
    }),
  }).catch((error) => {
    console.error('Request log webhook failed:', error)
  })
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  event.waitUntil(sendRequestLog(request))
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml)$).*)',
  ],
}
