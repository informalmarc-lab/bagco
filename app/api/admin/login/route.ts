import { NextResponse } from 'next/server'
import { buildFreshSessionCookie } from '@/lib/admin/auth'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'bagsupplyco2024'

export async function POST(request: Request) {
  let payload: { username?: string; password?: string }
  try {
    payload = (await request.json()) as { username?: string; password?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const username = (payload.username || '').trim()
  const password = payload.password || ''
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  const cookie = buildFreshSessionCookie(username)
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
