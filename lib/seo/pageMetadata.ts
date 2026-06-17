import type { Metadata } from 'next'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo/site'
import { cleanText } from '@/lib/utils/cleanText.ts'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  imagePath?: string
}

const DEFAULT_OG_IMAGE = '/catalog/pharmacy/gs/GS-22-FRONT.webp'

export function buildPageTitle(topic: string): string {
  return `${cleanText(topic)} | BagSupplyCo — Wholesale Bags`
}

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const absoluteTitle = buildPageTitle(title)
  const normalizedDescription = cleanText(description)
  const canonicalUrl = toAbsoluteUrl(path)
  const imageUrl = toAbsoluteUrl(imagePath)

  return {
    title: {
      absolute: absoluteTitle,
    },
    description: normalizedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: absoluteTitle,
      description: normalizedDescription,
      siteName: 'BagSupplyCo',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} from BagSupplyCo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle,
      description: normalizedDescription,
      images: [imageUrl],
    },
    metadataBase: new URL(getSiteUrl()),
  }
}

// Adds canonical/OG/Twitter tags to a page's metadata without altering its
// existing literal title text (unlike buildPageMetadata, which appends the
// site-wide " | BagSupplyCo" suffix via buildPageTitle).
export function buildMetaWithCanonical({
  title,
  description,
  path,
  imagePath = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const normalizedDescription = cleanText(description)
  const canonicalUrl = toAbsoluteUrl(path)
  const imageUrl = toAbsoluteUrl(imagePath)

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description: normalizedDescription,
      siteName: 'BagSupplyCo',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} from BagSupplyCo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: normalizedDescription,
      images: [imageUrl],
    },
    metadataBase: new URL(getSiteUrl()),
  }
}
