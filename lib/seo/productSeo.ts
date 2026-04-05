import type { Metadata } from 'next'
import { buildPageTitle } from '@/lib/seo/pageMetadata'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo/site'

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function ensureSentence(value: string): string {
  const trimmed = normalizeWhitespace(value).replace(/[.?!]+$/, '')
  return trimmed ? `${trimmed}.` : ''
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

function clampDescription(value: string, maxLength = 155): string {
  const normalized = normalizeWhitespace(value)
  if (normalized.length <= maxLength) return normalized
  const shortened = normalized.slice(0, maxLength).replace(/\s+\S*$/, '').trim()
  return ensureSentence(shortened)
}

export function buildProductMetadata(input: {
  name: string
  description: string
  urlPath: string
  imagePath: string
}): Metadata {
  const shortDescription = getShortProductDescription(input.description)
  const title = buildPageTitle(input.name)
  const metaDescription = clampDescription(
    `${input.name} for wholesale buyers at BagSupplyCo. ${shortDescription} Compare pricing, sizes, and repeat supply support.`,
  )

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
    '@context': 'https://schema.org',
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
      seller: {
        '@type': 'Organization',
        name: 'BagSupplyCo',
        url: getSiteUrl(),
      },
    },
  }
}
