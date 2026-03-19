import { notFound, permanentRedirect } from 'next/navigation'
import {
  getAllCatalogProducts,
  getCatalogOverviewPath,
  getCatalogProductBySlug,
} from '@/lib/catalogProducts'

export async function generateStaticParams() {
  return getAllCatalogProducts().map((product) => ({ slug: product.slug }))
}

export default async function LegacyCatalogProductRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getCatalogProductBySlug(slug)
  if (!product) notFound()
  permanentRedirect(getCatalogOverviewPath(product))
}
