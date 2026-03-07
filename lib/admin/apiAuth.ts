import { cookies } from 'next/headers'
import { getSessionCookieName, verifySessionToken } from '@/lib/admin/session'

export function requireAdminApiSession() {
  const token = cookies().get(getSessionCookieName())?.value
  const session = verifySessionToken(token)
  return session
}
