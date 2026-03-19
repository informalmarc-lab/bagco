'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  DEFAULT_CATALOG_FILTERS,
  INDUSTRY_LABELS,
  INDUSTRY_ORDER,
  applyCatalogFilters,
  getCatalogFilterOptions,
  getCatalogOverviewPath,
  getStartingPriceByIndustry,
  money,
  type CatalogAvailability,
  type CatalogFilters,
  type CatalogIndustryKey,
  type CatalogProduct,
} from '@/lib/catalogProducts'

type CatalogExplorerClientProps = {
  products: CatalogProduct[]
}

function parseIndustry(value: string | null): CatalogIndustryKey | 'all' {
  if (!value) return 'all'
  return INDUSTRY_ORDER.includes(value as CatalogIndustryKey)
    ? (value as CatalogIndustryKey)
    : 'all'
}

function parseAvailability(value: string | null): CatalogAvailability | 'all' {
  if (value === 'stock' || value === 'custom') return value
  return 'all'
}

function readFilters(searchParams: Pick<URLSearchParams, 'get'>): CatalogFilters {
  return {
    industry: parseIndustry(searchParams.get('industry')),
    bagType: searchParams.get('bagType') || 'all',
    size: searchParams.get('size') || 'all',
    color: searchParams.get('color') || 'all',
    availability: parseAvailability(searchParams.get('availability')),
    usaMadeOnly: searchParams.get('usaMade') === '1',
    seasonalOnly: searchParams.get('seasonal') === '1',
    search: searchParams.get('search') || '',
  }
}

export default function CatalogExplorerClient({ products }: CatalogExplorerClientProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const options = useMemo(() => getCatalogFilterOptions(products), [products])
  const filters = useMemo(() => readFilters(searchParams), [searchParams])
  const filtered = useMemo(() => applyCatalogFilters(products, filters), [products, filters])

  const updateFilters = (updates: Partial<CatalogFilters>) => {
    const next: CatalogFilters = { ...filters, ...updates }
    const params = new URLSearchParams(searchParams.toString())

    const setParam = (key: string, value: string, defaultValue: string) => {
      if (!value || value === defaultValue) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    setParam('industry', next.industry, DEFAULT_CATALOG_FILTERS.industry)
    setParam('bagType', next.bagType, DEFAULT_CATALOG_FILTERS.bagType)
    setParam('size', next.size, DEFAULT_CATALOG_FILTERS.size)
    setParam('color', next.color, DEFAULT_CATALOG_FILTERS.color)
    setParam('availability', next.availability, DEFAULT_CATALOG_FILTERS.availability)
    setParam('search', next.search, DEFAULT_CATALOG_FILTERS.search)

    if (next.usaMadeOnly) params.set('usaMade', '1')
    else params.delete('usaMade')

    if (next.seasonalOnly) params.set('seasonal', '1')
    else params.delete('seasonal')

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const resetFilters = () => {
    router.replace(pathname, { scroll: false })
  }

  return (
    <div className="pb-16">
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="kicker">Catalog</p>
          <h1 className="heading-display mt-5">Filterable Paper Bag Catalog</h1>
          <p className="mt-5 max-w-3xl text-lg muted-text">
            Browse by industry, bag type, size, color, and stock status. Every product card includes SKU,
            case counts, and starting case pricing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/generic-bag-quote" className="btn-primary">
              Build a Quote
            </Link>
            <button type="button" className="btn-secondary" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {INDUSTRY_ORDER.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => updateFilters({ industry })}
              className="tonal-panel text-left transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-black uppercase tracking-[0.11em] text-[#7A6548]">{INDUSTRY_LABELS[industry]}</p>
              <p className="mt-2 text-sm font-semibold text-[#5F4D33]">
                Starting at {money(getStartingPriceByIndustry(industry))}/case
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="section-container pb-6">
        <div className="tonal-panel">
          <h2 className="text-2xl font-black text-[#1E4D2B]">Filter Products</h2>
          <label className="mt-4 grid gap-1 text-sm font-semibold text-[#5F4D33]">
            Search
            <input
              type="search"
              value={filters.search}
              onChange={(event) => updateFilters({ search: event.target.value })}
              placeholder="Search by SKU, bag type, size, or industry..."
              className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
            />
          </label>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Industry
              <select
                value={filters.industry}
                onChange={(event) => updateFilters({ industry: parseIndustry(event.target.value) })}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
              >
                <option value="all">All Industries</option>
                {INDUSTRY_ORDER.map((industry) => (
                  <option key={industry} value={industry}>
                    {INDUSTRY_LABELS[industry]}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Bag Type
              <select
                value={filters.bagType}
                onChange={(event) => updateFilters({ bagType: event.target.value || 'all' })}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
              >
                <option value="all">All Bag Types</option>
                {options.bagTypes.map((bagType) => (
                  <option key={bagType} value={bagType}>
                    {bagType}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Size
              <select
                value={filters.size}
                onChange={(event) => updateFilters({ size: event.target.value || 'all' })}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
              >
                <option value="all">All Sizes</option>
                {options.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              Color Options
              <select
                value={filters.color}
                onChange={(event) => updateFilters({ color: event.target.value || 'all' })}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
              >
                <option value="all">All Colors</option>
                {options.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm font-semibold text-[#5F4D33]">
              In Stock / Custom
              <select
                value={filters.availability}
                onChange={(event) => updateFilters({ availability: parseAvailability(event.target.value) })}
                className="rounded-xl border border-[#C4935A66] bg-white px-3 py-2"
              >
                <option value="all">All</option>
                <option value="stock">In Stock</option>
                <option value="custom">Custom Print</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-xl border border-[#C4935A66] bg-white px-3 py-2 text-sm font-semibold text-[#5F4D33]">
              <input
                type="checkbox"
                checked={filters.usaMadeOnly}
                onChange={(event) => updateFilters({ usaMadeOnly: event.target.checked })}
              />
              USA-Made Collection
            </label>
            <label className="inline-flex items-center gap-2 rounded-xl border border-[#C4935A66] bg-white px-3 py-2 text-sm font-semibold text-[#5F4D33]">
              <input
                type="checkbox"
                checked={filters.seasonalOnly}
                onChange={(event) => updateFilters({ seasonalOnly: event.target.checked })}
              />
              Seasonal Collection
            </label>
            <p className="text-sm font-semibold text-[#5F4D33]">{filtered.length} products</p>
          </div>
        </div>
      </section>

      <section className="section-container pb-2">
        {filtered.length === 0 ? (
          <p className="tonal-panel text-center text-sm font-semibold text-[#5F4D33]">
            No products match this filter set.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <article key={product.sku} className="surface-card product-card">
                <Link href={getCatalogOverviewPath(product)} className="relative block aspect-[4/3] bg-[#FAF6F0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </Link>

                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.08em] ${product.availability === 'stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {product.availability === 'stock' ? 'Stock' : 'Custom Print'}
                    </span>
                    {product.collections.includes('usa-made') && (
                      <span className="rounded-full bg-[#B5813A22] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#B5813A]">
                        USA-Made
                      </span>
                    )}
                    {product.collections.includes('seasonal') && (
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-rose-800">
                        Seasonal
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-black text-[#1E4D2B]">{product.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#7A6548]">
                    SKU {product.sku}
                  </p>

                  <div className="mt-3 space-y-1 text-sm text-[#5F4D33]">
                    <p>
                      <span className="font-semibold text-[#1E4D2B]">Sizes:</span> {product.sizeOptions.join(', ')}
                    </p>
                    <p>
                      <span className="font-semibold text-[#1E4D2B]">Case Count:</span> {product.caseCount}
                    </p>
                    <p className="product-card-price">
                      From {money(product.startingPrice)}/case
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.availability === 'stock' ? (
                      <Link href={`/contact?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                        Order Now
                      </Link>
                    ) : (
                      <Link href={`/generic-bag-quote?sku=${encodeURIComponent(product.sku)}`} className="btn-primary">
                        Build a Quote
                      </Link>
                    )}
                    <Link href={getCatalogOverviewPath(product)} className="btn-secondary">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
