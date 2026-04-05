import type { Metadata } from 'next'
import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo/site'

type PageMetadataInput = {
  title: string
  description: string
  path: string
  imagePath?: string
}

const DEFAULT_OG_IMAGE = '/catalog/pharmacy/gs/GS-22-FRONT.webp'

export function buildPageTitle(topic: string): string {
  return `${topic} | BagSupplyCo — Wholesale Bags`
}

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const absoluteTitle = buildPageTitle(title)
  const canonicalUrl = toAbsoluteUrl(path)
  const imageUrl = toAbsoluteUrl(imagePath)

  return {
    title: {
      absolute: absoluteTitle,
    },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: absoluteTitle,
      description,
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
      description,
      images: [imageUrl],
    },
    metadataBase: new URL(getSiteUrl()),
  }
}
