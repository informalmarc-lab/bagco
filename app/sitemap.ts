import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bagco.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/catalog',
    '/catalog/legacy',
    '/catalog/pharmacy',
    '/catalog/veterinary',
    '/catalog/custom',
    '/privacy-policy',
    '/pharmacy-bags',
    '/custom-printing',
    '/industries',
    '/industries/dispensaries',
    '/industries/smoke-shops',
    '/industries/pharmacies',
    '/industries/retail-stores',
    '/manufacturing',
    '/contact',
    '/generic-bag-quote',
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
