import { NextResponse } from 'next/server'
import { UAParser } from 'ua-parser-js'

export const runtime = 'nodejs'

const VISITOR_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1513522652197945364/I9RJUxlGs8EKMwfHAtmNhELOCTwGvOsR-h5Vyqw8UEMw42YICi_eGy_M30My75F1kuDm'
const FIELD_LIMIT = 1000

type VisitorRequestBody = {
  width?: number
  height?: number
  availWidth?: number
  availHeight?: number
  colorDepth?: number
  pixelDepth?: number
  viewportWidth?: number
  viewportHeight?: number
  devicePixelRatio?: number
  orientation?: string
  pageUrl?: string
  pagePath?: string
  pageTitle?: string
  referrer?: string
  visitStatus?: string
  visitedQuotePage?: boolean
  isQuotePage?: boolean
  utm?: Record<string, string>
  language?: string
  languages?: string[]
  platform?: string
  vendor?: string
  cookieEnabled?: boolean
  doNotTrack?: string | null
  onLine?: boolean
  hardwareConcurrency?: number
  deviceMemory?: number
  maxTouchPoints?: number
  timezone?: string
  timezoneOffset?: number
  connection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
    saveData?: boolean
  } | null
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
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return fallback
}

function truncate(value: string): string {
  if (value.length <= FIELD_LIMIT) return value
  return `${value.slice(0, FIELD_LIMIT - 15)}... [truncated]`
}

function lines(items: Array<[string, unknown]>, empty = 'None'): string {
  const output = items
    .map(([label, value]) => {
      const formatted = clean(value, '')
      return formatted ? `**${label}:** ${formatted}` : ''
    })
    .filter(Boolean)
    .join('\n')

  return truncate(output || empty)
}

function jsonLines(record: Record<string, string> | undefined): string {
  if (!record || Object.keys(record).length === 0) return 'None'
  return truncate(Object.entries(record).map(([key, value]) => `**${key}:** ${value}`).join('\n'))
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
    value: truncate(value || 'Unknown'),
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
  const cpu = parser.getCPU()
  const engine = parser.getEngine()
  const resolvedIp = clean(geo.query || ip)
  const forwardedFor = firstHeader(request, 'x-forwarded-for')

  const locationLine = `${clean(geo.city)}, ${clean(geo.regionName)} ${clean(geo.zip, '')} - ${clean(geo.country)}`.replace(
    /\s+/g,
    ' ',
  )
  const deviceType = clean(device.type, 'Desktop')
  const quoteStatus = body.isQuotePage
    ? 'Currently on quote page'
    : body.visitedQuotePage
      ? 'Visited quote page before'
      : 'No quote page visit seen'

  await fetch(VISITOR_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Bud Bags Visitor',
      avatar_url: 'https://budbags.net/favicon.ico',
      embeds: [
        {
          title: 'New Visitor Intelligence',
          color: 0x16a34a,
          timestamp: new Date().toISOString(),
          fields: [
            field('Location', locationLine, true),
            field('IP', resolvedIp, true),
            field('Network', lines([
              ['ISP', geo.isp],
              ['Org', geo.org],
              ['Forwarded For', forwardedFor],
              ['Real IP Header', firstHeader(request, 'x-real-ip')],
              ['Host', firstHeader(request, 'host')],
            ]), false),
            field('Page', lines([
              ['Title', body.pageTitle],
              ['URL', body.pageUrl],
              ['Path', body.pagePath],
              ['Referrer', clean(body.referrer, 'Direct')],
            ]), false),
            field('Visit Status', lines([
              ['Visitor', body.visitStatus],
              ['Quote Intent', quoteStatus],
            ]), true),
            field('UTM / Click IDs', jsonLines(body.utm), true),
            field('Browser', lines([
              ['Name', browser.name],
              ['Version', browser.version],
              ['Engine', `${clean(engine.name, '')} ${clean(engine.version, '')}`.trim()],
            ]), true),
            field('OS', lines([
              ['Name', os.name],
              ['Version', os.version],
              ['CPU', cpu.architecture],
            ]), true),
            field('Device', lines([
              ['Type', deviceType],
              ['Vendor', device.vendor],
              ['Model', device.model],
            ]), true),
            field('Screen', lines([
              ['Screen', `${clean(body.width)}x${clean(body.height)}`],
              ['Available', `${clean(body.availWidth)}x${clean(body.availHeight)}`],
              ['Viewport', `${clean(body.viewportWidth)}x${clean(body.viewportHeight)}`],
              ['Pixel Ratio', body.devicePixelRatio],
              ['Orientation', body.orientation],
              ['Color Depth', body.colorDepth],
              ['Pixel Depth', body.pixelDepth],
            ]), false),
            field('Locale / Time', lines([
              ['Browser Language', body.language],
              ['Languages', body.languages?.join(', ')],
              ['Browser Timezone', body.timezone],
              ['IP Timezone', geo.timezone],
              ['Timezone Offset', body.timezoneOffset],
            ]), false),
            field('Hardware / Capabilities', lines([
              ['Platform', body.platform],
              ['Vendor', body.vendor],
              ['CPU Threads', body.hardwareConcurrency],
              ['Device Memory GB', body.deviceMemory],
              ['Touch Points', body.maxTouchPoints],
              ['Cookies Enabled', body.cookieEnabled],
              ['Do Not Track', body.doNotTrack],
              ['Online', body.onLine],
            ]), false),
            field('Connection', lines([
              ['Effective Type', body.connection?.effectiveType],
              ['Downlink Mbps', body.connection?.downlink],
              ['RTT ms', body.connection?.rtt],
              ['Save Data', body.connection?.saveData],
            ]), true),
            field('Geo Coordinates', lines([
              ['Latitude', geo.lat],
              ['Longitude', geo.lon],
            ]), true),
          ],
          footer: { text: 'budbags.net tracker' },
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
