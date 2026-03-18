import { getAllCatalogProducts } from '@/lib/catalogProducts'
import CatalogExplorerClient from '@/components/CatalogExplorerClient'

export default function CatalogExplorer() {
  const products = getAllCatalogProducts()
  return <CatalogExplorerClient products={products} />
}
