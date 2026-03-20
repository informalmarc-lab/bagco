import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://www.bagsupplyco.com'

function cleanSiteUrl(value: string): string {
  return value.replace(/\/+$/, '')
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function ensureSentence(value: string): string {
  const trimmed = normalizeWhitespace(value).replace(/[.?!]+$/, '')
  return trimmed ? `${trimmed}.` : ''
}

export function getSiteUrl(): string {
  return cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL)
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${getSiteUrl()}${normalizedPath}`
}

export function getShortProductDescription(description: string, maxLength = 110): string {
  const normalized = normalizeWhitespace(description)
  if (!normalized) return 'Wholesale packaging ready for repeat ordering.'

  const firstSentence = normalized.match(/^.*?[.?!](?:\s|$)/)?.[0]?.trim() || normalized
  const base = normalizeWhitespace(firstSentence).replace(/[.?!]+$/, '')
  if (base.length <= maxLength) return ensureSentence(base)

  const shortened = base.slice(0, maxLength).replace(/\s+\S*$/, '').trim()
  return ensureSentence(shortened || base.slice(0, maxLength))
}

export function buildProductMetadata(input: {
  name: string
  description: string
  urlPath: string
  imagePath: string
}): Metadata {
  const shortDescription = getShortProductDescription(input.description)
  const title = `${input.name} | BagSupplyCo`
  const metaDescription =
    `Buy ${input.name} from BagSupplyCo. ${shortDescription} ` +
    'Free shipping on 8+ cases. Same-day shipping before 1PM ET.'

  return {
    title: {
      absolute: title,
    },
    description: metaDescription,
    alternates: {
      canonical: input.urlPath,
    },
    openGraph: {
      type: 'website',
      url: toAbsoluteUrl(input.urlPath),
      title,
      description: metaDescription,
      siteName: 'BagSupplyCo',
      images: [
        {
          url: toAbsoluteUrl(input.imagePath),
          alt: input.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: [toAbsoluteUrl(input.imagePath)],
    },
  }
}

export function buildProductJsonLd(input: {
  name: string
  imagePath: string
  description: string
  urlPath: string
  price: number
  availability?: string
}) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: input.name,
    image: toAbsoluteUrl(input.imagePath),
    description: normalizeWhitespace(input.description),
    brand: {
      '@type': 'Brand',
      name: 'BagSupplyCo',
    },
    offers: {
      '@type': 'Offer',
      url: toAbsoluteUrl(input.urlPath),
      priceCurrency: 'USD',
      price: input.price.toFixed(2),
      availability: input.availability || 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }
}
