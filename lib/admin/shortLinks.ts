import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo/site'

export type AdminShortLinkRecord = {
  id: string
  slug: string
  destinationUrl: string
  createdBy: string
  visits: number
  lastVisitedAt: string | null
  createdAt: string
  updatedAt: string
}

type ShortLinkStore = {
  links: AdminShortLinkRecord[]
}

const STORE_DIR = path.join(process.cwd(), 'data')
const STORE_PATH = path.join(STORE_DIR, 'short-links.json')

const defaultStore: ShortLinkStore = {
  links: [],
}

function normalizeSlug(value: string): string {
  return value.trim().toLowerCase()
}

function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

function getAllowedHosts(): Set<string> {
  const baseHost = new URL(getSiteUrl()).hostname.toLowerCase()
  const withoutWww = baseHost.replace(/^www\./, '')

  return new Set([baseHost, withoutWww, `www.${withoutWww}`])
}

function normalizeDestination(value: string): { url?: string; error?: string } {
  const trimmed = value.trim()
  if (!trimmed) return { error: 'Destination URL is required.' }

  if (trimmed.startsWith('/')) {
    return { url: toAbsoluteUrl(trimmed) }
  }

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    return { error: 'Enter a valid BagSupplyCo URL or a site path like /catalog/pharmacy.' }
  }

  if (!/^https?:$/i.test(parsed.protocol)) {
    return { error: 'Only http and https destinations are supported.' }
  }

  if (!getAllowedHosts().has(parsed.hostname.toLowerCase())) {
    return { error: 'Short links can only point to BagSupplyCo pages.' }
  }

  return { url: parsed.toString() }
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true })
  try {
    await fs.access(STORE_PATH)
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify(defaultStore, null, 2), 'utf8')
  }
}

async function readStore(): Promise<ShortLinkStore> {
  await ensureStore()
  const raw = await fs.readFile(STORE_PATH, 'utf8')

  try {
    const parsed = JSON.parse(raw) as Partial<ShortLinkStore>
    if (!parsed || !Array.isArray(parsed.links)) return { ...defaultStore }

    return {
      links: parsed.links.filter(
        (link): link is AdminShortLinkRecord =>
          Boolean(
            link &&
              typeof link.id === 'string' &&
              typeof link.slug === 'string' &&
              typeof link.destinationUrl === 'string',
          ),
      ),
    }
  } catch {
    return { ...defaultStore }
  }
}

async function writeStore(store: ShortLinkStore): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8')
}

export function buildShortLinkPath(slug: string): string {
  return `/s/${normalizeSlug(slug)}`
}

export function buildShortLinkUrl(slug: string): string {
  return toAbsoluteUrl(buildShortLinkPath(slug))
}

export async function listShortLinks(): Promise<AdminShortLinkRecord[]> {
  const store = await readStore()
  return [...store.links].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export async function getShortLinkBySlug(slug: string): Promise<AdminShortLinkRecord | null> {
  const store = await readStore()
  const normalizedSlug = normalizeSlug(slug)
  return store.links.find((link) => link.slug === normalizedSlug) || null
}

export async function createShortLink(input: {
  slug: string
  destinationUrl: string
  createdBy: string
}): Promise<{ record?: AdminShortLinkRecord; errors?: string[] }> {
  const store = await readStore()
  const slug = normalizeSlug(input.slug)
  const errors: string[] = []

  if (!slug) errors.push('Slug is required.')
  if (slug.length < 3) errors.push('Slug must be at least 3 characters.')
  if (slug.length > 60) errors.push('Slug must be 60 characters or less.')
  if (slug === 'admin') errors.push('Choose a different slug.')
  if (!isValidSlug(slug)) errors.push('Use lowercase letters, numbers, and hyphens only.')

  const destination = normalizeDestination(input.destinationUrl)
  if (destination.error) errors.push(destination.error)

  if (store.links.some((link) => link.slug === slug)) {
    errors.push('That short link slug already exists.')
  }

  if (errors.length > 0 || !destination.url) return { errors }

  const now = new Date().toISOString()
  const record: AdminShortLinkRecord = {
    id: crypto.randomUUID(),
    slug,
    destinationUrl: destination.url,
    createdBy: input.createdBy.trim() || 'admin',
    visits: 0,
    lastVisitedAt: null,
    createdAt: now,
    updatedAt: now,
  }

  store.links.push(record)
  await writeStore(store)
  return { record }
}

export async function deleteShortLink(id: string): Promise<boolean> {
  const store = await readStore()
  const before = store.links.length
  store.links = store.links.filter((link) => link.id !== id)
  if (store.links.length === before) return false
  await writeStore(store)
  return true
}

export async function recordShortLinkVisit(slug: string): Promise<AdminShortLinkRecord | null> {
  const store = await readStore()
  const normalizedSlug = normalizeSlug(slug)
  const link = store.links.find((entry) => entry.slug === normalizedSlug)
  if (!link) return null

  link.visits += 1
  link.lastVisitedAt = new Date().toISOString()
  link.updatedAt = link.lastVisitedAt
  await writeStore(store)
  return link
}
