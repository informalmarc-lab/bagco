import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bagsupplyco.com'

function getCatalogFolders(): string[] {
  try {
    const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
    const entries = fs.readdirSync(catalogRoot, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => !['custom', 'pharmacy', 'veterinary', 'legacy'].includes(name))
      .sort()
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{ route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { route: '', priority: 1, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/catalog', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/legacy', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/catalog/pharmacy', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/veterinary', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/catalog/custom', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/industries', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/industries/dispensaries', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/smoke-shops', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/pharmacies', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/industries/retail-stores', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/manufacturing', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/payments', priority: 0.78, changeFrequency: 'monthly' },
    { route: '/shipping', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/generic-bag-quote', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
    { route: '/pharmacy-bags', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/custom-printing', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/custom-pharmacy-paper-bags', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/pharmacy-paper-bags-wholesale', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/independent-pharmacy-packaging', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/custom-retail-paper-bags', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/made-in-usa-paper-bags', priority: 0.7, changeFrequency: 'monthly' },
  ]

  const dynamicCatalogRoutes = getCatalogFolders().map((folder) => ({
    route: `/catalog/${folder}`,
    priority: 0.62,
    changeFrequency: 'monthly' as const,
  }))

  const routes = [...staticRoutes, ...dynamicCatalogRoutes]

  return routes.map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
