import CatalogExplorer from '@/components/CatalogExplorer'

export default function CatalogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return <CatalogExplorer searchParams={searchParams} />
}

