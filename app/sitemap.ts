import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { getAllCatalogProducts } from '@/lib/catalogProducts'

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
  const productRoutes = getAllCatalogProducts().map((product) => ({
    route: `/catalog/products/${product.slug}`,
    priority: 0.64,
    changeFrequency: 'weekly' as const,
  }))

  const productDetailRoutes = getAllCatalogProducts().map((product) => ({
    route: `/products/${product.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  const staticRoutes: Array<{ route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { route: '', priority: 1, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/catalog', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/legacy', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/catalog/pharmacy', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/veterinary', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/catalog/custom', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/products', priority: 0.82, changeFrequency: 'weekly' },
    { route: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/industries', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/industries/dispensaries', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/smoke-shops', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/pharmacies', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/industries/veterinary', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/industries/retail-stores', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/food-beverage', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/distributors', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/manufacturing', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/payments', priority: 0.78, changeFrequency: 'monthly' },
    { route: '/shipping', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/generic-bag-quote', priority: 0.95, changeFrequency: 'weekly' },
    { route: '/blog', priority: 0.82, changeFrequency: 'weekly' },
    { route: '/blog/how-many-pharmacy-bags-per-case', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/rx-bag-sizes-chart', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/dispensary-exit-bag-requirements', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/child-resistant-vs-standard-pharmacy-bags', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/how-to-order-custom-printed-paper-bags', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/veterinary-bag-sizes-guide', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/buying-direct-vs-distributor-pharmacy-bags', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/blog/custom-bag-lead-times', priority: 0.72, changeFrequency: 'monthly' },
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

  const routes = [...staticRoutes, ...dynamicCatalogRoutes, ...productRoutes, ...productDetailRoutes]

  return routes.map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
