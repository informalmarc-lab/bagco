import { getAllCatalogProducts } from '@/lib/catalogProducts'
import CatalogExplorerClient from '@/components/CatalogExplorerClient'

type CatalogExplorerProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default function CatalogExplorer({ searchParams = {} }: CatalogExplorerProps) {
  const products = getAllCatalogProducts()
  return <CatalogExplorerClient products={products} searchParams={searchParams} />
}
