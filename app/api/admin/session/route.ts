import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { buildFreshSessionCookie } from '@/lib/admin/auth'
import { getSessionCookieName, verifySessionToken } from '@/lib/admin/session'

export async function GET() {
  const token = cookies().get(getSessionCookieName())?.value
  const session = verifySessionToken(token)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const response = NextResponse.json({ ok: true })
  const refreshed = buildFreshSessionCookie(session.u)
  response.cookies.set(refreshed.name, refreshed.value, refreshed.options)
  return response
}
