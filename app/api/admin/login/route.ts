import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { buildFreshSessionCookie } from '@/lib/admin/auth'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = process.env.BAGCO_ADMIN_PASSWORD || ''
if (!ADMIN_PASSWORD) throw new Error('BAGCO_ADMIN_PASSWORD is not set.')

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000
const attempts = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: Request): string {
  // Behind Cloudflare -> nginx; nginx's X-Real-IP is the Cloudflare edge, not the visitor.
  return (
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown'
  )
}

function takeAttempt(ip: string): number | null {
  const now = Date.now()
  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key)
  }

  const entry = attempts.get(ip) || { count: 0, resetAt: now + WINDOW_MS }
  if (entry.count >= MAX_ATTEMPTS) return Math.ceil((entry.resetAt - now) / 1000)
  entry.count += 1
  attempts.set(ip, entry)
  return null
}

function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest()
  const hashB = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(hashA, hashB)
}

export async function POST(request: Request) {
  const retryAfter = takeAttempt(clientIp(request))
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  let payload: { username?: string; password?: string }
  try {
    payload = (await request.json()) as { username?: string; password?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const username = (payload.username || '').trim()
  const password = payload.password || ''
  const usernameOk = safeEqual(username, ADMIN_USERNAME)
  const passwordOk = safeEqual(password, ADMIN_PASSWORD)
  if (!usernameOk || !passwordOk) {
    return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  const cookie = buildFreshSessionCookie(username)
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
