const DEFAULT_SITE_URL = 'https://bagsupplyco.com'

function cleanSiteUrl(value: string): string {
  return value.replace(/\/+$/, '')
}

export function getSiteUrl(): string {
  return cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${getSiteUrl()}${normalizedPath}`
}
