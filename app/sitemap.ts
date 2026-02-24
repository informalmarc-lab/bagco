import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bagco.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/pharmacy-bags',
    '/custom-printing',
    '/industries',
    '/manufacturing',
    '/contact',
    '/custom-pharmacy-paper-bags',
    '/pharmacy-paper-bags-wholesale',
    '/independent-pharmacy-packaging',
    '/custom-retail-paper-bags',
    '/made-in-usa-paper-bags',
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
