import { NextResponse } from 'next/server'
import { UAParser } from 'ua-parser-js'

export const runtime = 'nodejs'

const VISITOR_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1509310232453714101/JACd3R4aFJFkwDE51fM8g9byvkArCNGRJ51tT5dIxxNDLap2bc8B9T7ATZMbL-DdOu1D'

type VisitorRequestBody = {
  width?: number
  height?: number
  pageUrl?: string
  referrer?: string
}

type IpApiResponse = {
  status?: string
  city?: string
  regionName?: string
  zip?: string
  country?: string
  isp?: string
  org?: string
  timezone?: string
  lat?: number
  lon?: number
  query?: string
}

function firstHeader(request: Request, name: string): string {
  return request.headers.get(name)?.trim() || ''
}

function getRealIp(request: Request): string {
  const forwardedFor = firstHeader(request, 'x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || ''

  const realIp = firstHeader(request, 'x-real-ip')
  if (realIp) return realIp

  const socketRequest = request as Request & {
    ip?: string
    socket?: { remoteAddress?: string }
    connection?: { remoteAddress?: string }
  }

  return socketRequest.ip || socketRequest.socket?.remoteAddress || socketRequest.connection?.remoteAddress || ''
}

function clean(value: unknown, fallback = 'Unknown'): string {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return fallback
}

async function resolveIp(ip: string): Promise<IpApiResponse> {
  if (!ip) return {}

  try {
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,city,regionName,zip,country,isp,org,timezone,lat,lon,query`,
      { cache: 'no-store' },
    )
    if (!response.ok) return { query: ip }
    const data = (await response.json()) as IpApiResponse
    return data.status === 'success' ? data : { query: ip }
  } catch {
    return { query: ip }
  }
}

function field(name: string, value: string, inline: boolean) {
  return {
    name,
    value: value || 'Unknown',
    inline,
  }
}

async function sendVisitorWebhook(request: Request, body: VisitorRequestBody) {
  const ip = getRealIp(request)
  const geo = await resolveIp(ip)
  const parser = new UAParser(request.headers.get('user-agent') || '')
  const browser = parser.getBrowser()
  const os = parser.getOS()
  const device = parser.getDevice()
  const resolvedIp = clean(geo.query || ip)

  const locationLine = `${clean(geo.city)}, ${clean(geo.regionName)} ${clean(geo.zip, '')} — ${clean(geo.country)}`.replace(
    /\s+/g,
    ' ',
  )

  await fetch(VISITOR_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'BagSupplyCo Visitor',
      avatar_url: 'https://bagsupplyco.com/favicon.ico',
      embeds: [
        {
          title: '🔔 New Visitor',
          color: 0x2563eb,
          timestamp: new Date().toISOString(),
          fields: [
            field('📍 Location', locationLine, true),
            field('🌐 IP', resolvedIp, true),
            field('📡 ISP', clean(geo.isp), false),
            field('🏢 Org', clean(geo.org), true),
            field('🕐 Timezone', clean(geo.timezone), true),
            field('🖥️ Browser', `${clean(browser.name)} ${clean(browser.version, '')}`.trim(), true),
            field('💻 OS', `${clean(os.name)} ${clean(os.version, '')}`.trim(), true),
            field('📱 Device', clean(device.type, 'Desktop'), true),
            field('📐 Screen', `${clean(body.width)}x${clean(body.height)}`, true),
            field('📄 Page', clean(body.pageUrl), false),
            field('🔗 Referrer', clean(body.referrer, 'Direct'), false),
          ],
          footer: { text: 'bagsupplyco.com tracker' },
        },
      ],
    }),
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as VisitorRequestBody
    await sendVisitorWebhook(request, body)
  } catch {
    // Visitor tracking must never break the client request.
  }

  return NextResponse.json({ ok: true })
}
