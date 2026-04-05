import type { MetadataRoute } from 'next'
import {
  getAllCatalogProducts,
  getCatalogOverviewPath,
  getCatalogProductSizes,
  getCatalogSizePath,
} from '@/lib/catalogProducts'
import { getAllCigarProducts } from '@/lib/cigarCatalog'
import { getAllRetailProducts } from '@/lib/retailCatalog'
import { getAllMylarProducts } from '@/lib/mylarCatalog'
import { CITIES } from '@/lib/seo/cities'
import { INDUSTRY_PAGES } from '@/lib/seo/industries'
import { getSiteUrl } from '@/lib/seo/site'

const siteUrl = getSiteUrl()
const excludedRoutes = new Set(['/partners/dropship'])

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  lastModified.setHours(0, 0, 0, 0)

  const productOverviewRoutes = getAllCatalogProducts().map((product) => ({
    route: getCatalogOverviewPath(product),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  const productSizeRoutes = getAllCatalogProducts().flatMap((product) =>
    getCatalogProductSizes(product).map((size) => ({
      route: getCatalogSizePath(product, size.slug),
      priority: 0.64,
      changeFrequency: 'weekly' as const,
    })),
  )

  const mylarRoutes = getAllMylarProducts().map((product) => ({
    route: `/catalog/mylar-bags/${product.slug}`,
    priority: 0.76,
    changeFrequency: 'weekly' as const,
  }))

  const retailRoutes = getAllRetailProducts().map((product) => ({
    route: `/catalog/retail-bags/${product.slug}`,
    priority: 0.72,
    changeFrequency: 'weekly' as const,
  }))

  const cigarRoutes = getAllCigarProducts().map((product) => ({
    route: `/catalog/cigar-bags/${product.slug}`,
    priority: 0.72,
    changeFrequency: 'weekly' as const,
  }))

  const legacyCatalogProductRoutes = getAllCatalogProducts().map((product) => ({
    route: `/catalog/products/${product.slug}`,
    priority: 0.55,
    changeFrequency: 'monthly' as const,
  }))

  const staticRoutes: Array<{ route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { route: '', priority: 1, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/catalog', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/pharmacy', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/veterinary', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/catalog/custom', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/catalog/retail-bags', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/catalog/cigar-bags', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/catalog/mylar-bags', priority: 0.86, changeFrequency: 'weekly' },
    { route: '/catalog/labels', priority: 0.84, changeFrequency: 'weekly' },
    { route: '/products', priority: 0.82, changeFrequency: 'weekly' },
    { route: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/industries', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/industries/dispensary', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/smoke-shops', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/cigar-shops', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/industries/pharmacies', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/industries/veterinary', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/industries/retail', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/distributors', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/manufacturing', priority: 0.75, changeFrequency: 'monthly' },
    { route: '/payments', priority: 0.78, changeFrequency: 'monthly' },
    { route: '/shipping', priority: 0.72, changeFrequency: 'monthly' },
    { route: '/returns', priority: 0.5, changeFrequency: 'yearly' },
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
    { route: '/terms', priority: 0.4, changeFrequency: 'yearly' },
    { route: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' },
    { route: '/pharmacy-bags', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/custom-printing', priority: 0.82, changeFrequency: 'monthly' },
    { route: '/custom-pharmacy-paper-bags', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/pharmacy-paper-bags-wholesale', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/independent-pharmacy-packaging', priority: 0.7, changeFrequency: 'monthly' },
    { route: '/made-in-usa-paper-bags', priority: 0.7, changeFrequency: 'monthly' },
  ]

  const seoCities = CITIES.map((city) => ({ slug: city.slug }))
  const cityRoutes = seoCities.map((city) => ({
    route: `/local/${city.slug}`,
    priority: 0.72,
    changeFrequency: 'monthly' as const,
  }))

  const industryHubRoutes = INDUSTRY_PAGES.map((industry) => ({
    route: `/${industry.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const industryCityRoutes = seoCities.flatMap((city) =>
    INDUSTRY_PAGES.map((industry) => ({
      route: `/${industry.slug}/${city.slug}`,
      priority: 0.62,
      changeFrequency: 'monthly' as const,
    })),
  )

  const routes = [
    ...staticRoutes,
    ...cityRoutes,
    ...industryHubRoutes,
    ...industryCityRoutes,
    ...productOverviewRoutes,
    ...productSizeRoutes,
    ...mylarRoutes,
    ...retailRoutes,
    ...cigarRoutes,
    ...legacyCatalogProductRoutes,
  ]
    .filter(({ route }) => !excludedRoutes.has(route))

  const uniqueRoutes = new Map<string, { route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }>()
  for (const item of routes) {
    if (!uniqueRoutes.has(item.route)) {
      uniqueRoutes.set(item.route, item)
    }
  }

  return Array.from(uniqueRoutes.values()).map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
