import crypto from 'crypto'

const COOKIE_NAME = 'bagco_admin_session'
const SESSION_SECRET = process.env.BAGCO_ADMIN_SECRET || 'bagsupplyco-admin-secret-change-me'
const SESSION_TTL_MS = 8 * 60 * 60 * 1000

type SessionPayload = {
  u: string
  exp: number
}

function base64urlEncode(value: string): string {
  return Buffer.from(value, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function base64urlDecode(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4 || 4)) % 4)
  return Buffer.from(padded, 'base64').toString('utf8')
}

function sign(value: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('base64url')
}

export function createSessionToken(username: string): string {
  const payload: SessionPayload = {
    u: username,
    exp: Date.now() + SESSION_TTL_MS,
  }
  const encoded = base64urlEncode(JSON.stringify(payload))
  const signature = sign(encoded)
  return `${encoded}.${signature}`
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  if (sign(encoded) !== signature) return null

  try {
    const parsed = JSON.parse(base64urlDecode(encoded)) as SessionPayload
    if (!parsed?.u || !parsed?.exp) return null
    if (parsed.exp < Date.now()) return null
    return parsed
  } catch {
    return null
  }
}

export function getSessionCookieName(): string {
  return COOKIE_NAME
}

export function getSessionTtlMs(): number {
  return SESSION_TTL_MS
}
