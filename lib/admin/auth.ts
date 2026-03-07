import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSessionToken, getSessionCookieName, getSessionTtlMs, verifySessionToken } from '@/lib/admin/session'

export function getAdminSessionFromCookies() {
  const token = cookies().get(getSessionCookieName())?.value
  return verifySessionToken(token)
}

export function requireAdminSession() {
  const session = getAdminSessionFromCookies()
  if (!session) redirect('/admin/login')
  return session
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Math.floor(getSessionTtlMs() / 1000),
  }
}

export function buildFreshSessionCookie(username: string) {
  return {
    name: getSessionCookieName(),
    value: createSessionToken(username),
    options: sessionCookieOptions(),
  }
}
